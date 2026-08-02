<script>
  import { onMount } from "svelte";
  import { projects } from "../lib/projects.js";
  import ProjectCard from "../components/ProjectCard.svelte";

  let visible = false;

  const artStyles = [
    "radial-gradient(120% 120% at 0% 0%, #0f172a 0%, #1e3a8a 40%, #2563eb 80%, #020617 100%)",
    "radial-gradient(120% 120% at 100% 100%, #064e3b 0%, #0f766e 40%, #10b981 80%, #020617 100%)",
    "radial-gradient(120% 120% at 50% 100%, #2e1065 0%, #4c1d95 40%, #7c3aed 80%, #020617 100%)",
    "radial-gradient(120% 120% at 0% 100%, #450a0a 0%, #991b1b 40%, #dc2626 80%, #020617 100%)"
  ];

  onMount(() => {
    setTimeout(() => {
      visible = true;
    }, 100);
    window.scrollTo(0, 0);
  });
</script>

<div class="page-container" class:animate={visible}>
  <div class="ambient-glow top-glow"></div>
  
  <div class="container">
    <div class="header">
      <a href="/" class="back-link">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        Back to Home
      </a>
      
      <div class="elegant-intro">
        <div class="line-mask">
          <h1 class="main-line">Selected Work</h1>
        </div>
        <p class="sub-text">
          A comprehensive list of systems, applications, and infrastructure projects I've built.
        </p>
      </div>
    </div>

    <!-- Bento Grid Gallery for All Projects -->
    <div class="projects-bento">
      {#each projects as project, i}
        <div
          class="bento-cell"
          class:featured={project.hasDeepDive}
        >
          <ProjectCard
            {project}
            index={i}
            artStyle={artStyles[i % artStyles.length]}
            featured={project.hasDeepDive}
          />
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .page-container {
    padding: 140px 20px 100px;
    min-height: 100vh;
    background: #030207;
    position: relative;
    overflow: hidden;
  }

  .ambient-glow {
    position: absolute;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.08), transparent);
    width: 80%;
    left: 10%;
  }

  .top-glow {
    top: 80px;
  }

  .container {
    max-width: 1120px;
    margin: 0 auto;
    width: 100%;
    position: relative;
    z-index: 1;
  }
  
  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: rgba(255, 255, 255, 0.5);
    text-decoration: none;
    font-family: "SF Pro Display", sans-serif;
    font-size: 0.95rem;
    font-weight: 500;
    margin-bottom: 40px;
    transition: color 0.3s ease;
  }
  
  .back-link svg {
    width: 18px;
    height: 18px;
    transition: transform 0.3s ease;
  }
  
  .back-link:hover {
    color: #fff;
  }
  
  .back-link:hover svg {
    transform: translateX(-4px);
  }

  /* ── Typography Intro ── */
  .elegant-intro {
    margin-bottom: 64px;
    max-width: 800px;
  }

  .line-mask {
    overflow: hidden;
    display: block;
    margin-bottom: 16px;
  }

  .main-line {
    font-family: "SF Pro Display", "Inter", sans-serif;
    font-size: 4rem;
    font-weight: 500;
    letter-spacing: -0.02em;
    color: #ffffff;
    margin: 0;
    line-height: 1.1;
    transform: translateY(110%);
    transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .sub-text {
    font-family: "SF Pro Display", sans-serif;
    font-size: 1.15rem;
    color: rgba(255, 255, 255, 0.45);
    line-height: 1.6;
    margin: 0;
    max-width: 580px;
    font-weight: 300;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s;
  }

  .page-container.animate .main-line {
    transform: translateY(0);
  }

  .page-container.animate .sub-text {
    opacity: 1;
    transform: translateY(0);
  }

  /* ══════════════════════════════════════════════════
     BENTO GRID — 6 column system
     Featured = span 4, Standard = span 2
     ══════════════════════════════════════════════════ */
  .projects-bento {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 24px;
    width: 100%;
  }

  .bento-cell {
    grid-column: span 2;
  }

  .bento-cell.featured {
    grid-column: span 4;
  }

  /* Cards fill their bento cell */
  .bento-cell :global(.project-card) {
    height: 100%;
  }

  .page-container.animate .bento-cell :global(.project-card) {
    opacity: 1;
    transform: translateY(0);
    transition:
      opacity 0.65s ease var(--delay),
      transform 0.65s cubic-bezier(0.2, 0.8, 0.2, 1) var(--delay);
  }

  /* ── Responsive ── */
  @media (max-width: 1024px) {
    .projects-bento {
      grid-template-columns: repeat(4, 1fr);
    }

    .bento-cell.featured {
      grid-column: span 4;
    }

    .bento-cell {
      grid-column: span 2;
    }
  }

  @media (max-width: 768px) {
    .page-container {
      padding: 100px 16px;
    }

    .main-line {
      font-size: 3rem;
    }

    .projects-bento {
      grid-template-columns: 1fr;
      gap: 16px;
    }

    .bento-cell,
    .bento-cell.featured {
      grid-column: span 1;
    }
  }
</style>