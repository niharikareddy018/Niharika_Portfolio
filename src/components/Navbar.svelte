<script>
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";
  import { onMount, onDestroy } from "svelte";

  const scrollProgress = tweened(0, {
    duration: 400,
    easing: cubicOut,
  });

  let lastScrollY = 0;
  let isVisible = true;
  let ticking = false;
  let menuOpen = false;

  const updateScrollProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min(Math.max((scrollTop / docHeight) * 100, 0), 100);
    scrollProgress.set(progress);

    isVisible = scrollTop < lastScrollY || scrollTop < 50;
    lastScrollY = scrollTop;
    ticking = false;
  };

  const handleScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateScrollProgress();
      });
      ticking = true;
    }
  };

  const toggleMenu = () => {
    menuOpen = !menuOpen;
  };

  const closeMenu = () => {
    menuOpen = false;
  };

  $: {
    if (menuOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
  }

  onMount(() => {
    document.body.classList.add("theme-dark");
    document.body.classList.remove("theme-light");
    window.addEventListener("scroll", handleScroll, { passive: true });
    updateScrollProgress();
  });

  onDestroy(() => {
    window.removeEventListener("scroll", handleScroll);
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
  });
</script>

<div class="progress-bar" style="width: {$scrollProgress}%;"></div>

<nav class:hidden={!isVisible}>
  <button
    class="hamburger"
    class:open={menuOpen}
    on:click={toggleMenu}
    aria-label="Toggle menu"
  >
    <span></span>
    <span></span>
    <span></span>
  </button>

  <ul class="menu-open-center" class:menu-open={menuOpen}>
    <li><a href="/#about" on:click={closeMenu}>About</a></li>
    <li><a href="/#education" on:click={closeMenu}>Education</a></li>
    <li><a href="/#certifications" on:click={closeMenu}>Certifications</a></li>
    <li><a href="/work" on:click={closeMenu}>Projects</a></li>
    <li><a href="/#skills" on:click={closeMenu}>Skills</a></li>
    <li><a href="/#contact" on:click={closeMenu}>Contact</a></li>
  </ul>
  <div class="nav-underline"></div>
</nav>

{#if menuOpen}
  <div
    class="overlay"
    on:click={closeMenu}
    on:keydown={(e) => e.key === "Escape" && closeMenu()}
    role="button"
    tabindex="0"
  ></div>
{/if}

<style>
  .progress-bar {
    position: fixed;
    top: 0;
    left: 0;
    height: 3.5px;
    background: linear-gradient(90deg, #0ea5e9, #22d3ee, #0ea5e9);
    z-index: 1001;
    will-change: width;
    transform: translateZ(0);
  }

  nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    padding: 15px 20px;
    background: var(--nav-bg, rgba(0, 0, 0, 0.65));
    backdrop-filter: blur(12px);
    transform: translateY(0);
    transition: transform 0.3s ease;
    will-change: transform;
  }

  :global(body.theme-light) nav {
    --nav-bg: rgba(240, 249, 255, 0.88);
  }

  nav.hidden {
    transform: translateY(-100%);
  }

  nav ul {
    list-style: none;
    display: flex;
    gap: 6px;
    padding: 0;
    margin: 0;
    justify-content: center;
    align-items: center;
  }

  nav ul.menu-open-center {
    justify-content: center;
  }

  nav a {
    text-decoration: none;
    color: var(--nav-link, rgba(255, 255, 255, 0.55));
    font-weight: 500;
    padding: 6px 12px;
    border-radius: 10px;
    transition: all 0.3s ease;
    font-family: "Inter", "SF Pro Display", system-ui, sans-serif;
    font-size: 0.92rem;
  }

  :global(body.theme-light) nav a {
    --nav-link: rgba(15, 23, 42, 0.6);
  }

  nav a:hover {
    color: var(--nav-link-hover, #ffffff);
    background: rgba(14, 165, 233, 0.08);
  }

  :global(body.theme-light) nav a:hover {
    --nav-link-hover: #0c4a6e;
  }

  .nav-underline {
    position: absolute;
    bottom: 0;
    left: 0%;
    right: 0%;
    height: 3px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(14, 165, 233, 0.08) 10%,
      rgba(34, 211, 238, 0.18) 50%,
      rgba(14, 165, 233, 0.08) 90%,
      transparent 100%
    );
    border-radius: 26px;
  }

  .hamburger {
    display: none;
    width: 44px;
    height: 44px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 10px 8px;
    z-index: 1002;
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    -webkit-tap-highlight-color: transparent;
    border-radius: 10px;
    transition: background 0.2s ease;
  }

  .hamburger:active {
    background: rgba(255, 255, 255, 0.08);
  }

  .hamburger span {
    position: absolute;
    left: 10px;
    right: 10px;
    height: 1.5px;
    background: var(--hamburger-color, rgba(255, 255, 255, 0.9));
    border-radius: 2px;
    transition:
      top 0.25s ease 0.25s,
      bottom 0.25s ease 0.25s,
      opacity 0.15s ease 0.1s,
      transform 0.25s ease;
  }

  :global(body.theme-light) .hamburger span {
    --hamburger-color: #0c4a6e;
  }

  .hamburger span:nth-child(1) { top: 14px; }
  .hamburger span:nth-child(2) {
    top: 50%;
    transform: translateY(-50%);
  }
  .hamburger span:nth-child(3) { bottom: 14px; }

  .hamburger.open span {
    transition:
      top 0.25s ease,
      bottom 0.25s ease,
      opacity 0.15s ease 0.15s,
      transform 0.25s ease 0.25s;
  }

  .hamburger.open span:nth-child(1) {
    top: 50%;
    transform: translateY(-50%) rotate(45deg);
  }

  .hamburger.open span:nth-child(2) {
    opacity: 0;
  }

  .hamburger.open span:nth-child(3) {
    bottom: 50%;
    transform: translateY(50%) rotate(-45deg);
  }

  .overlay {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(3, 7, 18, 0.97);
    backdrop-filter: blur(10px);
    z-index: 999;
    animation: fadeIn 0.4s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @media (max-width: 768px) {
    nav {
      padding: 18px 20px;
    }

    .hamburger {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .overlay {
      display: block;
    }

    nav ul {
      position: fixed;
      top: 0;
      right: 0;
      width: 100%;
      height: 100vh;
      background: var(--mobile-menu-bg, rgba(8, 15, 30, 0.98));
      backdrop-filter: blur(30px);
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      padding: 90px 32px 40px;
      gap: 4px;
      z-index: 1000;
      opacity: 0;
      visibility: hidden;
      transition:
        opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1),
        visibility 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }

    :global(body.theme-light) nav ul {
      --mobile-menu-bg: rgba(240, 249, 255, 0.98);
    }

    nav ul.menu-open {
      opacity: 1;
      visibility: visible;
    }

    nav li {
      width: 100%;
      max-width: 100%;
      opacity: 0;
      transform: translateY(20px);
      transition: none;
      border-bottom: 1px solid rgba(14, 165, 233, 0.08);
    }

    nav li:last-child {
      border-bottom: none;
      margin-top: 14px;
    }

    nav ul.menu-open li {
      animation: fadeInUp 0.5s ease forwards;
    }

    nav ul.menu-open li:nth-child(1) { animation-delay: 0.08s; }
    nav ul.menu-open li:nth-child(2) { animation-delay: 0.12s; }
    nav ul.menu-open li:nth-child(3) { animation-delay: 0.16s; }
    nav ul.menu-open li:nth-child(4) { animation-delay: 0.20s; }
    nav ul.menu-open li:nth-child(5) { animation-delay: 0.24s; }
    nav ul.menu-open li:nth-child(6) { animation-delay: 0.28s; }
    nav ul.menu-open li:nth-child(7) { animation-delay: 0.32s; }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    nav a {
      display: block;
      width: 100%;
      padding: 14px 0;
      font-size: 1.3rem;
      font-weight: 500;
      letter-spacing: -0.01em;
      text-align: left;
      border-radius: 0;
      transition: all 0.3s ease;
      color: var(--mobile-link, rgba(255, 255, 255, 0.9));
    }

    :global(body.theme-light) nav a {
      --mobile-link: rgba(15, 23, 42, 0.9);
    }

    nav a:hover, nav a:active {
      background: transparent;
      color: #0ea5e9;
      opacity: 0.85;
      transform: none;
    }

    .theme-toggle {
      width: 44px;
      height: 44px;
      font-size: 1.05rem;
    }

    .nav-underline {
      display: none;
    }
  }

  @media (max-width: 480px) {
    nav {
      padding: 16px 16px;
    }

    nav ul {
      padding: 80px 24px 40px;
    }

    nav ul a {
      padding: 12px 0;
      font-size: 1.2rem;
    }

    .hamburger {
      right: 8px;
    }
  }
</style>
