<div align="center">

# RevPlanner Pro

**Startup Revenue & Growth Planner**

A financial modeling tool that helps SaaS founders project ARR, calculate user volume requirements, and stress-test pricing strategies — powered by AI-driven CFO-level insights.

[![License: Apache-2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-96.5%25-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61dafb)](https://react.dev/)

</div>

---

## What It Does

RevPlanner takes your target ARR, pricing tiers, and user mix — then reverse-engineers exactly how many users you need across Free, Basic, Premium, and Enterprise tiers to hit your revenue goal. It includes industry-specific conversion benchmarks for 12 startup categories and optional AI analysis via Google Gemini.

### Key Features

- **Reverse Revenue Modeling** — Input your ARR target and pricing; get the exact user volume needed per tier
- **12 Industry Benchmarks** — Pre-loaded conversion profiles for B2B SaaS, AI/ML, Fintech, DevTools, Healthcare, Consumer, PropTech, GovTech, EdTech, Vertical SaaS, HR Tech, and Cybersecurity
- **Dynamic Pricing Controls** — Adjust monthly/yearly pricing, tier distribution, and retention mix in real-time
- **Blended ARPU Calculator** — Automatically computes weighted average revenue per user across your entire funnel
- **AI-Powered CFO Analysis** — One-click Gemini-powered strategic insights on pricing feasibility, CAC/LTV dynamics, and conversion benchmarks
- **Transparent Math** — Every calculation is shown and explained, not hidden behind a black box

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19 + TypeScript |
| Styling | Tailwind CSS (PostCSS) + Inter font |
| Charts | Recharts |
| AI | Google Gemini API (`gemini-3-flash-preview`) |
| Backend | Express (API proxy) |
| Build | Vite 6 |
| License | Apache-2.0 |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- A [Google Gemini API key](https://ai.google.dev/) (free tier available)

### Installation

```bash
git clone https://github.com/ejiogbevoices/RevPlanner.git
cd RevPlanner
npm install
cd server && npm install && cd ..
```

### Environment Setup

Create a `.env.local` file in the project root:

```bash
cp .env.example .env.local
```

Add your Gemini API key:

```
GEMINI_API_KEY=your_api_key_here
```

### Run Locally

```bash
# Terminal 1 — API server
cd server
npm run dev

# Terminal 2 — Frontend
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
RevPlanner/
├── components/
│   ├── Dashboard.tsx        # Revenue metrics, tier breakdown table, strategy cards
│   └── InputSection.tsx     # ARR target, category selector, pricing & mix controls
├── server/
│   ├── index.ts             # Express API proxy (Gemini key stays here)
│   └── package.json         # Server dependencies
├── services/
│   └── gemini.ts            # Client-side fetch to /api/insights
├── App.tsx                  # Main layout and state management
├── types.ts                 # TypeScript interfaces and Category enum
├── constants.ts             # Industry benchmarks and initial model defaults
├── index.html               # Entry point
├── index.css                # Tailwind directives
├── index.tsx                # React DOM mount
├── tailwind.config.js       # Tailwind content paths and theme
├── postcss.config.js        # PostCSS plugin config
├── vite.config.ts           # Vite config with API proxy
└── package.json
```

## How the Math Works

1. **Blended ARPU** — For each paid tier, the tool calculates a weighted annual revenue contribution based on your monthly/yearly prices and the retention mix slider. Free users contribute $0.
2. **User Volume** — Total users needed = `Target ARR ÷ Blended ARPU per user`. This is then distributed across tiers based on your percentage mix.
3. **Tier Breakdown** — Each tier shows its required user count, annual revenue contribution, and percentage of the total ARR goal.

## Industry Categories

The app ships with benchmarked conversion profiles for:

- B2B Horizontal SaaS (Slack/Notion style)
- Developer Tools & Infra (GitLab/Docker style)
- AI & Machine Learning (OpenAI/Perplexity style)
- Fintech (Brex/Stripe style)
- Healthcare & Bio
- Consumer Apps & Marketplace
- PropTech & Construction
- GovTech & Public Sector
- EdTech & Professional Learning
- Vertical SaaS (Specialized)
- HR Tech & People Ops
- Cybersecurity & Privacy

Selecting a category auto-populates the free/paid user distribution with industry-standard benchmarks.

## Deployment

Deploy the frontend `dist/` folder and the `server/` as a Node service:

- **Vercel** — Frontend: `npx vercel`. Server: deploy as a Vercel Serverless Function or separate service.
- **Netlify** — Frontend: connect repo, build command `npm run build`, publish `dist`. Server: use Netlify Functions.
- **Railway / Render** — Deploy `server/` as a web service. Set `VITE_API_URL` in frontend to point at it.

> **⚠️ Important:** Set `GEMINI_API_KEY` as an environment variable on your server host. The API key never touches the client bundle.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for setup instructions, code guidelines, and how to submit pull requests.

## License

Apache License 2.0 — see [LICENSE](LICENSE) for details.

## Author

Built by [Ejiogbe Voices](https://github.com/ejiogbevoices) — Fenix Creation Studio LLC
