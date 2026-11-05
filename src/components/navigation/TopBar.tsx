import React, { useState } from 'react';
import {
  Search,
  Plus,
  Bell,
  Sun,
  Moon,
  ChevronRight,
  Briefcase,
  UserPlus,
  Calendar,
  Building2,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { useAppStore } from '../../store/appStore';

export const TopBar: React.FC = () => {
  const {
    currentRoute,
    navigate,
    currentUser,
    isDark,
    toggleTheme,
    setGlobalSearch
  } = useAppStore();

  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [quickCreateOpen, setQuickCreateOpen] = useState(false);

  const getBreadcrumbs = () => {
    switch (currentRoute) {
      case 'dashboard':
        return ['Talent Operations', 'Executive Dashboard'];
      case 'jobs':
        return ['Requisitions', 'Active Openings'];
      case 'job-new':
        return ['Requisitions', 'Create Requisition'];
      case 'job-detail':
        return ['Requisitions', 'Requisition Details'];
      case 'applicants':
        return ['Talent Pool', 'Candidate Roster'];
      case 'applicant-new':
        return ['Talent Pool', 'Fast Resume Parse'];
      case 'applicant-detail':
        return ['Talent Pool', 'Candidate Dossier'];
      case 'pipeline':
        return ['Recruitment Funnel', 'Interactive Kanban'];
      case 'clients':
        return ['Accounts', 'Enterprise Client Directory'];
      case 'vendors':
        return ['Partners', 'Vendor Staffing Agencies'];
      case 'interviews':
        return ['Schedules', 'Interview Calendar'];
      case 'submissions':
        return ['Submissions', 'Manager Review & Client Dispatch'];
      case 'placements':
        return ['Workforce', 'Active Placements & Billing'];
      case 'search':
        return ['Talent Intelligence', 'Advanced Boolean Search'];
      case 'tasks':
        return ['Workflows', 'Action Items & SLA Reminders'];
      case 'reports':
        return ['Analytics', 'Recruiter Performance & Hiring Velocity'];
      case 'admin-users':
        return ['Governance', 'Users, Roles & Access Control'];
      case 'settings':
        return ['System', 'Platform Configuration'];
      default:
        return ['Talent Operations'];
    }
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header className="h-16 px-6 bg-white dark:bg-[#221D2E] border-b border-[#E9E6EF] dark:border-[#383049] flex items-center justify-between gap-6 z-20 shrink-0">
      {/* Zone 1: Contextual Breadcrumb Trail (Royal Purple highlight) */}
      <div className="flex items-center gap-2 text-xs font-medium text-[#5F5972] dark:text-[#B9B2CE] truncate">
        {breadcrumbs.map((crumb, idx) => (
          <React.Fragment key={idx}>
            {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-[#8E88A2] shrink-0" />}
            <span
              className={
                idx === breadcrumbs.length - 1
                  ? 'text-[#292633] dark:text-[#F8F7FB] font-semibold truncate'
                  : 'hover:text-[#6941C6] cursor-pointer transition-colors'
              }
            >
              {crumb}
            </span>
          </React.Fragment>
        ))}
      </div>

      {/* Zone 2: Global Search & Quick Actions */}
      <div className="flex items-center gap-3">
        {/* Global Search Pill (Off-white bg, Light Grey border, Charcoal text) */}
        <button
          onClick={() => setGlobalSearch(true)}
          className="hidden md:flex items-center gap-2.5 px-3 py-1.5 bg-[#F8F7FB] dark:bg-[#1A1624] border border-[#E9E6EF] dark:border-[#383049] rounded-xl text-xs text-[#5F5972] dark:text-[#B9B2CE] hover:border-[#6941C6] hover:bg-[#F1EBFA]/50 transition-colors w-64"
        >
          <Search className="w-3.5 h-3.5 text-[#8E88A2]" />
          <span className="flex-1 text-left truncate">Search candidates, jobs, clients...</span>
          <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-[#2B243B] text-[#5F5972] dark:text-[#D1C5E4] border border-[#E9E6EF] dark:border-[#4A4061] rounded">
            ⌘K
          </kbd>
        </button>

        {/* Quick Create Dropdown - Bright Orange Primary Button */}
        <div className="relative">
          <button
            onClick={() => setQuickCreateOpen(!quickCreateOpen)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#FF8243] hover:bg-[#E96F30] text-white text-xs font-semibold rounded-xl shadow-xs shadow-[#FF8243]/25 transition-all whitespace-nowrap shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create</span>
          </button>

          {quickCreateOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-[#221D2E] border border-[#E9E6EF] dark:border-[#383049] rounded-2xl shadow-xl py-1.5 z-50 text-xs">
              <button
                onClick={() => {
                  navigate('job-new');
                  setQuickCreateOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-left text-[#292633] dark:text-[#F8F7FB] hover:bg-[#F1EBFA] dark:hover:bg-[#312845] hover:text-[#6941C6] transition-colors"
              >
                <Briefcase className="w-4 h-4 text-[#6941C6]" />
                <span>New Requisition</span>
              </button>

              <button
                onClick={() => {
                  navigate('applicant-new');
                  setQuickCreateOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-left text-[#292633] dark:text-[#F8F7FB] hover:bg-[#F1EBFA] dark:hover:bg-[#312845] hover:text-[#6941C6] transition-colors"
              >
                <UserPlus className="w-4 h-4 text-[#8AC9A7]" />
                <span>Add &amp; Parse Candidate</span>
              </button>

              <button
                onClick={() => {
                  navigate('interviews');
                  setQuickCreateOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-left text-[#292633] dark:text-[#F8F7FB] hover:bg-[#F1EBFA] dark:hover:bg-[#312845] hover:text-[#6941C6] transition-colors"
              >
                <Calendar className="w-4 h-4 text-[#6941C6]" />
                <span>Schedule Interview</span>
              </button>

              <button
                onClick={() => {
                  navigate('clients');
                  setQuickCreateOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-left text-[#292633] dark:text-[#F8F7FB] hover:bg-[#F1EBFA] dark:hover:bg-[#312845] hover:text-[#6941C6] transition-colors"
              >
                <Building2 className="w-4 h-4 text-[#FF8243]" />
                <span>Add Enterprise Client</span>
              </button>
            </div>
          )}
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative p-2 text-[#5F5972] dark:text-[#B9B2CE] hover:text-[#6941C6] dark:hover:text-[#F8F7FB] rounded-xl hover:bg-[#F1EBFA] dark:hover:bg-[#312845] transition-colors border border-transparent hover:border-[#E9E6EF]"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FF8243] rounded-full" />
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#221D2E] border border-[#E9E6EF] dark:border-[#383049] rounded-2xl shadow-xl p-3 z-50">
              <div className="flex items-center justify-between pb-2 border-b border-[#E9E6EF] dark:border-[#383049]">
                <span className="text-xs font-semibold text-[#292633] dark:text-white">Live Activity Alerts</span>
                <span className="text-[10px] text-[#6941C6] font-mono font-semibold bg-[#F1EBFA] dark:bg-[#312845] px-2 py-0.5 rounded-full">
                  3 Unread
                </span>
              </div>
              <div className="divide-y divide-[#E9E6EF] dark:divide-[#383049] max-h-72 overflow-y-auto">
                <div className="py-2.5">
                  <div className="text-xs font-medium text-[#292633] dark:text-white">
                    Round 2 Confirmed: Ananya Deshmukh
                  </div>
                  <div className="text-[11px] text-[#5F5972] dark:text-[#B9B2CE]">
                    CloudScale VP confirmed 2:00 PM PST session.
                  </div>
                  <div className="text-[10px] font-mono text-[#8AC9A7] mt-1 font-semibold">12m ago</div>
                </div>

                <div className="py-2.5">
                  <div className="text-xs font-medium text-[#292633] dark:text-white">
                    Offer Letter Released: Devon Sterling
                  </div>
                  <div className="text-[11px] text-[#5F5972] dark:text-[#B9B2CE]">
                    FinEdge Capital extended formal offer ($165k).
                  </div>
                  <div className="text-[10px] font-mono text-[#6941C6] mt-1 font-semibold">1h ago</div>
                </div>

                <div className="py-2.5">
                  <div className="text-xs font-medium text-[#292633] dark:text-white">
                    Submission Approval Needed
                  </div>
                  <div className="text-[11px] text-[#5F5972] dark:text-[#B9B2CE]">
                    Nora Al-Mansoor submitted to NovaPay Systems.
                  </div>
                  <div className="text-[10px] font-mono text-[#FF8243] mt-1 font-semibold">3h ago</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Theme Toggle (Light/Dark) */}
        <button
          onClick={toggleTheme}
          className="p-2 text-[#5F5972] dark:text-[#B9B2CE] hover:text-[#6941C6] dark:hover:text-[#F8F7FB] rounded-xl hover:bg-[#F1EBFA] dark:hover:bg-[#312845] transition-colors border border-transparent hover:border-[#E9E6EF]"
          title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
        >
          {isDark ? <Sun className="w-4 h-4 text-[#FF8243]" /> : <Moon className="w-4 h-4 text-[#6941C6]" />}
        </button>

        {/* Role Badge (Soft Lavender background, Royal Purple text) */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-[#F1EBFA] dark:bg-[#312845] rounded-xl border border-[#E9E6EF] dark:border-[#4A4061] text-[11px] font-mono font-semibold text-[#6941C6] dark:text-[#D1C5E4]">
          <Sparkles className="w-3 h-3 text-[#FF8243]" />
          <span className="uppercase">{currentUser?.role?.replace('_', ' ') || 'RECRUITER'}</span>
        </div>
      </div>
    </header>
  );
};
