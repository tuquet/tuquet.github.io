<script setup lang="ts">
function toTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

const { y: scroll } = useWindowScroll()
</script>

<template>
  <header class="header z-40">
    <RouterLink
      class="w-10 h-10 md:w-12 md:h-12 absolute xl:fixed m-3.5 sm:m-4 md:m-5 select-none outline-none"
      to="/"
      focusable="false"
    >
      <Logo />
    </RouterLink>
    <button
      title="Scroll to top"
      fixed right-4 bottom-15 md:right-6 md:bottom-18 w-9 h-9 md:w-10 md:h-10 hover:op100 rounded-full
      hover-bg-hex-8883 transition duration-300 z-40 print:hidden flex items-center justify-center
      :class="scroll > 300 ? 'op30' : 'op0! pointer-events-none'"
      @click="toTop()"
    >
      <div i-ri-arrow-up-line />
    </button>
    <nav class="nav">
      <div class="spacer" />
      <div class="right" print:op0>
        <RouterLink to="/posts" title="Blog" class="nav-item">
          <span class="lt-md:hidden">Blog</span>
          <div i-ri-article-line md:hidden />
        </RouterLink>
        <RouterLink to="/projects" title="Projects" class="nav-item">
          <span class="lt-md:hidden">Projects</span>
          <div i-ri-lightbulb-line class="md:hidden" />
        </RouterLink>
        <RouterLink to="/talks" class="lt-md:hidden nav-item" title="Talks">
          Talks
        </RouterLink>
        <RouterLink to="/sponsors-list" title="Sponsors" class="nav-item">
          <span class="lt-md:hidden">Sponsors</span>
          <div i-ri-heart-line class="md:hidden" />
        </RouterLink>
        <RouterLink to="/podcasts" class="lt-md:hidden nav-item" title="Podcasts">
          <div i-ri-mic-line />
        </RouterLink>
        <RouterLink to="/photos" title="Photos" class="nav-item">
          <div i-ri-camera-3-line />
        </RouterLink>
        <RouterLink to="/demos" title="Demos" class="nav-item">
          <div i-ri-screenshot-line />
        </RouterLink>
        <a href="https://fb.com/quet.jr" target="_blank" title="Facebook" class="lt-md:hidden nav-item">
          <div i-ri-facebook-fill />
        </a>
        <a href="https://github.com/tuquet" target="_blank" title="GitHub" class="lt-md:hidden nav-item">
          <div i-uil-github-alt />
        </a>
        <a href="/feed.xml" target="_blank" title="RSS" class="lt-md:hidden nav-item">
          <div i-la-rss-square style="font-size:1.25rem; margin: 0 -0.125rem;" />
        </a>
        <ToggleTheme class="nav-item" />
      </div>
    </nav>
  </header>
</template>

<style scoped>
.header h1 {
  margin-bottom: 0;
}

.nav {
  padding: 1rem 1rem 1rem 3.5rem;
  width: 100%;
  display: grid;
  grid-template-columns: auto max-content;
  box-sizing: border-box;
}

@media (min-width: 640px) {
  .nav {
    padding: 1.5rem 1.75rem;
  }
}

@media (min-width: 768px) {
  .nav {
    padding: 2rem;
  }
}

.nav > * {
  margin: auto;
}

.nav img {
  margin-bottom: 0;
}

.nav a,
.nav :deep(a) {
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  transition: opacity 0.2s ease;
  opacity: 0.6;
  outline: none;
}

.nav a:hover,
.nav :deep(a:hover) {
  opacity: 1;
  text-decoration-color: inherit;
}

.nav .right {
  display: grid;
  grid-gap: 0.75rem;
  grid-auto-flow: column;
  align-items: center;
}

@media (min-width: 640px) {
  .nav .right {
    grid-gap: 1rem;
  }
}

@media (min-width: 768px) {
  .nav .right {
    grid-gap: 1.2rem;
  }
}

.nav .right > * {
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 1.75rem;
  min-height: 1.75rem;
}
</style>
