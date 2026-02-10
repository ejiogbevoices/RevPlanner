# Contributing to RevPlanner

Thanks for your interest in contributing to RevPlanner! Whether it's a bug fix, new feature, or documentation improvement, your help is appreciated.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/RevPlanner.git
   cd RevPlanner
   ```
3. **Install dependencies:**
   ```bash
   npm install
   cd server && npm install && cd ..
   ```
4. **Set up your environment:**
   ```bash
   cp .env.example .env.local
   ```
   Add your [Gemini API key](https://ai.google.dev/) to `.env.local`
5. **Start the dev servers:**
   ```bash
   # Terminal 1
   cd server && npm run dev

   # Terminal 2
   npm run dev
   ```

## How to Contribute

### Reporting Bugs

Open an [issue](https://github.com/ejiogbevoices/RevPlanner/issues) with:
- A clear, descriptive title
- Steps to reproduce the problem
- What you expected to happen vs. what actually happened
- Screenshots if applicable
- Your browser and OS

### Suggesting Features

Open an issue tagged with **enhancement** and describe:
- The problem your feature would solve
- How you envision it working
- Any alternatives you've considered

### Submitting Code

1. Create a feature branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Make your changes, keeping commits focused and descriptive
3. Test your changes locally to make sure nothing breaks
4. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a **Pull Request** against `main` with a clear description of what you changed and why

## Code Guidelines

- **TypeScript** — All new code should be written in TypeScript with proper type definitions
- **Components** — Keep React components small and focused; place them in `components/`
- **Services** — Business logic and API calls go in `services/`
- **Server** — Backend routes and middleware go in `server/`
- **Types** — Shared type definitions belong in `types.ts`
- **Constants** — App-wide constants go in `constants.ts`
- **Naming** — Use descriptive names. Components in PascalCase, functions and variables in camelCase
- **No hardcoded secrets** — Never commit API keys or credentials

## Pull Request Checklist

Before submitting your PR, make sure:

- [ ] Code compiles without errors (`npm run build`)
- [ ] No API keys or sensitive data are included
- [ ] New types are added to `types.ts` where appropriate
- [ ] The PR description explains what changed and why

## Code of Conduct

Be respectful, constructive, and collaborative. We're building something useful together — keep feedback kind and actionable.

## Questions?

Open an issue or reach out via the [Ejiogbe Voices GitHub](https://github.com/ejiogbevoices).

## License

By contributing, you agree that your contributions will be licensed under the [Apache License 2.0](LICENSE).
