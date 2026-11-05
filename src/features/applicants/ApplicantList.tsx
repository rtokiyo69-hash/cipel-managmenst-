import React, { useState, useEffect } from 'react';
import {
  Users,
  Search,
  Filter,
  Plus,
  Star,
  Download,
  Eye,
  ChevronRight,
  MapPin,
  Briefcase,
  FileText,
  CheckCircle,
  X
} from 'lucide-react';
import { useAppStore } from '../../store/appStore';
import { ApiService } from '../../services/api';
import { Applicant, PipelineStage } from '../../types';

export const ApplicantList: React.FC = () => {
  const { navigate } = useAppStore();
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState<string>('All');
  const [quickResumePreview, setQuickResumePreview] = useState<Applicant | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    ApiService.getApplicants().then(setApplicants);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggleFavorite = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const isFav = await ApiService.toggleFavorite(id);
    setApplicants((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isFavorite: isFav } : a))
    );
    showToast(isFav ? 'Added candidate to Favorites' : 'Removed from Favorites');
  };

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['ID,Name,Email,Designation,Experience,Status,MatchScore,Recruiter']
        .concat(
          filteredApplicants.map(
            (a) =>
              `"${a.applicantId}","${a.name}","${a.email}","${a.currentDesignation}","${a.experienceYears} Yrs","${a.status}","${a.matchScore}%","${a.assignedRecruiter}"`
          )
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `NexusTalent_Applicants_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Exported ${filteredApplicants.length} candidates to CSV.`);
  };

  const filteredApplicants = applicants.filter((a) => {
    const matchesSearch =
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.currentDesignation.toLowerCase().includes(search.toLowerCase()) ||
      a.skills.some((s) => s.toLowerCase().includes(search.toLowerCase())) ||
      a.location.toLowerCase().includes(search.toLowerCase());

    const matchesStage = stageFilter === 'All' || a.status === stageFilter;

    return matchesSearch && matchesStage;
  });

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#402568] text-white border border-[#6941C6] px-4 py-2 rounded-xl shadow-xl text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle className="w-4 h-4 text-[#8AC9A7]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-display font-bold text-[#292633] dark:text-white">
            Talent Pool &amp; Candidates
          </h1>
          <p className="text-xs text-[#5F5972] dark:text-[#B9B2CE]">
            Universal candidate roster with match scoring, resume dossiers, and pipeline assignment
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

          {/* Primary Action Button: Bright Orange #FF8243 */}
          <button
            onClick={() => navigate('applicant-new')}
            className="px-4 py-2 bg-[#FF8243] hover:bg-[#E96F30] text-white rounded-xl text-xs font-semibold shadow-xs shadow-[#FF8243]/30 transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Candidate</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Toolbar: White #FFFFFF, Light Grey #E9E6EF */}
      <div className="p-4 bg-white dark:bg-[#221D2E] border border-[#E9E6EF] dark:border-[#383049] rounded-2xl shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E88A2]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search candidate name, skills (K8s, Rust, React), city..."
            className="w-full pl-10 pr-4 py-2 bg-[#F8F7FB] dark:bg-[#1A1624] border border-[#E9E6EF] dark:border-[#383049] rounded-xl text-xs text-[#292633] dark:text-[#F8F7FB] focus:outline-none focus:border-[#6941C6]"
          />
        </div>

        {/* Stage Filter */}
        <div className="flex items-center gap-1.5 text-xs text-[#5F5972] dark:text-[#B9B2CE] w-full md:w-auto">
          <Filter className="w-3.5 h-3.5 text-[#6941C6]" />
          <span>Stage:</span>
          <select
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
            className="bg-[#F8F7FB] dark:bg-[#1A1624] border border-[#E9E6EF] dark:border-[#383049] rounded-xl px-2.5 py-1 text-xs text-[#292633] dark:text-[#F8F7FB] focus:outline-none focus:border-[#6941C6]"
          >
            <option value="All">All Stages</option>
            <option value="New">New</option>
            <option value="Screening">Screening</option>
            <option value="Submitted">Submitted</option>
            <option value="Interview">Interview</option>
            <option value="Selected">Selected</option>
            <option value="Offered">Offered</option>
            <option value="Hired">Hired</option>
          </select>
        </div>
      </div>

      {/* Candidate Table: White #FFFFFF card, Light Grey #E9E6EF borders */}
      <div className="bg-white dark:bg-[#221D2E] border border-[#E9E6EF] dark:border-[#383049] rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F8F7FB] dark:bg-[#1A1624] border-b border-[#E9E6EF] dark:border-[#383049] text-[#5F5972] dark:text-[#B9B2CE]">
                <th className="p-3.5 w-10 text-center">★</th>
                <th className="p-3.5 font-semibold">Candidate Dossier</th>
                <th className="p-3.5 font-semibold">Current Role &amp; Location</th>
                <th className="p-3.5 font-semibold">Key Skills</th>
                <th className="p-3.5 font-semibold">Experience</th>
                <th className="p-3.5 font-semibold">Stage</th>
                <th className="p-3.5 font-semibold">Match Score</th>
                <th className="p-3.5 font-semibold">Recruiter</th>
                <th className="p-3.5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E9E6EF] dark:divide-[#383049]">
              {filteredApplicants.length === 0 ? (
                <tr>
                  <td colSpan={9} className="p-8 text-center text-xs text-[#8E88A2]">
                    No candidates matched your search criteria.
                  </td>
                </tr>
              ) : (
                filteredApplicants.map((a) => (
                  <tr
                    key={a.id}
                    className="hover:bg-[#F1EBFA]/50 dark:hover:bg-[#312845]/40 transition-colors"
                  >
                    <td className="p-3.5 text-center">
                      <button
                        onClick={(e) => handleToggleFavorite(a.id, e)}
                        className={`transition-colors ${
                          a.isFavorite ? 'text-[#FF8243]' : 'text-[#8E88A2] hover:text-[#FF8243]'
                        }`}
                      >
                        <Star className={`w-4 h-4 ${a.isFavorite ? 'fill-current' : ''}`} />
                      </button>
                    </td>

                    <td className="p-3.5">
                      <div className="flex items-center gap-3">
                        <img
                          src={a.avatar}
                          alt={a.name}
                          className="w-9 h-9 rounded-full object-cover ring-1 ring-[#E9E6EF]"
                        />
                        <div>
                          <div
                            onClick={() => navigate('applicant-detail', a.id)}
                            className="font-bold text-[#292633] dark:text-white hover:text-[#6941C6] cursor-pointer transition-colors"
                          >
                            {a.name}
                          </div>
                          <div className="font-mono text-[11px] text-[#8E88A2]">{a.applicantId}</div>
                        </div>
                      </div>
                    </td>

                    <td className="p-3.5">
                      <div className="font-medium text-[#292633] dark:text-white">{a.currentDesignation}</div>
                      <div className="text-[11px] text-[#5F5972] dark:text-[#B9B2CE] flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-[#8E88A2]" />
                        <span>{a.location}</span>
                      </div>
                    </td>

                    <td className="p-3.5">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {a.skills.slice(0, 3).map((sk) => (
                          <span
                            key={sk}
                            className="px-2 py-0.5 bg-[#F1EBFA] dark:bg-[#312845] border border-[#E9E6EF] dark:border-[#4A4061] rounded text-[10px] font-mono text-[#6941C6] dark:text-[#D1C5E4]"
                          >
                            {sk}
                          </span>
                        ))}
                        {a.skills.length > 3 && (
                          <span className="text-[10px] font-mono text-[#8E88A2]">
                            +{a.skills.length - 3}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="p-3.5 font-mono tabular-nums font-semibold text-[#292633] dark:text-white">
                      {a.experienceYears} Yrs
                    </td>

                    <td className="p-3.5">
                      <span className="inline-block px-2.5 py-0.5 rounded-lg text-[11px] font-medium bg-[#F8F7FB] dark:bg-[#312845] border border-[#E9E6EF] dark:border-[#4A4061] text-[#5F5972] dark:text-[#D1C5E4]">
                        {a.status}
                      </span>
                    </td>

                    {/* Mint #8AC9A7 Match Score */}
                    <td className="p-3.5">
                      <span className="font-mono font-bold text-xs text-[#276749] dark:text-[#8AC9A7] bg-[#8AC9A7]/20 border border-[#8AC9A7]/40 px-2 py-0.5 rounded">
                        {a.matchScore}%
                      </span>
                    </td>

                    <td className="p-3.5 text-[#5F5972] dark:text-[#B9B2CE]">{a.assignedRecruiter}</td>

                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setQuickResumePreview(a)}
                          className="p-1.5 text-[#8E88A2] hover:text-[#6941C6] rounded-lg transition-colors"
                          title="Quick Resume Preview"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => navigate('applicant-detail', a.id)}
                          className="px-2.5 py-1 text-xs font-semibold text-[#6941C6] hover:text-[#502E80] hover:bg-[#F1EBFA] dark:hover:bg-[#312845] rounded-lg transition-colors"
                        >
                          Dossier →
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Resume Preview Modal */}
      {quickResumePreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-white dark:bg-[#221D2E] border border-[#E9E6EF] dark:border-[#383049] rounded-2xl p-6 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#E9E6EF] dark:border-[#383049]">
              <div className="flex items-center gap-3">
                <img
                  src={quickResumePreview.avatar}
                  alt={quickResumePreview.name}
                  className="w-10 h-10 rounded-full object-cover ring-1 ring-[#E9E6EF]"
                />
                <div>
                  <h3 className="text-base font-bold text-[#292633] dark:text-white">
                    {quickResumePreview.name}
                  </h3>
                  <div className="text-xs text-[#5F5972] dark:text-[#B9B2CE]">
                    {quickResumePreview.currentDesignation} · {quickResumePreview.location}
                  </div>
                </div>
              </div>
              <button onClick={() => setQuickResumePreview(null)} className="text-[#8E88A2] hover:text-[#292633] dark:hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-[#F8F7FB] dark:bg-[#1A1624] rounded-xl border border-[#E9E6EF] dark:border-[#383049]">
                <div className="font-semibold text-[#292633] dark:text-white mb-1">Executive Summary</div>
                <p className="text-[#5F5972] dark:text-[#B9B2CE] leading-relaxed">{quickResumePreview.summary}</p>
              </div>

              <div>
                <div className="font-semibold text-[#292633] dark:text-white mb-2">Technical Skills</div>
                <div className="flex flex-wrap gap-1.5">
                  {quickResumePreview.skills.map((sk) => (
                    <span
                      key={sk}
                      className="px-2.5 py-1 bg-[#F1EBFA] dark:bg-[#312845] border border-[#E9E6EF] dark:border-[#4A4061] rounded-lg font-mono text-[#6941C6] dark:text-[#D1C5E4]"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  onClick={() => setQuickResumePreview(null)}
                  className="px-3.5 py-1.5 border border-[#E9E6EF] dark:border-[#383049] text-[#5F5972] dark:text-[#B9B2CE] rounded-xl hover:bg-[#F8F7FB]"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    navigate('applicant-detail', quickResumePreview.id);
                    setQuickResumePreview(null);
                  }}
                  className="px-4 py-1.5 bg-[#FF8243] hover:bg-[#E96F30] text-white font-semibold rounded-xl shadow-xs"
                >
                  Open Full Candidate Dossier
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
