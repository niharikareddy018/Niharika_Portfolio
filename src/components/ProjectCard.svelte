<script>
  export let project;
  export let index = 0;
  export let artStyle = "";
  export let featured = false;

  // Max tags to show
  $: maxTags = featured ? 6 : 4;
  $: visibleTags = project.tags.slice(0, maxTags);
  $: overflowCount = project.tags.length - maxTags;

  // Format date
  $: formattedDate = new Date(project.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short'
  });

  function getRoute(project) {
    if (project.hasDeepDive) {
      return `/work/${project.slug}`;
    }
    return project.liveUrl !== "#" ? project.liveUrl : project.githubUrl;
  }

  function openLink(url) {
    return (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (url && url !== '#') {
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    };
  }
</script>

<a
  href={getRoute(project)}
  class="project-card"
  class:featured
  style="--delay: {0.15 + index * 0.08}s; --card-art: {artStyle};"
  data-sveltekit-noscroll
>
  <!-- ── Image / Visual Area ── -->
  <div class="card-visual">
    {#if project.image}
      <div class="image-layer" style="background-image: url('{project.image}')"></div>
      <div class="image-overlay"></div>
    {:else}
      <div class="gradient-layer"></div>
      <div class="gradient-overlay"></div>
    {/if}
    <div class="noise-texture"></div>

    <!-- Corner Action Icons -->
    <div class="card-actions">
      {#if project.githubUrl && project.githubUrl !== "#"}
        <button
          class="action-icon"
          aria-label="View {project.title} on GitHub"
          on:click={openLink(project.githubUrl)}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
          </svg>
        </button>
      {/if}
      {#if project.liveUrl && project.liveUrl !== "#"}
        <button
          class="action-icon"
          aria-label="View {project.title} live"
          on:click={openLink(project.liveUrl)}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </button>
      {/if}
    </div>
  </div>

  <!-- ── Content Area ── -->
  <div class="card-body">
    <h3 class="card-title">{project.title}</h3>

    <p class="card-description">{project.shortDescription}</p>

    <!-- Tags -->
    <div class="card-tags">
      {#each visibleTags as tag}
        <span class="tag">{tag}</span>
      {/each}
      {#if overflowCount > 0}
        <span class="tag tag-overflow">+{overflowCount}</span>
      {/if}
    </div>

    <!-- Footer: date + badge -->
    <div class="card-footer">
      <span class="card-date">{formattedDate}</span>
      {#if project.hasDeepDive}
        <span class="badge">Case Study</span>
      {/if}
    </div>
  </div>
</a>

<style>
  /* ══════════════════════════════════════════════════
     PROJECT CARD — Vertical split: visual + body
     ══════════════════════════════════════════════════ */
  .project-card {
    position: relative;
    display: flex;
    flex-direction: column;
    border-radius: 16px;
    overflow: hidden;
    text-decoration: none;
    color: inherit;
    background: #0c0c10;
    border: 1px solid rgba(255, 255, 255, 0.06);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
    transition:
      transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1),
      box-shadow 0.45s cubic-bezier(0.2, 0.8, 0.2, 1),
      border-color 0.4s ease;
    will-change: transform;
    /* entrance animation */
    opacity: 0;
    transform: translateY(28px);
  }

  .project-card.featured {
    min-height: 0; /* featured cards get taller via the visual area */
  }

  /* ── Visual / Image Area ── */
  .card-visual {
    position: relative;
    width: 100%;
    height: 200px;
    overflow: hidden;
    flex-shrink: 0;
  }

  .featured .card-visual {
    height: 240px;
  }

  .image-layer {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    filter: grayscale(60%) contrast(1.1) brightness(0.85);
    transition: filter 0.6s ease, transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1);
    transform: scale(1);
  }

  .image-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(12, 12, 16, 0) 0%,
      rgba(12, 12, 16, 0.25) 60%,
      rgba(12, 12, 16, 0.85) 100%
    );
    transition: opacity 0.5s ease;
  }

  .gradient-layer {
    position: absolute;
    inset: 0;
    background: var(--card-art);
    opacity: 0.55;
    transition: opacity 0.5s ease, transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1);
    transform: scale(1);
  }

  .gradient-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(12, 12, 16, 0.1) 0%,
      rgba(12, 12, 16, 0.5) 70%,
      rgba(12, 12, 16, 0.9) 100%
    );
  }

  .noise-texture {
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    opacity: 0.06;
    mix-blend-mode: overlay;
    pointer-events: none;
  }

  /* Hover — image area */
  .project-card:hover .image-layer {
    filter: grayscale(0%) contrast(1.05) brightness(0.95);
    transform: scale(1.04);
  }

  .project-card:hover .gradient-layer {
    opacity: 0.85;
    transform: scale(1.04);
  }

  .project-card:hover .noise-texture {
    opacity: 0.12;
  }

  /* ── Corner Action Icons ── */
  .card-actions {
    position: absolute;
    top: 14px;
    right: 14px;
    display: flex;
    gap: 8px;
    z-index: 5;
    opacity: 0;
    transform: translateY(-6px);
    transition: opacity 0.35s ease, transform 0.35s ease;
  }

  .project-card:hover .card-actions {
    opacity: 1;
    transform: translateY(0);
  }

  .action-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.55);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    cursor: pointer;
    padding: 0;
    transition: background 0.25s ease, color 0.25s ease, border-color 0.25s ease, transform 0.25s ease;
  }

  .action-icon:hover {
    background: rgba(255, 255, 255, 0.15);
    color: #ffffff;
    border-color: rgba(255, 255, 255, 0.25);
    transform: translateY(-2px);
  }

  /* ── Card Body ── */
  .card-body {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 24px 24px 22px;
  }

  .featured .card-body {
    padding: 28px 28px 24px;
  }

  .card-title {
    font-family: "SF Pro Display", "Inter", sans-serif;
    font-size: 1.4rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.95);
    letter-spacing: -0.015em;
    line-height: 1.3;
    margin: 0 0 10px 0;
    transition: color 0.3s ease;
  }

  .featured .card-title {
    font-size: 1.65rem;
  }

  .project-card:hover .card-title {
    color: #ffffff;
  }

  .card-description {
    font-family: "SF Pro Display", "Inter", sans-serif;
    font-size: 0.92rem;
    color: rgba(255, 255, 255, 0.55);
    line-height: 1.65;
    margin: 0 0 18px 0;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    transition: color 0.3s ease;
  }

  .featured .card-description {
    -webkit-line-clamp: 4;
    line-clamp: 4;
    font-size: 0.95rem;
  }

  .project-card:hover .card-description {
    color: rgba(255, 255, 255, 0.7);
  }

  /* ── Tags ── */
  .card-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: auto;
    padding-top: 6px;
  }

  .tag {
    font-family: "SF Pro Display", "Inter", sans-serif;
    font-size: 0.72rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.5);
    background: rgba(255, 255, 255, 0.06);
    padding: 4px 10px;
    border-radius: 6px;
    white-space: nowrap;
    transition: background 0.25s ease, color 0.25s ease;
    letter-spacing: 0.01em;
  }

  .project-card:hover .tag {
    background: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.75);
  }

  .tag-overflow {
    color: rgba(255, 255, 255, 0.35);
    background: rgba(255, 255, 255, 0.03);
  }

  /* ── Footer ── */
  .card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 16px;
    padding-top: 14px;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
  }

  .card-date {
    font-family: "SF Pro Display", "Inter", sans-serif;
    font-size: 0.75rem;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.3);
    letter-spacing: 0.02em;
  }

  .badge {
    font-family: "SF Pro Display", "Inter", sans-serif;
    font-size: 0.68rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: rgba(255, 255, 255, 0.7);
    background: rgba(255, 255, 255, 0.08);
    padding: 4px 10px;
    border-radius: 5px;
    border: 1px solid rgba(255, 255, 255, 0.06);
  }

  /* ══════════════════════════════════════════════════
     HOVER — Card-level lift + shadow
     ══════════════════════════════════════════════════ */
  .project-card:hover {
    transform: translateY(-6px);
    box-shadow:
      0 24px 48px rgba(0, 0, 0, 0.5),
      0 0 0 1px rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.1);
  }

  /* ══════════════════════════════════════════════════
     RESPONSIVE
     ══════════════════════════════════════════════════ */
  @media (max-width: 768px) {
    .card-visual {
      height: 170px;
    }

    .featured .card-visual {
      height: 190px;
    }

    .card-body {
      padding: 20px 20px 18px;
    }

    .card-title {
      font-size: 1.25rem;
    }

    .featured .card-title {
      font-size: 1.35rem;
    }

    .card-description {
      font-size: 0.88rem;
      -webkit-line-clamp: 3;
      line-clamp: 3;
    }

    .featured .card-description {
      -webkit-line-clamp: 3;
      line-clamp: 3;
    }

    .card-actions {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
