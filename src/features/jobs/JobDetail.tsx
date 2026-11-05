import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  MapPin,
  Building2,
  DollarSign,
  Users,
  Clock,
  ArrowLeft,
  CheckCircle,
  Plus,
  Send,
  Calendar,
  ChevronRight
} from 'lucide-react';
import { useAppStore } from '../../store/appStore';
import { ApiService } from '../../services/api';
import { Job, Applicant, JobStatus } from '../../types';

export const JobDetail: React.FC = () => {
  const { selectedId, navigate } = useAppStore();
  const [job, setJob] = useState<Job | null>(null);
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [status, setStatus] = useState<JobStatus>('Open');

  useEffect(() => {
    if (selectedId) {
      ApiService.getJobById(selectedId).then((j) => {
        if (j) {
          setJob(j);
          setStatus(j.status);
        }
      });
      ApiService.getApplicants().then((apps) => {
        setApplicants(apps.filter((a) => a.assignedJobId === selectedId));
      });
    } else {
      // Default to first job if no ID passed
      ApiService.getJobs().then((jobs) => {
        if (jobs.length > 0) {
          setJob(jobs[0]);
          setStatus(jobs[0].status);
          ApiService.getApplicants().then((apps) => {
            setApplicants(apps.filter((a) => a.assignedJobId === jobs[0].id));
          });
        }
      });
    }
  }, [selectedId]);

  if (!job) {
    return (
      <div className="p-8 text-center text-xs text-[#5F5972]">
        Loading requisition dossier...
      </div>
    );
  }

  const handleStatusChange = async (newStatus: JobStatus) => {
    setStatus(newStatus);
    await ApiService.updateJob(job.id, { status: newStatus });
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Back button & Action Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('jobs')}
          className="flex items-center gap-2 text-xs font-semibold text-[#5F5972] hover:text-[#6941C6] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Requisitions</span>
        </button>

        <div className="flex items-center gap-3">
          <select
            value={status}
            onChange={(e) => handleStatusChange(e.target.value as JobStatus)}
            className="px-3 py-1.5 bg-white dark:bg-[#221D2E] border border-[#E9E6EF] dark:border-[#383049] rounded-xl text-xs font-semibold text-[#292633] dark:text-white focus:outline-none"
          >
            <option value="Open">Status: Open</option>
            <option value="Sourcing">Status: Sourcing</option>
            <option value="In Review">Status: In Review</option>
            <option value="Closed">Status: Closed</option>
            <option value="On Hold">Status: On Hold</option>
          </select>

          {/* Primary Action Button: Bright Orange #FF8243 */}
          <button
            onClick={() => navigate('applicant-new')}
            className="px-4 py-2 bg-[#FF8243] hover:bg-[#E96F30] text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 shadow-[#FF8243]/20"
          >
            <Plus className="w-4 h-4" />
            <span>Add Candidate to Requisition</span>
          </button>
        </div>
      </div>

      {/* Hero Dossier Card: White #FFFFFF, Light Grey #E9E6EF border */}
      <div className="p-6 bg-white dark:bg-[#221D2E] border border-[#E9E6EF] dark:border-[#383049] rounded-2xl shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#6941C6]">
              <span className="font-semibold">{job.code}</span>
              <span className="text-[#8E88A2]">·</span>
              <span className="text-[#5F5972] dark:text-[#B9B2CE]">{job.businessUnit}</span>
              <span className="text-[#8E88A2]">·</span>
              <span className="font-semibold text-[#FF8243]">{job.priority} Priority</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-[#292633] dark:text-white mt-1">
              {job.title}
            </h1>
            <div className="flex items-center gap-4 text-xs text-[#5F5972] dark:text-[#B9B2CE] mt-2">
              <span className="flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-[#6941C6]" />
                {job.client}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#8AC9A7]" />
                {job.location}
              </span>
              <span className="px-2 py-0.5 rounded bg-[#F1EBFA] dark:bg-[#312845] text-[#6941C6] dark:text-[#D1C5E4] font-medium border border-[#E9E6EF] dark:border-[#4A4061]">
                {job.type}
              </span>
            </div>
          </div>

          {/* Rates Box */}
          <div className="p-4 bg-[#F8F7FB] dark:bg-[#1A1624] border border-[#E9E6EF] dark:border-[#383049] rounded-2xl text-right">
            <div className="text-xs text-[#5F5972] dark:text-[#B9B2CE]">Bill Rate / Target Pay</div>
            <div className="text-xl font-bold font-mono text-[#292633] dark:text-white tabular-nums">
              ${job.billRate} <span className="text-xs text-[#5F5972]">/ hr</span>
            </div>
            <div className="text-xs font-mono text-[#276749] dark:text-[#8AC9A7] font-semibold mt-0.5">
              Pay: ${job.payRate}/hr (Spread: ${job.billRate - job.payRate}/hr)
            </div>
          </div>
        </div>

        {/* Skills Required */}
        <div className="pt-4 border-t border-[#E9E6EF] dark:border-[#383049] space-y-2">
          <div className="text-xs font-bold text-[#292633] dark:text-white">Required Skills</div>
          <div className="flex flex-wrap gap-2">
            {job.skills.map((sk) => (
              <span
                key={sk}
                className="px-2.5 py-1 bg-[#F1EBFA] dark:bg-[#312845] border border-[#E9E6EF] dark:border-[#4A4061] rounded-lg font-mono text-xs text-[#6941C6] dark:text-[#D1C5E4]"
              >
                {sk}
              </span>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="pt-4 border-t border-[#E9E6EF] dark:border-[#383049] space-y-2 text-xs">
          <div className="font-bold text-[#292633] dark:text-white">Requisition Scope</div>
          <p className="text-[#5F5972] dark:text-[#B9B2CE] leading-relaxed">{job.description}</p>
        </div>
      </div>

      {/* Associated Candidates Roster */}
      <div className="bg-white dark:bg-[#221D2E] border border-[#E9E6EF] dark:border-[#383049] rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-[#292633] dark:text-white">
              Assigned Candidate Pipeline ({applicants.length})
            </h2>
            <p className="text-xs text-[#5F5972] dark:text-[#B9B2CE]">
              Profiles matched and submitted for this requisition
            </p>
          </div>
        </div>

        {applicants.length === 0 ? (
          <div className="py-8 text-center text-xs text-[#8E88A2]">
            No candidates linked to this requisition yet.
          </div>
        ) : (
          <div className="divide-y divide-[#E9E6EF] dark:divide-[#383049]">
            {applicants.map((a) => (
              <div
                key={a.id}
                onClick={() => navigate('applicant-detail', a.id)}
                className="py-3 flex items-center justify-between hover:bg-[#F1EBFA]/50 dark:hover:bg-[#312845]/40 px-3 rounded-xl cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <img src={a.avatar} alt={a.name} className="w-10 h-10 rounded-full object-cover ring-1 ring-[#E9E6EF]" />
                  <div>
                    <div className="text-xs font-bold text-[#292633] dark:text-white">{a.name}</div>
                    <div className="text-[11px] text-[#5F5972] dark:text-[#B9B2CE]">{a.currentDesignation} · {a.location}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs">
                  {/* Mint #8AC9A7 fit index */}
                  <span className="font-mono font-bold text-[#276749] dark:text-[#8AC9A7] bg-[#8AC9A7]/20 border border-[#8AC9A7]/40 px-2.5 py-0.5 rounded">
                    {a.matchScore}% Match
                  </span>
                  <span className="px-2 py-0.5 bg-[#F8F7FB] dark:bg-[#312845] border border-[#E9E6EF] dark:border-[#4A4061] rounded font-medium text-[#5F5972] dark:text-[#D1C5E4]">
                    {a.status}
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#8E88A2]" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
