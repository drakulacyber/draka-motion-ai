'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Mail, Lock, Eye, EyeOff, Globe, KeyRound, User } from 'lucide-react';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const getPasswordStrength = () => {
    if (password.length === 0) return { width: '0%', color: 'bg-white/10', label: '' };
    if (password.length < 6) return { width: '25%', color: 'bg-red-500', label: 'Weak' };
    if (password.length < 10) return { width: '50%', color: 'bg-amber-500', label: 'Fair' };
    if (password.length < 14) return { width: '75%', color: 'bg-cyan-500', label: 'Strong' };
    return { width: '100%', color: 'bg-emerald-500', label: 'Very Strong' };
  };

  const strength = getPasswordStrength();

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-fuchsia-500/12 rounded-full blur-[128px]" />
      <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-violet-500/10 rounded-full blur-[128px]" />

      <motion.div initial={{ opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.5 }}
        className="relative w-full max-w-md p-8 rounded-3xl bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="flex items-center gap-2.5 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 via-cyan-400 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/25">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
          </Link>
          <h1 className="text-2xl font-bold gradient-text">Create Your Account</h1>
          <p className="text-sm text-white/40 mt-1">Start creating with AI today</p>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-white/50 mb-1.5 block">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe"
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.1] text-sm text-white placeholder-white/25 outline-none focus:border-violet-500/50 transition-colors" />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-white/50 mb-1.5 block">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com"
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.1] text-sm text-white placeholder-white/25 outline-none focus:border-violet-500/50 transition-colors" />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-white/50 mb-1.5 block">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create a strong password"
                className="w-full pl-11 pr-12 py-3 rounded-xl bg-white/[0.05] border border-white/[0.1] text-sm text-white placeholder-white/25 outline-none focus:border-violet-500/50 transition-colors" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {password.length > 0 && (
              <div className="mt-2 flex items-center gap-2">
                <div className="flex-1 h-1 rounded-full bg-white/[0.06] overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: strength.width }} className={`h-full rounded-full ${strength.color} transition-all`} />
                </div>
                <span className="text-[10px] text-white/40">{strength.label}</span>
              </div>
            )}
          </div>
          <div>
            <label className="text-xs font-medium text-white/50 mb-1.5 block">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm your password"
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.1] text-sm text-white placeholder-white/25 outline-none focus:border-violet-500/50 transition-colors" />
            </div>
          </div>
          <label className="flex items-start gap-2.5 cursor-pointer pt-1">
            <input type="checkbox" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} className="w-4 h-4 mt-0.5 rounded border-white/20 bg-white/[0.05]" />
            <span className="text-xs text-white/40 leading-relaxed">
              I agree to the <Link href="#" className="text-violet-400 hover:text-violet-300">Terms of Service</Link> and <Link href="#" className="text-violet-400 hover:text-violet-300">Privacy Policy</Link>
            </span>
          </label>
          <Link href="/dashboard" className="block">
            <button type="button" className="w-full py-3.5 mt-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-sm font-bold transition-all shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 hover:scale-[1.02]">
              Create Account
            </button>
          </Link>
        </form>

        <div className="my-6 flex items-center gap-4">
          <div className="flex-1 h-px bg-white/[0.06]" />
          <span className="text-xs text-white/25">or sign up with</span>
          <div className="flex-1 h-px bg-white/[0.06]" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] text-sm text-white/60 transition-all hover:scale-[1.02]">
            <Globe className="w-4 h-4" /> Google
          </button>
          <button className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] text-sm text-white/60 transition-all hover:scale-[1.02]">
            <KeyRound className="w-4 h-4" /> GitHub
          </button>
        </div>

        <p className="text-center text-sm text-white/30 mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
}
