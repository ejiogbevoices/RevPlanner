
const API_BASE = import.meta.env.VITE_API_URL || '';

export async function getFinancialInsights(prompt: string): Promise<string> {
  try {
    const response = await fetch(`${API_BASE}/api/insights`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error || `Server error (${response.status})`);
    }

    const data = await response.json();
    return data.insights;
  } catch (error) {
    console.error('Insights fetch error:', error);
    return 'Unable to generate insights at this moment. Please try again.';
  }
}
