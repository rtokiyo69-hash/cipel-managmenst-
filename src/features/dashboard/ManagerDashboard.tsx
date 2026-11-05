import React, { useState, useEffect } from 'react';
import {
  Users,
  Briefcase,
  Send,
  Calendar,
  Award,
  CheckCircle,
  XCircle,
  TrendingUp,
  BarChart2,
  Clock,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useAppStore } from '../../store/appStore';
import { ApiService } from '../../services/api';
import { Submission, Job, Applicant, User } from '../../types';

export const ManagerDashboard: React.FC = () => {
  const { navigate, currentUser } = useAppStore();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      ApiService.getSubmissions(),
      ApiService.getJobs(),
      ApiService.getApplicants(),
      ApiService.getAllUsers()
    ]).then(([s, j, a, u]) => {
      setSubmissions(s);
      setJobs(j);
      setApplicants(a);
      setUsers(u);
      setLoading(false);
    });
  }, []);

  const handleApproval = async (id: string, status: 'Approved' | 'Revision Requested') => {
    await ApiService.updateSubmissionApproval(id, status);
    const updated = await ApiService.getSubmissions();
    setSubmissions(updated);
  };

  const pendingSubmissions = submissions.filter((s) => s.approvalStatus === 'Pending Approval');
  const activePlacementsCount = 6;

  const leaderboard = [
    { name: 'Priya Sharma', role: 'Lead Technical Recruiter', activeJobs: 3, submissions: 14, placements: 4, hitRate: '28.5%', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250' },
    { name: 'Marcus Vance', role: 'Senior Talent Partner', activeJobs: 2, submissions: 11, placements: 3, hitRate: '27.2%', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250' },
    { name: 'Anil Sengupta', role: 'Technical Recruiter', activeJobs: 2, submissions: 8, placements: 2, hitRate: '25.0%', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250' }
  ];

  return (
    <div className="space-y-6">
      {/* Banner: Deep Violet #402568 to Royal Purple #6941C6 */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#402568] via-[#502E80] to-[#6941C6] text-white p-6 sm:p-7 rounded-2xl border border-[#351E57] shadow-md flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="relative z-10 space-y-1.5">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-white/15 border border-white/20 text-[#F1EBFA] text-[11px] font-mono font-medium">
            <Sparkles className="w-3 h-3 text-[#FF8243]" />
            <span>PRACTICE LEAD DESK · CLOUD &amp; AI TALENT PRACTICE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight text-white">
            Practice Overview, {currentUser?.name || 'Rajesh'}
          </h1>
          <p className="text-xs text-[#F1EBFA] max-w-xl">
            Your team is pacing at <span className="text-[#8AC9A7] font-semibold">108% Q4 target</span> with {pendingSubmissions.length} candidate submission awaiting managerial review.
          </p>
        </div>

        <div className="relative z-10 flex gap-2.5 shrink-0">
          <button
            onClick={() => navigate('submissions')}
            className="px-4 py-2 bg-[#FF8243] hover:bg-[#E96F30] text-white text-xs font-semibold rounded-xl shadow-xs shadow-[#FF8243]/30 transition-all flex items-center gap-2"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Review Submissions ({pendingSubmissions.length})</span>
          </button>
          <button
            onClick={() => navigate('reports')}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl border border-white/20 transition-colors backdrop-blur-xs"
          >
            Team Reports
          </button>
        </div>
      </div>

      {/* KPI Cards: White #FFFFFF, Light Grey #E9E6EF borders */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="p-4 bg-white dark:bg-[#221D2E] border border-[#E9E6EF] dark:border-[#383049] rounded-2xl shadow-xs">
          <div className="flex items-center justify-between text-[#5F5972] dark:text-[#B9B2CE]">
            <span className="text-xs font-medium">Team Members</span>
            <Users className="w-4 h-4 text-[#6941C6]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#292633] dark:text-white mt-2 tabular-nums">8</div>
          <div className="text-[11px] text-[#276749] dark:text-[#8AC9A7] mt-1 font-semibold">100% Operational</div>
        </div>

        <div className="p-4 bg-white dark:bg-[#221D2E] border border-[#E9E6EF] dark:border-[#383049] rounded-2xl shadow-xs">
          <div className="flex items-center justify-between text-[#5F5972] dark:text-[#B9B2CE]">
            <span className="text-xs font-medium">Active Jobs</span>
            <Briefcase className="w-4 h-4 text-[#6941C6]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#292633] dark:text-white mt-2 tabular-nums">{jobs.length}</div>
          <div className="text-[11px] text-[#5F5972] dark:text-[#B9B2CE] mt-1">Across 4 Accounts</div>
        </div>

        <div className="p-4 bg-white dark:bg-[#221D2E] border border-[#E9E6EF] dark:border-[#383049] rounded-2xl shadow-xs">
          <div className="flex items-center justify-between text-[#5F5972] dark:text-[#B9B2CE]">
            <span className="text-xs font-medium">Assigned Applicants</span>
            <Users className="w-4 h-4 text-[#8AC9A7]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#292633] dark:text-white mt-2 tabular-nums">{applicants.length}</div>
          <div className="text-[11px] text-[#5F5972] dark:text-[#B9B2CE] mt-1">In Team Pipeline</div>
        </div>

        <div className="p-4 bg-white dark:bg-[#221D2E] border border-[#E9E6EF] dark:border-[#383049] rounded-2xl shadow-xs">
          <div className="flex items-center justify-between text-[#5F5972] dark:text-[#B9B2CE]">
            <span className="text-xs font-medium">Pending Approvals</span>
            <Send className="w-4 h-4 text-[#FF8243]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#FF8243] mt-2 tabular-nums">{pendingSubmissions.length}</div>
          <div className="text-[11px] text-[#FF8243] mt-1 font-semibold">Requires Review</div>
        </div>

        <div className="p-4 bg-white dark:bg-[#221D2E] border border-[#E9E6EF] dark:border-[#383049] rounded-2xl shadow-xs">
          <div className="flex items-center justify-between text-[#5F5972] dark:text-[#B9B2CE]">
            <span className="text-xs font-medium">Interviews</span>
            <Calendar className="w-4 h-4 text-[#6941C6]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#292633] dark:text-white mt-2 tabular-nums">12</div>
          <div className="text-[11px] text-[#276749] dark:text-[#8AC9A7] mt-1 font-semibold">Scheduled This Wk</div>
        </div>

        <div className="p-4 bg-white dark:bg-[#221D2E] border border-[#E9E6EF] dark:border-[#383049] rounded-2xl shadow-xs">
          <div className="flex items-center justify-between text-[#5F5972] dark:text-[#B9B2CE]">
            <span className="text-xs font-medium">Placements (Q4)</span>
            <Award className="w-4 h-4 text-[#8AC9A7]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#292633] dark:text-white mt-2 tabular-nums">{activePlacementsCount}</div>
          <div className="text-[11px] text-[#276749] dark:text-[#8AC9A7] mt-1 font-semibold">$42k Gross Spread</div>
        </div>
      </div>

      {/* Grid: Pending Submission Approvals & Recruiter Leaderboard */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Left Column: Manager Approvals Desk */}
        <div className="lg:col-span-7 bg-white dark:bg-[#221D2E] border border-[#E9E6EF] dark:border-[#383049] rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-[#292633] dark:text-white">
                Submission Approvals Queue
              </h2>
              <p className="text-xs text-[#5F5972] dark:text-[#B9B2CE]">
                Review candidate resumes and rates before client dispatch
              </p>
            </div>
            <button
              onClick={() => navigate('submissions')}
              className="text-xs font-semibold text-[#6941C6] hover:text-[#502E80]"
            >
              All Submissions
            </button>
          </div>

          <div className="divide-y divide-[#E9E6EF] dark:divide-[#383049]">
            {submissions.map((sub) => (
              <div key={sub.id} className="py-3 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="text-xs font-bold text-[#292633] dark:text-white truncate">
                    {sub.applicantName}
                  </div>
                  <div className="text-[11px] text-[#5F5972] dark:text-[#B9B2CE] truncate">
                    {sub.jobTitle} · Client: {sub.client}
                  </div>
                  <div className="text-[10px] font-mono text-[#6941C6] dark:text-[#D1C5E4] mt-0.5">
                    Recruiter: {sub.recruiter} · Bill: ${sub.billRate}/hr · Pay: ${sub.payRate}/hr
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {sub.approvalStatus === 'Pending Approval' ? (
                    <>
                      <button
                        onClick={() => handleApproval(sub.id, 'Approved')}
                        className="px-3 py-1 bg-[#8AC9A7] hover:bg-[#72B491] text-[#1E4D36] text-xs font-bold rounded-xl transition-colors flex items-center gap-1 shadow-xs"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Approve</span>
                      </button>
                      <button
                        onClick={() => handleApproval(sub.id, 'Revision Requested')}
                        className="px-2.5 py-1 bg-[#F8F7FB] dark:bg-[#312845] text-rose-600 hover:bg-rose-50 text-xs font-semibold rounded-xl border border-[#E9E6EF] dark:border-[#4A4061] transition-colors"
                      >
                        Revise
                      </button>
                    </>
                  ) : (
                    <span className="text-xs font-mono text-[#276749] dark:text-[#8AC9A7] font-semibold bg-[#8AC9A7]/20 border border-[#8AC9A7]/40 px-2 py-0.5 rounded">
                      ✓ {sub.approvalStatus}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Recruiter Leaderboard */}
        <div className="lg:col-span-5 bg-white dark:bg-[#221D2E] border border-[#E9E6EF] dark:border-[#383049] rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-[#292633] dark:text-white">Recruiter Leaderboard</h2>
              <p className="text-xs text-[#5F5972] dark:text-[#B9B2CE]">Practice throughput &amp; placement efficiency</p>
            </div>
            <TrendingUp className="w-4 h-4 text-[#8AC9A7]" />
          </div>

          <div className="space-y-3">
            {leaderboard.map((rec, idx) => (
              <div
                key={rec.name}
                className="p-3 bg-[#F8F7FB] dark:bg-[#1A1624] border border-[#E9E6EF] dark:border-[#383049] rounded-xl flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-6 text-center font-mono font-bold text-xs text-[#6941C6] dark:text-[#D1C5E4]">
                    0{idx + 1}
                  </div>
                  <img src={rec.avatar} alt={rec.name} className="w-9 h-9 rounded-full object-cover ring-1 ring-[#E9E6EF]" />
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-[#292633] dark:text-white truncate">
                      {rec.name}
                    </div>
                    <div className="text-[11px] text-[#5F5972] dark:text-[#B9B2CE]">{rec.role}</div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xs font-bold font-mono text-[#276749] dark:text-[#8AC9A7] tabular-nums">
                    {rec.placements} Placements
                  </div>
                  <div className="text-[10px] text-[#5F5972] dark:text-[#B9B2CE] font-mono">
                    {rec.submissions} Subs · {rec.hitRate}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 text-center">
            <button
              onClick={() => navigate('reports')}
              className="text-xs font-semibold text-[#6941C6] hover:text-[#502E80] hover:underline"
            >
              View Full Practice Productivity Report →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
