import React, { useState, useEffect } from 'react';
import {
  Users,
  MapPin,
  Mail,
  Phone,
  Briefcase,
  Star,
  Download,
  FileText,
  Calendar,
  CheckCircle,
  Clock,
  ArrowLeft,
  Send,
  MessageSquare,
  Award,
  Sparkles
} from 'lucide-react';
import { useAppStore } from '../../store/appStore';
import { ApiService } from '../../services/api';
import { Applicant, PipelineStage } from '../../types';

export const ApplicantDetail: React.FC = () => {
  const { selectedId, navigate } = useAppStore();
  const [applicant, setApplicant] = useState<Applicant | null>(null);
  const [stage, setStage] = useState<PipelineStage>('New');
  const [activeTab, setActiveTab] = useState<'overview' | 'resume' | 'timeline' | 'notes'>('overview');
  const [newNote, setNewNote] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (selectedId) {
      ApiService.getApplicantById(selectedId).then((a) => {
        if (a) {
          setApplicant(a);
          setStage(a.status);
        }
      });
    } else {
      // Default to first applicant
      ApiService.getApplicants().then((apps) => {
        if (apps.length > 0) {
          setApplicant(apps[0]);
          setStage(apps[0].status);
        }
      });
    }
  }, [selectedId]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  if (!applicant) {
    return <div className="p-8 text-center text-xs text-[#5F5972]">Loading candidate dossier...</div>;
  }

  const handleStageChange = async (newStage: PipelineStage) => {
    setStage(newStage);
    await ApiService.updateApplicantStage(applicant.id, newStage);
    showToast(`Candidate stage updated to "${newStage}"`);
  };

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    const noteObj = {
      id: `nt-${Date.now()}`,
      author: 'Priya Sharma',
      text: newNote.trim(),
      date: 'Just now'
    };
    const updatedNotes = [noteObj, ...(applicant.notes || [])];
    setApplicant({ ...applicant, notes: updatedNotes });
    ApiService.updateApplicant(applicant.id, { notes: updatedNotes });
    setNewNote('');
    showToast('Recruiter evaluation note added');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#402568] text-white border border-[#6941C6] px-4 py-2 rounded-xl shadow-xl text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle className="w-4 h-4 text-[#8AC9A7]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header & Stage Advance Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={() => navigate('applicants')}
          className="flex items-center gap-2 text-xs font-semibold text-[#5F5972] hover:text-[#6941C6] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Candidate Pool</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-[#5F5972] dark:text-[#B9B2CE]">
            <span>Recruitment Stage:</span>
            <select
              value={stage}
              onChange={(e) => handleStageChange(e.target.value as PipelineStage)}
              className="px-3 py-1.5 bg-white dark:bg-[#221D2E] border border-[#E9E6EF] dark:border-[#383049] rounded-xl text-xs font-bold text-[#6941C6] focus:outline-none"
            >
              <option value="New">Stage: New</option>
              <option value="Screening">Stage: Screening</option>
              <option value="Submitted">Stage: Submitted</option>
              <option value="Interview">Stage: Interview</option>
              <option value="Selected">Stage: Selected</option>
              <option value="Offered">Stage: Offered</option>
              <option value="Hired">Stage: Hired</option>
              <option value="Rejected">Stage: Rejected</option>
            </select>
          </div>

          {/* Primary Action Button: Bright Orange #FF8243 */}
          <button
            onClick={() => navigate('pipeline')}
            className="px-4 py-1.5 bg-[#FF8243] hover:bg-[#E96F30] text-white text-xs font-semibold rounded-xl transition-all shadow-xs shadow-[#FF8243]/20"
          >
            View in Kanban
          </button>
        </div>
      </div>

      {/* Candidate Profile Dossier Card: White #FFFFFF, Light Grey #E9E6EF */}
      <div className="p-6 bg-white dark:bg-[#221D2E] border border-[#E9E6EF] dark:border-[#383049] rounded-2xl shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="flex items-start gap-4">
            <img
              src={applicant.avatar}
              alt={applicant.name}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-[#6941C6]/30"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-[#292633] dark:text-white">
                  {applicant.name}
                </h1>
                <span className="text-xs font-mono px-2 py-0.5 bg-[#F1EBFA] dark:bg-[#312845] border border-[#E9E6EF] dark:border-[#4A4061] rounded text-[#6941C6] dark:text-[#D1C5E4]">
                  {applicant.applicantId}
                </span>
              </div>
              <div className="text-sm font-semibold text-[#6941C6]">
                {applicant.currentDesignation}
              </div>
              <div className="flex flex-wrap items-center gap-4 text-xs text-[#5F5972] dark:text-[#B9B2CE] pt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#8AC9A7]" />
                  {applicant.location}
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-[#6941C6]" />
                  {applicant.email}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-[#FF8243]" />
                  {applicant.phone}
                </span>
              </div>
            </div>
          </div>

          {/* Match Score Gauge: Mint #8AC9A7 */}
          <div className="p-4 bg-[#F8F7FB] dark:bg-[#1A1624] border border-[#E9E6EF] dark:border-[#383049] rounded-2xl text-center min-w-40">
            <div className="text-3xl font-extrabold font-mono text-[#276749] dark:text-[#8AC9A7] tabular-nums">
              {applicant.matchScore}%
            </div>
            <div className="text-[11px] font-mono text-[#6941C6] font-semibold mt-0.5">
              REQUISITION FIT INDEX
            </div>
            <div className="text-[10px] text-[#5F5972] dark:text-[#B9B2CE] mt-1">
              Source: {applicant.source}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-[#E9E6EF] dark:border-[#383049] text-xs font-semibold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3 px-2 border-b-2 transition-all ${
              activeTab === 'overview'
                ? 'border-[#6941C6] text-[#6941C6]'
                : 'border-transparent text-[#5F5972] hover:text-[#292633]'
            }`}
          >
            Overview &amp; Skills
          </button>
          <button
            onClick={() => setActiveTab('resume')}
            className={`pb-3 px-2 border-b-2 transition-all ${
              activeTab === 'resume'
                ? 'border-[#6941C6] text-[#6941C6]'
                : 'border-transparent text-[#5F5972] hover:text-[#292633]'
            }`}
          >
            Resume Document View
          </button>
          <button
            onClick={() => setActiveTab('timeline')}
            className={`pb-3 px-2 border-b-2 transition-all ${
              activeTab === 'timeline'
                ? 'border-[#6941C6] text-[#6941C6]'
                : 'border-transparent text-[#5F5972] hover:text-[#292633]'
            }`}
          >
            Recruitment Timeline
          </button>
          <button
            onClick={() => setActiveTab('notes')}
            className={`pb-3 px-2 border-b-2 transition-all ${
              activeTab === 'notes'
                ? 'border-[#6941C6] text-[#6941C6]'
                : 'border-transparent text-[#5F5972] hover:text-[#292633]'
            }`}
          >
            Recruiter Notes ({applicant.notes?.length || 0})
          </button>
        </div>

        {/* Tab Content: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-6 text-xs animate-in fade-in">
            {/* Summary */}
            <div className="space-y-2">
              <div className="font-bold text-[#6941C6] uppercase tracking-wider text-[11px] font-mono">
                Candidate Profile Summary
              </div>
              <p className="text-[#292633] dark:text-[#F8F7FB] leading-relaxed p-4 bg-[#F8F7FB] dark:bg-[#1A1624] border border-[#E9E6EF] dark:border-[#383049] rounded-2xl">
                {applicant.summary || 'Profile imported into NexusTalent unified applicant pool.'}
              </p>
            </div>

            {/* Skills */}
            <div className="space-y-2">
              <div className="font-bold text-[#6941C6] uppercase tracking-wider text-[11px] font-mono">
                Verified Technical Competencies
              </div>
              <div className="flex flex-wrap gap-2">
                {applicant.skills.map((sk) => (
                  <span
                    key={sk}
                    className="px-3 py-1 bg-[#F1EBFA] dark:bg-[#312845] border border-[#E9E6EF] dark:border-[#4A4061] rounded-lg font-mono font-medium text-[#6941C6] dark:text-[#D1C5E4]"
                  >
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            {/* Work History */}
            {applicant.workHistory && applicant.workHistory.length > 0 && (
              <div className="space-y-3">
                <div className="font-bold text-[#6941C6] uppercase tracking-wider text-[11px] font-mono">
                  Employment Experience
                </div>
                <div className="space-y-3">
                  {applicant.workHistory.map((wh, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-[#F8F7FB] dark:bg-[#1A1624] border border-[#E9E6EF] dark:border-[#383049] rounded-xl space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#292633] dark:text-white">{wh.role}</span>
                        <span className="font-mono text-[#276749] dark:text-[#8AC9A7] font-semibold">{wh.duration}</span>
                      </div>
                      <div className="text-[11px] text-[#6941C6] font-medium">{wh.company}</div>
                      <p className="text-[#5F5972] dark:text-[#B9B2CE] pt-1">{wh.summary}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab Content: Resume Preview */}
        {activeTab === 'resume' && (
          <div className="space-y-4 text-xs animate-in fade-in">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#5F5972] dark:text-[#B9B2CE]">
                Document: {applicant.name.replace(/\s+/g, '_')}_Resume_2026.pdf (1.4 MB)
              </span>
              <button
                onClick={() => showToast('Downloaded candidate resume document.')}
                className="px-3 py-1.5 bg-[#F8F7FB] dark:bg-[#1A1624] border border-[#E9E6EF] dark:border-[#383049] hover:bg-[#F1EBFA] rounded-xl font-semibold flex items-center gap-1.5 transition-colors text-[#292633] dark:text-white"
              >
                <Download className="w-3.5 h-3.5 text-[#6941C6]" />
                <span>Download PDF</span>
              </button>
            </div>

            {/* Realistic Resume Document Simulation */}
            <div className="p-8 bg-white dark:bg-[#1A1624] border border-[#E9E6EF] dark:border-[#383049] rounded-2xl shadow-inner space-y-4 font-mono text-[11px] leading-relaxed">
              <div className="border-b border-[#E9E6EF] dark:border-[#383049] pb-4">
                <div className="text-base font-bold text-[#292633] dark:text-white">{applicant.name}</div>
                <div className="text-[#6941C6] font-semibold">{applicant.currentDesignation}</div>
                <div className="text-[#5F5972] dark:text-[#B9B2CE]">{applicant.email} · {applicant.phone} · {applicant.location}</div>
              </div>

              <div>
                <div className="font-bold text-[#292633] dark:text-white uppercase">Profile Narrative</div>
                <p className="text-[#5F5972] dark:text-[#B9B2CE] mt-1">{applicant.summary}</p>
              </div>

              <div>
                <div className="font-bold text-[#292633] dark:text-white uppercase">Primary Tech Stack</div>
                <div className="text-[#5F5972] dark:text-[#B9B2CE] mt-1">{applicant.skills.join(' · ')}</div>
              </div>

              <div className="pt-2 text-[10px] text-[#276749] dark:text-[#8AC9A7] font-semibold">
                ✓ Parsed by NexusTalent Neural Extraction Engine · 100% Verified
              </div>
            </div>
          </div>
        )}

        {/* Tab Content: Timeline */}
        {activeTab === 'timeline' && (
          <div className="space-y-4 text-xs animate-in fade-in">
            <div className="relative border-l border-[#E9E6EF] dark:border-[#383049] ml-3 space-y-6">
              <div className="relative pl-6">
                <div className="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-[#8AC9A7]" />
                <div className="font-bold text-[#292633] dark:text-white">Active Stage: {applicant.status}</div>
                <div className="text-[11px] text-[#5F5972] dark:text-[#B9B2CE]">Candidate progressing according to SLA</div>
              </div>

              <div className="relative pl-6">
                <div className="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-[#6941C6]" />
                <div className="font-bold text-[#292633] dark:text-white">Assigned to Lead Recruiter</div>
                <div className="text-[11px] text-[#5F5972] dark:text-[#B9B2CE]">{applicant.assignedRecruiter} took ownership</div>
              </div>

              <div className="relative pl-6">
                <div className="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-[#FF8243]" />
                <div className="font-bold text-[#292633] dark:text-white">Profile Onboarded &amp; Parsed</div>
                <div className="text-[11px] text-[#5F5972] dark:text-[#B9B2CE]">Source: {applicant.source}</div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content: Notes */}
        {activeTab === 'notes' && (
          <div className="space-y-4 text-xs animate-in fade-in">
            <div className="flex gap-2">
              <input
                type="text"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Log internal recruiter note, interview impressions, or salary expectations..."
                className="flex-1 px-3 py-2 bg-[#F8F7FB] dark:bg-[#1A1624] border border-[#E9E6EF] dark:border-[#383049] rounded-xl text-[#292633] dark:text-white focus:outline-none focus:border-[#6941C6]"
              />
              {/* Primary Action Button: Bright Orange #FF8243 */}
              <button
                onClick={handleAddNote}
                className="px-4 py-2 bg-[#FF8243] hover:bg-[#E96F30] text-white rounded-xl font-semibold flex items-center gap-1.5 shadow-xs shadow-[#FF8243]/20"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Add Note</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {(applicant.notes || []).map((n) => (
                <div
                  key={n.id}
                  className="p-3 bg-[#F8F7FB] dark:bg-[#1A1624] border border-[#E9E6EF] dark:border-[#383049] rounded-xl space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#292633] dark:text-white">{n.author}</span>
                    <span className="font-mono text-[10px] text-[#8E88A2]">{n.date}</span>
                  </div>
                  <p className="text-[#5F5972] dark:text-[#B9B2CE]">{n.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
