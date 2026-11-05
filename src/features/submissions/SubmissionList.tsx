import React, { useState, useEffect } from 'react';
import {
  Send,
  Search,
  CheckCircle,
  XCircle,
  AlertCircle,
  Filter,
  DollarSign,
  Users
} from 'lucide-react';
import { useAppStore } from '../../store/appStore';
import { ApiService } from '../../services/api';
import { Submission } from '../../types';

export const SubmissionList: React.FC = () => {
  const { navigate } = useAppStore();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [search, setSearch] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    ApiService.getSubmissions().then(setSubmissions);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleUpdateApproval = async (id: string, newApproval: Submission['approvalStatus']) => {
    await ApiService.updateSubmissionApproval(id, newApproval);
    const updated = await ApiService.getSubmissions();
    setSubmissions(updated);
    showToast(`Submission marked as "${newApproval}"`);
  };

  const filtered = submissions.filter(
    (s) =>
      s.applicantName.toLowerCase().includes(search.toLowerCase()) ||
      s.jobTitle.toLowerCase().includes(search.toLowerCase()) ||
      s.client.toLowerCase().includes(search.toLowerCase()) ||
      s.recruiter.toLowerCase().includes(search.toLowerCase())
  );

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
      <div>
        <h1 className="text-xl sm:text-2xl font-display font-bold text-[#292633] dark:text-white">
          Client Submissions &amp; Approvals
        </h1>
        <p className="text-xs text-[#817984]">
          Track candidate dossiers submitted to clients, manager vetting, and client review stages
        </p>
      </div>

      {/* Search */}
      <div className="p-4 bg-white dark:bg-[#1E1B29] border border-[#E9E6EF] dark:border-slate-800 rounded-2xl shadow-xs">
        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#817984]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search candidate, job, client or recruiter..."
            className="w-full pl-10 pr-4 py-2 bg-[#F8F7FB] dark:bg-slate-800/80 border border-[#E9E6EF] dark:border-slate-700 rounded-xl text-xs text-[#292633] dark:text-white focus:outline-none focus:border-[#6941C6] focus:ring-1 focus:ring-[#6941C6]"
          />
        </div>
      </div>

      {/* Submissions Table */}
      <div className="bg-white dark:bg-[#1E1B29] border border-[#E9E6EF] dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F8F7FB] dark:bg-slate-800/60 border-b border-[#E9E6EF] dark:border-slate-800 text-[#817984] dark:text-slate-400">
                <th className="p-3.5 font-semibold">Submission ID &amp; Candidate</th>
                <th className="p-3.5 font-semibold">Associated Job</th>
                <th className="p-3.5 font-semibold">Enterprise Client</th>
                <th className="p-3.5 font-semibold">Bill / Pay Rate</th>
                <th className="p-3.5 font-semibold">Recruiter</th>
                <th className="p-3.5 font-semibold">Submitted Date</th>
                <th className="p-3.5 font-semibold">Client Status</th>
                <th className="p-3.5 font-semibold">Manager Vetting</th>
                <th className="p-3.5 font-semibold text-right">Approval Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E9E6EF] dark:divide-slate-800">
              {filtered.map((s) => (
                <tr
                  key={s.id}
                  className="hover:bg-[#F1EBFA]/50 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <td className="p-3.5">
                    <div className="font-bold text-[#292633] dark:text-white">{s.applicantName}</div>
                    <div className="font-mono text-[11px] text-[#6941C6] dark:text-[#A888EC] font-semibold">{s.submissionId}</div>
                  </td>

                  <td className="p-3.5 font-medium text-[#292633] dark:text-white">{s.jobTitle}</td>

                  <td className="p-3.5 text-[#817984]">{s.client}</td>

                  <td className="p-3.5 font-mono">
                    <div className="font-bold text-[#292633] dark:text-white">${s.billRate}/hr</div>
                    <div className="text-[10px] text-[#817984]">Pay: ${s.payRate}/hr</div>
                  </td>

                  <td className="p-3.5 text-[#292633] dark:text-slate-300">{s.recruiter}</td>

                  <td className="p-3.5 font-mono text-[#817984]">{s.submittedDate}</td>

                  <td className="p-3.5">
                    <span className="px-2 py-0.5 bg-[#F1EBFA] dark:bg-slate-800 border border-[#E9E6EF] dark:border-slate-700 rounded font-medium text-[11px] text-[#6941C6] dark:text-[#D1C5E4]">
                      {s.status}
                    </span>
                  </td>

                  <td className="p-3.5">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-md text-[11px] font-semibold border ${
                        s.approvalStatus === 'Approved'
                          ? 'bg-[#8AC9A7]/15 text-[#2E7D5B] border-[#8AC9A7]/30 dark:bg-[#8AC9A7]/20 dark:text-[#8AC9A7]'
                          : s.approvalStatus === 'Pending Approval'
                          ? 'bg-[#F1EBFA] text-[#6941C6] border-[#6941C6]/30 dark:bg-[#6941C6]/20 dark:text-[#D1C5E4]'
                          : 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800'
                      }`}
                    >
                      {s.approvalStatus}
                    </span>
                  </td>

                  <td className="p-3.5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleUpdateApproval(s.id, 'Approved')}
                        className="px-2.5 py-1 bg-[#8AC9A7] hover:bg-[#72B591] text-[#292633] rounded text-[11px] font-bold transition-colors"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleUpdateApproval(s.id, 'Revision Requested')}
                        className="px-2.5 py-1 border border-[#E9E6EF] dark:border-slate-700 hover:bg-[#F8F7FB] dark:hover:bg-slate-800 text-[#817984] dark:text-slate-300 rounded text-[11px] transition-colors"
                      >
                        Revise
                      </button>
                    </div>
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
