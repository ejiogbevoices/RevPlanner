
export enum Category {
  B2B_SAAS = 'B2B Horizontal SaaS (YC Standard)',
  DEV_TOOLS = 'Developer Tools & Infra (e.g. GitLab)',
  AI_ML = 'AI & Machine Learning (Native SaaS)',
  FINTECH = 'Fintech (B2B & Consumer)',
  HEALTHCARE = 'Healthcare & Bio (HealthTech)',
  CONSUMER = 'Consumer (Apps & Marketplace)',
  PROPTECH = 'PropTech & Construction',
  GOVTECH = 'GovTech & Public Sector',
  EDTECH = 'EdTech & Professional Learning',
  VERTICAL_SAAS = 'Vertical SaaS (Specialized)',
  HRTECH = 'HR Tech & People Ops (e.g. Rippling)',
  CYBERSECURITY = 'Cybersecurity & Privacy'
}

export interface PricingTier {
  name: string;
  monthly: number;
  yearly: number;
  share: number;
  isFree: boolean;
}

export interface ModelInputs {
  category: Category;
  targetArr: number;
  yearlyMix: number;
  tiers: {
    free: PricingTier;
    basic: PricingTier;
    premium: PricingTier;
    enterprise: PricingTier;
  };
}

export interface ModelResults {
  totalUsersNeeded: number;
  paidUsersNeeded: number;
  tierBreakdown: {
    name: string;
    userCount: number;
    revenue: number;
    share: number;
    arpu: number;
    isFree: boolean;
  }[];
  avgRevPerUser: number;
  avgRevPerPaidUser: number;
}

export interface Benchmark {
  shares: {
    free: number;
    basic: number;
    premium: number;
    enterprise: number;
  };
  description: string;
}
