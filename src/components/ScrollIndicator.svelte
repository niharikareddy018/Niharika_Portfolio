<script>
  import { onMount } from 'svelte';

  function scrollDown() {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  }
</script>

<div class="scroll-indicator" on:click={scrollDown} on:keydown={(e) => e.key === 'Enter' && scrollDown()} role="button" tabindex="0">
  <svg class="chevron" viewBox="0 0 20 10" width="20" height="10">
    <path d="M1,1 L10,9 L19,1" fill="none" stroke="currentColor" stroke-width="3.3" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</div>

<style>
  .scroll-indicator {
    position: fixed;
    bottom: 0.6rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 100;
    cursor: pointer;
    padding: 10px;
  }

  .chevron {
    color: rgba(255, 255, 255, 0.6);
    animation: subtle-bounce 3s ease-in-out infinite;
  }

  @keyframes subtle-bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(5px);
    }
  }

  @media (max-width: 768px) {
    .scroll-indicator {
      bottom: 1rem;
      padding: 8px;
    }

    .chevron {
      width: 18px;
      height: 9px;
    }
  }

  @media (max-width: 480px) {
    .scroll-indicator {
      bottom: 1.5rem;
      padding: 6px;
    }

    .chevron {
      width: 16px;
      height: 8px;
    }
  }
</style>
