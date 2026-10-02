<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  lang?: 'en' | 'vi'
}>(), {
  lang: 'en',
})

const pdfUrl = computed(() =>
  props.lang === 'vi' ? '/pdf/tuquet_cv_vi.pdf' : '/pdf/tuquet_cv_en.pdf',
)

const pdfFilename = computed(() =>
  props.lang === 'vi' ? 'tuquet_cv_vi.pdf' : 'tuquet_cv_en.pdf',
)

const downloadLabel = computed(() =>
  props.lang === 'vi' ? 'Tải CV (PDF)' : 'Download PDF',
)
</script>

<template>
  <div class="cv-actions -mt-2 mb-6 flex items-center justify-end print:hidden">
    <a
      :href="pdfUrl"
      :download="pdfFilename"
      class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-all duration-150 shadow-xs cursor-pointer no-underline!"
      :title="downloadLabel"
    >
      <div class="i-carbon-download text-xs" />
      <span>{{ downloadLabel }}</span>
      <span class="text-[10px] op60 font-mono">.pdf</span>
    </a>
  </div>
</template>
