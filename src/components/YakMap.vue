<script setup lang="ts">
import type { ProjectNode } from '~/data/yak-data'
import chroma from 'chroma-js'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { all, primary } from '~/data/yak-data'

const props = withDefaults(
  defineProps<{
    isDark?: boolean
    backgroundColor?: string
  }>(),
  {
    isDark: true,
  },
)

const emit = defineEmits<{
  (e: 'select', node: ProjectNode | null): void
}>()

const container = ref<HTMLDivElement>()
let networkInstance: any = null

const backgroundColor = computed(() => props.backgroundColor || (props.isDark ? '#050505' : '#ffffff'))
const luminance = computed(() => props.isDark ? 0.72 : 0.45)

function toNode(project: ProjectNode) {
  const color = chroma(project.color || '#3b82f6')
  const [, c, h] = color.oklch()

  const getColor = (opacity = 1) => chroma
    .oklch(luminance.value, c, h)
    .mix(backgroundColor.value, 1 - opacity)
    .hex()

  return {
    id: project.name,
    label: project.display || project.name,
    title: project.description || project.name,
    x: project.x,
    y: project.y,
    font: {
      color: getColor(1),
      size: 14,
      face: 'Inter, system-ui, sans-serif',
    },
    color: {
      border: getColor(props.isDark ? 0.6 : 0.8),
      background: getColor(props.isDark ? 0.08 : 0.04),
      highlight: {
        border: getColor(1),
        background: getColor(props.isDark ? 0.2 : 0.12),
      },
      hover: {
        border: getColor(0.9),
        background: getColor(props.isDark ? 0.15 : 0.08),
      },
    },
    borderWidth: 1.5,
    borderWidthSelected: 2.5,
    shape: 'box',
    margin: {
      top: 10,
      right: 14,
      bottom: 10,
      left: 14,
    },
  }
}

function toEdges(project: ProjectNode) {
  const color = chroma(project.color || '#3b82f6')
  const [, c, h] = color.oklch()
  const edgeColor = chroma.oklch(luminance.value, c, h).mix(backgroundColor.value, props.isDark ? 0.5 : 0.7).hex()

  const edges: any[] = []
  for (const from of project.from || []) {
    edges.push({
      id: `${from}->${project.name}`,
      from,
      to: project.name,
      color: edgeColor,
      arrows: {
        to: {
          enabled: true,
          scaleFactor: 0.8,
          type: 'arrow',
        },
      },
      width: 1.5,
    })
  }

  for (const dep of project.deps || []) {
    edges.push({
      id: `${dep}--${project.name}`,
      from: dep,
      to: project.name,
      color: edgeColor,
      dashes: [4, 4],
      width: 1,
    })
  }

  return edges
}

function fit() {
  networkInstance?.fit({
    animation: {
      duration: 800,
      easingFunction: 'easeInOutQuad',
    },
  })
}

function zoomIn() {
  if (!networkInstance) return
  const scale = networkInstance.getScale()
  networkInstance.moveTo({ scale: scale * 1.25, animation: { duration: 300 } })
}

function zoomOut() {
  if (!networkInstance) return
  const scale = networkInstance.getScale()
  networkInstance.moveTo({ scale: scale / 1.25, animation: { duration: 300 } })
}

defineExpose({
  fit,
  zoomIn,
  zoomOut,
})

onMounted(async () => {
  if (typeof window === 'undefined' || !container.value)
    return

  const { Network } = await import('vis-network')
  const { DataSet } = await import('vis-data')

  const nodes = new DataSet(primary.map(item => toNode(item)))
  const edges = new DataSet(primary.flatMap(item => toEdges(item)))

  networkInstance = new Network(
    container.value,
    { nodes, edges },
    {
      nodes: {
        shape: 'box',
      },
      edges: {
        smooth: {
          enabled: true,
          type: 'cubicBezier',
          roundness: 0.4,
        },
      },
      physics: {
        enabled: false,
      },
      interaction: {
        dragNodes: true,
        hover: true,
        tooltipDelay: 100,
      },
    },
  )

  networkInstance.on('click', (params: { nodes: string[] }) => {
    if (params.nodes?.length === 1) {
      const selected = primary.find(p => p.name === params.nodes[0])
      emit('select', selected || null)
      if (selected?.link) {
        window.open(selected.link, '_blank', 'noopener,noreferrer')
      }
    }
    else {
      emit('select', null)
    }
  })

  networkInstance.on('hoverNode', () => {
    if (container.value)
      container.value.style.cursor = 'pointer'
  })

  networkInstance.on('blurNode', () => {
    if (container.value)
      container.value.style.cursor = 'default'
  })

  watch(() => [props.isDark, backgroundColor.value], () => {
    nodes.update(primary.map(item => toNode(item)))
    edges.update(primary.flatMap(item => toEdges(item)))
  })

  setTimeout(() => {
    networkInstance?.fit()
  }, 200)
})

onBeforeUnmount(() => {
  networkInstance?.destroy()
  networkInstance = null
})
</script>

<template>
  <div ref="container" class="relative h-full w-full select-none outline-none" />
</template>
