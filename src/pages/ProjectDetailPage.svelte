<script>
  import { onMount } from "svelte";
  import { projects } from "../lib/projects.js";

  export let slug = "";
  
  let visible = false;
  
  // Find the matching project
  $: project = projects.find(p => p.slug === slug);
  
  onMount(() => {
    setTimeout(() => {
      visible = true;
    }, 100);
    window.scrollTo(0, 0);
  });
</script>

{#if project}
  <div class="page-container" class:animate={visible}>
    <!-- Top glowing ambient bar -->
    <div class="ambient-glow top-glow"></div>
    
    <div class="container">
      <div class="header-nav">
        <a href="/work" class="back-link">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          All Projects
        </a>
      </div>

      <!-- Typography Intro -->
      <header class="project-header">
        <div class="meta-info">
          <span class="category">{project.tags[0]}</span>
          <span class="date">{new Date(project.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</span>
        </div>
        
        <h1 class="main-line">{project.title}</h1>
        
        <p class="description">
          {project.shortDescription}
        </p>

        <div class="tech-stack">
          {#each project.tags.slice(1) as tech}
            <span class="tech-tag">{tech}</span>
          {/each}
        </div>
        
        <div class="links">
          {#if project.liveUrl !== "#"}
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" class="primary-btn">
              View Live
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </a>
          {/if}
          
          {#if project.githubUrl !== "#"}
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" class="secondary-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              GitHub
            </a>
          {/if}
        </div>
      </header>

      <!-- Simulated Markdown Content -->
      <article class="content">
        <h2>The Architecture</h2>
        <p>This is a placeholder for the detailed case study. A good case study delves into the technical challenges faced during development, architectural decisions made, and performance optimizations implemented.</p>
        
        <blockquote>
          <p>“Good architecture is about deferring decisions. You don't have to know everything upfront, but you must build boundaries that allow you to learn and pivot without rewriting the system.”</p>
        </blockquote>

        <p>In this project, the core focus was on ensuring high availability and fault tolerance. By decoupling services and relying on asynchronous communication channels, the system can gracefully handle sudden spikes in traffic without degrading the core user experience.</p>
        
        <h3>Key Technical Decisions</h3>
        <ul>
          <li><strong>Decoupling via Events:</strong> Moving away from synchronous REST calls to an event-driven architecture to improve system resilience.</li>
          <li><strong>Data Partitioning:</strong> Implementing sharding strategies at the database level to ensure queries remain performant at scale.</li>
          <li><strong>Infrastructure as Code:</strong> Every piece of infrastructure is codified, making disaster recovery and environment replication trivial.</li>
        </ul>

        <h2>Performance & Scale</h2>
        <p>After migrating to the new architecture, we observed a 40% reduction in P99 latency during peak load events. Database deadlocks were completely eliminated thanks to the new connection pooling and query optimization strategies.</p>
      </article>
      
      <div class="footer-nav">
        <a href="/work" class="webflow-btn">
          <span class="btn-text">Back to all projects</span>
          <svg class="btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </a>
      </div>
    </div>
  </div>
{:else}
  <div class="page-container not-found">
    <h1>Project Not Found</h1>
    <a href="/work" class="back-link">Return to Work</a>
  </div>
{/if}

<style>
  .page-container {
    padding: 140px 20px 100px;
    min-height: 100vh;
    background: #030207;
    position: relative;
    overflow: hidden;
  }

  .not-found {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    font-family: "SF Pro Display", sans-serif;
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
    max-width: 800px;
    margin: 0 auto;
    width: 100%;
    position: relative;
    z-index: 1;
  }
  
  .header-nav {
    margin-bottom: 60px;
    opacity: 0;
    transform: translateY(-10px);
    transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  .page-container.animate .header-nav {
    opacity: 1;
    transform: translateY(0);
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

  /* ── Header ── */
  .project-header {
    margin-bottom: 60px;
  }
  
  .meta-info {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 20px;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s;
  }
  
  .category {
    font-family: "SF Pro Display", sans-serif;
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: rgba(255, 255, 255, 0.9);
  }
  
  .date {
    font-family: "SF Pro Display", sans-serif;
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.4);
  }

  .main-line {
    font-family: "SF Pro Display", "Inter", sans-serif;
    font-size: 4rem;
    font-weight: 500;
    letter-spacing: -0.02em;
    color: #ffffff;
    margin: 0 0 24px 0;
    line-height: 1.1;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s;
  }

  .description {
    font-family: "SF Pro Display", sans-serif;
    font-size: 1.3rem;
    color: rgba(255, 255, 255, 0.6);
    line-height: 1.6;
    margin: 0 0 32px 0;
    font-weight: 300;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s;
  }
  
  .tech-stack {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 40px;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s;
  }

  .tech-tag {
    font-family: "SF Pro Display", sans-serif;
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.8);
    background: rgba(255, 255, 255, 0.05);
    padding: 6px 14px;
    border-radius: 6px;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }
  
  .links {
    display: flex;
    gap: 16px;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s;
  }
  
  .primary-btn, .secondary-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 24px;
    border-radius: 8px;
    font-family: "SF Pro Display", sans-serif;
    font-size: 0.95rem;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.3s ease;
  }
  
  .primary-btn {
    background: #fff;
    color: #000;
  }
  
  .primary-btn:hover {
    background: rgba(255, 255, 255, 0.8);
    transform: translateY(-2px);
  }
  
  .secondary-btn {
    background: rgba(255, 255, 255, 0.05);
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .secondary-btn:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }

  .page-container.animate .meta-info,
  .page-container.animate .main-line,
  .page-container.animate .description,
  .page-container.animate .tech-stack,
  .page-container.animate .links {
    opacity: 1;
    transform: translateY(0);
  }

  /* ── Content Styling ── */
  .content {
    color: rgba(255, 255, 255, 0.7);
    font-family: "SF Pro Display", sans-serif;
    font-size: 1.15rem;
    line-height: 1.7;
    opacity: 0;
    transform: translateY(30px);
    transition: all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.6s;
    padding-bottom: 60px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .page-container.animate .content {
    opacity: 1;
    transform: translateY(0);
  }

  .content h2 {
    font-family: "SF Pro Display", sans-serif;
    font-size: 2rem;
    font-weight: 500;
    color: #fff;
    margin: 60px 0 24px 0;
    letter-spacing: -0.01em;
  }
  
  .content h3 {
    font-family: "SF Pro Display", sans-serif;
    font-size: 1.4rem;
    font-weight: 500;
    color: #fff;
    margin: 40px 0 16px 0;
  }

  .content p {
    margin-bottom: 24px;
  }
  
  .content ul {
    margin-bottom: 32px;
    padding-left: 24px;
  }
  
  .content li {
    margin-bottom: 12px;
  }
  
  .content li strong {
    color: #fff;
    font-weight: 500;
  }

  .content blockquote {
    margin: 40px 0;
    padding: 30px;
    border-left: 2px solid rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.02);
    border-radius: 0 12px 12px 0;
  }
  
  .content blockquote p {
    font-family: "Cormorant Garamond", Georgia, serif;
    font-size: 1.6rem;
    font-style: italic;
    color: rgba(255, 255, 255, 0.9);
    margin: 0;
    line-height: 1.4;
  }

  /* ── Footer Nav ── */
  .footer-nav {
    margin-top: 60px;
    display: flex;
    justify-content: center;
    opacity: 0;
    transform: translateY(20px);
  }

  .page-container.animate .footer-nav {
    opacity: 1;
    transform: translateY(0);
    transition: all 0.6s ease 0.8s;
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
    transition: color 0.4s ease, border-color 0.4s ease;
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

  .btn-text, .btn-icon {
    position: relative;
    z-index: 1;
    transition: transform 0.4s cubic-bezier(0.19, 1, 0.22, 1);
  }

  .webflow-btn:hover .btn-icon {
    transform: translateX(-4px);
  }

  /* ── Responsive ── */
  @media (max-width: 768px) {
    .page-container {
      padding: 100px 16px;
    }

    .main-line {
      font-size: 2.8rem;
    }

    .description {
      font-size: 1.15rem;
    }
    
    .content {
      font-size: 1.05rem;
    }
    
    .content h2 {
      font-size: 1.7rem;
    }
    
    .content blockquote p {
      font-size: 1.4rem;
    }
    
    .links {
      flex-direction: column;
    }
    
    .primary-btn, .secondary-btn {
      justify-content: center;
    }
  }
</style>