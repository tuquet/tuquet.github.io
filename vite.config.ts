import type { PluginSimple as MarkdownItPlugin } from 'markdown-exit'
import { resolve } from 'node:path'
import MarkdownItShiki from '@shikijs/markdown-exit'
import { transformerNotationDiff, transformerNotationHighlight, transformerNotationWordHighlight } from '@shikijs/transformers'
import { rendererRich, transformerTwoslash } from '@shikijs/twoslash'
import Vue from '@vitejs/plugin-vue'
import fs from 'fs-extra'
import matter from 'gray-matter'
import anchor from 'markdown-it-anchor'
import GitHubAlerts from 'markdown-it-github-alerts'
import LinkAttributes from 'markdown-it-link-attributes'
import MarkdownItMagicLink from 'markdown-it-magic-link'
import TOC from 'markdown-it-table-of-contents'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite'
import Markdown from 'unplugin-vue-markdown/vite'
import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import Exclude from 'vite-plugin-optimize-exclude'
import SVG from 'vite-svg-loader'
import { VueRouterAutoImports } from 'vue-router/unplugin'
import VueRouter from 'vue-router/vite'
import { slugify } from './scripts/slugify.ts'

const promises: Promise<any>[] = []

export default defineConfig({
  resolve: {
    alias: [
      { find: '~/', replacement: `${resolve(import.meta.dirname, 'src')}/` },
    ],
  },
  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      '@vueuse/core',
      'dayjs',
      'dayjs/plugin/localizedFormat',
    ],
  },
  plugins: [
    UnoCSS(),

    VueRouter({
      extensions: ['.vue', '.md'],
      routesFolder: 'pages',
      // logs: true,
      extendRoute(route) {
        const path = route.components.get('default')
        if (!path)
          return

        if (!path.includes('projects.md') && path.endsWith('.md')) {
          const { data } = matter(fs.readFileSync(path, 'utf-8'))
          route.addToMeta({
            frontmatter: data,
          })
        }
      },
    }),

    Vue({
      include: [/\.vue$/, /\.md$/],
    }),

    Markdown({
      wrapperComponent: id => id.includes('/demo/')
        ? 'WrapperDemo'
        : 'WrapperPost',
      wrapperClasses: (id, code) => code.includes('@layout-full-width')
        ? ''
        : 'prose m-auto slide-enter-content',
      headEnabled: true,
      exportFrontmatter: false,
      exposeFrontmatter: false,
      exposeExcerpt: false,
      markdownItOptions: {
        quotes: '""\'\'',
      },
      async markdownSetup(md) {
        md.use((await MarkdownItShiki({
          themes: {
            dark: 'vitesse-dark',
            light: 'vitesse-light',
          },
          defaultColor: false,
          cssVariablePrefix: '--s-',
          transformers: [
            transformerTwoslash({
              explicitTrigger: true,
              renderer: rendererRich(),
            }),
            transformerNotationDiff(),
            transformerNotationHighlight(),
            transformerNotationWordHighlight(),
          ],
        })) as unknown as MarkdownItPlugin)

        md.use(anchor as unknown as MarkdownItPlugin, {
          slugify,
          permalink: anchor.permalink.linkInsideHeader({
            symbol: '#',
            renderAttrs: () => ({ 'aria-hidden': 'true' }),
          }),
        })

        md.use(LinkAttributes as unknown as MarkdownItPlugin, {
          matcher: (link: string) => /^https?:\/\//.test(link),
          attrs: {
            target: '_blank',
            rel: 'noopener',
          },
        })

        md.use(TOC, {
          includeLevel: [1, 2, 3, 4],
          slugify,
          containerHeaderHtml: '<div class="table-of-contents-anchor"><div class="i-ri-menu-2-fill" /></div>',
        })

        md.use(MarkdownItMagicLink as unknown as MarkdownItPlugin, {
          linksMap: {
            'Automa': { link: 'https://tuquet.github.io/automa/', imageUrl: 'https://avatars.githubusercontent.com/u/20990824?v=4' },
            'Lib': { link: 'https://tuquet.github.io/lib/', imageUrl: 'https://avatars.githubusercontent.com/u/20990824?v=4' },
            'Runner': { link: 'https://github.com/tuquet/tuquet', imageUrl: 'https://avatars.githubusercontent.com/u/20990824?v=4' },
            'Browser': { link: 'https://github.com/tuquet/tuquet', imageUrl: 'https://avatars.githubusercontent.com/u/20990824?v=4' },
            'Cloud': { link: 'https://github.com/tuquet/tuquet', imageUrl: 'https://avatars.githubusercontent.com/u/20990824?v=4' },
            'Tuquet CLI': { link: 'https://github.com/tuquet/tuquet', imageUrl: 'https://avatars.githubusercontent.com/u/20990824?v=4' },
            'Scoop Bucket': { link: 'https://github.com/tuquet/tuquet-scoop-bucket', imageUrl: 'https://avatars.githubusercontent.com/u/20990824?v=4' },
            'md-export': { link: 'https://github.com/tuquet/tuquet', imageUrl: 'https://avatars.githubusercontent.com/u/20990824?v=4' },
            'Vite': 'https://github.com/vitejs/vite',
            'Vue': 'https://github.com/vuejs/core',
            'UnoCSS': 'https://github.com/unocss/unocss',
            'Shiki': 'https://github.com/shikijs/shiki',
          },
        })

        md.use(GitHubAlerts as unknown as MarkdownItPlugin)
      },
      frontmatterPreprocess(frontmatter, options, id, defaults) {
        if (!frontmatter.image) {
          frontmatter.image = 'https://avatars.githubusercontent.com/u/20990824?v=4'
        }
        const head = defaults(frontmatter, options)
        return { head, frontmatter }
      },
    }),

    AutoImport({
      imports: [
        'vue',
        VueRouterAutoImports,
        '@vueuse/core',
      ],
    }),

    Components({
      extensions: ['vue', 'md'],
      dts: true,
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        IconsResolver({
          componentPrefix: '',
        }),
      ],
    }),

    Inspect(),

    Icons({
      defaultClass: 'inline',
      defaultStyle: 'vertical-align: sub;',
    }),

    SVG({
      svgo: false,
      defaultImport: 'url',
    }),

    Exclude(),

    {
      name: 'await',
      async closeBundle() {
        await Promise.all(promises)
      },
    },
  ],

  build: {
    rollupOptions: {
      onwarn(warning, next) {
        if (warning.code !== 'UNUSED_EXTERNAL_IMPORT')
          next(warning)
      },
    },
  },

  ssgOptions: {
    formatting: 'minify',
  },
})
