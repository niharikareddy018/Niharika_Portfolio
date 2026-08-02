<script>
  import { onMount, onDestroy } from "svelte";

  let visitors = [];
  let loading = true;
  let error = null;
  let justSigned = false;
  let scrollY = 0;
  let decoLeft;
  let decoRight;

  function handleScroll() {
    scrollY = window.pageYOffset;
    if (decoLeft) decoLeft.style.transform = `translateY(${scrollY * 0.04}px)`;
    if (decoRight) decoRight.style.transform = `translateY(${scrollY * -0.03}px)`;
  }

  onMount(async () => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Check URL params for sign-in result
    const params = new URLSearchParams(window.location.search);
    if (params.get("signed") === "true") {
      justSigned = true;
      history.replaceState({}, "", "/board");
    }
    if (params.get("error")) {
      error = params.get("error").replace(/_/g, " ");
      history.replaceState({}, "", "/board");
    }

    try {
      const res = await fetch("/api/visitors");
      visitors = await res.json();
    } catch (e) {
      console.error("Failed to fetch visitors:", e);
      visitors = [];
    } finally {
      loading = false;
    }
  });

  onDestroy(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener("scroll", handleScroll);
    }
  });

  function formatDate(dateStr) {
    return new Date(dateStr + "Z").toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }
</script>

