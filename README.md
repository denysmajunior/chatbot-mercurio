# Chatbot Mercúrio

Protótipo de atendimento com base de conhecimento para a Mercúrio Alimentos, construído em React + Vite + Tailwind.

## Rodando localmente

```bash
npm install
npm run dev
```

## Deploy na Vercel

O projeto já está pronto para import direto na Vercel (framework Vite detectado automaticamente).

Depois do primeiro deploy, configure a variável de ambiente abaixo em **Project → Settings → Environment Variables** e faça um redeploy:

- `ANTHROPIC_API_KEY` — chave da API da Anthropic, usada apenas no servidor (função serverless em `api/chat.js`). Sem essa variável, a interface funciona normalmente mas o chat não consegue gerar respostas.
