<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

function toTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

const { y: scroll } = useWindowScroll()

const isVi = computed(() => route.path.startsWith('/vi'))

const cvLink = computed(() => isVi.value ? '/vi/cv' : '/en/cv')

const enTarget = computed(() => {
  if (route.path.startsWith('/vi/cv'))
    return '/en/cv'
  return '/en/cv'
})

const viTarget = computed(() => {
  if (route.path.startsWith('/en/cv'))
    return '/vi/cv'
  return '/vi/cv'
})
</script>

<template>
  <header class="header z-40">
    <RouterLink
      class="w-12 h-12 absolute xl:fixed m-5 select-none outline-none"
      to="/"
      focusable="false"
    >
      <Logo />
    </RouterLink>
    <button
      title="Scroll to top"
      fixed right-3 bottom-3 w-10 h-10 hover:op100 rounded-full
      hover-bg-hex-8883 transition duration-300 z-100 print:hidden
      :class="scroll > 300 ? 'op30' : 'op0! pointer-events-none'"
      @click="toTop()"
    >
      <div i-ri-arrow-up-line />
    </button>
    <nav class="nav">
      <div class="spacer" />
      <div class="right" print:op0>
        <RouterLink to="/posts" title="Blog">
          <span class="lt-md:hidden">Blog</span>
          <div i-ri-article-line class="md:hidden" />
        </RouterLink>
        <RouterLink :to="cvLink" title="CV & Resume">
          <span class="lt-md:hidden">CV</span>
          <div i-ri-file-user-line class="md:hidden" />
        </RouterLink>
        <RouterLink to="/projects" title="Projects">
          <span class="lt-md:hidden">Projects</span>
          <div i-ri-lightbulb-line class="md:hidden" />
        </RouterLink>
        <a href="https://tuquet.github.io/automa" target="_blank" rel="noopener" title="Tuquet Automa" class="lt-md:hidden">
          <span>Automa</span>
        </a>
        <a href="https://tuquet.github.io/lib" target="_blank" rel="noopener" title="Storybook UI Suite" class="lt-md:hidden">
          <span>Storybook</span>
        </a>
        <a href="https://github.com/tuquet" target="_blank" rel="noopener" title="GitHub" class="lt-md:hidden">
          <div i-uil-github-alt />
        </a>
        <a href="https://www.linkedin.com/in/tuquet" target="_blank" rel="noopener" title="LinkedIn" class="lt-md:hidden">
          <div i-ri-linkedin-line />
        </a>
        <RouterLink
          :to="isVi ? enTarget : viTarget"
          class="select-none font-mono"
          :title="isVi ? 'Switch to English' : 'Chuyển sang Tiếng Việt'"
        >
          <span class="lt-md:hidden">{{ isVi ? 'EN' : 'VI' }}</span>
          <div i-ri-translate-2 class="md:hidden" />
        </RouterLink>
        <ToggleTheme />
      </div>
    </nav>
  </header>
</template>

<style scoped>
.header h1 {
  margin-bottom: 0;
}

.logo {
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
}

.nav {
  padding: 2rem;
  width: 100%;
  display: grid;
  grid-template-columns: auto max-content;
  box-sizing: border-box;
}

.nav > * {
  margin: auto;
}

.nav img {
  margin-bottom: 0;
}

.nav a {
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  transition: opacity 0.2s ease;
  opacity: 0.6;
  outline: none;
}

.nav a:hover {
  opacity: 1;
  text-decoration-color: inherit;
}

.nav .right {
  display: grid;
  grid-gap: 1.2rem;
  grid-auto-flow: column;
}

.nav .right > * {
  margin: auto;
}
</style>
