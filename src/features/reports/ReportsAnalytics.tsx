import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Download,
  Calendar,
  Users,
  Award,
  DollarSign,
  Briefcase,
  CheckCircle
} from 'lucide-react';

export const ReportsAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('Q4 2026');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const monthlyTrends = [
    { month: 'Jun', applicants: 120, interviews: 32, hires: 9 },
    { month: 'Jul', applicants: 145, interviews: 40, hires: 12 },
    { month: 'Aug', applicants: 180, interviews: 51, hires: 15 },
    { month: 'Sep', applicants: 210, interviews: 64, hires: 18 },
    { month: 'Oct', applicants: 260, interviews: 78, hires: 22 },
    { month: 'Nov', applicants: 310, interviews: 89, hires: 26 }
  ];

  const channelBreakdown = [
    { channel: 'LinkedIn Sourcing', share: '46%', count: 570, color: 'bg-[#6941C6]' },
    { channel: 'Direct Career Portal', share: '28%', count: 347, color: 'bg-[#FF8243]' },
    { channel: 'Vendor Agency Network', share: '16%', count: 198, color: 'bg-[#8AC9A7]' },
    { channel: 'Internal Employee Referral', share: '10%', count: 125, color: 'bg-[#402568]' }
  ];

  const handleExport = () => {
    showToast('Exported Executive Analytics Report (PDF & CSV).');
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#402568] text-white border border-[#6941C6] px-4 py-2.5 rounded-xl shadow-xl text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle className="w-4 h-4 text-[#8AC9A7]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-display font-bold text-[#292633] dark:text-white">
            Talent Velocity &amp; Workforce Analytics
          </h1>
          <p className="text-xs text-[#817984]">
            Hiring velocity, channel attribution, recruiter yield, and placement gross profitability
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-1.5 bg-white dark:bg-[#1E1B29] border border-[#E9E6EF] dark:border-slate-800 rounded-xl text-xs font-semibold text-[#292633] dark:text-slate-200 focus:outline-none focus:border-[#6941C6]"
          >
            <option value="Q4 2026">Cadence: Q4 2026</option>
            <option value="Full Year 2026">Cadence: Full Year 2026</option>
            <option value="Last 30 Days">Cadence: Last 30 Days</option>
          </select>

          <button
            onClick={handleExport}
            className="px-3.5 py-1.5 bg-[#FF8243] hover:bg-[#E96F30] text-white rounded-xl text-xs font-semibold shadow-xs shadow-[#FF8243]/30 transition-all flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Analytics</span>
          </button>
        </div>
      </div>

      {/* Executive Scorecards */}
      <div className="grid sm:grid-cols-4 gap-4">
        <div className="p-4 bg-white dark:bg-[#1E1B29] border border-[#E9E6EF] dark:border-slate-800 rounded-2xl shadow-xs">
          <div className="text-xs text-[#817984] font-medium">Submissions-to-Hire Ratio</div>
          <div className="text-2xl font-bold font-mono text-[#292633] dark:text-white mt-1 tabular-nums">
            3.4 : 1
          </div>
          <div className="text-[11px] text-[#2E7D5B] dark:text-[#8AC9A7] mt-0.5">Top decile industry benchmark</div>
        </div>

        <div className="p-4 bg-white dark:bg-[#1E1B29] border border-[#E9E6EF] dark:border-slate-800 rounded-2xl shadow-xs">
          <div className="text-xs text-[#817984] font-medium">Average Time-to-Fill</div>
          <div className="text-2xl font-bold font-mono text-[#6941C6] dark:text-[#A888EC] mt-1 tabular-nums">
            18.2 Days
          </div>
          <div className="text-[11px] text-[#2E7D5B] dark:text-[#8AC9A7] mt-0.5">-4.5 days vs Q3</div>
        </div>

        <div className="p-4 bg-white dark:bg-[#1E1B29] border border-[#E9E6EF] dark:border-slate-800 rounded-2xl shadow-xs">
          <div className="text-xs text-[#817984] font-medium">Offer Acceptance Rate</div>
          <div className="text-2xl font-bold font-mono text-[#2E7D5B] dark:text-[#8AC9A7] mt-1 tabular-nums">
            91.4%
          </div>
          <div className="text-[11px] text-[#2E7D5B] dark:text-[#8AC9A7] mt-0.5">32 of 35 accepted</div>
        </div>

        <div className="p-4 bg-white dark:bg-[#1E1B29] border border-[#E9E6EF] dark:border-slate-800 rounded-2xl shadow-xs">
          <div className="text-xs text-[#817984] font-medium">Average Placement Margin</div>
          <div className="text-2xl font-bold font-mono text-[#FF8243] mt-1 tabular-nums">
            25.1%
          </div>
          <div className="text-[11px] text-[#FF8243] mt-0.5">$38.50/hr average net spread</div>
        </div>
      </div>

      {/* Visual Chart: Monthly Velocity Bars */}
      <div className="p-6 bg-white dark:bg-[#1E1B29] border border-[#E9E6EF] dark:border-slate-800 rounded-2xl shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-[#292633] dark:text-white">
              Hiring Funnel Velocity &amp; Monthly Growth
            </h2>
            <p className="text-xs text-[#817984]">
              Candidate volume, client interviews, and confirmed placements
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 bg-[#6941C6] rounded-sm" />
              <span className="text-[#817984] dark:text-slate-400">Applicants</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 bg-[#FF8243] rounded-sm" />
              <span className="text-[#817984] dark:text-slate-400">Interviews</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 bg-[#8AC9A7] rounded-sm" />
              <span className="text-[#817984] dark:text-slate-400">Placements</span>
            </span>
          </div>
        </div>

        {/* Clean CSS Bar Chart */}
        <div className="grid grid-cols-6 gap-4 pt-4 border-t border-[#E9E6EF] dark:border-slate-800 items-end h-56">
          {monthlyTrends.map((m) => (
            <div key={m.month} className="flex flex-col items-center gap-2 h-full justify-end">
              <div className="w-full flex items-end justify-center gap-1.5 h-44">
                {/* Applicants bar */}
                <div
                  className="w-4 bg-[#6941C6] rounded-t-md transition-all hover:opacity-90"
                  style={{ height: `${(m.applicants / 350) * 100}%` }}
                  title={`${m.applicants} Applicants`}
                />
                {/* Interviews bar */}
                <div
                  className="w-4 bg-[#FF8243] rounded-t-md transition-all hover:opacity-90"
                  style={{ height: `${(m.interviews / 350) * 200}%` }}
                  title={`${m.interviews} Interviews`}
                />
                {/* Hires bar */}
                <div
                  className="w-4 bg-[#8AC9A7] rounded-t-md transition-all hover:opacity-90"
                  style={{ height: `${(m.hires / 350) * 350}%` }}
                  title={`${m.hires} Placements`}
                />
              </div>
              <div className="font-mono text-xs font-bold text-[#292633] dark:text-slate-200 mt-1">
                {m.month}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sourcing Channel Attribution Breakdown */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 bg-white dark:bg-[#1E1B29] border border-[#E9E6EF] dark:border-slate-800 rounded-2xl shadow-xs space-y-4">
          <div>
            <h2 className="text-sm font-bold text-[#292633] dark:text-white">
              Sourcing Channel Breakdown
            </h2>
            <p className="text-xs text-[#817984]">Candidate acquisition channels and pipeline yield</p>
          </div>

          <div className="space-y-3">
            {channelBreakdown.map((ch) => (
              <div key={ch.channel} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-[#292633] dark:text-slate-200">{ch.channel}</span>
                  <span className="font-mono font-bold text-[#292633] dark:text-white tabular-nums">
                    {ch.count} ({ch.share})
                  </span>
                </div>
                <div className="w-full bg-[#F8F7FB] dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${ch.color}`}
                    style={{ width: ch.share }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recruiter Throughput Matrix */}
        <div className="p-6 bg-white dark:bg-[#1E1B29] border border-[#E9E6EF] dark:border-slate-800 rounded-2xl shadow-xs space-y-4">
          <div>
            <h2 className="text-sm font-bold text-[#292633] dark:text-white">
              Recruiter Sourcing Throughput
            </h2>
            <p className="text-xs text-[#817984]">Quarterly conversion performance by talent partner</p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-[#F8F7FB] dark:bg-slate-800/60 rounded-xl flex items-center justify-between border border-[#E9E6EF] dark:border-slate-750">
              <div>
                <div className="font-bold text-[#292633] dark:text-white">Priya Sharma</div>
                <div className="text-[11px] text-[#817984]">Cloud &amp; AI Practice · 4 Placements</div>
              </div>
              <div className="text-right font-mono">
                <div className="font-bold text-[#2E7D5B] dark:text-[#8AC9A7]">112% Quota</div>
                <div className="text-[10px] text-[#817984]">14 Subs · 28.5% Rate</div>
              </div>
            </div>

            <div className="p-3 bg-[#F8F7FB] dark:bg-slate-800/60 rounded-xl flex items-center justify-between border border-[#E9E6EF] dark:border-slate-750">
              <div>
                <div className="font-bold text-[#292633] dark:text-white">Marcus Vance</div>
                <div className="text-[11px] text-[#817984]">Fintech &amp; Enterprise · 3 Placements</div>
              </div>
              <div className="text-right font-mono">
                <div className="font-bold text-[#2E7D5B] dark:text-[#8AC9A7]">104% Quota</div>
                <div className="text-[10px] text-[#817984]">11 Subs · 27.2% Rate</div>
              </div>
            </div>

            <div className="p-3 bg-[#F8F7FB] dark:bg-slate-800/60 rounded-xl flex items-center justify-between border border-[#E9E6EF] dark:border-slate-750">
              <div>
                <div className="font-bold text-[#292633] dark:text-white">Anil Sengupta</div>
                <div className="text-[11px] text-[#817984]">Core Engineering · 2 Placements</div>
              </div>
              <div className="text-right font-mono">
                <div className="font-bold text-[#FF8243]">92% Quota</div>
                <div className="text-[10px] text-[#817984]">8 Subs · 25.0% Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
