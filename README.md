# Portfolio Frontend (PamBot)

This repository contains the frontend for a personal portfolio site with an integrated AI assistant called PamBot. The site is built with Next.js and TypeScript.

## Features

- Static and dynamic portfolio pages
- AI-powered chat assistant (PamBot) integrated in `components/ai-chat-section.tsx`
- Suggested question buttons and free-text chat input

## Prerequisites

- Node.js (18+ recommended)
- pnpm or yarn

## Environment Variables

Create a `.env` file in the project root or set environment variables in your environment. The frontend expects at least:

- `NEXT_PUBLIC_BE_API` — Base URL for the backend PamBot API (e.g. `https://api.example.com`)

Example `.env`:

NEXT_PUBLIC_BE_API=http://localhost:8000

## Local development

Install dependencies and run the dev server:

pnpm install
pnpm dev

or using yarn:

yarn install
yarn dev

Open http://localhost:3000 in your browser.

## Production build

Build and start:

pnpm build
pnpm start

or with yarn:

yarn build
yarn start

## PamBot Integration

- The frontend uses `services/api-pambot.tsx` to call the backend endpoint `${NEXT_PUBLIC_BE_API}/pambot/ask`.
- The component `components/ai-chat-section.tsx` sends questions to PamBot and displays the `answer` field returned by the backend.
- Ensure your backend returns JSON with an `answer` string, for example:

{
"answer": "PamBot reply text..."
}

## Notes

- The repository previously included an internal `/app/api/chat` route. The current frontend implementation uses the external backend (`NEXT_PUBLIC_BE_API`) and no longer requires that internal route.
- If you remove `app/api`, make sure the frontend is updated to use the external backend (this repo already does).

## Contributing

Small, focused pull requests are preferred. Run the dev server locally and verify chat interactions with a working backend.

---

If you want, I can also add a short troubleshooting section or example backend implementation for PamBot.
