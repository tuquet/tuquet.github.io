---
title: Projects - Tu Quet
display: Projects
description: Systems architecture, developer tooling, and open-source projects by Tu Quet
wrapperClass: 'text-center'
art: dots
projects:
  Core Platforms:
    - name: 'Automa'
      link: 'https://tuquet.github.io/automa/'
      desc: 'Next-generation workflow orchestration & headless automation platform'
      icon: '/icons/automa.svg'
    - name: 'Runner'
      link: 'https://github.com/tuquet/runner'
      desc: 'High-performance distributed process supervision engine in Rust with Win32 Job Object sandboxing'
      icon: '/icons/runner.svg'
    - name: 'Browser'
      link: 'https://github.com/tuquet/browser'
      desc: 'High-fidelity automation runtime with Chrome DevTools Protocol coordination'
      icon: '/icons/browser.svg'
    - name: 'Cloud'
      link: 'https://github.com/tuquet/cloud'
      desc: 'Distributed cloud orchestration & secure Supabase telemetry synchronization'
      icon: '/icons/cloud.svg'

  Core Libraries & CLI:
    - name: 'Vue UI'
      link: 'https://github.com/tuquet/lib/tree/main/packages/vue-ui'
      desc: 'Enterprise UI design system & production component library based on Shadcn-Vue and Reka UI'
      icon: '/icons/vue-ui.svg'
    - name: 'Vue Table'
      link: 'https://github.com/tuquet/lib/tree/main/packages/vue-table'
      desc: 'Remote-driven high-density Data Table system for Vue 3 powered by TanStack Table'
      icon: '/icons/vue-table.svg'
    - name: 'MD Export'
      link: 'https://github.com/tuquet/lib/tree/main/packages/md-export'
      desc: 'Folder-aware Markdown to vector PDF, HTML, PNG, and JPEG multi-format exporter'
      icon: '/icons/pdf.svg'
    - name: 'CLI'
      link: 'https://github.com/tuquet/cli'
      desc: 'Interactive shell & developer CLI written in Rust for local automation environments'
      icon: '/icons/cli.svg'

  Tooling & Extensions:
    - name: 'Extension Runner'
      link: 'https://github.com/tuquet/lib/tree/main/packages/extension-runner'
      desc: 'Isomorphic web extension runtime polyfill & headless runner bundler'
      icon: '/icons/extension-runner.svg'
    - name: 'Lunar'
      link: 'https://github.com/tuquet/lib/tree/main/packages/lunar'
      desc: 'Astronomical Vietnamese Lunar-Solar calendar converter, recurrence engine, and Can Chi calculation'
      icon: '/icons/lunar.svg'
    - name: 'Scoop Bucket'
      link: 'https://github.com/tuquet/scoop-bucket'
      desc: 'Unified Windows package manager distribution for Tuquet CLI and runner binaries'
      icon: '/icons/scoop.svg'

  Enterprise & Case Studies:
    - name: 'EV Telemetry Platform'
      link: '/cv'
      desc: 'Real-time telemetry streaming platform for 100k+ smart electric vehicles (CMC Global)'
      icon: '/icons/ev-telemetry.svg'
    - name: 'Theme Park Booking Webview'
      link: '/cv'
      desc: 'High-traffic consumer booking webview and ticket management platform (CMC Global)'
      icon: '/icons/theme-park.svg'
    - name: 'Big Data Analytics Dashboard'
      link: '/cv'
      desc: 'Multi-platform enterprise Big Data extraction and intelligence dashboard (ICOMM Tech)'
      icon: '/icons/big-data.svg'
---

<!-- @layout-full-width -->
<ListProjects :projects="frontmatter.projects" />
