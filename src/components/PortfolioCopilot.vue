<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

interface Message {
  role: 'user' | 'bot'
  text: string
}

const route = useRoute()

const isOpen = ref(false)
const isExpanded = ref(false)
const inputQuery = ref('')
const chatBodyRef = ref<HTMLDivElement>()
const inputRef = ref<HTMLInputElement>()

// Language tracking (auto-detected from path or toggleable)
const currentLang = ref<'en' | 'vi'>('en')

watch(() => route.path, (path) => {
  if (path.startsWith('/vi'))
    currentLang.value = 'vi'
  else
    currentLang.value = 'en'
}, { immediate: true })

function getTimeGreeting(lang: 'en' | 'vi') {
  const hour = new Date().getHours()
  if (lang === 'vi') {
    if (hour >= 5 && hour < 12) return 'Chào buổi sáng!'
    if (hour >= 12 && hour < 18) return 'Chào buổi chiều!'
    return 'Chào buổi tối!'
  }
  else {
    if (hour >= 5 && hour < 12) return 'Good morning!'
    if (hour >= 12 && hour < 18) return 'Good afternoon!'
    return 'Good evening!'
  }
}

const welcomeGreeting = computed(() => {
  const g = getTimeGreeting(currentLang.value)
  if (currentLang.value === 'vi') {
    return `**${g}** Tôi là trợ lý AI của Toby. Bạn có thể hỏi bất kỳ điều gì về kinh nghiệm 8+ năm kiến trúc hệ thống phân tán, kỹ thuật backend Rust/Java, hay độ phù hợp vị trí.\n\n**Chủ đề gợi ý:**\n- **Tóm tắt Năng lực:** Thế mạnh cốt lõi & kinh nghiệm\n- **Độ phù hợp Vị trí:** Thích hợp Tech Lead, Architect, hay Senior Engineer\n- **Hệ thống EV Telemetry:** Lãnh đạo 15+ kỹ sư, streaming WebSockets\n- **Nền tảng Web & Booking:** Cổng thông tin lưu lượng lớn công viên giải trí\n- **Tuquet Engine:** Giám sát tiến trình bằng Rust (Win32 Job Objects)\n- **Tech Stack & Liên hệ:** Trao đổi cơ hội & phỏng vấn`
  }
  else {
    return `**${g}** I am Toby's portfolio AI assistant. Ask any question regarding his 8+ years leading distributed systems, systems architecture, or role suitability.\n\n**Topics you can explore:**\n- **Executive Summary:** Core strengths & leadership overview\n- **Role Fit Check:** Suitability for Tech Lead, Architect, or Senior Engineer\n- **EV Telemetry Platform:** 15+ engineers, telemetry streaming\n- **High-Scale Web & Booking:** High-traffic visitor & partner booking webviews\n- **Tuquet Engine:** Zero-leakage process supervision in Rust\n- **Tech Stack & Contact:** Direct interview scheduling`
  }
})

const messages = ref<Message[]>([])

function initWelcomeMessage() {
  messages.value = [
    {
      role: 'bot',
      text: welcomeGreeting.value,
    },
  ]
}

initWelcomeMessage()

watch(currentLang, () => {
  if (messages.value.length <= 1)
    initWelcomeMessage()
})

