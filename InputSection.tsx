
import React from 'react';
import { ModelInputs, Category, PricingTier } from '../types';
import { BENCHMARKS } from '../constants';

interface InputSectionProps {
  model: ModelInputs;
  onChange: (newModel: ModelInputs) => void;
}

const InputSection: React.FC<InputSectionProps> = ({ model, onChange }) => {
  const handleTierChange = (tierKey: keyof ModelInputs['tiers'], field: 'monthly' | 'yearly' | 'share', value: string) => {
    const numValue = value === '' ? 0 : parseFloat(value);
    onChange({
      ...model,
      tiers: {
        ...model.tiers,
        [tierKey]: {
          ...model.tiers[tierKey],
          [field]: isNaN(numValue) ? 0 : numValue
        }
      }
    });
  };

  const applyBenchmark = (cat: Category) => {
    const benchmark = BENCHMARKS[cat];
    onChange({
      ...model,
      category: cat,
      tiers: {
        free: { ...model.tiers.free, share: benchmark.shares.free },
        basic: { ...model.tiers.basic, share: benchmark.shares.basic },
        premium: { ...model.tiers.premium, share: benchmark.shares.premium },
        enterprise: { ...model.tiers.enterprise, share: benchmark.shares.enterprise },
      }
    });
  };

  // Fix: Cast Object.values to PricingTier[] to ensure totalShare is inferred as number
  const totalShare = (Object.values(model.tiers) as PricingTier[]).reduce((sum, t) => sum + t.share, 0);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-8">
      <section>
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">1. Revenue Goal</h2>
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500">Target Annual Revenue (ARR)</label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-slate-400 font-bold">$</span>
              <input
                type="number"
                value={model.targetArr || ''}
                onChange={(e) => onChange({ ...model, targetArr: parseInt(e.target.value) || 0 })}
                className="w-full p-2 pl-7 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-800"
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500">Industry Category</label>
            <select
              value={model.category}
              onChange={(e) => applyBenchmark(e.target.value as Category)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-medium"
            >
              {Object.values(Category).map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">2. Pricing & User Mix</h2>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${Math.abs(totalShare - 100) < 0.1 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            Total: {totalShare.toFixed(1)}%
          </span>
        </div>
        
        <div className="space-y-3">
          {(Object.keys(model.tiers) as Array<keyof ModelInputs['tiers']>).map((key) => {
            const tier = model.tiers[key];
            return (
              <div key={key} className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-700 text-sm">{tier.name}</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={tier.share || ''}
                      onChange={(e) => handleTierChange(key, 'share', e.target.value)}
                      className="w-16 p-1 text-right bg-white border border-slate-200 rounded text-xs font-bold"
                    />
                    <span className="text-[10px] font-bold text-slate-400">% Users</span>
                  </div>
                </div>
                
                {!tier.isFree && (
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Monthly $</label>
                      <input
                        type="number"
                        step="0.01"
                        value={tier.monthly || ''}
                        onChange={(e) => handleTierChange(key, 'monthly', e.target.value)}
                        className="w-full p-1.5 bg-white border border-slate-200 rounded text-sm font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Yearly $</label>
                      <input
                        type="number"
                        step="0.01"
                        value={tier.yearly || ''}
                        onChange={(e) => handleTierChange(key, 'yearly', e.target.value)}
                        className="w-full p-1.5 bg-white border border-slate-200 rounded text-sm font-medium"
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">3. Retention Mix</h2>
        <div className="space-y-2">
          <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase">
            <span>Monthly Plans</span>
            <span>Yearly Plans</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={model.yearlyMix}
            onChange={(e) => onChange({ ...model, yearlyMix: parseInt(e.target.value) })}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="text-center font-black text-blue-600">{model.yearlyMix}% choose Yearly</div>
        </div>
      </section>
    </div>
  );
};

export default InputSection;
