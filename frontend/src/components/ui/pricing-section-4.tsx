import React from 'react';

export const PricingSection4 = () => {
  return (
    <section className="relative z-10 px-8 pb-32 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-3 gap-8 items-stretch">
        {/* Basic Tier */}
        <div className="group relative flex flex-col p-8 rounded-3xl bg-surface-container-low border border-white/5 hover:border-primary/30 transition-all duration-500 hover:-translate-y-2">
          <div className="mb-8">
            <h3 className="text-xl font-headline font-bold text-on-surface mb-2">Basic</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">Essential scheduling for small, agile teams.</p>
          </div>
          <div className="mb-8 flex items-baseline gap-1">
            <span className="text-4xl font-bold text-on-surface">$29</span>
            <span className="text-on-surface-variant font-label text-xs uppercase tracking-widest">/ month</span>
          </div>
          <div className="flex-grow space-y-4 mb-10">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              <span className="text-sm text-on-surface-variant">Up to 15 team members</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              <span className="text-sm text-on-surface-variant">Basic Shift Rotations</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              <span className="text-sm text-on-surface-variant">Mobile App Access</span>
            </div>
          </div>
          <button className="w-full py-4 px-6 rounded-xl bg-surface-container-high text-on-surface font-semibold hover:bg-surface-bright transition-all active:scale-95">
            Get Started
          </button>
        </div>

        {/* Pro Tier (Highlighted) */}
        <div className="group relative flex flex-col p-8 rounded-3xl bg-surface-container border border-primary/40 shadow-[0_0_50px_-12px_rgba(192,193,255,0.25)] transition-all duration-500 hover:-translate-y-2">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-primary to-tertiary rounded-full text-on-primary text-[10px] font-black uppercase tracking-widest">
            Most Popular
          </div>
          <div className="mb-8">
            <h3 className="text-xl font-headline font-bold text-on-surface mb-2">Professional</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">Advanced AI automation for scaling operations.</p>
          </div>
          <div className="mb-8 flex items-baseline gap-1">
            <span className="text-4xl font-bold text-on-surface">$89</span>
            <span className="text-on-surface-variant font-label text-xs uppercase tracking-widest">/ month</span>
          </div>
          <div className="flex-grow space-y-4 mb-10">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              <span className="text-on-surface">Unlimited team members</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              <span className="text-on-surface font-semibold">AI Auto-Scheduling Engine</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              <span className="text-on-surface">Labor Compliance Tracking</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              <span className="text-on-surface">Advanced API Access</span>
            </div>
          </div>
          <button className="w-full py-4 px-6 rounded-xl bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all active:scale-95">
            Start 14-Day Free Trial
          </button>
        </div>

        {/* Enterprise Tier */}
        <div className="group relative flex flex-col p-8 rounded-3xl bg-surface-container-low border border-white/5 hover:border-tertiary/30 transition-all duration-500 hover:-translate-y-2">
          <div className="mb-8">
            <h3 className="text-xl font-headline font-bold text-on-surface mb-2">Enterprise</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">Custom governance and global infrastructure.</p>
          </div>
          <div className="mb-8 flex items-baseline gap-1">
            <span className="text-4xl font-bold text-on-surface">Custom</span>
          </div>
          <div className="flex-grow space-y-4 mb-10">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-tertiary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              <span className="text-sm text-on-surface-variant">SSO & SAML Integration</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-tertiary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              <span className="text-sm text-on-surface-variant">Dedicated Account Manager</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-tertiary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              <span className="text-sm text-on-surface-variant">99.99% Uptime SLA</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-tertiary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              <span className="text-sm text-on-surface-variant">White-label Experience</span>
            </div>
          </div>
          <button className="w-full py-4 px-6 rounded-xl border border-outline-variant text-on-surface font-semibold hover:bg-white/5 transition-all active:scale-95">
            Contact Sales
          </button>
        </div>
      </div>
    </section>
  );
};
