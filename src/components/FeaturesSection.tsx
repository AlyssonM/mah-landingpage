const features = [
  {
    icon: (
      <svg className="text-[48px] w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
      </svg>
    ),
    title: 'Multi-Agent Coordination',
    description: 'Orchestrate multiple specialized agents in directed acyclic pipelines. Each agent has a role, a toolset, and a mission.',
    tag: 'PIPELINE',
    tagBg: '#8A2BE2',
  },
  {
    icon: (
      <svg className="text-[48px] w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: 'CLI-First Design',
    description: 'Define crews, tasks, and tools in code. Ship to production or iterate locally. Zero UI lock-in.',
    tag: 'DEVELOPER EXPERIENCE',
    tagBg: '#1E90FF',
  },
  {
    icon: (
      <svg className="text-[48px] w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
      </svg>
    ),
    title: 'Extensible Architecture',
    description: "Bring your own tools, prompts, and models. MAH is a harness — it adapts to your stack, not the other way around.",
    tag: 'PLUGIN SYSTEM',
    tagBg: '#00f2ff',
  },
  {
    icon: (
      <svg className="text-[48px] w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'Observable Pipelines',
    description: 'Built-in tracing, session replay, and structured output. Debug agents like you debug functions.',
    tag: 'DEVTOOLS',
    tagBg: '#1E90FF',
  },
];

export default function FeaturesSection() {
  return (
    <section className="relative w-full max-w-[1280px] mx-auto px-20 py-[100px]">
      {/* Bottom Gradient Divider */}
      <div className="mb-20 h-[1px] w-full bg-gradient-to-r from-transparent via-[#3a494b]/30 to-transparent"></div>

      {/* Section Header */}
      <div className="mb-10">
        <span className="font-space-grotesk text-[#00f2ff] text-sm tracking-[0.2em] font-medium uppercase mb-4 block">CAPABILITIES</span>
        <h2 className="font-inter text-5xl font-bold text-[#e5e2e1] tracking-tight mb-4 max-w-2xl">Everything you need to orchestrate agents.</h2>
        <p className="font-inter text-[#e5e2e1]/70 text-xl max-w-2xl">MAH handles the plumbing so you can focus on your agents logic.</p>
      </div>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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

      {/* Bottom Content Section */}
      <section className="pb-2 grid grid-cols-1 md:grid-cols-12 gap-8 mt-16">
        {/* Log Panel */}
        <div className="col-span-12 md:col-span-7 bg-[#0e0e0e] border border-[#3a494b]/10 rounded-xl p-8 relative overflow-hidden">
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-[#ffb4ab]"></div>
              <div className="w-2 h-2 rounded-full bg-[#FFD700]"></div>
              <div className="w-2 h-2 rounded-full bg-[#32CD32]"></div>
            </div>
            <span className="font-space-grotesk text-[10px] text-[#e5e2e1]/40 tracking-widest">AGENT_CORE_v4.log</span>
          </div>
          <div className="font-mono text-xs text-[#00dbe7]/80 space-y-2">
            <p><span className="text-[#e5e2e1]/30">14:02:11</span> <span className="text-[#2792ff]">[ORCHESTRATOR]</span> Initializing DAG flow...</p>
            <p><span className="text-[#e5e2e1]/30">14:02:12</span> <span className="text-[#00f2ff]">[RESEARCHER]</span> querying vector_db.cluster_0...</p>
            <p><span className="text-[#e5e2e1]/30">14:02:15</span> <span className="text-[#00f2ff]">[RESEARCHER]</span> found 12 relevant nodes.</p>
            <p><span className="text-[#e5e2e1]/30">14:02:16</span> <span className="text-[#ead2ff]">[WRITER]</span> synthesizing response from research_payload...</p>
            <p className="animate-pulse"><span className="text-[#e5e2e1]/30">14:02:18</span> <span className="text-[#a5c8ff]">[CRITIC]</span> verifying logical consistency...</p>
          </div>
          <div className="absolute -bottom-10 -right-10 opacity-20">
            {/* <svg className="text-[160px] w-[240px] h-[160px] text-[#00f2ff]" fill="none" viewBox="0 3 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg> */}
          </div>
        </div>

        {/* Text Content */}
        <div className="col-span-12 md:col-span-5 flex flex-col justify-center">
          <h4 className="font-inter text-3xl font-bold text-[#e5e2e1] mb-4">Code-driven autonomy.</h4>
          <p className="font-inter text-[#e5e2e1]/60 leading-relaxed">
            Stop building around restrictive platforms. MAH provides the runtime, observability, and coordination primitives you need to ship agentic systems that actually work.
          </p>
          <div className="mt-8">
            <a className="inline-flex items-center gap-2 text-[#00f2ff] font-space-grotesk font-bold tracking-widest text-xs hover:gap-4 transition-all uppercase" href="#">
              Read the technical manifesto
              <svg className="text-sm w-[14px] h-[14px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>
      {/* Bottom Gradient Divider */}
      <div className="mt-22 mb-[-120px] h-[1px] w-full bg-gradient-to-r from-transparent via-[#3a494b]/30 to-transparent"></div>

    </section>
  );
}
