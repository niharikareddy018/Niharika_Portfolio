<script>
  import { onMount } from 'svelte';
  
  let visible = false;
  
  onMount(() => {
    window.addEventListener('scroll', () => {
      visible = window.pageYOffset > 300;
    });
  });

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
</script>

<button 
  class="scroll-top" 
  class:visible
  on:click={scrollToTop}
  aria-label="Scroll to top"
>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
  </svg>
</button>

<style>
  .scroll-top {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background: rgba(0, 157, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 2px solid rgba(0, 157, 255, 0.2);
    border-radius: 50%;
    width: 3.5rem;
    height: 3.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    opacity: 0;
    visibility: hidden;
    transform: translateY(20px);
    z-index: 1000;
    outline: none; 
  }

  .scroll-top.visible {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .scroll-top:hover {
    background: rgba(0, 157, 255, 0.2);
    border-color: rgba(0, 157, 255, 0.4);
    transform: translateY(-5px);
    box-shadow: 
      0 0 20px rgba(0, 157, 255, 0.3),
      0 0 40px rgba(0, 157, 255, 0.2);
  }

  .scroll-top svg {
    width: 1.5rem;
    height: 1.5rem;
    stroke: #009dff;
    transition: transform 0.3s ease;
  }

  .scroll-top:hover svg {
    transform: scale(1.2);
  }
</style>
