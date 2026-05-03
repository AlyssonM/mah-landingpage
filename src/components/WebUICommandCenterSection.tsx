import { useEffect, useState } from 'react';

type Tone = 'running' | 'completed' | 'failed';

type NavItem = {
  label: string;
  icon: string;
};

type CommandPreviewData = {
  context: string;
  command: string;
};

type RoutingData = {
  agent: string;
  confidence: string;
  caps: string[];
  fallbacks: string;
};

type LogLine = {
  time: string;
  level: 'INFO' | 'WARN' | 'DONE';
  msg: string;
};

type BoardCard = {
  id: string;
  title: string;
  owner: string;
  runtime: string;
  priority: 'high' | 'medium' | 'low';
  blocked?: string;
};

type BoardColumn = {
  title: string;
  cards: BoardCard[];
};

type MissionCard = {
  name: string;
  status: string;
  progress: number;
  risk: string;
};

type PertNode = {
  id: string;
  title: string;
  owner: string;
  runtime: string;
  priority: 'high' | 'medium' | 'low';
  state: 'critical' | 'active' | 'done' | 'blocked';
  x: number;
  y: number;
  es: string;
  ef: string;
  ls: string;
  lf: string;
  estimate: string;
  slack: string;
};

type MissionBacklogRow = {
  id: string;
  title: string;
  owner: string;
  runtime: string;
  status: string;
  estimate: string;
  risk: string;
};

type CrewCard = {
  name: string;
  role: string;
  status: string;
  load: string;
  specialty: string;
};

type InspectorData = {
  title: string;
  subtitle: string;
  stats: Array<{ label: string; value: string }>;
  summary: string;
  notes: string[];
};

type Frame =
  | {
      label: string;
      mode: 'crews';
      activeNav: string;
      title: string;
      subtitle: string;
      liveSummary: string;
      counts: string[];
      commandPreview: CommandPreviewData;
      crewBands: Array<{ label: string; value: string }>;
      crews: CrewCard[];
      inspector: InspectorData;
    }
  | {
      label: string;
      mode: 'run';
      activeNav: string;
      status: { label: string; tone: Tone };
      title: string;
      subtitle: string;
      commandPreview: CommandPreviewData;
      composer: {
        task: string;
        crew: string;
        runtime: string;
        scope: string;
      };
      routing: RoutingData;
      logs: LogLine[];
      inspector: InspectorData;
    }
  | {
      label: string;
      mode: 'tasks';
      activeNav: string;
      title: string;
      subtitle: string;
      liveSummary: string;
      counts: string[];
      activeTab: 'board' | 'missions' | 'pert';
      commandPreview: CommandPreviewData;
      mission: {
        name: string;
        objective: string;
        dueWindow: string;
        risk: string;
        capacity: string;
        progress: number;
        health: string;
      };
      board?: BoardColumn[];
      missions?: MissionCard[];
      pert?: {
        nodes: number;
        criticalPath: number;
        totalSlack: string;
        eta: string;
        zoom: string;
        nodesMap: PertNode[];
      };
      backlog?: MissionBacklogRow[];
      inspector: InspectorData;
    };

const sidebarItems: NavItem[] = [
  { label: 'Overview', icon: 'dashboard' },
  { label: 'Bootstrap', icon: 'rocket_launch' },
  { label: 'Config', icon: 'tune' },
  { label: 'Crews', icon: 'groups' },
  { label: 'Run', icon: 'play_circle' },
  { label: 'Tasks', icon: 'checklist' },
  { label: 'Sessions', icon: 'history' },
  { label: 'Skills', icon: 'extension' },
  { label: 'Expertise', icon: 'psychology' },
  { label: 'Context', icon: 'database' },
  { label: 'Settings', icon: 'settings' },
];

