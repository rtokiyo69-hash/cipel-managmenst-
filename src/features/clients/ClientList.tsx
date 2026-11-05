import React, { useState, useEffect } from 'react';
import {
  Building2,
  Search,
  Plus,
  Mail,
  Phone,
  Briefcase,
  Award,
  CheckCircle,
  X,
  ExternalLink,
  MapPin
} from 'lucide-react';
import { useAppStore } from '../../store/appStore';
import { ApiService } from '../../services/api';
import { Client } from '../../types';

export const ClientList: React.FC = () => {
  const { navigate } = useAppStore();
  const [clients, setClients] = useState<Client[]>([]);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [industry, setIndustry] = useState('Cloud Infrastructure & SaaS');
  const [location, setLocation] = useState('San Jose, CA');
  const [contactPerson, setContactPerson] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [tier, setTier] = useState<Client['tier']>('Enterprise Platinum');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    ApiService.getClients().then(setClients);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCreateClient = async (e: React.FormEvent) => {
    e.preventDefault();
    const created = await ApiService.createClient({
      name,
      industry,
      location,
      contactPerson,
      contactEmail,
      contactPhone,
      accountManager: 'Rajesh Ramanathan',
      activeJobs: 1,
      activePlacements: 0,
      status: 'Active',
      tier
    });
    setClients([created, ...clients]);
    setModalOpen(false);
    showToast(`Enterprise client "${created.name}" created successfully.`);
  };

  const filtered = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.industry.toLowerCase().includes(search.toLowerCase()) ||
      c.location.toLowerCase().includes(search.toLowerCase())
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
            Enterprise Client Accounts
          </h1>
          <p className="text-xs text-[#817984]">
            Manage client billing SLAs, open requisitions, account managers, and placements
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 bg-[#FF8243] hover:bg-[#E96F30] text-white rounded-xl text-xs font-semibold shadow-xs shadow-[#FF8243]/30 transition-all flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add Enterprise Client</span>
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
            placeholder="Search enterprise clients, industries, headquarters..."
            className="w-full pl-10 pr-4 py-2 bg-[#F8F7FB] dark:bg-slate-800/80 border border-[#E9E6EF] dark:border-slate-700 rounded-xl text-xs text-[#292633] dark:text-white focus:outline-none focus:border-[#6941C6] focus:ring-1 focus:ring-[#6941C6]"
          />
        </div>
      </div>

      {/* Client Cards Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filtered.map((c) => (
          <div
            key={c.id}
            className="p-6 bg-white dark:bg-[#1E1B29] border border-[#E9E6EF] dark:border-slate-800 rounded-2xl shadow-xs space-y-4 hover:border-[#6941C6] dark:hover:border-[#6941C6] transition-all"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-mono text-[#6941C6] dark:text-[#A888EC] font-semibold">{c.clientId}</div>
                <h3 className="text-base font-bold text-[#292633] dark:text-white mt-0.5">
                  {c.name}
                </h3>
                <div className="text-xs text-[#817984]">{c.industry}</div>
              </div>

              <span className="px-2.5 py-1 bg-[#F1EBFA] dark:bg-[#6941C6]/20 border border-[#E9E6EF] dark:border-[#6941C6]/30 text-[#6941C6] dark:text-[#D1C5E4] rounded-lg text-[11px] font-mono font-medium">
                {c.tier}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 text-xs border-t border-[#E9E6EF] dark:border-slate-800">
              <div className="flex items-center gap-2 text-[#817984]">
                <MapPin className="w-3.5 h-3.5 text-[#6941C6]" />
                <span className="truncate">{c.location}</span>
              </div>
              <div className="flex items-center gap-2 text-[#817984]">
                <Mail className="w-3.5 h-3.5 text-[#FF8243]" />
                <span className="truncate">{c.contactEmail}</span>
              </div>
            </div>

            {/* Performance Strip */}
            <div className="p-3 bg-[#F8F7FB] dark:bg-slate-800/60 rounded-xl flex items-center justify-between text-xs border border-[#E9E6EF] dark:border-slate-750">
              <div className="flex items-center gap-1.5 text-[#292633] dark:text-slate-200">
                <Briefcase className="w-3.5 h-3.5 text-[#6941C6]" />
                <span className="font-bold font-mono text-[#6941C6] dark:text-[#A888EC]">{c.activeJobs}</span> Open Requisitions
              </div>
              <div className="flex items-center gap-1.5 text-[#2E7D5B] dark:text-[#8AC9A7]">
                <Award className="w-3.5 h-3.5 text-[#8AC9A7]" />
                <span className="font-bold font-mono text-[#2E7D5B] dark:text-[#8AC9A7]">{c.activePlacements}</span> Active Placements
              </div>
            </div>

            <div className="pt-1 flex items-center justify-between text-xs">
              <span className="text-[#817984]">Lead: {c.accountManager}</span>
              <button
                onClick={() => navigate('jobs')}
                className="text-[#6941C6] hover:text-[#402568] dark:text-[#A888EC] dark:hover:text-white font-semibold transition-colors"
              >
                View Requisitions →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Client Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white dark:bg-[#1E1B29] border border-[#E9E6EF] dark:border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#292633] dark:text-white">
                Register Enterprise Client
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-[#817984] hover:text-[#292633] dark:hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateClient} className="space-y-3 text-xs">
              <div>
                <label className="block text-[#292633] dark:text-slate-400 mb-1 font-medium">Client Legal Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Apex Global Systems Inc."
                  className="w-full px-3 py-2 bg-[#F8F7FB] dark:bg-slate-800 border border-[#E9E6EF] dark:border-slate-700 rounded-xl text-[#292633] dark:text-white focus:outline-none focus:border-[#6941C6] focus:ring-1 focus:ring-[#6941C6]"
                />
              </div>

              <div>
                <label className="block text-[#292633] dark:text-slate-400 mb-1 font-medium">Industry Domain</label>
                <input
                  type="text"
                  required
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F8F7FB] dark:bg-slate-800 border border-[#E9E6EF] dark:border-slate-700 rounded-xl text-[#292633] dark:text-white focus:outline-none focus:border-[#6941C6] focus:ring-1 focus:ring-[#6941C6]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#292633] dark:text-slate-400 mb-1 font-medium">Contact Person</label>
                  <input
                    type="text"
                    required
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    placeholder="David Vance"
                    className="w-full px-3 py-2 bg-[#F8F7FB] dark:bg-slate-800 border border-[#E9E6EF] dark:border-slate-700 rounded-xl text-[#292633] dark:text-white focus:outline-none focus:border-[#6941C6] focus:ring-1 focus:ring-[#6941C6]"
                  />
                </div>

                <div>
                  <label className="block text-[#292633] dark:text-slate-400 mb-1 font-medium">SLA Partnership Tier</label>
                  <select
                    value={tier}
                    onChange={(e) => setTier(e.target.value as Client['tier'])}
                    className="w-full px-3 py-2 bg-[#F8F7FB] dark:bg-slate-800 border border-[#E9E6EF] dark:border-slate-700 rounded-xl text-[#292633] dark:text-white focus:outline-none focus:border-[#6941C6]"
                  >
                    <option value="Enterprise Platinum">Enterprise Platinum</option>
                    <option value="Strategic Partner">Strategic Partner</option>
                    <option value="Standard">Standard</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#292633] dark:text-slate-400 mb-1 font-medium">Contact Email</label>
                <input
                  type="email"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="contact@company.com"
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
                  Register Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
