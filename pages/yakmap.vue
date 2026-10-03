<script setup lang="ts">
import type { ProjectNode } from '~/data/yak-data'
import { useHead } from '@unhead/vue'
import { ref } from 'vue'
import { isDark } from '~/logics'
import { primary } from '~/data/yak-data'

const mapRef = ref<any>()
const selectedNode = ref<ProjectNode | null>(null)

useHead({
  title: 'Yak Map - Toby Nguyen',
  meta: [
    { name: 'description', content: 'Interactive dependency and derivation map of open source tools by Tu Quet' },
  ],
})

function onSelect(node: ProjectNode | null) {
  selectedNode.value = node
}
</script>

<template>
  <div class="max-w-320 mx-auto">
    <div class="prose m-auto mb-8 text-center">
      <div class="flex items-center justify-center gap-3">
        <span class="text-4xl">🐃</span>
        <h1 class="mb-0 text-3xl font-bold">
          Yak Map
        </h1>
      </div>
      <p class="op60 mt-2 text-base italic">
        "Yak shaving" is the chain of problems solved while trying to solve an initial problem.
        Here is the map of tools, runtimes, and libraries I built along the way.
      </p>

      <div class="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs font-mono">
        <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
          <span class="w-2 h-2 rounded-full bg-blue-500" /> CLI &amp; Native MCP
        </span>
        <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20">
          <span class="w-2 h-2 rounded-full bg-red-500" /> Rust Execution Node
        </span>
        <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
          <span class="w-2 h-2 rounded-full bg-amber-500" /> Browser Automation
        </span>
        <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20">
          <span class="w-2 h-2 rounded-full bg-orange-500" /> Browser Sandbox (CDP)
        </span>
        <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
          <span class="w-2 h-2 rounded-full bg-emerald-500" /> Cloud &amp; ChatOps
        </span>
        <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
          <span class="w-2 h-2 rounded-full bg-cyan-500" /> Vue 3 UI &amp; Primitives
        </span>
        <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
          <span class="w-2 h-2 rounded-full bg-purple-500" /> Claude + AGY OAuth
        </span>
      </div>
    </div>

    <!-- Map Canvas Card -->
    <div class="relative w-full h-[620px] rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-[#070707] shadow-lg overflow-hidden transition-colors duration-300">
      <!-- Top Action Toolbar -->
      <div class="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-white/80 dark:bg-black/60 backdrop-blur-md border border-gray-200/80 dark:border-neutral-800/80 rounded-xl p-1 shadow-sm text-sm">
        <button
          title="Zoom In"
          class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800 text-gray-700 dark:text-neutral-300 transition-colors"
          @click="mapRef?.zoomIn()"
        >
          <div i-ph-magnifying-glass-plus-duotone class="text-base" />
        </button>
        <button
          title="Zoom Out"
          class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800 text-gray-700 dark:text-neutral-300 transition-colors"
          @click="mapRef?.zoomOut()"
        >
          <div i-ph-magnifying-glass-minus-duotone class="text-base" />
        </button>
        <div class="w-1px h-4 bg-gray-200 dark:bg-neutral-800 my-auto mx-0.5" />
        <button
          title="Reset View"
          class="flex items-center gap-1 px-2.5 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800 text-gray-700 dark:text-neutral-300 transition-colors"
          @click="mapRef?.fit()"
        >
          <div i-ph-arrows-out-duotone class="text-base" />
          <span class="text-xs font-mono">Fit View</span>
        </button>
      </div>

      <!-- Hint Overlay -->
      <div class="absolute bottom-4 left-4 z-20 pointer-events-none text-xs text-gray-400 dark:text-neutral-500 font-mono bg-white/60 dark:bg-black/40 backdrop-blur px-2.5 py-1.5 rounded-lg border border-gray-200/40 dark:border-neutral-800/40">
        💡 Drag nodes or canvas to explore • Click any node to open repository
      </div>

      <!-- Network Component -->
      <ClientOnly>
        <YakMap
          ref="mapRef"
          :is-dark="isDark"
          @select="onSelect"
        />
      </ClientOnly>
    </div>

    <!-- Active Details Bar -->
    <div v-if="selectedNode" class="mt-4 p-4 rounded-xl border border-gray-200 dark:border-neutral-800 bg-gray-50/70 dark:bg-neutral-900/60 backdrop-blur flex flex-wrap items-center justify-between gap-3 animate-fade-in">
      <div>
        <div class="font-bold text-base text-gray-900 dark:text-neutral-100 flex items-center gap-2">
          <span>{{ selectedNode.display || selectedNode.name }}</span>
          <span class="text-xs font-mono px-2 py-0.5 rounded bg-gray-200 dark:bg-neutral-800 text-gray-700 dark:text-neutral-300 font-normal">
            {{ selectedNode.name }}
          </span>
        </div>
        <p class="text-xs text-gray-600 dark:text-neutral-400 mt-0.5">
          {{ selectedNode.description }}
        </p>
      </div>
      <a
        :href="selectedNode.link"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-neutral-100 dark:hover:bg-white dark:text-neutral-900 transition-colors"
      >
        <div i-ph-github-logo-duotone class="text-sm" />
        Open on GitHub
      </a>
    </div>

    <!-- Back to Projects link -->
    <div class="mt-8 text-center prose m-auto">
      <RouterLink to="/projects" class="group inline-flex items-center gap-1.5 op60 hover:op100 transition-opacity">
        <div i-ph-arrow-left-duotone class="group-hover:-translate-x-1 transition-transform" />
        Back to Projects
      </RouterLink>
    </div>
  </div>
</template>
