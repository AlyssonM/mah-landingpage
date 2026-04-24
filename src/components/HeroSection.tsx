import { useEffect, useMemo, useRef, useState, type RefObject } from 'react';

type TranscriptBlock =
  | {
      kind: 'command';
      command: string;
      description: string;
    }
  | {
      kind: 'routing';
      lines: string[];
      accent: string;
    }
  | {
      kind: 'context';
      lines: string[];
      accent: string;
    }
  | {
      kind: 'streaming';
      content: string;
      accent: string;
    }
  | {
      kind: 'lifecycle';
      lines: string[];
      accent: string;
    };

const commandLine = 'mah expertise explain --task "restore hero title and colors"';
const commandDescription = 'Query routing recommendation';

const routingLines = [
  '→ routing to: engineering-lead',
  '→ confidence: 0.93 | match: expertise(routing) + context(deps)',
  '→ 3 agents considered, 1 selected',
];

const contextLines = [
  '→ context loaded: 2 memories (relevance 0.88)',
  '→ bounded: no task-level state carried over',
  '→ operational memory: .mah/context/operational/',
];

const streamingContent = `{
  "task": "restore hero title and colors",
  "agent": "engineering-lead",
  "actions": [
    { "step": 1, "op": "read", "target": "HeroSection.tsx" },
    { "step": 2, "op": "patch", "field": "badge.text", "value": "runtime-agnostic · operational intelligence" },
    { "step": 3, "op": "patch", "field": "title.color", "value": "from-[#00f2ff] to-[#7a8cff]" },
    { "step": 4, "op": "verify", "check": "palette-cyan-blue" }
  ],
  "status": "completed",
  "duration_ms": 4120
}`;

const lifecycleLines = [
  '→ queued → routed → running → completed',
  '→ execution visible: 4s total, 0 retries',
  '→ session saved: mah sessions list --last',
];

const transcriptSequence: TranscriptBlock[] = [
  { kind: 'command', command: commandLine, description: commandDescription },
  { kind: 'routing', lines: routingLines, accent: '#00f2ff' },
  { kind: 'context', lines: contextLines, accent: '#7bf5dc' },
  { kind: 'streaming', content: streamingContent, accent: '#ead2ff' },
  { kind: 'lifecycle', lines: lifecycleLines, accent: '#86f7e7' },
];

function CommandCard(props: { command: string; description: string }) {
  return (
    <div className="mb-4 rounded-[2px] border border-[#0f5d66]/70 bg-[#103236]/96 px-4 py-3 font-mono text-[12px] leading-5 text-[#f4fffd]">
      <div className="mb-1 text-[11px] uppercase tracking-[0.24em] text-[#00f2ff]">input</div>
      <div className="truncate text-[#f4fffd]">{props.command}</div>
      <div className="mt-1 text-[#f4fffd]/70">{props.description}</div>
    </div>
  );
}

function RoutingCard(props: { lines: string[]; accent: string }) {
  return (
    <div className="mb-4 rounded-[2px] border border-[#3a494b]/28 bg-[#171717]/95 px-4 py-3 font-mono text-[13px] leading-6 text-[#e5e2e1]">
      <div className="mb-2 text-[11px] uppercase tracking-[0.24em]" style={{ color: props.accent }}>
        routing
      </div>
      <div className="space-y-0.5">
        {props.lines.map((line, i) => (
          <div key={i} className="text-[#b9cacb]/88">{line}</div>
        ))}
      </div>
    </div>
  );
}

function ContextCard(props: { lines: string[]; accent: string }) {
  return (
    <div className="mb-4 rounded-[2px] border border-[#3a494b]/28 bg-[#171717]/95 px-4 py-3 font-mono text-[13px] leading-6 text-[#e5e2e1]">
      <div className="mb-2 text-[11px] uppercase tracking-[0.24em]" style={{ color: props.accent }}>
        context
      </div>
      <div className="space-y-0.5">
        {props.lines.map((line, i) => (
          <div key={i} className="text-[#b9cacb]/88">{line}</div>
        ))}
      </div>
    </div>
  );
}

