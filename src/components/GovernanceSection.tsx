import { useEffect, useState } from 'react';

const policyRail = [
  'Policy gate checked before agent selection',
  'Expertise routing constrained to allowed crews',
  'Bounded context loaded only for the chosen task',
  'Attribution and provenance persisted for replay',
];

const provenanceEvents = [
  { time: 't+0.0s', event: 'session created', accent: '#00f2ff' },
  { time: 't+0.2s', event: 'policy checked → allowed', accent: '#7bf5dc' },
  { time: 't+0.4s', event: 'expertise routing → planning-lead', accent: '#2792ff' },
  { time: 't+0.8s', event: 'context loaded → bounded memory set', accent: '#ead2ff' },
  { time: 't+1.6s', event: 'evidence attached → provenance updated', accent: '#f6d74a' },
];

const contextModules = [
  {
    title: 'Policy rail',
    copy: 'Keeps routing and tool access inside the allowed operating envelope.',
    accent: '#00f2ff',
  },
  {
    title: 'Evidence loop',
    copy: 'Turns outcomes into future routing signal instead of isolated logs.',
    accent: '#7bf5dc',
  },
  {
    title: 'Provenance trace',
    copy: 'Captures who acted, why they were selected, and what changed.',
    accent: '#f6d74a',
  },
  {
    title: 'Context + cooperation',
    copy: 'Lets `--full-crews` expand the reachable pool without losing policy or attribution.',
    accent: '#ead2ff',
  },
];

export default function GovernanceSection() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveStep((current) => (current + 1) % provenanceEvents.length);
    }, 2600);

    return () => window.clearInterval(timer);
  }, []);

  const evidenceScore = 78 + activeStep * 4;
  const activeModule = contextModules[activeStep % contextModules.length];

  return (
    <section className="relative mx-auto w-full max-w-[1440px] px-6 py-16 md:px-10 md:py-[100px] lg:px-20">
      <div className="grid gap-8 lg:grid-cols-[0.88fr_1.3fr]">
        <div className="max-w-[520px]">
          <span className="mb-4 block font-space-grotesk text-sm font-medium uppercase tracking-[0.2em] text-[#ead2ff]">
            GOVERNANCE &amp; EVIDENCE
          </span>
          <h2 className="font-inter text-3xl font-bold tracking-tight text-[#e5e2e1] md:text-5xl">
            Execution stays visible, bounded, and cumulative.
          </h2>
          <p className="mt-5 text-base leading-7 text-[#b9cacb] md:text-lg">
            Every run is visible, bounded, attributable, and better than the one before it.
          </p>
          <p className="mt-4 text-sm leading-7 text-[#e5e2e1]/70 md:text-base">
            Cooperative routing expands the reachable agent pool across crews while still honoring expertise
            ranking, policy, and attribution.
          </p>

          <div className="mt-8 rounded-[28px] bg-[#171717] p-5">
            <div className="mb-3 font-space-grotesk text-[10px] uppercase tracking-[0.2em] text-[#00f2ff]">
              Policy rail
            </div>
            <div className="space-y-3">
              {policyRail.map((item, index) => {
                const active = index === activeStep % policyRail.length;
                return (
                  <div
                    key={item}
                    className={`rounded-[18px] px-4 py-3 text-sm leading-6 transition-all duration-300 ${active
                      ? 'bg-[#1c1b1b] text-[#e5e2e1]'
                      : 'bg-[#131313] text-[#b9cacb]'
                      }`}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-[28px] bg-[#171717] p-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-space-grotesk text-[10px] uppercase tracking-[0.2em] text-[#f6d74a]">
                Provenance trace
              </span>
              <span className="font-mono text-[11px] text-[#b9cacb]/56">session:q4-audit:4c91</span>
            </div>
            <div className="space-y-3">
              {provenanceEvents.map((entry, index) => {
                const active = index === activeStep;
                return (
                  <div key={entry.time + entry.event} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <span
                        className="h-3 w-3 rounded-full transition-all duration-300"
                        style={{
                          backgroundColor: entry.accent,
                          boxShadow: active ? `0 0 16px ${entry.accent}` : 'none',
                          opacity: active ? 1 : 0.6,
                        }}
                      />
                      {index < provenanceEvents.length - 1 ? <span className="mt-1 h-8 w-px bg-[#353534]" /> : null}
                    </div>
                    <div className={`rounded-[16px] px-3 py-2 transition-all duration-300 ${active ? 'bg-[#1c1b1b]' : 'bg-[#131313]'}`}>
                      <div className="font-mono text-[11px]" style={{ color: entry.accent }}>
                        {entry.time}
                      </div>
                      <div className="mt-1 text-sm text-[#e5e2e1]">{entry.event}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-[28px] bg-[#171717] p-5">
            <div className="mb-4 font-space-grotesk text-[10px] uppercase tracking-[0.2em] text-[#7bf5dc]">
              Evidence loop
            </div>
            <div className="flex flex-col items-center rounded-[22px] bg-[#111111] px-4 py-6">
              <div
                className="flex h-36 w-36 items-center justify-center rounded-full"
                style={{
                  background: `conic-gradient(#7bf5dc 0deg ${evidenceScore * 3.6}deg, #201f1f ${evidenceScore * 3.6}deg 360deg)`,
                }}
              >
                <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full bg-[#111111]">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#b9cacb]/58">signal</span>
                  <span className="mt-1 text-2xl font-semibold text-[#e5e2e1]">{evidenceScore}%</span>
                </div>
              </div>
              <p className="mt-5 text-center text-sm leading-6 text-[#b9cacb]">
                Evidence quality increases as runs finish with clean policy checks, attributable decisions,
                and replayable session traces.
              </p>
            </div>
          </div>

          <div className="rounded-[28px] bg-[#171717] p-5 md:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-space-grotesk text-[10px] uppercase tracking-[0.2em] text-[#ead2ff]">
                Context + cooperation
              </span>
              <span className="rounded-full bg-[#ead2ff]/14 px-3 py-1 font-space-grotesk text-[10px] uppercase tracking-[0.2em] text-[#ead2ff]">
                --full-crews
              </span>
            </div>

            <div className="grid gap-3 md:grid-cols-4">
              {contextModules.map((module) => {
                const active = module.title === activeModule.title;
                return (
                  <div
                    key={module.title}
                    className={`rounded-[22px] px-4 py-4 transition-all duration-300 ${active ? 'bg-[#1c1b1b]' : 'bg-[#111111]'}`}
                  >
                    <div
                      className="font-space-grotesk text-[10px] uppercase tracking-[0.2em]"
                      style={{ color: module.accent }}
                    >
                      {module.title}
                    </div>
                    <p className="mt-3 text-sm leading-6 text-[#b9cacb]">{module.copy}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
