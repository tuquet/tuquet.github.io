<script setup lang="ts">
import { ref } from 'vue'

const mode = ref<'circles' | 'tiers'>('circles')
const hoveredId = ref<string | null>(null)

interface SponsorItem {
  id: string
  name: string
  role: string
  tier: 'executive' | 'enterprise' | 'foundational' | 'ecosystem' | 'tech'
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
  // Flagship Executive
  {
    id: 'vinfast',
    name: 'Automotive Enterprise (EV Telemetry)',
    role: 'Technical Project Lead',
    tier: 'executive',
    link: '/cv#electric-vehicle-ev-telemetry--fleet-monitoring-platform',
    left: 146.5,
    top: 203.1,
    size: 112,
    logo: 'https://www.google.com/s2/favicons?domain=vinfastauto.com&sz=128',
    domain: 'vinfastauto.com',
    timeline: '09/2024 – Present',
    desc: 'Led 3 squads (15+ engineers) delivering real-time EV telemetry streaming platform processing millions of daily vehicle events with sub-100ms latency.',
    tags: ['TypeScript', 'Next.js', 'Rust BFF', 'Redis Pub/Sub', 'WebSockets', 'Azure'],
  },
  {
    id: 'icomm',
    name: 'ICOMM Tech',
    role: 'Chief Product Officer & Tech Lead',
    tier: 'executive',
    link: '/cv#big-data-analytics--interactive-intelligence-platform',
    left: 258.5,
    top: 207.1,
    size: 104,
    logo: 'https://www.google.com/s2/favicons?domain=icomm.vn&sz=128',
    domain: 'icomm.vn',
    timeline: '05/2020 – 08/2024',
    desc: 'Directed product roadmap and technical architecture for enterprise Big Data intelligence platform, rendering 100k+ data points at 60fps.',
    tags: ['React', 'ECharts', 'Apache Solr', 'ClickHouse', 'Docker', 'Redis'],
  },

  // Enterprise Systems
  {
    id: 'cmc',
    name: 'CMC Global',
    role: 'Technical Project Lead / Senior Engineer',
    tier: 'enterprise',
    link: '/cv',
    left: 212.2,
    top: 297.6,
    size: 96,
    logo: 'https://www.google.com/s2/favicons?domain=cmcglobal.com.vn&sz=128',
    domain: 'cmcglobal.com.vn',
    timeline: '02/2024 – Present',
    desc: 'Spearheaded enterprise architecture governance, frontend engineering standards, and international digital transformation delivery.',
    tags: ['Micro-frontends', 'Architecture', 'Team Leadership', 'Core Web Vitals'],
  },
  {
    id: 'vinwonders',
    name: 'Theme Park Enterprise',
    role: 'Lead Frontend Engineer',
    tier: 'enterprise',
    link: '/cv#high-traffic-visitor-portals--partner-booking-webviews',
    left: 214.2,
    top: 129,
    size: 92,
    logo: 'https://www.google.com/s2/favicons?domain=vinwonders.com&sz=128',
    domain: 'vinwonders.com',
    timeline: '02/2024 – 08/2024',
    desc: 'Engineered high-traffic Visitor Web Portals and Partner Booking WebViews for premier international theme park destinations.',
    tags: ['React', 'Vite', 'Tailwind CSS', 'Mobile WebViews', 'Spring Boot'],
  },
  {
    id: 'ocg',
    name: 'OpenCommerce Group',
    role: 'Senior Software Engineer',
    tier: 'enterprise',
    link: '/cv#high-converting-e-commerce-storefront--merchant-suite',
    left: 123,
    top: 116.8,
    size: 92,
    logo: 'https://www.google.com/s2/favicons?domain=opencommercegroup.com&sz=128',
    domain: 'opencommercegroup.com',
    timeline: '12/2018 – 04/2020',
    desc: 'Spearheaded high-converting e-commerce storefront platform and intelligent cross-sell recommendation widgets (FCP < 1.2s, LCP < 1.8s).',
    tags: ['Vue.js', 'React', 'PLG', 'Conversion Optimization', 'AWS'],
  },

