<script>
  import { onMount } from "svelte";
  import { projects } from "../lib/projects.js";
  import ProjectCard from "./ProjectCard.svelte";
  import ForceGraph from "./ForceGraph.svelte";

  let workSection;
  let visible = false;
  
  // Take only top 3
  const topProjects = projects.slice(0, 3);
  
  const artStyles = [
    "radial-gradient(120% 120% at 0% 0%, #082f49 0%, #0369a1 40%, #0ea5e9 80%, #020617 100%)",
    "radial-gradient(120% 120% at 100% 100%, #083344 0%, #0e7490 40%, #06b6d4 80%, #020617 100%)",
    "radial-gradient(120% 120% at 50% 100%, #164e63 0%, #0891b2 40%, #22d3ee 80%, #020617 100%)",
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

    if (workSection) {
      observer.observe(workSection);
    }

    return () => {
      if (workSection) observer.disconnect();
    };
  });
</script>

<section id="work" bind:this={workSection}>
  <!-- Cosmos/Constellation Background -->
  <div class="cosmos-background">
    <div class="constellation-wrapper">
      <div class="star-node p1"></div>
      <div class="star-node p2"></div>
      <div class="star-node p3"></div>
      <div class="star-node p4"></div>
      <div class="star-node p5"></div>
      <div class="star-node p6"></div>
      
      <svg class="constellation-lines" viewBox="0 0 800 600" preserveAspectRatio="none">
        <line x1="20%" y1="20%" x2="50%" y2="40%" stroke="rgba(255,255,255,0.05)" stroke-width="1" />
        <line x1="50%" y1="40%" x2="80%" y2="30%" stroke="rgba(255,255,255,0.05)" stroke-width="1" />
        <line x1="50%" y1="40%" x2="40%" y2="70%" stroke="rgba(255,255,255,0.05)" stroke-width="1" />
        <line x1="40%" y1="70%" x2="70%" y2="80%" stroke="rgba(255,255,255,0.05)" stroke-width="1" />
        <line x1="80%" y1="30%" x2="70%" y2="80%" stroke="rgba(255,255,255,0.03)" stroke-width="1" />
      </svg>
    </div>
  </div>
  
  <div class="ambient-glow"></div>

  <div class="container" class:animate={visible}>
    <!-- Hero / Typography Intro -->
    <div class="elegant-intro">
      <div class="line-mask">
        <h2 class="main-line">I Engineer.</h2>
      </div>
      <div class="line-mask">
        <h2 class="serif-line">End-to-End Projects.</h2>
      </div>
      <p class="sub-text">
        A curated selection of work — scalable backend microservices, AI-powered
        document assistants, ML-powered classifiers, and computer vision systems
        I've built end-to-end.
      </p>
    </div>

    <!-- Bento Grid Gallery for Projects -->
    <div class="projects-bento">
      <!-- First featured card -->
      <div class="bento-cell featured">
        <ProjectCard
          project={topProjects[0]}
          index={0}
          artStyle={artStyles[0]}
          featured={true}
        />
      </div>

      <!-- ── Interactive Knowledge Graph ── -->
      <div class="bento-cell graph-cell">
        <ForceGraph {visible} />
      </div>

      <!-- Remaining project cards -->
      {#each topProjects.slice(1) as project, i}
        <div
          class="bento-cell"
          class:featured={project.hasDeepDive}
        >
          <ProjectCard
            {project}
            index={i + 1}
            artStyle={artStyles[(i + 1) % artStyles.length]}
            featured={project.hasDeepDive}
          />
        </div>
      {/each}
    </div>

    <!-- View All Projects Button -->
    <div class="footer-wrapper">
      <a href="/work" class="webflow-btn">
        <span class="btn-text">View all projects</span>
        <svg
          class="btn-icon"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </a>
    </div>
  </div>
</section>

<style>
  #work {
    padding: 130px 20px 100px;
    position: relative;
    z-index: 10;
    width: 100%;
    overflow: hidden;
    background: radial-gradient(
      circle at 50% 100%,
      rgba(8, 47, 73, 1) 0%,
      #030207 100%
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
      rgba(14, 165, 233, 0.15),
      transparent
    );
  }

  /* ── Constellation / Systems Background ── */
  .cosmos-background {
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
    z-index: 0;
  }

  .constellation-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.3;
    pointer-events: none;
    mix-blend-mode: screen;
  }
  
  .constellation-lines {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .star-node {
    position: absolute;
    width: 4px;
    height: 4px;
    background: #fff;
    border-radius: 50%;
    box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.4);
    animation: twinkle 4s infinite alternate;
  }
  
  .p1 { top: 20%; left: 20%; animation-delay: 0s; }
  .p2 { top: 40%; left: 50%; animation-delay: 1s; }
  .p3 { top: 30%; left: 80%; animation-delay: 0.5s; }
  .p4 { top: 70%; left: 40%; animation-delay: 1.5s; }
  .p5 { top: 80%; left: 70%; animation-delay: 2s; }
  .p6 { top: 60%; left: 10%; animation-delay: 0.7s; opacity: 0.5; }

  @keyframes twinkle {
    0% { opacity: 0.3; transform: scale(0.8); }
    100% { opacity: 1; transform: scale(1.2); }
  }

  .container {
    max-width: 1120px;
    margin: 0 auto;
    width: 100%;
    position: relative;
    z-index: 1;
  }

  /* ── Typography Intro ── */
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
    font-family: "SF Pro Display", "Inter", sans-serif;
    font-size: 4rem;
    font-weight: 500;
    letter-spacing: -0.02em;
    color: #ffffff;
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
    color: rgba(255, 255, 255, 0.85);
    margin: 0;
    line-height: 1.1;
    transform: translateY(110%);
    transition: transform 1s cubic-bezier(0.16, 1, 0.3, 1) 0.1s;
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

  /* ══════════════════════════════════════════════════
     BENTO GRID — 6 column system
     Featured = span 4, Standard = span 2
     ══════════════════════════════════════════════════ */
  .projects-bento {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 20px;
    width: 100%;
  }

  .bento-cell {
    grid-column: span 2;
  }

  .bento-cell.featured {
    grid-column: span 4;
  }

  /* Entrance animation — cards inside bento cells */
  .bento-cell :global(.project-card) {
    height: 100%;
  }

  .container.animate .bento-cell :global(.project-card) {
    opacity: 1;
    transform: translateY(0);
    transition:
      opacity 0.65s ease var(--delay),
      transform 0.65s cubic-bezier(0.2, 0.8, 0.2, 1) var(--delay);
  }

  /* ══════════════════════════════════════════════════
     GRAPH VIEW — Obsidian-style knowledge graph
     ══════════════════════════════════════════════════ */
  .graph-cell {
    grid-column: span 2;
    opacity: 0;
    transform: translateY(28px);
  }

  .container.animate .graph-cell {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 0.9s ease 0.3s, transform 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) 0.3s;
  }

  /* ── Sleek Webflow-Style Centered Button ── */
  .footer-wrapper {
    margin-top: 55px;
    display: flex;
    justify-content: center;
    opacity: 0;
    transform: translateY(20px);
  }

  .container.animate .footer-wrapper {
    opacity: 1;
    transform: translateY(0);
    transition: all 0.6s ease 0.5s;
  }

  .webflow-btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 28px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 100px;
    color: #f1f1f1;
    text-decoration: none;
    font-family: "SF Pro Display", "Inter", sans-serif;
    font-size: 0.95rem;
    font-weight: 500;
    overflow: hidden;
    transition:
      color 0.4s ease,
      border-color 0.4s ease;
  }

  .webflow-btn::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #ffffff;
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.4s cubic-bezier(0.19, 1, 0.22, 1);
    z-index: 0;
  }

  .webflow-btn:hover::before {
    transform: scaleX(1);
    transform-origin: left;
  }

  .webflow-btn:hover {
    color: #000000;
    border-color: #ffffff;
  }

  .btn-text,
  .btn-icon {
    position: relative;
    z-index: 1;
    transition: transform 0.4s cubic-bezier(0.19, 1, 0.22, 1);
  }

  .webflow-btn:hover .btn-icon {
    transform: translateX(4px);
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
    #work {
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

    .projects-bento {
      grid-template-columns: 1fr;
      gap: 16px;
    }

    .bento-cell,
    .bento-cell.featured {
      grid-column: span 1;
    }

    .graph-cell {
      display: none;
    }
  }

  @media (max-width: 480px) {
    .main-line {
      font-size: 2.4rem;
    }
    .serif-line {
      font-size: 2.6rem;
    }
  }
</style>
