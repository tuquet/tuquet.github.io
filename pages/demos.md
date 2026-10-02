---
title: Demos - Tu Quet
display: Demos
subtitle: Interactive prototypes and architectural demonstrations
description: Interactive prototypes and live architecture showcases by Tu Quet
art: dots
---

<div class="prose m-auto">
  <p op70 class="text-center mb-8">
    Live architectural prototypes, streaming visualizers, and engineering experiments.
  </p>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose mt-6">
    <!-- Demo 1: Pipeline Visualizer -->
    <a 
      href="https://tuquet.github.io/automa/pipeline.html" 
      target="_blank" 
      rel="noopener"
      class="group block p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/30 hover:border-sky-500/50 hover:bg-sky-500/5 transition duration-300 no-underline"
    >
      <div class="flex items-center justify-between mb-3">
        <span class="text-xs font-mono uppercase tracking-wider text-sky-500 font-semibold">Workflow Orchestration</span>
        <span class="text-xs op50 group-hover:translate-x-1 transition-transform">&rarr;</span>
      </div>
      <h3 class="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2 group-hover:text-sky-500 transition-colors">
        Automa Pipeline Visualizer
      </h3>
      <p class="text-sm op70 leading-relaxed mb-4">
        Interactive 2D canvas pipeline simulator illustrating real-time distributed DAG execution, state transitions, and step retries.
      </p>
      <div class="flex flex-wrap gap-1.5 text-xs op60">
        <span class="px-2 py-0.5 rounded bg-zinc-200/50 dark:bg-zinc-800/50">Canvas 2D</span>
        <span class="px-2 py-0.5 rounded bg-zinc-200/50 dark:bg-zinc-800/50">State Machine</span>
        <span class="px-2 py-0.5 rounded bg-zinc-200/50 dark:bg-zinc-800/50">Live Demo</span>
      </div>
    </a>

    <!-- Demo 2: Process Sandbox -->
    <a 
      href="/posts/zero-zombie-chromium-supervision" 
      class="group block p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/30 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition duration-300 no-underline"
    >
      <div class="flex items-center justify-between mb-3">
        <span class="text-xs font-mono uppercase tracking-wider text-emerald-500 font-semibold">Rust Kernel Sandbox</span>
        <span class="text-xs op50 group-hover:translate-x-1 transition-transform">&rarr;</span>
      </div>
      <h3 class="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2 group-hover:text-emerald-500 transition-colors">
        Zero-Leakage Process Supervisor
      </h3>
      <p class="text-sm op70 leading-relaxed mb-4">
        Deep dive and reference code for Windows Job Objects process containment, eliminating zombie Chromium leaks during headless crawls.
      </p>
      <div class="flex flex-wrap gap-1.5 text-xs op60">
        <span class="px-2 py-0.5 rounded bg-zinc-200/50 dark:bg-zinc-800/50">Rust</span>
        <span class="px-2 py-0.5 rounded bg-zinc-200/50 dark:bg-zinc-800/50">Win32 API</span>
        <span class="px-2 py-0.5 rounded bg-zinc-200/50 dark:bg-zinc-800/50">Tokio</span>
      </div>
    </a>

    <!-- Demo 3: EV Telemetry Case Study -->
    <a 
      href="/posts/kien-truc-telemetry-100k-xe-dien" 
      class="group block p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/30 hover:border-amber-500/50 hover:bg-amber-500/5 transition duration-300 no-underline"
    >
      <div class="flex items-center justify-between mb-3">
        <span class="text-xs font-mono uppercase tracking-wider text-amber-500 font-semibold">IoT Telemetry Streaming</span>
        <span class="text-xs op50 group-hover:translate-x-1 transition-transform">&rarr;</span>
      </div>
      <h3 class="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2 group-hover:text-amber-500 transition-colors">
        100k+ Smart EV Streaming Cluster
      </h3>
      <p class="text-sm op70 leading-relaxed mb-4">
        Architecture blueprint handling massive concurrent vehicle telemetry bursts with Kafka, dual hot/cold paths, and bounded backpressure.
      </p>
      <div class="flex flex-wrap gap-1.5 text-xs op60">
        <span class="px-2 py-0.5 rounded bg-zinc-200/50 dark:bg-zinc-800/50">Kafka</span>
        <span class="px-2 py-0.5 rounded bg-zinc-200/50 dark:bg-zinc-800/50">WebSocket Cluster</span>
        <span class="px-2 py-0.5 rounded bg-zinc-200/50 dark:bg-zinc-800/50">TimescaleDB</span>
      </div>
    </a>

    <!-- Demo 4: UI Design System & Data Table -->
    <a 
      href="https://github.com/tuquet/lib" 
      target="_blank" 
      rel="noopener"
      class="group block p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/30 hover:border-rose-500/50 hover:bg-rose-500/5 transition duration-300 no-underline"
    >
      <div class="flex items-center justify-between mb-3">
        <span class="text-xs font-mono uppercase tracking-wider text-rose-500 font-semibold">Component Engineering</span>
        <span class="text-xs op50 group-hover:translate-x-1 transition-transform">&rarr;</span>
      </div>
      <h3 class="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2 group-hover:text-rose-500 transition-colors">
        Vue 3 Enterprise UI &amp; Data Table
      </h3>
      <p class="text-sm op70 leading-relaxed mb-4">
        Production-grade component library and headless high-density table engine built on Shadcn-Vue, Reka UI, and TanStack Table.
      </p>
      <div class="flex flex-wrap gap-1.5 text-xs op60">
        <span class="px-2 py-0.5 rounded bg-zinc-200/50 dark:bg-zinc-800/50">Vue 3</span>
        <span class="px-2 py-0.5 rounded bg-zinc-200/50 dark:bg-zinc-800/50">TanStack Table</span>
        <span class="px-2 py-0.5 rounded bg-zinc-200/50 dark:bg-zinc-800/50">TypeScript</span>
      </div>
    </a>
  </div>
</div>
