import React, { useState } from 'react';
import {
  Briefcase,
  Sparkles,
  FileText,
  Copy,
  Plus,
  X,
  CheckCircle,
  ArrowLeft
} from 'lucide-react';
import { useAppStore } from '../../store/appStore';
import { ApiService } from '../../services/api';
import { JobType, Priority, JobStatus } from '../../types';

export const JobCreate: React.FC = () => {
  const { navigate } = useAppStore();
  const [creationMode, setCreationMode] = useState<'manual' | 'template' | 'parse'>('manual');
  const [rawJdText, setRawJdText] = useState('');

  // Form State
  const [title, setTitle] = useState('');
  const [client, setClient] = useState('CloudScale Enterprises');
  const [businessUnit, setBusinessUnit] = useState('Cloud & AI Practice');
  const [location, setLocation] = useState('San Jose, CA & Bengaluru (Hybrid)');
  const [type, setType] = useState<JobType>('Full-Time');
  const [status, setStatus] = useState<JobStatus>('Open');
  const [priority, setPriority] = useState<Priority>('High');
  const [openings, setOpenings] = useState(2);
  const [billRate, setBillRate] = useState(140);
  const [payRate, setPayRate] = useState(105);
  const [experienceRequired, setExperienceRequired] = useState('6-10 Years');
  const [assignedRecruiter, setAssignedRecruiter] = useState('Priya Sharma');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState<string[]>(['Kubernetes', 'AWS', 'Go']);
  const [newSkill, setNewSkill] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  // Load from template
  const handleApplyTemplate = (tpl: string) => {
    if (tpl === 'cloud-architect') {
      setTitle('Staff Cloud & Distributed Systems Architect');
      setSkills(['AWS', 'Kubernetes', 'Terraform', 'Golang', 'Distributed Storage']);
      setBillRate(165);
      setPayRate(125);
      setDescription('Architect high-throughput zero-downtime distributed storage and serverless computing layers for Fortune 500 enterprise customers.');
    } else if (tpl === 'fullstack-lead') {
      setTitle('Senior Full Stack Lead (React, Node, TypeScript)');
      setSkills(['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind', 'GraphQL']);
      setBillRate(135);
      setPayRate(100);
      setDescription('Lead engineering team developing real-time interactive dashboards, WebSocket feeds, and responsive enterprise applications.');
    }
  };

  // Parse raw JD simulation
  const handleParseJd = () => {
    if (!rawJdText.trim()) return;
    setTitle('Extracted Lead Distributed Systems Engineer');
    setSkills(['Rust', 'Go', 'Raft', 'Kubernetes', 'eBPF', 'Kafka']);
    setBillRate(155);
    setPayRate(115);
    setDescription(rawJdText);
    setCreationMode('manual');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await ApiService.createJob({
      title,
      client,
      clientId: 'cli-1',
      businessUnit,
      location,
      type,
      status,
      priority,
      openings: Number(openings),
      billRate: Number(billRate),
      payRate: Number(payRate),
      experienceRequired,
      assignedRecruiter,
      recruiterId: 'usr-3',
      description,
      skills
    });

    setIsSubmitting(false);
    navigate('jobs');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('jobs')}
            className="p-2 rounded-xl border border-[#E9E6EF] dark:border-[#383049] hover:bg-[#F1EBFA] dark:hover:bg-[#312845] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#5F5972] dark:text-[#B9B2CE]" />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#292633] dark:text-white">
              Create Job Requisition
            </h1>
            <p className="text-xs text-[#5F5972] dark:text-[#B9B2CE]">
              Define business units, skills, rate structures, and recruiter ownership
            </p>
          </div>
        </div>
      </div>

      {/* Creation Mode Segmented Selector - Soft Lavender #F1EBFA */}
      <div className="p-1.5 bg-[#F8F7FB] dark:bg-[#1A1624] border border-[#E9E6EF] dark:border-[#383049] rounded-2xl flex items-center justify-center gap-1.5">
        <button
          onClick={() => setCreationMode('manual')}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
            creationMode === 'manual'
              ? 'bg-[#F1EBFA] dark:bg-[#312845] text-[#6941C6] dark:text-[#D1C5E4] shadow-xs border border-[#E9E6EF] dark:border-[#4A4061]'
              : 'text-[#5F5972] dark:text-[#B9B2CE] hover:text-[#292633] dark:hover:text-white'
          }`}
        >
          1. Manual Creation
        </button>
        <button
          onClick={() => setCreationMode('template')}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
            creationMode === 'template'
              ? 'bg-[#F1EBFA] dark:bg-[#312845] text-[#6941C6] dark:text-[#D1C5E4] shadow-xs border border-[#E9E6EF] dark:border-[#4A4061]'
              : 'text-[#5F5972] dark:text-[#B9B2CE] hover:text-[#292633] dark:hover:text-white'
          }`}
        >
          2. Use Template
        </button>
        <button
          onClick={() => setCreationMode('parse')}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
            creationMode === 'parse'
              ? 'bg-[#F1EBFA] dark:bg-[#312845] text-[#6941C6] dark:text-[#D1C5E4] shadow-xs border border-[#E9E6EF] dark:border-[#4A4061]'
              : 'text-[#5F5972] dark:text-[#B9B2CE] hover:text-[#292633] dark:hover:text-white'
          }`}
        >
          3. Parse Job Description
        </button>
      </div>

      {/* Template Quick Selection */}
      {creationMode === 'template' && (
        <div className="p-4 bg-white dark:bg-[#221D2E] border border-[#E9E6EF] dark:border-[#383049] rounded-2xl space-y-3 animate-in fade-in">
          <div className="text-xs font-bold text-[#292633] dark:text-white">Select Pre-Configured Template</div>
          <div className="grid sm:grid-cols-2 gap-3">
            <div
              onClick={() => handleApplyTemplate('cloud-architect')}
              className="p-3 border border-[#E9E6EF] dark:border-[#383049] rounded-xl hover:border-[#6941C6] cursor-pointer transition-all bg-[#F8F7FB] dark:bg-[#1A1624]"
            >
              <div className="text-xs font-bold text-[#6941C6]">Cloud &amp; Distributed Architect</div>
              <div className="text-[11px] text-[#5F5972] dark:text-[#B9B2CE] mt-1">Pre-configured with AWS, K8s, Terraform, $165/hr</div>
            </div>
            <div
              onClick={() => handleApplyTemplate('fullstack-lead')}
              className="p-3 border border-[#E9E6EF] dark:border-[#383049] rounded-xl hover:border-[#6941C6] cursor-pointer transition-all bg-[#F8F7FB] dark:bg-[#1A1624]"
            >
              <div className="text-xs font-bold text-[#6941C6]">Senior Full Stack Lead</div>
              <div className="text-[11px] text-[#5F5972] dark:text-[#B9B2CE] mt-1">Pre-configured with React, TypeScript, Node, $135/hr</div>
            </div>
          </div>
        </div>
      )}

      {/* Parse JD Simulation */}
      {creationMode === 'parse' && (
        <div className="p-4 bg-white dark:bg-[#221D2E] border border-[#E9E6EF] dark:border-[#383049] rounded-2xl space-y-3 animate-in fade-in">
          <div className="text-xs font-bold text-[#292633] dark:text-white">Paste Raw Requisition Text</div>
          <textarea
            rows={5}
            value={rawJdText}
            onChange={(e) => setRawJdText(e.target.value)}
            placeholder="Paste raw email or text from hiring manager..."
            className="w-full p-3 bg-[#F8F7FB] dark:bg-[#1A1624] border border-[#E9E6EF] dark:border-[#383049] rounded-xl text-xs text-[#292633] dark:text-white focus:outline-none focus:border-[#6941C6]"
          />
          <button
            onClick={handleParseJd}
            className="px-4 py-2 bg-[#FF8243] hover:bg-[#E96F30] text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
          >
            Extract Fields into Form
          </button>
        </div>
      )}

      {/* Main Creation Form: White #FFFFFF card, Light Grey #E9E6EF border */}
      <form onSubmit={handleSubmit} className="p-6 bg-white dark:bg-[#221D2E] border border-[#E9E6EF] dark:border-[#383049] rounded-2xl shadow-xs space-y-6">
        {/* Section 1: Business Information */}
        <div className="space-y-4">
          <div className="text-xs font-mono font-bold text-[#6941C6] uppercase tracking-wider">
            01. Business &amp; Client Allocation
          </div>
          <div className="grid sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-[#5F5972] dark:text-[#B9B2CE] mb-1 font-medium">Enterprise Client</label>
              <select
                value={client}
                onChange={(e) => setClient(e.target.value)}
                className="w-full px-3 py-2 bg-[#F8F7FB] dark:bg-[#1A1624] border border-[#E9E6EF] dark:border-[#383049] rounded-xl text-[#292633] dark:text-white focus:outline-none focus:border-[#6941C6]"
              >
                <option value="CloudScale Enterprises">CloudScale Enterprises</option>
                <option value="FinEdge Global Capital">FinEdge Global Capital</option>
                <option value="NovaPay Distributed Systems">NovaPay Distributed Systems</option>
                <option value="MedTech Diagnostics AI">MedTech Diagnostics AI</option>
              </select>
            </div>

            <div>
              <label className="block text-[#5F5972] dark:text-[#B9B2CE] mb-1 font-medium">Business Practice Unit</label>
              <input
                type="text"
                value={businessUnit}
                onChange={(e) => setBusinessUnit(e.target.value)}
                className="w-full px-3 py-2 bg-[#F8F7FB] dark:bg-[#1A1624] border border-[#E9E6EF] dark:border-[#383049] rounded-xl text-[#292633] dark:text-white focus:outline-none focus:border-[#6941C6]"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Requisition Details */}
        <div className="space-y-4 pt-4 border-t border-[#E9E6EF] dark:border-[#383049]">
          <div className="text-xs font-mono font-bold text-[#6941C6] uppercase tracking-wider">
            02. Requisition Specifications
          </div>
          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-[#5F5972] dark:text-[#B9B2CE] mb-1 font-medium">Job Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Principal Cloud Infrastructure Architect"
                className="w-full px-3 py-2 bg-[#F8F7FB] dark:bg-[#1A1624] border border-[#E9E6EF] dark:border-[#383049] rounded-xl text-[#292633] dark:text-white font-semibold focus:outline-none focus:border-[#6941C6]"
              />
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[#5F5972] dark:text-[#B9B2CE] mb-1 font-medium">Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F8F7FB] dark:bg-[#1A1624] border border-[#E9E6EF] dark:border-[#383049] rounded-xl text-[#292633] dark:text-white focus:outline-none focus:border-[#6941C6]"
                />
              </div>

              <div>
                <label className="block text-[#5F5972] dark:text-[#B9B2CE] mb-1 font-medium">Employment Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as JobType)}
                  className="w-full px-3 py-2 bg-[#F8F7FB] dark:bg-[#1A1624] border border-[#E9E6EF] dark:border-[#383049] rounded-xl text-[#292633] dark:text-white focus:outline-none focus:border-[#6941C6]"
                >
                  <option value="Full-Time">Full-Time</option>
                  <option value="Contract">Contract</option>
                  <option value="C2C">C2C</option>
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>

              <div>
                <label className="block text-[#5F5972] dark:text-[#B9B2CE] mb-1 font-medium">Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as Priority)}
                  className="w-full px-3 py-2 bg-[#F8F7FB] dark:bg-[#1A1624] border border-[#E9E6EF] dark:border-[#383049] rounded-xl text-[#292633] dark:text-white focus:outline-none focus:border-[#6941C6]"
                >
                  <option value="Urgent">Urgent</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>

            {/* Rates */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[#5F5972] dark:text-[#B9B2CE] mb-1 font-medium">Client Bill Rate ($/hr)</label>
                <input
                  type="number"
                  value={billRate}
                  onChange={(e) => setBillRate(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-[#F8F7FB] dark:bg-[#1A1624] border border-[#E9E6EF] dark:border-[#383049] rounded-xl font-mono text-[#292633] dark:text-white focus:outline-none focus:border-[#6941C6]"
                />
              </div>

              <div>
                <label className="block text-[#5F5972] dark:text-[#B9B2CE] mb-1 font-medium">Target Pay Rate ($/hr)</label>
                <input
                  type="number"
                  value={payRate}
                  onChange={(e) => setPayRate(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-[#F8F7FB] dark:bg-[#1A1624] border border-[#E9E6EF] dark:border-[#383049] rounded-xl font-mono text-[#292633] dark:text-white focus:outline-none focus:border-[#6941C6]"
                />
              </div>

              <div>
                <label className="block text-[#5F5972] dark:text-[#B9B2CE] mb-1 font-medium">Gross Spread Margin</label>
                {/* Mint #8AC9A7 */}
                <div className="px-3 py-2 bg-[#8AC9A7]/20 border border-[#8AC9A7]/40 rounded-xl font-mono font-bold text-[#276749] dark:text-[#8AC9A7]">
                  ${billRate - payRate}/hr ({Math.round(((billRate - payRate) / (billRate || 1)) * 100)}%)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Skills & Qualifications */}
        <div className="space-y-4 pt-4 border-t border-[#E9E6EF] dark:border-[#383049]">
          <div className="text-xs font-mono font-bold text-[#6941C6] uppercase tracking-wider">
            03. Mandatory Skills &amp; Qualifications
          </div>
          <div className="space-y-3 text-xs">
            <div className="flex gap-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={handleAddSkill}
                placeholder="Type skill and press Enter (e.g. Kubernetes, Rust, GraphQL)"
                className="flex-1 px-3 py-2 bg-[#F8F7FB] dark:bg-[#1A1624] border border-[#E9E6EF] dark:border-[#383049] rounded-xl text-[#292633] dark:text-white focus:outline-none focus:border-[#6941C6]"
              />
              {/* Deep Violet #402568 button */}
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-4 py-2 bg-[#402568] hover:bg-[#4E2E7D] text-white rounded-xl transition-colors font-medium"
              >
                Add Skill
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

        {/* Section 4: Recruiter Allocation & Description */}
        <div className="space-y-4 pt-4 border-t border-[#E9E6EF] dark:border-[#383049]">
          <div className="text-xs font-mono font-bold text-[#6941C6] uppercase tracking-wider">
            04. Recruiter Allocation &amp; JD
          </div>
          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-[#5F5972] dark:text-[#B9B2CE] mb-1 font-medium">Assigned Lead Recruiter</label>
              <select
                value={assignedRecruiter}
                onChange={(e) => setAssignedRecruiter(e.target.value)}
                className="w-full px-3 py-2 bg-[#F8F7FB] dark:bg-[#1A1624] border border-[#E9E6EF] dark:border-[#383049] rounded-xl text-[#292633] dark:text-white focus:outline-none focus:border-[#6941C6]"
              >
                <option value="Priya Sharma">Priya Sharma (Cloud &amp; AI Practice)</option>
                <option value="Marcus Vance">Marcus Vance (Fintech &amp; Enterprise)</option>
                <option value="Rajesh Ramanathan">Rajesh Ramanathan (Practice Lead)</option>
              </select>
            </div>

            <div>
              <label className="block text-[#5F5972] dark:text-[#B9B2CE] mb-1 font-medium">Full Job Description</label>
              <textarea
                rows={5}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detailed responsibilities, deliverables, and interview screening rubric..."
                className="w-full p-3 bg-[#F8F7FB] dark:bg-[#1A1624] border border-[#E9E6EF] dark:border-[#383049] rounded-xl text-xs text-[#292633] dark:text-white focus:outline-none focus:border-[#6941C6]"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-[#E9E6EF] dark:border-[#383049] flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate('jobs')}
            className="px-4 py-2 border border-[#E9E6EF] dark:border-[#383049] text-[#5F5972] dark:text-[#B9B2CE] hover:text-[#292633] rounded-xl text-xs font-medium transition-colors"
          >
            Cancel
          </button>

          <div className="flex items-center gap-2">
            {/* Primary Button: Bright Orange #FF8243 */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 bg-[#FF8243] hover:bg-[#E96F30] text-white rounded-xl text-xs font-semibold shadow-xs shadow-[#FF8243]/30 transition-all"
            >
              {isSubmitting ? 'Publishing Requisition...' : 'Publish Requisition'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
