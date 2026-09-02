// Vercel Serverless Function: proxies chat requests to the Anthropic API.
// The API key never touches the browser — it's read from a server-side
// environment variable that must be set in the Vercel project settings:
//   Project → Settings → Environment Variables → ANTHROPIC_API_KEY
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: { message: "Method not allowed" } });
    return;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    res.status(500).json({
      error: {
        message:
          "ANTHROPIC_API_KEY não está configurada neste projeto Vercel. Adicione a variável de ambiente e faça um novo deploy.",
      },
    });
    return;
  }

  try {
    const { system, messages, max_tokens, model } = req.body || {};

    const upstream = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: model || "claude-sonnet-4-5",
        max_tokens: max_tokens || 1000,
        system,
        messages,
      }),
    });

    const data = await upstream.json();
    res.status(upstream.status).json(data);
  } catch (e) {
    res.status(500).json({ error: { message: e.message || "Erro ao contatar a API." } });
  }
}
