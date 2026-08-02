<script>
  import { onMount } from "svelte";

  const contactInfo = {
    email: "niharikamuduru@gmail.com",
    location: "Amaravati, India",
    linkedin: "https://www.linkedin.com/in/niharika-muduru/",
    github: "https://github.com/niharikareddy018",
  };

  let contactSection;
  let visible = false;

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
    if (contactSection) observer.observe(contactSection);
    return () => { if (contactSection) observer.disconnect(); };
  });
</script>

<section id="contact" bind:this={contactSection}>
  <div class="contact-bg">
    <div class="ambient-glow"></div>
    <div class="grid-pattern"></div>
  </div>

  <div class="container" class:animate={visible}>
    <div class="elegant-intro">
      <div class="line-mask">
        <h2 class="main-line">Let's Talk.</h2>
      </div>
      <div class="line-mask serif-mask">
        <h2 class="serif-line">Opportunities, Ideas & Chats.</h2>
      </div>
      <p class="sub-text">
        Open to internships, full-time roles, collaborations, and conversations
        about systems design, AI, and everything in between.
      </p>
    </div>

    <div class="contact-grid">
      <a href={`mailto:${contactInfo.email}`} class="contact-card email-card" target="_blank" rel="noopener noreferrer">
        <div class="card-icon">
          <i class="fa-solid fa-paper-plane"></i>
        </div>
        <div class="card-content">
          <p class="card-label">Email</p>
          <p class="card-value">{contactInfo.email}</p>
          <p class="card-action">Send me a note →</p>
        </div>
      </a>

      <a href={contactInfo.linkedin} class="contact-card linkedin-card" target="_blank" rel="noopener noreferrer">
        <div class="card-icon">
          <i class="fab fa-linkedin"></i>
        </div>
        <div class="card-content">
          <p class="card-label">LinkedIn</p>
          <p class="card-value">Niharika Muduru</p>
          <p class="card-action">Let's connect →</p>
        </div>
      </a>

      <a href={contactInfo.github} class="contact-card github-card" target="_blank" rel="noopener noreferrer">
        <div class="card-icon">
          <i class="fab fa-github"></i>
        </div>
        <div class="card-content">
          <p class="card-label">GitHub</p>
          <p class="card-value">@niharikareddy018</p>
          <p class="card-action">Check my repos →</p>
        </div>
      </a>

      <div class="contact-card info-card">
        <div class="card-icon">
          <i class="fa-solid fa-location-dot"></i>
        </div>
        <div class="card-content">
          <p class="card-label">Based in</p>
          <p class="card-value">{contactInfo.location}</p>
          <p class="card-action info-action">Open to opportunities</p>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  #contact {
    padding: 130px 20px 100px;
    position: relative;
    z-index: 10;
    width: 100%;
    overflow: hidden;
    background: radial-gradient(
      circle at 50% 0%,
      rgba(8, 47, 73, 1) 0%,
      #030207 100%
    );
  }

  :global(body.theme-light) #contact {
    background: radial-gradient(
      circle at 50% 0%,
      rgba(224, 242, 254, 1) 0%,
      #f0f9ff 100%
    );
  }

  .contact-bg {
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
    max-width: 1080px;
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

  .contact-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  .contact-card {
    position: relative;
    display: flex;
    gap: 20px;
    align-items: flex-start;
    padding: 28px;
    background: var(--card-bg-dark, rgba(12, 12, 16, 0.85));
    border: 1px solid var(--card-border-dark, rgba(255, 255, 255, 0.06));
    border-radius: 20px;
    backdrop-filter: blur(12px);
    text-decoration: none;
    color: inherit;
    transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    opacity: 0;
    transform: translateY(28px);
  }

  :global(body.theme-light) .contact-card {
    background: var(--card-bg-light, rgba(255, 255, 255, 0.9));
    border: 1px solid var(--card-border-light, rgba(2, 132, 199, 0.08));
  }

  .container.animate .contact-card {
    opacity: 1;
    transform: translateY(0);
    transition:
      opacity 0.65s ease calc(0.2s + var(--delay, 0s)),
      transform 0.65s cubic-bezier(0.2, 0.8, 0.2, 1) calc(0.2s + var(--delay, 0s)),
      border-color 0.3s ease,
      box-shadow 0.3s ease;
  }

  .contact-card:nth-child(1) { --delay: 0.1s; }
  .contact-card:nth-child(2) { --delay: 0.2s; }
  .contact-card:nth-child(3) { --delay: 0.3s; }
  .contact-card:nth-child(4) { --delay: 0.4s; }

  .contact-card:hover {
    transform: translateY(-4px);
    border-color: rgba(14, 165, 233, 0.45);
    box-shadow:
      0 8px 32px rgba(2, 132, 199, 0.18),
      inset 0 1px 0 rgba(34, 211, 238, 0.15);
  }

  .card-icon {
    flex-shrink: 0;
    width: 48px;
    height: 48px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, rgba(14, 165, 233, 0.18), rgba(34, 211, 238, 0.1));
    border: 1px solid rgba(14, 165, 233, 0.25);
    font-size: 1.2rem;
    color: #22d3ee;
  }

  :global(body.theme-light) .card-icon {
    background: linear-gradient(135deg, rgba(2, 132, 199, 0.12), rgba(6, 182, 212, 0.08));
    border: 1px solid rgba(2, 132, 199, 0.22);
    color: #0369a1;
  }

  .linkedin-card .card-icon {
    background: linear-gradient(135deg, rgba(10, 102, 194, 0.2), rgba(14, 165, 233, 0.12));
    color: #0077b5;
  }

  .github-card .card-icon {
    background: linear-gradient(135deg, rgba(36, 41, 47, 0.3), rgba(14, 165, 233, 0.12));
    color: var(--github-icon, #e6edf3);
  }

  :global(body.theme-light) .github-card .card-icon {
    --github-icon: #24292f;
  }

  .card-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .card-label {
    font-family: "Inter", "SF Pro Display", system-ui, sans-serif;
    font-size: 0.78rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--sec-subtext, rgba(255, 255, 255, 0.45));
    margin: 0;
    font-weight: 500;
  }

  .card-value {
    font-family: "Inter", "SF Pro Display", system-ui, sans-serif;
    font-size: 1.05rem;
    color: var(--sec-heading, #fff);
    margin: 4px 0 0 0;
    font-weight: 500;
    word-break: break-word;
  }

  .card-action, .info-action {
    font-family: "Cormorant Garamond", Georgia, serif;
    font-size: 1.05rem;
    font-style: italic;
    color: #22d3ee;
    margin: 12px 0 0 0;
    font-weight: 400;
  }

  .info-action {
    font-family: "Inter", sans-serif;
    font-style: normal;
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--sec-text, rgba(255, 255, 255, 0.65));
  }

  :global(body.theme-light) .info-action {
    color: rgba(15, 23, 42, 0.65);
  }

  :global(body.theme-light) .main-line {
    color: #0f172a;
  }

  :global(body.theme-light) .serif-line {
    color: rgba(15, 23, 42, 0.78);
  }

  :global(body.theme-light) .sub-text {
    color: rgba(15, 23, 42, 0.55);
  }

  :global(body.theme-light) .card-label {
    color: rgba(15, 23, 42, 0.55);
  }

  :global(body.theme-light) .card-value {
    color: #0f172a;
  }

  @media (max-width: 768px) {
    #contact {
      padding: 100px 16px 80px;
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

    .contact-grid {
      grid-template-columns: 1fr;
      gap: 16px;
    }

    .contact-card {
      padding: 22px;
    }
  }

  @media (max-width: 480px) {
    .main-line {
      font-size: 2.4rem;
    }
    .serif-line {
      font-size: 2.6rem;
    }
    .contact-card {
      gap: 16px;
    }
    .card-icon {
      width: 42px;
      height: 42px;
      border-radius: 12px;
      font-size: 1.05rem;
    }
    .card-value {
      font-size: 0.98rem;
    }
  }
</style>
