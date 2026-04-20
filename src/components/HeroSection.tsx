import { useEffect, useMemo, useRef, useState } from 'react';

type LeadCard = {
  title: string;
  subtitle: string;
  status: string;
  task: string;
  accent: string;
};

type TranscriptBlock =
  | {
    kind: 'tool';
    command: string;
    lead: string;
    task: string;
    seconds: number;
    done: boolean;
    accent: string;
  }
  | {
    kind: 'response';
    paragraphs: string[];
    accent: string;
  };

const promptText = 'Generate the react components using the system design from Stitch MCP server';
const preludeCommand = 'mah --runtime pi run -c';
const toolTask = '## Task: Restore Hero Title Text and Colors (Obsidian Cipher palette)';
const runningSecondsGoal = 6;

const responseParagraphs = [
  'I can see the current state - the title, badge, and colors have all been changed from the Obsidian Cipher palette',
  '(cyan/blue) to a green/teal theme. Let me restore just the title text and colors without touching the terminal animation.',
];

const doneMessage = 'Done. Hero title restored and colors returned to the Obsidian Cipher palette.';

const leadCards: LeadCard[] = [
  {
    title: 'Planning Lead',
    subtitle: 'Lead · Planning',
    status: 'o idle',
    task: 'Planning Lead planning lead',
    accent: '#7bf5dc',
  },
  {
    title: 'Engineering Lead',
    subtitle: 'Lead · Engineering',
    status: '✓ done 40s',
    task: '## Task: Left-align Architecture...',
    accent: '#7fd1ff',
  },
  {
    title: 'Validation Lead',
    subtitle: 'Lead · Validation',
    status: '✓ done 23s',
    task: '## Quick Build Verification Run ...',
    accent: '#86f7e7',
  },
];

function ToolCard(props: Extract<TranscriptBlock, { kind: 'tool' }>) {
  const { command, lead, task, seconds, done, accent } = props;

  return (
    <div
      className="mb-4 rounded-[2px] border border-[#0f5d66]/70 bg-[#103236]/96 px-4 py-3 font-mono text-[12px] leading-5 text-[#f4fffd]"
      style={{
        boxShadow: 'inset 0 0 0 1px rgba(120, 242, 198, 0.08)',
      }}
    >
      <div className="truncate text-[#f4fffd]">
        <span className="text-[#00f2ff]">{command.split(' — ')[0]}</span>
        <span className="text-[#f4fffd]"> — </span>
        <span className="text-[#f4fffd]">{task}</span>
      </div>
      <div className="mt-1 flex items-center gap-2 text-[#f4fffd]">
        <span className="text-[#00f2ff]">{done ? '✓' : '●'}</span>
        <span style={{ color: accent }}>{lead}</span>
        <span className="text-[#f4fffd]/88">{done ? `${seconds}s` : `running ${seconds}s`}</span>
      </div>
      {!done ? <div className="mt-1 text-[#f4fffd]/82">working...</div> : null}
    </div>
  );
}

