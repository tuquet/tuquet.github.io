<script setup lang="ts">
function askAiAboutCv() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('open-portfolio-copilot', {
      detail: { query: 'Can you summarize Tu Quet\'s background, key roles, and technical strengths?' },
    }))
  }
}
</script>

<template>
  <div class="cv-actions -mt-2 mb-6 flex items-center justify-end print:hidden">
    <button
      type="button"
      class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-all duration-150 shadow-xs cursor-pointer border border-transparent"
      title="Ask Tu Quet AI about this CV"
      @click="askAiAboutCv"
    >
      <div class="i-carbon-bot text-xs text-zinc-300 dark:text-zinc-600" />
      <span>Ask Tu Quet AI</span>
      <span class="inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-semibold bg-zinc-800 text-zinc-300 dark:bg-zinc-200 dark:text-zinc-800 font-mono">Copilot</span>
    </button>
  </div>
</template>
