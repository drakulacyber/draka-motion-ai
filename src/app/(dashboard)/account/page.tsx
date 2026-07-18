'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings,
  User,
  CreditCard,
  Zap,
  Key,
  Shield,
  SlidersHorizontal,
  Camera,
  Save,
  Copy,
  Trash2,
  Eye,
  EyeOff,
  Plus,
  Check,
  Crown,
  Infinity,
  Star,
  Globe,
  Moon,
  Sun,
  Bell,
  BellOff,
  Cpu,
  Sparkles,
  LogOut,
  Monitor,
  Smartphone,
  AlertTriangle,
  Lock,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type AccountTab = 'profile' | 'subscription' | 'credits' | 'api-keys' | 'security' | 'preferences';

const tabs: { id: AccountTab; label: string; icon: React.ReactNode }[] = [
  { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
  { id: 'subscription', label: 'Subscription', icon: <CreditCard className="w-4 h-4" /> },
  { id: 'credits', label: 'Credits', icon: <Zap className="w-4 h-4" /> },
  { id: 'api-keys', label: 'API Keys', icon: <Key className="w-4 h-4" /> },
  { id: 'security', label: 'Security', icon: <Shield className="w-4 h-4" /> },
  { id: 'preferences', label: 'Preferences', icon: <SlidersHorizontal className="w-4 h-4" /> },
];

const creditHistory = [
  { date: '2024-07-15', action: 'Image Generation (x4)', amount: -20, balance: 2450 },
  { date: '2024-07-14', action: 'Monthly Credit Refill', amount: +500, balance: 2470 },
  { date: '2024-07-13', action: 'Video Generation', amount: -50, balance: 1970 },
  { date: '2024-07-12', action: 'Image Upscale (x2)', amount: -10, balance: 2020 },
  { date: '2024-07-10', action: 'Credits Purchase', amount: +1000, balance: 2030 },
];

const apiKeys = [
  { id: '1', name: 'Production Key', key: 'dk_live_••••••••••••a4f2', created: '2024-03-15', lastUsed: '2 hours ago', calls: 12840 },
  { id: '2', name: 'Development Key', key: 'dk_test_••••••••••••b7e1', created: '2024-05-20', lastUsed: '1 day ago', calls: 4520 },
  { id: '3', name: 'Staging Key', key: 'dk_stg_••••••••••••c9d3', created: '2024-06-01', lastUsed: '3 days ago', calls: 890 },
];

const sessions = [
  { id: '1', device: 'Chrome on Windows', icon: <Monitor className="w-4 h-4" />, location: 'San Francisco, CA', lastActive: 'Active now', current: true },
  { id: '2', device: 'Safari on iPhone', icon: <Smartphone className="w-4 h-4" />, location: 'San Francisco, CA', lastActive: '3 hours ago', current: false },
  { id: '3', device: 'Firefox on MacOS', icon: <Monitor className="w-4 h-4" />, location: 'New York, NY', lastActive: '2 days ago', current: false },
];

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    features: ['50 credits/month', '512x512 resolution', 'Basic models', 'Community support'],
    cta: 'Current Plan',
    current: false,
    popular: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/month',
    features: ['2,500 credits/month', 'Up to 4K resolution', 'All AI models', 'Priority support', 'API access', 'Team collaboration'],
    cta: 'Current Plan',
    current: true,
    popular: true,
  },
  {
    name: 'Enterprise',
    price: '$99',
    period: '/month',
    features: ['Unlimited credits', '8K resolution', 'Custom models', 'Dedicated support', 'SSO & SAML', 'SLA guarantee', 'White-label'],
    cta: 'Upgrade',
    current: false,
    popular: false,
  },
];

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<AccountTab>('profile');
  const [profileName, setProfileName] = useState('Alex Creator');
  const [profileBio, setProfileBio] = useState('AI enthusiast and creative director. Building the future of visual content.');
  const [twoFactor, setTwoFactor] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [language, setLanguage] = useState('en');
  const [defaultModel, setDefaultModel] = useState('flux-pro');
  const [defaultQuality, setDefaultQuality] = useState('high');
  const [notifications, setNotifications] = useState({
    generations: true,
    credits: true,
    updates: false,
    marketing: false,
  });
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopyKey = (keyId: string) => {
    setCopiedKey(keyId);
    setTimeout(() => setCopiedKey(null), 2000);
  };

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
            <Settings className="w-6 h-6 text-violet-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Account Settings</h1>
            <p className="text-sm text-white/40">Manage your account, billing, and preferences</p>
          </div>
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="flex items-center gap-1 p-1.5 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl mb-8 overflow-x-auto"
      >
        {tabs.map((tab) => (
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
          {/* ===== PROFILE TAB ===== */}
          {activeTab === 'profile' && (
            <div className="max-w-2xl space-y-6">
              {/* Avatar */}
              <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6">
                <h2 className="text-white font-semibold mb-4">Profile Photo</h2>
                <div className="flex items-center gap-6">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-500 p-[2px]">
                      <div className="w-full h-full rounded-full bg-[#0a0a0f] flex items-center justify-center">
                        <span className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                          AC
                        </span>
                      </div>
                    </div>
                    <button className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Camera className="w-6 h-6 text-white" />
                    </button>
                  </div>
                  <div>
                    <button className="px-4 py-2 text-sm text-white/70 hover:text-white bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.1] rounded-xl transition-colors">
                      Upload Photo
                    </button>
                    <p className="text-xs text-white/30 mt-2">JPG, PNG or GIF. Max 2MB</p>
                  </div>
                </div>
              </div>

              {/* Profile Form */}
              <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6 space-y-5">
                <h2 className="text-white font-semibold mb-2">Profile Information</h2>

                <div>
                  <label className="block text-sm text-white/60 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-violet-500/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-2">Email Address</label>
                  <input
                    type="email"
                    value="creator@draka.ai"
                    disabled
                    className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-sm text-white/40 cursor-not-allowed"
                  />
                  <p className="text-xs text-white/30 mt-1">Contact support to change your email</p>
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-2">Bio</label>
                  <textarea
                    value={profileBio}
                    onChange={(e) => setProfileBio(e.target.value)}
                    rows={3}
                    className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-violet-500/50 transition-colors resize-none"
                  />
                </div>

                <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white text-sm font-medium transition-all duration-300 hover:scale-[1.02]">
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* ===== SUBSCRIPTION TAB ===== */}
          {activeTab === 'subscription' && (
            <div className="space-y-8">
              {/* Current Plan */}
              <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20">
                      <Crown className="w-5 h-5 text-violet-400" />
                    </div>
                    <div>
                      <h2 className="text-white font-semibold">Pro Plan</h2>
                      <p className="text-xs text-white/40">Your current subscription</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                    Active
                  </span>
                </div>
                <div className="flex flex-wrap gap-3 mb-5">
                  {['2,500 credits/month', '4K resolution', 'All models', 'API access'].map((feature) => (
                    <span
                      key={feature}
                      className="flex items-center gap-1.5 text-xs text-white/60 bg-white/[0.05] px-3 py-1.5 rounded-lg"
                    >
                      <Check className="w-3 h-3 text-emerald-400" />
                      {feature}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <button className="px-5 py-2.5 text-sm text-white/70 hover:text-white bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.1] rounded-xl transition-colors">
                    Manage Subscription
                  </button>
                  <span className="text-xs text-white/30">Next billing: Aug 15, 2024</span>
                </div>
              </div>

              {/* Plan Comparison */}
              <div>
                <h2 className="text-lg font-semibold text-white mb-5">Compare Plans</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {plans.map((plan) => (
                    <div
                      key={plan.name}
                      className={cn(
                        'relative bg-white/[0.03] backdrop-blur-xl border rounded-2xl p-6 transition-all duration-300 hover:border-white/[0.15]',
                        plan.popular
                          ? 'border-violet-500/30 ring-1 ring-violet-500/20'
                          : 'border-white/[0.08]'
                      )}
                    >
                      {plan.popular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-medium text-white bg-gradient-to-r from-violet-600 to-cyan-500 rounded-full">
                          Most Popular
                        </div>
                      )}
                      <h3 className="text-white font-semibold text-lg mb-1">{plan.name}</h3>
                      <div className="flex items-baseline gap-1 mb-5">
                        <span className="text-3xl font-bold text-white">{plan.price}</span>
                        <span className="text-sm text-white/40">{plan.period}</span>
                      </div>
                      <ul className="space-y-3 mb-6">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-sm text-white/60">
                            <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <button
                        className={cn(
                          'w-full py-3 rounded-xl text-sm font-medium transition-all duration-300',
                          plan.current
                            ? 'bg-white/[0.05] border border-white/[0.1] text-white/50 cursor-default'
                            : plan.name === 'Enterprise'
                            ? 'bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white hover:scale-[1.02]'
                            : 'bg-white/[0.05] border border-white/[0.1] text-white hover:bg-white/[0.08]'
                        )}
                      >
                        {plan.cta}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ===== CREDITS TAB ===== */}
          {activeTab === 'credits' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Balance */}
                <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6">
                  <div className="flex items-center gap-2 text-white/60 text-sm mb-3">
                    <Zap className="w-4 h-4 text-amber-400" />
                    Credit Balance
                  </div>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-5xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                      2,450
                    </span>
                    <span className="text-white/40 text-sm">credits</span>
                  </div>
                  <button className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white text-sm font-medium transition-all duration-300 hover:scale-[1.02]">
                    <Plus className="w-4 h-4" />
                    Buy Credits
                  </button>
                </div>

                {/* Usage Chart Placeholder */}
                <div className="lg:col-span-2 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6">
                  <h3 className="text-white font-semibold mb-4">Usage This Month</h3>
                  <div className="space-y-4">
                    {[
                      { label: 'Image Generation', amount: 340, total: 500, color: 'bg-violet-500' },
                      { label: 'Video Generation', amount: 120, total: 500, color: 'bg-cyan-500' },
                      { label: 'Upscaling', amount: 45, total: 500, color: 'bg-emerald-500' },
                      { label: 'Other', amount: 15, total: 500, color: 'bg-amber-500' },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-sm text-white/60">{item.label}</span>
                          <span className="text-xs text-white/40">{item.amount} credits</span>
                        </div>
                        <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden">
                          <div
                            className={cn('h-full rounded-full transition-all duration-700', item.color)}
                            style={{ width: `${(item.amount / item.total) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Credit History */}
              <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl overflow-hidden">
                <div className="p-5 border-b border-white/[0.06]">
                  <h3 className="text-white font-semibold">Credit History</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/[0.04]">
                        <th className="text-left text-xs text-white/40 font-medium px-5 py-3">Date</th>
                        <th className="text-left text-xs text-white/40 font-medium px-5 py-3">Action</th>
                        <th className="text-right text-xs text-white/40 font-medium px-5 py-3">Amount</th>
                        <th className="text-right text-xs text-white/40 font-medium px-5 py-3">Balance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.04]">
                      {creditHistory.map((entry, idx) => (
                        <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                          <td className="px-5 py-3 text-sm text-white/50">
                            {new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </td>
                          <td className="px-5 py-3 text-sm text-white/70">{entry.action}</td>
                          <td
                            className={cn(
                              'px-5 py-3 text-sm text-right font-medium',
                              entry.amount > 0 ? 'text-emerald-400' : 'text-red-400'
                            )}
                          >
                            {entry.amount > 0 ? '+' : ''}{entry.amount}
                          </td>
                          <td className="px-5 py-3 text-sm text-white/50 text-right">{entry.balance.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ===== API KEYS TAB ===== */}
          {activeTab === 'api-keys' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-white/50">Manage your API keys for programmatic access.</p>
                <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white text-sm font-medium transition-all duration-300 hover:scale-[1.02]">
                  <Plus className="w-4 h-4" />
                  Generate New Key
                </button>
              </div>

              <div className="space-y-4">
                {apiKeys.map((apiKey) => (
                  <div
                    key={apiKey.id}
                    className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-5 hover:border-white/[0.12] transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-white/[0.05]">
                          <Key className="w-4 h-4 text-violet-400" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-white">{apiKey.name}</h3>
                          <p className="text-xs text-white/30">Created {new Date(apiKey.created).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCopyKey(apiKey.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-white/50 hover:text-white bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.08] rounded-lg transition-colors"
                        >
                          {copiedKey === apiKey.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              Copy
                            </>
                          )}
                        </button>
                        <button className="p-1.5 text-white/30 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-3 bg-white/[0.03] rounded-xl">
                      <code className="flex-1 text-sm text-white/60 font-mono">{apiKey.key}</code>
                    </div>

                    <div className="flex items-center gap-6 mt-3 text-xs text-white/40">
                      <span>Last used: {apiKey.lastUsed}</span>
                      <span>{apiKey.calls.toLocaleString()} API calls</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===== SECURITY TAB ===== */}
          {activeTab === 'security' && (
            <div className="max-w-2xl space-y-6">
              {/* Change Password */}
              <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Lock className="w-4 h-4 text-white/60" />
                  <h2 className="text-white font-semibold">Change Password</h2>
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-2">Current Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-violet-500/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-2">New Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-violet-500/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-violet-500/50 transition-colors"
                  />
                </div>
                <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white text-sm font-medium transition-all duration-300 hover:scale-[1.02]">
                  Update Password
                </button>
              </div>

              {/* Two-Factor Auth */}
              <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white/[0.05]">
                      <Shield className="w-5 h-5 text-violet-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Two-Factor Authentication</h3>
                      <p className="text-xs text-white/40">Add an extra layer of security</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setTwoFactor(!twoFactor)}
                    className={cn(
                      'relative w-12 h-7 rounded-full transition-colors duration-200',
                      twoFactor ? 'bg-violet-500' : 'bg-white/[0.1]'
                    )}
                  >
                    <div
                      className={cn(
                        'absolute top-1 w-5 h-5 rounded-full bg-white transition-transform duration-200',
                        twoFactor ? 'translate-x-6' : 'translate-x-1'
                      )}
                    />
                  </button>
                </div>
              </div>

              {/* Active Sessions */}
              <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl overflow-hidden">
                <div className="p-5 border-b border-white/[0.06]">
                  <h2 className="text-white font-semibold">Active Sessions</h2>
                </div>
                <div className="divide-y divide-white/[0.04]">
                  {sessions.map((session) => (
                    <div
                      key={session.id}
                      className="flex items-center justify-between p-4 hover:bg-white/[0.02] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-white/[0.05] text-white/60">
                          {session.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm text-white">{session.device}</h3>
                            {session.current && (
                              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                                Current
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-white/40">
                            {session.location} · {session.lastActive}
                          </p>
                        </div>
                      </div>
                      {!session.current && (
                        <button className="text-xs text-white/40 hover:text-red-400 transition-colors">
                          <LogOut className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Danger Zone */}
              <div className="bg-red-500/[0.03] border border-red-500/[0.15] rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  <h2 className="text-red-400 font-semibold">Danger Zone</h2>
                </div>
                <p className="text-sm text-white/40 mb-4">
                  Permanently delete your account and all associated data. This action cannot be undone.
                </p>
                <button className="px-5 py-2.5 text-sm font-medium text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-xl transition-colors">
                  Delete Account
                </button>
              </div>
            </div>
          )}

          {/* ===== PREFERENCES TAB ===== */}
          {activeTab === 'preferences' && (
            <div className="max-w-2xl space-y-6">
              {/* Language */}
              <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-white/60" />
                    <div>
                      <h3 className="text-white font-semibold">Language</h3>
                      <p className="text-xs text-white/40">Select your preferred language</p>
                    </div>
                  </div>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500/50 appearance-none cursor-pointer"
                  >
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                    <option value="ja">日本語</option>
                    <option value="ko">한국어</option>
                    <option value="zh">中文</option>
                  </select>
                </div>
              </div>

              {/* Theme */}
              <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {theme === 'dark' ? (
                      <Moon className="w-5 h-5 text-white/60" />
                    ) : (
                      <Sun className="w-5 h-5 text-white/60" />
                    )}
                    <div>
                      <h3 className="text-white font-semibold">Theme</h3>
                      <p className="text-xs text-white/40">Choose your visual preference</p>
                    </div>
                  </div>
                  <div className="flex items-center bg-white/[0.05] border border-white/[0.1] rounded-xl p-1">
                    <button
                      onClick={() => setTheme('dark')}
                      className={cn(
                        'flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all',
                        theme === 'dark' ? 'bg-white/[0.1] text-white' : 'text-white/40'
                      )}
                    >
                      <Moon className="w-4 h-4" />
                      Dark
                    </button>
                    <button
                      onClick={() => setTheme('light')}
                      className={cn(
                        'flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all',
                        theme === 'light' ? 'bg-white/[0.1] text-white' : 'text-white/40'
                      )}
                    >
                      <Sun className="w-4 h-4" />
                      Light
                    </button>
                  </div>
                </div>
              </div>

              {/* Notifications */}
              <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-5">
                  <Bell className="w-5 h-5 text-white/60" />
                  <div>
                    <h3 className="text-white font-semibold">Notifications</h3>
                    <p className="text-xs text-white/40">Manage your notification preferences</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { key: 'generations' as const, label: 'Generation Complete', desc: 'Get notified when AI generations finish' },
                    { key: 'credits' as const, label: 'Credit Alerts', desc: 'Receive alerts about credit usage' },
                    { key: 'updates' as const, label: 'Product Updates', desc: 'Get notified about new features and models' },
                    { key: 'marketing' as const, label: 'Marketing Emails', desc: 'Receive promotional offers and tips' },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between py-2">
                      <div>
                        <p className="text-sm text-white">{item.label}</p>
                        <p className="text-xs text-white/40">{item.desc}</p>
                      </div>
                      <button
                        onClick={() =>
                          setNotifications((prev) => ({
                            ...prev,
                            [item.key]: !prev[item.key],
                          }))
                        }
                        className={cn(
                          'relative w-12 h-7 rounded-full transition-colors duration-200',
                          notifications[item.key] ? 'bg-violet-500' : 'bg-white/[0.1]'
                        )}
                      >
                        <div
                          className={cn(
                            'absolute top-1 w-5 h-5 rounded-full bg-white transition-transform duration-200',
                            notifications[item.key] ? 'translate-x-6' : 'translate-x-1'
                          )}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Default AI Model */}
              <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-5">
                  <Cpu className="w-5 h-5 text-white/60" />
                  <div>
                    <h3 className="text-white font-semibold">Default Settings</h3>
                    <p className="text-xs text-white/40">Set your default generation preferences</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Default AI Model</label>
                    <select
                      value={defaultModel}
                      onChange={(e) => setDefaultModel(e.target.value)}
                      className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-violet-500/50 appearance-none cursor-pointer"
                    >
                      <option value="flux-pro">Flux Pro v2.0</option>
                      <option value="stability">Stability AI XL</option>
                      <option value="dall-e">DALL·E 3</option>
                      <option value="midjourney">Midjourney v6</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Default Quality</label>
                    <select
                      value={defaultQuality}
                      onChange={(e) => setDefaultQuality(e.target.value)}
                      className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-violet-500/50 appearance-none cursor-pointer"
                    >
                      <option value="draft">Draft</option>
                      <option value="standard">Standard</option>
                      <option value="high">High</option>
                      <option value="ultra">Ultra</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
