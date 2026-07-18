'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Sparkles, Image, Video, Film, ArrowUpCircle, Music, BookOpen,
  ChevronRight, Star, Zap, Shield, Check, Play, Crown, Globe,
  Layers, PenTool
} from 'lucide-react';

const features = [
  { icon: Image, title: 'Text to Image', desc: 'Generate stunning images from text with 25+ art styles', color: 'from-violet-500 to-purple-600', href: '/text-to-image' },
  { icon: Video, title: 'Text to Video', desc: 'Create cinematic AI videos up to 60s with full camera control', color: 'from-cyan-500 to-blue-600', href: '/text-to-video' },
  { icon: Film, title: 'Image to Video', desc: 'Animate any image with physics, motion, and effects', color: 'from-fuchsia-500 to-pink-600', href: '/image-to-video' },
  { icon: ArrowUpCircle, title: 'AI Upscaler', desc: 'Enhance images up to 16x with face restore and detail recovery', color: 'from-emerald-500 to-teal-600', href: '/upscaler' },
  { icon: BookOpen, title: 'Prompt Studio', desc: 'Build, optimize, and discover professional AI prompts', color: 'from-amber-500 to-orange-600', href: '/prompt-studio' },
  { icon: Music, title: 'AI Music & SFX', desc: 'Generate custom music tracks and sound effects instantly', color: 'from-rose-500 to-red-600', href: '/ai-music' },
];

const providers = ['OpenAI', 'Stability AI', 'Runway', 'Kling AI', 'Flux', 'Midjourney', 'Google Veo', 'Pika', 'Luma', 'Leonardo'];

