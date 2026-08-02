<script>
  import { onMount } from "svelte";

  let certificationSection;
  let visible = false;

  const artStyles = [
    "radial-gradient(120% 120% at 0% 0%, #082f49 0%, #0369a1 40%, #0ea5e9 80%, #020617 100%)",
    "radial-gradient(120% 120% at 100% 100%, #164e63 0%, #0891b2 40%, #22d3ee 80%, #042f2e 100%)",
    "radial-gradient(120% 120% at 50% 100%, #0c4a6e 0%, #0284c7 40%, #38bdf8 80%, #082f49 100%)",
    "radial-gradient(120% 120% at 100% 0%, #1e1b4b 0%, #4338ca 40%, #818cf8 80%, #0c0a1e 100%)",
  ];

  const techStacks = [
    {
      title: "Retrieval-Augmented Generation",
      focus: "Deep Dive",
      status: "Active",
      category: "LLMs / AI Systems",
      icon: "fa-solid fa-brain",
      description:
        "Building production-grade RAG pipelines with vector embeddings, semantic search, chunking strategies, and retrieval optimization using frameworks like LangChain and vector databases.",
      highlights: ["Vector DBs", "Semantic Search", "Embeddings", "Chunking"],
      art: artStyles[0],
      id: 0,
    },
    {
      title: "Spring Boot Microservices",
      focus: "Backend Architecture",
      status: "Building",
      category: "Backend / Java",
      icon: "fa-solid fa-diagram-project",
      description:
        "Designing and implementing scalable microservices architectures with Spring Boot, REST APIs, service discovery, API gateways, and distributed systems patterns.",
      highlights: ["Microservices", "REST APIs", "PostgreSQL", "Docker"],
      art: artStyles[1],
      id: 1,
    },
    {
      title: "Large Language Models",
      focus: "Applied AI",
      status: "Exploring",
      category: "NLP / GenAI",
      icon: "fa-solid fa-robot",
      description:
        "Experimenting with prompt engineering, fine-tuning approaches, LLM evaluation, and building AI-native applications that leverage foundation models responsibly.",
      highlights: ["Prompt Engg.", "Fine-tuning", "Evaluation", "Agents"],
      art: artStyles[2],
      id: 2,
    },
    {
      title: "Computer Vision & NLP",
      focus: "AI Research",
      status: "Learning",
      category: "ML / Deep Learning",
      icon: "fa-solid fa-eye",
      description:
        "Working on NLP pipelines for text classification and sentiment analysis, alongside computer vision projects with CNN architectures for image understanding tasks.",
      highlights: ["CNNs", "Transformers", "Text Mining", "Classification"],
      art: artStyles[3],
      id: 3,
    },
  ];

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !visible) {
          visible = true;
          observer.unobserve(entries[0].target);
        }
      },
      { threshold: 0.15, rootMargin: "0px" },
    );

    if (certificationSection) {
      observer.observe(certificationSection);
    }

    return () => {
      if (certificationSection) observer.disconnect();
    };
  });
</script>