function StreamingCard(props: {
  content: string;
  accent: string;
  onComplete?: () => void;
  scrollContainerRef?: RefObject<HTMLDivElement | null>;
}) {
  const [displayed, setDisplayed] = useState('');
  const completedRef = useRef(false);
  const onCompleteCalledRef = useRef(false);

  useEffect(() => {
    setDisplayed('');
    completedRef.current = false;
    onCompleteCalledRef.current = false;
    let index = 0;
    const chars = props.content.split('');

    const tick = () => {
      if (index < chars.length) {
        setDisplayed(chars.slice(0, index + 1).join(''));
        index++;
        const container = props.scrollContainerRef?.current;
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      } else if (!completedRef.current) {
        completedRef.current = true;
        if (!onCompleteCalledRef.current) {
          onCompleteCalledRef.current = true;
          setTimeout(() => {
            props.onComplete?.();
          }, 50);
        }
      }
    };


    const interval = setInterval(tick, 10);
    return () => clearInterval(interval);
  }, [props.content, props.scrollContainerRef]);

  const isComplete = completedRef.current;

  return (
    <div className="mb-4 rounded-[2px] border border-[#3a494b]/28 bg-[#171717]/95 px-4 py-3 font-mono text-[13px] leading-5 text-[#e5e2e1]">
      <div className="mb-2 text-[11px] uppercase tracking-[0.24em]" style={{ color: props.accent }}>
        output
      </div>
      <pre className="whitespace-pre-wrap break-all text-[#b9cacb]/88">
        {displayed}
        {!isComplete && <span className="animate-pulse">▋</span>}
      </pre>
      {isComplete && (
        <div className="mt-2 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />
          <span className="text-[10px] uppercase tracking-widest text-[#10B981]/70">complete</span>
        </div>
      )}
    </div>
  );
}

