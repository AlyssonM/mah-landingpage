import { useEffect, useState } from 'react';

type ViewKey = 'board' | 'pert' | 'timeline' | 'missions';

const tabs: { key: ViewKey; label: string }[] = [
  { key: 'board', label: 'Board' },
  { key: 'pert', label: 'PERT' },
  { key: 'timeline', label: 'Timeline' },
  { key: 'missions', label: 'Missions' },
];

const toolbarActions = ['New Mission', 'New Task', 'Commit Scope', 'Open Replan', 'Refresh'];

const kpis = [
  { label: 'Active mission', value: 'Q4 Audit Hardening', accent: '#00f2ff' },
  { label: 'Blocked tasks', value: '02', accent: '#f6d74a' },
  { label: 'Critical path', value: '12.4h', accent: '#ead2ff' },
  { label: 'Mission health', value: '81%', accent: '#7bf5dc' },
];

const boardColumns = [
  {
    name: 'Queued',
    cards: [
      { id: 'TASK-124', title: 'Patch session resume copy', meta: 'engineering · low risk' },
      { id: 'TASK-132', title: 'Verify runtime examples', meta: 'docs · medium risk' },
    ],
  },
  {
    name: 'In progress',
    cards: [
      { id: 'TASK-118', title: 'Harden ingress checks', meta: 'validation · critical path' },
      { id: 'TASK-121', title: 'Route governance narratives', meta: 'planning · depends on evidence' },
    ],
  },
  {
    name: 'Review',
    cards: [{ id: 'TASK-130', title: 'Mission inspector states', meta: 'product · operator review' }],
  },
];

const timelineRows = [
  { label: 'Mission setup', start: 5, width: 22, accent: '#00f2ff' },
  { label: 'Policy + routing', start: 26, width: 20, accent: '#2792ff' },
  { label: 'Evidence review', start: 49, width: 16, accent: '#ead2ff' },
  { label: 'Ship window', start: 67, width: 22, accent: '#7bf5dc' },
];

const missionCards = [
  {
    title: 'Q4 Audit Hardening',
    status: 'In Progress',
    progress: 81,
    risk: 'Low',
  },
  {
    title: 'WebUI Panel Stabilization',
    status: 'Review',
    progress: 56,
    risk: 'Medium',
  },
  {
    title: 'Runtime Bridge Rollout',
    status: 'Done',
    progress: 33,
    risk: 'Medium',
  },
];

const missionBacklog = [
  { id: 'TASK-118', title: 'Prefetch audit context docs', owner: 'planning-lead', runtime: 'openclaude', status: 'In Progress', estimate: '1h 20m', risk: 'Medium' },
  { id: 'TASK-142', title: 'Verify auth middleware', owner: 'eng-lead', runtime: 'pi/local', status: 'Review', estimate: '2h 30m', risk: 'High' },
  { id: 'TASK-160', title: 'Validate artifact sync', owner: 'validation-lead', runtime: 'hermes', status: 'Done', estimate: '40m', risk: 'Medium' },
];

const pertNodes = [
  { id: 'TASK-118', title: 'Prefetch audit context docs', owner: 'planning-lead', runtime: 'openclaude', priority: 'Medium', state: 'critical', x: 32, y: 74, es: '0m', ef: '80m', ls: '0m', lf: '80m', estimate: '1h 20m', slack: '0m' },
  { id: 'TASK-126', title: 'Generate runtime sync diff', owner: 'ops', runtime: 'pi', priority: 'Medium', state: 'critical', x: 252, y: 18, es: '80m', ef: '125m', ls: '80m', lf: '125m', estimate: '45m', slack: '0m' },
  { id: 'TASK-154', title: 'Unlock blocked context dependency', owner: 'context-lead', runtime: 'openclaude', priority: 'High', state: 'done', x: 252, y: 150, es: '80m', ef: '135m', ls: '220m', lf: '275m', estimate: '55m', slack: '2h 20m' },
  { id: 'TASK-142', title: 'Verify auth middleware', owner: 'eng-lead', runtime: 'pi/local', priority: 'High', state: 'active', x: 474, y: 74, es: '125m', ef: '275m', ls: '125m', lf: '275m', estimate: '2h 30m', slack: '0m' },
  { id: 'TASK-160', title: 'Validate artifact sync', owner: 'validation-lead', runtime: 'hermes', priority: 'Medium', state: 'done', x: 695, y: 74, es: '275m', ef: '315m', ls: '275m', lf: '315m', estimate: '40m', slack: '0m' },
];

