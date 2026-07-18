'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  Crown,
  Users,
  DollarSign,
  CreditCard,
  Activity,
  Search,
  MoreHorizontal,
  Zap,
  Cpu,
  BarChart3,
  FileText,
  AlertTriangle,
  AlertCircle,
  Info,
  TrendingUp,
  TrendingDown,
  Eye,
  Pencil,
  Trash2,
  ChevronDown,
  Check,
  Power,
  Globe,
  Image,
  Video,
  RefreshCw,
  Calendar,
  ArrowUpRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type AdminTab = 'users' | 'credits' | 'models' | 'analytics' | 'logs';

const adminTabs: { id: AdminTab; label: string; icon: React.ReactNode }[] = [
  { id: 'users', label: 'Users', icon: <Users className="w-4 h-4" /> },
  { id: 'credits', label: 'Credits', icon: <Zap className="w-4 h-4" /> },
  { id: 'models', label: 'Models', icon: <Cpu className="w-4 h-4" /> },
  { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> },
  { id: 'logs', label: 'Logs', icon: <FileText className="w-4 h-4" /> },
];

const stats = [
  { label: 'Total Users', value: '12,847', change: '+12.5%', up: true, icon: <Users className="w-5 h-5" />, color: 'text-violet-400 bg-violet-500/10' },
  { label: 'Revenue', value: '$48,290', change: '+8.2%', up: true, icon: <DollarSign className="w-5 h-5" />, color: 'text-emerald-400 bg-emerald-500/10' },
  { label: 'Active Subscriptions', value: '3,421', change: '+5.1%', up: true, icon: <CreditCard className="w-5 h-5" />, color: 'text-cyan-400 bg-cyan-500/10' },
  { label: 'API Calls (24h)', value: '892K', change: '-2.3%', up: false, icon: <Activity className="w-5 h-5" />, color: 'text-amber-400 bg-amber-500/10' },
];

interface SampleUser {
  id: string;
  name: string;
  email: string;
  plan: 'free' | 'starter' | 'pro' | 'enterprise';
  credits: number;
  role: 'user' | 'admin';
  joinedAt: string;
  generations: number;
}

const sampleUsers: SampleUser[] = [
  { id: '1', name: 'Alex Creator', email: 'alex@draka.ai', plan: 'pro', credits: 2450, role: 'admin', joinedAt: '2024-01-15', generations: 847 },
  { id: '2', name: 'Sarah Designer', email: 'sarah@studio.co', plan: 'pro', credits: 1820, role: 'user', joinedAt: '2024-02-20', generations: 623 },
  { id: '3', name: 'Mike Engineer', email: 'mike@tech.io', plan: 'enterprise', credits: 5000, role: 'user', joinedAt: '2024-03-05', generations: 1204 },
  { id: '4', name: 'Lisa Analyst', email: 'lisa@data.com', plan: 'free', credits: 28, role: 'user', joinedAt: '2024-04-12', generations: 45 },
  { id: '5', name: 'Tom Writer', email: 'tom@content.co', plan: 'starter', credits: 340, role: 'user', joinedAt: '2024-05-08', generations: 192 },
  { id: '6', name: 'Emma Visual', email: 'emma@art.studio', plan: 'pro', credits: 980, role: 'user', joinedAt: '2024-05-22', generations: 510 },
  { id: '7', name: 'James Dev', email: 'james@dev.io', plan: 'enterprise', credits: 4200, role: 'admin', joinedAt: '2024-06-01', generations: 2100 },
  { id: '8', name: 'Olivia Brand', email: 'olivia@brand.co', plan: 'free', credits: 5, role: 'user', joinedAt: '2024-07-10', generations: 12 },
];

