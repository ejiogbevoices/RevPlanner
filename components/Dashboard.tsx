
import React, { useMemo } from 'react';
import { ModelInputs, ModelResults } from '../types';

interface DashboardProps {
  model: ModelInputs;
}

const Dashboard: React.FC<DashboardProps> = ({ model }) => {
  const results = useMemo((): ModelResults => {
    const { targetArr, yearlyMix } = model;
    const tierKeys = Object.keys(model.tiers) as Array<keyof ModelInputs['tiers']>;
    
    // 1. Calculate weighted annual ARPU for the WHOLE user base
    let totalAnnualArpu = 0;
    let paidShare = 0;

    tierKeys.forEach(key => {
      const tier = model.tiers[key];
      const decimalShare = tier.share / 100;
      
      if (!tier.isFree) {
        // Average amount one user in this tier pays per year
        const avgAnnualRevenueInTier = (tier.monthly * 12 * (1 - yearlyMix/100)) + (tier.yearly * (yearlyMix/100));
        totalAnnualArpu += avgAnnualRevenueInTier * decimalShare;
        paidShare += tier.share;
      }
    });

    // 2. Derive total users needed to hit target based on that ARPU
    const totalUsersNeeded = targetArr / (totalAnnualArpu || 1);
    const paidUsersNeeded = totalUsersNeeded * (paidShare / 100);

    // 3. Breakdown per tier
    const breakdown = tierKeys.map(key => {
      const tier = model.tiers[key];
      const decimalShare = tier.share / 100;
      const userCount = Math.round(totalUsersNeeded * decimalShare);
      
      const avgAnnualRevenueInTier = tier.isFree ? 0 : (tier.monthly * 12 * (1 - yearlyMix/100)) + (tier.yearly * (yearlyMix/100));
      const revenue = userCount * avgAnnualRevenueInTier;
      
      return {
        name: tier.name,
        userCount,
        revenue,
        share: tier.share,
        arpu: avgAnnualRevenueInTier,
        isFree: tier.isFree
      };
    });

    return {
      totalUsersNeeded: Math.round(totalUsersNeeded),
      paidUsersNeeded: Math.round(paidUsersNeeded),
      tierBreakdown: breakdown,
      avgRevPerUser: totalAnnualArpu,
      avgRevPerPaidUser: totalAnnualArpu / (paidShare / 100 || 1)
    };
  }, [model]);

  return (
    <div className="space-y-6">
      {/* Primary Targets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900 text-white p-6 rounded-2xl">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Total Users Needed</p>
          <p className="text-4xl font-black mt-1">{results.totalUsersNeeded.toLocaleString()}</p>
          <p className="text-slate-500 text-xs mt-2">To hit ${model.targetArr.toLocaleString()} ARR</p>
        </div>
        <div className="bg-white border border-slate-200 p-6 rounded-2xl">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Paid Users Needed</p>
          <p className="text-4xl font-black mt-1 text-blue-600">{results.paidUsersNeeded.toLocaleString()}</p>
          <p className="text-slate-500 text-xs mt-2">{((results.paidUsersNeeded / results.totalUsersNeeded) * 100 || 0).toFixed(1)}% Conversion</p>
        </div>
        <div className="bg-white border border-slate-200 p-6 rounded-2xl">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Annual ARPU (Total)</p>
          <p className="text-4xl font-black mt-1 text-slate-800">${results.avgRevPerUser.toFixed(2)}</p>
          <p className="text-slate-500 text-xs mt-2">Revenue per single user</p>
        </div>
      </div>

      {/* The Math Breakdown */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
        <h3 className="text-blue-900 font-black text-xs uppercase tracking-widest mb-4">Calculation Logic</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
          <div className="space-y-2">
            <p className="text-blue-800 font-bold">1. Blended ARPU</p>
            <p className="text-blue-700 leading-relaxed text-xs">
              We calculate how much one user contributes annually based on your pricing and plan mix ({model.yearlyMix}% Yearly).
              <br/><br/>
              Weighted average: <span className="font-mono bg-blue-100 px-1 rounded">Σ(Tier Price * User Mix %)</span>
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-blue-800 font-bold">2. Solving for Volume</p>
            <p className="text-blue-700 leading-relaxed text-xs">
              Total Users = <span className="font-mono bg-blue-100 px-1 rounded">${model.targetArr.toLocaleString()} / ${results.avgRevPerUser.toFixed(2)}</span>
              <br/><br/>
              This gives the exact number of users required across all tiers to reach your goal.
            </p>
          </div>
        </div>
      </div>

      {/* Tier Revenue Requirements */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
          <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest">Revenue Requirement per Tier</h3>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="text-[10px] text-slate-400 uppercase font-black border-b border-slate-100">
              <th className="px-6 py-3">Tier Name</th>
              <th className="px-6 py-3">Users Required</th>
              <th className="px-6 py-3">Annual Rev Contribution</th>
              <th className="px-6 py-3 text-right">% of Goal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {results.tierBreakdown.map((tier) => (
              <tr key={tier.name} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-bold text-slate-800">{tier.name}</td>
                <td className="px-6 py-4 text-slate-600 font-mono text-sm">{tier.userCount.toLocaleString()}</td>
                <td className="px-6 py-4 font-black text-slate-900">${Math.round(tier.revenue).toLocaleString()}</td>
                <td className="px-6 py-4 text-right">
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${tier.isFree ? 'bg-slate-100 text-slate-400' : 'bg-blue-100 text-blue-700'}`}>
                    {model.targetArr > 0 ? ((tier.revenue / model.targetArr) * 100).toFixed(1) : 0}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 bg-white border border-slate-200 rounded-2xl">
          <h4 className="text-[10px] font-black text-slate-400 uppercase mb-4 tracking-widest">Paid Strategy</h4>
          <p className="text-sm text-slate-600 leading-relaxed">
            To reach <span className="font-bold text-slate-800">${model.targetArr.toLocaleString()}</span>, your paid tiers (Basic, Premium, Enterprise) must collectively average <span className="font-bold text-blue-600">${results.avgRevPerPaidUser.toFixed(2)}</span> in annual revenue per subscriber.
          </p>
        </div>
        <div className="p-6 bg-white border border-slate-200 rounded-2xl">
          <h4 className="text-[10px] font-black text-slate-400 uppercase mb-4 tracking-widest">Viral Growth Need</h4>
          <p className="text-sm text-slate-600 leading-relaxed">
            With a <span className="font-bold text-slate-800">{results.tierBreakdown.find(t => t.name === 'Free')?.share}%</span> free user mix, you need <span className="font-bold text-slate-800">{results.tierBreakdown.find(t => t.name === 'Free')?.userCount.toLocaleString()}</span> users finding value without paying to fuel your conversion funnel.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
