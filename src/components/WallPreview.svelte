<script>
  import { onMount } from "svelte";

  let displayVisitors = [];
  let visible = false;
  let sectionEl;

  onMount(() => {
    fetch("/api/visitors")
      .then(r => r.json())
      .then(data => {
        if (data && data.length > 0) {
          displayVisitors = data.slice(0, 6);
        }
      })
      .catch(() => {});

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          visible = true;
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionEl) observer.observe(sectionEl);
    return () => observer.disconnect();
  });
</script>

<section class="wall-preview" bind:this={sectionEl} class:visible>
  <!-- Background atmosphere -->
  <div class="wall-bg">
    <div class="grain"></div>
    <div class="glow-orb glow-1"></div>
    <div class="glow-orb glow-2"></div>
    <div class="glow-orb glow-3"></div>
    <div class="border-line top-line"></div>
    <div class="border-line bottom-line"></div>
  </div>

  <div class="wall-inner">
    <div class="wall-content">
      <!-- Header -->
      <div class="wall-header">
        <div class="label-row">
          <div class="label-line"></div>
          <span class="wall-label">The Wall</span>
          <div class="label-line"></div>
        </div>
        <h2 class="wall-title">Every visitor leaves a mark.</h2>
        <p class="wall-subtitle">A living record of developers who stopped by. Sign in once, your name stays forever.</p>
      </div>

      <!-- Visitor cards grid -->
      {#if displayVisitors.length > 0}
        <div class="visitors-grid">
          {#each displayVisitors as visitor, i}
            <a
              href="https://github.com/{visitor.username}"
              target="_blank"
              rel="noopener noreferrer"
              class="visitor-card"
              style="--i: {i}"
            >
              <img class="visitor-avatar" src={visitor.avatar_url} alt={visitor.name} loading="lazy" />
              <div class="visitor-info">
                <span class="visitor-name">{visitor.name || visitor.username}</span>
                <span class="visitor-handle">@{visitor.username}</span>
              </div>
            </a>
          {/each}
        </div>
      {:else}
        <p class="empty-state">No visitors yet. Be the first to leave a mark!</p>
      {/if}

      <!-- CTA area -->
      <div class="wall-cta-area">
        <a href="/board" class="wall-link">
          See all visitors
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
        <a href="/board" class="wall-btn">
          <span class="btn-inner">
            <svg class="btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span class="btn-label">Sign with GitHub</span>
            <svg class="btn-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </span>
        </a>
      </div>
    </div>
  </div>
</section>

<style>
  .wall-preview {
    position: relative;
    padding: 110px 24px 120px;
    overflow: hidden;
  }

  .wall-inner {
    position: relative;
    max-width: 860px;
    margin: 0 auto;
    z-index: 1;
  }

  /* ── Atmospheric background ── */
  .wall-bg {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    overflow: hidden;
  }

  .grain {
    position: absolute;
    inset: 0;
    opacity: 0.025;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    background-size: 200px;
  }

  .glow-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(120px);
    mix-blend-mode: screen;
  }

  .glow-1 {
    width: 500px;
    height: 500px;
    top: -100px;
    left: 30%;
    background: radial-gradient(circle, rgba(100, 108, 255, 0.1) 0%, transparent 70%);
    animation: orbDrift1 18s ease-in-out infinite;
  }

  .glow-2 {
    width: 400px;
    height: 400px;
    bottom: -80px;
    right: 20%;
    background: radial-gradient(circle, rgba(76, 201, 240, 0.07) 0%, transparent 70%);
    animation: orbDrift2 22s ease-in-out infinite;
  }

  .glow-3 {
    width: 300px;
    height: 300px;
    top: 40%;
    left: -50px;
    background: radial-gradient(circle, rgba(167, 139, 250, 0.06) 0%, transparent 70%);
    animation: orbDrift3 15s ease-in-out infinite;
  }

  .border-line {
    position: absolute;
    left: 10%;
    right: 10%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent);
  }
  .top-line { top: 0; }
  .bottom-line { bottom: 0; }

  /* ── Content ── */
  .wall-content {
    text-align: center;
  }

  .wall-header {
    margin-bottom: 48px;
  }

  .label-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    margin-bottom: 20px;
    opacity: 0;
    transform: translateY(12px);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }

  .label-line {
    width: 40px;
    height: 1px;
    background: rgba(100, 108, 255, 0.3);
  }

  .wall-label {
    font-family: "SF Pro Display", "Inter", sans-serif;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(100, 108, 255, 0.7);
  }

  .wall-title {
    font-family: "SF Pro Display", "Inter", sans-serif;
    font-size: 3rem;
    font-weight: 500;
    letter-spacing: -0.03em;
    color: #fff;
    margin: 0 0 16px;
    line-height: 1.1;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s;
  }

  .wall-subtitle {
    font-family: "SF Pro Display", sans-serif;
    font-size: 1.08rem;
    color: rgba(255, 255, 255, 0.35);
    line-height: 1.7;
    margin: 0 auto;
    font-weight: 300;
    max-width: 480px;
    opacity: 0;
    transform: translateY(14px);
    transition: opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s;
  }

  /* ── Visitor cards grid ── */
  .visitors-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
    margin-bottom: 44px;
    opacity: 0;
    transform: translateY(16px);
    transition: opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s;
  }

  .visitor-card {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 16px 18px;
    background: rgba(255, 255, 255, 0.025);
    border: 1px solid rgba(255, 255, 255, 0.04);
    border-radius: 14px;
    text-decoration: none;
    transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                background 0.3s ease,
                border-color 0.3s ease,
                box-shadow 0.35s ease;
    opacity: 0;
    animation: cardReveal 0.6s ease forwards;
    animation-delay: calc(var(--i) * 0.07s + 0.4s);
    animation-play-state: paused;
  }

  .visitor-card:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(100, 108, 255, 0.15);
    transform: translateY(-3px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(100, 108, 255, 0.06);
  }

  .visitor-avatar {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    object-fit: cover;
    flex-shrink: 0;
    border: 2px solid rgba(255, 255, 255, 0.06);
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
  }

  .visitor-card:hover .visitor-avatar {
    border-color: rgba(100, 108, 255, 0.2);
    box-shadow: 0 0 12px rgba(100, 108, 255, 0.15);
  }

  .visitor-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
    text-align: left;
  }

  .visitor-name {
    font-family: "SF Pro Display", "Inter", sans-serif;
    font-size: 0.92rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.85);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: color 0.25s ease;
  }

  .visitor-card:hover .visitor-name {
    color: #fff;
  }

  .visitor-handle {
    font-family: "SF Pro Display", "Inter", sans-serif;
    font-size: 0.78rem;
    color: rgba(255, 255, 255, 0.25);
    transition: color 0.25s ease;
  }

  .visitor-card:hover .visitor-handle {
    color: rgba(255, 255, 255, 0.4);
  }

  /* ── CTA area ── */
  .wall-cta-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    opacity: 0;
    transform: translateY(12px);
    transition: opacity 0.8s ease 0.65s, transform 0.8s ease 0.65s;
  }

  .wall-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    text-decoration: none;
    font-family: "SF Pro Display", "Inter", sans-serif;
    font-size: 0.82rem;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.3);
    transition: color 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .wall-link:hover {
    color: rgba(255, 255, 255, 0.6);
  }

  .wall-link:hover svg {
    transform: translateX(3px);
  }

  .wall-link svg {
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }

  /* ── Button — Apple-like ── */
  .wall-btn {
    display: inline-flex;
    text-decoration: none;
    border-radius: 980px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid transparent;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    transition: background 0.35s ease,
                border-color 0.35s ease,
                box-shadow 0.35s ease;
  }

  .wall-btn:hover {
    background: rgba(255, 255, 255, 0.14);
    border-color: rgba(255, 255, 255, 0.12);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
  }

  .wall-btn:active {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.06);
    box-shadow: none;
    transition: background 0.08s ease,
                border-color 0.08s ease,
                box-shadow 0.08s ease;
  }

  .btn-inner {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 14px 28px;
    font-family: "SF Pro Display", "Inter", -apple-system, sans-serif;
    font-size: 0.88rem;
    font-weight: 400;
    letter-spacing: 0.01em;
    color: rgba(255, 255, 255, 0.9);
    transition: color 0.3s ease;
  }

  .wall-btn:hover .btn-inner {
    color: #fff;
  }

  .btn-icon {
    flex-shrink: 0;
    opacity: 0.7;
    transition: opacity 0.3s ease;
  }

  .wall-btn:hover .btn-icon {
    opacity: 1;
  }

  .btn-label {
    white-space: nowrap;
  }

  .btn-chevron {
    flex-shrink: 0;
    opacity: 0.4;
    transition: opacity 0.3s ease,
                transform 0.3s ease;
  }

  .wall-btn:hover .btn-chevron {
    opacity: 0.7;
    transform: translateX(2px);
  }

  .empty-state {
    font-family: "SF Pro Display", sans-serif;
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.3);
    margin: 40px auto 60px;
    text-align: center;
    opacity: 0;
    transform: translateY(16px);
    transition: opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s;
  }

  /* ── Reveal on scroll ── */
  .visible .label-row,
  .visible .wall-title,
  .visible .wall-subtitle,
  .visible .visitors-grid,
  .visible .empty-state,
  .visible .wall-cta-area {
    opacity: 1;
    transform: translateY(0);
  }

  .visible .visitor-card {
    animation-play-state: running;
  }

  /* ── Keyframes ── */
  @keyframes cardReveal {
    from { opacity: 0; transform: translateY(12px) scale(0.97); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  @keyframes orbDrift1 {
    0%, 100% { transform: translateY(0) translateX(0); }
    50% { transform: translateY(25px) translateX(-15px); }
  }

  @keyframes orbDrift2 {
    0%, 100% { transform: translateY(0) translateX(0); }
    50% { transform: translateY(-20px) translateX(12px); }
  }

  @keyframes orbDrift3 {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(18px); }
  }

  /* ── Responsive ── */
  @media (max-width: 900px) {
    .visitors-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 768px) {
    .wall-preview {
      padding: 80px 20px 96px;
    }

    .wall-title {
      font-size: 2.2rem;
    }

    .wall-subtitle {
      font-size: 0.95rem;
    }

    /* Switch to avatar-only horizontal row */
    .visitors-grid {
      display: flex;
      justify-content: center;
      gap: 0;
      margin-bottom: 36px;
    }

    .visitor-card {
      padding: 0;
      background: none;
      border: none;
      border-radius: 50%;
      margin-left: -10px;
      animation: none;
      opacity: 1;
    }

    .visitor-card:first-child {
      margin-left: 0;
    }

    .visitor-card:hover {
      background: none;
      border-color: transparent;
      transform: none;
      box-shadow: none;
    }

    .visitor-avatar {
      width: 52px;
      height: 52px;
      border: 2.5px solid #0a0a0c;
      box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.08);
    }

    .visitor-card:hover .visitor-avatar {
      border-color: #0a0a0c;
      box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.15);
    }

    .visitor-info {
      display: none;
    }
  }

  @media (max-width: 480px) {
    .wall-preview {
      padding: 60px 16px 80px;
    }

    .wall-title {
      font-size: 1.8rem;
    }

    .wall-subtitle {
      font-size: 0.88rem;
    }

    .visitor-avatar {
      width: 44px;
      height: 44px;
    }

    .btn-inner {
      padding: 12px 24px;
      font-size: 0.82rem;
    }
  }
</style>