function ResponseCard(props: Extract<TranscriptBlock, { kind: 'response' }>) {
  const { paragraphs, accent } = props;

  return (
    <div className="mb-4 rounded-[2px] border border-[#3a494b]/28 bg-[#171717]/95 px-4 py-3 font-mono text-[13px] leading-6 text-[#e5e2e1]">
      <div className="mb-2 text-[11px] uppercase tracking-[0.24em]" style={{ color: accent }}>
        output
      </div>
      <div className="space-y-1">
        {paragraphs.map((paragraph) => (
          <p key={paragraph} className="whitespace-pre-wrap text-[#e5e2e1]/92">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}

function DoneCard({ message }: { message: string }) {
  return (
    <div className="mb-4 rounded-[2px] border border-[#3a494b]/28 bg-[#171717]/95 px-4 py-3 font-mono text-[13px] leading-6 text-[#e5e2e1]">
      <div className="flex items-center gap-2 text-[#00f2ff]">
        <span>✓</span>
        <span className="font-semibold">engineering-lead 6s</span>
      </div>
      <p className="mt-1 whitespace-pre-wrap text-[#e5e2e1]/92">{message}</p>
    </div>
  );
}

function LeadTile({ lead }: { lead: LeadCard }) {
  return (
    <div
      className="min-h-[112px] rounded-[2px] border border-[#b9cacb]/80 bg-[#171717]/92 px-4 py-3 font-mono text-[12px] leading-5 text-[#e5e2e1]"
      style={{
        boxShadow: 'inset 0 0 0 1px rgba(185, 202, 203, 0.08)',
      }}
    >
      <div className="text-[18px] font-semibold leading-6" style={{ color: '#00f2ff' }}>
        {lead.title}
      </div>
      <div className="text-[#e5e2e1]">{lead.subtitle}</div>
      <div className="text-[#7bf5dc]">{lead.status}</div>
      <div className="mt-1 truncate text-[#e5e2e1]/95">{lead.task}</div>
    </div>
  );
}

function ActiveLeadTile({
  lead,
  live,
  status,
  task,
}: {
  lead: LeadCard;
  live: boolean;
  status: string;
  task: string;
}) {
  return (
    <div
      className={`min-h-[112px] rounded-[2px] border px-4 py-3 font-mono text-[12px] leading-5 text-[#e5e2e1] transition-colors duration-300 ${live ? 'border-[#00f2ff]/80 bg-[#111a1b]/96' : 'border-[#b9cacb]/80 bg-[#171717]/92'
        }`}
      style={{
        boxShadow: live ? 'inset 0 0 0 1px rgba(0, 242, 255, 0.12)' : 'inset 0 0 0 1px rgba(185, 202, 203, 0.08)',
      }}
    >
      <div className="text-[18px] font-semibold leading-6" style={{ color: '#00f2ff' }}>
        {lead.title}
      </div>
      <div className="text-[#e5e2e1]">{lead.subtitle}</div>
      <div className="flex items-center gap-2 text-[#7bf5dc]">
        {live ? <span className="text-[#00f2ff] animate-pulse">●</span> : null}
        <span>{status}</span>
      </div>
      <div className="mt-1 truncate text-[#e5e2e1]/95">{task}</div>
    </div>
  );
}

export default function HeroSection() {
  const transcriptRef = useRef<HTMLDivElement | null>(null);
  const preludeRef = useRef<HTMLDivElement | null>(null);
  const [cycleId, setCycleId] = useState(0);

  const sessionId = useMemo(() => {
    const now = new Date();
    const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let hash = '';
    for (let i = 0; i < 6; i++) {
      hash += chars[Math.floor(Math.random() * chars.length)];
    }
    return `${date}-${hash}`;
  }, []);
  const [showPrelude, setShowPrelude] = useState(true);
  const [preludeTyped, setPreludeTyped] = useState('');
  const [mainReady, setMainReady] = useState(false);
  const [typedPrompt, setTypedPrompt] = useState('');
  const [phaseIndex, setPhaseIndex] = useState<number | null>(null);
  const [toolSeconds, setToolSeconds] = useState(0);
  const [responseCount, setResponseCount] = useState(0);
  const [history, setHistory] = useState<TranscriptBlock[]>([]);
  const engineeringLeadLive = phaseIndex === 0;
  const engineeringLeadStatus = engineeringLeadLive ? `running ${toolSeconds}s` : `✓ done ${runningSecondsGoal}s`;
  const engineeringLeadTask = engineeringLeadLive ? toolTask : leadCards[1].task;

  useEffect(() => {
    let cancelled = false;
    const commandChars = [...preludeCommand];
    let charIndex = 0;
    const timers: number[] = [];

    setShowPrelude(true);
    setPreludeTyped('');
    setMainReady(false);

    const introTimer = window.setInterval(() => {
      if (cancelled) return;

      charIndex += 1;
      setPreludeTyped(commandChars.slice(0, charIndex).join(''));

      if (charIndex >= commandChars.length) {
        window.clearInterval(introTimer);
        timers.push(
          window.setTimeout(() => {
            if (cancelled) return;
            setShowPrelude(false);
            setMainReady(true);
          }, 1100),
        );
      }
    }, 46);

    return () => {
      cancelled = true;
      window.clearInterval(introTimer);
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  useEffect(() => {
    if (!mainReady) return;

    let cancelled = false;
    const timers: number[] = [];
    const promptChars = [...promptText];
    let promptIndex = 0;

    setTypedPrompt('');
    setPhaseIndex(null);
    setToolSeconds(0);
    setResponseCount(0);
    setHistory([]);

    const promptTimer = window.setInterval(() => {
      if (cancelled) return;

      promptIndex += 1;
      setTypedPrompt(promptChars.slice(0, promptIndex).join(''));

      if (promptIndex >= promptChars.length) {
        window.clearInterval(promptTimer);
        timers.push(
          window.setTimeout(() => {
            if (!cancelled) setPhaseIndex(0);
          }, 350),
        );
      }
    }, 22);

    return () => {
      cancelled = true;
      window.clearInterval(promptTimer);
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [cycleId, mainReady]);

  useEffect(() => {
    if (!mainReady) return;

    if (phaseIndex === null) return;

    let cancelled = false;
    const timers: number[] = [];

    if (phaseIndex === 0) {
      setToolSeconds(0);
      let finished = false;
      const tick = window.setInterval(() => {
        if (cancelled || finished) return;

        setToolSeconds((prev) => {
          const next = prev + 1;
          if (next >= runningSecondsGoal && !finished) {
            finished = true;
            window.clearInterval(tick);
            timers.push(
              window.setTimeout(() => {
                if (cancelled) return;
                setHistory((prevHistory) => [
                  ...prevHistory,
                  {
                    kind: 'tool',
                    command: `delegate_agent engineering-lead — ${toolTask}`,
                    lead: 'engineering-lead',
                    task: toolTask,
                    seconds: runningSecondsGoal,
                    done: true,
                    accent: '#7fd1ff',
                  },
                ]);
                setPhaseIndex(1);
              }, 500),
            );
          }
          return next;
        });
      }, 780);

      return () => {
        cancelled = true;
        window.clearInterval(tick);
        timers.forEach((timer) => window.clearTimeout(timer));
      };
    }

    if (phaseIndex === 1) {
      setResponseCount(0);
      let finished = false;
      const tick = window.setInterval(() => {
        if (cancelled || finished) return;

        setResponseCount((prev) => {
          const next = Math.min(prev + 1, responseParagraphs.length);
          if (next >= responseParagraphs.length && !finished) {
            finished = true;
            window.clearInterval(tick);
            timers.push(
              window.setTimeout(() => {
                if (cancelled) return;
                setHistory((prevHistory) => [
                  ...prevHistory,
                  {
                    kind: 'response',
                    paragraphs: responseParagraphs,
                    accent: '#7bf5dc',
                  },
                ]);
                setPhaseIndex(2);
              }, 500),
            );
          }
          return next;
        });
      }, 820);

      return () => {
        cancelled = true;
        window.clearInterval(tick);
        timers.forEach((timer) => window.clearTimeout(timer));
      };
    }

    const doneTimer = window.setTimeout(() => {
      if (cancelled) return;
      timers.push(
        window.setTimeout(() => {
          if (!cancelled) setCycleId((value) => value + 1);
        }, 1500),
      );
    }, 500);

    return () => {
      cancelled = true;
      window.clearTimeout(doneTimer);
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [phaseIndex, mainReady]);

  useEffect(() => {
    if (!mainReady) return;

    const viewport = transcriptRef.current;
    if (!viewport) return;

    const raf = window.requestAnimationFrame(() => {
      viewport.scrollTop = viewport.scrollHeight;
    });

    return () => window.cancelAnimationFrame(raf);
  }, [history, typedPrompt, phaseIndex, toolSeconds, responseCount, mainReady]);

  const activeBlock =
    phaseIndex === 0 ? (
      <ToolCard
        command={`delegate_agent engineering-lead — ${toolTask}`}
        lead="engineering-lead"
        task={toolTask}
        seconds={toolSeconds}
        done={false}
        accent="#7fd1ff"
        kind="tool"
      />
    ) : phaseIndex === 1 ? (
      <ResponseCard
        paragraphs={responseParagraphs.slice(0, responseCount)}
        accent="#7bf5dc"
        kind="response"
      />
    ) : phaseIndex === 2 ? (
      <DoneCard message={doneMessage} />
    ) : null;

  return (
    <section className="relative w-full max-w-[1280px] mx-auto px-6 py-[24px] md:px-10 lg:px-20">
      <div className="mx-auto flex max-w-[860px] flex-col items-center gap-10">
        <div className="flex max-w-[760px] flex-col items-center text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#3a494b]/28 bg-[#1a1a1a]/82 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.24em] text-[#b9cacb]">
            <span className="h-2 w-2 rounded-full bg-[#00f2ff] shadow-[0_0_12px_rgba(0,242,255,0.75)]" />
            runtime-agnostic · multi-agent orchestration
          </div>

          <h1 className="max-w-[760px] font-inter text-[2.65rem] font-semibold tracking-tight text-[#e5e2e1] md:text-[4.2rem] md:leading-[1.02]">
            The Multi-Agent {' '}
            <span className="bg-gradient-to-r from-[#00f2ff] to-[#7a8cff] bg-clip-text text-transparent">
              Orchestration Layer
            </span>
          </h1>

          <p className="mt-5 max-w-[820px] font-inter text-base leading-7 text-[#b9cacb] md:text-lg">
            Define crews, route work, inspect sessions, and ship agentic systems with a CLI-first
            observable workflow that delivers.
          </p>
        </div>

        <div className="relative w-full overflow-visible">
          <div className="pointer-events-none absolute inset-[-24px] rounded-[36px] bg-[radial-gradient(circle_at_50%_52%,rgba(0,242,255,0.26)_0%,rgba(0,242,255,0.18)_26%,rgba(39,146,255,0.12)_52%,rgba(39,146,255,0.06)_68%,transparent_88%)] blur-[52px] opacity-95" />
          <div className="pointer-events-none absolute inset-[-10px] rounded-[32px] bg-[radial-gradient(circle_at_50%_52%,rgba(0,242,255,0.16)_0%,rgba(39,146,255,0.09)_40%,rgba(39,146,255,0.04)_62%,transparent_84%)] blur-3xl opacity-80" />
          <div className="flex flex-col gap-4">
            <div
              ref={preludeRef}
              className={`relative w-full overflow-hidden rounded-[22px] border border-[#3a494b]/28 bg-[#111111] shadow-[0_18px_42px_rgba(0,0,0,0.34)] transition-all duration-700 ${showPrelude ? 'max-h-[160px] opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
              <div className="flex items-center justify-between border-b border-[#3a494b]/20 px-4 py-2">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ffb4ab]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ffd27a]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#00f2ff]" />
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#b9cacb]/70">
                  mah · pi runtime
                </div>
              </div>
              <div className="px-4 py-6 font-mono text-[16px] leading-8 text-[#e5e2e1]">
                <span className="text-[#00f2ff]">$ </span>
                <span className="text-[#e5e2e1]">{preludeTyped}</span>
                <span className="ml-1 inline-block h-5 w-[9px] animate-pulse bg-[#00f2ff]" />
              </div>
            </div>

            <div
              className={`relative w-full overflow-hidden rounded-[28px] border border-[#3a494b]/28 bg-[#171717] shadow-[0_28px_90px_rgba(0,0,0,0.42)] transition-all duration-700 ${mainReady ? 'opacity-100' : 'opacity-0'
                }`}
              style={{
                height: window.innerWidth < 768 ? 'clamp(520px, 88vh, 720px)' : 'clamp(420px, 65vh, 720px)',
              }}
            >
              <div className="flex items-center justify-between border-b border-[#3a494b]/28 px-5 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ffb4ab]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ffd27a]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#00f2ff]" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-16 rounded-full bg-gradient-to-r from-[#00f2ff] via-[#2792ff] to-transparent opacity-80" />
                  <span className="h-1.5 w-3 rounded-full bg-[#00f2ff]/80" />
                </div>
              </div>

              <div className="grid h-[calc(100%-48px)] grid-rows-[minmax(0,1fr)_auto]">
                <div
                  ref={transcriptRef}
                  className="min-h-0 overflow-y-scroll px-5 py-5 font-mono text-[13px] leading-6 text-[#e5e2e1]"
                  style={{
                    scrollbarGutter: 'stable',
                    scrollbarColor: '#00f2ff #171717',
                  }}
                >
                  {history.map((entry, index) =>
                    entry.kind === 'tool' ? (
                      <ToolCard key={`${entry.kind}-${index}`} {...entry} kind="tool" />
                    ) : (
                      <ResponseCard key={`${entry.kind}-${index}`} {...entry} kind="response" />
                    ),
                  )}

                  {activeBlock}
                </div>

                <div className="shrink-0 border-t border-[#3a494b]/28 bg-[#171717]/96 px-5 py-4">
                  <div className="mb-4 h-px w-full bg-gradient-to-r from-[#00f2ff] via-[#2792ff] to-transparent opacity-50" />

                  <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                    {leadCards
                      .filter((lead) => typeof window !== 'undefined' && window.innerWidth < 768 ? lead.title === 'Engineering Lead' : true)
                      .map((lead) =>
                        lead.title === 'Engineering Lead' ? (
                          <ActiveLeadTile
                            key={lead.title}
                            lead={lead}
                            live={engineeringLeadLive}
                            status={engineeringLeadStatus}
                            task={engineeringLeadTask}
                          />
                        ) : (
                          <LeadTile key={lead.title} lead={lead} />
                        ),
                      )}
                  </div>

                  <div className="mt-4 rounded-[2px] border border-[#3a494b]/28 bg-[#121212] px-4 py-3 font-mono text-sm text-[#e5e2e1]">
                    <div className="mb-1 text-[11px] uppercase tracking-[0.24em] text-[#b9cacb]">
                      prompt
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#00f2ff]">›</span>
                      <span className="text-[#e5e2e1]/86">{typedPrompt}</span>
                      <span className="inline-block h-4 w-[8px] animate-pulse bg-[#00f2ff]" />
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.24em] text-[#b9cacb]">
                    <span>glm-5 · orchestrator · {sessionId}</span>
                    <span>10.4m in 143.1k out $7.886 crew · [####----] 33%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