<div class="board-page">
  <div class="ambient-glow"></div>

  <!-- Side decorations — Shopify-inspired abstract SVG elements -->
  <div class="wall-decorations">
    <div class="deco-left" bind:this={decoLeft}>
      <!-- Flowing connection path -->
      <svg class="deco-svg deco-flow-left" viewBox="0 0 120 600" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M60 0 C60 80, 20 120, 20 200 S100 320, 60 400 S20 480, 40 560 L40 600"
          stroke="url(#flowGradL)" stroke-width="1" stroke-dasharray="6 8" opacity="0.5"/>
        <circle cx="20" cy="200" r="3" fill="url(#flowGradL)" opacity="0.4"/>
        <circle cx="60" cy="400" r="2.5" fill="url(#flowGradL)" opacity="0.3"/>
        <circle cx="40" cy="560" r="2" fill="url(#flowGradL)" opacity="0.25"/>
        <defs>
          <linearGradient id="flowGradL" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#646cff" stop-opacity="0.6"/>
            <stop offset="50%" stop-color="#4cc9f0" stop-opacity="0.4"/>
            <stop offset="100%" stop-color="#646cff" stop-opacity="0.1"/>
          </linearGradient>
        </defs>
      </svg>

      <!-- Orbital rings cluster -->
      <svg class="deco-svg deco-rings" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="30" stroke="rgba(100,108,255,0.08)" stroke-width="0.6"/>
        <circle cx="50" cy="50" r="20" stroke="rgba(76,201,240,0.06)" stroke-width="0.6" stroke-dasharray="3 5"/>
        <circle cx="50" cy="50" r="10" stroke="rgba(100,108,255,0.1)" stroke-width="0.5"/>
        <circle cx="50" cy="20" r="1.8" fill="rgba(100,108,255,0.2)"/>
        <circle cx="30" cy="50" r="1.2" fill="rgba(76,201,240,0.18)"/>
      </svg>

      <!-- Abstract diamond scatter -->
      <svg class="deco-svg deco-diamonds" viewBox="0 0 60 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="25" y="20" width="8" height="8" rx="1.5" transform="rotate(45 29 24)" stroke="rgba(100,108,255,0.1)" stroke-width="0.6" fill="none"/>
        <rect x="10" y="80" width="6" height="6" rx="1" transform="rotate(45 13 83)" stroke="rgba(76,201,240,0.08)" stroke-width="0.5" fill="none"/>
        <rect x="35" y="130" width="5" height="5" rx="1" transform="rotate(45 37.5 132.5)" stroke="rgba(100,108,255,0.07)" stroke-width="0.5" fill="none"/>
        <circle cx="20" cy="55" r="1" fill="rgba(100,108,255,0.12)"/>
        <circle cx="40" cy="110" r="0.8" fill="rgba(76,201,240,0.1)"/>
        <circle cx="15" cy="165" r="1.2" fill="rgba(100,108,255,0.08)"/>
      </svg>
    </div>

    <div class="deco-right" bind:this={decoRight}>
      <!-- Ribbon wave path -->
      <svg class="deco-svg deco-flow-right" viewBox="0 0 120 600" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M60 0 C60 100, 100 150, 100 220 S20 340, 60 420 S100 500, 80 580 L80 600"
          stroke="url(#flowGradR)" stroke-width="1" stroke-dasharray="4 10" opacity="0.5"/>
        <circle cx="100" cy="220" r="2.5" fill="url(#flowGradR)" opacity="0.35"/>
        <circle cx="60" cy="420" r="3" fill="url(#flowGradR)" opacity="0.3"/>
        <circle cx="80" cy="580" r="2" fill="url(#flowGradR)" opacity="0.2"/>
        <defs>
          <linearGradient id="flowGradR" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#4cc9f0" stop-opacity="0.5"/>
            <stop offset="50%" stop-color="#646cff" stop-opacity="0.4"/>
            <stop offset="100%" stop-color="#4cc9f0" stop-opacity="0.1"/>
          </linearGradient>
        </defs>
      </svg>

      <!-- Constellation dots -->
      <svg class="deco-svg deco-constellation" viewBox="0 0 80 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="1.5" fill="rgba(76,201,240,0.15)"/>
        <circle cx="55" cy="35" r="1" fill="rgba(100,108,255,0.12)"/>
        <circle cx="35" cy="65" r="1.8" fill="rgba(100,108,255,0.1)"/>
        <circle cx="60" cy="90" r="1.2" fill="rgba(76,201,240,0.14)"/>
        <circle cx="15" cy="110" r="1" fill="rgba(100,108,255,0.08)"/>
        <circle cx="50" cy="140" r="1.5" fill="rgba(76,201,240,0.1)"/>
        <line x1="20" y1="20" x2="55" y2="35" stroke="rgba(100,108,255,0.05)" stroke-width="0.5"/>
        <line x1="55" y1="35" x2="35" y2="65" stroke="rgba(76,201,240,0.04)" stroke-width="0.5"/>
        <line x1="35" y1="65" x2="60" y2="90" stroke="rgba(100,108,255,0.05)" stroke-width="0.5"/>
        <line x1="60" y1="90" x2="15" y2="110" stroke="rgba(76,201,240,0.04)" stroke-width="0.5"/>
        <line x1="15" y1="110" x2="50" y2="140" stroke="rgba(100,108,255,0.05)" stroke-width="0.5"/>
      </svg>

      <!-- Arc sweep -->
      <svg class="deco-svg deco-arc" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 70 Q40 10 70 70" stroke="rgba(100,108,255,0.07)" stroke-width="0.7" fill="none"/>
        <path d="M20 65 Q40 20 60 65" stroke="rgba(76,201,240,0.05)" stroke-width="0.6" fill="none" stroke-dasharray="2 4"/>
        <circle cx="40" cy="15" r="1.5" fill="rgba(100,108,255,0.12)"/>
      </svg>
    </div>
  </div>

  <!-- Hero section — centered, fills viewport -->
  <section class="hero">
    <a href="/" class="back-link">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
      Home
    </a>

    <div class="hero-content">
      <div class="line-mask">
        <h1 class="main-line">The Wall.</h1>
      </div>
      <p class="sub-text">
        A record of developers who passed through.<br />
        Sign in once and your name stays here.
      </p>

      <!-- GitHub button -->
      <a href="/api/auth/github" class="github-btn" data-external>
        <span class="btn-bg"></span>
        <span class="btn-content">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          Sign the wall
        </span>
      </a>

      {#if justSigned}
        <p class="success-msg">You're on the wall now!</p>
      {/if}
      {#if error}
        <p class="error-msg">Something went wrong: {error}</p>
      {/if}

      <!-- Steps -->
      <div class="steps">
        <div class="step">
          <span class="step-num">1</span>
          <span class="step-label">Click sign in</span>
        </div>
        <span class="step-arrow">&rarr;</span>
        <div class="step">
          <span class="step-num">2</span>
          <span class="step-label">GitHub verifies you</span>
        </div>
        <span class="step-arrow">&rarr;</span>
        <div class="step">
          <span class="step-num">3</span>
          <span class="step-label">You're on the wall</span>
        </div>
      </div>
      <p class="privacy-note">Only your public GitHub name &amp; avatar are stored. Nothing else.</p>
    </div>
  </section>

  <!-- Visitors section -->
  <div class="container">
    {#if loading}
      <div class="loading-state">
        <div class="spinner"></div>
      </div>
    {:else if visitors.length === 0}
      <p class="empty-state">No visitors yet. Be the first!</p>
    {:else}
      <div class="visitors-grid">
        {#each visitors as visitor, i}
          <a
            href="https://github.com/{visitor.username}"
            target="_blank"
            rel="noopener noreferrer"
            class="visitor-card"
            style="--delay: {Math.min(i * 0.05, 1.5)}s"
          >
            <img
              class="avatar"
              src={visitor.avatar_url}
              alt={visitor.name}
              loading="lazy"
            />
            <div class="visitor-info">
              <span class="visitor-name">{visitor.name || visitor.username}</span>
              <span class="visitor-handle">@{visitor.username}</span>
            </div>
            <span class="visit-date">{formatDate(visitor.visited_at)}</span>
          </a>
        {/each}
      </div>
    {/if}
  </div>
</div>

<style>
  .board-page {
    min-height: 100vh;
    position: relative;
    background: #030207;
  }

  .ambient-glow {
    position: absolute;
    top: 0;
    left: 10%;
    right: 10%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.08), transparent);
  }

  /* ── Side Decorations ── */
  .wall-decorations {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 1;
    overflow: hidden;
    display: none;
  }

  @media (min-width: 1200px) {
    .wall-decorations {
      display: block;
    }
  }

  .deco-left,
  .deco-right {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 140px;
    will-change: transform;
    transition: transform 0.1s linear;
  }

  .deco-left {
    left: 20px;
  }

  .deco-right {
    right: 20px;
  }

  @media (min-width: 1440px) {
    .deco-left { left: 48px; width: 160px; }
    .deco-right { right: 48px; width: 160px; }
  }

  .deco-svg {
    position: absolute;
    opacity: 0;
    animation: decoFadeIn 1.8s ease forwards;
  }

  /* Left side elements */
  .deco-flow-left {
    top: 5%;
    left: 0;
    width: 90px;
    height: 500px;
    animation-delay: 0.3s;
    animation-name: decoFadeIn, decoDriftDown;
    animation-duration: 1.8s, 18s;
    animation-timing-function: ease, ease-in-out;
    animation-fill-mode: forwards, none;
    animation-iteration-count: 1, infinite;
    animation-delay: 0.3s, 0s;
  }

  .deco-rings {
    top: 28%;
    left: 20px;
    width: 80px;
    height: 80px;
    animation-delay: 0.6s;
    animation-name: decoFadeIn, decoBreatheSpin;
    animation-duration: 1.8s, 25s;
    animation-timing-function: ease, ease-in-out;
    animation-fill-mode: forwards, none;
    animation-iteration-count: 1, infinite;
    animation-delay: 0.6s, 0s;
  }

  .deco-diamonds {
    top: 55%;
    left: 10px;
    width: 50px;
    height: 160px;
    animation-delay: 0.9s;
    animation-name: decoFadeIn, decoFloat;
    animation-duration: 1.8s, 14s;
    animation-timing-function: ease, ease-in-out;
    animation-fill-mode: forwards, none;
    animation-iteration-count: 1, infinite;
    animation-delay: 0.9s, 2s;
  }

  /* Right side elements */
  .deco-flow-right {
    top: 8%;
    right: 0;
    width: 90px;
    height: 500px;
    animation-delay: 0.5s;
    animation-name: decoFadeIn, decoDriftUp;
    animation-duration: 1.8s, 20s;
    animation-timing-function: ease, ease-in-out;
    animation-fill-mode: forwards, none;
    animation-iteration-count: 1, infinite;
    animation-delay: 0.5s, 0s;
  }

  .deco-constellation {
    top: 40%;
    right: 15px;
    width: 65px;
    height: 130px;
    animation-delay: 0.8s;
    animation-name: decoFadeIn, decoTwinkle;
    animation-duration: 1.8s, 12s;
    animation-timing-function: ease, ease-in-out;
    animation-fill-mode: forwards, none;
    animation-iteration-count: 1, infinite;
    animation-delay: 0.8s, 1s;
  }

  .deco-arc {
    top: 68%;
    right: 25px;
    width: 60px;
    height: 60px;
    animation-delay: 1.1s;
    animation-name: decoFadeIn, decoPulseScale;
    animation-duration: 1.8s, 16s;
    animation-timing-function: ease, ease-in-out;
    animation-fill-mode: forwards, none;
    animation-iteration-count: 1, infinite;
    animation-delay: 1.1s, 3s;
  }

  /* ── Decoration Keyframes ── */
  @keyframes decoFadeIn {
    from { opacity: 0; transform: scale(0.92) translateY(12px); }
    to { opacity: 1; transform: scale(1) translateY(0); }
  }

  @keyframes decoDriftDown {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(20px); }
  }

  @keyframes decoDriftUp {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-18px); }
  }

  @keyframes decoBreatheSpin {
    0% { transform: scale(1) rotate(0deg); opacity: 1; }
    25% { transform: scale(1.06) rotate(3deg); opacity: 0.8; }
    50% { transform: scale(0.96) rotate(-2deg); opacity: 1; }
    75% { transform: scale(1.04) rotate(1deg); opacity: 0.85; }
    100% { transform: scale(1) rotate(0deg); opacity: 1; }
  }

  @keyframes decoFloat {
    0%, 100% { transform: translateY(0) translateX(0); }
    33% { transform: translateY(-12px) translateX(4px); }
    66% { transform: translateY(8px) translateX(-3px); }
  }

  @keyframes decoTwinkle {
    0%, 100% { opacity: 1; transform: scale(1); }
    30% { opacity: 0.6; transform: scale(1.05); }
    60% { opacity: 0.9; transform: scale(0.97); }
    80% { opacity: 0.5; transform: scale(1.02); }
  }

  @keyframes decoPulseScale {
    0%, 100% { transform: scale(1) rotate(0deg); }
    50% { transform: scale(1.08) rotate(5deg); }
  }

  /* ── Hero ── */
  .hero {
    min-height: 70vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 120px 24px 60px;
    position: relative;
  }

  .back-link {
    position: absolute;
    top: 100px;
    left: 40px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-family: "SF Pro Display", "Inter", sans-serif;
    font-size: 0.88rem;
    color: rgba(255, 255, 255, 0.35);
    text-decoration: none;
    transition: color 0.2s ease;
  }
  .back-link:hover {
    color: rgba(255, 255, 255, 0.8);
  }

  .hero-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
  }

  .line-mask {
    overflow: hidden;
    display: block;
    margin-bottom: 18px;
  }

  .main-line {
    font-family: "SF Pro Display", "Inter", sans-serif;
    font-size: 5.5rem;
    font-weight: 500;
    letter-spacing: -0.03em;
    color: #fff;
    margin: 0;
    line-height: 1.05;
    animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  .sub-text {
    font-family: "SF Pro Display", sans-serif;
    font-size: 1.15rem;
    color: rgba(255, 255, 255, 0.35);
    line-height: 1.7;
    margin: 0 0 36px;
    max-width: 420px;
    font-weight: 300;
    animation: fadeIn 0.8s ease 0.2s both;
  }

  /* ── GitHub button ── */
  .github-btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    padding: 14px 34px;
    border-radius: 980px;
    text-decoration: none;
    overflow: hidden;
    border: none;
    background: #fff;
    animation: fadeIn 0.8s ease 0.3s both;
    transition: background 0.3s ease,
                opacity 0.3s ease;
  }

  .btn-bg {
    display: none;
  }

  .github-btn:hover {
    background: rgba(255, 255, 255, 0.88);
  }

  .github-btn:active {
    background: rgba(255, 255, 255, 0.7);
    transition: background 0.08s ease;
  }

  /* remove shimmer */
  .github-btn::after {
    display: none;
  }

  .btn-content {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    gap: 10px;
    color: #000;
    font-family: "SF Pro Display", "Inter", -apple-system, sans-serif;
    font-size: 0.95rem;
    font-weight: 500;
    letter-spacing: -0.01em;
  }

  .success-msg {
    margin-top: 16px;
    font-size: 0.88rem;
    color: #34d399;
    font-family: "SF Pro Display", sans-serif;
  }

  .error-msg {
    margin-top: 16px;
    font-size: 0.88rem;
    color: #f87171;
    font-family: "SF Pro Display", sans-serif;
  }

  /* ── Steps ── */
  .steps {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 32px;
    animation: fadeIn 0.8s ease 0.45s both;
  }

  .step {
    display: flex;
    align-items: center;
    gap: 7px;
  }

  .step-num {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.12);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "SF Pro Display", "Inter", sans-serif;
    font-size: 0.65rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.4);
    flex-shrink: 0;
  }

  .step-label {
    font-family: "SF Pro Display", "Inter", sans-serif;
    font-size: 0.78rem;
    color: rgba(255, 255, 255, 0.3);
    white-space: nowrap;
  }

  .step-arrow {
    font-size: 0.72rem;
    color: rgba(255, 255, 255, 0.15);
  }

  .privacy-note {
    margin-top: 14px;
    font-family: "SF Pro Display", sans-serif;
    font-size: 0.72rem;
    color: rgba(255, 255, 255, 0.18);
    animation: fadeIn 0.8s ease 0.55s both;
  }

  /* ── Visitors section ── */
  .container {
    max-width: 1060px;
    margin: 0 auto;
    width: 100%;
    padding: 0 24px 100px;
  }

  .visitors-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 16px;
    animation: fadeIn 0.6s ease 0.4s both;
  }

  .visitor-card {
    display: flex;
    align-items: center;
    gap: 18px;
    padding: 24px 26px;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.04);
    border-radius: 18px;
    text-decoration: none;
    transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                background 0.3s ease,
                border-color 0.3s ease,
                box-shadow 0.35s ease;
    animation: fadeIn 0.5s ease var(--delay) both;
    position: relative;
  }

  .visitor-card:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.1);
    transform: translateY(-4px) scale(1.02);
    box-shadow:
      0 12px 40px rgba(0, 0, 0, 0.25),
      0 0 0 1px rgba(255, 255, 255, 0.04),
      inset 0 1px 0 rgba(255, 255, 255, 0.04);
  }

  .visitor-card:hover .avatar {
    box-shadow: 0 0 16px rgba(255, 255, 255, 0.12);
  }

  .visitor-card:hover .visitor-name {
    color: #fff;
  }

  .visitor-card:hover .visitor-handle {
    color: rgba(255, 255, 255, 0.45);
  }

  .avatar {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    flex-shrink: 0;
    object-fit: cover;
    border: 2px solid rgba(255, 255, 255, 0.06);
    transition: box-shadow 0.35s ease, border-color 0.3s ease;
  }

  .visitor-info {
    display: flex;
    flex-direction: column;
    gap: 3px;
    min-width: 0;
    flex: 1;
  }

  .visitor-name {
    font-family: "SF Pro Display", "Inter", sans-serif;
    font-size: 1.02rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.88);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: color 0.25s ease;
  }

  .visitor-handle {
    font-family: "SF Pro Display", "Inter", sans-serif;
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.3);
    transition: color 0.25s ease;
  }

  .visit-date {
    font-family: "SF Pro Display", "Inter", sans-serif;
    font-size: 0.78rem;
    color: rgba(255, 255, 255, 0.2);
    white-space: nowrap;
    flex-shrink: 0;
  }

  /* ── States ── */
  .loading-state {
    display: flex;
    justify-content: center;
    padding: 80px 0;
  }

  .spinner {
    width: 24px;
    height: 24px;
    border: 2px solid rgba(255, 255, 255, 0.1);
    border-top-color: rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  .empty-state {
    text-align: center;
    padding: 80px 0;
    font-family: "SF Pro Display", sans-serif;
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.3);
  }

  /* ── Keyframes ── */
  @keyframes slideUp {
    from { transform: translateY(110%); }
    to { transform: translateY(0); }
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* ── Responsive ── */
  @media (max-width: 768px) {
    .hero {
      min-height: auto;
      padding: 90px 20px 36px;
    }
    .back-link {
      top: 60px;
      left: 20px;
    }
    .main-line {
      font-size: 3rem;
    }
    .sub-text {
      font-size: 0.95rem;
      margin-bottom: 28px;
    }
    .steps {
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
      gap: 6px;
    }

    .step-label {
      font-size: 0.72rem;
    }

    .step-num {
      width: 20px;
      height: 20px;
      font-size: 0.6rem;
    }

    .step-arrow {
      font-size: 0.65rem;
    }

    .privacy-note {
      font-size: 0.68rem;
    }

    .container {
      padding: 0 16px 60px;
    }

    /* Apple-style 4-column grid — avatar + name + handle */
    .visitors-grid {
      grid-template-columns: repeat(4, 1fr);
      gap: 20px 8px;
      justify-items: center;
    }

    .visitor-card {
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 0;
      background: transparent;
      border: none;
      border-radius: 0;
      gap: 6px;
      width: 100%;
    }

    .visitor-card:hover {
      background: transparent;
      transform: none;
      box-shadow: none;
      border-color: transparent;
    }

    .avatar {
      width: 48px;
      height: 48px;
      border: none;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    }

    .visitor-card:hover .avatar {
      box-shadow: 0 1px 6px rgba(0, 0, 0, 0.4);
    }

    .visitor-info {
      align-items: center;
      gap: 0;
      min-width: 0;
      width: 100%;
    }

    .visitor-name {
      font-size: 0.68rem;
      font-weight: 500;
      letter-spacing: -0.01em;
      line-height: 1.3;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
      color: rgba(255, 255, 255, 0.85);
    }

    .visitor-handle {
      font-size: 0.6rem;
      color: rgba(255, 255, 255, 0.3);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
      line-height: 1.3;
    }

    .visit-date {
      display: none;
    }
  }

  @media (max-width: 480px) {
    .hero {
      padding: 80px 16px 28px;
    }

    .back-link {
      top: 56px;
      left: 16px;
      font-size: 0.82rem;
    }

    .main-line {
      font-size: 2.4rem;
    }

    .sub-text {
      font-size: 0.88rem;
      margin-bottom: 24px;
    }

    .github-btn {
      padding: 12px 28px;
    }

    .btn-content {
      font-size: 0.85rem;
      gap: 8px;
    }

    .container {
      padding: 0 12px 40px;
    }

    .visitors-grid {
      gap: 16px 6px;
    }

    .avatar {
      width: 42px;
      height: 42px;
    }

    .visitor-name {
      font-size: 0.64rem;
    }

    .visitor-handle {
      font-size: 0.56rem;
    }
  }
</style>
