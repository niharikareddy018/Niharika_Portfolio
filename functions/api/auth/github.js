// Redirects the user to GitHub's OAuth authorization page
export async function onRequestGet(context) {
  const { env } = context;
  const clientId = env.GITHUB_CLIENT_ID;

  if (!clientId) {
    return new Response(JSON.stringify({ error: "OAuth not configured" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const state = crypto.randomUUID();
  const redirectUri = new URL("/api/auth/callback", context.request.url).href;
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: "read:user",
    state: state,
  });

  return new Response(null, {
    status: 302,
    headers: {
      Location: `https://github.com/login/oauth/authorize?${params.toString()}`,
      "Set-Cookie": `oauth_state=${state}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=300`,
    },
  });
}
