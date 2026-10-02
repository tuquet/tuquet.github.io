---
title: Notes - Tu Quet
display: ''
art: plum
---

<SubNav />

<div class="prose m-auto">
  <p op70>Quick insights, architectural snippets, and lessons learned while crafting systems software.</p>

  <div class="space-y-8 mt-8">
    <!-- Note 1 -->
    <div class="border border-zinc-200 dark:border-zinc-800/80 rounded-xl p-6 bg-zinc-50/40 dark:bg-zinc-900/20">
      <div class="flex items-center justify-between text-xs op60 mb-2">
        <span class="font-mono">#TIL · Rust &amp; Windows Internals</span>
        <span>Sep 28, 2026</span>
      </div>
      <h3 class="text-lg font-semibold m-0 mb-3 text-zinc-900 dark:text-zinc-100">
        Win32 Job Object Kill-On-Job-Close for Child Process Containment
      </h3>
      <p class="text-sm op80 leading-relaxed mb-3">
        Calling <code>child.kill()</code> in standard library runtimes only terminates the direct root process. Any child processes spawned by Chromium or external tools silently detach into orphan background zombies.
      </p>
      <p class="text-sm op80 leading-relaxed mb-0">
        Assigning the parent process to a Win32 <strong>Job Object</strong> with <code>JOB_OBJECT_LIMIT_KILL_ON_JOB_CLOSE</code> forces the Windows kernel to terminate the entire process tree automatically as soon as the supervisor's handle closes—even across hard crashes, panics, or sudden power termination.
      </p>
    </div>

    <!-- Note 2 -->
    <div class="border border-zinc-200 dark:border-zinc-800/80 rounded-xl p-6 bg-zinc-50/40 dark:bg-zinc-900/20">
      <div class="flex items-center justify-between text-xs op60 mb-2">
        <span class="font-mono">#TIL · Networking &amp; Proxy Resilience</span>
        <span>Sep 14, 2026</span>
      </div>
      <h3 class="text-lg font-semibold m-0 mb-3 text-zinc-900 dark:text-zinc-100">
        Reliable SSH SOCKS5 Forwarding through Cloudflare WebSocket Bridges
      </h3>
      <p class="text-sm op80 leading-relaxed mb-3">
        When routing development traffic through corporate firewalls that inspect non-standard ports, combining <code>cloudflared access tcp</code> over port 443 with a local SSH SOCKS5 tunnel (<code>ssh -p 2222 -N -D 1080</code>) yields maximum stability.
      </p>
      <p class="text-sm op80 leading-relaxed mb-0">
        Always specify <code>ServerAliveInterval 15</code> and <code>ServerAliveCountMax 3</code> in <code>~/.ssh/config</code> to prevent silent half-open TCP timeouts when crossing NAT boundaries.
      </p>
    </div>

    <!-- Note 3 -->
    <div class="border border-zinc-200 dark:border-zinc-800/80 rounded-xl p-6 bg-zinc-50/40 dark:bg-zinc-900/20">
      <div class="flex items-center justify-between text-xs op60 mb-2">
        <span class="font-mono">#TIL · Telemetry Architecture</span>
        <span>Aug 20, 2026</span>
      </div>
      <h3 class="text-lg font-semibold m-0 mb-3 text-zinc-900 dark:text-zinc-100">
        Preventing Memory Bloat with Bounded Channels in High-Rate Telemetry
      </h3>
      <p class="text-sm op80 leading-relaxed mb-3">
        In IoT systems with hundreds of thousands of streaming devices, slow consumer clients (browsers on weak 3G) can cause unbounded queues in WebSocket servers, ballooning server memory until an Out-Of-Memory (OOM) crash occurs.
      </p>
      <p class="text-sm op80 leading-relaxed mb-0">
        Use <strong>bounded circular buffers</strong> (e.g. <code>tokio::sync::broadcast</code> with fixed capacity). When a slow client falls behind the threshold, discard non-critical intermediate frames (such as micro GPS fluctuations) while preserving critical telemetry state alarms.
      </p>
    </div>
  </div>
</div>
