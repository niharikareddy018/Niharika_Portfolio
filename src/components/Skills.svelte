<script>
  import { onMount } from "svelte";
  import flaskIcon from "../assets/skills-logos/flask.svg";

  const skillsCategories = [
    {
      id: "languages",
      title: "Programming Languages",
      description: "Core languages I code in daily.",
      span: 2,
      accent: "#0ea5e9",
      skills: [
        { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
        { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
        { name: "SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
        { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      ],
    },
    {
      id: "backend",
      title: "Backend & APIs",
      description: "Frameworks for scalable services.",
      accent: "#06b6d4",
      skills: [
        { name: "Spring Boot", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
        { name: "Flask", icon: flaskIcon },
        { name: "REST APIs", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
        { name: "Microservices", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
        { name: "RabbitMQ", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rabbitmq/rabbitmq-original.svg" },
      ],
    },
    {
      id: "databases",
      title: "Databases & Cloud",
      description: "Where the data lives and scales.",
      accent: "#22d3ee",
      skills: [
        { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
        { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
        { name: "Google Cloud", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" },
      ],
    },
    {
      id: "ai-ml",
      title: "AI & Machine Learning",
      description: "Building smart, data-driven apps.",
      accent: "#0891b2",
      skills: [
        { name: "LLMs", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
        { name: "RAG", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
        { name: "NLP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" },
        { name: "Computer Vision", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg" },
      ],
    },
    {
      id: "tools",
      title: "Tools & Practices",
      description: "How I ship clean, reliable code.",
      span: 2,
      accent: "#0284c7",
      skills: [
        { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
        { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
        { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
        { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
        { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
        { name: "Postman", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
      ],
    },
  ];

  function handleImageError(event, techName) {
    event.target.onerror = null;
    const initials = techName.split(" ").map((w) => w[0]).join("");
    event.target.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="40" height="40"><rect width="100" height="100" rx="20" fill="rgba(14,165,233,0.1)"/><text y="50%" x="50%" dominant-baseline="middle" text-anchor="middle" font-size="40" fill="white">${initials}</text></svg>`;
  }

  let skillsSection;
  let visible = false;
  let rafId = null;

  function handleMouseMove(e) {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      const cards = skillsSection?.querySelectorAll(".bento-card");
      if (!cards) return;
      for (const card of cards) {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
        card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
      }
      rafId = null;
    });
  }

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !visible) {
          visible = true;
          observer.unobserve(entries[0].target);
        }
      },
      { threshold: 0.12, rootMargin: "0px" },
    );
    if (skillsSection) observer.observe(skillsSection);
    return () => { if (skillsSection) observer.disconnect(); };
  });
</script>

<section id="skills" bind:this={skillsSection}>
  <div class="skills-bg">
    <div class="ambient-glow"></div>
    <div class="grid-pattern"></div>
  </div>

  <div class="container" class:animate={visible}>
    <div class="elegant-intro">
      <div class="line-mask">
        <h2 class="main-line">I Wield.</h2>
      </div>
      <div class="line-mask serif-mask">
        <h2 class="serif-line">The Stack Behind It.</h2>
      </div>
      <p class="sub-text">
        Every language, framework, database, and tool I rely on — chosen
        deliberately, wielded to build intelligent, scalable, production-ready
        systems.
      </p>
    </div>

    <div class="bento-grid" role="presentation" on:mousemove={handleMouseMove}>
      {#each skillsCategories as category, i}
        <div
          class="bento-card {category.span === 2 ? 'span-2' : ''}"
          style="--delay: {0.15 + i * 0.1}s; --accent: {category.accent}"
        >
          <div class="card-content">
            <div class="card-header">
              <h3>{category.title}</h3>
              <p>{category.description}</p>
            </div>

            <div class="skills-cluster">
              {#each category.skills as skill}
                <div class="skill-pill">
                  <div class="icon-wrapper">
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      on:error={(e) => handleImageError(e, skill.name)}
                    />
                  </div>
                  <span>{skill.name}</span>
                </div>
              {/each}
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  #skills {
    padding: 130px 20px 100px;
    position: relative;
    z-index: 10;
    width: 100%;
    overflow: hidden;
    background: radial-gradient(
      circle at 50% 0%,
      var(--page-bg-dark, rgba(8, 47, 73, 1)) 0%,
      var(--page-bg, #030207) 100%
    );
  }

  :global(body.theme-light) #skills {
    background: radial-gradient(
      circle at 50% 0%,
      var(--page-bg-light, rgba(224, 242, 254, 1)) 0%,
      var(--page-bg, #f0f9ff) 100%
    );
  }

  .skills-bg {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
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
      rgba(14, 165, 233, 0.2),
      transparent
    );
  }

  .grid-pattern {
    position: absolute;
    inset: 0;
    background-image: radial-gradient(
      circle,
      rgba(14, 165, 233, 0.04) 1px,
      transparent 1px
    );
    background-size: 40px 40px;
    mask-image: radial-gradient(
      ellipse 70% 60% at 50% 30%,
      rgba(0, 0, 0, 0.4) 0%,
      transparent 70%
    );
    -webkit-mask-image: radial-gradient(
      ellipse 70% 60% at 50% 30%,
      rgba(0, 0, 0, 0.4) 0%,
      transparent 70%
    );
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

  .bento-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  .bento-card {
    position: relative;
    background: var(--card-bg-dark, rgba(12, 12, 16, 0.85));
    border: 1px solid var(--card-border-dark, rgba(255, 255, 255, 0.06));
    border-radius: 20px;
    backdrop-filter: blur(12px);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    --mouse-x: -1000px;
    --mouse-y: -1000px;

    opacity: 0;
    transform: translateY(28px);
  }

  :global(body.theme-light) .bento-card {
    background: var(--card-bg-light, rgba(255, 255, 255, 0.9));
    border: 1px solid var(--card-border-light, rgba(2, 132, 199, 0.08));
  }

  .container.animate .bento-card {
    opacity: 1;
    transform: translateY(0);
    transition:
      opacity 0.65s ease var(--delay),
      transform 0.65s cubic-bezier(0.2, 0.8, 0.2, 1) var(--delay);
  }

  .bento-card:hover {
    border-color: color-mix(in srgb, var(--accent) 40%, rgba(255,255,255,0.15));
  }

  .bento-card::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1px;
    background: radial-gradient(
      500px circle at var(--mouse-x) var(--mouse-y),
      rgba(14, 165, 233, 0.45),
      rgba(14, 165, 233, 0.1) 25%,
      transparent 50%
    );
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    z-index: 2;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .bento-grid:hover .bento-card::before {
    opacity: 1;
  }

  .span-2 {
    grid-column: span 2;
  }

  .card-content {
    position: relative;
    padding: 28px 32px 32px;
    height: 100%;
    width: 100%;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 22px;
  }

  .card-header h3 {
    font-family: "Cormorant Garamond", Georgia, serif;
    font-style: italic;
    font-size: 1.5rem;
    font-weight: 300;
    color: var(--sec-heading, #fff);
    margin: 0 0 6px 0;
    letter-spacing: 0.02em;
  }

  .card-header p {
    font-family: "Inter", "SF Pro Display", system-ui, sans-serif;
    font-size: 0.88rem;
    color: var(--sec-subtext, rgba(255, 255, 255, 0.4));
    margin: 0;
    font-weight: 400;
  }

  .skills-cluster {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .skill-pill {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 16px 8px 10px;
    background: rgba(14, 165, 233, 0.04);
    border: 1px solid rgba(14, 165, 233, 0.08);
    border-radius: 12px;
    transition: all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
    user-select: none;
  }

  :global(body.theme-light) .skill-pill {
    background: rgba(2, 132, 199, 0.05);
    border: 1px solid rgba(2, 132, 199, 0.1);
  }

  .skill-pill:hover {
    background: rgba(14, 165, 233, 0.12);
    border-color: color-mix(in srgb, var(--accent) 50%, rgba(14,165,233,0.2));
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(2, 132, 199, 0.22);
  }

  .icon-wrapper {
    width: 22px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .icon-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .skill-pill span {
    font-family: "Inter", "SF Pro Display", system-ui, sans-serif;
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--sec-text, rgba(255, 255, 255, 0.8));
    white-space: nowrap;
  }

  @media (max-width: 768px) {
    #skills {
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

    .bento-grid {
      grid-template-columns: 1fr;
      gap: 16px;
    }

    .span-2 {
      grid-column: span 1;
    }

    .card-content {
      padding: 22px 20px 24px;
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