const knowledgeEn = [
  {
    keys: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'greetings', 'morning', 'afternoon', 'evening'],
    answer: () => {
      const g = getTimeGreeting('en')
      return `**${g}** Glad to connect with you. How can I help you explore Toby's engineering background, distributed architecture, or technical leadership today? Feel free to ask or pick a suggestion below!`
    },
  },
  {
    keys: ['nda', 'confidential', 'client name', 'who is the client', 'automotive client', 'car brand', 'source code', 'proprietary'],
    answer: '**Confidentiality & Non-Disclosure (NDA) Notice:**\n- Specific enterprise client identities, proprietary source code, and internal corporate data are protected under **Non-Disclosure Agreements (NDAs)**.\n- Toby welcomes technical deep-dives into **system architecture, WebSocket telemetry streaming, database optimizations, and high-concurrency solutions** he directly engineered, in full compliance with confidentiality standards.',
  },
  {
    keys: ['summary', 'recruiter', 'who', 'about', 'toby', 'achievements', 'overview', 'highlights', 'hire'],
    answer: '**Executive Summary for Recruiters & Hiring Managers:**\n- **Track Record:** 8+ years architecting high-scale distributed backend systems, real-time data streaming engines, and world-class web applications.\n- **Engineering Leadership:** Technical Project Lead at CMC Global leading 3 squads (15+ engineers) delivering enterprise real-time telemetry platforms; former CPO & Tech Lead at ICOMM Tech.\n- **Core Capabilities:** Systems programming in **Rust** (Win32 Job Objects, Tokio async) & **Java / Spring Boot**; modern web with **React / Next.js** (Core Web Vitals LCP < 2s, INP < 150ms); real-time telemetry streaming (WebSockets, SSE, Redis).\n- **Product & AI Mindset:** Deep PLG (Product-Led Growth) product discovery coupled with modern AI-augmented SDLC (MCP, LLM toolchains), boosting sprint feature velocity by 25%.',
  },
  {
    keys: ['fit', 'role', 'position', 'match', 'suitable', 'openings', 'lead', 'architect'],
    answer: '**Role Fit & Ideal Engagement:**\n- **Technical Project Lead / Tech Lead:** Proven capability managing 15+ engineers across multiple squads, driving architecture roadmaps, technical debt governance, and sprint delivery.\n- **Staff / Principal / Senior Software Engineer:** Deep hands-on mastery of distributed backend systems, Rust async runtimes, Java/Spring Boot services, and complex real-time WebSockets.\n- **Solutions Architect:** Designing resilient cloud and hybrid telemetry architectures, Medallion data pipelines, and enterprise micro-frontends.\n- **Working Culture:** Agile Scrum / Kanban, clean code advocate, mentor, and product-first innovator.',
  },
  {
    keys: ['telemetry', 'ev', 'websocket', 'sse', 'realtime', 'streaming', 'fleet'],
    answer: '**EV Telemetry & Fleet Monitoring Architecture (CMC Global):**\n- Toby served as **Technical Project Lead** across 3 squads (15+ engineers) for a leading automotive tech platform.\n- Architected a resilient telemetry streaming pipeline (WebSocket/SSE fallback over Redis pub/sub) handling millions of daily EV operational events with sub-100ms latency.\n- Engineered **Virtual Scrolling, Canvas Data Charting, and Debounced State Updates** maintaining 60fps rendering without blocking the Main Thread.\n- Established route & component code splitting keeping INP < 150ms and LCP < 2.0s.',
  },
  {
    keys: ['tuquet', 'zombie', 'chromium', 'crawler', 'rust', 'medallion', 'job object', 'win32'],
    answer: '**Tuquet Distributed Automation & Crawler Pipeline:**\n- Toby engineered a zero-leakage process supervision core using **Windows Win32 Job Objects** with IO completion ports, completely eliminating zombie Chromium processes.\n- Designed a 3-tier **Medallion architecture** (Bronze raw BLOB gzip -> Silver Rust sanitizer & deduplicator -> Gold Supabase sync) with zero-cost local caching.\n- Authored the CLI (`tuquet`) in Rust with rustyline auto-completion, distributed via official Windows Scoop bucket.',
  },
  {
    keys: ['diagram', 'architecture', 'diagrams', 'pipeline', 'storybook', 'archify', 'visual', 'demo', 'showcase', 'live'],
    answer: '**Interactive Artifacts & Live Architecture Showcases:**\n- 🗺️ **Automa Architecture Visualizer:** Explore the multi-repo orchestration pipeline rendered with Archify at [tuquet.github.io/automa/pipeline.html](https://tuquet.github.io/automa/pipeline.html)\n- 📖 **Core Daemon API Reference:** Interactive Scalar OpenAPI docs for Rust Axum daemons at [tuquet.github.io/automa/api/](https://tuquet.github.io/automa/api/)\n- 🎨 **Enterprise Storybook Showcase:** Live interactive data grid & UI components at [tuquet.github.io/lib/](https://tuquet.github.io/lib/)\n- 🛸 **Automa Studio Portal:** Closed-loop automation & OS orchestration hub at [tuquet.github.io/automa/](https://tuquet.github.io/automa/)\n- 📦 **Windows Scoop Distribution:** Official Scoop bucket at [github.com/tuquet/tuquet-scoop-bucket](https://github.com/tuquet/tuquet-scoop-bucket)',
  },
  {
    keys: ['portal', 'theme park', 'booking', 'webview', 'hospitality', 'high-scale web', 'high-traffic'],
    answer: '**High-Scale Web & Booking Portals – Theme Park Enterprise (CMC Global):**\n- Toby served as **Lead Frontend Engineer**, building, refactoring, and delivering feature enhancements for high-traffic Visitor Web Portals and Partner Booking WebViews for a premier international theme park enterprise.\n- Engineered responsive, pixel-perfect mobile-embedded WebViews in React, Vite, and Tailwind CSS adhering strictly to client design specs.\n- Established seamless local developer workflows and mock data synchronization between Spring Boot backend services and React/React Native clients.',
  },
  {
    keys: ['team', 'squad', 'mentoring', 'management', 'culture', '15+'],
    answer: '**Leadership Experience & Team Scaling:**\n- Scaled and led cross-functional teams: **Technical Project Lead** (CMC Global, 15+ engineers across 3 squads), **Chief Product Officer & Tech Lead** (ICOMM Tech, scaling SaaS products to thousands of businesses), **Senior Software Engineer** (OpenCommerce Group).\n- Mentored 15+ engineers in Component-Driven Architecture, JavaScript Clean Code, and performance profiling.\n- Recognized with the **Rising Star Award** at CMC Global (Q4/2025).',
  },
  {
    keys: ['stack', 'tech', 'skill', 'skills', 'java', 'spring', 'react', 'rust', 'node', 'database'],
    answer: '**Core Tech Stack & Architecture:**\n- **Backend/Systems:** Rust (Tokio, Win32 Job Objects), Java / Spring Boot (Security, JPA), Node.js / NestJS, Event-Driven Architecture.\n- **Frontend:** React (Concurrent Features, Next.js, Server Components), Vue.js (Nuxt), TypeScript, Micro-frontends (Module Federation), Tailwind CSS.\n- **Data & Real-time:** Redis, WebSockets, SSE, PostgreSQL, Supabase, ClickHouse OLAP, Apache Solr.\n- **DevOps & Cloud:** Docker, Kubernetes fundamentals, Azure Cloud, Linux CLI, GitHub Actions CI/CD.\n- **AI & Productivity:** Model Context Protocol (MCP), LLM toolchains, Playwright, Vitest, Jest.',
  },
  {
    keys: ['contact', 'email', 'phone', 'location', 'interview', 'salary', 'connect'],
    answer: '**Contact Information & Availability:**\n- Toby is open to high-impact technical leadership and senior engineering opportunities.\n- **Phone:** +84 936 683 088\n- **Email:** tunyk.93@gmail.com\n- **Location:** Ha Dong, Ha Noi, Vietnam\n- **GitHub:** [github.com/tuquet](https://github.com/tuquet)\n- **LinkedIn:** [linkedin.com/in/tuquet](https://www.linkedin.com/in/tuquet)\n- **NPM Organization:** [npmjs.com/org/tuquet](https://www.npmjs.com/org/tuquet)',
  },
]

