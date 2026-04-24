import { useState } from 'react';

const terminalContent: Record<string, string> = {
  policy: `➜ mah policy check --task "accessibility audit"

→ ALLOWED
  topology: LOCAL
  constraints: 2 enforced
  bypass: NONE`,
  expertise: `➜ mah expertise recommend --task "accessibility audit"

→ routing to: a11y-specialist@dev-team
  confidence: 0.94
  matched_by: capability(0.4) + tool(0.3) + evidence(0.2)

➜ mah expertise explain --task "accessibility audit"

→ 3 capabilities matched, threshold: 0.80
  evidence_weight: 0.20 (compounding)`,
  context: `➜ mah context find --agent a11y-specialist --task "accessibility audit"

→ loaded: wcag-guidelines-v2.1.json (12.4 KB)
         axe-core-ruleset.json (8.1 KB)

→ scope: READ_ONLY | TTL: 30min
  relevance_score: 0.87`,
  provenance: `➜ mah provenance trace --session hermes:dev:a8f3c

→ 12 events logged:
  t+0.0s  session created
  t+0.1s  policy checked → ALLOWED
  t+0.2s  routed to a11y-specialist
  t+0.3s  context loaded (2 memories)
  t+0.7s  execution started

→ audit_trail: /sessions/a8f3c/trace.json`,
  sessions: `➜ mah sessions list --crew dev --limit 3

→ s1: QUEUED(2s) → ROUTED(0.1s) → RUNNING(4.2s) → COMPLETED
→ s2: QUEUED(1s) → ROUTED(0.2s) → RUNNING(2.1s) → COMPLETED
→ s3: QUEUED(5s) → ROUTED(0.1s) → RUNNING(8.7s) → COMPLETED

3 active sessions | avg: 4.2s`,
  skills: `➜ mah skills list --agent a11y-specialist

→ 6 skills loaded:
  - web-research (compatibility: generic)
  - axe-audit (compatibility: a11y)
  - wcag-verify (compatibility: a11y)

→ active: 3 | pending: 0`,
  evidence: `➜ mah evidence show --agent a11y-specialist

→ routing_history: 47 calls
  avg_confidence: 0.91
  compounding_factor: 1.12 (improving)
  last_updated: 2h ago`,
  crew: `---
# meta-agents.yaml
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
---
mah · init`,
};

const layers = [
  {
    key: 'crew',
    name: 'Crew Definition',
    label: 'CREW DEFINITION',
    desc: 'Declare crews, agents, topology, and domain profiles in meta-agents.yaml. Foundation of the stack.',
    cli: 'mah init',
    color: '#A78BFA',
    glowColor: 'rgba(167,139,250,0.12)',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    key: 'skills',
    name: 'Skills',
    label: 'SKILLS',
    desc: 'Procedural behavior primitives. Reusable instruction sets that teach agents how to execute.',
    cli: 'mah skills list',
    color: '#74f5ff',
    glowColor: 'rgba(116,245,255,0.12)',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    key: 'policy',
    name: 'Policy',
    label: 'POLICY',
    desc: 'Bounds enforcement for routing decisions. Constrains which agents can be selected and where they can operate.',
    cli: 'mah policy check',
    color: '#94A3B8',
    glowColor: 'rgba(148,163,184,0.12)',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    key: 'sessions',
    name: 'Sessions',
    label: 'SESSIONS',
    desc: 'Persistent continuity across multi-agent workflows. Track state, handoffs, and audit trails.',
    cli: 'mah sessions list',
    color: '#2792ff',
    glowColor: 'rgba(39,146,255,0.12)',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    key: 'expertise',
    name: 'Expertise',
    label: 'EXPERTISE',
    desc: 'Capability matching + confidence scoring. Selects the right agent based on task-to-capability alignment.',
    cli: 'mah expertise recommend',
    color: '#00f2ff',
    glowColor: 'rgba(0,242,255,0.12)',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    key: 'evidence',
    name: 'Evidence',
    label: 'EVIDENCE',
    desc: 'Compounding signal from sessions. Evidence from past routing decisions strengthens future recommendations.',
    cli: 'mah evidence show',
    color: '#10B981',
    glowColor: 'rgba(16,185,129,0.12)',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
  {
    key: 'context',
    name: 'Context Memory',
    label: 'CONTEXT',
    desc: 'Bounded operational memory per execution. Loads only what the selected agent needs — nothing more.',
    cli: 'mah context find',
    color: '#ead2ff',
    glowColor: 'rgba(234,210,255,0.12)',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    key: 'provenance',
    name: 'Provenance',
    label: 'PROVENANCE',
    desc: 'Audit trail for every routing decision. Session history tracking with full traceability.',
    cli: 'mah provenance trace',
    color: '#F59E0B',
    glowColor: 'rgba(245,158,11,0.12)',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-3-4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
  }
];

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
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
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
      return <div key={i} className="font-mono text-[#b9cacb]/88">{line}</div>;
    }
    if (line.startsWith('➜')) {
      return <div key={i} className="text-[#00f2ff] font-mono">{line}</div>;
    }
    return <div key={i} className="font-mono">{line}</div>;
  });
}

