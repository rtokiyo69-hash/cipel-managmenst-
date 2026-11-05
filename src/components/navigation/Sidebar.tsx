import React, { useState } from 'react';
import {
  LayoutDashboard,
  Briefcase,
  Users,
  UserPlus,
  Kanban,
  Building2,
  Layers,
  Calendar,
  Send,
  Award,
  Search,
  CheckSquare,
  BarChart3,
  Shield,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  UserCheck
} from 'lucide-react';
import { useAppStore, AppRoute } from '../../store/appStore';
import { Logo } from '../common/Logo';
import { UserRole } from '../../types';

interface NavItem {
  id: AppRoute;
  label: string;
  icon: React.ElementType;
  badge?: string;
}

interface NavGroup {
  groupTitle: string;
  items: NavItem[];
}

export const Sidebar: React.FC = () => {
  const { currentRoute, navigate, currentUser, logout, loginAs } = useAppStore();
  const [collapsed, setCollapsed] = useState(false);
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);

  const role = currentUser?.role || 'recruiter';

  const getNavGroups = (): NavGroup[] => {
    if (role === 'super_admin') {
      return [
        {
          groupTitle: 'EXECUTIVE OVERVIEW',
          items: [
            { id: 'dashboard', label: 'Company Overview', icon: LayoutDashboard },
            { id: 'reports', label: 'Reports & Analytics', icon: BarChart3 }
          ]
        },
        {
          groupTitle: 'WORKFORCE OPERATIONS',
          items: [
            { id: 'jobs', label: 'All Requisitions', icon: Briefcase },
            { id: 'applicants', label: 'Applicant Pool', icon: Users },
            { id: 'pipeline', label: 'Recruitment Funnel', icon: Kanban },
            { id: 'clients', label: 'Enterprise Clients', icon: Building2 },
            { id: 'vendors', label: 'Vendor Agencies', icon: Layers },
            { id: 'placements', label: 'Active Placements', icon: Award }
          ]
        },
        {
          groupTitle: 'SYSTEM GOVERNANCE',
          items: [
            { id: 'admin-users', label: 'Roles & Access Control', icon: Shield },
            { id: 'settings', label: 'Enterprise Settings', icon: Settings }
          ]
        }
      ];
    }

    if (role === 'manager') {
      return [
        {
          groupTitle: 'PRACTICE DESK',
          items: [
            { id: 'dashboard', label: 'Practice Dashboard', icon: LayoutDashboard },
            { id: 'pipeline', label: 'Team Pipeline', icon: Kanban },
            { id: 'submissions', label: 'Submission Approvals', icon: Send, badge: '1' }
          ]
        },
        {
          groupTitle: 'PIPELINE MANAGEMENT',
          items: [
            { id: 'jobs', label: 'Assigned Requisitions', icon: Briefcase },
            { id: 'applicants', label: 'Candidate Roster', icon: Users },
            { id: 'interviews', label: 'Interview Oversight', icon: Calendar },
            { id: 'clients', label: 'Account Portfolio', icon: Building2 },
            { id: 'placements', label: 'Placements & Billing', icon: Award }
          ]
        },
        {
          groupTitle: 'TEAM PERFORMANCE',
          items: [
            { id: 'tasks', label: 'Team Task Queue', icon: CheckSquare },
            { id: 'reports', label: 'Recruiter Scorecards', icon: BarChart3 },
            { id: 'settings', label: 'Team Settings', icon: Settings }
          ]
        }
      ];
    }

    // Default: Recruiter
    return [
      {
        groupTitle: 'RECRUITER WORKSPACE',
        items: [
          { id: 'dashboard', label: 'Recruiter Desk', icon: LayoutDashboard },
          { id: 'pipeline', label: 'Candidate Pipeline', icon: Kanban },
          { id: 'search', label: 'Advanced Search', icon: Search }
        ]
      },
      {
        groupTitle: 'ACTIVE SOURCING',
        items: [
          { id: 'jobs', label: 'My Open Jobs', icon: Briefcase },
          { id: 'applicants', label: 'Candidates', icon: Users },
          { id: 'applicant-new', label: 'Fast Resume Parse', icon: UserPlus },
          { id: 'submissions', label: 'Client Submissions', icon: Send },
          { id: 'interviews', label: 'Interview Calendar', icon: Calendar }
        ]
      },
      {
        groupTitle: 'DELIVERY & ACCOUNTS',
        items: [
          { id: 'placements', label: 'My Placements', icon: Award },
          { id: 'clients', label: 'Client Directory', icon: Building2 },
          { id: 'tasks', label: 'My Action Items', icon: CheckSquare, badge: '3' }
        ]
      }
    ];
  };

  const navGroups = getNavGroups();

  return (
    <aside
      className={`relative flex flex-col bg-[#402568] text-white border-r border-[#351E57] transition-all duration-200 select-none z-30 shrink-0 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-5 border-b border-[#351E57]">
        <div
          onClick={() => navigate('dashboard')}
          className="cursor-pointer flex items-center overflow-hidden"
        >
          <Logo collapsed={collapsed} size="md" />
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-md text-[#D1C5E4] hover:text-white hover:bg-[#4E2E7D] transition-colors"
          title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {navGroups.map((group, gIdx) => (
          <div key={gIdx} className="space-y-1">
            {!collapsed && (
              <div className="px-3 pb-1 text-[10px] font-mono tracking-wider text-[#D1C5E4]/80 uppercase font-semibold">
                {group.groupTitle}
              </div>
            )}

            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive =
                currentRoute === item.id ||
                (item.id === 'jobs' && (currentRoute === 'job-new' || currentRoute === 'job-detail')) ||
                (item.id === 'applicants' && currentRoute === 'applicant-detail');

              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.id)}
                  title={collapsed ? item.label : undefined}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#6941C6] text-white font-semibold shadow-sm shadow-[#6941C6]/40'
                      : 'text-[#D1C5E4] hover:bg-[#4E2E7D] hover:text-white'
                  } ${collapsed ? 'justify-center' : ''}`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-[#D1C5E4]'}`} />
                  {!collapsed && (
                    <span className="flex-1 text-left truncate">{item.label}</span>
                  )}
                  {!collapsed && item.badge && (
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                        isActive ? 'bg-white/20 text-white' : 'bg-[#FF8243] text-white'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Role Switcher Drawer (Demo Convenience) */}
      <div className="p-3 border-t border-[#351E57] bg-[#331C54]">
        {!collapsed && (
          <div className="mb-2">
            <button
              onClick={() => setRoleSwitcherOpen(!roleSwitcherOpen)}
              className="w-full flex items-center justify-between text-xs text-[#F1EBFA] hover:text-white px-2.5 py-1.5 rounded-lg bg-[#3E2365] border border-[#4E2E7D] transition-colors"
            >
              <span className="flex items-center gap-1.5 font-mono">
                <UserCheck className="w-3.5 h-3.5 text-[#FF8243]" />
                Switch Persona
              </span>
              <span>{roleSwitcherOpen ? '▲' : '▼'}</span>
            </button>

            {roleSwitcherOpen && (
              <div className="mt-1.5 p-1 bg-[#402568] border border-[#4E2E7D] rounded-lg space-y-1 text-xs shadow-xl">
                {(['super_admin', 'manager', 'recruiter'] as UserRole[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      loginAs(r);
                      setRoleSwitcherOpen(false);
                    }}
                    className={`w-full text-left px-2 py-1 rounded-md capitalize transition-colors ${
                      role === r ? 'bg-[#6941C6] text-white font-medium' : 'text-[#D1C5E4] hover:bg-[#4E2E7D]'
                    }`}
                  >
                    {r.replace('_', ' ')}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Current User Card */}
        <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
          <img
            src={currentUser?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250'}
            alt={currentUser?.name}
            className="w-8 h-8 rounded-full object-cover ring-1 ring-[#FF8243]"
          />
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-white truncate">{currentUser?.name}</div>
              <div className="text-[11px] text-[#D1C5E4] capitalize truncate">
                {role.replace('_', ' ')}
              </div>
            </div>
          )}
          {!collapsed && (
            <button
              onClick={logout}
              className="p-1.5 text-[#D1C5E4] hover:text-[#FF8243] hover:bg-[#4E2E7D] rounded transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