const knowledgeVi = [
  {
    keys: ['chào', 'xin chào', 'hello', 'hi', 'chào buổi sáng', 'chào buổi chiều', 'chào buổi tối', 'buổi sáng', 'buổi chiều', 'buổi tối', 'alo', 'bạn ơi', 'hey'],
    answer: () => {
      const g = getTimeGreeting('vi')
      return `**${g}** Rất vui được hỗ trợ bạn. Bạn có thể tra cứu nhanh về **kiến trúc hệ thống phân tán**, **nền tảng telemetry xe điện (EV)**, **kinh nghiệm lead 15+ kỹ sư** hoặc **độ phù hợp vị trí** của Toby. Hãy chọn gợi ý bên dưới hoặc đặt câu hỏi trực tiếp!`
    },
  },
  {
    keys: ['nda', 'bảo mật', 'khách hàng là ai', 'tên khách hàng', 'hãng xe nào', 'hãng xe', 'mã nguồn', 'source code', 'bí mật'],
    answer: '**Thông báo về Bảo mật Thông tin (NDA):**\n- Danh tính cụ thể của đối tác khách hàng, mã nguồn nội bộ và dữ liệu doanh nghiệp được bảo vệ nghiêm ngặt theo **Thỏa thuận Bảo mật Thông tin (NDA)**.\n- Toby luôn sẵn sàng trao đổi sâu về **mô hình kiến trúc kỹ thuật, giải pháp streaming WebSockets, thiết kế database và các bài toán tối ưu hiệu năng** đã trực tiếp giải quyết mà không vi phạm nguyên tắc bảo mật của đối tác.',
  },
  {
    keys: ['tóm tắt', 'recruiter', 'thành tựu', 'ai là', 'giới thiệu', 'thế mạnh', 'overview', 'toby'],
    answer: '**Tóm tắt Năng lực Cốt lõi (Dành cho Nhà tuyển dụng):**\n- **Kinh nghiệm thực chiến:** Hơn 8+ năm kiến trúc và phát triển hệ thống backend phân tán quy mô lớn, nền tảng streaming dữ liệu đo xa (telemetry) và ứng dụng web chuẩn quốc tế.\n- **Năng lực Lãnh đạo:** Technical Project Lead tại CMC Global điều phối 3 squad (15+ kỹ sư) triển khai nền tảng đo xa xe điện; nguyên CPO & Tech Lead tại ICOMM Tech.\n- **Lập trình Hệ thống:** Nắm vững **Rust** (Win32 Job Objects, Tokio async) & **Java / Spring Boot**; tối ưu web hiện đại **React / Next.js / Vue** (Core Web Vitals LCP < 2s, INP < 150ms); luồng thời gian thực qua WebSockets, SSE, Redis.\n- **Tư duy Product & AI:** Kết hợp Product-Led Growth (PLG) với quy trình kỹ thuật tăng cường bởi AI (MCP, LLMs), gia tăng 25% tốc độ bàn giao tính năng.',
  },
  {
    keys: ['phù hợp', 'fit', 'vị trí', 'role', 'tuyển dụng', 'ứng tuyển', 'thích hợp', 'lead', 'architect'],
    answer: '**Độ phù hợp vị trí & Vai trò lý tưởng:**\n- **Technical Project Lead / Tech Lead:** Dày dặn kinh nghiệm dẫn dắt 15+ kỹ sư, thiết lập chuẩn mực kiến trúc, quản trị nợ kỹ thuật và điều phối sprint bàn giao đúng hạn.\n- **Senior / Staff Software Engineer:** Chuyên sâu backend phân tán, lập trình hệ thống Rust/Java, tối ưu hiệu năng web và streaming dữ liệu.\n- **Solutions Architect:** Thiết kế kiến trúc đám mây (Azure/Docker/K8s), pipeline dữ liệu Medallion và mô hình Micro-frontends quy mô doanh nghiệp.\n- **Văn hóa làm việc:** Agile Scrum/Kanban, tư duy Product-first, đào tạo và phát triển đội ngũ vững vàng.',
  },
  {
    keys: ['telemetry', 'đo xa', 'ev', 'xe điện', 'websocket', 'streaming', 'fleet'],
    answer: '**Kiến trúc Nền tảng Đo xa & Giám sát Đội xe Điện EV (CMC Global):**\n- Toby đảm nhiệm vai trò **Technical Project Lead** phụ trách 3 squad (15+ kỹ sư) cho nền tảng của tập đoàn sản xuất ô tô hàng đầu.\n- Kiến trúc pipeline streaming telemetry (WebSocket/SSE fallback trên Redis pub/sub), xử lý hàng triệu sự kiện vận hành xe điện mỗi ngày với độ trễ sub-100ms.\n- Áp dụng **Virtual Scrolling, Canvas Data Charting, và Debounced State Updates** duy trì tốc độ hiển thị 60fps mượt mà không nghẽn Main Thread.\n- Tối ưu Core Web Vitals toàn diện: dynamic code splitting, hạ INP xuống < 150ms và giữ vững LCP < 2.0s.',
  },
  {
    keys: ['tuquet', 'zombie', 'chromium', 'crawler', 'rust', 'medallion', 'job object', 'win32'],
    answer: '**Dự án Tuquet & Lõi Process Rust:**\n- Toby thiết kế lõi giám sát tiến trình zero-leakage sử dụng **Windows Win32 Job Objects** và IO completion ports, loại bỏ triệt để hiện tượng Chromium zombie process.\n- Xây dựng kiến trúc **Medallion 3 tầng** (Bronze raw BLOB gzip -> Silver Rust sanitizer & deduplicator -> Gold Supabase sync) với bộ nhớ đệm cục bộ zero-cost.\n- Viết CLI chính (`tuquet`) bằng Rust với auto-completion thông minh, phân phối qua Scoop bucket chính thức trên Windows.',
  },
  {
    keys: ['sơ đồ', 'biểu đồ', 'kiến trúc', 'diagram', 'diagrams', 'pipeline', 'storybook', 'archify', 'demo', 'trực quan', 'live'],
    answer: '**Sản phẩm Thực tế & Sơ đồ Kiến trúc Tương tác Động:**\n- 🗺️ **Biểu đồ Kiến trúc Pipeline (Archify):** Trực quan hóa điều phối đa kho lưu trữ với hiệu ứng trace motion tại [tuquet.github.io/automa/pipeline.html](https://tuquet.github.io/automa/pipeline.html)\n- 📖 **Tài liệu API Engine Trực quan (Scalar):** OpenAPI tương tác trực tiếp cho lõi Rust Axum daemon tại [tuquet.github.io/automa/api/](https://tuquet.github.io/automa/api/)\n- 🎨 **Live Storybook UI Showcase:** Bảng dữ liệu doanh nghiệp `@tuquet/vue-table` tại [tuquet.github.io/lib/](https://tuquet.github.io/lib/)\n- 🛸 **Cổng Studio Tự động hóa:** Nền tảng điều phối hệ điều hành và tự động hóa trình duyệt tại [tuquet.github.io/automa/](https://tuquet.github.io/automa/)\n- 📦 **Phân phối Scoop Windows:** Cài đặt nhanh qua [github.com/tuquet/tuquet-scoop-bucket](https://github.com/tuquet/tuquet-scoop-bucket)',
  },
  {
    keys: ['nền tảng web', 'đặt vé', 'web & đặt vé', 'portal', 'công viên', 'giải trí', 'webview', 'lưu lượng cao', 'bán vé'],
    answer: '**Nền tảng Web & Đặt vé Trực tuyến – Công viên Giải trí Quốc tế (CMC Global):**\n- Toby đảm nhiệm vai trò **Lead Frontend Engineer**, phát triển, bảo trì và tối ưu Cổng dịch vụ Web Khách tham quan & WebView Đặt vé Đối tác cho tập đoàn công viên giải trí hàng đầu.\n- Xây dựng giao diện responsive và WebView nhúng di động bằng React, Vite, Tailwind CSS đạt chuẩn pixel-perfect.\n- Thiết lập quy trình phát triển và cơ chế mock data đồng bộ giữa backend Spring Boot và giao diện React / React Native.',
  },
  {
    keys: ['quản lý', 'team', 'squad', 'mentoring', 'lãnh đạo', 'kinh nghiệm', '15+', 'devs'],
    answer: '**Kinh nghiệm Lãnh đạo & Phát triển Đội ngũ:**\n- Bề dày dẫn dắt đội ngũ kỹ thuật: **Technical Project Lead** (CMC Global, 15+ kỹ sư trên 3 squads), **CPO & Tech Lead** (ICOMM Tech, mở rộng sản phẩm SaaS phục vụ hàng nghìn doanh nghiệp), **Senior Software Engineer** (OpenCommerce Group).\n- Đào tạo và mentor 15+ kỹ sư về Component-Driven Architecture, JavaScript Clean Code và phân tích hiệu năng render.\n- Được vinh danh với giải thưởng **Rising Star Award** tại CMC Global (Q4/2025).',
  },
  {
    keys: ['stack', 'tech', 'ngôn ngữ', 'skill', 'kỹ năng', 'công nghệ', 'java', 'spring', 'react', 'rust'],
    answer: '**Hệ sinh thái Công nghệ Cốt lõi:**\n- **Backend & Hệ thống:** Rust (Tokio, Win32 Job Objects), Java / Spring Boot (Security, JPA), Node.js / NestJS, Event-Driven Architecture.\n- **Frontend:** React (Next.js, Server Components), Vue.js (Nuxt), TypeScript, Micro-frontends (Module Federation), Tailwind CSS.\n- **Dữ liệu & Thời gian thực:** Redis, WebSockets, SSE, PostgreSQL, Supabase, ClickHouse OLAP, Apache Solr.\n- **Đám mây & DevOps:** Docker, Kubernetes fundamentals, Azure Cloud, Linux CLI, GitHub Actions CI/CD.\n- **AI & Năng suất:** Model Context Protocol (MCP), LLM toolchains, Playwright, Vitest, Jest.',
  },
  {
    keys: ['liên hệ', 'email', 'sđt', 'điện thoại', 'địa chỉ', 'ở đâu', 'phỏng vấn', 'lương', 'contact'],
    answer: '**Thông tin Liên hệ & Sẵn sàng Phỏng vấn:**\n- Toby sẵn sàng trao đổi các cơ hội nghề nghiệp kỹ thuật giá trị cao (Full-time, Cố vấn Kiến trúc / Advisory).\n- **Điện thoại:** +84 936 683 088\n- **Email:** tunyk.93@gmail.com\n- **Địa chỉ:** Hà Đông, Hà Nội, Việt Nam\n- **GitHub:** [github.com/tuquet](https://github.com/tuquet)\n- **LinkedIn:** [linkedin.com/in/tuquet](https://www.linkedin.com/in/tuquet)\n- **Tổ chức NPM:** [npmjs.com/org/tuquet](https://www.npmjs.com/org/tuquet)',
  },
]

