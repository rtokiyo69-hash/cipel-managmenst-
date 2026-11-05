import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  Search,
  Filter,
  Plus,
  Download,
  Eye,
  SlidersHorizontal,
  ChevronDown,
  Trash2,
  CheckCircle,
  Building2,
  MapPin,
  Clock
} from 'lucide-react';
import { useAppStore } from '../../store/appStore';
import { ApiService } from '../../services/api';
import { Job, JobStatus, Priority } from '../../types';

export const JobList: React.FC = () => {
  const { navigate } = useAppStore();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [priorityFilter, setPriorityFilter] = useState<string>('All');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    ApiService.getJobs().then(setJobs);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredJobs = jobs.filter((j) => {
    const matchesSearch =
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.code.toLowerCase().includes(search.toLowerCase()) ||
      j.client.toLowerCase().includes(search.toLowerCase()) ||
      j.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus = statusFilter === 'All' || j.status === statusFilter;
    const matchesPriority = priorityFilter === 'All' || j.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(filteredJobs.map((j) => j.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['Code,Title,Client,Location,Type,Status,Priority,BillRate,Recruiter']
        .concat(
          filteredJobs.map(
            (j) =>
              `"${j.code}","${j.title}","${j.client}","${j.location}","${j.type}","${j.status}","${j.priority}","${j.billRate}","${j.assignedRecruiter}"`
          )
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `NexusTalent_Requisitions_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Exported ${filteredJobs.length} requisitions to CSV.`);
  };

  const handleBulkStatusChange = async (newStatus: JobStatus) => {
    for (const id of selectedIds) {
      await ApiService.updateJob(id, { status: newStatus });
    }
    const updated = await ApiService.getJobs();
    setJobs(updated);
    setSelectedIds([]);
    showToast(`Updated status to "${newStatus}" for ${selectedIds.length} requisitions.`);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#402568] text-white border border-[#6941C6] px-4 py-2 rounded-xl shadow-xl text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle className="w-4 h-4 text-[#8AC9A7]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header & Primary Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-display font-bold text-[#292633] dark:text-white">
            Job Requisitions
          </h1>
          <p className="text-xs text-[#5F5972] dark:text-[#B9B2CE]">
            Manage open positions, recruiter allocations, client bill rates, and submission pipelines
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportCSV}
            className="px-3 py-2 bg-white dark:bg-[#221D2E] border border-[#E9E6EF] dark:border-[#383049] hover:bg-[#F1EBFA] rounded-xl text-xs font-semibold text-[#292633] dark:text-[#F8F7FB] transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-[#8E88A2]" />
            <span>Export CSV</span>
          </button>

          {/* Primary Button: Bright Orange #FF8243 */}
          <button
            onClick={() => navigate('job-new')}
            className="px-4 py-2 bg-[#FF8243] hover:bg-[#E96F30] text-white rounded-xl text-xs font-semibold shadow-xs shadow-[#FF8243]/30 transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Create Requisition</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar: White #FFFFFF card, Light Grey #E9E6EF border */}
      <div className="p-4 bg-white dark:bg-[#221D2E] border border-[#E9E6EF] dark:border-[#383049] rounded-2xl shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full md:w-auto flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E88A2]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter by code, title, skills, client..."
              className="w-full pl-10 pr-4 py-2 bg-[#F8F7FB] dark:bg-[#1A1624] border border-[#E9E6EF] dark:border-[#383049] rounded-xl text-xs text-[#292633] dark:text-[#F8F7FB] focus:outline-none focus:border-[#6941C6]"
            />
          </div>

          {/* Status Segment - Soft Lavender #F1EBFA selected bg, Royal Purple #6941C6 text */}
          <div className="hidden lg:flex items-center gap-1 p-1 bg-[#F8F7FB] dark:bg-[#1A1624] border border-[#E9E6EF] dark:border-[#383049] rounded-xl text-xs">
            {['All', 'Open', 'Sourcing', 'In Review'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                  statusFilter === st
                    ? 'bg-white dark:bg-[#221D2E] text-[#6941C6] font-bold shadow-xs'
                    : 'text-[#5F5972] dark:text-[#B9B2CE] hover:text-[#292633] dark:hover:text-white'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Priority Filter */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-1.5 text-xs text-[#5F5972] dark:text-[#B9B2CE]">
            <Filter className="w-3.5 h-3.5 text-[#6941C6]" />
            <span>Priority:</span>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="bg-[#F8F7FB] dark:bg-[#1A1624] border border-[#E9E6EF] dark:border-[#383049] rounded-xl px-2.5 py-1 text-xs text-[#292633] dark:text-[#F8F7FB] focus:outline-none focus:border-[#6941C6]"
            >
              <option value="All">All Priorities</option>
              <option value="Urgent">Urgent</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bulk Action Bar (when rows selected) */}
      {selectedIds.length > 0 && (
        <div className="p-3 bg-[#402568] text-white rounded-2xl flex items-center justify-between text-xs animate-in fade-in shadow-md">
          <span className="font-mono text-[#F1EBFA]">
            {selectedIds.length} requisitions selected
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleBulkStatusChange('Open')}
              className="px-3 py-1 bg-[#8AC9A7] hover:bg-[#72B491] text-[#1E4D36] font-bold rounded-lg transition-colors"
            >
              Mark Open
            </button>
            <button
              onClick={() => handleBulkStatusChange('In Review')}
              className="px-3 py-1 bg-[#FF8243] hover:bg-[#E96F30] text-white font-bold rounded-lg transition-colors"
            >
              Mark In Review
            </button>
            <button
              onClick={() => setSelectedIds([])}
              className="px-2 py-1 text-[#D1C5E4] hover:text-white transition-colors"
            >
              Clear Selection
            </button>
          </div>
        </div>
      )}

      {/* High-Density Data Grid: White #FFFFFF card, Light Grey #E9E6EF borders */}
      <div className="bg-white dark:bg-[#221D2E] border border-[#E9E6EF] dark:border-[#383049] rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F8F7FB] dark:bg-[#1A1624] border-b border-[#E9E6EF] dark:border-[#383049] text-[#5F5972] dark:text-[#B9B2CE]">
                <th className="p-3.5 w-10 text-center">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === filteredJobs.length && filteredJobs.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-[#E9E6EF] text-[#6941C6] focus:ring-[#6941C6]"
                  />
                </th>
                <th className="p-3.5 font-semibold">Job Code &amp; Title</th>
                <th className="p-3.5 font-semibold">Client &amp; Unit</th>
                <th className="p-3.5 font-semibold">Location</th>
                <th className="p-3.5 font-semibold">Status</th>
                <th className="p-3.5 font-semibold">Priority</th>
                <th className="p-3.5 font-semibold">Bill / Pay Rate</th>
                <th className="p-3.5 font-semibold">Assigned Lead</th>
                <th className="p-3.5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E9E6EF] dark:divide-[#383049]">
              {filteredJobs.length === 0 ? (
                <tr>
                  <td colSpan={9} className="p-8 text-center text-xs text-[#8E88A2]">
                    No requisitions matched your search filters.
                  </td>
                </tr>
              ) : (
                filteredJobs.map((j) => (
                  <tr
                    key={j.id}
                    className="hover:bg-[#F1EBFA]/50 dark:hover:bg-[#312845]/40 transition-colors"
                  >
                    <td className="p-3.5 text-center">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(j.id)}
                        onChange={() => handleSelectOne(j.id)}
                        className="rounded border-[#E9E6EF] text-[#6941C6] focus:ring-[#6941C6]"
                      />
                    </td>

                    <td className="p-3.5">
                      <div
                        onClick={() => navigate('job-detail', j.id)}
                        className="font-bold text-[#292633] dark:text-white hover:text-[#6941C6] cursor-pointer transition-colors"
                      >
                        {j.title}
                      </div>
                      <div className="font-mono text-[11px] text-[#8E88A2] mt-0.5">{j.code}</div>
                    </td>

                    <td className="p-3.5">
                      <div className="font-medium text-[#292633] dark:text-white">{j.client}</div>
                      <div className="text-[11px] text-[#5F5972] dark:text-[#B9B2CE]">{j.businessUnit}</div>
                    </td>

                    <td className="p-3.5 text-[#5F5972] dark:text-[#B9B2CE]">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#8E88A2]" />
                        <span>{j.location}</span>
                      </div>
                    </td>

                    <td className="p-3.5">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-lg text-[11px] font-medium border ${
                          j.status === 'Open'
                            ? 'bg-[#8AC9A7]/20 text-[#276749] border-[#8AC9A7]/40 dark:text-[#8AC9A7]'
                            : j.status === 'Sourcing'
                            ? 'bg-[#F1EBFA] text-[#6941C6] border-[#6941C6]/30 dark:bg-[#312845] dark:text-[#D1C5E4]'
                            : 'bg-[#FF8243]/15 text-[#FF8243] border-[#FF8243]/30'
                        }`}
                      >
                        {j.status}
                      </span>
                    </td>

                    <td className="p-3.5">
                      <span
                        className={`font-semibold ${
                          j.priority === 'Urgent'
                            ? 'text-[#FF8243] font-bold'
                            : j.priority === 'High'
                            ? 'text-[#6941C6] font-semibold'
                            : 'text-[#5F5972] dark:text-[#B9B2CE]'
                        }`}
                      >
                        {j.priority}
                      </span>
                    </td>

                    <td className="p-3.5 font-mono tabular-nums">
                      <div className="font-bold text-[#292633] dark:text-white">${j.billRate}/hr</div>
                      <div className="text-[10px] text-[#5F5972] dark:text-[#B9B2CE]">Pay: ${j.payRate}/hr</div>
                    </td>

                    <td className="p-3.5 text-[#5F5972] dark:text-[#B9B2CE]">
                      {j.assignedRecruiter}
                    </td>

                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => navigate('job-detail', j.id)}
                        className="px-2.5 py-1 text-xs text-[#6941C6] hover:text-[#502E80] hover:bg-[#F1EBFA] dark:hover:bg-[#312845] rounded-lg transition-colors font-semibold"
                      >
                        View Dossier
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
