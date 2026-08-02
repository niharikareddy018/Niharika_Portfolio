<script>
  import { onMount, onDestroy } from "svelte";

  let visible = false;
  let observer;

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goToBoard() {
    window.history.pushState({}, "", "/board");
    window.dispatchEvent(new PopStateEvent("popstate"));
  }

  onMount(() => {
    const handleScroll = () => {
      // Show buttons when scrolled down 100vh (past the hero section)
      if (window.scrollY > window.innerHeight * 0.8) {
        visible = true;
      } else {
        visible = false;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial state

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
</script>

<div class="floating-actions" class:visible>
  <button
    class="fab fab-sign"
    on:click={goToBoard}
    aria-label="Sign the wall"
    title="Sign the wall"
  >
    <div class="fab-icon-wrapper">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    </div>
    <span class="fab-label">Sign</span>
  </button>

  <button
    class="fab fab-top"
    on:click={scrollToTop}
    aria-label="Scroll to top"
    title="Back to top"
  >
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 19V5M5 12l7-7 7 7"/>
    </svg>
  </button>
</div>

<style>
  .floating-actions {
    position: fixed;
    bottom: 2rem;
    right: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 16px;
    z-index: 900;
    opacity: 0;
    visibility: hidden;
    transform: translateY(20px);
    transition:
      opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1),
      visibility 0.4s cubic-bezier(0.16, 1, 0.3, 1),
      transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .floating-actions.visible {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .fab {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    outline: none;
    -webkit-tap-highlight-color: transparent;
  }

  /* Sign button — premium glowing pill */
  .fab-sign {
    gap: 10px;
    padding: 10px 20px 10px 12px;
    border-radius: 50px;
    background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.9);
    box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
    position: relative;
    overflow: hidden;
  }

  .fab-sign::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 50%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transform: skewX(-20deg);
    transition: left 0.7s ease;
  }

  .fab-sign:hover::before {
    left: 150%;
  }

  .fab-icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }

  .fab-sign svg {
    width: 16px;
    height: 16px;
    stroke: currentColor;
    flex-shrink: 0;
  }

  .fab-label {
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif;
    font-size: 0.88rem;
    font-weight: 500;
    letter-spacing: 0.02em;
  }

  .fab-sign:hover {
    background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%);
    border-color: rgba(255, 255, 255, 0.2);
    color: #fff;
    transform: translateY(-3px);
    box-shadow:
      0 12px 40px rgba(0, 0, 0, 0.5),
      0 0 20px rgba(255, 255, 255, 0.05),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }
  
  .fab-sign:hover .fab-icon-wrapper {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.05);
  }

  .fab-sign:active {
    transform: scale(0.96) translateY(0);
  }

  /* Scroll-to-top — premium glass circle */
  .fab-top {
    width: 46px;
    height: 46px;
    border-radius: 50%;
    background: rgba(40, 40, 45, 0.8);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    color: rgba(255, 255, 255, 0.9);
    box-shadow: 
      0 4px 16px rgba(0, 0, 0, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }

  .fab-top svg {
    width: 20px;
    height: 20px;
    margin-top: 0;
  }

  .fab-top:hover {
    background: rgba(60, 60, 65, 0.9);
    border-color: rgba(255, 255, 255, 0.3);
    color: #fff;
    transform: translateY(-2px);
  }

  .fab-top:active {
    transform: scale(0.93);
  }

  /* Staggered entrance */
  .floating-actions.visible .fab-sign {
    animation: fabEnter 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.05s both;
  }

  .floating-actions.visible .fab-top {
    animation: fabEnter 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.12s both;
  }

  @keyframes fabEnter {
    from {
      opacity: 0;
      transform: translateY(12px) scale(0.8);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @media (max-width: 768px) {
    .floating-actions {
      bottom: 1.5rem;
      right: 1rem;
      gap: 10px;
    }

    .fab-sign {
      padding: 9px 16px;
    }

    .fab-label {
      font-size: 0.78rem;
    }

    .fab-sign svg {
      width: 14px;
      height: 14px;
    }

    .fab-top {
      width: 38px;
      height: 38px;
    }

    .fab-top svg {
      width: 16px;
      height: 16px;
    }
  }

  @media (max-width: 480px) {
    .floating-actions {
      bottom: 1.2rem;
      right: 0.8rem;
    }
  }
</style>