const frames: Frame[] = [
  {
    label: 'Crew Surface',
    mode: 'crews',
    activeNav: 'Crews',
    title: 'Crews',
    subtitle: 'Operator-visible team topology, workload, and specialty routing',
    liveSummary: 'Active crew graph: 6 crews online',
    counts: ['18 agents available', '3 specialist lanes', '2 cooperative routes'],
    commandPreview: {
      context: 'crews',
      command: 'mah crews status --graph --runtime openclaude',
    },
    crewBands: [
      { label: 'Primary', value: 'Engineering' },
      { label: 'Routing', value: 'Expertise-ranked' },
      { label: 'Cooperation', value: 'full_crews gated' },
      { label: 'Health', value: 'Stable' },
    ],
    crews: [
      { name: 'engineering-core', role: 'delivery', status: 'active', load: '72%', specialty: 'webui + runtime bridge' },
      { name: 'validation-lab', role: 'policy', status: 'routed', load: '61%', specialty: 'evidence + provenance' },
      { name: 'planning-cell', role: 'planning', status: 'ready', load: '48%', specialty: 'missions + replans' },
      { name: 'context-ops', role: 'memory', status: 'active', load: '55%', specialty: 'bounded context' },
    ],
    inspector: {
      title: 'Crew Inspector',
      subtitle: 'engineering-core',
      stats: [
        { label: 'Agents', value: '6 online' },
        { label: 'Primary Runtime', value: 'openclaude' },
        { label: 'Load', value: '72%' },
        { label: 'Cooperation', value: 'gated' },
      ],
      summary: 'Crews make routing concrete before execution starts, so operators can see where work should land and how cooperation remains controlled.',
      notes: ['Expertise ranking applied', 'full_crews requires policy match'],
    },
  },
  {
    label: 'Run Console',
    mode: 'run',
    activeNav: 'Run',
    status: { label: 'Running', tone: 'running' },
    title: 'Run Console',
    subtitle: 'Compose tasks, preview routing, and monitor execution',
    commandPreview: {
      context: 'run',
      command: 'mah run --runtime pi --task "ship md webui shell"',
    },
    composer: {
      task: 'Ship LP update using the real WebUI layout as the visual shell.',
      crew: 'eng',
      runtime: 'pi',
      scope: 'Full Crews',
    },
    routing: {
      agent: 'validation-lead',
      confidence: '0.94',
      caps: ['policy', 'continuity', 'evidence'],
      fallbacks: 'planning-lead, engineering-lead',
    },
    logs: [
      { time: '09:14:08', level: 'INFO', msg: 'Queued task and opened provenance-aware execution.' },
      { time: '09:14:15', level: 'INFO', msg: 'Routing preview resolved to validation-lead with evidence weighting.' },
      { time: '09:14:29', level: 'DONE', msg: 'Mission health synced and operator console updated.' },
    ],
    inspector: {
      title: 'Run Inspector',
      subtitle: 'pi:q4-audit:4c91',
      stats: [
        { label: 'Runtime', value: 'pi' },
        { label: 'Crew', value: 'eng' },
        { label: 'Scope', value: 'full_crews' },
        { label: 'Continuity', value: 'resume-ready' },
      ],
      summary: 'Run state stays visible while policy, routing, and bounded context remain in front of execution.',
      notes: ['Policy rail active', 'Evidence loop enabled', 'Provenance trace open'],
    },
  },
  {
    label: 'Tasks Board',
    mode: 'tasks',
    activeNav: 'Tasks',
    title: 'Tasks',
    subtitle: 'Mission-scoped backlog, board movement, and operator actions',
    liveSummary: 'Active mission: Q4 Audit Hardening',
    counts: ['14 total tasks', '2 blocked', '4 in progress'],
    activeTab: 'board',
    commandPreview: {
      context: 'tasks',
      command: 'mah task list --mission q4-audit --json',
    },
    mission: {
      name: 'Q4 Audit Hardening',
      objective: 'Tighten provenance, auth checks, and continuity flows before the release window closes.',
      dueWindow: 'Nov 01 - Nov 28',
      risk: 'Medium',
      capacity: '70%',
      progress: 68,
      health: 'Stable',
    },
    board: [
      {
        title: 'Ready',
        cards: [
          { id: 'TASK-121', title: 'Reconcile command preview', owner: 'planning-lead', runtime: 'openclaude', priority: 'medium' },
        ],
      },
      {
        title: 'In Progress',
        cards: [
          { id: 'TASK-118', title: 'Harden ingress checks', owner: 'validation-lead', runtime: 'pi', priority: 'high' },
          { id: 'TASK-124', title: 'Patch session resume shell', owner: 'engineering-lead', runtime: 'claude', priority: 'medium' },
        ],
      },
      {
        title: 'Blocked',
        cards: [
          {
            id: 'TASK-132',
            title: 'Verify provenance export',
            owner: 'governance',
            runtime: 'kilo',
            priority: 'high',
            blocked: 'waiting on evidence bundle',
          },
        ],
      },
    ],
    inspector: {
      title: 'Task Inspector',
      subtitle: 'TASK-118',
      stats: [
        { label: 'Status', value: 'In Progress' },
        { label: 'Owner', value: 'validation-lead' },
        { label: 'Runtime', value: 'pi' },
        { label: 'Confidence', value: '91%' },
      ],
      summary: 'Task execution remains linked to mission scope, runtime, session continuity, and operator actions.',
      notes: ['Resume session available', 'Command preview synced', 'Validation gate required'],
    },
  },
  {
    label: 'Mission View',
    mode: 'tasks',
    activeNav: 'Tasks',
    title: 'Tasks',
    subtitle: 'Mission health, scoped progress, and board-aware planning surface',
    liveSummary: 'Active mission: Q4 Audit Hardening',
    counts: ['3 missions', '1 at risk', '8 critical path nodes'],
    activeTab: 'missions',
    commandPreview: {
      context: 'mission-status',
      command: 'mah mission status q4-audit --json',
    },
    mission: {
      name: 'Q4 Audit Hardening',
      objective: 'Use missions as the operational container for scope, window, health, and execution status.',
      dueWindow: 'Nov 01 - Nov 28',
      risk: 'Low',
      capacity: '78%',
      progress: 81,
      health: 'High confidence',
    },
    missions: [
      { name: 'Q4 Audit Hardening', status: 'Active', progress: 81, risk: 'Low' },
      { name: 'Runtime Bridge Cleanup', status: 'At Risk', progress: 54, risk: 'Medium' },
      { name: 'Operator Docs Sync', status: 'Completed', progress: 100, risk: 'Low' },
    ],
    inspector: {
      title: 'Mission Inspector',
      subtitle: 'Q4 Audit Hardening',
      stats: [
        { label: 'Window', value: 'Nov 01 - Nov 28' },
        { label: 'Progress', value: '81%' },
        { label: 'Risk', value: 'Low' },
        { label: 'Health', value: 'High confidence' },
      ],
      summary: 'Mission state gives operators one place to read progress, critical path impact, and readiness before execution shifts.',
      notes: ['Critical path visible', '2 blocked tasks', 'Scope committed'],
    },
  },
];