interface LayerCardProps {
  layer: typeof layers[0];
  isActive: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
  onBlur: () => void;
  onClick: () => void;
}

function LayerCard({ layer, isActive, onActivate, onDeactivate, onBlur, onClick }: LayerCardProps) {
  return (
    <div className="flex flex-col">
      <div
        onMouseEnter={onActivate}
        onMouseLeave={onDeactivate}
        onBlur={onBlur}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
          }
        }}
        role="button"
        tabIndex={0}
        className="rounded-xl border-l-2 p-4 flex items-start gap-4 transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00f2ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1c1b1b]"
        style={{
          borderLeftColor: layer.color,
          background: isActive ? layer.glowColor : 'rgba(28,27,27,0.6)',
          boxShadow: isActive ? `0 0 24px ${layer.glowColor}` : 'none',
        }}
      >
        <div
          className="w-9 h-9 shrink-0 rounded-lg flex items-center justify-center mt-0.5"
          style={{ backgroundColor: `${layer.color}18`, color: layer.color }}
        >
          {layer.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-space-grotesk text-xs font-bold uppercase tracking-wider mb-1" style={{ color: layer.color }}>
            {layer.label}
          </div>
          <div className="font-inter text-sm font-bold text-[#e5e2e1] mb-1 leading-snug">{layer.name}</div>
          <div className="font-inter text-xs text-[#b9cacb] leading-relaxed line-clamp-2">{layer.desc}</div>
        </div>
        <div className="font-mono text-[11px] text-[#e5e2e1]/50 shrink-0 hidden sm:block self-center">
          {layer.cli}
        </div>
      </div>

      {/* Terminal expands below card */}
      <div
        className="overflow-hidden transition-all duration-300 ease-out"
        style={{
          maxHeight: isActive ? (layer.key === 'crew' ? 480 : 320) : 0,
          opacity: isActive ? 1 : 0,
        }}
      >
        <div className="mt-2 rounded-xl border border-[#3a494b]/30 bg-[#0e0e0e] p-4">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#3a494b]/20">
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ffb4ab]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#ffd27a]" />
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: layer.color }} />
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#b9cacb]/40">
              {layer.cli}
            </span>
          </div>
          <div
            className={`font-mono text-[12px] leading-5 text-[#b9cacb] max-h-[240px] overflow-y-auto ${layer.key === 'crew' ? 'max-h-[400px]' : ''}`}
            style={{ scrollbarColor: `${layer.color}40 #0e0e0e`, scrollbarGutter: 'stable' }}
          >
            {renderTerminalContent(terminalContent[layer.key] ?? '')}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ArchitectureSection() {
  const [activeLayer, setActiveLayer] = useState<string | null>(null);

  return (
    <section className="w-full py-16 px-5 md:py-[100px] md:px-[80px] flex flex-col items-center">
      {/* Header */}
      <div className="mb-[48px] w-full max-w-[1280px]">
        <span className="font-space-grotesk text-[#00f2ff] text-sm font-bold tracking-[0.2em] uppercase block mb-4">HOW IT WORKS</span>
        <h2 className="font-inter text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#e5e2e1]">
          From mission to result in three stages.
        </h2>
      </div>

      {/* Pipeline Visual */}
      <div className="relative flex flex-col md:flex-row items-start justify-center gap-[40px] md:gap-[120px] w-full max-w-[1280px] mb-20">
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

      {/* Intelligence Stack — Two-Column Grid with 8 Cards */}
      <div className="w-full max-w-[1280px]">
        {/* Column 1: Policy, Expertise, Context Memory, Provenance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          {layers.slice(0, 4).map((layer) => (
            <LayerCard
              key={layer.key}
              layer={layer}
              isActive={activeLayer === layer.key}
              onActivate={() => setActiveLayer(layer.key)}
              onDeactivate={() => setActiveLayer(null)}
              onBlur={() => setActiveLayer(null)}
              onClick={() => setActiveLayer(activeLayer === layer.key ? null : layer.key)}
            />
          ))}
        </div>

        {/* Column 2: Sessions, Skills, Evidence, Runtime Bridge */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mt-4">
          {layers.slice(4).map((layer) => (
            <LayerCard
              key={layer.key}
              layer={layer}
              isActive={activeLayer === layer.key}
              onActivate={() => setActiveLayer(layer.key)}
              onDeactivate={() => setActiveLayer(null)}
              onBlur={() => setActiveLayer(null)}
              onClick={() => setActiveLayer(activeLayer === layer.key ? null : layer.key)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}