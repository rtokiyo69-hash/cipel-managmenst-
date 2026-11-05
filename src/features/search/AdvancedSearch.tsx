import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  Sparkles,
  MapPin,
  Briefcase,
  Star,
  RotateCcw,
  Save,
  CheckCircle,
  ChevronRight
} from 'lucide-react';
import { useAppStore } from '../../store/appStore';
import { ApiService } from '../../services/api';
import { Applicant } from '../../types';

const POPULAR_SKILLS = [
  'AWS',
  'Kubernetes',
  'Terraform',
  'Rust',
  'Go',
  'React',
  'TypeScript',
  'Node.js',
  'Python',
  'PyTorch',
  'eBPF',
  'Kafka',
  'Docker',
  'PostgreSQL',
  'Distributed Systems'
];

export const AdvancedSearch: React.FC = () => {
  const { navigate } = useAppStore();
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [keyword, setKeyword] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>(['Kubernetes']);
  const [minExp, setMinExp] = useState(5);
  const [location, setLocation] = useState('');
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [sourceFilter, setSourceFilter] = useState('All');
  const [savedSearches, setSavedSearches] = useState<string[]>([
    'Principal K8s Architect (8+ Yrs)',
    'Full Stack React + Node (NYC)',
    'Distributed Rust Core Engineers'
  ]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    ApiService.getApplicants().then(setApplicants);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleSkill = (sk: string) => {
    setSelectedSkills((prev) =>
      prev.includes(sk) ? prev.filter((s) => s !== sk) : [...prev, sk]
    );
  };

  const handleReset = () => {
    setKeyword('');
    setSelectedSkills([]);
    setMinExp(0);
    setLocation('');
    setRemoteOnly(false);
    setSourceFilter('All');
  };

  const handleSaveSearch = () => {
    const label = `${keyword || 'Search'} (${selectedSkills.join(', ') || 'Any Skill'})`;
    setSavedSearches([label, ...savedSearches]);
    showToast('Search query saved to your talent shortcuts.');
  };

  // Filter logic
  const searchResults = applicants.filter((a) => {
    const matchesKeyword =
      !keyword ||
      a.name.toLowerCase().includes(keyword.toLowerCase()) ||
      a.currentDesignation.toLowerCase().includes(keyword.toLowerCase()) ||
      (a.summary && a.summary.toLowerCase().includes(keyword.toLowerCase()));

    const matchesSkills =
      selectedSkills.length === 0 ||
      selectedSkills.every((sk) =>
        a.skills.some((csk) => csk.toLowerCase() === sk.toLowerCase())
      );

    const matchesExp = a.experienceYears >= minExp;

    const matchesLocation =
      !location ||
      a.location.toLowerCase().includes(location.toLowerCase()) ||
      (remoteOnly && a.location.toLowerCase().includes('remote'));

    const matchesSource = sourceFilter === 'All' || a.source === sourceFilter;

    return matchesKeyword && matchesSkills && matchesExp && matchesLocation && matchesSource;
  });

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
          Advanced Talent Intelligence &amp; Boolean Search
        </h1>
        <p className="text-xs text-[#817984]">
          Multi-parameter skill matrix, semantic boolean matching, and geographical radius screening
        </p>
      </div>

      {/* Search Console Grid */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Left Form: Search Criteria */}
        <div className="lg:col-span-5 bg-white dark:bg-[#1E1B29] border border-[#E9E6EF] dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-5 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-[#292633] dark:text-white flex items-center gap-1.5">
              <Filter className="w-4 h-4 text-[#6941C6]" />
              <span>Search Parameters</span>
            </span>
            <button
              onClick={handleReset}
              className="text-xs text-[#817984] hover:text-[#6941C6] dark:hover:text-[#A888EC] flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          </div>

          {/* Keyword Search */}
          <div>
            <label className="block text-[#292633] dark:text-slate-400 mb-1 font-medium">
              Boolean Keyword / Designation
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#817984]" />
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder='e.g. "Distributed Systems" OR "Cloud Architect"'
                className="w-full pl-9 pr-3 py-2 bg-[#F8F7FB] dark:bg-slate-800/80 border border-[#E9E6EF] dark:border-slate-700 rounded-xl text-[#292633] dark:text-white focus:outline-none focus:border-[#6941C6] focus:ring-1 focus:ring-[#6941C6]"
              />
            </div>
          </div>

          {/* Skill Matrix Chips */}
          <div>
            <label className="block text-[#292633] dark:text-slate-400 mb-1.5 font-medium">
              Must-Have Technical Skills (AND logic)
            </label>
            <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-1">
              {POPULAR_SKILLS.map((sk) => {
                const isSelected = selectedSkills.includes(sk);
                return (
                  <button
                    key={sk}
                    type="button"
                    onClick={() => toggleSkill(sk)}
                    className={`px-2.5 py-1 rounded-lg font-mono text-[11px] transition-all ${
                      isSelected
                        ? 'bg-[#6941C6] text-white shadow-xs font-semibold'
                        : 'bg-[#F1EBFA] dark:bg-slate-800 border border-[#E9E6EF] dark:border-slate-700 text-[#6941C6] dark:text-slate-300 hover:bg-[#6941C6]/15'
                    }`}
                  >
                    {isSelected ? `✓ ${sk}` : `+ ${sk}`}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Experience Slider */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[#292633] dark:text-slate-400 font-medium">Minimum Experience</label>
              <span className="font-mono font-bold text-[#6941C6] dark:text-[#A888EC]">{minExp} Years</span>
            </div>
            <input
              type="range"
              min="0"
              max="15"
              value={minExp}
              onChange={(e) => setMinExp(Number(e.target.value))}
              className="w-full accent-[#6941C6]"
            />
          </div>

          {/* Location & Remote */}
          <div className="space-y-2">
            <label className="block text-[#292633] dark:text-slate-400 font-medium">Location or Region</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. San Jose, Bengaluru, New York"
              className="w-full px-3 py-2 bg-[#F8F7FB] dark:bg-slate-800 border border-[#E9E6EF] dark:border-slate-700 rounded-xl text-[#292633] dark:text-white focus:outline-none focus:border-[#6941C6]"
            />
            <label className="flex items-center gap-2 pt-1 cursor-pointer">
              <input
                type="checkbox"
                checked={remoteOnly}
                onChange={(e) => setRemoteOnly(e.target.checked)}
                className="rounded border-[#E9E6EF] text-[#6941C6] focus:ring-[#6941C6]"
              />
              <span className="text-[#817984] dark:text-slate-400">Remote availability candidates only</span>
            </label>
          </div>

          {/* Candidate Source */}
          <div>
            <label className="block text-[#292633] dark:text-slate-400 mb-1 font-medium">Sourcing Channel</label>
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="w-full px-3 py-2 bg-[#F8F7FB] dark:bg-slate-800 border border-[#E9E6EF] dark:border-slate-700 rounded-xl text-[#292633] dark:text-white focus:outline-none focus:border-[#6941C6]"
            >
              <option value="All">All Ingestion Sources</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Direct Career Portal">Direct Career Portal</option>
              <option value="Referral">Referral</option>
              <option value="Vendor Partner">Vendor Staffing Partner</option>
            </select>
          </div>

          {/* Save Search Button */}
          <button
            onClick={handleSaveSearch}
            className="w-full py-2 bg-[#F8F7FB] dark:bg-slate-800 border border-[#E9E6EF] dark:border-slate-700 hover:border-[#6941C6] hover:bg-[#F1EBFA] rounded-xl text-xs font-semibold text-[#292633] dark:text-slate-200 transition-colors flex items-center justify-center gap-1.5 shadow-xs"
          >
            <Save className="w-3.5 h-3.5 text-[#6941C6]" />
            <span>Save Current Search Query</span>
          </button>
        </div>

        {/* Right Column: Search Results */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-[#817984]">
              Showing <strong className="text-[#292633] dark:text-white">{searchResults.length}</strong> matching candidates
            </span>
          </div>

          <div className="space-y-3">
            {searchResults.length === 0 ? (
              <div className="p-12 text-center bg-white dark:bg-[#1E1B29] border border-[#E9E6EF] dark:border-slate-800 rounded-2xl text-xs text-[#817984]">
                No candidates matched all your boolean criteria. Try loosening technical skill filters or reducing minimum experience.
              </div>
            ) : (
              searchResults.map((cand) => (
                <div
                  key={cand.id}
                  onClick={() => navigate('applicant-detail', cand.id)}
                  className="p-4 bg-white dark:bg-[#1E1B29] border border-[#E9E6EF] dark:border-slate-800 hover:border-[#6941C6] dark:hover:border-[#6941C6] rounded-2xl shadow-xs transition-all cursor-pointer space-y-3"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <img
                        src={cand.avatar}
                        alt={cand.name}
                        className="w-12 h-12 rounded-full object-cover ring-1 ring-[#E9E6EF] dark:ring-slate-700"
                      />
                      <div>
                        <div className="text-sm font-bold text-[#292633] dark:text-white hover:text-[#6941C6] dark:hover:text-[#A888EC]">
                          {cand.name}
                        </div>
                        <div className="text-xs text-[#817984]">{cand.currentDesignation}</div>
                        <div className="text-[11px] text-[#817984] flex items-center gap-2 mt-1">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-[#817984]" />
                            {cand.location}
                          </span>
                          <span>·</span>
                          <span className="font-mono">{cand.experienceYears} Years Exp</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-lg font-bold font-mono text-[#2E7D5B] dark:text-[#8AC9A7] tabular-nums">
                        {cand.matchScore}%
                      </div>
                      <div className="text-[10px] font-mono text-[#2E7D5B] dark:text-[#8AC9A7] font-semibold">MATCH SCORE</div>
                    </div>
                  </div>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {cand.skills.map((sk) => (
                      <span
                        key={sk}
                        className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                          selectedSkills.includes(sk)
                            ? 'bg-[#F1EBFA] text-[#6941C6] border border-[#6941C6]/30 dark:bg-[#6941C6]/20 dark:text-[#D1C5E4] font-bold'
                            : 'bg-[#F8F7FB] dark:bg-slate-800 text-[#817984] dark:text-slate-300 border border-[#E9E6EF] dark:border-slate-700'
                        }`}
                      >
                        {sk}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-[#E9E6EF] dark:border-slate-800 flex items-center justify-between text-xs text-[#817984]">
                    <span>Stage: <strong className="text-[#292633] dark:text-white">{cand.status}</strong></span>
                    <span className="text-[#6941C6] hover:text-[#402568] dark:text-[#A888EC] font-semibold flex items-center gap-1">
                      View Candidate Dossier →
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
