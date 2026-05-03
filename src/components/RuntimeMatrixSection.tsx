import { useEffect, useState } from 'react';

type CapabilityState = 'yes' | 'partial' | 'no';

type Runtime = {
  name: string;
  accent: string;
  capabilities: {
    interactive: CapabilityState;
    headless: CapabilityState;
    policy: CapabilityState;
    continuity: CapabilityState;
    crews: CapabilityState;
  };
  summary: string;
  profile: string;
  bestFor: string;
  command: string;
  notes: string[];
};

const runtimes: Runtime[] = [
  {
    name: 'pi',
    accent: '#2792ff',
    capabilities: { interactive: 'yes', headless: 'yes', policy: 'yes', continuity: 'yes', crews: 'yes' },
    summary: 'Default orchestration runtime with balanced support across planning, execution, and review.',
    profile: 'Good fit for production pipelines and operator-guided runs.',
    bestFor: 'Full-session orchestration baseline',
    command: 'mah run --runtime pi --task "ship webui panel"',
    notes: [
      'Full MAH session flow: new, continue, and no-session modes are available.',
      'Full replay support exists in the canonical sessions bridge.',
    ],
  },
  {
    name: 'openclaude',
    accent: '#00f2ff',
    capabilities: { interactive: 'yes', headless: 'yes', policy: 'yes', continuity: 'partial', crews: 'yes' },
    summary: 'Open operator flow with parity for routing semantics and cooperative crews.',
    profile: 'Good fit for cross-crew triage and visible operator sessions.',
    bestFor: 'Operator-visible cooperative routing',
    command: 'mah --runtime openclaude run --full-crews --task "cross-crew triage"',
    notes: [
      'Resume-aware sessions via `--resume`, but no MAH-managed `new session` flow.',
      'Native headless path is supported through the OpenClaude adapter.',
    ],
  },
  {
    name: 'claude',
    accent: '#ead2ff',
    capabilities: { interactive: 'yes', headless: 'yes', policy: 'yes', continuity: 'partial', crews: 'yes' },
    summary: 'Strong continuity and high-signal handoffs for long-lived agent sessions.',
    profile: 'Good fit for session resume, provenance replay, and bounded memory flows.',
    bestFor: 'Resume-heavy continuity workflows',
    command: 'mah sessions resume --runtime claude --last',
    notes: [
      'Supports session resume, but not `mah sessions new` through the MAH adapter.',
      'Headless execution is native via `-p` in the Claude path.',
    ],
  },
  {
    name: 'hermes',
    accent: '#7bf5dc',
    capabilities: { interactive: 'yes', headless: 'partial', policy: 'yes', continuity: 'yes', crews: 'yes' },
    summary: 'Fast coordination loops for short-lived orchestration with policy still enforced.',
    profile: 'Good fit for planning passes and constrained review loops.',
    bestFor: 'Fast bounded planning loops',
    command: 'mah run --runtime hermes --task "draft planning diff"',
    notes: [
      'Headless exists, but requires an active session and returns mixed output.',
      'Supports both new and continue session flows in MAH.',
    ],
  },
  {
    name: 'opencode',
    accent: '#f6d74a',
    capabilities: { interactive: 'yes', headless: 'yes', policy: 'yes', continuity: 'partial', crews: 'yes' },
    summary: 'Operator-visible runtime focused on interactive review and collaborative debugging.',
    profile: 'Good fit for console-guided execution and manual intervention.',
    bestFor: 'Interactive debug-first sessions',
    command: 'mah run --runtime opencode --task "debug routing confidence"',
    notes: [
      'Session resume is supported, but MAH does not expose `new session` for this adapter.',
      'Headless uses the native `run` subcommand.',
    ],
  },
  {
    name: 'kilo',
    accent: '#8ab4ff',
    capabilities: { interactive: 'yes', headless: 'yes', policy: 'yes', continuity: 'yes', crews: 'yes' },
    summary: 'Minimal headless execution path where policy and continuity matter more than UI affordances.',
    profile: 'Good fit for background jobs and narrow CI automation.',
    bestFor: 'Lean headless CI automation',
    command: 'mah run --runtime kilo --task "nightly evidence sync"',
    notes: [
      'Kilo adapter supports new session, continue, export, and delete flows.',
      'Crew activation and generated crew prompts are handled by the MAH core path.',
    ],
  },
];

function CapabilityCell({ state, accent }: { state: CapabilityState; accent: string }) {
  const palette =
    state === 'yes'
      ? { label: 'Y', bg: `${accent}22`, fg: accent }
      : state === 'partial'
        ? { label: 'P', bg: 'rgba(246,215,74,0.12)', fg: '#f6d74a' }
        : { label: 'N', bg: 'rgba(255,255,255,0.04)', fg: 'rgba(229,226,225,0.45)' };

  return (
    <div
      className="mx-auto flex h-7 w-7 items-center justify-center rounded-full font-space-grotesk text-[10px] uppercase tracking-[0.16em]"
      style={{
        backgroundColor: palette.bg,
        color: palette.fg,
      }}
    >
      {palette.label}
    </div>
  );
}

