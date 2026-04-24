const features = [
  {
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: 'Expertise Routing',
    description: 'MAH selects the right agent based on capability matching and confidence scoring.',
    tag: 'ROUTING',
    tagBg: '#00f2ff',
  },
  {
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    title: 'Bounded Context',
    description: 'Operational memory loaded for each execution, not every task. Bounded, explainable, reusable.',
    tag: 'MEMORY',
    tagBg: '#7bf5dc',
  },
  {
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'Observable Lifecycle',
    description: 'Execution state visible: queued → routed → running → completed. Full audit trail.',
    tag: 'OBSERVABILITY',
    tagBg: '#2792ff',
  },
  {
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    title: 'Compounding Loop',
    description: 'Evidence from sessions strengthens future routing decisions. Each run makes the next smarter.',
    tag: 'LEARNING',
    tagBg: '#ead2ff',
  },
];

export default function FeaturesSection() {
  return (
    <section className="relative w-full max-w-[1280px] mx-auto px-6 py-16 md:px-20 md:py-[100px]">
      {/* Bottom Gradient Divider */}
      <div className="mb-20 h-[1px] w-full bg-gradient-to-r from-transparent via-[#3a494b]/30 to-transparent"></div>

      {/* Section Header */}
      <div className="mb-10">
        <span className="font-space-grotesk text-[#00f2ff] text-sm tracking-[0.2em] font-medium uppercase mb-4 block">CAPABILITIES</span>
        <h2 className="font-inter text-3xl md:text-5xl font-bold text-[#e5e2e1] tracking-tight mb-4 max-w-2xl">Intelligence at every layer.</h2>
        <p className="font-inter text-[#e5e2e1]/70 text-lg md:text-xl max-w-2xl">MAH delivers operational intelligence across the full agent lifecycle.</p>
      </div>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="bg-[#1c1b1b] p-8 rounded-xl flex flex-col justify-between hover:bg-[#201f1f] transition-all duration-300 group"
          >
            <div>
              <div className="mb-6 w-12 h-12 flex items-center justify-center text-[#00f2ff]">
                {feature.icon}
              </div>
              <h3 className="font-inter text-lg font-bold text-[#e5e2e1] mb-3">{feature.title}</h3>
              <p className="font-inter text-sm text-[#e5e2e1]/70 leading-relaxed mb-6">{feature.description}</p>
            </div>
            <div>
              <span
                className="inline-block px-3 py-1 text-[#E5E2E1] font-space-grotesk text-[10px] font-bold tracking-widest uppercase rounded-sm"
                style={{ backgroundColor: `${feature.tagBg}20` }}
              >
                {feature.tag}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Gradient Divider */}
      <div className="mt-20 h-[1px] w-full bg-gradient-to-r from-transparent via-[#3a494b]/30 to-transparent"></div>
    </section>
  );
}