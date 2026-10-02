<script setup lang="ts">
import { computed, ref } from 'vue'

const mode = ref<'circles' | 'tiers'>('circles')
const hoveredId = ref<string | null>(null)

interface SponsorItem {
  id: string
  name: string
  tier: 'special' | 'platinum' | 'ecosystem' | 'tech'
  weight?: number
  link?: string
  left: number
  top: number
  size: number
  logo: string
  domain?: string
  timeline?: string
  desc?: string
  tags?: string[]
}

const circles: SponsorItem[] = [
  {
    id: 'vinfast',
    name: 'VinFast',
    tier: 'special',
    weight: 95,
    link: '/cv#electric-vehicle-ev-telemetry--fleet-monitoring-platform',
    logo: '/logos/vinfast.png',
    domain: 'vinfastauto.com',
    timeline: '2024 – Present',
    desc: 'Real-time EV telemetry streaming platform for VinFast electric vehicles, processing millions of daily vehicle events with sub-100ms latency.',
    tags: [
      'TypeScript',
      'Next.js',
      'Rust BFF',
      'Redis Pub/Sub',
      'WebSockets',
      'Azure',
    ],
    left: 141.2,
    top: 219.8,
    size: 148.8,
  },
  {
    id: 'cmc',
    name: 'CMC Global',
    tier: 'special',
    weight: 85,
    link: '/cv',
    logo: '/logos/cmc.png',
    domain: 'cmcglobal.com.vn',
    timeline: '2024 – Present',
    desc: 'Global digital transformation partner delivering high-impact EV telemetry and visitor portal platforms under strict enterprise SLAs.',
    tags: [
      'Micro-frontends',
      'Architecture',
      'Engineering Governance',
      'Core Web Vitals',
    ],
    left: 292.9,
    top: 226.9,
    size: 134.6,
  },
  {
    id: 'icomm',
    name: 'iCOMM Media & Tech',
    tier: 'special',
    weight: 82,
    link: '/cv#big-data-analytics--interactive-intelligence-platform',
    logo: '/logos/icomm-symbol.png',
    domain: 'icomm.vn',
    timeline: '2020 – 2024',
    desc: 'Enterprise Big Data extraction, interactive intelligence dashboards, and high-density financial data visualization platforms.',
    tags: [
      'React',
      'ECharts',
      'Apache Solr',
      'ClickHouse',
      'Docker',
      'Redis',
    ],
    left: 229.5,
    top: 347.5,
    size: 130.4,
  },
  {
    id: 'lotte',
    name: 'Lotte Group',
    tier: 'special',
    weight: 68,
    link: '/cv#high-scale-web--booking-portals--lotte-group-theme-park--hospitality',
    logo: '/logos/lotte.png',
    domain: 'lotte.co.kr',
    timeline: '2024',
    desc: 'High-traffic visitor web portals and partner booking WebViews for Lotte World amusement parks and hospitality destinations.',
    tags: [
      'React',
      'Vite',
      'Tailwind CSS',
      'Mobile WebViews',
      'Spring Boot',
    ],
    left: 239.1,
    top: 132.6,
    size: 110.1,
  },
  {
    id: 'vietcombank',
    name: 'Vietcombank',
    tier: 'platinum',
    weight: 62,
    link: '/cv#big-data-analytics--interactive-intelligence-platform',
    logo: '/logos/vietcombank.svg',
    domain: 'vietcombank.com.vn',
    timeline: '2020 – 2024',
    desc: 'Enterprise financial data extraction, banking intelligence dashboards, and interactive reporting for Vietnam\'s leading commercial bank.',
    tags: [
      'React',
      'ECharts',
      'ClickHouse',
      'Apache Solr',
    ],
    left: 136.4,
    top: 118.8,
    size: 101.4,
  },
  {
    id: 'vietnam-airlines',
    name: 'Vietnam Airlines',
    tier: 'platinum',
    weight: 62,
    link: '/cv#big-data-analytics--interactive-intelligence-platform',
    logo: '/logos/vietnam-airlines.png',
    domain: 'vietnamairlines.com',
    timeline: '2020 – 2024',
    desc: 'Aviation operational intelligence, flight data visualization, and real-time passenger insight dashboard.',
    tags: [
      'React',
      'ECharts',
      'Real-time Analytics',
    ],
    left: 125.3,
    top: 365.2,
    size: 101.4,
  },
  {
    id: 'vietinbank',
    name: 'VietinBank',
    tier: 'platinum',
    weight: 60,
    link: '/cv#big-data-analytics--interactive-intelligence-platform',
    logo: '/logos/vietinbank.svg',
    domain: 'vietinbank.vn',
    timeline: '2020 – 2024',
    desc: 'Multi-dimensional financial intelligence and interactive data grid analytics dashboard under strict enterprise SLA.',
    tags: [
      'React',
      'Highcharts',
      'Big Data',
      'Redis',
    ],
    left: 352,
    top: 132.8,
    size: 98.4,
  },
  {
    id: 'bidv',
    name: 'BIDV',
    tier: 'platinum',
    weight: 60,
    link: '/cv#big-data-analytics--interactive-intelligence-platform',
    logo: '/logos/bidv.svg',
    domain: 'bidv.com.vn',
    timeline: '2020 – 2024',
    desc: 'High-density banking intelligence visualization and automated reporting system for BIDV.',
    tags: [
      'React',
      'ECharts',
      'Data Grid',
      'Solr',
    ],
    left: 362.3,
    top: 352.8,
    size: 98.4,
  },
  {
    id: 'agribank',
    name: 'Agribank',
    tier: 'platinum',
    weight: 58,
    link: '/cv#big-data-analytics--interactive-intelligence-platform',
    logo: '/logos/agribank.svg',
    domain: 'agribank.com.vn',
    timeline: '2020 – 2024',
    desc: 'Large-scale agricultural and rural banking data analytics dashboard and reporting infrastructure.',
    tags: [
      'React',
      'Data Visualizations',
      'Big Data',
    ],
    left: 59.5,
    top: 184,
    size: 95.4,
  },
  {
    id: 'vietjet',
    name: 'Vietjet Air',
    tier: 'platinum',
    weight: 56,
    link: '/cv#big-data-analytics--interactive-intelligence-platform',
    logo: '/logos/vietjet.png',
    domain: 'vietjetair.com',
    timeline: '2020 – 2024',
    desc: 'High-concurrency flight intelligence monitoring, booking analytics, and operational metrics dashboard.',
    tags: [
      'React',
      'Data Visualization',
      'ClickHouse',
    ],
    left: 57.6,
    top: 300.7,
    size: 92.5,
  },
  {
    id: 'ocg',
    name: 'OpenCommerce Group',
    tier: 'platinum',
    weight: 54,
    link: '/cv#high-converting-e-commerce-storefront--merchant-suite',
    logo: '/logos/ocg.png',
    domain: 'opencommercegroup.com',
    timeline: '2018 – 2020',
    desc: 'High-converting cross-border e-commerce storefront platform and automated merchant suite.',
    tags: [
      'Vue.js',
      'React',
      'PLG',
      'Conversion Optimization',
      'AWS',
    ],
    left: 422.7,
    top: 208,
    size: 89.5,
  },
  {
    id: 'nha-atelier',
    name: 'Nhà Atelier',
    tier: 'platinum',
    weight: 52,
    link: 'https://nhaateliertattoo.com',
    logo: '/logos/nha-atelier.jpg',
    domain: 'nhaateliertattoo.com',
    timeline: '2024 – Present',
    desc: 'High-craft bespoke tattoo studio and art atelier based in Vietnam. Web platform & digital identity partner.',
    tags: [
      'Brand Identity',
      'Next.js',
      'Creative Studio',
    ],
    left: 442.2,
    top: 298.6,
    size: 86.5,
  },
  {
    id: 'bamboo',
    name: 'Bamboo Airways',
    tier: 'platinum',
    weight: 50,
    link: '/cv#big-data-analytics--interactive-intelligence-platform',
    logo: '/logos/bamboo.svg',
    domain: 'bambooairways.com',
    timeline: '2020 – 2024',
    desc: 'Interactive flight intelligence dashboard and performance analytics platform.',
    tags: [
      'React',
      'ECharts',
      'Interactive UI',
    ],
    left: 208.6,
    top: 56.4,
    size: 83.5,
  },
  {
    id: 'tdt',
    name: 'TDT Asia',
    tier: 'platinum',
    weight: 46,
    link: '/cv#enterprise-japanese-business-management-portal',
    logo: '/logos/tdt.png',
    domain: 'tdt.asia',
    timeline: '2018',
    desc: 'Enterprise Resource Planning (ERP) web applications customized to strict Japanese corporate quality standards.',
    tags: [
      'Angular',
      'RxJS',
      'Spring Boot',
      'MySQL',
    ],
    left: 186.6,
    top: 455.2,
    size: 77.5,
  },
  {
    id: 'automa',
    name: 'Automa',
    tier: 'ecosystem',
    weight: 48,
    link: 'https://tuquet.github.io/automa/',
    logo: '/icons/automa.svg',
    domain: 'tuquet.github.io/automa',
    timeline: '2024 – Present',
    desc: 'Closed-loop automation orchestration and headless browser coordination platform.',
    tags: [
      'Vue 3',
      'TypeScript',
      'Axum',
      'Scalar',
    ],
    left: 308.5,
    top: 65.8,
    size: 80.5,
  },
  {
    id: 'runner',
    name: 'Runner',
    tier: 'ecosystem',
    weight: 46,
    link: 'https://github.com/tuquet/runner',
    logo: '/icons/runner.svg',
    domain: 'github.com/tuquet/runner',
    timeline: '2024 – Present',
    desc: 'Zero-zombie Chromium process supervision engine in Rust using Win32 Job Objects.',
    tags: [
      'Rust',
      'Win32 API',
      'IO Completion Ports',
    ],
    left: 334.9,
    top: 445.9,
    size: 77.5,
  },
  {
    id: 'browser',
    name: 'Browser',
    tier: 'ecosystem',
    weight: 44,
    link: 'https://github.com/tuquet/browser',
    logo: '/icons/browser.svg',
    domain: 'github.com/tuquet/browser',
    timeline: '2024 – Present',
    desc: 'High-fidelity automation runtime with Chrome DevTools Protocol coordination.',
    tags: [
      'CDP',
      'TypeScript',
      'Automation',
    ],
    left: 3,
    top: 251.3,
    size: 74.4,
  },
  {
    id: 'cloud',
    name: 'Cloud',
    tier: 'ecosystem',
    weight: 42,
    link: 'https://github.com/tuquet/cloud',
    logo: '/icons/cloud.svg',
    domain: 'github.com/tuquet/cloud',
    timeline: '2024 – Present',
    desc: 'Distributed cloud orchestration and secure Supabase synchronization.',
    tags: [
      'Supabase',
      'Cloudflare',
      'Sync',
    ],
    left: 270.1,
    top: 4.3,
    size: 71.4,
  },
  {
    id: 'rust',
    name: 'Rust',
    tier: 'tech',
    weight: 26,
    link: 'https://rust-lang.org',
    logo: 'https://www.google.com/s2/favicons?domain=rust-lang.org&sz=128',
    left: 88,
    top: 134.9,
    size: 46.4,
  },
  {
    id: 'vue',
    name: 'Vue.js',
    tier: 'tech',
    weight: 26,
    link: 'https://vuejs.org',
    logo: 'https://www.google.com/s2/favicons?domain=vuejs.org&sz=128',
    left: 453.3,
    top: 159.3,
    size: 46.4,
  },
  {
    id: 'react',
    name: 'React',
    tier: 'tech',
    weight: 26,
    link: 'https://react.dev',
    logo: 'https://www.google.com/s2/favicons?domain=react.dev&sz=128',
    left: 76.1,
    top: 395.9,
    size: 46.4,
  },
  {
    id: 'next',
    name: 'Next.js',
    tier: 'tech',
    weight: 24,
    link: 'https://nextjs.org',
    logo: 'https://www.google.com/s2/favicons?domain=nextjs.org&sz=128',
    left: 266.4,
    top: 480.5,
    size: 43.1,
  },
  {
    id: 'spring',
    name: 'Spring Boot',
    tier: 'tech',
    weight: 24,
    link: 'https://spring.io',
    logo: 'https://www.google.com/s2/favicons?domain=spring.io&sz=128',
    left: 305.2,
    top: 505.4,
    size: 43.1,
  },
  {
    id: 'redis',
    name: 'Redis',
    tier: 'tech',
    weight: 24,
    link: 'https://redis.io',
    logo: 'https://www.google.com/s2/favicons?domain=redis.io&sz=128',
    left: 162.7,
    top: 72.8,
    size: 43.1,
  },
  {
    id: 'azure',
    name: 'Microsoft Azure',
    tier: 'tech',
    weight: 22,
    link: 'https://azure.microsoft.com',
    logo: 'https://www.google.com/s2/favicons?domain=azure.microsoft.com&sz=128',
    left: 391.7,
    top: 90.8,
    size: 39.9,
  },
  {
    id: 'docker',
    name: 'Docker',
    tier: 'tech',
    weight: 22,
    link: 'https://docker.com',
    logo: 'https://www.google.com/s2/favicons?domain=docker.com&sz=128',
    left: 463.3,
    top: 387.9,
    size: 39.9,
  },
  {
    id: 'k8s',
    name: 'Kubernetes',
    tier: 'tech',
    weight: 22,
    link: 'https://kubernetes.io',
    logo: 'https://www.google.com/s2/favicons?domain=kubernetes.io&sz=128',
    left: 144.1,
    top: 468.5,
    size: 39.9,
  },
  {
    id: 'supabase',
    name: 'Supabase',
    tier: 'tech',
    weight: 22,
    link: 'https://supabase.com',
    logo: 'https://www.google.com/s2/favicons?domain=supabase.com&sz=128',
    left: 413.7,
    top: 450.6,
    size: 39.9,
  },
  {
    id: 'clickhouse',
    name: 'ClickHouse',
    tier: 'tech',
    weight: 22,
    link: 'https://clickhouse.com',
    logo: 'https://www.google.com/s2/favicons?domain=clickhouse.com&sz=128',
    left: 504.7,
    top: 268.7,
    size: 39.9,
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    tier: 'tech',
    weight: 20,
    link: 'https://tailwindcss.com',
    logo: 'https://www.google.com/s2/favicons?domain=tailwindcss.com&sz=128',
    left: 116.3,
    top: 102.1,
    size: 36.6,
  },
  {
    id: 'vite',
    name: 'Vite',
    tier: 'tech',
    weight: 20,
    link: 'https://vite.dev',
    logo: 'https://www.google.com/s2/favicons?domain=vite.dev&sz=128',
    left: 440.6,
    top: 123.4,
    size: 36.6,
  },
  {
    id: 'ts',
    name: 'TypeScript',
    tier: 'tech',
    weight: 20,
    link: 'https://typescriptlang.org',
    logo: 'https://www.google.com/s2/favicons?domain=typescriptlang.org&sz=128',
    left: 100.2,
    top: 440.8,
    size: 36.6,
  },
  {
    id: 'github',
    name: 'GitHub',
    tier: 'tech',
    weight: 20,
    link: 'https://github.com',
    logo: 'https://www.google.com/s2/favicons?domain=github.com&sz=128',
    left: 125.1,
    top: 63.5,
    size: 36.6,
  },
  {
    id: 'solr',
    name: 'Apache Solr',
    tier: 'tech',
    weight: 20,
    link: 'https://solr.apache.org',
    logo: 'https://www.google.com/s2/favicons?domain=solr.apache.org&sz=128',
    left: 433.7,
    top: 84.5,
    size: 36.6,
  },
  {
    id: 'postgres',
    name: 'PostgreSQL',
    tier: 'tech',
    weight: 20,
    link: 'https://postgresql.org',
    logo: 'https://www.google.com/s2/favicons?domain=postgresql.org&sz=128',
    left: 247.2,
    top: 520.1,
    size: 36.6,
  },
]

