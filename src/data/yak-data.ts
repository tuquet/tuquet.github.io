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
    display: 'tuquet (Master CLI)',
    description: 'Master control CLI, cloud-connected runner daemon, and browser automation',
    link: 'https://github.com/tuquet/cli',
    color: '#3b82f6',
    x: 0,
    y: 0,
  },
  {
    name: 'tuquet/runner',
    display: 'tuquet-runner (Rust Engine)',
    description: 'Distributed universal execution engine in Rust',
    link: 'https://github.com/tuquet/runner',
    color: '#ef4444',
    from: ['tuquet/cli'],
    x: -240,
    y: -140,
  },
  {
    name: 'tuquet/automa',
    display: 'tuquet/automa (Web Studio)',
    description: 'High-performance browser automation & workflow orchestration',
    link: 'https://github.com/tuquet/automa',
    color: '#f59e0b',
    x: -240,
    y: 120,
  },
  {
    name: 'tuquet/browser',
    display: 'tuquet-browser (Sandbox)',
    description: 'Dedicated browser sandbox, anti-detection & automation engine',
    link: 'https://github.com/tuquet/browser',
    color: '#f97316',
    from: ['tuquet/automa', 'tuquet/cli'],
    x: -460,
    y: 0,
  },
  {
    name: 'tuquet/cloud',
    display: 'tuquet-cloud (Supabase)',
    description: 'Realtime event dispatch, telemetry & user state DB',
    link: 'https://github.com/tuquet/cloud',
    color: '#10b981',
    from: ['tuquet/cli'],
    x: 240,
    y: -140,
  },
  {
    name: 'flowup-bot',
    display: 'flowup-bot (Telegram Ops)',
    description: 'Telegram DevOps and VPS server monitoring assistant',
    link: 'https://github.com/tuquet/flowup-bot',
    color: '#14b8a6',
    from: ['tuquet/cloud'],
    x: 480,
    y: -140,
  },
  {
    name: 'tuquet/claude-agy',
    display: 'claude-agy (Claude + AGY)',
    description: 'Claude Code CLI integration via Google Antigravity OAuth quota',
    link: 'https://github.com/tuquet/claude-agy',
    color: '#8b5cf6',
    from: ['tuquet/cli'],
    x: 0,
    y: 220,
  },
  {
    name: 'tuquet/skills',
    display: 'tuquet/skills (AI Runbooks)',
    description: 'Curated AI agent skills, prompts, and runbooks',
    link: 'https://github.com/tuquet/skills',
    color: '#a855f7',
    from: ['tuquet/claude-agy'],
    x: 240,
    y: 220,
  },
  {
    name: 'tuquet/lib',
    display: '@tuquet/lib (Vue UI & Table)',
    description: 'Enterprise UI primitives and virtualized data table for Vue 3',
    link: 'https://github.com/tuquet/lib',
    color: '#06b6d4',
    x: 240,
    y: 40,
  },
  {
    name: 'tuquet.github.io',
    display: 'tuquet.github.io (Portfolio)',
    description: 'Personal homepage, tech journal & open source hub',
    link: 'https://tuquet.github.io',
    color: '#6366f1',
    from: ['tuquet/lib'],
    x: 480,
    y: 40,
  },
  {
    name: 'tuquet/releases',
    display: 'tuquet/releases (Portal)',
    description: 'Nuxt 4 + Nitro Serverless realtime release stream',
    link: 'https://tuquet.netlify.app',
    color: '#0ea5e9',
    from: ['tuquet.github.io'],
    x: 480,
    y: 160,
  },
  {
    name: 'tuquet/scoop-bucket',
    display: 'tuquet/scoop-bucket (Windows)',
    description: 'Official Scoop package bucket for Tuquet software',
    link: 'https://github.com/tuquet/scoop-bucket',
    color: '#ec4899',
    from: ['tuquet/cli', 'tuquet/claude-agy'],
    x: -240,
    y: 240,
  },
]

export const all = primary
