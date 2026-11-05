import React, { useState } from 'react';
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  Shield,
  Users,
  Briefcase,
  CheckCircle,
  Sparkles,
  ArrowRight,
  Info,
  X
} from 'lucide-react';
import { Logo } from '../../components/common/Logo';
import { useAppStore } from '../../store/appStore';
import { UserRole } from '../../types';

export const LoginPage: React.FC = () => {
  const { loginAs, selectedRoleForLogin, setLoginRole, navigate } = useAppStore();
  const [role, setRole] = useState<UserRole>(selectedRoleForLogin || 'recruiter');
  const [email, setEmail] = useState('priya.sharma@talentember.io');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotSubmitted, setForgotSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleSelect = (r: UserRole) => {
    setRole(r);
    setLoginRole(r);
    if (r === 'super_admin') {
      setEmail('elena.rostova@talentember.io');
    } else if (r === 'manager') {
      setEmail('rajesh.r@talentember.io');
    } else {
      setEmail('priya.sharma@talentember.io');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      loginAs(role);
      setIsLoading(false);
    }, 300);
  };

  return (
    <div className="min-h-screen w-full flex bg-[#F8F7FB] dark:bg-slate-950 text-[#292633] dark:text-slate-100">
      {/* Left Section: 3D Visual Showcase & Role Storytelling */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#402568] flex-col justify-between p-12 overflow-hidden border-r border-[#351E57]">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/hero_talent_platform_1793866556860.jpg"
            alt="3D Talent Network Visual"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#402568] via-[#402568]/85 to-[#402568]/50" />
        </div>

        {/* Top Brand Mark */}
        <div className="relative z-10 flex items-center justify-between">
          <div onClick={() => navigate('landing')} className="cursor-pointer">
            <Logo size="lg" />
          </div>
          <span className="px-3 py-1 bg-[#2D194B]/80 border border-[#6941C6]/40 rounded-full text-xs font-mono text-[#D1C5E4]">
            Unified ATS &amp; VMS Platform
          </span>
        </div>

        {/* Floating Interactive 3D Candidate Match Card */}
        <div className="relative z-10 max-w-md my-auto space-y-6">
          <div className="p-5 bg-[#2B1846]/90 backdrop-blur-md border border-[#6941C6]/50 rounded-2xl shadow-2xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="/src/assets/images/candidate_profile_ananya_1793866559236.jpg"
                  alt="Ananya Deshmukh"
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-[#FF8243]"
                />
                <div>
                  <div className="text-sm font-bold text-white">Ananya Deshmukh</div>
                  <div className="text-xs text-[#D1C5E4]">Lead Cloud AI Architect</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold font-mono text-[#8AC9A7]">94%</div>
                <div className="text-[10px] font-mono text-[#D1C5E4]">MATCH INDEX</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {['AWS Cloud', 'Kubernetes', 'MLOps', 'Distributed Systems'].map((s) => (
                <span
                  key={s}
                  className="px-2 py-0.5 bg-[#402568] border border-[#6941C6]/40 rounded text-[11px] font-mono text-[#F1EBFA]"
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="pt-2 border-t border-[#6941C6]/30 flex items-center justify-between text-xs text-[#8AC9A7]">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-[#8AC9A7]" />
                Verified &amp; Dispatched to CloudScale
              </span>
              <span className="font-mono text-white">$165/hr</span>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-display font-bold text-white">
              Recruitment Operating System for Modern High-Growth Teams
            </h2>
            <p className="text-xs text-[#D1C5E4] leading-relaxed">
              Consolidate sourcing, resume parsing, client submissions, vendor agreements, and placement billing in one seamless experience.
            </p>
          </div>
        </div>

        {/* Footer Note */}
        <div className="relative z-10 text-[11px] text-[#D1C5E4]/80 flex items-center justify-between">
          <span>Enterprise Grade · SOC2 Type II Certified</span>
          <span className="font-mono">v2026.4.1</span>
        </div>
      </div>

      {/* Right Section: Role Selection & Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 overflow-y-auto">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-[#292633] dark:text-white">
                Sign In to Workspace
              </h1>
              <button
                onClick={() => navigate('landing')}
                className="text-xs text-[#817984] hover:text-[#6941C6] transition-colors"
              >
                ← Back to Home
              </button>
            </div>
            <p className="text-xs text-[#817984]">
              Select your persona below to experience role-tailored dashboards and permissions.
            </p>
          </div>

          {/* Role Cards */}
          <div className="grid grid-cols-3 gap-2.5">
            {/* Recruiter */}
            <div
              onClick={() => handleRoleSelect('recruiter')}
              className={`p-3 rounded-xl border text-center cursor-pointer transition-all ${
                role === 'recruiter'
                  ? 'bg-[#F1EBFA] dark:bg-[#6941C6]/30 border-[#6941C6] shadow-xs'
                  : 'bg-white dark:bg-[#1E1B29] border-[#E9E6EF] dark:border-slate-800 hover:border-[#6941C6]'
              }`}
            >
              <div
                className={`w-8 h-8 mx-auto rounded-lg flex items-center justify-center mb-1.5 ${
                  role === 'recruiter'
                    ? 'bg-[#6941C6] text-white'
                    : 'bg-[#F8F7FB] dark:bg-slate-800 text-[#817984]'
                }`}
              >
                <Users className="w-4 h-4" />
              </div>
              <div className="text-xs font-bold text-[#292633] dark:text-white">Recruiter</div>
              <div className="text-[10px] text-[#817984] truncate mt-0.5">Priya Sharma</div>
            </div>

            {/* Manager */}
            <div
              onClick={() => handleRoleSelect('manager')}
              className={`p-3 rounded-xl border text-center cursor-pointer transition-all ${
                role === 'manager'
                  ? 'bg-[#F1EBFA] dark:bg-[#6941C6]/30 border-[#6941C6] shadow-xs'
                  : 'bg-white dark:bg-[#1E1B29] border-[#E9E6EF] dark:border-slate-800 hover:border-[#6941C6]'
              }`}
            >
              <div
                className={`w-8 h-8 mx-auto rounded-lg flex items-center justify-center mb-1.5 ${
                  role === 'manager'
                    ? 'bg-[#6941C6] text-white'
                    : 'bg-[#F8F7FB] dark:bg-slate-800 text-[#817984]'
                }`}
              >
                <Briefcase className="w-4 h-4" />
              </div>
              <div className="text-xs font-bold text-[#292633] dark:text-white">Manager</div>
              <div className="text-[10px] text-[#817984] truncate mt-0.5">Rajesh R.</div>
            </div>

            {/* Super Admin */}
            <div
              onClick={() => handleRoleSelect('super_admin')}
              className={`p-3 rounded-xl border text-center cursor-pointer transition-all ${
                role === 'super_admin'
                  ? 'bg-[#F1EBFA] dark:bg-[#6941C6]/30 border-[#6941C6] shadow-xs'
                  : 'bg-white dark:bg-[#1E1B29] border-[#E9E6EF] dark:border-slate-800 hover:border-[#6941C6]'
              }`}
            >
              <div
                className={`w-8 h-8 mx-auto rounded-lg flex items-center justify-center mb-1.5 ${
                  role === 'super_admin'
                    ? 'bg-[#6941C6] text-white'
                    : 'bg-[#F8F7FB] dark:bg-slate-800 text-[#817984]'
                }`}
              >
                <Shield className="w-4 h-4" />
              </div>
              <div className="text-xs font-bold text-[#292633] dark:text-white">Super Admin</div>
              <div className="text-[10px] text-[#817984] truncate mt-0.5">Elena Rostova</div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-[#292633] dark:text-slate-300 mb-1.5">
                Work Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#817984]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-[#E9E6EF] dark:border-slate-800 rounded-xl text-xs text-[#292633] dark:text-white focus:outline-none focus:border-[#6941C6] transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-medium text-[#292633] dark:text-slate-300">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setForgotModalOpen(true)}
                  className="text-xs text-[#6941C6] hover:text-[#402568] dark:text-[#A888EC] hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#817984]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-10 py-2.5 bg-white dark:bg-slate-900 border border-[#E9E6EF] dark:border-slate-800 rounded-xl text-xs text-[#292633] dark:text-white focus:outline-none focus:border-[#6941C6] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#817984] hover:text-[#292633] dark:hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-[#E9E6EF] text-[#6941C6] focus:ring-[#6941C6]"
                />
                <span className="text-[#817984]">Remember this terminal session</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-[#FF8243] hover:bg-[#E96F30] text-white font-semibold text-xs rounded-xl shadow-md shadow-[#FF8243]/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In as {role.replace('_', ' ').toUpperCase()}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Launch Strip */}
          <div className="p-4 bg-white dark:bg-slate-800/60 border border-[#E9E6EF] dark:border-slate-700 rounded-xl space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#292633] dark:text-white">
              <Info className="w-3.5 h-3.5 text-[#6941C6] dark:text-[#A888EC]" />
              <span>Instant Evaluator Demo Access</span>
            </div>
            <p className="text-[11px] text-[#817984] leading-relaxed">
              No real credentials required. Clicking below launches the live simulated tenant ready for FastAPI integration.
            </p>
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => loginAs('recruiter')}
                className="flex-1 py-1.5 bg-[#F8F7FB] dark:bg-slate-900 border border-[#E9E6EF] dark:border-slate-700 hover:border-[#6941C6] hover:bg-[#F1EBFA] rounded-lg text-xs font-medium text-[#292633] dark:text-slate-200 transition-colors"
              >
                Recruiter Desk
              </button>
              <button
                onClick={() => loginAs('manager')}
                className="flex-1 py-1.5 bg-[#F8F7FB] dark:bg-slate-900 border border-[#E9E6EF] dark:border-slate-700 hover:border-[#6941C6] hover:bg-[#F1EBFA] rounded-lg text-xs font-medium text-[#292633] dark:text-slate-200 transition-colors"
              >
                Manager Desk
              </button>
              <button
                onClick={() => loginAs('super_admin')}
                className="flex-1 py-1.5 bg-[#F8F7FB] dark:bg-slate-900 border border-[#E9E6EF] dark:border-slate-700 hover:border-[#6941C6] hover:bg-[#F1EBFA] rounded-lg text-xs font-medium text-[#292633] dark:text-slate-200 transition-colors"
              >
                Super Admin
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {forgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-white dark:bg-[#1E1B29] border border-[#E9E6EF] dark:border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#292633] dark:text-white">Reset Password</h3>
              <button onClick={() => setForgotModalOpen(false)} className="text-[#817984] hover:text-[#292633]">
                <X className="w-4 h-4" />
              </button>
            </div>

            {forgotSubmitted ? (
              <div className="py-4 text-center space-y-2 text-xs">
                <CheckCircle className="w-8 h-8 text-[#8AC9A7] mx-auto" />
                <div className="font-semibold text-[#292633] dark:text-white">Reset Link Dispatched</div>
                <div className="text-[#817984]">
                  Check your inbox for password restoration instructions.
                </div>
                <button
                  onClick={() => {
                    setForgotModalOpen(false);
                    setForgotSubmitted(false);
                  }}
                  className="mt-3 px-4 py-1.5 bg-[#FF8243] hover:bg-[#E96F30] text-white rounded-lg transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            ) : (
              <div className="space-y-3 text-xs">
                <p className="text-[#817984]">
                  Enter your registered talent email and we'll send a password recovery token.
                </p>
                <input
                  type="email"
                  defaultValue={email}
                  placeholder="name@talentember.io"
                  className="w-full px-3 py-2 bg-[#F8F7FB] dark:bg-slate-800 border border-[#E9E6EF] dark:border-slate-700 rounded-lg text-[#292633] dark:text-white focus:outline-none focus:border-[#6941C6]"
                />
                <button
                  onClick={() => setForgotSubmitted(true)}
                  className="w-full py-2 bg-[#FF8243] hover:bg-[#E96F30] text-white font-semibold rounded-lg transition-colors"
                >
                  Send Recovery Email
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