const plans = [
  { name: 'Free', price: '$0', period: '/forever', desc: 'Perfect for exploring', credits: '50 credits/month', features: ['5 image generations/day', '720p video', '2x upscale', 'Community prompts', 'Basic models'], cta: 'Start Free', popular: false },
  { name: 'Pro', price: '$29', period: '/month', desc: 'For serious creators', credits: '2,500 credits/month', features: ['Unlimited generations', '4K video up to 30s', '8x upscale', 'All AI models', 'Priority queue', 'Prompt Studio Pro', 'Character consistency', '50GB storage'], cta: 'Upgrade to Pro', popular: true },
  { name: 'Enterprise', price: '$99', period: '/month', desc: 'For teams and studios', credits: '10,000 credits/month', features: ['Everything in Pro', '8K video up to 60s', '16x upscale', 'Custom models', 'API access', 'Team workspace', 'Priority support', '500GB storage', 'Admin panel'], cta: 'Contact Sales', popular: false },
];

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#0a0a0f]/80 backdrop-blur-2xl border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-full px-6">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 via-cyan-400 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/20">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight gradient-text">DRAKA MOTION</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-white/50 hover:text-white transition-colors">Features</a>
            <a href="#models" className="text-sm text-white/50 hover:text-white transition-colors">AI Models</a>
            <a href="#pricing" className="text-sm text-white/50 hover:text-white transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-white/60 hover:text-white transition-colors px-4 py-2">
              Sign In
            </Link>
            <Link href="/register" className="text-sm font-semibold px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 transition-all shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 hover:scale-[1.02]">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-[128px] animate-float" />
          <div className="absolute top-40 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-[128px] animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-fuchsia-500/8 rounded-full blur-[128px] animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <motion.div className="relative max-w-5xl mx-auto text-center" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.15 } } }}>
          <motion.div variants={fadeUp} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08] mb-8">
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            <span className="text-xs font-medium text-white/60">Powered by 50+ AI Models</span>
          </motion.div>

          <motion.h1 variants={fadeUp} transition={{ duration: 0.6 }} className="text-5xl sm:text-6xl lg:text-8xl font-black tracking-tight leading-[0.9] mb-6">
            <span className="gradient-text">Create Beyond</span>
            <br />
            <span className="text-white">Imagination</span>
          </motion.h1>

          <motion.p variants={fadeUp} transition={{ duration: 0.6 }} className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
            The world&apos;s most advanced AI creative studio. Generate stunning images, cinematic videos, and immersive audio — all in one platform.
          </motion.p>

          <motion.div variants={fadeUp} transition={{ duration: 0.6 }} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/register" className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-base font-bold transition-all shadow-2xl shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-[1.03]">
              <Sparkles className="w-5 h-5" /> Get Started Free
            </Link>
            <button className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-white/[0.05] border border-white/[0.1] hover:bg-white/[0.08] text-base font-semibold text-white/80 transition-all hover:scale-[1.02]">
              <Play className="w-5 h-5" /> Watch Demo
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div variants={fadeUp} transition={{ duration: 0.6 }} className="flex flex-wrap items-center justify-center gap-8 sm:gap-16">
            {[
              { value: '10M+', label: 'Images Generated' },
              { value: '500K+', label: 'Videos Created' },
              { value: '50+', label: 'AI Models' },
              { value: '200K+', label: 'Creators' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl sm:text-3xl font-bold gradient-text">{stat.value}</p>
                <p className="text-xs text-white/40 mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-5xl font-bold mb-4">Everything You Need to <span className="gradient-text">Create</span></h2>
            <p className="text-white/40 text-lg max-w-2xl mx-auto">One platform, infinite possibilities. From concept to creation in seconds.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div key={feature.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}>
                  <Link href={feature.href} className="block p-6 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] hover:border-white/[0.15] transition-all duration-300 group hover:scale-[1.02] h-full">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 group-hover:text-white transition-colors">{feature.title}</h3>
                    <p className="text-sm text-white/40 leading-relaxed">{feature.desc}</p>
                    <div className="flex items-center gap-1 mt-4 text-xs text-violet-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Try now</span><ChevronRight className="w-3 h-3" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI Models */}
      <section id="models" className="py-24 px-6 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Powered by the <span className="gradient-text">Best AI Models</span></h2>
            <p className="text-white/40 mb-12">Access 50+ state-of-the-art models from leading providers</p>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="flex flex-wrap items-center justify-center gap-4">
            {providers.map((name) => (
              <div key={name} className="px-6 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white/50 font-medium hover:bg-white/[0.06] hover:text-white/80 transition-all cursor-default">
                {name}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6 border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-5xl font-bold mb-4">Simple, Transparent <span className="gradient-text">Pricing</span></h2>
            <p className="text-white/40 text-lg">Start free, upgrade when you&apos;re ready</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <motion.div key={plan.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                className={`relative p-8 rounded-2xl border transition-all duration-300 hover:scale-[1.02] ${
                  plan.popular ? 'bg-gradient-to-b from-violet-500/10 to-cyan-500/5 border-violet-500/30 shadow-2xl shadow-violet-500/10' : 'bg-white/[0.03] border-white/[0.06]'
                }`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 text-xs font-bold">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                <p className="text-sm text-white/40 mb-4">{plan.desc}</p>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-black">{plan.price}</span>
                  <span className="text-white/40 text-sm">{plan.period}</span>
                </div>
                <p className="text-sm text-violet-400 font-medium mb-6">{plan.credits}</p>
                <Link href="/register"
                  className={`block w-full text-center py-3 rounded-xl font-semibold text-sm transition-all hover:scale-[1.02] ${
                    plan.popular ? 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-lg shadow-violet-500/20' : 'bg-white/[0.06] text-white/80 hover:bg-white/[0.1]'
                  }`}>
                  {plan.cta}
                </Link>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-white/50">
                      <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 via-cyan-400 to-fuchsia-500 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold gradient-text">DRAKA MOTION AI</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-white/30">
            <a href="#" className="hover:text-white/60 transition-colors">Terms</a>
            <a href="#" className="hover:text-white/60 transition-colors">Privacy</a>
            <a href="#" className="hover:text-white/60 transition-colors">Contact</a>
            <a href="#" className="hover:text-white/60 transition-colors">Blog</a>
          </div>
          <p className="text-xs text-white/20">© 2024 Draka Motion AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
