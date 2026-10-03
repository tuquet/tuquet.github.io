export interface ProjectNode {
  name: string
  display?: string
  description?: string
  link: string
  color?: string
  dashed?: boolean
  faded?: boolean
  from?: string[]
  deps?: string[]
  animateStop?: boolean
  x?: number
  y?: number
}

export const primary: ProjectNode[] = [
  {
    name: 'tuquet/cli',
    display: 'tuquet (Master CLI & MCP)',
    description: 'Master control CLI, native Model Context Protocol (MCP) server, and runner orchestrator',
    link: 'https://github.com/tuquet/cli',
    color: '#3b82f6',
    x: 0,
    y: 0,
  },
  {
    name: 'tuquet/runner',
    display: 'runner (Rust Engine)',
    description: 'Universal distributed execution node and kernel sandbox in Rust',
    link: 'https://github.com/tuquet/runner',
    color: '#ef4444',
    from: ['tuquet/cli'],
    x: -260,
    y: -130,
  },
  {
    name: 'tuquet/automa',
    display: 'tuquet/automa (Web Studio)',
    description: 'Browser automation platform, visual node-graph canvas & Web Studio',
    link: 'https://github.com/tuquet/automa',
    color: '#f59e0b',
    from: ['tuquet/cli'],
    x: -260,
    y: 130,
  },
  {
    name: 'tuquet/browser',
    display: 'tuquet-browser (Sandbox)',
    description: 'Dedicated isolated Chromium runtime sandbox & anti-detection CDP engine',
    link: 'https://github.com/tuquet/browser',
    color: '#f97316',
    from: ['tuquet/automa', 'tuquet/cli'],
    x: -490,
    y: 0,
  },
  {
    name: 'tuquet/cloud',
    display: 'tuquet-cloud (Supabase)',
    description: 'Multi-tenant pairing, device enrollment RPC & realtime telemetry backend',
    link: 'https://github.com/tuquet/cloud',
    color: '#10b981',
    from: ['tuquet/cli'],
    x: 260,
    y: -130,
  },
  {
    name: 'flowup-bot',
    display: 'flowup-bot (Telegram Ops)',
    description: 'Telegram ChatOps assistant & cloud infrastructure monitor',
    link: 'https://github.com/tuquet/flowup-bot',
    color: '#14b8a6',
    from: ['tuquet/cloud'],
    x: 490,
    y: -130,
  },
  {
    name: 'tuquet/lib',
    display: '@tuquet/lib (Vue 3 UI & Primitives)',
    description: 'Enterprise UI design system (vue-ui), virtual Data Table (vue-table), and export primitives',
    link: 'https://github.com/tuquet/lib',
    color: '#06b6d4',
    from: ['tuquet/automa', 'tuquet/cli'],
    x: 260,
    y: 130,
  },
  {
    name: 'tuquet/claude-agy',
    display: 'claude-agy (Claude + AGY)',
    description: 'Claude Code CLI integration powered by Google Antigravity OAuth quota',
    link: 'https://github.com/tuquet/claude-agy',
    color: '#8b5cf6',
    from: ['tuquet/cli'],
    x: 0,
    y: 230,
  },
]

export const all = primary
