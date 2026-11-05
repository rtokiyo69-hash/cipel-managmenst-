import React, { useState, useEffect } from 'react';
import {
  Layers,
  Search,
  Plus,
  ShieldCheck,
  Star,
  Users,
  CheckCircle,
  AlertTriangle,
  X,
  Mail,
  Phone
} from 'lucide-react';
import { useAppStore } from '../../store/appStore';
import { ApiService } from '../../services/api';
import { Vendor } from '../../types';

export const VendorList: React.FC = () => {
  const { navigate } = useAppStore();
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Specialized Cloud & AI Talent');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    ApiService.getVendors().then(setVendors);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCreateVendor = async (e: React.FormEvent) => {
    e.preventDefault();
    const created = await ApiService.createVendor({
      name,
      category,
      contactPerson,
      email,
      phone,
      complianceStatus: 'Verified',
      rating: 4.5,
      activeCandidates: 0,
      status: 'Active'
    });
    setVendors([created, ...vendors]);
    setModalOpen(false);
    showToast(`Staffing agency "${created.name}" onboarded into VMS network.`);
  };

  const filtered = vendors.filter(
    (v) =>
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.category.toLowerCase().includes(search.toLowerCase()) ||
      v.contactPerson.toLowerCase().includes(search.toLowerCase())
  );

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-display font-bold text-[#292633] dark:text-white">
            Vendor Management (VMS)
          </h1>
          <p className="text-xs text-[#817984]">
            Manage external staffing suppliers, compliance certifications, MSA contracts, and candidate pools
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 bg-[#FF8243] hover:bg-[#E96F30] text-white rounded-xl text-xs font-semibold shadow-xs shadow-[#FF8243]/30 transition-all flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Onboard Staffing Vendor</span>
        </button>
      </div>

      {/* Search */}
      <div className="p-4 bg-white dark:bg-[#1E1B29] border border-[#E9E6EF] dark:border-slate-800 rounded-2xl shadow-xs">
        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#817984]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search vendor name, recruitment specialty, contact..."
            className="w-full pl-10 pr-4 py-2 bg-[#F8F7FB] dark:bg-slate-800/80 border border-[#E9E6EF] dark:border-slate-700 rounded-xl text-xs text-[#292633] dark:text-white focus:outline-none focus:border-[#6941C6] focus:ring-1 focus:ring-[#6941C6]"
          />
        </div>
      </div>

      {/* Vendors Table */}
      <div className="bg-white dark:bg-[#1E1B29] border border-[#E9E6EF] dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F8F7FB] dark:bg-slate-800/60 border-b border-[#E9E6EF] dark:border-slate-800 text-[#817984] dark:text-slate-400">
                <th className="p-3.5 font-semibold">Vendor ID &amp; Agency Name</th>
                <th className="p-3.5 font-semibold">Specialty Category</th>
                <th className="p-3.5 font-semibold">Primary Contact</th>
                <th className="p-3.5 font-semibold">Compliance Audit</th>
                <th className="p-3.5 font-semibold">Quality Rating</th>
                <th className="p-3.5 font-semibold">Active Pool</th>
                <th className="p-3.5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E9E6EF] dark:divide-slate-800">
              {filtered.map((v) => (
                <tr
                  key={v.id}
                  className="hover:bg-[#F1EBFA]/50 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <td className="p-3.5">
                    <div className="font-bold text-[#292633] dark:text-white">{v.name}</div>
                    <div className="font-mono text-[11px] text-[#6941C6] dark:text-[#A888EC]">{v.vendorId}</div>
                  </td>

                  <td className="p-3.5 text-[#292633] dark:text-slate-300">{v.category}</td>

                  <td className="p-3.5">
                    <div className="font-medium text-[#292633] dark:text-white">{v.contactPerson}</div>
                    <div className="text-[11px] text-[#817984]">{v.email}</div>
                  </td>

                  <td className="p-3.5">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-medium border ${
                        v.complianceStatus === 'Verified'
                          ? 'bg-[#8AC9A7]/15 text-[#2E7D5B] border-[#8AC9A7]/30 dark:bg-[#8AC9A7]/20 dark:text-[#8AC9A7]'
                          : 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
                      }`}
                    >
                      {v.complianceStatus === 'Verified' ? (
                        <ShieldCheck className="w-3.5 h-3.5 text-[#8AC9A7]" />
                      ) : (
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                      )}
                      <span>{v.complianceStatus}</span>
                    </span>
                  </td>

                  <td className="p-3.5 font-mono">
                    <span className="flex items-center gap-1 text-[#FF8243] font-bold">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{v.rating}</span>
                    </span>
                  </td>

                  <td className="p-3.5 font-mono font-bold text-[#292633] dark:text-white tabular-nums">
                    {v.activeCandidates} Candidates
                  </td>

                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => showToast(`Vendor agreement & compliance certificate verified for ${v.name}`)}
                      className="px-2.5 py-1 text-xs text-[#6941C6] hover:text-[#402568] dark:text-[#A888EC] dark:hover:text-white hover:bg-[#F1EBFA] dark:hover:bg-[#6941C6]/20 rounded-lg transition-colors font-semibold"
                    >
                      Audit MSA →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Onboard Vendor Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white dark:bg-[#1E1B29] border border-[#E9E6EF] dark:border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#292633] dark:text-white">
                Onboard Staffing Partner Agency
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-[#817984] hover:text-[#292633] dark:hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateVendor} className="space-y-3 text-xs">
              <div>
                <label className="block text-[#292633] dark:text-slate-400 mb-1 font-medium">Agency Legal Entity Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Apex Global Talent Ltd."
                  className="w-full px-3 py-2 bg-[#F8F7FB] dark:bg-slate-800 border border-[#E9E6EF] dark:border-slate-700 rounded-xl text-[#292633] dark:text-white focus:outline-none focus:border-[#6941C6] focus:ring-1 focus:ring-[#6941C6]"
                />
              </div>

              <div>
                <label className="block text-[#292633] dark:text-slate-400 mb-1 font-medium">Recruitment Specialty</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F8F7FB] dark:bg-slate-800 border border-[#E9E6EF] dark:border-slate-700 rounded-xl text-[#292633] dark:text-white focus:outline-none focus:border-[#6941C6]"
                >
                  <option value="Specialized Cloud & AI Talent">Specialized Cloud &amp; AI Talent</option>
                  <option value="Tier-1 IT Staffing & Sourcing">Tier-1 IT Staffing &amp; Sourcing</option>
                  <option value="Contract Sourcing & Offshore Labs">Contract Sourcing &amp; Offshore Labs</option>
                  <option value="Executive Search & C-Suite">Executive Search &amp; C-Suite</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#292633] dark:text-slate-400 mb-1 font-medium">Partner Lead Contact</label>
                  <input
                    type="text"
                    required
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    placeholder="Arun Mehra"
                    className="w-full px-3 py-2 bg-[#F8F7FB] dark:bg-slate-800 border border-[#E9E6EF] dark:border-slate-700 rounded-xl text-[#292633] dark:text-white focus:outline-none focus:border-[#6941C6] focus:ring-1 focus:ring-[#6941C6]"
                  />
                </div>

                <div>
                  <label className="block text-[#292633] dark:text-slate-400 mb-1 font-medium">Contact Phone</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    className="w-full px-3 py-2 bg-[#F8F7FB] dark:bg-slate-800 border border-[#E9E6EF] dark:border-slate-700 rounded-xl text-[#292633] dark:text-white focus:outline-none focus:border-[#6941C6] focus:ring-1 focus:ring-[#6941C6]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#292633] dark:text-slate-400 mb-1 font-medium">Contact Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="partner@agency.com"
                  className="w-full px-3 py-2 bg-[#F8F7FB] dark:bg-slate-800 border border-[#E9E6EF] dark:border-slate-700 rounded-xl text-[#292633] dark:text-white focus:outline-none focus:border-[#6941C6] focus:ring-1 focus:ring-[#6941C6]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-3.5 py-2 border border-[#E9E6EF] dark:border-slate-700 text-[#817984] hover:text-[#292633] dark:text-slate-300 rounded-xl hover:bg-[#F8F7FB] dark:hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#FF8243] hover:bg-[#E96F30] text-white font-semibold rounded-xl shadow-xs transition-colors"
                >
                  Confirm &amp; Audit MSA
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
