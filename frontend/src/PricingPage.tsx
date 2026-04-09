import React from 'react';
import { PricingSection4 } from '@/components/ui/pricing-section-4';

const PricingPage = () => {
  return (
    <div className="bg-background text-on-background font-body selection:bg-primary selection:text-on-primary dark min-h-screen">
      {/* TopNavBar */}
      <nav className="sticky top-0 z-50 flex justify-between items-center px-8 h-16 w-full bg-slate-900/60 dark:bg-[#0b1326]/60 backdrop-blur-xl shadow-[0_0_40px_-15px_rgba(99,102,241,0.2)]">
        <div className="flex items-center gap-8">
          <span className="text-2xl font-black tracking-tighter text-[#c0c1ff]">ShiftSync</span>
          <div className="hidden md:flex gap-6">
            <a className="text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-all duration-300 ease-out px-3 py-1 rounded-lg text-sm font-medium" href="#">Dashboard</a>
            <a className="text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-all duration-300 ease-out px-3 py-1 rounded-lg text-sm font-medium" href="#">Schedules</a>
            <a className="text-[#c0c1ff] font-semibold border-b-2 border-[#c0c1ff] px-3 py-1 text-sm" href="#">Pricing</a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <button className="material-symbols-outlined text-slate-400 p-2 hover:bg-white/5 rounded-full transition-all">notifications</button>
            <button className="material-symbols-outlined text-slate-400 p-2 hover:bg-white/5 rounded-full transition-all">settings</button>
          </div>
          <img alt="Manager profile picture" className="w-8 h-8 rounded-full border border-primary/20" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbVlbaSUD6HLSEDFYfmsGTosQAaSpOuGtqd_zS11wQJ1hTHQZzEInDdb3H5PK6OhzMUjL7QPuEqswuALhYbNVxngzlzgi0Oj6N0LCID7PBN2A2Dzfb_2zlLN_g9YaASwkPTym0Tv8wLnnyN-oWUii9Y7K_1nxmAthxfOsgapExHRweHYI_oF9xzTKmcAhTRDVzAfKQBJ9e_nwEit0to4zV27_ClfNomzL9oa5Dz30h__zUgDTqURFy1rjxDK1_SQwhVjAsAK0Jc_1w"/>
        </div>
      </nav>

      <main className="relative overflow-hidden">
        {/* Sparkle Background */}
        <div className="absolute inset-0 opacity-40 pointer-events-none" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(192, 193, 255, 0.15) 1px, transparent 0)',
            backgroundSize: '40px 40px'
        }}></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 blur-[120px] rounded-full"></div>
        <div className="absolute top-1/2 -right-24 w-[500px] h-[500px] bg-tertiary/5 blur-[150px] rounded-full"></div>
        
        {/* Hero Section */}
        <header className="relative pt-24 pb-16 px-8 text-center max-w-4xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-label uppercase tracking-widest mb-6">
            Investment Plans
          </span>
          <h1 className="text-5xl md:text-7xl font-headline font-bold tracking-tight text-on-surface mb-6" style={{
              clipPath: 'inset(0 0 0 0)',
              animation: 'reveal 1.2s cubic-bezier(0.77, 0, 0.175, 1) forwards'
          }}>
            Transparent Pricing for <span className="bg-gradient-to-r from-primary to-tertiary bg-clip-text text-transparent">Growing Teams</span>
          </h1>
          <p className="text-on-surface-variant text-lg max-w-2xl mx-auto leading-relaxed">
            Scale your workforce orchestration with precision. No hidden fees, no complex tiers. Just high-performance scheduling for enterprise excellence.
          </p>
        </header>

        {/* Pricing Section 4: Three Tiers */}
        <PricingSection4 />

        {/* Timeline-style Features */}
        <section className="max-w-4xl mx-auto px-8 py-24 border-t border-white/5">
          <h2 className="text-3xl font-headline font-bold text-center mb-16 text-on-surface">Platform Capabilities</h2>
          <div className="relative space-y-24">
            {/* Vertical Line */}
            <div className="absolute left-[11px] md:left-1/2 top-0 bottom-0 w-px hidden md:block" style={{
              background: 'linear-gradient(to bottom, transparent, #c0c1ff, transparent)'
            }}></div>

            {/* Feature 1 */}
            <div className="relative flex flex-col md:flex-row items-center gap-8 md:gap-0">
              <div className="md:w-1/2 md:pr-16 text-left md:text-right">
                <h4 className="text-xl font-bold text-primary mb-2">Smart Forecasts</h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">Predict staffing needs based on historical data patterns and upcoming seasonal trends.</p>
              </div>
              <div className="absolute left-0 md:left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-surface-container border-2 border-primary z-10 shadow-[0_0_15px_rgba(192,193,255,0.4)]"></div>
              <div className="md:w-1/2 md:pl-16 w-full">
                <div className="p-6 rounded-2xl bg-surface-container-high border border-white/5 w-full">
                  <span className="material-symbols-outlined text-3xl text-primary-container mb-4">analytics</span>
                  <div className="h-2 w-full bg-surface-variant rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-3/4"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="relative flex flex-col md:flex-row-reverse items-center gap-8 md:gap-0">
              <div className="md:w-1/2 md:pl-16 text-left">
                <h4 className="text-xl font-bold text-tertiary mb-2">Automated Compliance</h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">Stay ahead of labor laws with automatic shift validation and rest period tracking.</p>
              </div>
              <div className="absolute left-0 md:left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-surface-container border-2 border-tertiary z-10 shadow-[0_0_15px_rgba(208,188,255,0.4)]"></div>
              <div className="md:w-1/2 md:pr-16 w-full">
                <div className="p-6 rounded-2xl bg-surface-container-high border border-white/5 w-full">
                  <span className="material-symbols-outlined text-3xl text-tertiary-container mb-4">gavel</span>
                  <div className="grid grid-cols-5 gap-1">
                    <div className="h-8 bg-tertiary/20 rounded"></div>
                    <div className="h-8 bg-tertiary/20 rounded"></div>
                    <div className="h-8 bg-tertiary rounded"></div>
                    <div className="h-8 bg-tertiary/20 rounded"></div>
                    <div className="h-8 bg-tertiary/20 rounded"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="relative flex flex-col md:flex-row items-center gap-8 md:gap-0">
              <div className="md:w-1/2 md:pr-16 text-left md:text-right">
                <h4 className="text-xl font-bold text-primary mb-2">Global Connectivity</h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">Sync teams across multiple timezones with real-time push notifications and updates.</p>
              </div>
              <div className="absolute left-0 md:left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-surface-container border-2 border-primary z-10 shadow-[0_0_15px_rgba(192,193,255,0.4)]"></div>
              <div className="md:w-1/2 md:pl-16 w-full">
                <div className="p-6 rounded-2xl bg-surface-container-high border border-white/5 overflow-hidden relative w-full h-32">
                  <img alt="Global connectivity map" className="absolute inset-0 w-full h-full object-cover opacity-20" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWu557HFyVOuU1J9FyzGRBEvOtQGWnRosszDjWAqtQOyoTncmOxWYSMB0c6GFK_a8UOcUL8vVbYK8aRb25sKRTNzZz7-u1LoTtIMEgi9fCG7UJ9TXBDwh4XmeqV-ApuEu1kGl55BtZUHXlJmojcW5pgOV7A3ZMJx7Ayniicqy9d_IpS7Ix7r9T12QPO5_KlIksvYOXG-zdfoHxPvQw7qfxB8Hhk5tUjUX6RBuxPIGHypFw6q_f1cYP8F-XXedJgIOtyO46eCu-ulQy"/>
                  <div className="relative z-10 h-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-3xl text-primary-container">public</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#0b1326] border-t border-white/5">
        <div className="w-full py-12 px-8 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <span className="text-xl font-black tracking-tighter text-[#c0c1ff]">ShiftSync</span>
            <p className="text-xs font-light tracking-wide text-slate-500">© {new Date().getFullYear()} ShiftSync Obsidian. All rights reserved.</p>
          </div>
          <div className="flex gap-8">
            <a className="text-xs font-light tracking-wide text-slate-600 hover:text-slate-300 transition-colors" href="#">Privacy Policy</a>
            <a className="text-xs font-light tracking-wide text-slate-600 hover:text-slate-300 transition-colors" href="#">Terms of Service</a>
            <a className="text-xs font-light tracking-wide text-slate-600 hover:text-slate-300 transition-colors" href="#">Security</a>
          </div>
          <div className="flex gap-4">
            <button className="material-symbols-outlined text-slate-600 hover:text-[#c0c1ff] transition-colors">contact_support</button>
            <button className="material-symbols-outlined text-slate-600 hover:text-[#c0c1ff] transition-colors">mail</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PricingPage;