<section id="certifications" bind:this={certificationSection}>
  <div class="cosmos-background">
    <div class="astrolabe-wrapper">
      <div class="astrolabe-ring ring-1"></div>
      <div class="astrolabe-ring ring-2"></div>
      <div class="astrolabe-ring ring-3"></div>
      <div class="astrolabe-ring ring-4"></div>
      <div class="astrolabe-core"></div>
    </div>

    <div class="orbital-arc arc-a"></div>
    <div class="orbital-arc arc-b"></div>
    <div class="orbital-arc arc-c"></div>
  </div>
  <div class="ambient-glow"></div>

  <div class="container" class:animate={visible}>
    <div class="elegant-intro">
      <div class="line-mask">
        <h2 class="main-line">I Build.</h2>
      </div>
      <div class="line-mask serif-mask">
        <h2 class="serif-line">And I keep shipping.</h2>
      </div>
      <p class="sub-text">
        Technologies and domains I'm actively working with right now —
        from AI-powered systems and RAG pipelines to robust backend
        services and modern software engineering practices.
      </p>
    </div>

    <div class="elastic-gallery">
      {#each techStacks as tech, i}
        <div
          class="gallery-card"
          style="--delay: {0.2 + i * 0.1}s; --card-art: {tech.art};"
        >
          <div class="card-bg"></div>
          <div class="noise-overlay"></div>

          <div class="card-content-bounds">
            <div class="fixed-content">
              <div class="meta-row">
                <span class="category">
                  <i class={tech.icon} style="margin-right: 6px; font-size: 0.7rem;"></i>
                  {tech.category}
                </span>
                <span class="date status-badge">{tech.status}</span>
              </div>

              <h3 class="title">{tech.title}</h3>

              <div class="reveal-content">
                <p class="issuer">Focus: {tech.focus}</p>
                <p class="description">{tech.description}</p>
                <div class="tech-tags">
                  {#each tech.highlights as tag}
                    <span class="tech-tag">{tag}</span>
                  {/each}
                </div>
                <div class="read-action">
                  <span>Currently working on →</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  #certifications {
    padding: 130px 20px 100px;
    position: relative;
    z-index: 10;
    width: 100%;
    overflow: hidden;
    background: radial-gradient(
      circle at 50% 0%,
      rgba(8, 47, 73, 1) 0%,
      var(--page-bg, #030207) 100%
    );
  }

  :global(body.theme-light) #certifications {
    background: radial-gradient(
      circle at 50% 0%,
      rgba(224, 242, 254, 1) 0%,
      var(--page-bg, #f0f9ff) 100%
    );
  }

  .ambient-glow {
    position: absolute;
    top: 0;
    left: 10%;
    right: 10%;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(34, 211, 238, 0.2),
      transparent
    );
  }

  .cosmos-background {
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
    z-index: 0;
  }

  .astrolabe-wrapper {
    position: absolute;
    top: 5%;
    right: -15%;
    width: 800px;
    height: 800px;
    opacity: 0.15;
    pointer-events: none;
    mix-blend-mode: screen;
  }

  :global(body.theme-light) .astrolabe-wrapper {
    opacity: 0.18;
    mix-blend-mode: multiply;
  }

  .astrolabe-ring {
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }

  .ring-1 {
    width: 100%;
    height: 100%;
    border: 1px solid rgba(14, 165, 233, 0.6);
    border-left-color: transparent;
    animation: slow-spin 90s linear infinite;
  }

  .ring-2 {
    width: 80%;
    height: 80%;
    border: 1px dashed rgba(34, 211, 238, 0.5);
    animation: slow-spin 60s linear infinite reverse;
  }

  .ring-3 {
    width: 60%;
    height: 60%;
    border: 1px solid rgba(2, 132, 199, 0.7);
    border-right-color: transparent;
    border-bottom-color: transparent;
    animation: slow-spin 120s linear infinite;
  }

  .ring-4 {
    width: 30%;
    height: 30%;
    border: 2px dotted rgba(14, 165, 233, 0.8);
    animation: slow-spin 40s linear infinite reverse;
  }

  .astrolabe-core {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 12px;
    height: 12px;
    background: #22d3ee;
    border-radius: 50%;
    box-shadow: 0 0 20px 5px rgba(34, 211, 238, 0.6);
  }

  @keyframes slow-spin {
    from {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    to {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }

  .orbital-arc {
    position: absolute;
    border-radius: 50%;
    border: 1px solid rgba(14, 165, 233, 0.05);
    pointer-events: none;
    mix-blend-mode: screen;
  }

  .arc-a {
    width: 140vw;
    height: 140vw;
    top: -60%;
    left: -20%;
    border-left-color: rgba(14, 165, 233, 0.12);
    transform: rotate(15deg);
    animation: slow-orbit 180s linear infinite;
  }

  .arc-b {
    width: 120vw;
    height: 120vw;
    bottom: -50%;
    right: -30%;
    border-top-color: rgba(34, 211, 238, 0.1);
    transform: rotate(-35deg);
    animation: slow-orbit 240s linear infinite reverse;
  }

  .arc-c {
    width: 180vw;
    height: 180vw;
    top: 10%;
    left: -50%;
    border-bottom-color: rgba(2, 132, 199, 0.07);
    animation: slow-orbit 200s linear infinite;
  }

  @keyframes slow-orbit {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .container {
    max-width: 1120px;
    margin: 0 auto;
    width: 100%;
    position: relative;
    z-index: 1;
  }

  .elegant-intro {
    margin-bottom: 64px;
    max-width: 800px;
  }

  .line-mask {
    overflow: hidden;
    display: block;
    margin-bottom: 4px;
  }

  .serif-mask {
    margin-bottom: 24px;
  }

  .main-line {
    font-family: "Inter", "SF Pro Display", system-ui, sans-serif;
    font-size: 4rem;
    font-weight: 500;
    letter-spacing: -0.02em;
    color: var(--sec-heading, #ffffff);
    margin: 0;
    line-height: 1.1;
    transform: translateY(110%);
    transition: transform 1s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .serif-line {
    font-family: "Cormorant Garamond", Georgia, serif;
    font-size: 4.2rem;
    font-weight: 300;
    font-style: italic;
    color: var(--serif-heading, rgba(255, 255, 255, 0.85));
    margin: 0;
    line-height: 1.1;
    transform: translateY(110%);
    transition: transform 1s cubic-bezier(0.16, 1, 0.3, 1) 0.1s;
  }

  .sub-text {
    font-family: "Inter", "SF Pro Display", sans-serif;
    font-size: 1.15rem;
    color: var(--sec-subtext, rgba(255, 255, 255, 0.45));
    line-height: 1.6;
    margin: 0;
    max-width: 580px;
    font-weight: 300;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s;
  }

  .container.animate .main-line,
  .container.animate .serif-line {
    transform: translateY(0);
  }

  .container.animate .sub-text {
    opacity: 1;
    transform: translateY(0);
  }

  .elastic-gallery {
    display: flex;
    gap: 16px;
    height: 400px;
    width: 100%;
  }

  .gallery-card {
    flex: 1;
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    color: inherit;
    transition:
      flex 0.4s cubic-bezier(0.2, 0.8, 0.2, 1),
      opacity 0.4s ease,
      box-shadow 0.4s ease,
      transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);

    will-change: flex, transform;

    opacity: 0;
    transform: translateY(30px);

    background: var(--card-bg-dark, #101014);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  :global(body.theme-light) .gallery-card {
    background: var(--card-bg-light, #ffffff);
    box-shadow: 0 4px 12px rgba(2, 132, 199, 0.08);
  }

  :global(body.theme-light) .category {
    color: #0c4a6e;
  }

  :global(body.theme-light) .gallery-card:not(:hover) .category {
    color: #0369a1;
  }

  :global(body.theme-light) .date,
  :global(body.theme-light) .status-badge.date {
    color: rgba(15, 23, 42, 0.55);
  }

  :global(body.theme-light) .status-badge {
    background: rgba(14, 165, 233, 0.1);
    color: #0369a1;
    border-color: rgba(2, 132, 199, 0.28);
  }

  :global(body.theme-light) .title {
    color: #0f172a;
  }

  :global(body.theme-light) .gallery-card:hover .title {
    color: #ffffff;
  }

  :global(body.theme-light) .gallery-card:not(:hover) .title {
    color: #0f172a;
  }

  :global(body.theme-light) .issuer {
    color: rgba(15, 23, 42, 0.72);
  }

  :global(body.theme-light) .description {
    color: rgba(15, 23, 42, 0.78);
  }

  :global(body.theme-light) .tech-tag {
    color: #0c4a6e;
    background: rgba(14, 165, 233, 0.08);
    border-color: rgba(2, 132, 199, 0.18);
  }

  :global(body.theme-light) .read-action {
    color: #0c4a6e;
  }

  :global(body.theme-light) .gallery-card:hover .read-action {
    color: #ffffff;
  }

  :global(body.theme-light) .main-line {
    color: #0f172a;
  }

  :global(body.theme-light) .serif-line {
    color: rgba(15, 23, 42, 0.78);
  }

  :global(body.theme-light) .sub-text {
    color: rgba(15, 23, 42, 0.55);
  }

  .container.animate .gallery-card {
    opacity: 1;
    transform: translateY(0);
    transition:
      flex 0.4s cubic-bezier(0.2, 0.8, 0.2, 1),
      opacity 0.6s ease var(--delay),
      transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) var(--delay);
  }

  @media (hover: hover) and (pointer: fine) {
    .gallery-card:hover {
      flex: 2.5;
      box-shadow:
        0 20px 40px rgba(2, 132, 199, 0.4),
        0 0 30px rgba(14, 165, 233, 0.1);
    }
  }

  @media (min-width: 769px) {
    .elastic-gallery:hover .gallery-card:not(:hover) {
      opacity: 0.65;
    }
  }

  .card-bg {
    position: absolute;
    inset: 0;
    background: var(--card-art);
    opacity: 0;
    transition:
      opacity 0.5s cubic-bezier(0.2, 0.8, 0.2, 1),
      transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
    pointer-events: none;
    transform: scale(1);
    will-change: opacity, transform;
  }

  @media (hover: hover) and (pointer: fine) {
    .gallery-card:hover .card-bg {
      opacity: 1;
      transform: scale(1.05);
    }
  }

  .noise-overlay {
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    opacity: 0;
    mix-blend-mode: overlay;
    pointer-events: none;
    transition: opacity 0.5s ease;
    will-change: opacity;
  }

  @media (hover: hover) and (pointer: fine) {
    .gallery-card:hover .noise-overlay {
      opacity: 0.15;
    }
  }

  .card-content-bounds {
    position: absolute;
    inset: 0;
    width: 600px;
    pointer-events: none;
  }

  .fixed-content {
    position: absolute;
    top: 36px;
    left: 32px;
    width: 380px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    pointer-events: auto;
  }

  .meta-row {
    display: flex;
    align-items: center;
    gap: 12px;
    opacity: 0.65;
    transition: opacity 0.4s ease;
  }

  @media (hover: hover) and (pointer: fine) {
    .gallery-card:hover .meta-row {
      opacity: 0.95;
    }
  }

  .category {
    font-family: "Inter", "SF Pro Display", sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: rgba(255, 255, 255, 0.9);
  }

  :global(body.theme-light) .category {
    color: rgba(255, 255, 255, 0.95);
  }

  .gallery-card:not(:hover) .category {
    color: var(--cat-static, rgba(14, 165, 233, 0.9));
  }

  :global(body.theme-light) .gallery-card:not(:hover) .category {
    color: #0284c7;
  }

  .date {
    font-family: "Inter", "SF Pro Display", sans-serif;
    font-size: 0.8rem;
    color: var(--sec-subtext, rgba(255, 255, 255, 0.5));
  }

  .status-badge {
    padding: 3px 10px;
    border-radius: 999px;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    background: rgba(14, 165, 233, 0.18);
    color: #22d3ee;
    border: 1px solid rgba(34, 211, 238, 0.3);
    backdrop-filter: blur(4px);
  }

  .tech-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin: 0 0 14px 0;
  }

  .tech-tag {
    padding: 4px 10px;
    border-radius: 8px;
    font-family: "Space Mono", "IBM Plex Mono", monospace;
    font-size: 0.72rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.88);
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(4px);
  }

  .title {
    font-family: "Inter", "SF Pro Display", sans-serif;
    font-size: 1.55rem;
    font-weight: 500;
    color: var(--sec-heading-2, rgba(255, 255, 255, 0.95));
    line-height: 1.35;
    margin: 0;
    letter-spacing: -0.01em;
    word-break: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    transition: color 0.4s ease;
  }

  @media (hover: hover) and (pointer: fine) {
    .gallery-card:hover .title {
      color: #ffffff;
    }
  }

  .reveal-content {
    opacity: 0;
    transform: translateY(-10px);
    transition:
      opacity 0.3s ease,
      transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
    visibility: hidden;
    margin-top: 8px;
  }

  @media (hover: hover) and (pointer: fine) {
    .gallery-card:hover .reveal-content {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
      transition-delay: 0.1s;
    }
  }

  .issuer {
    font-family: "Inter", sans-serif;
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.75);
    margin: 0 0 8px 0;
    font-weight: 500;
  }

  .description {
    font-family: "Inter", "SF Pro Display", sans-serif;
    font-size: 0.95rem;
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.6;
    margin: 0 0 20px 0;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .read-action {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: "Inter", "SF Pro Display", sans-serif;
    font-size: 0.9rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.95);
    transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  @media (hover: hover) and (pointer: fine) {
    .gallery-card:hover .read-action {
      transform: translateX(4px);
    }
  }

  @media (max-width: 960px) {
    .main-line {
      font-size: 3.2rem;
    }
    .serif-line {
      font-size: 3.4rem;
    }

    .fixed-content {
      width: 300px;
    }
  }

  @media (max-width: 768px) {
    #certifications {
      padding: 100px 16px;
    }

    .main-line {
      font-size: 2.8rem;
    }
    .serif-line {
      font-size: 3rem;
    }
    .sub-text {
      font-size: 1.05rem;
    }

    .elastic-gallery {
      flex-direction: row;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      gap: 16px;
      padding-bottom: 24px;
      height: 380px;
      scrollbar-width: none;
    }
    .elastic-gallery::-webkit-scrollbar {
      display: none;
    }

    .gallery-card {
      flex: 0 0 88%;
      scroll-snap-align: center;
    }

    .fixed-content {
      width: calc(100% - 48px);
    }

    .gallery-card .reveal-content {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    .gallery-card .card-bg {
      opacity: 0.3;
    }

    .gallery-card .noise-overlay {
      opacity: 0.1;
    }

    .gallery-card .meta-row {
      opacity: 0.9;
    }

    .gallery-card .title {
      color: var(--sec-heading, #ffffff);
    }
  }

  @media (max-width: 480px) {
    .main-line {
      font-size: 2.4rem;
    }
    .serif-line {
      font-size: 2.6rem;
    }
    .elastic-gallery {
      height: 400px;
    }
    .title {
      font-size: 1.2rem;
    }
    .tech-tag {
      font-size: 0.68rem;
      padding: 3px 8px;
    }
  }
</style>
