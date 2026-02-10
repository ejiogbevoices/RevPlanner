
import React, { useState } from 'react';
import { ModelInputs } from './types';
import { INITIAL_MODEL, BENCHMARKS } from './constants';
import InputSection from './components/InputSection';
import Dashboard from './components/Dashboard';
import { getFinancialInsights } from './services/gemini';

const App: React.FC = () => {
  const [model, setModel] = useState<ModelInputs>(INITIAL_MODEL);
  const [insights, setInsights] = useState<string>('');
  const [loadingInsights, setLoadingInsights] = useState<boolean>(false);

  const handleFetchInsights = async () => {
    setLoadingInsights(true);
    const prompt = `
      Business Category: ${model.category}
      Revenue Goal: $${model.targetArr.toLocaleString()}
      Pricing Strategy:
      - Basic: $${model.tiers.basic.monthly}/mo ($${model.tiers.basic.yearly}/yr) - ${model.tiers.basic.share}% mix
      - Premium: $${model.tiers.premium.monthly}/mo ($${model.tiers.premium.yearly}/yr) - ${model.tiers.premium.share}% mix
      - Enterprise: $${model.tiers.enterprise.monthly}/mo ($${model.tiers.enterprise.yearly}/yr) - ${model.tiers.enterprise.share}% mix
      - Free: ${model.tiers.free.share}% mix
      Plan Mix: ${model.yearlyMix}% yearly subscriptions.

      Provide 3 specific CFO-level insights on the feasibility of this startup revenue model. Focus on conversion benchmarks for ${model.category}.
    `;
    const result = await getFinancialInsights(prompt);
    setInsights(result);
    setLoadingInsights(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased text-slate-900">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
            </div>
            <h1 className="text-xl font-black tracking-tight">RevPlanner <span className="text-blue-600">Pro</span></h1>
          </div>
          <button 
            onClick={handleFetchInsights}
            disabled={loadingInsights}
            className="px-6 py-2 bg-slate-900 hover:bg-black disabled:bg-slate-300 text-white text-xs font-black uppercase tracking-widest rounded transition-all"
          >
            {loadingInsights ? 'Analyzing Metrics...' : 'Get CFO Analysis'}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <aside className="lg:col-span-4 space-y-6">
            <InputSection model={model} onChange={setModel} />
            <div className="bg-slate-800 text-slate-400 p-6 rounded-2xl shadow-xl">
              <p className="text-[10px] font-black uppercase text-white mb-2 tracking-widest">Industry Context: {model.category}</p>
              <p className="text-xs leading-relaxed italic">
                "{BENCHMARKS[model.category].description}"
              </p>
              <div className="mt-4 pt-4 border-t border-slate-700">
                <p className="text-[10px] font-black uppercase text-white mb-1 tracking-widest">Growth Recommendation</p>
                <p className="text-[11px]">Focus on optimizing the <b>{(BENCHMARKS[model.category].shares.basic + BENCHMARKS[model.category].shares.premium + BENCHMARKS[model.category].shares.enterprise).toFixed(1)}%</b> conversion window for sustainable growth.</p>
              </div>
            </div>
          </aside>

          <section className="lg:col-span-8 space-y-8">
            <Dashboard model={model} />

            {insights && (
              <div className="bg-white border-2 border-blue-50 p-8 rounded-2xl shadow-sm">
                <h2 className="text-sm font-black uppercase tracking-widest text-blue-600 mb-6 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zm3 11H7v-2h6v2zm0-4H7V7h6v2z"></path></svg>
                  Expert Strategy Analysis
                </h2>
                <div className="space-y-4 text-slate-600 text-sm leading-relaxed font-medium">
                  {insights.split('\n').filter(l => l.trim()).map((line, i) => (
                    <p key={i} className="pl-4 border-l-2 border-slate-100">{line}</p>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default App;