function StatusBadge({ tone, label }: { tone: Tone; label: string }) {
  const classes =
    tone === 'running'
      ? 'border-[#174554] bg-[#091a20] text-[#59e6ff]'
      : tone === 'completed'
        ? 'border-[#234534] bg-[#0f1d15] text-[#7bf5dc]'
        : 'border-[#4a1f24] bg-[#1d1113] text-[#ff8d9c]';

  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 font-space-grotesk text-[10px] uppercase tracking-[0.18em] ${classes}`}>
      {label}
    </span>
  );
}

function CommandPreviewBar({ preview }: { preview: CommandPreviewData }) {
  return (
    <div className="flex min-w-0 overflow-hidden rounded-[14px] border border-[#2a2a2a] bg-[#101010]">
      <div className="flex shrink-0 items-center gap-2 border-r border-[#2a2a2a] bg-[#181818] px-3 py-2">
        <span className="font-space-grotesk text-[9px] font-bold uppercase tracking-[0.18em] text-[#8b98a7]">
          Context
        </span>
        <span className="font-mono text-[11px] text-[#59e6ff]">{preview.context}</span>
      </div>
      <div className="flex min-w-0 flex-1 items-center justify-between gap-2 px-3 py-2">
        <code className="block min-w-0 flex-1 truncate whitespace-nowrap font-mono text-[11px] text-[#e5e2e1]">$ {preview.command}</code>
        <span className="shrink-0 rounded-md bg-[#181818] px-2 py-1 font-space-grotesk text-[9px] font-bold uppercase tracking-[0.14em] text-[#8b98a7]">
          Copy
        </span>
      </div>
    </div>
  );
}

function SidebarRail({ activeNav }: { activeNav: string }) {
  return (
    <div className="flex h-full flex-col overflow-hidden border-r border-[#232323] bg-[#101113]">
      {sidebarItems.map((item) => {
        const active = item.label === activeNav;
        return (
          <div
            key={item.label}
            className={`flex min-h-[58px] flex-col items-center justify-center gap-1 border-r-2 text-[#7f8b9d] transition-colors ${
              active ? 'border-r-[#00bcd4] bg-[#14181c] text-[#59e6ff]' : 'border-r-transparent'
            }`}
          >
            <span
              className={`material-symbols-outlined grid h-6 w-6 place-items-center rounded-md text-[16px] leading-none ${
                active ? 'bg-[#0e2a31]' : 'bg-[#181818]'
              }`}
              style={{ fontVariationSettings: active ? "'FILL' 1" : "'FILL' 0" }}
              aria-hidden="true"
            >
              {item.icon}
            </span>
            <span className="font-space-grotesk text-[8px] font-bold uppercase tracking-[0.02em]">{item.label}</span>
          </div>
        );
      })}
    </div>
  );
}

function PriorityDot({ priority }: { priority: 'high' | 'medium' | 'low' }) {
  const color = priority === 'high' ? 'bg-[#f97316]' : priority === 'medium' ? 'bg-[#00bcd4]' : 'bg-[#94a3b8]';
  return <span className={`h-2 w-2 rounded-full ${color}`} />;
}

function CrewView({ frame }: { frame: Extract<Frame, { mode: 'crews' }> }) {
  return (
    <div className="flex h-full min-h-0 flex-col bg-[#101113]">
      <section className="h-[112px] shrink-0 border-b border-[#232323] px-5 py-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-inter text-[22px] font-bold tracking-[-0.03em] text-[#f1f3f4]">Crews Topology</h3>
            <div className="mt-2 flex items-center gap-3">
              <span className="rounded-md border border-[#2a2a2a] bg-[#181818] px-3 py-2 text-[12px] text-[#e5e2e1]">
                engineering-core
              </span>
              <span className="text-[12px] text-[#8b98a7]">4 teams, 6 agents</span>
            </div>
          </div>
          <div className="inline-flex overflow-hidden rounded-md border border-[#2a2a2a] bg-[#181818]">
            <span className="px-3 py-2 text-[11px] font-bold uppercase tracking-[0.04em] text-[#8b98a7]">Cards</span>
            <span className="bg-[#0e2a31] px-3 py-2 text-[11px] font-bold uppercase tracking-[0.04em] text-[#59e6ff]">Flowchart</span>
          </div>
        </div>
      </section>

      <div className="flex h-[58px] shrink-0 items-center gap-2 border-b border-[#232323] bg-[#101113] px-5 py-3">
        {['All Roles', 'Filter by capability...', 'All Models', 'All Domains'].map((item, index) => (
          <span
            key={item}
            className={`rounded-md border border-[#2a2a2a] bg-[#181818] px-3 py-2 text-[12px] ${index === 1 ? 'text-[#64748b]' : 'text-[#e5e2e1]'}`}
          >
            {item}
          </span>
        ))}
      </div>

      <div className="min-h-0 flex-1 overflow-hidden px-5 py-4">
        <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-[18px] border border-[#2a2a2a] bg-[#151515] p-5">
          <div className="flex justify-center">
            <div className="w-full max-w-[260px] rounded-md border border-[#323232] bg-[#111111] px-4 py-3">
              <div className="text-[13px] font-bold text-[#f1f3f4]">orchestrator-core</div>
              <div className="mt-1 font-mono text-[11px] text-[#8b98a7]">openclaude</div>
              <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-[#0e2a31] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.06em] text-[#59e6ff]">
                validated
              </div>
              <div className="mt-2 h-1.5 rounded-full bg-[#232323]">
                <div className="h-1.5 w-[85%] rounded-full bg-[#00bcd4]" />
              </div>
            </div>
          </div>

          <div className="mx-auto h-6 w-[2px] bg-[#2a2a2a]" />

          <div className="grid min-h-0 flex-1 grid-cols-3 gap-3">
            {[
              { title: 'Planning', color: '#00BCD4', crew: frame.crews[2], worker: 'planner-worker-1' },
              { title: 'Engineering', color: '#4CAF50', crew: frame.crews[0], worker: 'builder-worker-1' },
              { title: 'Validation', color: '#FFC107', crew: frame.crews[1], worker: 'policy-worker-1' },
            ].map((team) => (
              <article
                key={team.title}
                className="flex min-h-0 flex-col rounded-md border border-[#2a2a2a] bg-[#111111] p-3"
                style={{ borderTopColor: team.color, borderTopWidth: 3, borderTopStyle: 'solid' }}
              >
                <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.06em] text-[#8b98a7]">{team.title}</div>
                <div className="rounded-md border border-[#2a2a2a] border-l-[3px] border-l-[#00BCD4] bg-[#16181b] p-3">
                  <div className="text-[13px] font-bold text-[#f1f3f4]">{team.crew.name}</div>
                  <div className="mt-1 font-mono text-[11px] text-[#8b98a7]">{team.crew.specialty}</div>
                  <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-[#0e2a31] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.06em] text-[#59e6ff]">
                    {team.crew.status}
                  </div>
                  <div className="mt-2 h-1.5 rounded-full bg-[#232323]">
                    <div className="h-1.5 rounded-full bg-[#00bcd4]" style={{ width: team.crew.load }} />
                  </div>
                </div>
                <div className="mx-auto my-2 h-3 w-[2px] bg-[#2a2a2a]" />
                <div className="grid gap-2">
                  <div className="rounded-md border border-[#2a2a2a] bg-[#16181b] p-2.5">
                    <div className="text-[12px] font-semibold text-[#f1f3f4]">{team.worker}</div>
                    <div className="mt-1 font-mono text-[11px] text-[#8b98a7]">worker / validated</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function RunView({ frame }: { frame: Extract<Frame, { mode: 'run' }> }) {
  return (
    <div className="flex h-full min-h-0 flex-col bg-[#101113]">
      <section className="flex h-[84px] shrink-0 items-start border-b border-[#232323] px-5 py-2">
        <div className="flex min-w-0 items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-inter text-[22px] font-bold tracking-[-0.03em] text-[#f1f3f4]">{frame.title}</h3>
            <p className="mt-1 text-[12px] text-[#8b98a7]">{frame.subtitle}</p>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge tone={frame.status.tone} label={frame.status.label} />
            <button className="rounded-md border border-[#00bcd4]/30 bg-[#0e2a31] px-3 py-2 font-space-grotesk text-[10px] font-bold uppercase tracking-[0.08em] text-[#59e6ff]">
              Start
            </button>
          </div>
        </div>
      </section>

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <div className="h-[332px] shrink-0 border-b border-[#232323] px-5 py-4">
          <div className="grid h-full min-h-0 grid-rows-[minmax(0,1.15fr)_minmax(0,0.85fr)] gap-3">
            <div className="grid min-h-0 gap-2 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.1fr)]">
              <div className="flex h-full min-w-0 flex-col overflow-hidden rounded-[18px] border border-[#2a2a2a] bg-[#151515] px-4 py-4 md:min-h-[196px]">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <span className="font-space-grotesk text-[10px] font-bold uppercase tracking-[0.14em] text-[#f1f3f4]">
                    Task Composer
                  </span>
                  <span className="font-space-grotesk text-[10px] font-bold uppercase tracking-[0.08em] text-[#8b98a7]">
                    source of truth: cli
                  </span>
                </div>
                <textarea
                  value={frame.composer.task}
                  readOnly
                  className="h-[68px] w-full resize-none rounded-md border border-[#2a2a2a] bg-[#101010] px-3 py-2 text-[12px] leading-5 text-[#e5e2e1] outline-none"
                />
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {[frame.composer.crew, frame.composer.runtime, frame.composer.scope].map((item) => (
                    <span
                      key={item}
                      className="rounded-md border border-[#2a2a2a] bg-[#101010] px-3 py-2 font-space-grotesk text-[10px] font-bold uppercase tracking-[0.08em] text-[#b9cacb]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="overflow-hidden rounded-[18px] border border-[#2a2a2a] bg-[#151515] px-4 py-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-space-grotesk text-[10px] font-bold uppercase tracking-[0.14em] text-[#f1f3f4]">
                    Command Preview
                  </span>
                </div>
                <CommandPreviewBar preview={frame.commandPreview} />
              </div>
            </div>

            <div className="overflow-hidden min-h-[140px] rounded-[18px] border border-[#2a2a2a] bg-[#151515] px-4 py-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="font-space-grotesk text-[10px] font-bold uppercase tracking-[0.14em] text-[#f1f3f4]">
                  Routing Preview
                </span>
                <span className="font-mono text-[11px] text-[#59e6ff]">{frame.routing.confidence}</span>
              </div>
              <div className="h-[calc(100%-15px)] overflow-auto rounded-md bg-[#0e2a31] px-3 py-2">
                <div className="text-[13px] font-bold text-[#59e6ff]">{frame.routing.agent}</div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {frame.routing.caps.map((cap) => (
                    <span
                      key={cap}
                      className="rounded-sm bg-[#173039] px-2 py-1 font-space-grotesk text-[9px] font-bold uppercase tracking-[0.12em] text-[#b9cacb]"
                    >
                      {cap}
                    </span>
                  ))}
                </div>
                <p className="mt-1 text-[11px] text-[#b9cacb]">
                  <strong className="text-[#f1f3f4]">Fallbacks:</strong> {frame.routing.fallbacks}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="min-h-0 flex-1 px-5 py-4 max-h-[calc(100%-340px)] overflow-auto">
          <div className="flex h-full min-h-0 flex-col rounded-[18px] border border-[#2a2a2a] bg-[#151515] px-4 py-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-space-grotesk text-[10px] font-bold uppercase tracking-[0.14em] text-[#f1f3f4]">
                Execution Monitor
              </span>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#22c55e]" />
                <span className="font-space-grotesk text-[10px] font-bold uppercase tracking-[0.08em] text-[#8b98a7]">
                  live stream
                </span>
              </div>
            </div>
            <div className="grid auto-rows-fr gap-2 md:grid-cols-2">
              {frame.logs.map((line) => (
                <div key={`${line.time}-${line.msg}`} className="rounded-md border border-[#2a2a2a] bg-[#101010] px-3 py-2.5">
                  <div className="flex items-center gap-2 font-mono text-[10px] text-[#8b98a7]">
                    <span>{line.time}</span>
                    <span>{line.level}</span>
                  </div>
                  <div className="mt-1.5 text-[12px] leading-5 text-[#e5e2e1]">{line.msg}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TasksView({ frame }: { frame: Extract<Frame, { mode: 'tasks' }> }) {
  return (
    <div className="flex h-full min-h-0 flex-col bg-[#101113]">
      <section className="flex h-[84px] shrink-0 items-start border-b border-[#232323] px-5 py-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-inter text-[22px] font-bold tracking-[-0.03em] text-[#f1f3f4]">{frame.title}</h3>
            <div className="mt-1 flex flex-wrap items-center gap-1 text-[11px] text-[#8b98a7]">
              <span className="inline-flex items-center gap-1 font-space-grotesk font-bold uppercase tracking-[0.1em] text-[#7bf5dc]">
                <span className="h-2 w-2 rounded-full bg-[#22c55e]" />
                {frame.liveSummary}
              </span>
              {frame.counts.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
          <div className="max-w-[330px] flex-1">
            <CommandPreviewBar preview={frame.commandPreview} />
          </div>
        </div>
      </section>

      <div className="flex h-[52px] shrink-0 items-center border-b border-[#232323] bg-[#101113] px-5 py-3">
        <div className="flex flex-wrap gap-1.5">
          {['Board', 'Missions', 'PERT', 'Timeline'].map((tab) => {
            const active = tab.toLowerCase() === frame.activeTab;
            return (
              <span
                key={tab}
                className={`rounded-md border px-3 py-1.5 font-space-grotesk text-[10px] font-bold uppercase tracking-[0.08em] ${
                  active
                    ? 'border-[#174554] bg-[#0e2a31] text-[#59e6ff]'
                    : 'border-[#2a2a2a] bg-[#181818] text-[#8b98a7]'
                }`}
              >
                {tab}
              </span>
            );
          })}
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-hidden px-5 py-4">
        <div className="h-[212px] shrink-0 overflow-hidden rounded-[18px] border border-[#2a2a2a] bg-[#151515] px-4 py-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="font-space-grotesk text-[10px] font-bold uppercase tracking-[0.14em] text-[#8b98a7]">
                Active Mission
              </div>
              <h4 className="mt-1 text-[18px] font-semibold text-[#f1f3f4]">{frame.mission.name}</h4>
              <p className="mt-1 max-w-[520px] text-[12px] leading-5 text-[#b9cacb]">{frame.mission.objective}</p>
            </div>
            <span className="rounded-full bg-[#101010] px-3 py-1.5 font-space-grotesk text-[10px] font-bold uppercase tracking-[0.08em] text-[#b9cacb]">
              {frame.mission.health}
            </span>
          </div>
          <div className="mt-4 grid gap-2 md:grid-cols-4">
            {[
              ['Due Window', frame.mission.dueWindow],
              ['Risk', frame.mission.risk],
              ['Capacity', frame.mission.capacity],
              ['Progress', `${frame.mission.progress}%`],
            ].map(([label, value]) => (
              <div key={label} className="rounded-[14px] bg-[#101010] px-3 py-2.5">
                <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#8b98a7]">{label}</div>
                <div className="mt-1 text-[13px] font-semibold text-[#f1f3f4]">{value}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 h-2 rounded-full bg-[#232323]">
            <div className="h-2 rounded-full bg-[#00bcd4] transition-all duration-300" style={{ width: `${frame.mission.progress}%` }} />
          </div>
        </div>

        {frame.activeTab === 'board' && frame.board ? (
          <div className="grid min-h-0 flex-1 gap-3 md:grid-cols-3">
            {frame.board.map((column) => (
              <div key={column.title} className="flex min-h-0 flex-col rounded-[18px] border border-[#2a2a2a] bg-[#151515]">
                <div className="flex items-center justify-between border-b border-[#2a2a2a] px-4 py-3">
                  <h4 className="text-[13px] font-semibold text-[#f1f3f4]">{column.title}</h4>
                  <span className="rounded-full bg-[#101010] px-2 py-1 font-mono text-[10px] text-[#8b98a7]">{column.cards.length}</span>
                </div>
                <div className="space-y-2 p-3">
                  {column.cards.map((card) => (
                    <div key={card.id} className="rounded-[14px] border border-[#2a2a2a] bg-[#101010] px-3 py-3">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <PriorityDot priority={card.priority} />
                          <span className="font-mono text-[11px] font-semibold text-[#f1f3f4]">{card.id}</span>
                        </div>
                        <span className="font-space-grotesk text-[9px] font-bold uppercase tracking-[0.12em] text-[#8b98a7]">
                          {card.runtime}
                        </span>
                      </div>
                      <div className="mt-2 text-[13px] font-semibold text-[#f1f3f4]">{card.title}</div>
                      <div className="mt-2 text-[11px] text-[#8b98a7]">{card.owner}</div>
                      {card.blocked ? <div className="mt-2 text-[11px] text-[#b91c1c]">{card.blocked}</div> : null}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : null}

        {frame.activeTab === 'missions' && frame.missions ? (
          <div className="grid min-h-0 flex-1 gap-3 md:grid-cols-3">
            {frame.missions.map((mission, index) => (
              <div
                key={mission.name}
                className={`h-full rounded-[18px] border px-4 py-4 ${
                  index === 0 ? 'border-[#174554] bg-[#0f1d22]' : 'border-[#2a2a2a] bg-[#151515]'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="font-space-grotesk text-[10px] font-bold uppercase tracking-[0.14em] text-[#8b98a7]">
                    Mission
                  </div>
                  <StatusBadge
                    tone={mission.status === 'At Risk' ? 'failed' : mission.status === 'Completed' ? 'completed' : 'running'}
                    label={mission.status}
                  />
                </div>
                <div className="mt-3 text-[16px] font-semibold text-[#f1f3f4]">{mission.name}</div>
                <div className="mt-4 grid gap-2">
                  <div className="rounded-[14px] bg-[#101010] px-3 py-2.5 text-[12px] text-[#b9cacb]">
                    Progress <strong className="text-[#f1f3f4]">{mission.progress}%</strong>
                  </div>
                  <div className="rounded-[14px] bg-[#101010] px-3 py-2.5 text-[12px] text-[#b9cacb]">
                    Risk <strong className="text-[#f1f3f4]">{mission.risk}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function InspectorPanel({ inspector }: { inspector: InspectorData }) {
  return (
    <aside className="flex h-full min-h-0 flex-col border-l border-[#232323] bg-[#101113]">
      <div className="flex h-[84px] shrink-0 flex-col justify-center border-b border-[#232323] px-4 py-4">
        <h3 className="text-[16px] font-semibold text-[#f1f3f4]">{inspector.title}</h3>
        <p className="mt-1 font-mono text-[11px] text-[#8b98a7]">{inspector.subtitle}</p>
      </div>
      <div className="space-y-3 overflow-auto px-4 py-4">
        <div className="grid gap-2">
          {inspector.stats.map((item) => (
            <div key={item.label} className="rounded-[14px] border border-[#2a2a2a] bg-[#151515] px-3 py-2.5">
              <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#8b98a7]">{item.label}</div>
              <div className="mt-1 text-[12px] font-semibold text-[#f1f3f4]">{item.value}</div>
            </div>
          ))}
        </div>
        <div className="rounded-[16px] border border-[#2a2a2a] bg-[#151515] px-3 py-3">
          <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#8b98a7]">Summary</div>
          <p className="mt-2 text-[12px] leading-5 text-[#b9cacb]">{inspector.summary}</p>
        </div>
        <div className="rounded-[16px] border border-[#2a2a2a] bg-[#151515] px-3 py-3">
          <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#8b98a7]">Operator Notes</div>
          <div className="mt-2 space-y-2">
            {inspector.notes.map((note) => (
              <div key={note} className="flex items-start gap-2 text-[12px] text-[#b9cacb]">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#00bcd4]" />
                <span>{note}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

export default function WebUICommandCenterSection() {
  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setFrameIndex((current) => (current + 1) % frames.length);
    }, 2800);

    return () => window.clearInterval(timer);
  }, []);

  const activeFrame = frames[frameIndex];

  return (
    <section className="relative mx-auto w-full max-w-[1520px] px-6 py-16 md:px-10 md:py-[100px] lg:px-16 xl:px-12">
      <div className="absolute inset-x-10 top-10 h-40 rounded-full bg-[radial-gradient(circle,rgba(0,242,255,0.14)_0%,rgba(39,146,255,0.08)_34%,transparent_72%)] blur-3xl" />

      <div className="relative grid items-center gap-10 lg:grid-cols-[0.7fr_1.3fr] xl:grid-cols-[0.6fr_1.4fr]">
        <div className="max-w-[480px]">
          <span className="mb-4 block font-space-grotesk text-sm font-medium uppercase tracking-[0.2em] text-[#00f2ff]">
            WEBUI COMMAND CENTER
          </span>
          <h2 className="font-inter text-3xl font-bold tracking-tight text-[#e5e2e1] md:text-5xl">
            CLI-first operation with a real control surface.
          </h2>
          <p className="mt-5 max-w-[480px] text-base leading-7 text-[#b9cacb] md:text-lg">
            MAH keeps the CLI as the source of truth, then adds a WebUI that makes runs, sessions, routing,
            and missions visible while they unfold.
          </p>
          <p className="mt-4 max-w-[480px] text-sm leading-7 text-[#e5e2e1]/66 md:text-base">
            The WebUI gives operators one place to inspect crews, shape execution, monitor routing, and move work across missions without losing CLI fidelity.
          </p>

          <div className="mt-8 grid gap-3">
            {['CLI-backed workflows', 'Session resume + auditability', 'Live run visibility'].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-[20px] bg-[#1c1b1b]/88 px-4 py-3 text-sm text-[#e5e2e1]/82"
              >
                <span className="h-2 w-2 rounded-full bg-[#00f2ff] shadow-[0_0_14px_rgba(0,242,255,0.7)]" />
                <span className="font-space-grotesk uppercase tracking-[0.18em] text-[#b9cacb]">{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {frames.map((frame, index) => (
              <button
                key={frame.label}
                type="button"
                onClick={() => setFrameIndex(index)}
                className={`rounded-full px-4 py-2 font-space-grotesk text-[11px] uppercase tracking-[0.2em] transition-all duration-300 ${
                  frameIndex === index
                    ? 'bg-[#00f2ff]/18 text-[#00f2ff]'
                    : 'bg-[#201f1f] text-[#e5e2e1]/58 hover:text-[#e5e2e1]'
                }`}
              >
                {frame.label}
              </button>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[34px] bg-[#111111] p-4 shadow-[0_30px_80px_rgba(0,0,0,0.44)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,242,255,0.12),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(138,43,226,0.1),transparent_32%)]" />
          <div className="relative overflow-hidden rounded-[26px] border border-[#2a2a2a] bg-[#0f1012]">
            <div className="flex items-center justify-between border-b border-[#232323] bg-[#131416] px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ffb4ab]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#ffd27a]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#00f2ff]" />
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#8b98a7]">MAH WebUI</div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-[#2a2a2a] bg-[#1a1b1e] px-3 py-1 font-space-grotesk text-[9px] font-bold uppercase tracking-[0.12em] text-[#b9cacb]">
                <span className="material-symbols-outlined text-[12px] leading-none" aria-hidden="true">
                  logout
                </span>
                Logout
              </div>
            </div>

            <div className="grid h-[686px] grid-cols-[72px_minmax(0,1fr)_228px]">
              <SidebarRail activeNav={activeFrame.activeNav} />
              <div className="min-w-0">
                {activeFrame.mode === 'crews' ? (
                  <CrewView frame={activeFrame} />
                ) : activeFrame.mode === 'run' ? (
                  <RunView frame={activeFrame} />
                ) : (
                  <TasksView frame={activeFrame} />
                )}
              </div>
              <InspectorPanel inspector={activeFrame.inspector} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
