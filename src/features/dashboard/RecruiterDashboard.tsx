import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  Users,
  Send,
  Calendar,
  Award,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Search,
  UserPlus,
  ChevronRight,
  Filter,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { useAppStore } from '../../store/appStore';
import { ApiService } from '../../services/api';
import { Job, Applicant, Interview, TaskItem } from '../../types';

export const RecruiterDashboard: React.FC = () => {
  const { navigate, currentUser } = useAppStore();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      ApiService.getJobs(),
      ApiService.getApplicants(),
      ApiService.getInterviews(),
      ApiService.getTasks()
    ]).then(([j, a, i, t]) => {
      setJobs(j);
      setApplicants(a);
      setInterviews(i);
      setTasks(t);
      setLoading(false);
    });
  }, []);

  const handleToggleTask = async (id: string) => {
    await ApiService.toggleTaskStatus(id);
    const updated = await ApiService.getTasks();
    setTasks(updated);
  };

  const recruiterJobs = jobs.filter((j) => j.assignedRecruiter.includes('Priya') || j.status === 'Open');
  const upcomingInterviews = interviews.filter((i) => i.status === 'Scheduled');

  const stageCounts = {
    New: applicants.filter((a) => a.status === 'New').length,
    Screening: applicants.filter((a) => a.status === 'Screening').length,
    Submitted: applicants.filter((a) => a.status === 'Submitted').length,
    Interview: applicants.filter((a) => a.status === 'Interview').length,
    Selected: applicants.filter((a) => a.status === 'Selected').length,
    Offered: applicants.filter((a) => a.status === 'Offered').length,
    Hired: applicants.filter((a) => a.status === 'Hired').length
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner with Deep Violet #402568 & Royal Purple #6941C6 */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#402568] via-[#502E80] to-[#6941C6] text-white p-6 sm:p-7 rounded-2xl border border-[#351E57] shadow-md flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="relative z-10 space-y-1.5">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-white/15 border border-white/20 text-[#F1EBFA] text-[11px] font-mono font-medium">
            <Sparkles className="w-3 h-3 text-[#FF8243]" />
            <span>RECRUITER WORKSPACE · ACTIVE SOURCING DESK</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight text-white">
            Good morning, {currentUser?.name || 'Priya'}
          </h1>
          <p className="text-xs text-[#F1EBFA] max-w-xl">
            You have <span className="text-[#FF8243] font-semibold">{upcomingInterviews.length} client interviews</span> scheduled today and <span className="text-[#8AC9A7] font-semibold">2 high-priority offers</span> awaiting release.
          </p>
        </div>

        {/* Quick Launch Buttons: Primary Bright Orange #FF8243 */}
        <div className="relative z-10 flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            onClick={() => navigate('applicant-new')}
            className="px-4 py-2 bg-[#FF8243] hover:bg-[#E96F30] text-white text-xs font-semibold rounded-xl shadow-xs shadow-[#FF8243]/30 transition-all flex items-center gap-1.5"
          >
            <UserPlus className="w-4 h-4" />
            <span>Fast Resume Parse</span>
          </button>
          <button
            onClick={() => navigate('search')}
            className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl border border-white/20 transition-colors flex items-center gap-1.5 backdrop-blur-xs"
          >
            <Search className="w-4 h-4 text-[#F1EBFA]" />
            <span>Boolean Search</span>
          </button>
          <button
            onClick={() => navigate('pipeline')}
            className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl border border-white/20 transition-colors backdrop-blur-xs"
          >
            Pipeline Kanban
          </button>
        </div>
      </div>

      {/* Recruiter KPI Cards: White #FFFFFF cards, Light Grey #E9E6EF borders */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="p-4 bg-white dark:bg-[#221D2E] border border-[#E9E6EF] dark:border-[#383049] rounded-2xl shadow-xs">
          <div className="flex items-center justify-between text-[#5F5972] dark:text-[#B9B2CE]">
            <span className="text-xs font-medium">Assigned Jobs</span>
            <div className="p-1.5 rounded-lg bg-[#F1EBFA] dark:bg-[#312845] text-[#6941C6] dark:text-[#D1C5E4]">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-mono text-[#292633] dark:text-[#F8F7FB] mt-2 tabular-nums">
            {recruiterJobs.length}
          </div>
          <div className="text-[11px] text-[#FF8243] font-semibold mt-1">3 Urgent Priority</div>
        </div>

        <div className="p-4 bg-white dark:bg-[#221D2E] border border-[#E9E6EF] dark:border-[#383049] rounded-2xl shadow-xs">
          <div className="flex items-center justify-between text-[#5F5972] dark:text-[#B9B2CE]">
            <span className="text-xs font-medium">Active Candidates</span>
            <div className="p-1.5 rounded-lg bg-[#F1EBFA] dark:bg-[#312845] text-[#6941C6] dark:text-[#D1C5E4]">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-mono text-[#292633] dark:text-[#F8F7FB] mt-2 tabular-nums">
            {applicants.length}
          </div>
          <div className="text-[11px] text-[#5F5972] dark:text-[#B9B2CE] mt-1">In Active Process</div>
        </div>

        <div className="p-4 bg-white dark:bg-[#221D2E] border border-[#E9E6EF] dark:border-[#383049] rounded-2xl shadow-xs">
          <div className="flex items-center justify-between text-[#5F5972] dark:text-[#B9B2CE]">
            <span className="text-xs font-medium">Submitted</span>
            <div className="p-1.5 rounded-lg bg-[#8AC9A7]/20 text-[#276749] dark:text-[#8AC9A7]">
              <Send className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-mono text-[#292633] dark:text-[#F8F7FB] mt-2 tabular-nums">
            {stageCounts.Submitted + 2}
          </div>
          <div className="text-[11px] text-[#276749] dark:text-[#8AC9A7] font-semibold mt-1">94% Approval Rate</div>
        </div>

        <div className="p-4 bg-white dark:bg-[#221D2E] border border-[#E9E6EF] dark:border-[#383049] rounded-2xl shadow-xs">
          <div className="flex items-center justify-between text-[#5F5972] dark:text-[#B9B2CE]">
            <span className="text-xs font-medium">Interviews</span>
            <div className="p-1.5 rounded-lg bg-[#F1EBFA] dark:bg-[#312845] text-[#6941C6] dark:text-[#D1C5E4]">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-mono text-[#292633] dark:text-[#F8F7FB] mt-2 tabular-nums">
            {interviews.length}
          </div>
          <div className="text-[11px] text-[#6941C6] dark:text-[#D1C5E4] font-semibold mt-1">2 Scheduled Today</div>
        </div>

        <div className="p-4 bg-white dark:bg-[#221D2E] border border-[#E9E6EF] dark:border-[#383049] rounded-2xl shadow-xs">
          <div className="flex items-center justify-between text-[#5F5972] dark:text-[#B9B2CE]">
            <span className="text-xs font-medium">Offers Released</span>
            <div className="p-1.5 rounded-lg bg-[#FF8243]/15 text-[#FF8243]">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-mono text-[#292633] dark:text-[#F8F7FB] mt-2 tabular-nums">
            {stageCounts.Offered + 1}
          </div>
          <div className="text-[11px] text-[#FF8243] font-semibold mt-1">Avg 10 Days Close</div>
        </div>

        <div className="p-4 bg-white dark:bg-[#221D2E] border border-[#E9E6EF] dark:border-[#383049] rounded-2xl shadow-xs">
          <div className="flex items-center justify-between text-[#5F5972] dark:text-[#B9B2CE]">
            <span className="text-xs font-medium">Placements (Q4)</span>
            <div className="p-1.5 rounded-lg bg-[#8AC9A7]/20 text-[#276749] dark:text-[#8AC9A7]">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-mono text-[#292633] dark:text-[#F8F7FB] mt-2 tabular-nums">
            {stageCounts.Hired + 2}
          </div>
          <div className="text-[11px] text-[#276749] dark:text-[#8AC9A7] font-semibold mt-1">112% to Quota</div>
        </div>
      </div>

      {/* Main Grid: Pipeline Funnel & Upcoming Interviews */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Mini-Pipeline Funnel */}
        <div className="lg:col-span-7 bg-white dark:bg-[#221D2E] border border-[#E9E6EF] dark:border-[#383049] rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-[#292633] dark:text-white">Active Candidate Pipeline</h2>
              <p className="text-xs text-[#5F5972] dark:text-[#B9B2CE]">Distribution across standardized recruitment stages</p>
            </div>
            <button
              onClick={() => navigate('pipeline')}
              className="text-xs font-semibold text-[#6941C6] hover:text-[#502E80] flex items-center gap-1 transition-colors"
            >
              <span>Full Kanban Board</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Selected backgrounds: Soft Lavender #F1EBFA */}
          <div className="grid grid-cols-7 gap-2 pt-2 text-center text-xs">
            {Object.entries(stageCounts).map(([stage, count]) => (
              <div
                key={stage}
                onClick={() => navigate('pipeline')}
                className="p-2.5 bg-[#F1EBFA] dark:bg-[#312845] border border-[#E9E6EF] dark:border-[#4A4061] rounded-xl hover:border-[#6941C6] cursor-pointer transition-all"
              >
                <div className="text-lg font-bold font-mono text-[#6941C6] dark:text-[#D1C5E4] tabular-nums">
                  {count}
                </div>
                <div className="text-[11px] font-semibold text-[#5F5972] dark:text-[#B9B2CE] mt-1 truncate">
                  {stage}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Candidates Table */}
          <div className="pt-2">
            <div className="text-xs font-semibold text-[#292633] dark:text-white mb-2">
              Recent Candidate Activity
            </div>
            <div className="divide-y divide-[#E9E6EF] dark:divide-[#383049]">
              {applicants.slice(0, 4).map((a) => (
                <div
                  key={a.id}
                  onClick={() => navigate('applicant-detail', a.id)}
                  className="py-2.5 flex items-center justify-between hover:bg-[#F1EBFA]/60 dark:hover:bg-[#312845]/50 px-2 rounded-xl cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img src={a.avatar} alt={a.name} className="w-8 h-8 rounded-full object-cover ring-1 ring-[#E9E6EF]" />
                    <div>
                      <div className="text-xs font-semibold text-[#292633] dark:text-white">{a.name}</div>
                      <div className="text-[11px] text-[#5F5972] dark:text-[#B9B2CE]">{a.currentDesignation} · {a.location}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs">
                    {/* Mint #8AC9A7 Match Index */}
                    <span className="font-mono text-xs font-bold text-[#276749] dark:text-[#8AC9A7] bg-[#8AC9A7]/20 border border-[#8AC9A7]/40 px-2 py-0.5 rounded">
                      {a.matchScore}% Match
                    </span>
                    <span className="px-2 py-0.5 bg-[#F8F7FB] dark:bg-[#312845] text-[#5F5972] dark:text-[#D1C5E4] border border-[#E9E6EF] dark:border-[#4A4061] rounded text-[11px] font-medium">
                      {a.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Today's Interviews & Tasks */}
        <div className="lg:col-span-5 space-y-6">
          {/* Upcoming Interviews Card */}
          <div className="bg-white dark:bg-[#221D2E] border border-[#E9E6EF] dark:border-[#383049] rounded-2xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-[#292633] dark:text-white">Upcoming Client Interviews</h2>
              <button
                onClick={() => navigate('interviews')}
                className="text-xs font-semibold text-[#6941C6] hover:text-[#502E80]"
              >
                Calendar View
              </button>
            </div>

            <div className="space-y-2.5">
              {upcomingInterviews.map((intv) => (
                <div
                  key={intv.id}
                  className="p-3 bg-[#F8F7FB] dark:bg-[#1A1624] border border-[#E9E6EF] dark:border-[#383049] rounded-xl space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-bold text-[#292633] dark:text-white">
                      {intv.applicantName}
                    </div>
                    <span className="text-[10px] font-mono text-[#6941C6] dark:text-[#D1C5E4] bg-[#F1EBFA] dark:bg-[#312845] px-2 py-0.5 rounded border border-[#E9E6EF] dark:border-[#4A4061]">
                      {intv.type}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#5F5972] dark:text-[#B9B2CE] truncate">
                    {intv.jobTitle} · {intv.client}
                  </div>
                  <div className="flex items-center justify-between pt-1 text-[11px]">
                    <span className="font-mono text-[#5F5972] dark:text-[#B9B2CE] flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#8E88A2]" />
                      {intv.date} · {intv.time}
                    </span>
                    <a
                      href={intv.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#276749] dark:text-[#8AC9A7] hover:underline flex items-center gap-1 font-semibold"
                    >
                      <span>Join Meet</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Tasks Card */}
          <div className="bg-white dark:bg-[#221D2E] border border-[#E9E6EF] dark:border-[#383049] rounded-2xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-[#292633] dark:text-white">Pending Action Items</h2>
              <button onClick={() => navigate('tasks')} className="text-xs font-semibold text-[#6941C6] hover:text-[#502E80]">
                View All ({tasks.length})
              </button>
            </div>

            <div className="space-y-2">
              {tasks.slice(0, 3).map((t) => (
                <div
                  key={t.id}
                  onClick={() => handleToggleTask(t.id)}
                  className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-[#F1EBFA]/60 dark:hover:bg-[#312845]/50 cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={t.status === 'Completed'}
                    onChange={() => {}}
                    className="mt-0.5 rounded border-[#E9E6EF] text-[#6941C6] focus:ring-[#6941C6]"
                  />
                  <div className="flex-1 min-w-0">
                    <div
                      className={`text-xs font-medium truncate ${
                        t.status === 'Completed'
                          ? 'line-through text-[#8E88A2]'
                          : 'text-[#292633] dark:text-white'
                      }`}
                    >
                      {t.title}
                    </div>
                    <div className="text-[10px] text-[#5F5972] dark:text-[#B9B2CE] font-mono">
                      Due: {t.dueDate} · Priority: {t.priority}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