const chipsEn = [
  { label: 'Executive Summary', q: 'summary' },
  { label: 'Role Fit & Scope', q: 'fit' },
  { label: 'Architecture Diagrams', q: 'diagram' },
  { label: 'EV Telemetry Platform', q: 'telemetry' },
  { label: 'High-Scale Web & Booking', q: 'portal' },
  { label: 'Rust Process Engine', q: 'tuquet' },
  { label: 'Core Tech Stack', q: 'stack' },
  { label: 'Contact & Availability', q: 'contact' },
]

const chipsVi = [
  { label: 'Tóm tắt Năng lực', q: 'tóm tắt' },
  { label: 'Độ phù hợp Vị trí', q: 'phù hợp' },
  { label: 'Sơ đồ Kiến trúc', q: 'sơ đồ' },
  { label: 'Hệ thống EV Telemetry', q: 'telemetry' },
  { label: 'Nền tảng Web & Booking', q: 'đặt vé' },
  { label: 'Lõi Process Rust', q: 'tuquet' },
  { label: 'Tech Stack Cốt lõi', q: 'stack' },
  { label: 'Thông tin Liên hệ', q: 'liên hệ' },
]

const chips = computed(() => currentLang.value === 'vi' ? chipsVi : chipsEn)

function queryKnowledge(query: string): string {
  const lower = query.toLowerCase()
  const isViMode = currentLang.value === 'vi'
  const list = isViMode ? knowledgeVi : knowledgeEn

  let bestMatch: any = null
  let maxScore = 0

  list.forEach((item) => {
    let score = 0
    item.keys.forEach((key) => {
      if (lower.includes(key.toLowerCase()))
        score += key.length > 3 ? 3 : 1
    })
    if (score > maxScore) {
      maxScore = score
      bestMatch = typeof item.answer === 'function' ? item.answer() : item.answer
    }
  })

  // Cross-lingual fallback if no match found in primary list
  if (!bestMatch) {
    const fallbackList = isViMode ? knowledgeEn : knowledgeVi
    fallbackList.forEach((item) => {
      let score = 0
      item.keys.forEach((key) => {
        if (lower.includes(key.toLowerCase()))
          score += key.length > 3 ? 3 : 1
      })
      if (score > maxScore) {
        maxScore = score
        bestMatch = typeof item.answer === 'function' ? item.answer() : item.answer
      }
    })
  }

  if (!bestMatch) {
    return isViMode
      ? 'Tôi có thể giải đáp các câu hỏi về **kiến trúc kỹ thuật**, **hệ thống phân tán**, **kinh nghiệm lead 15+ kỹ sư**, **độ phù hợp vị trí (Fit Check)** hoặc **thông tin liên hệ** của Toby. Bạn có thể chọn các gợi ý bên dưới!'
      : 'I can answer questions regarding Toby\'s **technical architecture**, **distributed systems experience**, **leadership across 15+ engineers**, **role fit check**, or **contact info**. Feel free to pick a prompt below!'
  }

  return bestMatch
}

