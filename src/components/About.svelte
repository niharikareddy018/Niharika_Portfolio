<script>
  import { onMount } from "svelte";

  let words = [];
  let sectionElement;

  const content = [
    { text: "I'm ", bold: false },
    { text: "Muduru ", bold: false },
    { text: "Niharika, ", bold: true },
    { text: "an ", bold: false },
    { text: "Integrated ", bold: false },
    { text: "M.Tech ", bold: false },
    { text: "Software ", bold: false },
    { text: "Engineering ", bold: true },
    { text: "student ", bold: false },
    { text: "with ", bold: false },
    { text: "strong ", bold: false },
    { text: "foundations ", bold: false },
    { text: "in ", bold: false },
    { text: "Java, ", bold: true },
    { text: "Python, ", bold: true },
    { text: "SQL, ", bold: true },
    { text: "Data ", bold: false },
    { text: "Structures ", bold: false },
    { text: "& ", bold: false },
    { text: "Algorithms, ", bold: false },
    { text: "and ", bold: false },
    { text: "Object-Oriented ", bold: false },
    { text: "Programming. ", bold: true },
    { text: "I'm ", bold: false },
    { text: "experienced ", bold: false },
    { text: "in ", bold: false },
    { text: "developing ", bold: false },
    { text: "scalable ", bold: true },
    { text: "backend ", bold: true },
    { text: "systems ", bold: false },
    { text: "and ", bold: false },
    { text: "AI-powered ", bold: true },
    { text: "applications ", bold: false },
    { text: "using ", bold: false },
    { text: "Spring ", bold: true },
    { text: "Boot, ", bold: true },
    { text: "REST ", bold: false },
    { text: "APIs, ", bold: false },
    { text: "Microservices, ", bold: true },
    { text: "Large ", bold: false },
    { text: "Language ", bold: false },
    { text: "Models, ", bold: true },
    { text: "RAG, ", bold: true },
    { text: "NLP, ", bold: true },
    { text: "and ", bold: false },
    { text: "Computer ", bold: false },
    { text: "Vision. ", bold: true },
    { text: "Proficient ", bold: false },
    { text: "in ", bold: false },
    { text: "PostgreSQL, ", bold: false },
    { text: "Docker, ", bold: false },
    { text: "Git, ", bold: false },
    { text: "and ", bold: false },
    { text: "modern ", bold: false },
    { text: "software ", bold: false },
    { text: "development ", bold: false },
    { text: "practices. ", bold: false },
    { text: "Passionate ", bold: false },
    { text: "about ", bold: false },
    { text: "building ", bold: false },
    { text: "intelligent, ", bold: true },
    { text: "scalable, ", bold: true },
    { text: "and ", bold: false },
    { text: "production-ready ", bold: true },
    { text: "software ", bold: false },
    { text: "solutions.", bold: true },
  ];

  function getWordColor(opacity = 0.2, isBold = false) {
    const clamped = Math.max(0, Math.min(1, opacity));
    const base = isBold ? 150 : 130;
    const max = 245;
    const value = Math.round(base + (max - base) * Math.pow(clamped, 1.15));
    if (isBold && typeof document !== "undefined" && document.documentElement.classList.contains("theme-light")) {
      const dark = Math.round(20 + (60 - 20) * clamped);
      return `rgb(${dark}, ${dark + 20}, ${dark + 60})`;
    }
    return `rgb(${value}, ${value}, ${value})`;
  }

  onMount(() => {
    words = content.map(() => ({ opacity: 0.2 }));
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (sectionElement) {
        const rect = sectionElement.getBoundingClientRect();
        const sectionTop = rect.top;
        const sectionHeight = rect.height;
        const windowHeight = window.innerHeight;
        const currentScrollY = window.scrollY;
        const direction = currentScrollY - lastScrollY;

        const sectionProgress = Math.max(
          0,
          Math.min(
            1.75,
            (windowHeight - sectionTop) / (windowHeight + sectionHeight * 0.2),
          ),
        );

        content.forEach((_, index) => {
          const wordStartProgress = (index / content.length) * 0.65;
          const wordEndProgress = ((index + 1) / content.length) * 0.42;

          const revealProgress = Math.max(
            0,
            Math.min(
              1,
              (sectionProgress - wordStartProgress) /
                (wordEndProgress - wordStartProgress + 0.4),
            ),
          );

          let opacity = Math.pow(revealProgress, 0.6);

          const previousOpacity = words[index]?.opacity ?? 0.2;

          if (direction >= 0) {
            opacity = Math.max(previousOpacity, opacity);
          }

          opacity = Math.max(0.15, Math.min(1, opacity));
          words[index] = { opacity };
        });

        words = [...words];
        lastScrollY = currentScrollY;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
</script>

<section class="about-section" bind:this={sectionElement}>
  <div class="content-shell">
    <div class="copy-block">
      <p class="text">
        {#each content as segment, index}
          <span
            class="word"
            class:bold={segment.bold}
            data-word={index}
            style="opacity: {words[index]?.opacity ??
              0.2}; color: {getWordColor(
              words[index]?.opacity ?? 0.2,
              segment.bold,
            )}"
          >
            {segment.text}
          </span>
        {/each}
      </p>
    </div>
  </div>
</section>

<style>
  :global(body) {
    --page-surface: #030207;
  }

  .about-section {
    position: relative;
    width: 100%;
    padding: clamp(4.5rem, 8vw, 6rem) 2vw clamp(1rem, 2vw, 1.5rem);
    background: transparent;
  }

  .content-shell {
    max-width: 1200px;
    margin: 0 auto;
  }

  .copy-block {
    position: relative;
    padding: clamp(2.75rem, 5vw, 4rem) clamp(2rem, 6vw, 4.5rem);
    z-index: 1;
  }

  .text {
    font-size: clamp(1.2rem, 2.2vw, 1.55rem);
    line-height: 1.85;
    letter-spacing: -0.012em;
    margin: 0;
    font-family: "Inter", "SF Pro Display", system-ui, -apple-system,
      BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    color: #f5f5f5;
    text-align: center;
  }

  :global(body.theme-light) .text {
    color: #0f172a;
  }

  .word {
    font-weight: 420;
    transition:
      opacity 0.5s ease-out,
      color 0.5s ease-out;
    display: inline;
  }

  .word.bold {
    font-weight: 690;
    letter-spacing: -0.022em;
  }

  @media (max-width: 768px) {
    .copy-block {
      padding: clamp(2.25rem, 7vw, 3.5rem) clamp(1.75rem, 7vw, 3rem);
    }

    .text {
      line-height: 1.75;
    }
  }

  @media (max-width: 480px) {
    .text {
      font-size: 1.05rem;
      line-height: 1.7;
    }
  }
</style>