const aiModels = [
  { id: '1', name: 'Flux Pro v2.0', provider: 'Flux', type: 'text-to-image', status: true, calls: 245000, avgLatency: '2.1s', icon: <Image className="w-5 h-5" /> },
  { id: '2', name: 'Stability AI XL', provider: 'Stability', type: 'text-to-image', status: true, calls: 189000, avgLatency: '3.4s', icon: <Image className="w-5 h-5" /> },
  { id: '3', name: 'Kling AI v1.5', provider: 'Kling', type: 'text-to-video', status: true, calls: 78000, avgLatency: '12.5s', icon: <Video className="w-5 h-5" /> },
  { id: '4', name: 'Runway Gen-3', provider: 'Runway', type: 'text-to-video', status: false, calls: 45000, avgLatency: '15.2s', icon: <Video className="w-5 h-5" /> },
];

type LogLevel = 'error' | 'warning' | 'info';

interface LogEntry {
  id: string;
  timestamp: string;
  level: LogLevel;
  message: string;
  source: string;
}

const logLevelConfig: Record<LogLevel, { color: string; icon: React.ReactNode }> = {
  error: { color: 'text-red-400 bg-red-500/10 border-red-500/20', icon: <AlertCircle className="w-3 h-3" /> },
  warning: { color: 'text-amber-400 bg-amber-500/10 border-amber-500/20', icon: <AlertTriangle className="w-3 h-3" /> },
  info: { color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20', icon: <Info className="w-3 h-3" /> },
};

const sampleLogs: LogEntry[] = [
  { id: '1', timestamp: '2024-07-15 14:32:05', level: 'error', message: 'GPU memory exceeded on node gpu-03. Generation failed for user #4521.', source: 'generation-service' },
  { id: '2', timestamp: '2024-07-15 14:28:12', level: 'warning', message: 'Rate limit approaching for API key dk_live_****a4f2 (92% of hourly quota).', source: 'api-gateway' },
  { id: '3', timestamp: '2024-07-15 14:25:47', level: 'info', message: 'Model Flux Pro v2.0 warmup complete. Ready to serve requests.', source: 'model-manager' },
  { id: '4', timestamp: '2024-07-15 14:20:33', level: 'error', message: 'Payment webhook failed: Stripe timeout after 30s for invoice #INV-8842.', source: 'billing-service' },
  { id: '5', timestamp: '2024-07-15 14:15:19', level: 'info', message: 'Auto-scaling triggered: Scaling from 4 to 6 GPU instances.', source: 'orchestrator' },
  { id: '6', timestamp: '2024-07-15 14:10:05', level: 'warning', message: 'Stability AI API response time degraded. Average latency: 5.2s (threshold: 4s).', source: 'health-monitor' },
  { id: '7', timestamp: '2024-07-15 14:05:42', level: 'info', message: 'Daily backup completed successfully. 2.4TB stored to S3.', source: 'backup-service' },
  { id: '8', timestamp: '2024-07-15 14:00:18', level: 'error', message: 'CDN cache invalidation failed for region us-east-1. Retrying in 60s.', source: 'cdn-manager' },
  { id: '9', timestamp: '2024-07-15 13:55:30', level: 'warning', message: 'Credit balance sync discrepancy for 3 accounts. Queued for reconciliation.', source: 'billing-service' },
  { id: '10', timestamp: '2024-07-15 13:50:11', level: 'info', message: 'New user registration spike detected: 45 signups in last 15 minutes.', source: 'auth-service' },
];

const planColors: Record<string, string> = {
  free: 'text-white/50 bg-white/[0.05] border-white/[0.08]',
  starter: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  pro: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
  enterprise: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
};

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>('users');
  const [userSearch, setUserSearch] = useState('');
  const [adjustCreditsUserId, setAdjustCreditsUserId] = useState('');
  const [adjustCreditsAmount, setAdjustCreditsAmount] = useState('');
  const [modelStatuses, setModelStatuses] = useState<Record<string, boolean>>(
    Object.fromEntries(aiModels.map((m) => [m.id, m.status]))
  );

  const filteredUsers = sampleUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  const getInitials = (name: string) =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();

  return (
    <div className="min-h-screen p-6 lg:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-white/[0.08]">
            <Shield className="w-6 h-6 text-violet-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
              <span className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-full">
                <Crown className="w-3 h-3" />
                Admin
              </span>
            </div>
            <p className="text-sm text-white/40">Manage users, models, analytics, and system health</p>
          </div>
        </div>
      </motion.div>

      {/* Stats Dashboard */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8"
      >
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * idx + 0.15, duration: 0.4 }}
            className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-5 hover:border-white/[0.12] transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={cn('p-2 rounded-xl', stat.color)}>
                {stat.icon}
              </div>
              <span
                className={cn(
                  'flex items-center gap-1 text-xs font-medium',
                  stat.up ? 'text-emerald-400' : 'text-red-400'
                )}
              >
                {stat.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-0.5">{stat.value}</h3>
            <p className="text-xs text-white/40">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Tab Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="flex items-center gap-1 p-1.5 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl mb-8 overflow-x-auto"
      >
        {adminTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200',
              activeTab === tab.id
                ? 'bg-gradient-to-r from-violet-600/80 to-cyan-500/80 text-white shadow-lg shadow-violet-500/20'
                : 'text-white/50 hover:text-white/80 hover:bg-white/[0.05]'
            )}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </motion.div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {/* ===== USERS TAB ===== */}
          {activeTab === 'users' && (
            <div className="space-y-5">
              {/* Search */}
              <div className="relative max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-violet-500/50 transition-colors"
                />
              </div>

              {/* Users Table */}
              <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/[0.06]">
                        {['User', 'Plan', 'Credits', 'Generations', 'Role', 'Joined', 'Actions'].map((head) => (
                          <th key={head} className="text-left text-xs text-white/40 font-medium px-5 py-4">
                            {head}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.04]">
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500/30 to-cyan-500/30 border border-white/[0.1] flex items-center justify-center flex-shrink-0">
                                <span className="text-xs font-semibold text-white/80">
                                  {getInitials(user.name)}
                                </span>
                              </div>
                              <div>
                                <p className="text-sm text-white font-medium">{user.name}</p>
                                <p className="text-xs text-white/40">{user.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-4">
                            <span
                              className={cn(
                                'inline-flex items-center px-2.5 py-1 text-[11px] font-medium rounded-lg border capitalize',
                                planColors[user.plan]
                              )}
                            >
                              {user.plan}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-1.5 text-sm text-white/70">
                              <Zap className="w-3 h-3 text-amber-400" />
                              {user.credits.toLocaleString()}
                            </div>
                          </td>
                          <td className="px-5 py-4 text-sm text-white/50">{user.generations.toLocaleString()}</td>
                          <td className="px-5 py-4">
                            <span
                              className={cn(
                                'inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium rounded-lg border capitalize',
                                user.role === 'admin'
                                  ? 'text-amber-400 bg-amber-500/10 border-amber-500/20'
                                  : 'text-white/50 bg-white/[0.05] border-white/[0.08]'
                              )}
                            >
                              {user.role === 'admin' && <Crown className="w-3 h-3" />}
                              {user.role}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-sm text-white/40">
                            {new Date(user.joinedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </td>
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-1">
                              <button className="p-1.5 text-white/30 hover:text-white hover:bg-white/[0.05] rounded-lg transition-colors" title="View">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="p-1.5 text-white/30 hover:text-violet-400 hover:bg-violet-500/10 rounded-lg transition-colors" title="Edit">
                                <Pencil className="w-4 h-4" />
                              </button>
                              <button className="p-1.5 text-white/30 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors" title="Delete">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ===== CREDITS TAB ===== */}
          {activeTab === 'credits' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Credit Distribution */}
              <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6">
                <h3 className="text-white font-semibold mb-5">Credit Distribution by Plan</h3>
                <div className="space-y-5">
                  {[
                    { plan: 'Enterprise', users: 245, totalCredits: 1225000, color: 'bg-amber-500', pct: 85 },
                    { plan: 'Pro', users: 1840, totalCredits: 4600000, color: 'bg-violet-500', pct: 65 },
                    { plan: 'Starter', users: 3200, totalCredits: 1600000, color: 'bg-emerald-500', pct: 40 },
                    { plan: 'Free', users: 7562, totalCredits: 378100, color: 'bg-white/30', pct: 15 },
                  ].map((item) => (
                    <div key={item.plan}>
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <span className="text-sm text-white font-medium">{item.plan}</span>
                          <span className="text-xs text-white/40 ml-2">{item.users.toLocaleString()} users</span>
                        </div>
                        <span className="text-xs text-white/50">
                          {(item.totalCredits / 1000).toFixed(0)}K credits
                        </span>
                      </div>
                      <div className="h-3 bg-white/[0.05] rounded-full overflow-hidden">
                        <div
                          className={cn('h-full rounded-full transition-all duration-700', item.color)}
                          style={{ width: `${item.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Adjust Credits */}
              <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6">
                <h3 className="text-white font-semibold mb-5">Adjust User Credits</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-white/60 mb-2">User ID or Email</label>
                    <input
                      type="text"
                      placeholder="Enter user email..."
                      value={adjustCreditsUserId}
                      onChange={(e) => setAdjustCreditsUserId(e.target.value)}
                      className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-violet-500/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Credit Amount</label>
                    <input
                      type="number"
                      placeholder="e.g. 500 or -100"
                      value={adjustCreditsAmount}
                      onChange={(e) => setAdjustCreditsAmount(e.target.value)}
                      className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-violet-500/50 transition-colors"
                    />
                    <p className="text-xs text-white/30 mt-1">Use negative numbers to deduct credits</p>
                  </div>
                  <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white text-sm font-medium transition-all duration-300 hover:scale-[1.02]">
                    <Zap className="w-4 h-4" />
                    Apply Credits
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ===== MODELS TAB ===== */}
          {activeTab === 'models' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {aiModels.map((model) => (
                <div
                  key={model.id}
                  className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6 hover:border-white/[0.12] transition-colors"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-white/[0.08]">
                        {model.icon}
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">{model.name}</h3>
                        <p className="text-xs text-white/40">{model.provider} · {model.type}</p>
                      </div>
                    </div>

                    {/* Status Toggle */}
                    <button
                      onClick={() =>
                        setModelStatuses((prev) => ({
                          ...prev,
                          [model.id]: !prev[model.id],
                        }))
                      }
                      className={cn(
                        'relative w-12 h-7 rounded-full transition-colors duration-200',
                        modelStatuses[model.id] ? 'bg-emerald-500' : 'bg-white/[0.1]'
                      )}
                    >
                      <div
                        className={cn(
                          'absolute top-1 w-5 h-5 rounded-full bg-white transition-transform duration-200',
                          modelStatuses[model.id] ? 'translate-x-6' : 'translate-x-1'
                        )}
                      />
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-4 p-4 bg-white/[0.02] rounded-xl">
                    <div>
                      <p className="text-xs text-white/40 mb-1">API Calls</p>
                      <p className="text-sm text-white font-medium">{(model.calls / 1000).toFixed(0)}K</p>
                    </div>
                    <div>
                      <p className="text-xs text-white/40 mb-1">Avg Latency</p>
                      <p className="text-sm text-white font-medium">{model.avgLatency}</p>
                    </div>
                    <div>
                      <p className="text-xs text-white/40 mb-1">Status</p>
                      <p className={cn('text-sm font-medium', modelStatuses[model.id] ? 'text-emerald-400' : 'text-red-400')}>
                        {modelStatuses[model.id] ? 'Active' : 'Disabled'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ===== ANALYTICS TAB ===== */}
          {activeTab === 'analytics' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Revenue */}
              <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold">Revenue</h3>
                  <span className="flex items-center gap-1 text-xs text-emerald-400">
                    <TrendingUp className="w-3 h-3" />
                    +12.5%
                  </span>
                </div>
                <p className="text-3xl font-bold text-white mb-5">$48,290</p>
                <div className="space-y-3">
                  {[
                    { month: 'Jul', value: 48290, pct: 95 },
                    { month: 'Jun', value: 42890, pct: 85 },
                    { month: 'May', value: 38450, pct: 76 },
                    { month: 'Apr', value: 35120, pct: 69 },
                    { month: 'Mar', value: 31800, pct: 63 },
                  ].map((item) => (
                    <div key={item.month} className="flex items-center gap-3">
                      <span className="text-xs text-white/40 w-8">{item.month}</span>
                      <div className="flex-1 h-2 bg-white/[0.05] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
                          style={{ width: `${item.pct}%` }}
                        />
                      </div>
                      <span className="text-xs text-white/50 w-16 text-right">${(item.value / 1000).toFixed(1)}K</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* User Growth */}
              <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold">User Growth</h3>
                  <span className="flex items-center gap-1 text-xs text-violet-400">
                    <TrendingUp className="w-3 h-3" />
                    +8.2%
                  </span>
                </div>
                <p className="text-3xl font-bold text-white mb-5">12,847</p>
                <div className="space-y-3">
                  {[
                    { month: 'Jul', value: 12847, pct: 100 },
                    { month: 'Jun', value: 11870, pct: 92 },
                    { month: 'May', value: 10540, pct: 82 },
                    { month: 'Apr', value: 9200, pct: 72 },
                    { month: 'Mar', value: 8100, pct: 63 },
                  ].map((item) => (
                    <div key={item.month} className="flex items-center gap-3">
                      <span className="text-xs text-white/40 w-8">{item.month}</span>
                      <div className="flex-1 h-2 bg-white/[0.05] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-400"
                          style={{ width: `${item.pct}%` }}
                        />
                      </div>
                      <span className="text-xs text-white/50 w-16 text-right">{(item.value / 1000).toFixed(1)}K</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Generation Stats */}
              <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold">Generations</h3>
                  <span className="flex items-center gap-1 text-xs text-cyan-400">
                    <TrendingUp className="w-3 h-3" />
                    +15.3%
                  </span>
                </div>
                <p className="text-3xl font-bold text-white mb-5">892K</p>
                <div className="space-y-3">
                  {[
                    { month: 'Jul', value: 892000, pct: 98 },
                    { month: 'Jun', value: 773000, pct: 85 },
                    { month: 'May', value: 691000, pct: 76 },
                    { month: 'Apr', value: 580000, pct: 64 },
                    { month: 'Mar', value: 512000, pct: 56 },
                  ].map((item) => (
                    <div key={item.month} className="flex items-center gap-3">
                      <span className="text-xs text-white/40 w-8">{item.month}</span>
                      <div className="flex-1 h-2 bg-white/[0.05] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-400"
                          style={{ width: `${item.pct}%` }}
                        />
                      </div>
                      <span className="text-xs text-white/50 w-16 text-right">{(item.value / 1000).toFixed(0)}K</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ===== LOGS TAB ===== */}
          {activeTab === 'logs' && (
            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
                <h3 className="text-white font-semibold">System Logs</h3>
                <button className="flex items-center gap-2 px-3 py-1.5 text-xs text-white/50 hover:text-white bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.08] rounded-lg transition-colors">
                  <RefreshCw className="w-3 h-3" />
                  Refresh
                </button>
              </div>

              <div className="divide-y divide-white/[0.04]">
                {sampleLogs.map((log, idx) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.03 * idx, duration: 0.3 }}
                    className="flex items-start gap-4 p-4 hover:bg-white/[0.02] transition-colors"
                  >
                    <span className="text-xs text-white/30 font-mono whitespace-nowrap mt-0.5 hidden md:block">
                      {log.timestamp}
                    </span>
                    <span
                      className={cn(
                        'inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium rounded-lg border whitespace-nowrap mt-0.5',
                        logLevelConfig[log.level].color
                      )}
                    >
                      {logLevelConfig[log.level].icon}
                      {log.level.charAt(0).toUpperCase() + log.level.slice(1)}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white/70 leading-relaxed">{log.message}</p>
                      <p className="text-xs text-white/30 mt-1 font-mono">{log.source}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