function scrollToBottom() {
  nextTick(() => {
    if (chatBodyRef.value)
      chatBodyRef.value.scrollTop = chatBodyRef.value.scrollHeight
  })
}

function handleSend(text?: string) {
  const query = (text || inputQuery.value).trim()
  if (!query) return

  inputQuery.value = ''
  messages.value.push({
    role: 'user',
    text: query,
  })
  scrollToBottom()

  setTimeout(() => {
    const response = queryKnowledge(query)
    messages.value.push({
      role: 'bot',
      text: response,
    })
    scrollToBottom()
  }, 180)
}

function formatMarkdown(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener" class="underline underline-offset-2 font-medium hover:text-black dark:hover:text-white">$1</a>')
    .replace(/\n- /g, '<br/>• ')
    .replace(/\n\n/g, '<br/><br/>')
    .replace(/\n/g, '<br/>')
}

function toggleOpen() {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    nextTick(() => {
      scrollToBottom()
      inputRef.value?.focus()
    })
  }
}
</script>

<template>
  <div class="portfolio-copilot-container fixed bottom-5 right-5 md:bottom-6 md:right-6 z-50 print:hidden">
    <!-- Trigger Floating Action Button -->
    <button
      type="button"
      class="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-medium bg-zinc-900 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 border border-zinc-800 dark:border-zinc-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 cursor-pointer"
      :aria-label="currentLang === 'vi' ? 'Hỏi Toby AI' : 'Ask Toby AI'"
      @click="toggleOpen"
    >
      <div class="i-carbon-bot text-sm text-zinc-400 dark:text-zinc-600" />
      <span>{{ currentLang === 'vi' ? 'Hỏi Toby AI' : 'Ask Toby AI' }}</span>
      <span class="inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-semibold bg-zinc-800 text-zinc-300 dark:bg-zinc-200 dark:text-zinc-800">AI</span>
    </button>

    <!-- Chat Drawer Dialog -->
    <div
      v-if="isOpen"
      class="fixed bottom-[70px] md:bottom-20 right-4 md:right-6 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-200 ease-out"
      :class="isExpanded
        ? 'w-[calc(100vw-32px)] md:w-[580px] h-[calc(100vh-95px)] md:h-[680px]'
        : 'w-[calc(100vw-32px)] md:w-[390px] h-[calc(100vh-95px)] md:h-[530px]'"
      role="dialog"
      aria-label="Toby AI Assistant"
    >
      <!-- Dialog Header -->
      <div class="shrink-0 flex items-center justify-between px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/60">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-full bg-zinc-200/80 dark:bg-zinc-800 flex items-center justify-center text-zinc-800 dark:text-zinc-200">
            <div class="i-carbon-bot text-lg" />
          </div>
          <div>
            <div class="text-[13px] font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight flex items-center gap-1.5">
              <span>Toby AI Copilot</span>
              <span class="text-[10px] px-1 rounded font-normal bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">Online</span>
            </div>
            <div class="text-[11px] text-zinc-500 dark:text-zinc-400">
              Distributed systems &amp; role fit
            </div>
          </div>
        </div>

        <div class="flex items-center gap-1">
          <!-- Mini Lang Switch inside modal -->
          <button
            type="button"
            class="px-1.5 py-0.5 rounded text-[11px] font-medium border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white mr-1 cursor-pointer"
            :title="currentLang === 'vi' ? 'Chuyển sang Tiếng Anh' : 'Switch to Vietnamese'"
            @click="currentLang = currentLang === 'vi' ? 'en' : 'vi'"
          >
            {{ currentLang.toUpperCase() }}
          </button>

          <!-- Expand / Collapse button -->
          <button
            type="button"
            class="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            :title="isExpanded ? 'Collapse' : 'Expand'"
            @click="isExpanded = !isExpanded"
          >
            <div :class="isExpanded ? 'i-carbon-minimize' : 'i-carbon-maximize'" class="text-sm" />
          </button>

          <!-- Close button -->
          <button
            type="button"
            class="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            title="Close"
            @click="isOpen = false"
          >
            <div class="i-carbon-close text-sm" />
          </button>
        </div>
      </div>

      <!-- Messages Body -->
      <div
        ref="chatBodyRef"
        class="flex-1 min-h-0 overflow-y-auto p-4 flex flex-col gap-3 text-[13px] leading-relaxed text-zinc-700 dark:text-zinc-300"
      >
        <div
          v-for="(msg, idx) in messages"
          :key="idx"
          class="max-w-[92%] p-3 rounded-xl text-[13px] leading-relaxed break-words"
          :class="msg.role === 'user'
            ? 'self-end bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900'
            : 'self-start bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 border border-zinc-200/80 dark:border-zinc-800/80'"
        >
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div v-html="formatMarkdown(msg.text)" />
        </div>
      </div>

      <!-- Quick Action Chips -->
      <div class="shrink-0 flex flex-wrap gap-1.5 p-3 border-t border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/30 max-h-[105px] overflow-y-auto">
        <button
          v-for="chip in chips"
          :key="chip.q"
          type="button"
          class="px-2.5 py-1 text-xs font-medium text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700/80 rounded-md transition-colors cursor-pointer shadow-2xs"
          @click="handleSend(chip.q)"
        >
          {{ chip.label }}
        </button>
      </div>

      <!-- Input Footer -->
      <div class="shrink-0 flex items-center gap-2 p-3 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <input
          ref="inputRef"
          v-model="inputQuery"
          type="text"
          class="flex-1 h-[38px] px-3 py-2 text-[13px] bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-zinc-950 dark:focus:ring-zinc-300 transition-colors"
          :placeholder="currentLang === 'vi' ? 'Đặt câu hỏi về Toby...' : 'Ask a question about Toby...'"
          @keydown.enter="handleSend()"
        >
        <button
          type="button"
          class="shrink-0 h-[38px] px-3.5 text-[13px] font-medium text-white bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 rounded-lg transition-all active:scale-95 cursor-pointer shadow-xs inline-flex items-center gap-1.5"
          @click="handleSend()"
        >
          <span>{{ currentLang === 'vi' ? 'Gửi' : 'Send' }}</span>
          <div class="i-carbon-send-alt text-xs" />
        </button>
      </div>
    </div>
  </div>
</template>