const pertEdges = [
  { d: 'M 190 128 C 220 128, 220 86, 252 86', critical: true },
  { d: 'M 190 128 C 220 128, 220 218, 252 218', critical: false },
  { d: 'M 410 86 C 438 86, 442 128, 474 128', critical: true },
  { d: 'M 410 218 C 438 218, 442 128, 474 128', critical: false },
  { d: 'M 632 128 C 660 128, 664 128, 695 128', critical: true },
];

function PlanningStatusBadge({ label }: { label: string }) {
  const classes =
    label === 'Done'
      ? 'border-[#cdebd8] bg-[#edf9f1] text-[#1f7a46]'
      : label === 'Review'
        ? 'border-[#dbeafe] bg-[#eff6ff] text-[#1d4ed8]'
        : label === 'In Progress'
          ? 'border-[#b6edf5] bg-[#eefcff] text-[#006876]'
          : 'border-[#fef3c7] bg-[#fffbeb] text-[#a16207]';

  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 font-space-grotesk text-[9px] font-bold uppercase tracking-[0.14em] ${classes}`}>
      {label}
    </span>
  );
}

export default function PlanningSurfaceSection() {
  const [activeView, setActiveView] = useState<ViewKey>('board');

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveView((current) => {
        const currentIndex = tabs.findIndex((tab) => tab.key === current);
        const nextIndex = (currentIndex + 1) % tabs.length;
        return tabs[nextIndex].key;
      });
    }, 2800);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="relative mx-auto w-full max-w-[1280px] px-6 py-16 md:px-10 md:py-[100px] lg:px-20">
      <div className="mb-10 max-w-[760px]">
        <span className="mb-4 block font-space-grotesk text-sm font-medium uppercase tracking-[0.2em] text-[#8ab4ff]">
          TASKS &amp; MISSIONS
        </span>
        <h2 className="font-inter text-3xl font-bold tracking-tight text-[#e5e2e1] md:text-5xl">
          Planning stays operational, not decorative.
        </h2>
        <p className="mt-5 text-base leading-7 text-[#b9cacb] md:text-lg">
          Missions, tasks, PERT, and timeline views sit in the same working surface so operators can see
          blockers, risk, and critical path without leaving the run.
        </p>
      </div>

      <div className="rounded-[32px] bg-[#171717] p-4 shadow-[0_28px_80px_rgba(0,0,0,0.34)] md:p-6">
        <div className="rounded-[24px] border border-[#2a2a2a] bg-[#111111] px-4 py-4 md:px-5">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
            <div className="max-w-[640px]">
              <div className="flex items-center gap-3">
                <h3 className="font-inter text-xl font-semibold text-[#e5e2e1] md:text-2xl">
                  Manage multi-agent work orchestration and mission lifecycle.
                </h3>
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#3a3a3a] text-xs text-[#b9cacb]">
                  ?
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-[#b9cacb] md:text-[15px]">
                Mission defines scope and window. Task is the executable work item inside that mission.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {toolbarActions.map((action, index) => (
                <button
                  key={action}
                  type="button"
                  className={`rounded-[12px] border px-3 py-2 font-space-grotesk text-[11px] font-bold uppercase tracking-[0.08em] ${
                    index === 1
                      ? 'border-[#00f2ff] bg-[#00f2ff] text-[#111111]'
                      : 'border-[#343434] bg-[#191919] text-[#e5e2e1]'
                  }`}
                >
                  {action}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            {kpis.map((kpi) => (
              <div key={kpi.label} className="rounded-[18px] border border-[#2a2a2a] bg-[#151515] px-4 py-4">
                <div className="font-space-grotesk text-[10px] uppercase tracking-[0.2em] text-[#b9cacb]/62">
                  {kpi.label}
                </div>
                <div className="mt-2 text-lg font-semibold" style={{ color: kpi.accent }}>
                  {kpi.value}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const active = tab.key === activeView;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveView(tab.key)}
                  className={`rounded-[10px] border px-4 py-2 font-space-grotesk text-[11px] uppercase tracking-[0.12em] transition-all duration-300 ${
                    active
                      ? 'border-[#b6edf5] bg-[#00f2ff]/14 text-[#00f2ff]'
                      : 'border-[#343434] bg-[#191919] text-[#b9cacb]/74 hover:text-[#e5e2e1]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-5 rounded-[28px] border border-[#262626] bg-[#111111] p-4 md:p-5">
          {activeView === 'board' && (
            <div className="space-y-4">
              <div className="rounded-[20px] border border-[#2a2a2a] bg-[#151515] p-4">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="font-space-grotesk text-[10px] uppercase tracking-[0.16em] text-[#b9cacb]/70">
                      Active Mission
                    </div>
                    <h4 className="mt-1 text-xl font-semibold text-[#e5e2e1]">Q4 Audit Hardening</h4>
                    <p className="mt-2 max-w-[620px] text-sm leading-6 text-[#b9cacb]">
                      Tighten provenance, auth checks, and continuity flows before the release window closes.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['Expand Board', 'Open PERT'].map((action) => (
                      <span
                        key={action}
                        className="rounded-[10px] border border-[#343434] bg-[#191919] px-3 py-2 font-space-grotesk text-[10px] uppercase tracking-[0.12em] text-[#e5e2e1]"
                      >
                        {action}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-4 grid gap-3 md:grid-cols-4">
                  {[
                    ['Due Window', 'Nov 01 - Nov 28'],
                    ['Risk Level', 'Medium'],
                    ['Capacity', '70%'],
                    ['Health', 'Stable'],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-[16px] bg-[#101010] px-3 py-3">
                      <div className="font-space-grotesk text-[10px] uppercase tracking-[0.14em] text-[#b9cacb]/60">{label}</div>
                      <div className="mt-1 font-mono text-[12px] text-[#e5e2e1]">{value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 xl:grid-cols-3">
                {boardColumns.map((column) => (
                  <div key={column.name} className="rounded-[20px] border border-[#2a2a2a] bg-[#151515] p-4">
                    <div className="flex items-center justify-between border-b border-[#262626] pb-3">
                      <span className="font-space-grotesk text-[10px] uppercase tracking-[0.16em] text-[#b9cacb]/70">
                        {column.name}
                      </span>
                      <span className="font-mono text-[11px] text-[#b9cacb]/60">{column.cards.length}</span>
                    </div>
                    <div className="mt-3 space-y-3">
                      {column.cards.map((card, cardIndex) => {
                        const selected = column.name === 'In progress' && cardIndex === 0;
                        return (
                          <div
                            key={card.id}
                            className={`rounded-[16px] border px-4 py-4 ${
                              selected
                                ? 'border-[#00f2ff]/30 bg-[#11181a] shadow-[0_0_0_1px_rgba(0,242,255,0.08)]'
                                : 'border-[#262626] bg-[#101010]'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-mono text-[11px] text-[#00f2ff]">{card.id}</span>
                              <span className="font-space-grotesk text-[9px] uppercase tracking-[0.14em] text-[#b9cacb]/60">
                                {column.name}
                              </span>
                            </div>
                            <div className="mt-2 text-sm font-semibold text-[#e5e2e1]">{card.title}</div>
                            <div className="mt-2 text-[11px] text-[#b9cacb]">{card.meta}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeView === 'pert' && (
            <div className="space-y-4">
              <div className="rounded-[20px] border border-[#2a2a2a] bg-[#151515] p-4">
                <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                  <div>
                    <div className="font-space-grotesk text-[10px] uppercase tracking-[0.16em] text-[#b9cacb]/70">
                      PERT Network
                    </div>
                    <h4 className="mt-1 text-xl font-semibold text-[#e5e2e1]">Critical path flowchart</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
                    {[
                      ['Nodes', '5'],
                      ['Critical Path', '4'],
                      ['Total Slack', '2h 20m'],
                      ['ETA', '5h 15m'],
                    ].map(([label, value]) => (
                      <div key={label} className="min-w-[108px]">
                        <div className="font-space-grotesk text-[10px] uppercase tracking-[0.14em] text-[#b9cacb]/60">{label}</div>
                        <div className="mt-1 font-mono text-[12px] text-[#e5e2e1]">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {['Wheel to zoom', 'Click and drag canvas to pan', 'Zoom 75%'].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-[#343434] bg-[#111111] px-3 py-2 font-space-grotesk text-[10px] uppercase tracking-[0.12em] text-[#e5e2e1]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="overflow-hidden rounded-[20px] border border-[#2a2a2a] bg-[#131313] p-4">
                <div
                  className="relative h-[420px] overflow-hidden rounded-[16px] border border-[#2a2a2a]"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
                    backgroundSize: '28px 28px',
                    backgroundColor: '#0f131a',
                  }}
                >
                  <svg className="absolute inset-0 h-full w-full" viewBox="0 0 940 420" preserveAspectRatio="none" aria-hidden="true">
                    {pertEdges.map((edge) => (
                      <path
                        key={edge.d}
                        d={edge.d}
                        className={edge.critical ? 'mah-edge-critical' : undefined}
                        fill="none"
                        stroke={edge.critical ? '#ef4444' : '#94a3b8'}
                        strokeWidth="3"
                      />
                    ))}
                  </svg>
                  {pertNodes.map((node) => {
                    const borderClass =
                      node.state === 'critical'
                        ? 'border-[#ff7f96] shadow-[0_0_0_1px_rgba(255,127,150,0.18)]'
                        : node.state === 'active'
                          ? 'border-[#64e7ff] shadow-[0_0_0_1px_rgba(100,231,255,0.18)]'
                          : node.state === 'done'
                            ? 'border-[#394556] opacity-85'
                            : 'border-[#394556]';

                    const surfaceClass =
                      node.state === 'critical'
                        ? 'bg-[linear-gradient(180deg,rgba(255,127,150,0.10)_0%,rgba(21,26,34,0.94)_100%)]'
                        : node.state === 'active'
                          ? 'bg-[linear-gradient(180deg,rgba(100,231,255,0.10)_0%,rgba(21,26,34,0.94)_100%)]'
                          : node.state === 'done'
                            ? 'bg-[#1a202b]'
                            : 'bg-[#151a22]';

                    const priorityClass = node.priority === 'High'
                      ? 'bg-[rgba(255,127,150,0.14)] text-[#ff7f96]'
                      : 'bg-[rgba(100,231,255,0.14)] text-[#64e7ff]';

                    return (
                      <div
                        key={node.id}
                        className={`absolute w-[184px] rounded-[16px] border p-3 text-[#eef2ff] ${borderClass} ${surfaceClass} ${node.state === 'active' ? 'mah-node-active' : ''}`}
                        style={{ left: node.x, top: node.y }}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-space-grotesk text-[9px] font-bold uppercase tracking-[0.12em] text-[#7f8aa0]">
                            {node.id}
                          </span>
                          <span className={`rounded-full px-2 py-1 font-space-grotesk text-[9px] font-bold uppercase tracking-[0.08em] ${priorityClass}`}>
                            {node.priority}
                          </span>
                        </div>
                        <div className="mt-2 text-[13px] font-semibold leading-5">{node.title}</div>
                        <div className="mt-2 flex items-center justify-between text-[10px] text-[#b2bdd0]">
                          <span>{node.owner}</span>
                          <span>{node.runtime}</span>
                        </div>
                        <div className="mt-3 grid grid-cols-4 gap-1.5">
                          {[
                            ['ES', node.es],
                            ['EF', node.ef],
                            ['LS', node.ls],
                            ['LF', node.lf],
                          ].map(([label, value]) => (
                            <div key={label} className="rounded-[10px] border border-[#394556] bg-[rgba(255,255,255,0.03)] px-2 py-1.5">
                              <div className="text-[8px] font-bold uppercase tracking-[0.1em] text-[#7f8aa0]">{label}</div>
                              <div className="mt-1 font-mono text-[10px] text-[#eef2ff]">{value}</div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 flex items-center justify-between text-[10px] font-medium text-[#b2bdd0]">
                          <span>{node.estimate}</span>
                          <span>Slack {node.slack}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 flex flex-wrap gap-5 text-[12px] text-[#b9cacb]">
                  {[
                    ['#ef4444', 'Critical path'],
                    ['#00f2ff', 'In progress'],
                    ['#f6d74a', 'Blocked'],
                    ['#94a3b8', 'Completed'],
                  ].map(([color, label]) => (
                    <div key={label} className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} />
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeView === 'timeline' && (
            <div className="rounded-[24px] bg-[#171717] p-4">
              <div className="mb-4 flex items-center justify-between">
                <span className="font-space-grotesk text-[10px] uppercase tracking-[0.2em] text-[#2792ff]">
                  Delivery timeline
                </span>
                <span className="font-mono text-[11px] text-[#b9cacb]/56">week 41 → week 44</span>
              </div>
              <div className="grid grid-cols-[170px_repeat(8,minmax(0,1fr))] gap-3">
                <div />
                {['W41', 'W41', 'W42', 'W42', 'W43', 'W43', 'W44', 'W44'].map((slot, index) => (
                  <div key={`${slot}-${index}`} className="font-mono text-[11px] text-[#b9cacb]/50">
                    {slot}
                  </div>
                ))}
              </div>
              <div className="mt-4 space-y-3">
                {timelineRows.map((row) => (
                  <div key={row.label} className="grid grid-cols-[170px_1fr] items-center gap-3">
                    <div className="font-inter text-sm text-[#e5e2e1]">{row.label}</div>
                    <div className="relative h-10 rounded-full bg-[#111111]">
                      <div
                        className="mah-timeline-bar absolute top-1.5 h-7 rounded-full transition-all duration-300"
                        style={{
                          left: `${row.start}%`,
                          width: `${row.width}%`,
                          background: `linear-gradient(135deg, ${row.accent} 0%, rgba(255,255,255,0.12) 100%)`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeView === 'missions' && (
            <div className="space-y-4">
              <div className="grid gap-4 xl:grid-cols-3">
                {missionCards.map((mission, index) => (
                  <button
                    key={mission.title}
                    type="button"
                    className={`rounded-[20px] border p-5 text-left ${
                      index === 0
                        ? 'border-[#00f2ff]/30 bg-[#121a1c] shadow-[0_0_0_1px_rgba(0,242,255,0.08)]'
                        : 'border-[#2a2a2a] bg-[#151515]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="font-space-grotesk text-[10px] uppercase tracking-[0.16em] text-[#b9cacb]/70">
                          Mission
                        </div>
                        <div className="mt-1 text-lg font-semibold text-[#e5e2e1]">{mission.title}</div>
                      </div>
                      <PlanningStatusBadge label={mission.status} />
                    </div>
                    <div className="mt-4 grid gap-3 md:grid-cols-4">
                      {[
                        ['Window', index === 0 ? 'Nov 01 - Nov 28' : index === 1 ? 'Nov 10 - Dec 02' : 'Rolling'],
                        ['Capacity', index === 0 ? '78%' : index === 1 ? '62%' : '44%'],
                        ['Progress', `${mission.progress}%`],
                        ['Risk', mission.risk],
                      ].map(([label, value]) => (
                        <div key={label}>
                          <div className="font-space-grotesk text-[10px] uppercase tracking-[0.14em] text-[#b9cacb]/60">{label}</div>
                          <div className="mt-1 font-mono text-[12px] text-[#e5e2e1]">{value}</div>
                        </div>
                      ))}
                    </div>
                  </button>
                ))}
              </div>

              <div className="rounded-[20px] border border-[#2a2a2a] bg-[#151515] p-4">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="font-space-grotesk text-[10px] uppercase tracking-[0.16em] text-[#b9cacb]/70">
                      Selected Mission
                    </div>
                    <h4 className="mt-1 text-xl font-semibold text-[#e5e2e1]">Q4 Audit Hardening</h4>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-[#7bf5dc]">High confidence</span>
                    <span className="rounded-[10px] border border-[#343434] bg-[#191919] px-3 py-2 font-space-grotesk text-[10px] uppercase tracking-[0.12em] text-[#e5e2e1]">
                      Create Mission
                    </span>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="h-2 rounded-full bg-[#101010]">
                    <div className="h-2 rounded-full bg-gradient-to-r from-[#00f2ff] to-[#2792ff]" style={{ width: '81%' }} />
                  </div>
                  <div className="mt-2 text-[11px] text-[#b9cacb]">81% mission progress</div>
                </div>
                <div className="mt-4 grid gap-3 md:grid-cols-4">
                  {[
                    ['Nodes', '14'],
                    ['Blocked', '3'],
                    ['Critical', '8'],
                    ['Delivery', 'High confidence'],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <div className="font-space-grotesk text-[10px] uppercase tracking-[0.14em] text-[#b9cacb]/60">{label}</div>
                      <div className="mt-1 font-mono text-[12px] text-[#e5e2e1]">{value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="overflow-hidden rounded-[20px] border border-[#2a2a2a] bg-[#151515]">
                <div className="border-b border-[#262626] px-4 py-4">
                  <div className="font-space-grotesk text-[10px] uppercase tracking-[0.16em] text-[#b9cacb]/70">
                    Scoped Tasks
                  </div>
                  <h4 className="mt-1 text-xl font-semibold text-[#e5e2e1]">Mission backlog</h4>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left">
                    <thead className="bg-[#111111]">
                      <tr className="text-[10px] uppercase tracking-[0.14em] text-[#b9cacb]/60">
                        {['Task', 'Owner', 'Runtime', 'Status', 'Estimate', 'Risk'].map((header) => (
                          <th key={header} className="px-4 py-3 font-space-grotesk font-bold">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {missionBacklog.map((row) => (
                        <tr key={row.id} className="border-t border-[#262626] text-sm text-[#e5e2e1]">
                          <td className="px-4 py-3">
                            <div className="flex flex-col">
                              <span className="font-mono text-[11px] text-[#00f2ff]">{row.id}</span>
                              <span className="mt-1 font-medium">{row.title}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-[#b9cacb]">{row.owner}</td>
                          <td className="px-4 py-3 text-[#b9cacb]">{row.runtime}</td>
                          <td className="px-4 py-3"><PlanningStatusBadge label={row.status} /></td>
                          <td className="px-4 py-3 font-mono text-[#b9cacb]">{row.estimate}</td>
                          <td className="px-4 py-3 text-[#b9cacb]">{row.risk}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
