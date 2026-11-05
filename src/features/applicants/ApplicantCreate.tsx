import React, { useState } from 'react';
import {
  UserPlus,
  UploadCloud,
  FileText,
  CheckCircle,
  X,
  ArrowLeft,
  Sparkles,
  Layers,
  FolderOpen
} from 'lucide-react';
import { useAppStore } from '../../store/appStore';
import { ApiService } from '../../services/api';
import { PipelineStage } from '../../types';

export const ApplicantCreate: React.FC = () => {
  const { navigate } = useAppStore();
  const [method, setMethod] = useState<'parse' | 'manual' | 'dropbox' | 'box' | 'onedrive' | 'bulk'>('parse');

  // Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [currentDesignation, setCurrentDesignation] = useState('');
  const [location, setLocation] = useState('');
  const [experienceYears, setExperienceYears] = useState(6);
  const [source, setSource] = useState<'LinkedIn' | 'Direct Career Portal' | 'Referral' | 'Vendor Partner' | 'GitHub'>('LinkedIn');
  const [skills, setSkills] = useState<string[]>(['TypeScript', 'AWS']);
  const [newSkill, setNewSkill] = useState('');
  const [summary, setSummary] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [parseUploaded, setParseUploaded] = useState(false);

  // Resume Parsing Simulation
  const handleSimulateResumeDrop = () => {
    setParseUploaded(true);
    setName('Gaurav Nambiar');
    setEmail('g.nambiar@cloudarchitects.io');
    setPhone('+91 99401 22390');
    setCurrentDesignation('Lead Distributed Systems Architect');
    setLocation('Bengaluru / San Jose');
    setExperienceYears(8);
    setSkills(['Rust', 'Go', 'Kubernetes', 'gRPC', 'Distributed Databases', 'AWS']);
    setSummary('Senior systems engineer with 8 years building fault-tolerant consensus protocols and microsecond trading infrastructure.');
  };

  const handleAddSkill = (e: React.KeyboardEvent | React.MouseEvent) => {
    if ('key' in e && e.key !== 'Enter') return;
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (sk: string) => {
    setSkills(skills.filter((s) => s !== sk));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await ApiService.createApplicant({
      name,
      email,
      phone,
      currentDesignation,
      location,
      experienceYears: Number(experienceYears),
      source,
      skills,
      summary,
      status: 'New',
      matchScore: Math.floor(Math.random() * 12 + 88),
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'
    });

    setIsSubmitting(false);
    navigate('applicants');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('applicants')}
          className="p-2 rounded-xl border border-[#E9E6EF] dark:border-[#383049] hover:bg-[#F1EBFA] dark:hover:bg-[#312845] transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-[#5F5972] dark:text-[#B9B2CE]" />
        </button>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#292633] dark:text-white">
            Add Candidate to Talent Pool
          </h1>
          <p className="text-xs text-[#5F5972] dark:text-[#B9B2CE]">
            Extract profile data from resumes, cloud drives, or manual onboarding
          </p>
        </div>
      </div>

      {/* 6 Creation Methods: Soft Lavender #F1EBFA selected */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 p-1.5 bg-[#F8F7FB] dark:bg-[#1A1624] border border-[#E9E6EF] dark:border-[#383049] rounded-2xl text-xs font-semibold">
        <button
          onClick={() => setMethod('parse')}
          className={`py-2 px-1 rounded-xl transition-all truncate ${
            method === 'parse' ? 'bg-[#F1EBFA] dark:bg-[#312845] text-[#6941C6] dark:text-[#D1C5E4] shadow-xs border border-[#E9E6EF] dark:border-[#4A4061]' : 'text-[#5F5972] dark:text-[#B9B2CE] hover:text-[#292633] dark:hover:text-white'
          }`}
        >
          1. Parse Resume
        </button>
        <button
          onClick={() => setMethod('manual')}
          className={`py-2 px-1 rounded-xl transition-all truncate ${
            method === 'manual' ? 'bg-[#F1EBFA] dark:bg-[#312845] text-[#6941C6] dark:text-[#D1C5E4] shadow-xs border border-[#E9E6EF] dark:border-[#4A4061]' : 'text-[#5F5972] dark:text-[#B9B2CE] hover:text-[#292633] dark:hover:text-white'
          }`}
        >
          2. Manual Entry
        </button>
        <button
          onClick={() => {
            setMethod('dropbox');
            handleSimulateResumeDrop();
          }}
          className={`py-2 px-1 rounded-xl transition-all truncate ${
            method === 'dropbox' ? 'bg-[#F1EBFA] dark:bg-[#312845] text-[#6941C6] dark:text-[#D1C5E4] shadow-xs border border-[#E9E6EF] dark:border-[#4A4061]' : 'text-[#5F5972] dark:text-[#B9B2CE] hover:text-[#292633] dark:hover:text-white'
          }`}
        >
          3. Dropbox
        </button>
        <button
          onClick={() => {
            setMethod('box');
            handleSimulateResumeDrop();
          }}
          className={`py-2 px-1 rounded-xl transition-all truncate ${
            method === 'box' ? 'bg-[#F1EBFA] dark:bg-[#312845] text-[#6941C6] dark:text-[#D1C5E4] shadow-xs border border-[#E9E6EF] dark:border-[#4A4061]' : 'text-[#5F5972] dark:text-[#B9B2CE] hover:text-[#292633] dark:hover:text-white'
          }`}
        >
          4. Box
        </button>
        <button
          onClick={() => {
            setMethod('onedrive');
            handleSimulateResumeDrop();
          }}
          className={`py-2 px-1 rounded-xl transition-all truncate ${
            method === 'onedrive' ? 'bg-[#F1EBFA] dark:bg-[#312845] text-[#6941C6] dark:text-[#D1C5E4] shadow-xs border border-[#E9E6EF] dark:border-[#4A4061]' : 'text-[#5F5972] dark:text-[#B9B2CE] hover:text-[#292633] dark:hover:text-white'
          }`}
        >
          5. OneDrive
        </button>
        <button
          onClick={() => {
            setMethod('bulk');
            handleSimulateResumeDrop();
          }}
          className={`py-2 px-1 rounded-xl transition-all truncate ${
            method === 'bulk' ? 'bg-[#F1EBFA] dark:bg-[#312845] text-[#6941C6] dark:text-[#D1C5E4] shadow-xs border border-[#E9E6EF] dark:border-[#4A4061]' : 'text-[#5F5972] dark:text-[#B9B2CE] hover:text-[#292633] dark:hover:text-white'
          }`}
        >
          6. Bulk Parsing
        </button>
      </div>

      {/* Parse Dropzone Banner */}
      {(method === 'parse' || method === 'bulk') && !parseUploaded && (
        <div
          onClick={handleSimulateResumeDrop}
          className="p-8 border-2 border-dashed border-[#6941C6]/40 hover:border-[#6941C6] bg-[#F1EBFA]/50 dark:bg-[#312845]/30 rounded-2xl text-center cursor-pointer transition-all space-y-2 group"
        >
          <UploadCloud className="w-10 h-10 text-[#6941C6] mx-auto group-hover:scale-110 transition-transform" />
          <div className="text-sm font-bold text-[#292633] dark:text-white">
            Click to Simulate Resume Upload &amp; Deep Parsing
          </div>
          <p className="text-xs text-[#5F5972] dark:text-[#B9B2CE] max-w-md mx-auto">
            Supports PDF, DOCX, TXT. Our semantic extractor automatically populates candidate experience, contact details, and skill tags.
          </p>
        </div>
      )}

      {/* Mint #8AC9A7 success banner */}
      {parseUploaded && (
        <div className="p-3 bg-[#8AC9A7]/20 border border-[#8AC9A7]/40 text-[#276749] dark:text-[#8AC9A7] rounded-xl flex items-center justify-between text-xs animate-in fade-in">
          <span className="flex items-center gap-2 font-medium">
            <CheckCircle className="w-4 h-4 text-[#8AC9A7]" />
            Resume parsed successfully! Fields populated below.
          </span>
          <button
            onClick={() => setParseUploaded(false)}
            className="text-xs underline hover:text-[#292633] dark:hover:text-white"
          >
            Reset
          </button>
        </div>
      )}

      {/* Form: White #FFFFFF card, Light Grey #E9E6EF border */}
      <form onSubmit={handleSubmit} className="p-6 bg-white dark:bg-[#221D2E] border border-[#E9E6EF] dark:border-[#383049] rounded-2xl shadow-xs space-y-6">
        {/* Personal & Contact */}
        <div className="space-y-4">
          <div className="text-xs font-mono font-bold text-[#6941C6] uppercase tracking-wider">
            01. Personal &amp; Contact Details
          </div>
          <div className="grid sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-[#5F5972] dark:text-[#B9B2CE] mb-1 font-medium">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Gaurav Nambiar"
                className="w-full px-3 py-2 bg-[#F8F7FB] dark:bg-[#1A1624] border border-[#E9E6EF] dark:border-[#383049] rounded-xl text-[#292633] dark:text-white font-semibold focus:outline-none focus:border-[#6941C6]"
              />
            </div>

            <div>
              <label className="block text-[#5F5972] dark:text-[#B9B2CE] mb-1 font-medium">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@domain.com"
                className="w-full px-3 py-2 bg-[#F8F7FB] dark:bg-[#1A1624] border border-[#E9E6EF] dark:border-[#383049] rounded-xl text-[#292633] dark:text-white focus:outline-none focus:border-[#6941C6]"
              />
            </div>

            <div>
              <label className="block text-[#5F5972] dark:text-[#B9B2CE] mb-1 font-medium">Mobile Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="w-full px-3 py-2 bg-[#F8F7FB] dark:bg-[#1A1624] border border-[#E9E6EF] dark:border-[#383049] rounded-xl text-[#292633] dark:text-white focus:outline-none focus:border-[#6941C6]"
              />
            </div>
          </div>
        </div>

        {/* Professional Details */}
        <div className="space-y-4 pt-4 border-t border-[#E9E6EF] dark:border-[#383049]">
          <div className="text-xs font-mono font-bold text-[#6941C6] uppercase tracking-wider">
            02. Professional Experience &amp; Location
          </div>
          <div className="grid sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-[#5F5972] dark:text-[#B9B2CE] mb-1 font-medium">Current Designation</label>
              <input
                type="text"
                required
                value={currentDesignation}
                onChange={(e) => setCurrentDesignation(e.target.value)}
                placeholder="e.g. Lead Systems Architect"
                className="w-full px-3 py-2 bg-[#F8F7FB] dark:bg-[#1A1624] border border-[#E9E6EF] dark:border-[#383049] rounded-xl text-[#292633] dark:text-white font-semibold focus:outline-none focus:border-[#6941C6]"
              />
            </div>

            <div>
              <label className="block text-[#5F5972] dark:text-[#B9B2CE] mb-1 font-medium">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City, Country"
                className="w-full px-3 py-2 bg-[#F8F7FB] dark:bg-[#1A1624] border border-[#E9E6EF] dark:border-[#383049] rounded-xl text-[#292633] dark:text-white focus:outline-none focus:border-[#6941C6]"
              />
            </div>

            <div>
              <label className="block text-[#5F5972] dark:text-[#B9B2CE] mb-1 font-medium">Years of Experience</label>
              <input
                type="number"
                value={experienceYears}
                onChange={(e) => setExperienceYears(Number(e.target.value))}
                className="w-full px-3 py-2 bg-[#F8F7FB] dark:bg-[#1A1624] border border-[#E9E6EF] dark:border-[#383049] rounded-xl font-mono text-[#292633] dark:text-white focus:outline-none focus:border-[#6941C6]"
              />
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="space-y-4 pt-4 border-t border-[#E9E6EF] dark:border-[#383049]">
          <div className="text-xs font-mono font-bold text-[#6941C6] uppercase tracking-wider">
            03. Core Competencies &amp; Skills
          </div>
          <div className="space-y-3 text-xs">
            <div className="flex gap-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={handleAddSkill}
                placeholder="Add skill and press Enter"
                className="flex-1 px-3 py-2 bg-[#F8F7FB] dark:bg-[#1A1624] border border-[#E9E6EF] dark:border-[#383049] rounded-xl text-[#292633] dark:text-white focus:outline-none focus:border-[#6941C6]"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-4 py-2 bg-[#402568] hover:bg-[#4E2E7D] text-white rounded-xl transition-colors font-medium"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {skills.map((sk) => (
                <span
                  key={sk}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F1EBFA] dark:bg-[#312845] border border-[#E9E6EF] dark:border-[#4A4061] rounded-lg font-mono text-xs text-[#6941C6] dark:text-[#D1C5E4]"
                >
                  <span>{sk}</span>
                  <X
                    onClick={() => handleRemoveSkill(sk)}
                    className="w-3.5 h-3.5 text-[#8E88A2] hover:text-rose-500 cursor-pointer transition-colors"
                  />
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="space-y-4 pt-4 border-t border-[#E9E6EF] dark:border-[#383049]">
          <div className="text-xs font-mono font-bold text-[#6941C6] uppercase tracking-wider">
            04. Executive Summary
          </div>
          <textarea
            rows={4}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Candidate profile summary, notable project highlights..."
            className="w-full p-3 bg-[#F8F7FB] dark:bg-[#1A1624] border border-[#E9E6EF] dark:border-[#383049] rounded-xl text-xs text-[#292633] dark:text-white focus:outline-none focus:border-[#6941C6]"
          />
        </div>

        {/* Submit */}
        <div className="pt-4 border-t border-[#E9E6EF] dark:border-[#383049] flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate('applicants')}
            className="px-4 py-2 border border-[#E9E6EF] dark:border-[#383049] text-[#5F5972] dark:text-[#B9B2CE] hover:text-[#292633] rounded-xl text-xs font-medium"
          >
            Cancel
          </button>

          {/* Primary Action Button: Bright Orange #FF8243 */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-2.5 bg-[#FF8243] hover:bg-[#E96F30] text-white rounded-xl text-xs font-semibold shadow-xs shadow-[#FF8243]/30 transition-all"
          >
            {isSubmitting ? 'Importing Candidate...' : 'Save & Onboard Candidate'}
          </button>
        </div>
      </form>
    </div>
  );
};
