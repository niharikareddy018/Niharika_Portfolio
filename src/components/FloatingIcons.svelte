<script>
  const icons = [
    { class: 'fa-solid fa-code', delay: 0 },         // Code symbol
    { class: 'fa-solid fa-terminal', delay: 0.5 },   // Terminal
    { class: 'fa-brands fa-linux', delay: 1 },    // Microchip
    { class: 'fa-solid fa-server', delay: 1.5 },     // Server
    { class: 'fa-solid fa-cloud', delay: 2 },        // Cloud
    { class: 'fa-brands fa-docker', delay: 2.5 },     // Rocket
    { class: 'fa-brands fa-aws', delay: 3 },        // Brain/AI
    { class: 'fa-solid fa-network-wired', delay: 3.5 }, // Network
    { class: 'fa-solid fa-shield-halved', delay: 4 }, // Security
    { class: 'fa-solid fa-gear', delay: 4.5 }        // Settings/Config
  ];
</script>

<div class="floating-container">
  {#each icons as icon, i}
    <i class={`floating-icon ${icon.class} icon-${i+1}`} style={`--delay: ${icon.delay}s; --position: ${i}`}></i>
  {/each}
</div>

<style>
  .floating-container {
    position: absolute;
    width: 400px;
    height: 400px;
    pointer-events: none;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
  }

  .floating-icon {
    position: absolute;
    font-size: 1.8rem;
    color: rgba(255, 255, 255, 0.15);
    animation: float 12s ease-in-out infinite;
    animation-delay: var(--delay);
    z-index: 1;
  }

  /* Updated positions for more icons */
  .floating-icon:nth-child(1) { top: 0%; left: 20%; }
  .floating-icon:nth-child(2) { top: 75%; left: 15%; }
  .floating-icon:nth-child(3) { top: 15%; right: 5%; }
  .floating-icon:nth-child(4) { top: 80%; right: 15%; }
  .floating-icon:nth-child(5) { top: 40%; left: -5%; }
  .floating-icon:nth-child(6) { top: 35%; right: -10%; }
  .floating-icon:nth-child(7) { top: 50%; right: 25%; }
  .floating-icon:nth-child(8) { top: 20%; left: 40%; }
  .floating-icon:nth-child(9) { top: 60%; right: 40%; }
  .floating-icon:nth-child(10) { top: 45%; left: 30%; }

  /* Custom animations for each icon */
  .icon-1 { animation: float1 15s ease-in-out infinite; }
  .icon-2 { animation: float2 14s ease-in-out infinite; }
  .icon-3 { animation: float3 16s ease-in-out infinite; }
  .icon-4 { animation: float4 13s ease-in-out infinite; }
  .icon-5 { animation: float5 17s ease-in-out infinite; }

  @keyframes float2 {
    0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.3; }
    50% { transform: translateY(-10px) rotate(-8deg); opacity: 0.5; }
  }

  @keyframes float3 {
    0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.3; }
    50% { transform: translateY(-6px) rotate(3deg); opacity: 0.5; }
  }

  @keyframes float4 {
    0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.3; }
    50% { transform: translateY(-9px) rotate(-5deg); opacity: 0.5; }
  }

  @keyframes float5 {
    0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.3; }
    50% { transform: translateY(-7px) rotate(6deg); opacity: 0.5; }
  }

  @keyframes float6 {
    0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.3; }
    50% { transform: translateY(-8px) rotate(-4deg); opacity: 0.5; }
  }

  @keyframes float7 {
    0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.3; }
    50% { transform: translateY(-8px) rotate(7deg); opacity: 0.5; }
  }

  @media (max-width: 768px) {
    .floating-icon {
      display: none;
    }
  }
</style>
