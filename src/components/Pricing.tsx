import { CheckCircle2, BarChart3, Gavel, Globe, Mail, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function Pricing() {
  const tiers = [
    {
      name: 'Basic',
      price: '$29',
      description: 'Essential scheduling for small, agile teams.',
      features: ['Up to 15 team members', 'Basic Shift Rotations', 'Mobile App Access'],
      buttonText: 'Get Started',
      highlighted: false
    },
    {
      name: 'Professional',
      price: '$89',
      description: 'Advanced AI automation for scaling operations.',
      features: ['Unlimited team members', 'AI Auto-Scheduling Engine', 'Labor Compliance Tracking', 'Advanced API Access'],
      buttonText: 'Start 14-Day Free Trial',
      highlighted: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'Custom governance and global infrastructure.',
      features: ['SSO & SAML Integration', 'Dedicated Account Manager', '99.99% Uptime SLA', 'White-label Experience'],
      buttonText: 'Contact Sales',
      highlighted: false
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative min-h-screen overflow-hidden"
    >
      <div className="absolute inset-0 sparkle-bg pointer-events-none opacity-40"></div>
      
      <header className="relative pt-24 pb-16 px-8 text-center max-w-4xl mx-auto">
        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium uppercase tracking-widest mb-6">
          Investment Plans
        </span>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-on-surface mb-6">
          Transparent Pricing for <span className="bg-gradient-to-r from-primary to-tertiary bg-clip-text text-transparent">Growing Teams</span>
        </h1>
        <p className="text-on-surface-variant text-lg max-w-2xl mx-auto leading-relaxed">
          Scale your workforce orchestration with precision. No hidden fees, no complex tiers. Just high-performance scheduling for enterprise excellence.
        </p>
      </header>

      <section className="relative z-10 px-8 pb-32 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier) => (
            <div 
              key={tier.name}
              className={`group relative flex flex-col p-8 rounded-3xl border transition-all duration-500 hover:-translate-y-2 ${
                tier.highlighted 
                ? 'bg-surface-container border-primary/40 shadow-[0_0_50px_-12px_rgba(192,193,255,0.25)]' 
                : 'bg-surface-container-low border-white/5 hover:border-primary/30'
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-primary to-tertiary rounded-full text-on-primary text-[10px] font-black uppercase tracking-widest">
                  Most Popular
                </div>
              )}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-on-surface mb-2">{tier.name}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">{tier.description}</p>
              </div>
              <div className="mb-8 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-on-surface">{tier.price}</span>
                {tier.price !== 'Custom' && <span className="text-on-surface-variant text-xs uppercase tracking-widest">/ month</span>}
              </div>
              <div className="flex-grow space-y-4 mb-10">
                {tier.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <CheckCircle2 className={`w-4 h-4 ${tier.highlighted ? 'text-primary' : 'text-primary/60'}`} />
                    <span className={`text-sm ${tier.highlighted ? 'text-on-surface' : 'text-on-surface-variant'}`}>{feature}</span>
                  </div>
                ))}
              </div>
              <button className={`w-full py-4 px-6 rounded-xl font-bold transition-all active:scale-95 ${
                tier.highlighted 
                ? 'bg-gradient-to-br from-primary to-primary-container text-on-primary shadow-lg shadow-primary/20 hover:scale-[1.02]' 
                : 'bg-surface-container-high text-on-surface hover:bg-surface-bright'
              }`}>
                {tier.buttonText}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-8 py-24 border-t border-white/5">
        <h2 className="text-3xl font-bold text-center mb-16 text-on-surface">Platform Capabilities</h2>
        <div className="relative space-y-24">
          <div className="absolute left-[11px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary to-transparent hidden md:block"></div>
          
          <div className="relative flex flex-col md:flex-row items-center gap-8 md:gap-0">
            <div className="md:w-1/2 md:pr-16 text-left md:text-right">
              <h4 className="text-xl font-bold text-primary mb-2">Smart Forecasts</h4>
              <p className="text-on-surface-variant text-sm leading-relaxed">Predict staffing needs based on historical data patterns and upcoming seasonal trends.</p>
            </div>
            <div className="absolute left-0 md:left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-surface-container border-2 border-primary z-10 shadow-[0_0_15px_rgba(192,193,255,0.4)]"></div>
            <div className="md:w-1/2 md:pl-16">
              <div className="p-6 rounded-2xl bg-surface-container-high border border-white/5">
                <BarChart3 className="w-8 h-8 text-primary-container mb-4" />
                <div className="h-2 w-full bg-surface-variant rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-3/4"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative flex flex-col md:flex-row-reverse items-center gap-8 md:gap-0">
            <div className="md:w-1/2 md:pl-16 text-left">
              <h4 className="text-xl font-bold text-tertiary mb-2">Automated Compliance</h4>
              <p className="text-on-surface-variant text-sm leading-relaxed">Stay ahead of labor laws with automatic shift validation and rest period tracking.</p>
            </div>
            <div className="absolute left-0 md:left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-surface-container border-2 border-tertiary z-10 shadow-[0_0_15px_rgba(208,188,255,0.4)]"></div>
            <div className="md:w-1/2 md:pr-16">
              <div className="p-6 rounded-2xl bg-surface-container-high border border-white/5">
                <Gavel className="w-8 h-8 text-tertiary-container mb-4" />
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

          <div className="relative flex flex-col md:flex-row items-center gap-8 md:gap-0">
            <div className="md:w-1/2 md:pr-16 text-left md:text-right">
              <h4 className="text-xl font-bold text-primary mb-2">Global Connectivity</h4>
              <p className="text-on-surface-variant text-sm leading-relaxed">Sync teams across multiple timezones with real-time push notifications and updates.</p>
            </div>
            <div className="absolute left-0 md:left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-surface-container border-2 border-primary z-10 shadow-[0_0_15px_rgba(192,193,255,0.4)]"></div>
            <div className="md:w-1/2 md:pl-16">
              <div className="p-6 rounded-2xl bg-surface-container-high border border-white/5 overflow-hidden relative min-h-[120px] flex items-center justify-center">
                <Globe className="w-12 h-12 text-primary-container relative z-10" />
                <div className="absolute inset-0 bg-primary/5 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
