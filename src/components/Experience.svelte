<script>
  import { onMount } from "svelte";

  let educationSection;
  let visible = false;

  const educations = [
    {
      institution: "VIT-AP University, Amaravati",
      degree: "M.Tech (Integrated) – Software Engineering",
      period: "2022 – 2027",
      cgpa: "8.28 / 10.00",
      description: [
        "Five-year integrated postgraduate program in Software Engineering with rigorous training in core CS fundamentals and advanced software engineering concepts.",
        "Built several full-stack projects, AI/ML applications, and backend systems throughout the coursework.",
        "Actively participated in hackathons, tech clubs, and hands-on laboratory sessions for practical exposure.",
      ],
      coursework: [
        "Data Structures & Algorithms",
        "Object-Oriented Programming using Java",
        "Database Management Systems",
        "Operating Systems",
        "Computer Networks",
        "Software Engineering",
        "Machine Learning",
        "Artificial Intelligence",
      ],
    },
  ];

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visible = true;
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" },
    );

    if (educationSection) {
      observer.observe(educationSection);
    }

    return () => {
      if (educationSection) {
        observer.unobserve(educationSection);
      }
    };
  });
</script>

<section id="education" bind:this={educationSection} class:visible>
  <div class="content-wrapper">
    <div class="grid-layout">
      <div class="visual-column">
        <div class="header-group">
          <h2 class="section-title">Education</h2>
          <p class="section-subtitle">
            Academic foundation in software engineering with a strong focus on
            computer science fundamentals, AI/ML, and modern development
            practices.
          </p>
        </div>

        <div class="graphic-container hidden-mobile">
          <div class="glow-bg"></div>

          <div class="diagram-wrapper">
            <svg class="connection-svg" viewBox="0 0 400 350">
              <defs>
                <filter
                  id="glow-dot"
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                >
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <linearGradient
                  id="line-gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stop-color="rgba(34,211,238,0.05)" />
                  <stop offset="50%" stop-color="rgba(2,132,199,0.3)" />
                  <stop offset="100%" stop-color="rgba(34,211,238,0.05)" />
                </linearGradient>
              </defs>

              <path
                d="M 64 50 C 113 50, 113 155, 162 155"
                class="diagram-line"
              />
              <path
                d="M 54 120 C 108 120, 108 155, 162 155"
                class="diagram-line"
              />
              <path
                d="M 54 190 C 108 190, 108 155, 162 155"
                class="diagram-line"
              />
              <path
                d="M 64 260 C 113 260, 113 155, 162 155"
                class="diagram-line"
              />

              <path
                d="M 218 155 L 290 155"
                class="diagram-line highlight-line"
              />

              <circle r="2.5" fill="#fff" filter="url(#glow-dot)">
                <animateMotion
                  dur="3s"
                  repeatCount="indefinite"
                  path="M 64 50 C 113 50, 113 155, 162 155"
                  begin="0s"
                />
              </circle>
              <circle r="2.5" fill="#fff" filter="url(#glow-dot)">
                <animateMotion
                  dur="3s"
                  repeatCount="indefinite"
                  path="M 54 120 C 108 120, 108 155, 162 155"
                  begin="0.75s"
                />
              </circle>
              <circle r="2.5" fill="#fff" filter="url(#glow-dot)">
                <animateMotion
                  dur="3s"
                  repeatCount="indefinite"
                  path="M 54 190 C 108 190, 108 155, 162 155"
                  begin="1.5s"
                />
              </circle>
              <circle r="2.5" fill="#fff" filter="url(#glow-dot)">
                <animateMotion
                  dur="3s"
                  repeatCount="indefinite"
                  path="M 64 260 C 113 260, 113 155, 162 155"
                  begin="2.25s"
                />
              </circle>

              <circle r="3" fill="#0284c7" filter="url(#glow-dot)">
                <animateMotion
                  dur="1.5s"
                  repeatCount="indefinite"
                  path="M 218 155 L 290 155"
                  begin="0s"
                />
              </circle>
            </svg>

            <div class="node left-node n1">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                ><path
                  d="M22 10v6M2 10l10-5 10 5-10 5z"
                /><path
                  d="M6 12v5c3 3 9 3 12 0v-5"
                /></svg
              >
            </div>
            <div class="node left-node n2">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                ><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path
                  d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"
                /></svg
              >
            </div>
            <div class="node left-node n3">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                ><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path
                  d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"
                /></svg
              >
            </div>
            <div class="node left-node n4">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                ><path d="M6 3h12l4 6-10 13L2 9Z" /><path
                  d="M11 3 8 9l4 13 4-13-3-6"
                /><path d="M2 9h20" /></svg
              >
            </div>

            <div class="node center-node">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                ><path
                  d="M22 10v6M2 10l10-5 10 5-10 5z"
                /><circle cx="12" cy="12" r="4" /></svg
              >
            </div>

            <div class="node right-node">
              <div class="right-node-inner">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
            </div>

            <div class="diagram-label label-building">Fundamentals</div>
            <div class="diagram-label label-deploying">Learning</div>
            <div class="diagram-label label-managing">Building</div>
          </div>
        </div>
      </div>

      <div class="timeline-column">
        <div class="timeline">
          {#each educations as edu, i}
            <div class="timeline-item" style="--delay: {i * 0.2}s">
              <div class="timeline-marker"></div>
              <div class="timeline-content">
                <div class="edu-card">
                  <div class="card-header">
                    <div>
                      <h3 class="degree">{edu.degree}</h3>
                      <p class="institution">{edu.institution}</p>
                    </div>
                    <span class="period">{edu.period}</span>
                  </div>

                  <div class="cgpa-row">
                    <span class="cgpa-label">CGPA</span>
                    <span class="cgpa-value">{edu.cgpa}</span>
                  </div>

                  <ul class="details">
                    {#each edu.description as item}
                      <li>{item}</li>
                    {/each}
                  </ul>

                  {#if edu.coursework}
                    <div class="coursework-block">
                      <span class="coursework-title">Relevant Coursework</span>
                      <div class="coursework-list">
                        {#each edu.coursework as course}
                          <span class="course-tag">{course}</span>
                        {/each}
                      </div>
                    </div>
                  {/if}
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  #education {
    padding: 60px 20px 100px;
    position: relative;
    overflow: hidden;
  }

  .content-wrapper {
    max-width: 1100px;
    margin: 0 auto;
    width: 100%;
  }

  .grid-layout {
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    gap: 80px;
    align-items: start;
  }

  .visual-column {
    position: sticky;
    top: 150px;
  }

  .header-group {
    opacity: 0;
    transform: translateY(30px);
    transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .section-title {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--sec-heading, #fff);
    margin: 0;
    background: linear-gradient(to right, #0ea5e9, #22d3ee);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: -0.02em;
  }

  :global(body.theme-light) .section-title {
    background: linear-gradient(to right, #0284c7, #0e7490);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .section-subtitle {
    font-size: 1.1rem;
    color: var(--sec-subtext, rgba(255, 255, 255, 0.6));
    margin-top: 16px;
    line-height: 1.6;
    font-family: "Inter", "SF Pro Display", system-ui, -apple-system,
      BlinkMacSystemFont, "Segoe UI", sans-serif;
  }

  .graphic-container {
    position: relative;
    margin-top: 40px;
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .glow-bg {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 300px;
    height: 300px;
    background: radial-gradient(
      circle,
      rgba(2, 132, 199, 0.15) 0%,
      transparent 70%
    );
    transform: translate(-50%, -50%);
    border-radius: 50%;
    z-index: 0;
  }

  .diagram-wrapper {
    position: relative;
    width: 400px;
    height: 350px;
    z-index: 1;
    opacity: 0;
    transform: translateY(30px) scale(0.96);
    transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.15s;
  }

  #education.visible .diagram-wrapper {
    opacity: 1;
    transform: translateY(0) scale(1);
  }

  .connection-svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  .diagram-line {
    stroke: url(#line-gradient);
    stroke-width: 1.5;
    fill: none;
  }

  .highlight-line {
    stroke: rgba(2, 132, 199, 0.4);
    stroke-dasharray: 4 4;
    animation: dashScroll 20s linear infinite;
  }

  @keyframes dashScroll {
    to {
      stroke-dashoffset: -1000;
    }
  }

  .node {
    position: absolute;
    background: var(--node-bg, rgba(30, 30, 35, 0.8));
    border: 1px solid var(--node-border, rgba(255, 255, 255, 0.1));
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--node-color, rgba(255, 255, 255, 0.8));
    transform: translate(-50%, -50%);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    transition: all 0.4s ease;
  }

  :global(body.theme-light) .node {
    --node-bg: rgba(255, 255, 255, 0.8);
    --node-border: rgba(2, 132, 199, 0.15);
    --node-color: #0f172a;
  }

  .node:hover {
    transform: translate(-50%, -50%) scale(1.1);
    color: #22d3ee;
    border-color: rgba(34, 211, 238, 0.3);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
  }

  .left-node {
    width: 48px;
    height: 48px;
    border-radius: 12px;
  }

  .left-node svg {
    width: 22px;
    height: 22px;
  }

  .n1 { top: 50px; left: 40px; }
  .n2 { top: 120px; left: 30px; }
  .n3 { top: 190px; left: 30px; }
  .n4 { top: 260px; left: 40px; }

  .center-node {
    width: 56px;
    height: 56px;
    border-radius: 16px;
    top: 155px;
    left: 190px;
    background: var(--center-node-bg, rgba(40, 40, 45, 0.9));
    border: 1px solid var(--center-node-border, rgba(255, 255, 255, 0.15));
  }

  .center-node svg {
    width: 26px;
    height: 26px;
  }

  .right-node {
    width: 80px;
    height: 80px;
    border-radius: 20px;
    top: 155px;
    left: 330px;
    background: linear-gradient(
      135deg,
      rgba(8, 47, 73, 0.85),
      rgba(2, 132, 199, 0.85)
    );
    border: 1px solid rgba(34, 211, 238, 0.4);
    box-shadow:
      0 0 30px rgba(2, 132, 199, 0.3),
      inset 0 0 20px rgba(255, 255, 255, 0.1);
    color: #fff;
  }

  .right-node-inner {
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.6));
    animation: nodePulse 2s infinite alternate ease-in-out;
  }

  .right-node-inner svg {
    width: 34px;
    height: 34px;
  }

  @keyframes nodePulse {
    0% { transform: scale(0.95); opacity: 0.9; }
    100% { transform: scale(1.05); opacity: 1; }
  }

  .diagram-label {
    position: absolute;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--sec-subtext, rgba(255, 255, 255, 0.4));
    transform: translateX(-50%);
    top: 310px;
  }

  .label-building { left: 40px; }
  .label-deploying { left: 190px; }
  .label-managing {
    left: 330px;
    color: rgba(34, 211, 238, 0.7);
  }

  .timeline {
    position: relative;
    padding-left: 30px;
  }

  .timeline::before {
    content: "";
    position: absolute;
    left: 0;
    top: 10px;
    bottom: 0;
    width: 2px;
    background: linear-gradient(
      to bottom,
      rgba(34, 211, 238, 0.35),
      rgba(2, 132, 199, 0.1) 70%,
      transparent
    );
    border-radius: 2px;
    transform: scaleY(0);
    transform-origin: top;
    transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s;
  }

  #education.visible .timeline::before {
    transform: scaleY(1);
  }

  .timeline-item {
    position: relative;
    margin-bottom: 60px;
    opacity: 0;
    transform: translateX(-30px);
    transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
    transition-delay: var(--delay);
  }

  .timeline-marker {
    position: absolute;
    left: -35px;
    top: 24px;
    width: 12px;
    height: 12px;
    background: #000;
    border: 2px solid rgba(34, 211, 238, 0.6);
    border-radius: 50%;
    z-index: 2;
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 0 0 4px var(--timeline-marker-shadow, #030207);
    transform: scale(0);
  }

  :global(body.theme-light) .timeline-marker {
    --timeline-marker-shadow: #ffffff;
    background: #ffffff;
  }

  #education.visible .timeline-marker {
    transform: scale(1);
    animation: markerPulse 1s cubic-bezier(0.16, 1, 0.3, 1) 0.8s;
  }

  @keyframes markerPulse {
    0% { box-shadow: 0 0 0 4px var(--timeline-marker-shadow, #030207); }
    50% {
      box-shadow:
        0 0 0 4px var(--timeline-marker-shadow, #030207),
        0 0 12px rgba(34, 211, 238, 0.5);
    }
    100% { box-shadow: 0 0 0 4px var(--timeline-marker-shadow, #030207); }
  }

  .timeline-item:hover .timeline-marker {
    background: #0ea5e9;
    border-color: #22d3ee;
    box-shadow:
      0 0 15px rgba(14, 165, 233, 0.5),
      0 0 0 4px var(--timeline-marker-shadow, #030207);
  }

  .edu-card {
    background: var(--card-bg, rgba(255, 255, 255, 0.03));
    border: 1px solid var(--card-border, rgba(255, 255, 255, 0.06));
    border-radius: 16px;
    padding: 32px;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    backdrop-filter: blur(10px);
  }

  :global(body.theme-light) .edu-card {
    --card-bg: rgba(255, 255, 255, 0.85);
    --card-border: rgba(2, 132, 199, 0.1);
  }

  .edu-card:hover {
    background: var(--card-hover, rgba(255, 255, 255, 0.05));
    border-color: var(--card-border-hover, rgba(255, 255, 255, 0.15));
    transform: translateY(-2px);
    box-shadow: 0 10px 40px -10px rgba(2, 132, 199, 0.25);
  }

  :global(body.theme-light) .edu-card:hover {
    --card-hover: rgba(240, 249, 255, 0.9);
    --card-border-hover: rgba(14, 165, 233, 0.3);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 20px;
    gap: 20px;
  }

  .degree {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--sec-heading, #fff);
    margin: 0 0 4px 0;
    letter-spacing: -0.01em;
  }

  .institution {
    font-size: 0.95rem;
    color: var(--sec-subtext, rgba(255, 255, 255, 0.6));
    margin: 0;
  }

  .period {
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--sec-mutedsub, rgba(255, 255, 255, 0.45));
    background: var(--tag-bg, rgba(255, 255, 255, 0.05));
    padding: 6px 12px;
    border-radius: 100px;
    white-space: nowrap;
  }

  :global(body.theme-light) .period {
    --tag-bg: rgba(2, 132, 199, 0.08);
  }

  .cgpa-row {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 18px;
    margin-bottom: 20px;
    background: linear-gradient(
      135deg,
      rgba(14, 165, 233, 0.12),
      rgba(34, 211, 238, 0.06)
    );
    border: 1px solid rgba(14, 165, 233, 0.2);
    border-radius: 12px;
  }

  .cgpa-label {
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--sec-mutedsub, rgba(255, 255, 255, 0.5));
    font-weight: 600;
  }

  .cgpa-value {
    font-family: "Space Mono", monospace;
    font-size: 1.3rem;
    font-weight: 700;
    background: linear-gradient(to right, #0ea5e9, #22d3ee);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .details {
    list-style: none;
    padding: 0;
    margin: 0 0 20px 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .details li {
    font-size: 0.95rem;
    color: var(--sec-text, rgba(255, 255, 255, 0.75));
    line-height: 1.6;
    padding-left: 20px;
    position: relative;
  }

  .details li::before {
    content: "•";
    position: absolute;
    left: 0;
    color: rgba(14, 165, 233, 0.6);
    font-size: 1.1rem;
  }

  .coursework-block {
    border-top: 1px solid var(--card-border, rgba(255, 255, 255, 0.06));
    padding-top: 20px;
  }

  .coursework-title {
    display: block;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--sec-mutedsub, rgba(255, 255, 255, 0.45));
    font-weight: 600;
    margin-bottom: 12px;
  }

  .coursework-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .course-tag {
    font-size: 0.78rem;
    color: var(--sec-text, rgba(255, 255, 255, 0.8));
    background: var(--tag-bg, rgba(14, 165, 233, 0.08));
    border: 1px solid rgba(14, 165, 233, 0.15);
    padding: 5px 11px;
    border-radius: 8px;
    transition: all 0.2s ease;
  }

  .course-tag:hover {
    background: rgba(14, 165, 233, 0.16);
    border-color: rgba(14, 165, 233, 0.3);
    color: var(--sec-heading, #fff);
  }

  #education.visible .header-group {
    opacity: 1;
    transform: translateY(0);
  }

  #education.visible .timeline-item {
    opacity: 1;
    transform: translateX(0);
  }

  @media (max-width: 900px) {
    .grid-layout {
      grid-template-columns: 1fr;
      gap: 40px;
    }

    .visual-column {
      position: relative;
      top: 0;
    }

    .hidden-mobile {
      display: none;
    }
  }

  @media (max-width: 768px) {
    .card-header {
      flex-direction: column;
      gap: 12px;
    }

    .period {
      align-self: flex-start;
    }

    .timeline {
      padding-left: 20px;
    }

    .timeline-marker {
      left: -26px;
    }

    .edu-card {
      padding: 24px;
    }
  }

  @media (max-width: 480px) {
    #education {
      padding: 40px 16px 80px;
    }

    .section-title {
      font-size: 2rem;
    }

    .section-subtitle {
      font-size: 0.95rem;
      margin-top: 12px;
    }

    .edu-card {
      padding: 20px;
    }

    .degree {
      font-size: 1.1rem;
    }

    .institution {
      font-size: 0.85rem;
    }

    .details {
      font-size: 0.88rem;
    }

    .cgpa-value {
      font-size: 1.15rem;
    }

    .timeline {
      padding-left: 16px;
    }

    .timeline-marker {
      left: -22px;
    }
  }
</style>