function LifecycleCard(props: { lines: string[]; accent: string }) {
  return (
    <div className="mb-4 rounded-[2px] border border-[#3a494b]/28 bg-[#171717]/95 px-4 py-3 font-mono text-[13px] leading-6 text-[#e5e2e1]">
      <div className="mb-2 text-[11px] uppercase tracking-[0.24em]" style={{ color: props.accent }}>
        lifecycle
      </div>
      <div className="space-y-0.5">
        {props.lines.map((line, i) => (
          <div key={i} className="text-[#b9cacb]/88">{line}</div>
        ))}
      </div>
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
  const [history, setHistory] = useState<TranscriptBlock[]>([]);
  const [streamingDone, setStreamingDone] = useState(false);
  const promptText = 'Generate the react components using the system design from Stitch MCP server';
  const preludeCommand = 'mah --runtime pi run -c';

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
          }, 700),
        );
      }
    }, 40);

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
          }, 200),
        );
      }
    }, 18);

    return () => {
      cancelled = true;
      window.clearInterval(promptTimer);
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [cycleId, mainReady]);

  useEffect(() => {
    if (!mainReady) return;
    if (phaseIndex === null) return;
    if (phaseIndex >= transcriptSequence.length) {
      const doneTimer = window.setTimeout(() => {
        setCycleId((v) => v + 1);
      }, 1200);
      return () => {
        window.clearTimeout(doneTimer);
      };
    }

    const block = transcriptSequence[phaseIndex];

    // Lifecycle block must wait for streaming to complete
    if (block.kind === 'lifecycle' && !streamingDone) {
      const retryTimer = window.setTimeout(() => {
        setPhaseIndex((prev) => prev);
      }, 100);
      return () => window.clearTimeout(retryTimer);
    }

    let delay = 550;
    if (block.kind === 'lifecycle') {
      delay = 500;
    } else if (block.kind === 'streaming') {
      delay = 400;
    }

    const timer = window.setTimeout(() => {
      setHistory((prev) => [...prev, block]);
      if (block.kind === 'streaming') {
        setStreamingDone(false); // reset so lifecycle waits
      }
      setPhaseIndex((prev) => (prev !== null ? prev + 1 : null));
    }, delay);

    return () => window.clearTimeout(timer);
  }, [phaseIndex, mainReady, streamingDone]);

  // Keep only the terminal transcript scrolled, never the whole page.
  useEffect(() => {
    if (!mainReady) return;
    const container = transcriptRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [history.length, streamingDone, mainReady]);

  return (
    <section className="relative w-full max-w-[1280px] mx-auto px-6 py-[24px] md:px-10 lg:px-20">
      <div className="mx-auto flex max-w-[860px] flex-col items-center gap-10">
        <div className="flex max-w-[760px] flex-col items-center text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#3a494b]/28 bg-[#1a1a1a]/82 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.24em] text-[#b9cacb]">
            <span className="h-2 w-2 rounded-full bg-[#00f2ff] shadow-[0_0_12px_rgba(0,242,255,0.75)]" />
            runtime-agnostic · operational intelligence
          </div>

          <h1 className="max-w-[760px] font-inter text-[2.65rem] font-semibold tracking-tight text-[#e5e2e1] md:text-[4.2rem] md:leading-[1.02]">
            Operational Intelligence for{' '}
            <span className="bg-gradient-to-r from-[#00f2ff] to-[#7a8cff] bg-clip-text text-transparent">
              Agent Runtimes
            </span>
          </h1>

          <p className="mt-5 max-w-[820px] font-inter text-base leading-7 text-[#b9cacb] md:text-lg">
            MAH selects the right agent based on expertise. Loads bounded context. Makes execution visible.
          </p>
        </div>

        <div className="relative w-full overflow-visible">
          <div className="pointer-events-none absolute inset-[-24px] rounded-[36px] bg-[radial-gradient(circle_at_50%_52%,rgba(0,242,255,0.26)_0%,rgba(0,242,255,0.18)_26%,rgba(39,146,255,0.12)_52%,rgba(39,146,255,0.06)_68%,transparent_88%)] blur-[52px] opacity-95" />
          <div className="pointer-events-none absolute inset-[-10px] rounded-[32px] bg-[radial-gradient(circle_at_50%_52%,rgba(0,242,255,0.16)_0%,rgba(39,146,255,0.09)_40%,rgba(39,146,255,0.04)_62%,transparent_84%)] blur-3xl opacity-80" />
          <div className="flex flex-col gap-4">
            <div
              ref={preludeRef}
              className={`relative w-full overflow-hidden rounded-[22px] border border-[#3a494b]/28 bg-[#111111] shadow-[0_18px_42px_rgba(0,0,0,0.34)] transition-all duration-700 ${showPrelude ? 'max-h-[160px] opacity-100' : 'max-h-0 opacity-0'}`}
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
              className={`relative w-full overflow-hidden rounded-[28px] border border-[#3a494b]/28 bg-[#171717] shadow-[0_28px_90px_rgba(0,0,0,0.42)] transition-all duration-700 ${mainReady ? 'opacity-100' : 'opacity-0'}`}
              style={{
                height: typeof window !== 'undefined' && window.innerWidth < 768
                  ? 'clamp(520px, 88vh, 720px)'
                  : 'clamp(420px, 65vh, 720px)',
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
                  className="min-h-0 overflow-y-auto px-5 py-5 font-mono text-[13px] leading-6 text-[#e5e2e1]"
                  style={{
                    scrollbarGutter: 'stable',
                    scrollbarColor: '#00f2ff #171717',
                  }}
                >
                  {history.map((entry, index) => {
                    if (entry.kind === 'command') {
                      return <CommandCard key={index} command={entry.command} description={entry.description} />;
                    }
                    if (entry.kind === 'routing') {
                      return <RoutingCard key={index} lines={entry.lines} accent={entry.accent} />;
                    }
                    if (entry.kind === 'context') {
                      return <ContextCard key={index} lines={entry.lines} accent={entry.accent} />;
                    }
                    if (entry.kind === 'streaming') {
                      return (
                        <StreamingCard
                          key={index}
                          content={entry.content}
                          accent={entry.accent}
                          onComplete={() => setStreamingDone(true)}
                          scrollContainerRef={transcriptRef}
                        />
                      );
                    }
                    if (entry.kind === 'lifecycle') {
                      return <LifecycleCard key={index} lines={entry.lines} accent={entry.accent} />;
                    }
                    return null;
                  })}
                </div>

                <div className="shrink-0 border-t border-[#3a494b]/28 bg-[#171717]/96 px-5 py-4">
                  <div className="mb-4 h-px w-full bg-gradient-to-r from-[#00f2ff] via-[#2792ff] to-transparent opacity-50" />

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
