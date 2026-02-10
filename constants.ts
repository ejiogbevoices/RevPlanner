
import { Category, Benchmark, ModelInputs } from './types';

export const BENCHMARKS: Record<Category, Benchmark> = {
  [Category.B2B_SAAS]: {
    shares: { free: 80.0, basic: 14.0, premium: 5.0, enterprise: 1.0 },
    description: "Standard horizontal SaaS (e.g., Slack/Notion). Product-led growth (PLG) drives 15-20% conversion to paid seats over time."
  },
  [Category.DEV_TOOLS]: {
    shares: { free: 92.0, basic: 5.0, premium: 2.5, enterprise: 0.5 },
    description: "GitLab/Docker style. Vast open-source/free base. Revenue comes from enterprise features (security, governance, scale)."
  },
  [Category.AI_ML]: {
    shares: { free: 96.0, basic: 3.0, premium: 0.8, enterprise: 0.2 },
    description: "OpenAI/Perplexity style. Extreme compute cost at scale. High 'tourist' volume with tight power-user conversion."
  },
  [Category.FINTECH]: {
    shares: { free: 85.0, basic: 10.0, premium: 4.5, enterprise: 0.5 },
    description: "Brex/Stripe/Mercury style. Freemium acquisition with complex take-rates or flat-fee premium tiers for high-volume accounts."
  },
  [Category.HEALTHCARE]: {
    shares: { free: 75.0, basic: 15.0, premium: 8.0, enterprise: 2.0 },
    description: "Modern Health/Forward style. High intent/necessity leads to higher-than-average conversion, often B2B2C through employers."
  },
  [Category.CONSUMER]: {
    shares: { free: 95.0, basic: 3.5, premium: 1.2, enterprise: 0.3 },
    description: "Twitch/Discord/Substack style. Huge funnel required. Monetization usually relies on 'whales' or high-volume low-cost tiers."
  },
  [Category.PROPTECH]: {
    shares: { free: 70.0, basic: 20.0, premium: 8.0, enterprise: 2.0 },
    description: "Flex/Airbnb style. Very high-value transactions. Free tier is often a 'discovery' phase for a highly committed paid user."
  },
  [Category.GOVTECH]: {
    shares: { free: 50.0, basic: 25.0, premium: 20.0, enterprise: 5.0 },
    description: "Long sales cycles, few 'casual' users. Most accounts are institutional. High enterprise concentration is common."
  },
  [Category.EDTECH]: {
    shares: { free: 90.0, basic: 7.0, premium: 2.5, enterprise: 0.5 },
    description: "Maven/Lambda style. Course browsing is free, but certifications and interactive features command premium prices."
  },
  [Category.VERTICAL_SAAS]: {
    shares: { free: 60.0, basic: 25.0, premium: 12.0, enterprise: 3.0 },
    description: "Specialized (e.g., HVAC SaaS, LegalTech). Narrower audience with higher willingness to pay and higher conversion rates."
  },
  [Category.HRTECH]: {
    shares: { free: 82.0, basic: 12.0, premium: 5.0, enterprise: 1.0 },
    description: "Rippling/Gusto style. Stickiness is extremely high once converted. Focus on per-seat (employee) expansion revenue."
  },
  [Category.CYBERSECURITY]: {
    shares: { free: 88.0, basic: 8.0, premium: 3.0, enterprise: 1.0 },
    description: "Cloudflare/Snyk style. Free tier protects the internet; Enterprise tier protects the balance sheet. Critical infrastructure."
  }
};

export const INITIAL_MODEL: ModelInputs = {
  category: Category.B2B_SAAS,
  targetArr: 1000000,
  yearlyMix: 60,
  tiers: {
    free: { name: 'Free', monthly: 0, yearly: 0, share: 80.0, isFree: true },
    basic: { name: 'Basic', monthly: 15.00, yearly: 150, share: 14.0, isFree: false },
    premium: { name: 'Premium', monthly: 49.00, yearly: 490, share: 5.0, isFree: false },
    enterprise: { name: 'Enterprise', monthly: 250.00, yearly: 2500, share: 1.0, isFree: false }
  }
};