  // Foundational Career
  {
    id: 'tdt',
    name: 'TDT Asia',
    role: 'Fullstack Software Engineer',
    tier: 'foundational',
    link: '/cv#enterprise-japanese-business-management-portal',
    left: 140.3,
    top: 311.3,
    size: 72,
    logo: 'https://www.google.com/s2/favicons?domain=tdt.asia&sz=128',
    domain: 'tdt.asia',
    timeline: '05/2018 – 12/2018',
    desc: 'Delivered Enterprise Resource Planning (ERP) web applications customized to strict Japanese corporate quality standards.',
    tags: ['Angular', 'RxJS', 'Spring Boot', 'MySQL'],
  },

  // Open Source Ecosystem
  {
    id: 'automa',
    name: 'Tuquet Automa',
    role: 'Creator & Systems Architect',
    tier: 'ecosystem',
    link: 'https://tuquet.github.io/automa/',
    left: 306.1,
    top: 144.4,
    size: 68,
    logo: '/icons/automa.svg',
    timeline: '2024 – Present',
    desc: 'Closed-loop automation orchestration and headless browser coordination platform.',
    tags: ['Vue 3', 'TypeScript', 'Axum', 'Scalar'],
  },
  {
    id: 'runner',
    name: 'Tuquet Runner',
    role: 'Process Supervision Core in Rust',
    tier: 'ecosystem',
    link: 'https://github.com/tuquet/runner',
    left: 307.9,
    top: 305.8,
    size: 64,
    logo: '/icons/runner.svg',
    timeline: '2024 – Present',
    desc: 'Zero-zombie Chromium process supervision engine using Win32 Job Objects.',
    tags: ['Rust', 'Win32 API', 'IO Completion Ports'],
  },
  {
    id: 'browser',
    name: 'Tuquet Browser',
    role: 'CDP Automation Runtime',
    tier: 'ecosystem',
    link: 'https://github.com/tuquet/browser',
    left: 98,
    top: 272.3,
    size: 60,
    logo: '/icons/browser.svg',
    timeline: '2024 – Present',
    desc: 'High-fidelity automation runtime with Chrome DevTools Protocol coordination.',
    tags: ['CDP', 'TypeScript', 'Automation'],
  },
  {
    id: 'cloud',
    name: 'Tuquet Cloud',
    role: 'Telemetry Synchronization',
    tier: 'ecosystem',
    link: 'https://github.com/tuquet/cloud',
    left: 98.5,
    top: 195.4,
    size: 56,
    logo: '/icons/cloud.svg',
    timeline: '2024 – Present',
    desc: 'Distributed cloud orchestration and secure Supabase synchronization.',
    tags: ['Supabase', 'Cloudflare', 'Sync'],
  },

