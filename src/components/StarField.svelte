<script>
  import { onMount, onDestroy } from "svelte";

  let canvas;
  let ctx;
  let stars = [];
  let shootingStars = [];
  const numStars = 200;
  let animationId;

  function resizeCanvas() {
    if (!canvas) return;
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
    initStars();
  }

  function initStars() {
    stars = Array.from({ length: numStars }, () => ({
      angle: Math.random() * Math.PI * 2,
      radius: Math.random() * Math.sqrt(canvas.width ** 2 + canvas.height ** 2),
      speed: Math.random() * 0.0002 + 0.0001,
      size: Math.random() * 1 + 0.3,
    }));
  }

  function spawnShootingStar() {
    if (shootingStars.length === 0 && Math.random() < 0.005) {
      shootingStars.push({
        x: Math.random() * canvas.width * 0.5,
        y: Math.random() * canvas.height * 0.4,
        vx: 2.5 + Math.random() * 1.5,
        vy: 0.8 + Math.random() * 1,
        life: 100,
        initialLife: 100,
      });
    }
  }

  function animate() {
    if (!ctx || !canvas) return;

    const centerX = canvas.width;
    const centerY = canvas.height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Stars orbiting
    stars.forEach((star, i) => {
      star.angle += star.speed;
      const x = centerX + star.radius * Math.cos(star.angle);
      const y = centerY + star.radius * Math.sin(star.angle);

      const flicker = 0.2 + Math.abs(Math.sin(Date.now() * 0.001 + i)) * 0.4;

      ctx.beginPath();
      ctx.fillStyle = `rgba(255, 255, 255, ${flicker})`;
      ctx.arc(x, y, star.size, 0, Math.PI * 2);
      ctx.fill();
    });

    // Shooting stars
    spawnShootingStar();
    for (let i = shootingStars.length - 1; i >= 0; i--) {
      const s = shootingStars[i];
      const opacity = s.life / s.initialLife;

      const grad = ctx.createLinearGradient(
        s.x,
        s.y,
        s.x - s.vx * 35,
        s.y - s.vy * 35,
      );
      grad.addColorStop(0, `rgba(255, 255, 255, ${opacity * 0.8})`);
      grad.addColorStop(1, `rgba(255, 255, 255, 0)`);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(s.x - s.vx * 20, s.y - s.vy * 20);
      ctx.stroke();

      s.x += s.vx;
      s.y += s.vy;
      s.life -= 1;

      if (s.life <= 0) {
        shootingStars.splice(i, 1);
      }
    }

    animationId = requestAnimationFrame(animate);
  }

  onMount(() => {
    ctx = canvas.getContext("2d");
    resizeCanvas();
    animate();
    window.addEventListener("resize", resizeCanvas);
  });

  onDestroy(() => {
    cancelAnimationFrame(animationId);
    window.removeEventListener("resize", resizeCanvas);
  });
</script>

<canvas bind:this={canvas} class="starfield-canvas"></canvas>

<style>
  .starfield-canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    display: block;
    pointer-events: none;
    z-index: 0;
  }
</style>
