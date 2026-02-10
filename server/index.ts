import express from 'express';
import cors from 'cors';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const app = express();
const PORT = process.env.PORT || 3001;

// Validate API key exists at startup
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('❌ GEMINI_API_KEY is not set in .env.local');
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });

// Middleware
app.use(cors({ origin: process.env.ALLOWED_ORIGIN || 'http://localhost:3000' }));
app.use(express.json());

// Rate limiting (simple in-memory — swap for redis in production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 20;
const RATE_WINDOW_MS = 60000;

function rateLimit(req: express.Request, res: express.Response, next: express.NextFunction): void {
  const ip = req.ip || 'unknown';
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW_MS });
    next();
    return;
  }

  if (entry.count >= RATE_LIMIT) {
    res.status(429).json({ error: 'Too many requests. Please wait a moment.' });
    return;
  }

  entry.count++;
  next();
}

// POST /api/insights
app.post('/api/insights', rateLimit, async (req: express.Request, res: express.Response): Promise<void> => {
  const { prompt } = req.body;

  if (!prompt || typeof prompt !== 'string') {
    res.status(400).json({ error: 'A valid prompt string is required.' });
    return;
  }

  if (prompt.length > 5000) {
    res.status(400).json({ error: 'Prompt exceeds maximum length.' });
    return;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction:
          'You are a world-class SaaS CFO and startup strategist specializing in the Y Combinator ecosystem. Analyze the user\'s pricing model and provide 3-4 actionable, concise insights on how to improve ARR or user acquisition strategy based on industry standards for the selected YC-backed sector. Focus on seat-based expansion, CAC/LTV dynamics, and conversion feasibility.',
        temperature: 0.7,
      },
    });

    res.json({ insights: response.text });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Gemini API error:', message);
    res.status(502).json({ error: 'Failed to generate insights. Please try again.' });
  }
});

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`✅ RevPlanner API running on http://localhost:${PORT}`);
});
