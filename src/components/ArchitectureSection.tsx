import { useState } from 'react';

const stages = [
  {
    icon: (
      <svg className="text-2xl w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    label: 'DEFINE',
    subtitle: 'Crew + Tasks + Tools',
    description: 'Declare crews, agents, and domain profiles in meta-agents.yaml. One config, every runtime.',
    borderColor: '#00f2ff',
    iconColor: '#00f2ff',
    shadowColor: 'rgba(0,242,255,0.04)',
  },
  {
    icon: (
      <svg className="text-2xl w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    label: 'ORCHESTRATE',
    subtitle: 'Expertise-Aware Routing',
    description: 'Structured expertise routing with confidence scoring. Context memory loads operational knowledge automatically.',
    borderColor: '#2792ff',
    iconColor: '#2792ff',
    shadowColor: 'rgba(39,146,255,0.04)',
  },
  {
    icon: (
      <svg className="text-2xl w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    label: 'SHIP',
    subtitle: 'Headless & CI/CD',
    description: 'Run headless or interactive in any CI/CD pipeline. Validate, sync, and ship solutions across runtimes with one command.',
    borderColor: '#ead2ff',
    iconColor: '#ead2ff',
    shadowColor: 'rgba(234,210,255,0.04)',
  },
];

const layers = [
  {
    name: 'Crew Definition',
    title: 'Crew Definition',
    desc: 'Declare crews, agents, topology, and domain profiles in a single meta-agents.yaml. One manifest, every runtime.',
    cli: 'mah init',
    color: '#74f5ff',
    glowColor: 'rgba(116,245,255,0.1)',
  },
  {
    name: 'Expertise',
    title: 'Expertise Model',
    desc: 'Structured capability intelligence for routing, trust calibration, and evidence tracking. Decides who should handle the work.',
    cli: 'mah expertise recommend',
    color: '#00f2ff',
    glowColor: 'rgba(0,242,255,0.1)',
  },
  {
    name: 'Context Memory',
    title: 'Context Memory',
    desc: 'Bounded, explainable, reusable operational memory. Provides agents with task-relevant context without interfering with routing.',
    cli: 'mah context find',
    color: '#ead2ff',
    glowColor: 'rgba(234,210,255,0.1)',
  },
  {
    name: 'Sessions',
    title: 'Sessions',
    desc: 'Persistent continuity across multi-agent workflows. Track state, handoffs, and audit trails.',
    cli: 'mah sessions resume',
    color: '#2792ff',
    glowColor: 'rgba(39,146,255,0.1)',
  },
  {
    name: 'Skills',
    title: 'Skills',
    desc: 'Procedural behavior primitives. Reusable instruction sets that teach agents how to execute.',
    cli: null,
    color: '#e5e2e1',
    glowColor: 'rgba(229,226,225,0.1)',
  },
];

const terminalContent: Record<number, string> = {
  0: `---
version: 1
name: "my-project"
crews:
  - id: dev
    topology:
      orchestrator: orchestrator
      leads:
        planning: planning-lead
      workers:
        planning:
          - repo-analyst
# meta-agents.yaml`,
  1: `➜ mah expertise recommend --task "deploy pipeline"
→ routing to: engineering-lead (confidence: 0.94)
➜ mah expertise explain --task "deploy pipeline"
→ evidence: 3 matching capabilities, trust_tier: verified
➜ mah expertise show dev/engineering-lead
→ status: active | capabilities: 7 | domains: 3`,
  2: `➜ mah context find --agent engineering-lead --task "deploy pipeline"
→ loaded 3 operational memories (relevance: 0.87)
➜ mah context explain --agent engineering-lead --task "deploy pipeline"
→ matched by: capability(0.3) + tool(0.2) + pattern(0.2)
➜ mah context validate --path .mah/context/operational/
→ ✓ 12 documents validated, 0 errors`,
  3: `➜ mah sessions resume --last
→ session: hermes:dev:a8f3c... | agents: 4 active
➜ mah sessions list --crew dev --limit 5
→ 3 sessions found | latest: 2h ago
➜ mah context propose --from-session hermes:dev:a8f3c
→ draft written to .mah/context/proposals/`,
  4: `---
name: web-research
description: Run evidence-based web research with Brave Search for discovery and Firecrawl for extraction/synthesis.
compatibility: [generic]
---
# Web Research
Use this skill when a task depends on up-to-date external information (platform selection, market scans, benchmarks, references, trend checks).`,
};

const defaultTerminal =
  `       
                      ┌────────────────────┐
                      │    Orchestrator    │
                      └─────────┬──────────┘
                                │
                ┌───────────────┼───────────────┐
          ┌─────┴─────┐  ┌──────┴──────┐  ┌─────┴──────┐
          │ Planning  │  │ Engineering │  │ Validation │
          │   Lead    │  │    Lead     │  │    Lead    │
          └─────┬─────┘  └──────┬──────┘  └─────┬──────┘
                │               │               │
         ┌──────┴──────┐ ┌──────┴──────┐  ┌─────┴──────┐
         │Repo-Analyst │ │Frontend-dev │  │QA-Engineer │
         │Sol-Architect│ │ Backend-dev │  │            │
         └─────────────┘ └─────────────┘  └────────────┘

# topology: dev crew
# meta-agents.yaml`;

function renderTerminalContent(content: string) {
  return content.split('\n').map((line, i) => {
    if (line.startsWith('---') || line === '---') {
      return <div key={i} className="text-[#00f2ff] font-mono">{line}</div>;
    }
    const colonIdx = line.indexOf(': ');
    if (colonIdx !== -1 && !line.startsWith('➜') && !line.startsWith('→') && !line.startsWith('#')) {
      return (
        <div key={i} className="font-mono">
          <span className="text-[#00f2ff]">{line.slice(0, colonIdx + 1)}</span>
          <span className="text-[#b9cacb]/80">{line.slice(colonIdx + 1)}</span>
        </div>
      );
    }
    if (line.startsWith('# ')) {
      return <div key={i} className="text-[#e5e2e1] font-bold font-mono mt-2">{line}</div>;
    }
    if (line.startsWith('→')) {
      return <div key={i} className="font-mono">{line}</div>;
    }
    if (line.startsWith('➜')) {
      return <div key={i} className="text-[#00f2ff] font-mono">{line}</div>;
    }
    return <div key={i} className="font-mono">{line}</div>;
  });
}

export default function ArchitectureSection() {
  const [hoveredLayer, setHoveredLayer] = useState<number | null>(null);
  const [tappedLayer, setTappedLayer] = useState<number | null>(null);

  return (
    <section className="w-full py-16 px-5 md:py-[100px] md:px-[80px] flex flex-col items-center">
      {/* Header */}
      <div className="mb-[48px] w-full">
        <span className="font-space-grotesk text-[#00f2ff] text-sm font-bold tracking-[0.2em] uppercase block mb-4">HOW IT WORKS</span>
        <h2 className="font-inter text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#e5e2e1]">
          From mission to result in three stages.
        </h2>
      </div>

      {/* Pipeline Visual */}
      <div className="relative flex flex-col md:flex-row items-start justify-center gap-[40px] md:gap-[120px] w-full">
        {stages.map((stage) => (
          <div
            key={stage.label}
            className="w-full md:w-[280px] bg-[#1c1b1b] border-l-4 rounded-xl p-8 relative z-10 flex flex-col gap-4"
            style={{
              borderLeftColor: stage.borderColor,
              boxShadow: `0 24px 40px ${stage.shadowColor}`,
            }}
          >
            <div
              className="w-12 h-12 flex items-center justify-center rounded-lg bg-[#201f1f]"
              style={{ color: stage.iconColor }}
            >
              {stage.icon}
            </div>
            <div>
              <h3
                className="font-space-grotesk font-bold tracking-wider text-sm mb-1 uppercase"
                style={{ color: stage.iconColor }}
              >
                {stage.label}
              </h3>
              <p className="font-inter text-[#e5e2e1] text-xs font-medium opacity-70 uppercase tracking-wide">{stage.subtitle}</p>
            </div>
            <p className="font-inter text-[#e5e2e1] text-sm leading-relaxed opacity-60">
              {stage.description}
            </p>
          </div>
        ))}
      </div>

      {/* Intelligence Stack - Bento Grid */}
      <div className="mt-24 grid grid-cols-1 md:grid-cols-12 gap-6 w-full">
        {/* Left Column: Layered Stack (7 cols) */}
        <div className="md:col-span-7 flex flex-col gap-4">
          {layers.map((layer, index) => (
            <div key={layer.name}>
              <div
                className="border-l-2 rounded-r-xl p-4 flex items-start gap-4 transition-all duration-300 cursor-pointer"
                style={{
                  borderLeftColor: layer.color,
                  boxShadow: hoveredLayer === index ? `0 0 20px ${layer.glowColor}` : 'none',
                  background: hoveredLayer === index ? 'rgba(28, 27, 27, 0.3)' : 'rgba(28, 27, 27, 0.4)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                }}
                onMouseEnter={() => setHoveredLayer(index)}
                onMouseLeave={() => setHoveredLayer(null)}
                onClick={() => {
                  if (typeof window !== 'undefined' && window.innerWidth < 768) {
                    setTappedLayer(tappedLayer === index ? null : index);
                  }
                }}
              >
                <div className="flex-1">
                  <div
                    className="font-space-grotesk text-xs font-bold uppercase tracking-wider mb-1"
                    style={{ color: layer.color }}
                  >
                    {layer.name}
                  </div>
                  <div className="font-inter font-bold text-[#e5e2e1] mb-2">{layer.title}</div>
                  <div className="font-inter text-sm text-[#b9cacb]">{layer.desc}</div>
                </div>
                {layer.cli && (
                  <div className="font-mono text-xs text-[#e5e2e1]/60 shrink-0 hidden sm:block transition-opacity duration-300 opacity-60 hover:opacity-100">
                    {layer.cli}
                  </div>
                )}
              </div>
              {/* Mobile inline terminal */}
              {tappedLayer === index && typeof window !== 'undefined' && window.innerWidth < 768 && (
                <div className="bg-[#0e0e0e] rounded-xl p-4 mt-2 animate-fade-in">
                  <div className="font-mono text-sm text-[#b9cacb]/60">
                    {renderTerminalContent(terminalContent[index] ?? '')}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right Column: Terminal Panel (5 cols) - Desktop only */}
        <div className="hidden md:block md:col-span-5">
          <div className="bg-[#0e0e0e] rounded-xl p-6">
            <div
              key={hoveredLayer}
              className="font-mono text-sm animate-fade-in"
              style={{ animation: 'fadeIn 0.3s ease-out' }}
            >
              {renderTerminalContent(terminalContent[hoveredLayer ?? -1] ?? defaultTerminal)}
            </div>

            <div className="mt-6 pt-4 border-t border-[#3a494b]/30">
              <div className="flex items-center gap-2 text-[11px] text-[#b9cacb]/40">
                <span className="w-2 h-2 rounded-full bg-[#00f2ff] animate-pulse"></span>
                <span>Intelligence stack operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </section>
  );
}
