import React, { useState, useEffect } from 'react';
import {
  Award,
  DollarSign,
  Calendar,
  CheckCircle,
  TrendingUp,
  Download,
  Search
} from 'lucide-react';
import { ApiService } from '../../services/api';
import { Placement } from '../../types';

export const PlacementList: React.FC = () => {
  const [placements, setPlacements] = useState<Placement[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    ApiService.getPlacements().then(setPlacements);
  }, []);

  const filtered = placements.filter(
    (p) =>
      p.applicantName.toLowerCase().includes(search.toLowerCase()) ||
      p.jobTitle.toLowerCase().includes(search.toLowerCase()) ||
      p.client.toLowerCase().includes(search.toLowerCase())
  );

  const totalMonthlyBilling = placements.reduce((acc, p) => acc + p.billRate * 160, 0);
  const totalMonthlyGrossProfit = placements.reduce(
    (acc, p) => acc + (p.billRate - p.payRate) * 160,
    0
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-display font-bold text-[#292633] dark:text-white">
            Placement &amp; Workforce Billing
          </h1>
          <p className="text-xs text-[#817984]">
            Active contractor placements, contract tenures, bill-pay spreads, and gross profitability
          </p>
        </div>
      </div>

      {/* Financial Health Strip */}
      {/* KPI Summary Cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="p-4 bg-white dark:bg-[#1E1B29] border border-[#E9E6EF] dark:border-slate-800 rounded-2xl shadow-xs">
          <div className="text-xs text-[#817984] font-medium">Active Placements</div>
          <div className="text-2xl font-bold font-mono text-[#292633] dark:text-white mt-1 tabular-nums">
            {placements.length}
          </div>
          <div className="text-[11px] text-[#2E7D5B] dark:text-[#8AC9A7] mt-0.5">100% On-Bill Retainers</div>
        </div>

        <div className="p-4 bg-white dark:bg-[#1E1B29] border border-[#E9E6EF] dark:border-slate-800 rounded-2xl shadow-xs">
          <div className="text-xs text-[#817984] font-medium">Estimated Monthly Run-Rate</div>
          <div className="text-2xl font-bold font-mono text-[#6941C6] dark:text-[#A888EC] mt-1 tabular-nums">
            ${totalMonthlyBilling.toLocaleString()}
          </div>
          <div className="text-[11px] text-[#817984] mt-0.5">Calculated at 160 hrs / mo</div>
        </div>

        <div className="p-4 bg-white dark:bg-[#1E1B29] border border-[#E9E6EF] dark:border-slate-800 rounded-2xl shadow-xs">
          <div className="text-xs text-[#817984] font-medium">Net Monthly Gross Margin</div>
          <div className="text-2xl font-bold font-mono text-[#2E7D5B] dark:text-[#8AC9A7] mt-1 tabular-nums">
            ${totalMonthlyGrossProfit.toLocaleString()}
          </div>
          <div className="text-[11px] text-[#2E7D5B] dark:text-[#8AC9A7] mt-0.5">~25.1% Average Portfolio Spread</div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-[#1E1B29] border border-[#E9E6EF] dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F8F7FB] dark:bg-slate-800/60 border-b border-[#E9E6EF] dark:border-slate-800 text-[#817984] dark:text-slate-400">
                <th className="p-3.5 font-semibold">Placement ID &amp; Candidate</th>
                <th className="p-3.5 font-semibold">Position Title</th>
                <th className="p-3.5 font-semibold">Client Organization</th>
                <th className="p-3.5 font-semibold">Contract Tenure</th>
                <th className="p-3.5 font-semibold">Client Bill Rate</th>
                <th className="p-3.5 font-semibold">Contractor Pay</th>
                <th className="p-3.5 font-semibold">Gross Margin</th>
                <th className="p-3.5 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E9E6EF] dark:divide-slate-800">
              {filtered.map((p) => (
                <tr
                  key={p.id}
                  className="hover:bg-[#F1EBFA]/50 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <td className="p-3.5">
                    <div className="font-bold text-[#292633] dark:text-white">{p.applicantName}</div>
                    <div className="font-mono text-[11px] text-[#6941C6] dark:text-[#A888EC] font-semibold">{p.placementId}</div>
                  </td>

                  <td className="p-3.5 font-medium text-[#292633] dark:text-white">{p.jobTitle}</td>

                  <td className="p-3.5 text-[#817984]">{p.client}</td>

                  <td className="p-3.5 font-mono text-[11px] text-[#817984]">
                    <div>{p.startDate}</div>
                    <div className="text-[10px] text-[#817984]/70">to {p.endDate}</div>
                  </td>

                  <td className="p-3.5 font-mono font-bold text-[#292633] dark:text-white tabular-nums">
                    ${p.billRate}/hr
                  </td>

                  <td className="p-3.5 font-mono text-[#817984] tabular-nums">${p.payRate}/hr</td>

                  <td className="p-3.5 font-mono font-bold text-[#2E7D5B] dark:text-[#8AC9A7] tabular-nums">
                    ${p.billRate - p.payRate}/hr ({p.margin}%)
                  </td>

                  <td className="p-3.5">
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-medium border bg-[#8AC9A7]/15 text-[#2E7D5B] border-[#8AC9A7]/30 dark:bg-[#8AC9A7]/20 dark:text-[#8AC9A7]">
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
