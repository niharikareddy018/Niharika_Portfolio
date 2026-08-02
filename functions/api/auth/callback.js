// Handles the GitHub OAuth callback — exchanges code for token, fetches user, writes to D1
export async function onRequestGet(context) {
  const { env, request } = context;
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  // Parse Cookie header to get stored oauth_state
  const cookieHeader = request.headers.get("Cookie") || "";
  let storedState = null;
  cookieHeader.split(";").forEach(c => {
    const parts = c.split("=");
    if (parts.length === 2 && parts[0].trim() === "oauth_state") {
      storedState = parts[1].trim();
    }
  });

  // Verify state parameter to prevent login CSRF
  if (!state || !storedState || state !== storedState) {
    return new Response(null, {
      status: 302,
      headers: {
        Location: new URL("/board?error=csrf_detected", url.origin).href,
        "Set-Cookie": "oauth_state=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0",
      },
    });
  }

  if (!code) {
    return new Response(null, {
      status: 302,
      headers: {
        Location: new URL("/board?error=no_code", url.origin).href,
        "Set-Cookie": "oauth_state=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0",
      },
    });
  }

  try {
    // Exchange code for access token
    const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: env.GITHUB_CLIENT_ID,
        client_secret: env.GITHUB_CLIENT_SECRET,
        code,
      }),
    });

    const tokenData = await tokenRes.json();
    if (tokenData.error || !tokenData.access_token) {
      return new Response(null, {
        status: 302,
        headers: {
          Location: new URL("/board?error=auth_failed", url.origin).href,
          "Set-Cookie": "oauth_state=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0",
        },
      });
    }

    // Fetch GitHub user profile
    const userRes = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
        "User-Agent": "navadeep-portfolio",
        Accept: "application/vnd.github+json",
      },
    });

    if (!userRes.ok) {
      return new Response(null, {
        status: 302,
        headers: {
          Location: new URL("/board?error=user_fetch_failed", url.origin).href,
          "Set-Cookie": "oauth_state=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0",
        },
      });
    }

    const user = await userRes.json();

    // Upsert visitor into D1
    await env.DB.prepare(
      `INSERT INTO visitors (github_id, username, name, avatar_url, visited_at)
       VALUES (?, ?, ?, ?, datetime('now'))
       ON CONFLICT(github_id) DO UPDATE SET
         name = excluded.name,
         avatar_url = excluded.avatar_url,
         visited_at = datetime('now')`
    )
      .bind(String(user.id), user.login, user.name || user.login, user.avatar_url)
      .run();

    return new Response(null, {
      status: 302,
      headers: {
        Location: new URL("/board?signed=true", url.origin).href,
        "Set-Cookie": "oauth_state=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0",
      },
    });
  } catch (err) {
    console.error("OAuth callback error:", err);
    return new Response(null, {
      status: 302,
      headers: {
        Location: new URL("/board?error=server_error", url.origin).href,
        "Set-Cookie": "oauth_state=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0",
      },
    });
  }
}