  // Tech Satellites
  {
    id: 'rust',
    name: 'Rust',
    role: 'Systems Programming & Win32 Job Objects',
    tier: 'tech',
    link: 'https://rust-lang.org',
    left: 353.3,
    top: 198.9,
    size: 48,
    logo: 'https://www.google.com/s2/favicons?domain=rust-lang.org&sz=128',
  },
  {
    id: 'vue',
    name: 'Vue.js',
    role: 'Modern Component Systems & Nuxt',
    tier: 'tech',
    link: 'https://vuejs.org',
    left: 353,
    top: 271.9,
    size: 48,
    logo: 'https://www.google.com/s2/favicons?domain=vuejs.org&sz=128',
  },
  {
    id: 'react',
    name: 'React',
    role: 'Concurrent Features & Next.js',
    tier: 'tech',
    link: 'https://react.dev',
    left: 287.8,
    top: 103.8,
    size: 48,
    logo: 'https://www.google.com/s2/favicons?domain=react.dev&sz=128',
  },
  {
    id: 'next',
    name: 'Next.js',
    role: 'Server Components & SSR',
    tier: 'tech',
    link: 'https://nextjs.org',
    left: 188.1,
    top: 372.4,
    size: 44,
    logo: 'https://www.google.com/s2/favicons?domain=nextjs.org&sz=128',
  },
  {
    id: 'spring',
    name: 'Spring Boot',
    role: 'Enterprise Microservices & Java',
    tier: 'tech',
    link: 'https://spring.io',
    left: 294.9,
    top: 364.7,
    size: 44,
    logo: 'https://www.google.com/s2/favicons?domain=spring.io&sz=128',
  },
  {
    id: 'redis',
    name: 'Redis',
    role: 'Pub/Sub & Low-latency Caching',
    tier: 'tech',
    link: 'https://redis.io',
    left: 199.2,
    top: 97.3,
    size: 44,
    logo: 'https://www.google.com/s2/favicons?domain=redis.io&sz=128',
  },
  {
    id: 'azure',
    name: 'Microsoft Azure',
    role: 'Cloud Infrastructure & Deployments',
    tier: 'tech',
    link: 'https://azure.microsoft.com',
    left: 75.5,
    top: 241.2,
    size: 42,
    logo: 'https://www.google.com/s2/favicons?domain=azure.microsoft.com&sz=128',
  },
  {
    id: 'docker',
    name: 'Docker',
    role: 'Containerization & Environments',
    tier: 'tech',
    link: 'https://docker.com',
    left: 382.5,
    top: 238.5,
    size: 42,
    logo: 'https://www.google.com/s2/favicons?domain=docker.com&sz=128',
  },
  {
    id: 'k8s',
    name: 'Kubernetes',
    role: 'Orchestration & Pod Scaling',
    tier: 'tech',
    link: 'https://kubernetes.io',
    left: 371.9,
    top: 317,
    size: 42,
    logo: 'https://www.google.com/s2/favicons?domain=kubernetes.io&sz=128',
  },
  {
    id: 'supabase',
    name: 'Supabase',
    role: 'PostgreSQL & Realtime Sync',
    tier: 'tech',
    link: 'https://supabase.com',
    left: 374,
    top: 162.2,
    size: 40,
    logo: 'https://www.google.com/s2/favicons?domain=supabase.com&sz=128',
  },
  {
    id: 'clickhouse',
    name: 'ClickHouse',
    role: 'OLAP Big Data Analytics',
    tier: 'tech',
    link: 'https://clickhouse.com',
    left: 251.5,
    top: 90,
    size: 40,
    logo: 'https://www.google.com/s2/favicons?domain=clickhouse.com&sz=128',
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    role: 'Design Systems & Utility CSS',
    tier: 'tech',
    link: 'https://tailwindcss.com',
    left: 102.4,
    top: 331.8,
    size: 38,
    logo: 'https://www.google.com/s2/favicons?domain=tailwindcss.com&sz=128',
  },
  {
    id: 'vite',
    name: 'Vite',
    role: 'Next-Gen Frontend Tooling',
    tier: 'tech',
    link: 'https://vite.dev',
    left: 263.4,
    top: 389.8,
    size: 38,
    logo: 'https://www.google.com/s2/favicons?domain=vite.dev&sz=128',
  },
  {
    id: 'ts',
    name: 'TypeScript',
    role: 'Type Safety & Domain Models',
    tier: 'tech',
    link: 'https://typescriptlang.org',
    left: 226.1,
    top: 396.9,
    size: 38,
    logo: 'https://www.google.com/s2/favicons?domain=typescriptlang.org&sz=128',
  },
  {
    id: 'github',
    name: 'GitHub',
    role: 'CI/CD & Open Source Governance',
    tier: 'tech',
    link: 'https://github.com',
    left: 223.4,
    top: 65.1,
    size: 38,
    logo: 'https://www.google.com/s2/favicons?domain=github.com&sz=128',
  },
  {
    id: 'solr',
    name: 'Apache Solr',
    role: 'Enterprise Search Indexing',
    tier: 'tech',
    link: 'https://solr.apache.org',
    left: 89.7,
    top: 163.3,
    size: 36,
    logo: 'https://www.google.com/s2/favicons?domain=solr.apache.org&sz=128',
  },
  {
    id: 'postgres',
    name: 'PostgreSQL',
    role: 'Relational Database Design',
    tier: 'tech',
    link: 'https://postgresql.org',
    left: 338.9,
    top: 366.9,
    size: 36,
    logo: 'https://www.google.com/s2/favicons?domain=postgresql.org&sz=128',
  },
  {
    id: 'shopify',
    name: 'Shopify',
    role: 'E-Commerce Integrations',
    tier: 'tech',
    link: 'https://shopify.com',
    left: 335.8,
    top: 110.2,
    size: 36,
    logo: 'https://www.google.com/s2/favicons?domain=shopify.com&sz=128',
  },
  {
    id: 'wooc',
    name: 'WooCommerce',
    role: 'Storefront Optimization',
    tier: 'tech',
    link: 'https://woocommerce.com',
    left: 154.5,
    top: 383.1,
    size: 34,
    logo: 'https://www.google.com/s2/favicons?domain=woocommerce.com&sz=128',
  },
]

