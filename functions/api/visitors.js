// GET /api/visitors — returns all visitors ordered by most recent
export async function onRequestGet(context) {
  const { env } = context;

  try {
    const { results } = await env.DB.prepare(
      "SELECT github_id, username, name, avatar_url, visited_at FROM visitors ORDER BY visited_at DESC"
    ).all();

    return new Response(JSON.stringify(results || []), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=60",
      },
    });
  } catch (err) {
    console.error("Visitors fetch error:", err);
    return new Response(JSON.stringify([]), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
