import React, { useState, useEffect } from 'react';
import {
  Shield,
  Users,
  CheckCircle,
  Lock,
  UserCheck,
  AlertCircle,
  Plus,
  Mail,
  Key
} from 'lucide-react';
import { useAppStore } from '../../store/appStore';
import { ApiService } from '../../services/api';
import { User, UserRole } from '../../types';

export const UserManagement: React.FC = () => {
  const { loginAs, currentUser } = useAppStore();
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    ApiService.getAllUsers().then((us) => {
      setUsers(us);
      if (us.length > 0) setSelectedUser(us[0]);
    });
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleRoleChange = (userId: string, newRole: UserRole) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
    );
    showToast(`Updated role to ${newRole.replace('_', ' ')}`);
  };

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
          Role &amp; Permission Governance (RBAC)
        </h1>
        <p className="text-xs text-[#817984]">
          Configure role boundaries, practice assignments, and administrative visibility
        </p>
      </div>

      {/* Architecture Readiness Notice */}
      <div className="p-4 bg-[#F1EBFA] dark:bg-[#6941C6]/15 border border-[#E9E6EF] dark:border-[#6941C6]/30 rounded-2xl flex items-start gap-3 text-xs">
        <Shield className="w-5 h-5 text-[#6941C6] dark:text-[#A888EC] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-bold text-[#292633] dark:text-white">
            Enterprise RBAC Authorization Architecture
          </div>
          <p className="text-[#817984] dark:text-[#D1C5E4] leading-relaxed">
            In this evaluation preview, permissions are enforced on client routing and component trees. The service interfaces are designed for seamless token-based validation when paired with a production backend.
          </p>
        </div>
      </div>

      {/* User Roster & Permissions Matrix */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* User Table */}
        <div className="lg:col-span-7 bg-white dark:bg-[#1E1B29] border border-[#E9E6EF] dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden">
          <div className="p-4 border-b border-[#E9E6EF] dark:border-slate-800">
            <h2 className="text-sm font-bold text-[#292633] dark:text-white">Active Team Members</h2>
          </div>

          <div className="divide-y divide-[#E9E6EF] dark:divide-slate-800">
            {users.map((u) => (
              <div
                key={u.id}
                onClick={() => setSelectedUser(u)}
                className={`p-4 flex items-center justify-between gap-4 cursor-pointer transition-colors ${
                  selectedUser?.id === u.id
                    ? 'bg-[#F1EBFA] dark:bg-[#6941C6]/20'
                    : 'hover:bg-[#F8F7FB] dark:hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <img src={u.avatar} alt={u.name} className="w-10 h-10 rounded-full object-cover ring-1 ring-[#E9E6EF] dark:ring-slate-700" />
                  <div>
                    <div className="text-xs font-bold text-[#292633] dark:text-white">{u.name}</div>
                    <div className="text-[11px] text-[#817984]">{u.email}</div>
                    <div className="text-[10px] text-[#6941C6] dark:text-[#A888EC] font-mono mt-0.5">{u.businessUnit}</div>
                  </div>
                </div>

                <div className="text-right">
                  <select
                    value={u.role}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => handleRoleChange(u.id, e.target.value as UserRole)}
                    className="px-2.5 py-1 bg-white dark:bg-slate-800 border border-[#E9E6EF] dark:border-slate-700 rounded-lg text-xs font-bold text-[#6941C6] dark:text-[#A888EC] focus:outline-none capitalize"
                  >
                    <option value="super_admin">Super Admin</option>
                    <option value="manager">Practice Manager</option>
                    <option value="recruiter">Technical Recruiter</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Role Permissions Matrix */}
        <div className="lg:col-span-5 bg-white dark:bg-[#1E1B29] border border-[#E9E6EF] dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4 text-xs">
          <div>
            <h2 className="text-sm font-bold text-[#292633] dark:text-white">
              Role Permission Entitlements
            </h2>
            <p className="text-xs text-[#817984]">
              Capabilities granted to <strong className="text-[#6941C6] dark:text-[#A888EC] capitalize">{selectedUser?.role.replace('_', ' ')}</strong>
            </p>
          </div>

          <div className="space-y-2.5 pt-2 border-t border-[#E9E6EF] dark:border-slate-800">
            <div className="p-2.5 bg-[#F8F7FB] dark:bg-slate-800/60 rounded-xl flex items-center justify-between border border-[#E9E6EF] dark:border-slate-750">
              <div>
                <div className="font-semibold text-[#292633] dark:text-white">Requisition Lifecycle</div>
                <div className="text-[11px] text-[#817984]">Create, edit and close job openings</div>
              </div>
              <span className="font-mono text-[#2E7D5B] dark:text-[#8AC9A7] font-bold">GRANTED</span>
            </div>

            <div className="p-2.5 bg-[#F8F7FB] dark:bg-slate-800/60 rounded-xl flex items-center justify-between border border-[#E9E6EF] dark:border-slate-750">
              <div>
                <div className="font-semibold text-[#292633] dark:text-white">Managerial Submission Vetting</div>
                <div className="text-[11px] text-[#817984]">Approve or reject candidate submissions</div>
              </div>
              <span className="font-mono font-bold text-xs">
                {selectedUser?.role === 'recruiter' ? (
                  <span className="text-[#817984]">VIEW ONLY</span>
                ) : (
                  <span className="text-[#2E7D5B] dark:text-[#8AC9A7]">GRANTED</span>
                )}
              </span>
            </div>

            <div className="p-2.5 bg-[#F8F7FB] dark:bg-slate-800/60 rounded-xl flex items-center justify-between border border-[#E9E6EF] dark:border-slate-750">
              <div>
                <div className="font-semibold text-[#292633] dark:text-white">Placement Margin Rates</div>
                <div className="text-[11px] text-[#817984]">View bill-pay spreads &amp; gross profitability</div>
              </div>
              <span className="font-mono font-bold text-xs">
                {selectedUser?.role === 'recruiter' ? (
                  <span className="text-rose-600 dark:text-rose-400">RESTRICTED</span>
                ) : (
                  <span className="text-[#2E7D5B] dark:text-[#8AC9A7]">GRANTED</span>
                )}
              </span>
            </div>

            <div className="p-2.5 bg-[#F8F7FB] dark:bg-slate-800/60 rounded-xl flex items-center justify-between border border-[#E9E6EF] dark:border-slate-750">
              <div>
                <div className="font-semibold text-[#292633] dark:text-white">Security &amp; Audit Logs</div>
                <div className="text-[11px] text-[#817984]">Access immutable platform compliance logs</div>
              </div>
              <span className="font-mono font-bold text-xs">
                {selectedUser?.role === 'super_admin' ? (
                  <span className="text-[#2E7D5B] dark:text-[#8AC9A7]">FULL ACCESS</span>
                ) : (
                  <span className="text-rose-600 dark:text-rose-400">RESTRICTED</span>
                )}
              </span>
            </div>
          </div>

          {/* Quick Impersonate Button */}
          <div className="pt-4 border-t border-[#E9E6EF] dark:border-slate-800">
            <button
              onClick={() => {
                if (selectedUser) {
                  loginAs(selectedUser.role);
                  showToast(`Switched active session to ${selectedUser.name}`);
                }
              }}
              className="w-full py-2 bg-[#FF8243] hover:bg-[#E96F30] text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow-xs"
            >
              <UserCheck className="w-4 h-4 text-white" />
              <span>Simulate Session as {selectedUser?.name}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
