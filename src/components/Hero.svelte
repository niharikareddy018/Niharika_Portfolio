<script>
  import { onMount, onDestroy } from "svelte";
  import StarField from "./StarField.svelte";

  const socialLinks = {
    email: "mailto:niharikamuduru@gmail.com",
    github: "https://github.com/niharikareddy018",
    linkedin: "https://www.linkedin.com/in/niharika-muduru-9a3543248",
  };

  const greetings = [
    "HELLO",
    "HOLA",
    "NAMASTE",
    "NAMASKARAM",
    "BONJOUR",
    "CIAO",
    "VANAKKAM",
    "KONNICHIWA",
  ];
  let displayedText = "HELLO";
  let interval;
  let cycleInterval;

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  function scrambleText(targetText) {
    let iteration = 0;

    clearInterval(interval);

    interval = setInterval(() => {
      displayedText = targetText
        .split("")
        .map((letter, index) => {
          if (index < iteration) {
            return targetText[index];
          }
          return letters[Math.floor(Math.random() * 26)];
        })
        .join("");

      if (iteration >= targetText.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, 30);
  }

  onMount(() => {
    let index = 0;
    cycleInterval = setInterval(() => {
      index = (index + 1) % greetings.length;
      scrambleText(greetings[index]);
    }, 4000);
  });

  onDestroy(() => {
    clearInterval(interval);
    clearInterval(cycleInterval);
  });
</script>

<main>
  <div class="tech-landscape">
    <StarField />
    <div class="fog-layer layer-1"></div>
    <div class="fog-layer layer-2"></div>
    <div class="fog-layer layer-3"></div>
  </div>

  <div class="content-wrapper">
    <div class="introduction">
      <span class="pre-title reveal" style="--i: 0">
        <span class="scramble-text">{displayedText}</span>
      </span>

      <div class="name-row reveal" style="--i: 1">
        <span class="small-im">I'm</span>
        <h1 class="greeting">Muduru Niharika</h1>
      </div>

      <p class="sub-intro reveal" style="--i: 2">
        Integrated M.Tech Software Engineering student at VIT-AP University —
        building scalable backend systems and AI-powered applications with
        Spring Boot, LLMs, RAG, NLP, Computer Vision, and modern software
        engineering practices.
      </p>
    </div>

    <div class="social-buttons reveal" style="--i: 3">
      <a
        href={socialLinks.email}
        target="_blank"
        rel="noopener noreferrer"
        class="social-button email"
        aria-label="Email"
      >
        <i class="fa-solid fa-envelope"></i>
        <span>Email</span>
      </a>
      <a
        href={socialLinks.github}
        target="_blank"
        rel="noopener noreferrer"
        class="social-button github"
        aria-label="GitHub"
      >
        <i class="fab fa-github"></i>
        <span>GitHub</span>
      </a>
      <a
        href={socialLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        class="social-button linkedin"
        aria-label="LinkedIn"
      >
        <i class="fab fa-linkedin"></i>
        <span>LinkedIn</span>
      </a>
    </div>
  </div>
</main>

<style>
  main {
    display: flex;
    min-height: 100vh;
    align-items: center;
    justify-content: center;
    padding: 140px 40px 100px;
    position: relative;
    z-index: 0;
    width: 100%;
  }

  .content-wrapper {
    position: relative;
    z-index: 5;
    width: 100%;
    max-width: 1100px;
    display: flex;
    flex-direction: column;
    gap: 48px;
  }

  .introduction {
    display: flex;
    flex-direction: column;
    gap: 20px;
    text-align: center;
    align-items: center;
    justify-content: center;
  }

  .tech-landscape {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: -50px;
    pointer-events: none;
    z-index: 0;
  }

  .fog-layer {
    position: absolute;
    filter: blur(100px);
    opacity: 0.6;
    animation: nebulaFlow 20s infinite alternate ease-in-out;
    border-radius: 50%;
    will-change: transform;
    transform: translateZ(0);
  }

  .layer-1 {
    bottom: -20%;
    left: -10%;
    width: 80%;
    height: 60%;
    background: radial-gradient(
      circle at center,
      #0a2540 0%,
      #04182c 70%,
      transparent 100%
    );
    opacity: 0.7;
    animation-duration: 25s;
    filter: blur(80px);
  }

  .layer-2 {
    bottom: -10%;
    right: -10%;
    width: 70%;
    height: 70%;
    background: conic-gradient(
      from 180deg at 50% 50%,
      #0c4a6e 0deg,
      #0284c7 120deg,
      transparent 240deg
    );
    opacity: 0.5;
    animation-delay: -5s;
    filter: blur(120px);
    transform: rotate(-15deg);
  }

  .layer-3 {
    bottom: 10%;
    left: 20%;
    width: 40%;
    height: 40%;
    background: radial-gradient(circle at center, #22d3ee 0%, transparent 60%);
    opacity: 0.25;
    animation-duration: 18s;
    animation-delay: -10s;
    filter: blur(90px);
    mix-blend-mode: screen;
  }

  @keyframes nebulaFlow {
    0% {
      transform: scale(1) translate(0, 0) rotate(0deg);
    }
    100% {
      transform: scale(1.1) translate(20px, -10px) rotate(2deg);
    }
  }

  .reveal {
    opacity: 0;
    filter: blur(8px);
    transform: translateY(24px);
    animation: fluidReveal 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    animation-delay: calc(0.15s + var(--i) * 0.15s);
  }

  @keyframes fluidReveal {
    to {
      opacity: 1;
      filter: blur(0);
      transform: translateY(0);
    }
  }

  .pre-title {
    font-family: "Inter", "SF Pro Display", system-ui, sans-serif;
    font-size: 1.5rem;
    color: var(--hero-subtext, rgba(255, 255, 255, 0.55));
    font-weight: 400;
    letter-spacing: -0.01em;
    display: block;
  }

  .scramble-text {
    color: var(--hero-text, #fff);
    font-family: "Space Mono", monospace;
    font-weight: 500;
    font-size: 1.6rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .name-row {
    display: flex;
    align-items: baseline;
    justify-content: center;
    gap: 14px;
    flex-wrap: wrap;
  }

  .small-im {
    font-family: "Cormorant Garamond", Georgia, serif;
    font-style: italic;
    font-size: 1.8rem;
    color: var(--hero-subtext, rgba(255, 255, 255, 0.55));
    font-weight: 400;
    line-height: 1;
  }

  .greeting {
    font-family: "Inter", "SF Pro Display", system-ui, sans-serif;
    font-style: initial;
    font-size: clamp(2.8rem, 6.5vw, 5.5rem);
    font-weight: 500;
    margin: 0;
    color: var(--hero-text, #ffffff);
    letter-spacing: -0.02em;
    line-height: 1.05;
    background: linear-gradient(135deg, #ffffff 0%, #bae6fd 50%, #7dd3fc 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .sub-intro {
    font-family: "Inter", "SF Pro Display", system-ui, sans-serif;
    font-style: italic;
    font-size: clamp(1rem, 1.6vw, 1.35rem);
    color: var(--hero-subtext, rgba(255, 255, 255, 0.65));
    line-height: 1.8;
    font-weight: 300;
    margin: 0 auto;
    max-width: 820px;
  }

  .social-buttons {
    display: flex;
    gap: 16px;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }

  .social-button {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 14px 28px;
    border-radius: 14px;
    font-family: "Inter", "SF Pro Display", system-ui, sans-serif;
    font-size: 0.95rem;
    font-weight: 500;
    color: var(--btn-text, rgba(255, 255, 255, 0.92));
    text-decoration: none;
    background: var(--btn-bg, rgba(18, 18, 18, 0.8));
    border: 1px solid var(--btn-border, rgba(255, 255, 255, 0.1));
    backdrop-filter: blur(10px);
    box-shadow:
      0 4px 12px -4px rgba(0, 0, 0, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.08);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
  }

  .social-button i {
    font-size: 1.1rem;
    transition: all 0.3s ease;
    position: relative;
    z-index: 1;
  }

  .social-button span {
    position: relative;
    z-index: 1;
    letter-spacing: 0.01em;
  }

  .social-button::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(
      135deg,
      transparent,
      rgba(14, 165, 233, 0.25),
      transparent
    );
    mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .social-button:hover {
    transform: translateY(-3px);
    box-shadow:
      0 12px 32px -8px rgba(14, 165, 233, 0.25),
      inset 0 1px 0 rgba(255, 255, 255, 0.12);
  }

  .social-button:hover::before {
    opacity: 1;
  }

  .email:hover {
    border-color: rgba(14, 165, 233, 0.4);
  }
  .email:hover i {
    color: #0ea5e9;
  }

  .github:hover {
    border-color: rgba(255, 255, 255, 0.35);
  }

  .linkedin:hover {
    border-color: rgba(0, 119, 181, 0.45);
  }
  .linkedin:hover i {
    color: #0077b5;
  }

  @media (max-width: 820px) {
    main {
      padding: 110px 24px 70px;
      min-height: auto;
    }

    .content-wrapper {
      gap: 36px;
    }

    .name-row {
      gap: 8px;
      flex-direction: column;
      align-items: center;
    }

    .small-im {
      font-size: 1.4rem;
    }
  }

  @media (max-width: 520px) {
    main {
      padding: 90px 20px 50px;
    }

    .social-buttons {
      gap: 10px;
    }

    .social-button {
      padding: 12px 20px;
      font-size: 0.88rem;
    }

    .social-button span {
      display: none;
    }

    .social-button i {
      font-size: 1.15rem;
    }
  }
</style>