export default function RuntimeMatrixSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % runtimes.length);
    }, 2600);

    return () => window.clearInterval(timer);
  }, []);

  const activeRuntime = runtimes[activeIndex];

  return (
    <section className="relative mx-auto w-full max-w-[1520px] px-6 py-16 md:px-10 md:py-[100px] lg:px-16 xl:px-12">
      <div className="grid gap-8 lg:grid-cols-[1.08fr_0.98fr] xl:grid-cols-[1.2fr_1fr]">
        <div>
          <span className="mb-4 block font-space-grotesk text-sm font-medium uppercase tracking-[0.2em] text-[#2792ff]">
            RUNTIME-AGNOSTIC EXECUTION
          </span>
          <h2 className="font-inter text-3xl font-bold tracking-tight text-[#e5e2e1] md:text-5xl">
            One orchestration model across multiple runtimes.
          </h2>
          <p className="mt-5 max-w-[640px] text-base leading-7 text-[#b9cacb] md:text-lg">
            Same operational model, different runtimes. Routing, policy, and bounded context stay consistent.
          </p>

          <div className="mt-8 overflow-hidden rounded-[30px] bg-[#171717] p-4 shadow-[0_24px_72px_rgba(0,0,0,0.32)]">
            <div className="grid grid-cols-[1.4fr_repeat(5,minmax(0,1fr))] gap-2 border-b border-[#3a494b]/16 pb-3 font-space-grotesk text-[10px] uppercase tracking-[0.2em] text-[#b9cacb]/58">
              <div>Runtime</div>
              <div className="text-center">Interactive</div>
              <div className="text-center">Headless</div>
              <div className="text-center">Policy</div>
              <div className="text-center">Continuity</div>
              <div className="text-center">Crews</div>
            </div>

            <div className="mt-3 space-y-2 font-mono text-sm">
              {runtimes.map((runtime, index) => {
                const active = index === activeIndex;
                return (
                  <button
                    key={runtime.name}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`grid w-full grid-cols-[1.4fr_repeat(5,minmax(0,1fr))] items-center gap-2 rounded-[20px] px-3 py-3 text-left transition-all duration-300 ${active ? 'bg-[#1c1b1b]' : 'bg-[#131313] hover:bg-[#1a1a1a]'
                      }`}
                  >
                    <div>
                      <div className="text-[15px] font-semibold" style={{ color: runtime.accent }}>
                        {runtime.name}
                      </div>
                      <div className="mt-1 text-[11px] text-[#b9cacb]/62">{runtime.bestFor}</div>
                    </div>
                    <CapabilityCell state={runtime.capabilities.interactive} accent={runtime.accent} />
                    <CapabilityCell state={runtime.capabilities.headless} accent={runtime.accent} />
                    <CapabilityCell state={runtime.capabilities.policy} accent={runtime.accent} />
                    <CapabilityCell state={runtime.capabilities.continuity} accent={runtime.accent} />
                    <CapabilityCell state={runtime.capabilities.crews} accent={runtime.accent} />
                  </button>
                );
              })}
            </div>

            <div className="mt-4 flex flex-wrap gap-3 font-space-grotesk text-[10px] uppercase tracking-[0.18em] text-[#b9cacb]/58">
              <span className="rounded-full bg-[#111111] px-3 py-1">Y = full support</span>
              <span className="rounded-full bg-[#111111] px-3 py-1">P = conditional or resume-only</span>
              <span className="rounded-full bg-[#111111] px-3 py-1">N = unavailable</span>
            </div>
          </div>
        </div>

        <div className="space-y-4 lg:pt-[239px]">
          <div className="rounded-[30px] bg-[#171717] p-6 shadow-[0_24px_72px_rgba(0,0,0,0.3)]">
            <div className="mb-2 font-space-grotesk text-[10px] uppercase tracking-[0.2em]" style={{ color: activeRuntime.accent }}>
              Active runtime
            </div>
            <div className="text-2xl font-semibold text-[#e5e2e1]">{activeRuntime.name}</div>
            <p className="mt-4 text-sm leading-7 text-[#b9cacb]">{activeRuntime.summary}</p>
            <p className="mt-3 rounded-[18px] bg-[#111111] px-4 py-4 text-sm leading-6 text-[#e5e2e1]/82">
              {activeRuntime.profile}
            </p>

            <div className="mt-4 rounded-[18px] bg-[#111111] px-4 py-4">
              <div className="mb-2 font-space-grotesk text-[10px] uppercase tracking-[0.18em] text-[#b9cacb]/56">
                Runtime feature
              </div>
              <div className="space-y-2 text-sm leading-6 text-[#b9cacb]">
                {activeRuntime.notes.map((note) => (
                  <p key={note}>{note}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