const specialItems = computed(() => circles.filter(c => c.tier === 'special'))
const platinumItems = computed(() => circles.filter(c => c.tier === 'platinum'))
const ecosystemItems = computed(() => circles.filter(c => c.tier === 'ecosystem'))
const techItems = computed(() => circles.filter(c => c.tier === 'tech'))

const activeItem = computed(() => circles.find(c => c.id === hoveredId.value) || null)
</script>

<template>
  <div class="sponsor-circles-component w-full select-none">
    <!-- View Mode Switcher -->
    <div class="flex items-center justify-center gap-3 my-8 z-20">
      <button
        type="button"
        class="transition-opacity duration-200 cursor-pointer text-sm"
        :class="mode === 'circles' ? 'op75 font-medium' : 'op50 hover:op75'"
        @click="mode = 'circles'"
      >
        Sponsor Circles
      </button>
      <span class="op25 mx-1">|</span>
      <button
        type="button"
        class="transition-opacity duration-200 cursor-pointer text-sm"
        :class="mode === 'tiers' ? 'op75 font-medium' : 'op50 hover:op75'"
        @click="mode = 'tiers'"
      >
        Sponsor Tiers
      </button>
    </div>

    <!-- Mode 1: Circles (Circle Packing Dome) -->
    <div v-show="mode === 'circles'" class="flex flex-col items-center w-full min-h-[640px] overflow-visible my-2">
      <div class="relative w-[560px] h-[560px] max-w-full mx-auto group shrink-0 transform scale-65 sm:scale-80 md:scale-95 lg:scale-100 origin-center transition-transform duration-300 mt-2">
        <component
          :is="item.link ? (item.link.startsWith('http') ? 'a' : 'RouterLink') : 'div'"
          v-for="item in circles"
          :key="item.id"
          :style="{
            width: `${item.size}px`,
            height: `${item.size}px`,
            left: `${item.left}px`,
            top: `${item.top}px`,
            zIndex: hoveredId === item.id ? 60 : (item.tier === 'special' ? 12 : item.tier === 'platinum' ? 8 : 2),
          }"
          class="transition-all duration-300 rounded-full overflow-hidden absolute hover:shadow-2xl hover:scale-120 border border-base bg-white dark:bg-zinc-900 flex items-center justify-center cursor-pointer p-2.5 hover:border-zinc-400 dark:hover:border-zinc-500"
          v-bind="item.link ? (item.link.startsWith('http') ? { href: item.link, target: '_blank', rel: 'noopener noreferrer' } : { to: item.link }) : {}"
          @mouseenter="hoveredId = item.id"
          @mouseleave="hoveredId = null"
        >
          <img
            :src="item.logo"
            :alt="item.name"
            class="w-full h-full object-contain rounded-full transition-all duration-300 pointer-events-none"
            style="margin: 0 !important;"
            loading="lazy"
          >
        </component>
      </div>

      <!-- Live Hover Detail Bar -->
      <div class="h-14 mt-4 flex items-center justify-center">
        <transition name="fade" mode="out-in">
          <div
            v-if="activeItem"
            :key="activeItem.id"
            class="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-base bg-zinc-50 dark:bg-zinc-900 shadow-md transition-all max-w-full"
          >
            <img
              :src="activeItem.logo"
              :alt="activeItem.name"
              class="w-6 h-6 min-w-6 min-h-6 max-w-6 max-h-6 object-contain rounded-full shrink-0 !m-0 !p-0 !block"
              style="width: 24px; height: 24px; min-width: 24px; min-height: 24px; margin: 0 !important;"
            >
            <div class="text-xs sm:text-sm flex flex-wrap sm:flex-nowrap items-center gap-1.5 whitespace-nowrap leading-none">
              <span class="font-semibold text-zinc-900 dark:text-zinc-100">{{ activeItem.name }}</span>
              <span v-if="activeItem.domain" class="text-zinc-400 dark:text-zinc-500">·</span>
              <span v-if="activeItem.domain" class="text-zinc-600 dark:text-zinc-300 font-mono text-[11px]">{{ activeItem.domain }}</span>
              <span v-if="activeItem.timeline" class="font-mono text-[11px] text-zinc-400 dark:text-zinc-500">({{ activeItem.timeline }})</span>
            </div>
          </div>
          <div
            v-else
            key="placeholder"
            class="text-xs text-zinc-400/60 dark:text-zinc-500/60 font-mono tracking-wide px-4 py-2"
          >
            Hover over any sponsor to view details
          </div>
        </transition>
      </div>
    </div>

    <!-- Mode 2: Tiers (Structured Categories View) -->
    <div v-show="mode === 'tiers'" class="max-w-260 mx-auto py-4 text-left">
      <!-- Section 1: Special Sponsors -->
      <div class="mb-14">
        <div select-none relative h18 mt2 pointer-events-none>
          <span text-4.5em sm:text-5em color-transparent absolute left--1rem top-0rem font-bold leading-1em text-stroke-1.5 text-stroke-hex-aaa op35 dark:op20>SPECIAL</span>
        </div>
        <div class="text-xs font-mono text-zinc-500 dark:text-zinc-400 mb-3 tracking-wide uppercase">
          Special Sponsors
        </div>
        <div class="flex flex-col gap-4 mt-2">
          <component
            :is="item.link.startsWith('http') ? 'a' : 'RouterLink'"
            v-for="item in specialItems"
            :key="item.id"
            class="p-4 sm:p-5 rounded-xl border border-base hover:bg-[#8888880e] transition-all flex items-start gap-4 no-underline!"
            v-bind="item.link.startsWith('http') ? { href: item.link, target: '_blank', rel: 'noopener noreferrer' } : { to: item.link }"
          >
            <div class="w-14 h-14 shrink-0 rounded-xl border border-base bg-white dark:bg-zinc-900 p-2 flex items-center justify-center">
              <img :src="item.logo" :alt="item.name" class="w-full h-full object-contain rounded-lg">
            </div>
            <div class="flex-auto min-w-0">
              <div class="flex flex-wrap items-center justify-between gap-2">
                <div class="text-base font-semibold text-zinc-900 dark:text-zinc-100">{{ item.name }}</div>
                <span v-if="item.timeline" class="text-[11px] px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-mono">{{ item.timeline }}</span>
              </div>
              <div v-if="item.domain" class="text-xs font-medium text-amber-600 dark:text-amber-400 mt-0.5 font-mono">{{ item.domain }}</div>
              <p class="text-xs sm:text-sm op70 mt-1.5 leading-relaxed">{{ item.desc }}</p>
              <div v-if="item.tags" class="flex flex-wrap gap-1.5 mt-2.5">
                <span v-for="tag in item.tags" :key="tag" class="text-[10.5px] px-2 py-0.2 rounded bg-zinc-100/80 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-300 font-mono">
                  {{ tag }}
                </span>
              </div>
            </div>
          </component>
        </div>
      </div>

      <!-- Section 2: Platinum Sponsors -->
      <div class="mb-14">
        <div select-none relative h18 mt2 pointer-events-none>
          <span text-4.5em sm:text-5em color-transparent absolute left--1rem top-0rem font-bold leading-1em text-stroke-1.5 text-stroke-hex-aaa op35 dark:op20>PLATINUM</span>
        </div>
        <div class="text-xs font-mono text-zinc-500 dark:text-zinc-400 mb-3 tracking-wide uppercase">
          Platinum Sponsors
        </div>
        <div class="flex flex-col gap-4 mt-2">
          <component
            :is="item.link.startsWith('http') ? 'a' : 'RouterLink'"
            v-for="item in platinumItems"
            :key="item.id"
            class="p-4 sm:p-5 rounded-xl border border-base hover:bg-[#8888880e] transition-all flex items-start gap-4 no-underline!"
            v-bind="item.link.startsWith('http') ? { href: item.link, target: '_blank', rel: 'noopener noreferrer' } : { to: item.link }"
          >
            <div class="w-14 h-14 shrink-0 rounded-xl border border-base bg-white dark:bg-zinc-900 p-2 flex items-center justify-center">
              <img :src="item.logo" :alt="item.name" class="w-full h-full object-contain rounded-lg">
            </div>
            <div class="flex-auto min-w-0">
              <div class="flex flex-wrap items-center justify-between gap-2">
                <div class="text-base font-semibold text-zinc-900 dark:text-zinc-100">{{ item.name }}</div>
                <span class="text-[11px] px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-mono">{{ item.timeline }}</span>
              </div>
              <div v-if="item.domain" class="text-xs font-medium text-emerald-600 dark:text-emerald-400 mt-0.5 font-mono">{{ item.domain }}</div>
              <p class="text-xs sm:text-sm op70 mt-1.5 leading-relaxed">{{ item.desc }}</p>
              <div v-if="item.tags" class="flex flex-wrap gap-1.5 mt-2.5">
                <span v-for="tag in item.tags" :key="tag" class="text-[10.5px] px-2 py-0.2 rounded bg-zinc-100/80 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-300 font-mono">
                  {{ tag }}
                </span>
              </div>
            </div>
          </component>
        </div>
      </div>

      <!-- Section 3: Open Source Tooling Ecosystem -->
      <div class="mb-14">
        <div select-none relative h18 mt2 pointer-events-none>
          <span text-4.5em sm:text-5em color-transparent absolute left--1rem top-0rem font-bold leading-1em text-stroke-1.5 text-stroke-hex-aaa op35 dark:op20>ECOSYSTEM</span>
        </div>
        <div class="text-xs font-mono text-zinc-500 dark:text-zinc-400 mb-3 tracking-wide uppercase">
          Ecosystem Backers &amp; Infrastructure
        </div>
        <div grid="~ cols-1 sm:cols-2 md:cols-4 gap-3.5" class="mt-2">
          <component
            :is="item.link.startsWith('http') ? 'a' : 'RouterLink'"
            v-for="item in ecosystemItems"
            :key="item.id"
            class="p-3.5 rounded-lg border border-base hover:bg-[#8888880e] transition-all flex items-center gap-3 no-underline!"
            v-bind="item.link.startsWith('http') ? { href: item.link, target: '_blank', rel: 'noopener noreferrer' } : { to: item.link }"
          >
            <div class="w-10 h-10 shrink-0 rounded-md border border-base bg-white dark:bg-zinc-900 p-1 flex items-center justify-center">
              <img :src="item.logo" :alt="item.name" class="w-full h-full object-contain rounded-sm">
            </div>
            <div class="flex-auto min-w-0">
              <div class="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate">{{ item.name }}</div>
              <div class="text-[11px] op60 font-mono truncate">{{ item.domain || 'Open Source' }}</div>
            </div>
          </component>
        </div>
      </div>

      <!-- Section 4: Core Technologies -->
      <div class="mb-8">
        <div select-none relative h18 mt2 pointer-events-none>
          <span text-4.5em sm:text-5em color-transparent absolute left--1rem top-0rem font-bold leading-1em text-stroke-1.5 text-stroke-hex-aaa op35 dark:op20>TECHNOLOGIES</span>
        </div>
        <div class="text-xs font-mono text-zinc-500 dark:text-zinc-400 mb-3 tracking-wide uppercase">
          Core Technologies &amp; Cloud Runtimes
        </div>
        <div class="flex flex-wrap gap-2 mt-2">
          <a
            v-for="item in techItems"
            :key="item.id"
            :href="item.link"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-base hover:bg-[#88888812] transition-colors text-xs text-zinc-700 dark:text-zinc-300 no-underline!"
            :title="item.name"
          >
            <img :src="item.logo" :alt="item.name" class="w-4 h-4 object-contain rounded-full">
            <span>{{ item.name }}</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sponsor-circles-component img {
  margin: 0 !important;
}
</style>
