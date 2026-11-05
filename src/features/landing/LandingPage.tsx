import React, { useState } from 'react';
import {
  Briefcase,
  Users,
  Building2,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  BarChart,
  Calendar,
  Sparkles,
  ChevronDown,
  Globe,
  FileCheck2,
  Clock,
  Compass,
  Zap,
  TrendingUp,
  X,
  Palette
} from 'lucide-react';
import { Logo } from '../../components/common/Logo';
import { TalentNetwork3D } from '../../components/common/TalentNetwork3D';
import { useAppStore, ThemePalette } from '../../store/appStore';

export const LandingPage: React.FC = () => {
  const { navigate, setLoginRole, themePalette, setThemePalette } = useAppStore();
  const [cookieConsentAccepted, setCookieConsentAccepted] = useState(false);
  const [activeTab, setActiveTab] = useState<'ats' | 'vms' | 'workforce'>('ats');
  const [offerDropdown, setOfferDropdown] = useState(false);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [demoSubmitted, setDemoSubmitted] = useState(false);

  const handleLoginClick = () => {
    navigate('login');
  };

  const handleStartDemo = (role: 'recruiter' | 'manager' | 'super_admin' = 'recruiter') => {
    setLoginRole(role);
    navigate('login');
  };

  return (
    <div className="min-h-screen bg-[#F8F7FB] dark:bg-slate-950 text-[#292633] dark:text-slate-100 selection:bg-[#6941C6] selection:text-white">
      {/* Announcement Bar */}
      <div className="bg-[#402568] text-[#F1EBFA] px-4 py-2 text-xs font-medium border-b border-[#351E57] flex items-center justify-center gap-3">
        <span className="flex items-center gap-1.5 text-[#FF8243]">
          <Sparkles className="w-3.5 h-3.5 text-[#FF8243]" />
          <span className="font-semibold text-white">NexusTalent 2026.4 Enterprise Edition:</span>
        </span>
        <span className="hidden sm:inline text-[#D1C5E4]">
          Unified ATS, Vendor Management &amp; Global Workforce Operations with instant skill indexing.
        </span>
        <button
          onClick={() => handleStartDemo('recruiter')}
          className="text-[#FF8243] hover:text-white font-semibold underline underline-offset-2 transition-colors ml-1"
        >
          Launch Recruiter Workspace →
        </button>
      </div>

      {/* Header Navigation (§2 Top Bar Contract) */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#1E1B29]/95 backdrop-blur-md border-b border-[#E9E6EF] dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <div onClick={() => navigate('landing')} className="cursor-pointer">
            <Logo size="md" />
          </div>

          {/* Zone 2: Clean single-line text links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#292633] dark:text-slate-300">
            <div className="relative group">
              <button
                onClick={() => setOfferDropdown(!offerDropdown)}
                className="flex items-center gap-1 hover:text-[#6941C6] dark:hover:text-[#A888EC] transition-colors whitespace-nowrap shrink-0"
              >
                <span>What We Offer</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <div className="absolute top-full -left-4 pt-2 hidden group-hover:block">
                <div className="w-64 bg-white dark:bg-slate-800 border border-[#E9E6EF] dark:border-slate-700 rounded-xl shadow-xl p-2 text-xs">
                  <div
                    onClick={() => setActiveTab('ats')}
                    className="p-2 rounded-lg hover:bg-[#F1EBFA] dark:hover:bg-slate-700/50 cursor-pointer"
                  >
                    <div className="font-semibold text-[#292633] dark:text-white">Unified ATS Engine</div>
                    <div className="text-[11px] text-[#817984]">Fast multi-format resume parsing &amp; pipeline</div>
                  </div>
                  <div
                    onClick={() => setActiveTab('vms')}
                    className="p-2 rounded-lg hover:bg-[#F1EBFA] dark:hover:bg-slate-700/50 cursor-pointer"
                  >
                    <div className="font-semibold text-[#292633] dark:text-white">Vendor Management (VMS)</div>
                    <div className="text-[11px] text-[#817984]">Supplier contracts &amp; compliance automation</div>
                  </div>
                  <div
                    onClick={() => setActiveTab('workforce')}
                    className="p-2 rounded-lg hover:bg-[#F1EBFA] dark:hover:bg-slate-700/50 cursor-pointer"
                  >
                    <div className="font-semibold text-[#292633] dark:text-white">Workforce &amp; Placements</div>
                    <div className="text-[11px] text-[#817984]">Contract margins, bill rates &amp; time tracking</div>
                  </div>
                </div>
              </div>
            </div>

            <a href="#solutions" className="hover:text-[#6941C6] dark:hover:text-[#A888EC] transition-colors whitespace-nowrap shrink-0">
              Solutions
            </a>
            <a href="#capabilities" className="hover:text-[#6941C6] dark:hover:text-[#A888EC] transition-colors whitespace-nowrap shrink-0">
              Capabilities
            </a>
            <a href="#pricing" className="hover:text-[#6941C6] dark:hover:text-[#A888EC] transition-colors whitespace-nowrap shrink-0">
              Pricing
            </a>
            <a href="#testimonials" className="hover:text-[#6941C6] dark:hover:text-[#A888EC] transition-colors whitespace-nowrap shrink-0">
              Case Studies
            </a>
          </nav>

          {/* Zone 3: Primary Action buttons */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleLoginClick}
              className="px-4 py-2 text-xs font-semibold text-[#292633] dark:text-slate-200 hover:text-[#6941C6] dark:hover:text-[#A888EC] transition-colors whitespace-nowrap"
            >
              Sign In
            </button>
            <button
              onClick={() => handleStartDemo('recruiter')}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#FF8243] hover:bg-[#E96F30] rounded-xl shadow-xs shadow-[#FF8243]/30 transition-all whitespace-nowrap"
            >
              Launch Live App
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section: Modern High-Impact Split Layout */}
      <section className="relative pt-12 pb-20 px-6 max-w-7xl mx-auto overflow-hidden">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading, Proposition, Primary CTAs */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F1EBFA] dark:bg-[#6941C6]/20 border border-[#6941C6]/30 rounded-full text-xs font-mono text-[#6941C6] dark:text-[#D1C5E4]">
              <span>ENTERPRISE TALENT ARCHITECTURE</span>
              <span>·</span>
              <span className="text-[#817984]">CEIPAL-INSPIRED VELOCITY</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight leading-[1.08] text-[#292633] dark:text-white text-balance">
              The Unified Talent Platform for Hiring, Vendors &amp; Workforce
            </h1>

            <p className="text-base sm:text-lg text-[#817984] leading-relaxed max-w-xl">
              Transform your recruitment operations with one intelligent platform to manage jobs,
              applicants, clients, vendors, and workforce operations with unmatched precision.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => handleStartDemo('recruiter')}
                className="px-6 py-3 text-sm font-semibold text-white bg-[#FF8243] hover:bg-[#E96F30] rounded-xl shadow-md shadow-[#FF8243]/30 transition-all flex items-center gap-2 group cursor-pointer"
              >
                <span>Launch Recruiter Workspace</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setDemoModalOpen(true)}
                className="px-5 py-3 text-sm font-semibold text-[#292633] dark:text-slate-200 bg-white dark:bg-slate-800 border border-[#E9E6EF] dark:border-slate-700 hover:border-[#6941C6] rounded-xl transition-all shadow-xs"
              >
                Request Enterprise Demo
              </button>
            </div>

            {/* Claim-to-Proof Metric Strip */}
            <div className="pt-8 border-t border-[#E9E6EF] dark:border-slate-800 grid grid-cols-3 gap-6">
              <div>
                <div className="text-2xl font-bold font-mono text-[#292633] dark:text-white tabular-nums">
                  3.8x
                </div>
                <div className="text-xs text-[#817984] mt-0.5">Faster Submissions</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-mono text-[#6941C6] dark:text-[#A888EC] tabular-nums">
                  94.2%
                </div>
                <div className="text-xs text-[#817984] mt-0.5">Resume Match Accuracy</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-mono text-[#2E7D5B] dark:text-[#8AC9A7] tabular-nums">48 Hrs</div>
                <div className="text-xs text-[#817984] mt-0.5">Avg Time-to-Interview</div>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Interactive Scene with Layered Depth */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl bg-[#402568] border border-[#351E57] shadow-2xl overflow-hidden p-2">
              <TalentNetwork3D height="500px" interactive={true} />
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Tab Strip */}
      <section id="solutions" className="py-20 px-6 bg-white dark:bg-[#1E1B29] border-y border-[#E9E6EF] dark:border-slate-800">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="text-xs font-mono text-[#6941C6] dark:text-[#A888EC] tracking-widest uppercase">
              Core Platform Taxonomy
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#292633] dark:text-white">
              Architected for Enterprise Staffing &amp; Corporate Teams
            </h2>
            <p className="text-sm text-[#817984]">
              Eliminate fragmented ATS silos, email spreadsheets, and disconnected vendor billing with a unified operating system.
            </p>
          </div>

          {/* Interactive Feature Segment Selector */}
          <div className="flex justify-center">
            <div className="inline-flex p-1 bg-[#F1EBFA] dark:bg-slate-800 border border-[#E9E6EF] dark:border-slate-700 rounded-xl">
              <button
                onClick={() => setActiveTab('ats')}
                className={`px-5 py-2 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === 'ats'
                    ? 'bg-[#6941C6] text-white shadow-xs'
                    : 'text-[#817984] hover:text-[#292633]'
                }`}
              >
                01. Applicant Tracking &amp; Pipeline
              </button>
              <button
                onClick={() => setActiveTab('vms')}
                className={`px-5 py-2 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === 'vms'
                    ? 'bg-[#6941C6] text-white shadow-xs'
                    : 'text-[#817984] hover:text-[#292633]'
                }`}
              >
                02. Vendor Management (VMS)
              </button>
              <button
                onClick={() => setActiveTab('workforce')}
                className={`px-5 py-2 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === 'workforce'
                    ? 'bg-[#6941C6] text-white shadow-xs'
                    : 'text-[#817984] hover:text-[#292633]'
                }`}
              >
                03. Placements &amp; Workforce
              </button>
            </div>
          </div>

          {/* Active Tab Showcase */}
          {activeTab === 'ats' && (
            <div className="grid md:grid-cols-3 gap-6 animate-in fade-in duration-200">
              <div className="p-6 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl space-y-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">6-Way Ingestion &amp; Parsing</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Extract deep skills, education, employment timelines, and certs via direct PDF drag-and-drop, Dropbox, Box, OneDrive, or bulk folder processing.
                </p>
                <div className="pt-2 text-xs font-mono text-indigo-600 dark:text-indigo-400">✓ Semantic entity normalization</div>
              </div>

              <div className="p-6 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/80 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Smart Candidate Match Index</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Real-time match scoring evaluates candidate resumes against open job requisitions, highlighting core competencies and experience gaps.
                </p>
                <div className="pt-2 text-xs font-mono text-blue-600 dark:text-blue-400">✓ Algorithmic relevance scoring</div>
              </div>

              <div className="p-6 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Visual Drag &amp; Drop Funnel</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Manage candidates through 8 standardized recruitment stages: New, Screening, Submitted, Interview, Selected, Offered, Hired, and Rejected.
                </p>
                <div className="pt-2 text-xs font-mono text-emerald-600">✓ Stage-based audit trail</div>
              </div>
            </div>
          )}

          {activeTab === 'vms' && (
            <div className="grid md:grid-cols-3 gap-6 animate-in fade-in duration-200">
              <div className="p-6 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl space-y-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Supplier Tiering &amp; Distribution</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Broadcast requisitions to preferred staffing vendors based on category, geographical coverage, and historical candidate placement speed.
                </p>
                <div className="pt-2 text-xs font-mono text-indigo-600 dark:text-indigo-400">✓ Automated SLA dispatch</div>
              </div>

              <div className="p-6 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Compliance &amp; Insurance Checks</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Track vendor COI expirations, Master Services Agreements (MSAs), and Right to Represent (RTR) documentation automatically.
                </p>
                <div className="pt-2 text-xs font-mono text-emerald-600">✓ Zero non-compliant submissions</div>
              </div>

              <div className="p-6 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl space-y-3">
                <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-950/80 flex items-center justify-center text-violet-600 dark:text-violet-400">
                  <BarChart className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Vendor Scorecards &amp; Margins</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Evaluate vendor performance by submission response time, interview acceptance rates, and gross billing margins.
                </p>
                <div className="pt-2 text-xs font-mono text-violet-600 dark:text-violet-400">✓ Transparent margin breakdown</div>
              </div>
            </div>
          )}

          {activeTab === 'workforce' && (
            <div className="grid md:grid-cols-3 gap-6 animate-in fade-in duration-200">
              <div className="p-6 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl space-y-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  <FileCheck2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Contract &amp; Permanent Placements</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Generate structured onboarding dossiers, calculate net bill vs pay rates, and enforce automated contract end-date extensions.
                </p>
                <div className="pt-2 text-xs font-mono text-indigo-600 dark:text-indigo-400">✓ W2, 1099 &amp; C2C workflows</div>
              </div>

              <div className="p-6 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Real-Time Margin Tracking</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Monitor gross margin percentages across all live contractor placements with automated alerts for sub-target spreads.
                </p>
                <div className="pt-2 text-xs font-mono text-emerald-600">✓ Live profit calculation</div>
              </div>

              <div className="p-6 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/80 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Client Account Portfolios</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Maintain 360-degree client profiles with linked jobs, submissions, hiring managers, bill histories, and rate negotiations.
                </p>
                <div className="pt-2 text-xs font-mono text-blue-600 dark:text-blue-400">✓ Enterprise account CRM</div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Recruiter Workspace Visual Showcase Section */}
      <section id="capabilities" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-5">
            <div className="text-xs font-mono text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              High-Velocity Recruiter Experience
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white">
              Built for Recruiters Who Move at Lightning Speed
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Every millisecond counts when placing top-tier technical and executive talent. NexusTalent equips recruiters with keyboard shortcuts, instant boolean search, direct resume previews, and 1-click submission approvals.
            </p>

            <div className="space-y-3 pt-2 text-xs font-medium">
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Instant boolean keyword &amp; radius candidate search</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Automated submission package generator with redacted resumes</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Synchronized interview calendar with Google Meet &amp; Zoom</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => handleStartDemo('recruiter')}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm transition-all"
              >
                Test-Drive Recruiter Workspace →
              </button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xl relative bg-[#0B1120]">
              <img
                src="/src/assets/images/recruiter_workspace_showcase_1793866557667.jpg"
                alt="Recruiter Workspace Showcase"
                className="w-full h-auto object-cover opacity-90"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-slate-800 flex items-center justify-between text-xs text-white">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span>Interactive Live Recruiter Desk</span>
                </div>
                <span className="font-mono text-cyan-400">0 Dead-Clicks · 100% Functional</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Proof & Testimonials Section */}
      <section id="testimonials" className="py-20 px-6 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="text-xs font-mono text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              Proven Enterprise ROI
            </div>
            <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white">
              Trusted by Premier Staffing Agencies &amp; Global Enterprises
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl space-y-4">
              <p className="text-sm text-slate-700 dark:text-slate-200 italic leading-relaxed">
                "Switching from our legacy ATS to NexusTalent cut our recruiter submission turnaround from 3 days to under 4 hours. The visual candidate pipeline and automated client submission packet saved our recruiters over 15 hours per week."
              </p>
              <div className="flex items-center gap-3 pt-2">
                <img
                  src="/src/assets/images/candidate_profile_marcus_1793866558379.jpg"
                  alt="Marcus Vance"
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-indigo-500"
                />
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Marcus Vance</div>
                  <div className="text-[11px] text-slate-500">VP of Talent Acquisition, FinEdge Capital</div>
                </div>
              </div>
            </div>

            <div className="p-8 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl space-y-4">
              <p className="text-sm text-slate-700 dark:text-slate-200 italic leading-relaxed">
                "The Vendor Management and margin calculations alone justified our enterprise investment. We now have complete transparency into 28 staffing agency partners with zero compliance breaches over the last four quarters."
              </p>
              <div className="flex items-center gap-3 pt-2">
                <img
                  src="/src/assets/images/candidate_profile_ananya_1793866559236.jpg"
                  alt="Ananya Deshmukh"
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-emerald-500"
                />
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Ananya Deshmukh</div>
                  <div className="text-[11px] text-slate-500">Head of Global Cloud Engineering Hiring</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Comparison Matrix */}
      <section id="pricing" className="py-20 px-6 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-mono text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
            Predictable Scalable Pricing
          </div>
          <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white">
            Transparent Plans for Growing &amp; Global Teams
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-6">
            <div>
              <div className="text-xs font-mono text-slate-500 uppercase">For Boutique Agencies</div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">Growth Staffing</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold font-mono text-slate-900 dark:text-white tabular-nums">$79</span>
                <span className="text-xs text-slate-500">/ recruiter / mo</span>
              </div>
            </div>
            <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
              <li className="flex items-center gap-2">✓ Up to 10 active recruiters</li>
              <li className="flex items-center gap-2">✓ Full ATS with 6-way resume parsing</li>
              <li className="flex items-center gap-2">✓ Interactive candidate pipeline Kanban</li>
              <li className="flex items-center gap-2">✓ Client submission &amp; interview scheduling</li>
            </ul>
            <button
              onClick={() => handleStartDemo('recruiter')}
              className="w-full py-2.5 text-xs font-semibold text-[#292633] dark:text-white border border-[#E9E6EF] dark:border-slate-700 hover:border-[#6941C6] rounded-xl transition-colors"
            >
              Start Free Trial
            </button>
          </div>

          <div className="p-8 bg-[#402568] text-white border-2 border-[#FF8243] rounded-3xl space-y-6 shadow-xl relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-[#FF8243] text-white text-[10px] font-mono font-bold uppercase rounded-full shadow-sm">
              Most Popular
            </div>
            <div>
              <div className="text-xs font-mono text-[#D1C5E4] uppercase">For Scaling Operations</div>
              <h3 className="text-xl font-bold text-white mt-1">Enterprise Unified</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold font-mono text-white tabular-nums">$149</span>
                <span className="text-xs text-[#D1C5E4]">/ recruiter / mo</span>
              </div>
            </div>
            <ul className="space-y-3 text-xs text-[#F1EBFA]">
              <li className="flex items-center gap-2">✓ Unlimited recruiters &amp; managers</li>
              <li className="flex items-center gap-2">✓ Full VMS with Vendor Compliance Auditing</li>
              <li className="flex items-center gap-2">✓ Manager Submission Approval Workflow</li>
              <li className="flex items-center gap-2">✓ Placement Margin &amp; Rate Tracking</li>
              <li className="flex items-center gap-2">✓ Advanced Boolean &amp; Radius Talent Search</li>
            </ul>
            <button
              onClick={() => handleStartDemo('manager')}
              className="w-full py-2.5 text-xs font-semibold text-white bg-[#FF8243] hover:bg-[#E96F30] rounded-xl shadow-md transition-all cursor-pointer"
            >
              Launch Enterprise Trial
            </button>
          </div>

          <div className="p-8 bg-white dark:bg-[#1E1B29] border border-[#E9E6EF] dark:border-slate-800 rounded-3xl space-y-6">
            <div>
              <div className="text-xs font-mono text-[#817984] uppercase">For Global Conglomerates</div>
              <h3 className="text-xl font-bold text-[#292633] dark:text-white mt-1">Custom Platform</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold font-mono text-[#292633] dark:text-white tabular-nums">Custom</span>
              </div>
            </div>
            <ul className="space-y-3 text-xs text-[#817984]">
              <li className="flex items-center gap-2">✓ Dedicated single-tenant cloud deployment</li>
              <li className="flex items-center gap-2">✓ Custom ERP &amp; HRIS integration</li>
              <li className="flex items-center gap-2">✓ Granular RBAC &amp; immutable audit logs</li>
              <li className="flex items-center gap-2">✓ 24/7 Enterprise SLA &amp; account manager</li>
            </ul>
            <button
              onClick={() => handleStartDemo('super_admin')}
              className="w-full py-2.5 text-xs font-semibold text-[#292633] dark:text-white border border-[#E9E6EF] dark:border-slate-700 hover:border-[#6941C6] rounded-xl transition-colors"
            >
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-20 px-6 bg-[#402568] text-white text-center border-t border-[#351E57]">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#351E57] rounded-full text-xs font-mono text-[#FF8243]">
            READY TO MODERNIZE RECRUITMENT OPERATIONS?
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
            Experience the Unified Talent Platform
          </h2>
          <p className="text-sm text-[#D1C5E4] leading-relaxed max-w-xl mx-auto">
            Log in directly as Super Admin, Recruitment Practice Manager, or Lead Recruiter to explore the complete workflows with realistic production datasets.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => handleStartDemo('recruiter')}
              className="px-6 py-3 text-xs font-bold text-white bg-[#FF8243] hover:bg-[#E96F30] rounded-xl shadow-lg shadow-[#FF8243]/30 transition-all cursor-pointer"
            >
              Sign In as Recruiter
            </button>
            <button
              onClick={() => handleStartDemo('manager')}
              className="px-6 py-3 text-xs font-bold text-[#F1EBFA] bg-[#6941C6] hover:bg-[#5833AA] rounded-xl border border-[#6941C6] transition-all cursor-pointer"
            >
              Sign In as Manager
            </button>
            <button
              onClick={() => handleStartDemo('super_admin')}
              className="px-6 py-3 text-xs font-bold text-white bg-[#351E57] hover:bg-[#2B1846] rounded-xl border border-[#6941C6]/40 transition-all cursor-pointer"
            >
              Sign In as Super Admin
            </button>
          </div>
        </div>
      </section>

      {/* Professional Footer */}
      <footer className="py-12 px-6 bg-[#070B14] text-slate-400 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <Logo size="sm" />
          <div className="flex items-center gap-6">
            <a href="#solutions" className="hover:text-white transition-colors">Solutions</a>
            <a href="#capabilities" className="hover:text-white transition-colors">Capabilities</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <span
              onClick={handleLoginClick}
              className="hover:text-white cursor-pointer transition-colors"
            >
              Sign In
            </span>
          </div>
          <div>© 2026 NexusTalent Inc. All rights reserved. Enterprise Unified Talent Platform.</div>
        </div>
      </footer>

      {/* Cookie Consent Banner */}
      {!cookieConsentAccepted && (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 p-4 bg-[#402568] text-white border border-[#6941C6] rounded-2xl shadow-2xl flex items-center justify-between gap-4 text-xs animate-in slide-in-from-bottom duration-200">
          <div>
            We use essential cookies to maintain secure sessions and optimize candidate matching.
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setCookieConsentAccepted(true)}
              className="px-3 py-1.5 bg-[#FF8243] hover:bg-[#E96F30] text-white font-semibold rounded-lg transition-colors whitespace-nowrap"
            >
              Accept All
            </button>
            <button
              onClick={() => setCookieConsentAccepted(true)}
              className="p-1 text-[#D1C5E4] hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Enterprise Demo Request Modal */}
      {demoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white dark:bg-[#1E1B29] border border-[#E9E6EF] dark:border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#292633] dark:text-white">
                Request Enterprise Talent Demo
              </h3>
              <button onClick={() => setDemoModalOpen(false)} className="text-[#817984] hover:text-[#292633] dark:hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {demoSubmitted ? (
              <div className="py-6 text-center space-y-2">
                <CheckCircle className="w-10 h-10 text-[#8AC9A7] mx-auto" />
                <div className="text-sm font-bold text-[#292633] dark:text-white">Demo Request Received!</div>
                <div className="text-xs text-[#817984]">
                  An enterprise account architect will connect with you within 2 business hours.
                </div>
                <button
                  onClick={() => setDemoModalOpen(false)}
                  className="mt-4 px-4 py-2 bg-[#FF8243] hover:bg-[#E96F30] text-white text-xs font-semibold rounded-lg"
                >
                  Done
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setDemoSubmitted(true);
                }}
                className="space-y-3 text-xs"
              >
                <div>
                  <label className="block font-medium text-[#817984] mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rachel Adams"
                    className="w-full px-3 py-2 bg-[#F8F7FB] dark:bg-slate-800 border border-[#E9E6EF] dark:border-slate-700 rounded-lg text-[#292633] dark:text-white focus:outline-none focus:border-[#6941C6]"
                  />
                </div>
                <div>
                  <label className="block font-medium text-[#817984] mb-1">Work Email</label>
                  <input
                    type="email"
                    required
                    placeholder="rachel@enterprise-staffing.com"
                    className="w-full px-3 py-2 bg-[#F8F7FB] dark:bg-slate-800 border border-[#E9E6EF] dark:border-slate-700 rounded-lg text-[#292633] dark:text-white focus:outline-none focus:border-[#6941C6]"
                  />
                </div>
                <div>
                  <label className="block font-medium text-[#817984] mb-1">Company Size</label>
                  <select className="w-full px-3 py-2 bg-[#F8F7FB] dark:bg-slate-800 border border-[#E9E6EF] dark:border-slate-700 rounded-lg text-[#292633] dark:text-white focus:outline-none focus:border-[#6941C6]">
                    <option>10 - 50 Recruiters</option>
                    <option>50 - 250 Recruiters</option>
                    <option>250+ Enterprise Scale</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#FF8243] hover:bg-[#E96F30] text-white font-semibold rounded-lg shadow-sm transition-colors mt-2"
                >
                  Schedule Guided Walkthrough
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