const executiveItems = circles.filter(c => c.tier === 'executive')
const enterpriseItems = circles.filter(c => c.tier === 'enterprise')
const foundationalItems = circles.filter(c => c.tier === 'foundational')
const ecosystemItems = circles.filter(c => c.tier === 'ecosystem')
const techItems = circles.filter(c => c.tier === 'tech')
</script>

<template>
  <div class="sponsor-circles-component w-full select-none">
    <!-- View Mode Switcher -->
    <div flex="~ gap-3 items-center justify-center" class="my-6 z-20">
      <button
        type="button"
        class="transition-opacity duration-200 cursor-pointer text-sm"
        :class="mode === 'circles' ? 'op100 font-semibold underline underline-offset-4' : 'op50 hover:op80'"
        @click="mode = 'circles'"
      >
        Sponsor Circles
      </button>
      <span op25>|</span>
      <button
        type="button"
        class="transition-opacity duration-200 cursor-pointer text-sm"
        :class="mode === 'tiers' ? 'op100 font-semibold underline underline-offset-4' : 'op50 hover:op80'"
        @click="mode = 'tiers'"
      >
        Sponsor Tiers
      </button>
    </div>

    <!-- Mode 1: Circles (Circle Packing Dome) -->
    <div v-show="mode === 'circles'" flex="~ justify-center" w-full class="min-h-[530px] overflow-visible my-4">
      <div class="relative w-[500px] h-[500px] max-w-full mx-auto group shrink-0 transform scale-75 sm:scale-90 md:scale-100 origin-center transition-transform duration-300">
        <component
          :is="item.link ? (item.link.startsWith('http') ? 'a' : 'RouterLink') : 'div'"
          v-for="item in circles"
          :key="item.id"
          :style="{
            width: `${item.size}px`,
            height: `${item.size}px`,
            left: `${item.left}px`,
            top: `${item.top}px`,
            zIndex: hoveredId === item.id ? 60 : (item.tier === 'executive' ? 10 : 2),
          }"
          class="transition-all duration-500 rounded-1/2 overflow-hidden absolute hover:shadow-2xl hover:rounded-xl hover:scale-125 border border-base bg-white dark:bg-zinc-900 flex items-center justify-center cursor-pointer p-1.5"
          v-bind="item.link ? (item.link.startsWith('http') ? { href: item.link, target: '_blank', rel: 'noopener noreferrer' } : { to: item.link }) : {}"
          :title="`${item.name}${item.role ? ` — ${item.role}` : ''}`"
          @mouseenter="hoveredId = item.id"
          @mouseleave="hoveredId = null"
        >
          <img
            :src="item.logo"
            :alt="item.name"
            class="w-full h-full object-contain rounded-full transition-all duration-300 pointer-events-none"
            loading="lazy"
          >
        </component>
      </div>
    </div>

    <!-- Mode 2: Tiers (Structured Cards View) -->
    <div v-show="mode === 'tiers'" class="max-w-260 mx-auto py-4 text-left">
      <!-- Section: Executive & Flagship -->
      <div class="mb-12">
        <div select-none relative h18 mt2 pointer-events-none>
          <span text-5em color-transparent absolute left--1rem top-0rem font-bold leading-1em text-stroke-1.5 text-stroke-hex-aaa op35 dark:op20>EXECUTIVE</span>
        </div>
        <div class="flex flex-col gap-4 mt-2">
          <component
            :is="item.link.startsWith('http') ? 'a' : 'RouterLink'"
            v-for="item in executiveItems"
            :key="item.id"
            class="p-4 sm:p-5 rounded-xl border border-base hover:bg-[#8888880e] transition-all flex flex-col sm:flex-row sm:items-start gap-4 no-underline!"
            v-bind="item.link.startsWith('http') ? { href: item.link, target: '_blank', rel: 'noopener noreferrer' } : { to: item.link }"
          >
            <div class="w-14 h-14 shrink-0 rounded-xl border border-base bg-white dark:bg-zinc-900 p-2 flex items-center justify-center">
              <img :src="item.logo" :alt="item.name" class="w-full h-full object-contain rounded-lg">
            </div>
            <div class="flex-auto">
              <div class="flex flex-wrap items-center justify-between gap-2">
                <div class="text-base font-semibold text-zinc-900 dark:text-zinc-100">{{ item.name }}</div>
                <span class="text-xs px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-mono">{{ item.timeline }}</span>
              </div>
              <div class="text-xs font-medium text-amber-600 dark:text-amber-400 mt-0.5">{{ item.role }}</div>
              <p class="text-xs op70 mt-2 leading-relaxed">{{ item.desc }}</p>
              <div class="flex flex-wrap gap-1.5 mt-3">
                <span v-for="tag in item.tags" :key="tag" class="text-[11px] px-2 py-0.5 rounded bg-zinc-100/80 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-300 font-mono">
                  {{ tag }}
                </span>
              </div>
            </div>
          </component>
        </div>
      </div>

      <!-- Section: Enterprise Systems -->
      <div class="mb-12">
        <div select-none relative h18 mt2 pointer-events-none>
          <span text-5em color-transparent absolute left--1rem top-0rem font-bold leading-1em text-stroke-1.5 text-stroke-hex-aaa op35 dark:op20>ENTERPRISE</span>
        </div>
        <div grid="~ cols-1 md:cols-2 gap-4" class="mt-2">
          <component
            :is="item.link.startsWith('http') ? 'a' : 'RouterLink'"
            v-for="item in enterpriseItems"
            :key="item.id"
            class="p-4 rounded-xl border border-base hover:bg-[#8888880e] transition-all flex items-start gap-3.5 no-underline!"
            v-bind="item.link.startsWith('http') ? { href: item.link, target: '_blank', rel: 'noopener noreferrer' } : { to: item.link }"
          >
            <div class="w-11 h-11 shrink-0 rounded-lg border border-base bg-white dark:bg-zinc-900 p-1.5 flex items-center justify-center">
              <img :src="item.logo" :alt="item.name" class="w-full h-full object-contain rounded-md">
            </div>
            <div class="flex-auto min-w-0">
              <div class="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">{{ item.name }}</div>
              <div class="text-xs text-blue-600 dark:text-blue-400 mt-0.5 truncate">{{ item.role }}</div>
              <div class="text-[11px] op50 font-mono mt-0.5">{{ item.timeline }}</div>
              <p class="text-xs op70 mt-1.5 line-clamp-2 leading-relaxed">{{ item.desc }}</p>
            </div>
          </component>
        </div>
      </div>

      <!-- Section: Foundational Career & Open Source -->
      <div class="mb-12">
        <div select-none relative h18 mt2 pointer-events-none>
          <span text-5em color-transparent absolute left--1rem top-0rem font-bold leading-1em text-stroke-1.5 text-stroke-hex-aaa op35 dark:op20>ECOSYSTEM</span>
        </div>
        <div grid="~ cols-1 sm:cols-2 md:cols-3 gap-3.5" class="mt-2">
          <component
            :is="item.link.startsWith('http') ? 'a' : 'RouterLink'"
            v-for="item in [...foundationalItems, ...ecosystemItems]"
            :key="item.id"
            class="p-3 rounded-lg border border-base hover:bg-[#8888880e] transition-all flex items-center gap-3 no-underline!"
            v-bind="item.link.startsWith('http') ? { href: item.link, target: '_blank', rel: 'noopener noreferrer' } : { to: item.link }"
          >
            <div class="w-9 h-9 shrink-0 rounded-md border border-base bg-white dark:bg-zinc-900 p-1 flex items-center justify-center">
              <img :src="item.logo" :alt="item.name" class="w-full h-full object-contain rounded-sm">
            </div>
            <div class="flex-auto min-w-0">
              <div class="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate">{{ item.name }}</div>
              <div class="text-[11px] op60 truncate">{{ item.role }}</div>
            </div>
          </component>
        </div>
      </div>

      <!-- Section: Core Technologies -->
      <div class="mb-8">
        <div select-none relative h18 mt2 pointer-events-none>
          <span text-5em color-transparent absolute left--1rem top-0rem font-bold leading-1em text-stroke-1.5 text-stroke-hex-aaa op35 dark:op20>TECHNOLOGIES</span>
        </div>
        <div class="flex flex-wrap gap-2 mt-2">
          <a
            v-for="item in techItems"
            :key="item.id"
            :href="item.link"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-base hover:bg-[#88888812] transition-colors text-xs text-zinc-700 dark:text-zinc-300 no-underline!"
            :title="item.role"
          >
            <img :src="item.logo" :alt="item.name" class="w-4 h-4 object-contain rounded-full">
            <span>{{ item.name }}</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
