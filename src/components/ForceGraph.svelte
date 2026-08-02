<script>
  import { onMount, afterUpdate } from "svelte";

  export let visible = false;

  let canvas;
  let cleanup;
  let triggerBloom; // function set by init(), called when visible flips

  const NODES = [
    { id: 'systems',   label: 'Systems',       type: 'core',    color: '#818cf8' },
    { id: 'backend',   label: 'Backend',        type: 'primary', color: '#818cf8' },
    { id: 'infra',     label: 'Infrastructure', type: 'primary', color: '#22d3ee' },
    { id: 'data',      label: 'Data',           type: 'primary', color: '#a78bfa' },
    { id: 'devops',    label: 'DevOps',         type: 'primary', color: '#fbbf24' },
    { id: 'apis',      label: 'APIs',           type: 'leaf',    color: '#818cf8' },
    { id: 'go',        label: 'Go',             type: 'leaf',    color: '#818cf8' },
    { id: 'k8s',       label: 'K8s',            type: 'leaf',    color: '#22d3ee' },
    { id: 'terraform', label: 'Terraform',      type: 'leaf',    color: '#22d3ee' },
    { id: 'docker',    label: 'Docker',         type: 'leaf',    color: '#22d3ee' },
    { id: 'kafka',     label: 'Kafka',          type: 'leaf',    color: '#a78bfa' },
    { id: 'python',    label: 'Python',         type: 'leaf',    color: '#a78bfa' },
    { id: 'cicd',      label: 'CI/CD',          type: 'leaf',    color: '#fbbf24' },
    { id: 'aws',       label: 'AWS',            type: 'leaf',    color: '#fbbf24' },
  ];

  const EDGES = [
    // Core ↔ Primary
    { source: 'systems', target: 'backend' },
    { source: 'systems', target: 'infra' },
    { source: 'systems', target: 'data' },
    { source: 'systems', target: 'devops' },
    // Primary cross-links
    { source: 'backend', target: 'infra' },
    { source: 'data',    target: 'devops' },
    { source: 'backend', target: 'data' },
    { source: 'infra',   target: 'devops' },
    // Primary → Leaf
    { source: 'backend', target: 'apis' },
    { source: 'backend', target: 'go' },
    { source: 'infra',   target: 'k8s' },
    { source: 'infra',   target: 'terraform' },
    { source: 'infra',   target: 'docker' },
    { source: 'data',    target: 'kafka' },
    { source: 'data',    target: 'python' },
    { source: 'devops',  target: 'cicd' },
    { source: 'devops',  target: 'aws' },
    { source: 'devops',  target: 'docker' },
    // Cross-leaf
    { source: 'k8s',    target: 'docker' },
    { source: 'cicd',   target: 'terraform' },
    { source: 'apis',   target: 'go' },
    { source: 'kafka',  target: 'python' },
    { source: 'aws',    target: 'terraform' },
    { source: 'aws',    target: 'k8s' },
  ];

  function hexToRgb(hex) {
    return [
      parseInt(hex.slice(1, 3), 16),
      parseInt(hex.slice(3, 5), 16),
      parseInt(hex.slice(5, 7), 16),
    ].join(', ');
  }

  function init() {
    if (!canvas) return;

    const container = canvas.parentElement;
    const dpr = window.devicePixelRatio || 1;
    let width, height, ctx;
    let nodes = [];
    let edges = [];
    let adjacency = {};
    let hoveredId = null;
    let dragId = null;
    let animId;

    // ── Bloom state ──
    let bloomProgress = 0;   // 0 = collapsed at center, 1 = fully expanded
    let bloomStartTime = 0;
    const BLOOM_DURATION = 1800; // ms
    let hasBloomedOnce = false;

    // ── Stars (space background) ──
    let stars = [];
    const STAR_COUNT = 45;
    function generateStars() {
      stars = [];
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 1.2 + 0.3,
          twinkleSpeed: Math.random() * 2 + 1,
          twinkleOffset: Math.random() * Math.PI * 2,
          baseAlpha: Math.random() * 0.25 + 0.08,
        });
      }
    }

    // ── Sizing ──
    function resize() {
      const rect = container.getBoundingClientRect();
      const oldW = width || rect.width;
      const oldH = height || rect.height;
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx = canvas.getContext('2d');
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (nodes.length && oldW) {
        nodes.forEach(n => { n.x *= width / oldW; n.y *= height / oldH; });
      }
    }

    resize();
    generateStars();

    // ── Build nodes ──
    const nodeMap = {};
    nodes = NODES.map((def, i) => {
      const angle = (i / NODES.length) * Math.PI * 2 - Math.PI / 2;
      const spread = def.type === 'core' ? 0 : def.type === 'primary' ? 80 : 140;
      const n = {
        ...def,
        x: width / 2 + Math.cos(angle) * spread + (Math.random() - 0.5) * 20,
        y: height / 2 + Math.sin(angle) * spread + (Math.random() - 0.5) * 20,
        vx: 0, vy: 0,
        radius: def.type === 'core' ? 8 : def.type === 'primary' ? 5 : 3,
      };
      nodeMap[n.id] = n;
      return n;
    });

    // ── Build edges ──
    edges = EDGES.map(e => ({ source: nodeMap[e.source], target: nodeMap[e.target] }));

    // ── Build adjacency map ──
    nodes.forEach(n => adjacency[n.id] = new Set());
    edges.forEach(e => {
      adjacency[e.source.id].add(e.target.id);
      adjacency[e.target.id].add(e.source.id);
    });

    // Warm up physics so the graph starts settled
    for (let i = 0; i < 80; i++) simulate();

    // ── Bloom trigger ──
    triggerBloom = () => {
      if (hasBloomedOnce) return;
      hasBloomedOnce = true;
      bloomProgress = 0;
      bloomStartTime = Date.now();
    };

    // ── Physics simulation ──
    function simulate() {
      const cx = width / 2, cy = height / 2;

      // Repulsion between all node pairs
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = b.x - a.x, dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const force = 1400 / (dist * dist);
          const fx = (dx / dist) * force, fy = (dy / dist) * force;
          a.vx -= fx; a.vy -= fy;
          b.vx += fx; b.vy += fy;
        }
      }

      // Spring attraction along edges
      for (const { source: s, target: t } of edges) {
        const dx = t.x - s.x, dy = t.y - s.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const rest = (s.type === 'core' || t.type === 'core') ? 90
                   : (s.type === 'primary' && t.type === 'primary') ? 80 : 65;
        const force = (dist - rest) * 0.005;
        const fx = (dx / dist) * force, fy = (dy / dist) * force;
        s.vx += fx; s.vy += fy;
        t.vx -= fx; t.vy -= fy;
      }

      // Center gravity
      for (const n of nodes) {
        const g = n.type === 'core' ? 0.02 : 0.004;
        n.vx += (cx - n.x) * g;
        n.vy += (cy - n.y) * g;
      }

      // Integrate velocity with damping
      for (const n of nodes) {
        if (n.id === dragId) continue;
        n.vx *= 0.86;
        n.vy *= 0.86;
        n.x += n.vx;
        n.y += n.vy;
        const pad = 25;
        n.x = Math.max(pad, Math.min(width - pad, n.x));
        n.y = Math.max(pad, Math.min(height - pad, n.y));
      }
    }

    // ── Canvas rendering ──
    function draw() {
      ctx.clearRect(0, 0, width, height);

      // ── Update bloom progress ──
      if (bloomStartTime > 0 && bloomProgress < 1) {
        bloomProgress = Math.min(1, (Date.now() - bloomStartTime) / BLOOM_DURATION);
      }
      // Eased bloom (cubic ease-out)
      const bp = 1 - Math.pow(1 - bloomProgress, 3);

      const hov = hoveredId;
      const conn = hov ? adjacency[hov] : null;
      const time = Date.now() * 0.002;
      const cx = width / 2, cy = height / 2;

      // ── Draw space background ──
      // Subtle nebula glow
      const nebulaGrad = ctx.createRadialGradient(cx * 0.6, cy * 0.4, 0, cx * 0.6, cy * 0.4, width * 0.5);
      nebulaGrad.addColorStop(0, `rgba(99, 102, 241, ${0.02 * bp})`);
      nebulaGrad.addColorStop(0.5, `rgba(139, 92, 246, ${0.01 * bp})`);
      nebulaGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = nebulaGrad;
      ctx.fillRect(0, 0, width, height);

      const nebulaGrad2 = ctx.createRadialGradient(cx * 1.4, cy * 1.3, 0, cx * 1.4, cy * 1.3, width * 0.4);
      nebulaGrad2.addColorStop(0, `rgba(6, 182, 212, ${0.015 * bp})`);
      nebulaGrad2.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = nebulaGrad2;
      ctx.fillRect(0, 0, width, height);

      // Stars
      for (const s of stars) {
        const twinkle = Math.sin(time * s.twinkleSpeed + s.twinkleOffset) * 0.5 + 0.5;
        const alpha = s.baseAlpha * (0.5 + twinkle * 0.5) * bp;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
      }

      // Draw edges
      for (const { source: s, target: t } of edges) {
        const isLit = hov && (s.id === hov || t.id === hov);
        const isDim = hov && !isLit;

        // Bloom-interpolated positions
        const sx = cx + (s.x - cx) * bp;
        const sy = cy + (s.y - cy) * bp;
        const tx = cx + (t.x - cx) * bp;
        const ty = cy + (t.y - cy) * bp;

        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(tx, ty);

        if (isLit) {
          ctx.strokeStyle = `rgba(${hexToRgb(s.color)}, 0.55)`;
          ctx.lineWidth = 1.5;
          ctx.shadowColor = s.color;
          ctx.shadowBlur = 10;
        } else if (isDim) {
          ctx.strokeStyle = 'rgba(139, 148, 168, 0.04)';
          ctx.lineWidth = 0.5;
          ctx.shadowBlur = 0;
        } else {
          ctx.strokeStyle = 'rgba(139, 148, 168, 0.12)';
          ctx.lineWidth = 0.8;
          ctx.shadowBlur = 0;
        }

        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // Draw nodes
      for (const n of nodes) {
        const isHov = n.id === hov;
        const isCon = conn && conn.has(n.id);
        const isDim = hov && !isHov && !isCon;
        const pulse = n.type === 'core' ? (Math.sin(time) * 0.12 + 1) : 1;
        const r = (isHov ? n.radius * 1.6 : isCon ? n.radius * 1.25 : n.radius) * pulse;
        const a = isDim ? 0.18 : bp;

        // Bloom-interpolated position
        const nx = cx + (n.x - cx) * bp;
        const ny = cy + (n.y - cy) * bp;

        // Outer glow
        if (!isDim) {
          ctx.beginPath();
          const glowR = r * 3.5;
          ctx.arc(nx, ny, glowR, 0, Math.PI * 2);
          const glow = ctx.createRadialGradient(nx, ny, 0, nx, ny, glowR);
          const glowA = (isHov ? 0.3 : n.type === 'core' ? (0.1 + Math.sin(time) * 0.04) : 0.08) * bp;
          glow.addColorStop(0, `rgba(${hexToRgb(n.color)}, ${glowA})`);
          glow.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = glow;
          ctx.fill();
        }

        // Node circle
        ctx.beginPath();
        ctx.arc(nx, ny, r * bp, 0, Math.PI * 2);
        const grad = ctx.createRadialGradient(nx - r * 0.3, ny - r * 0.3, 0, nx, ny, r);
        grad.addColorStop(0, `rgba(255,255,255,${0.9 * a})`);
        grad.addColorStop(1, `rgba(${hexToRgb(n.color)},${a})`);
        ctx.fillStyle = grad;
        ctx.fill();

        // Label
        const showLabel = n.type !== 'leaf' || isHov || isCon;
        if (showLabel && bp > 0.3) {
          const labelFade = Math.min(1, (bp - 0.3) / 0.7); // labels fade in after 30% bloom
          const la = (isDim ? 0.12 : isHov ? 0.95
            : n.type === 'core' ? 0.7 : n.type === 'primary' ? 0.5 : 0.38) * labelFade;
          ctx.font = n.type === 'core'
            ? '600 11px "SF Pro Display","Inter",sans-serif'
            : n.type === 'primary'
            ? '500 10px "SF Pro Display","Inter",sans-serif'
            : '400 9px "SF Pro Display","Inter",sans-serif';
          ctx.fillStyle = `rgba(255,255,255,${la})`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'top';
          ctx.fillText(n.label, nx, ny + r + 6);
        }
      }
    }

    // ── Animation loop ──
    function tick() {
      simulate();
      draw();
      animId = requestAnimationFrame(tick);
    }

    // ── Mouse interaction ──
    function nodeAt(mx, my) {
      const bp2 = 1 - Math.pow(1 - bloomProgress, 3);
      const ccx = width / 2, ccy = height / 2;
      for (let i = nodes.length - 1; i >= 0; i--) {
        const n = nodes[i];
        const nx = ccx + (n.x - ccx) * bp2;
        const ny = ccy + (n.y - ccy) * bp2;
        const dx = mx - nx, dy = my - ny;
        const hr = Math.max(n.radius * 2.5, 14);
        if (dx * dx + dy * dy < hr * hr) return n;
      }
      return null;
    }

    function mpos(e) {
      const r = canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    }

    function onMove(e) {
      const p = mpos(e);
      if (dragId) {
        const nd = nodes.find(n => n.id === dragId);
        if (nd) { nd.x = p.x; nd.y = p.y; nd.vx = 0; nd.vy = 0; }
        return;
      }
      const hit = nodeAt(p.x, p.y);
      hoveredId = hit ? hit.id : null;
      canvas.style.cursor = hit ? 'grab' : 'default';
    }

    function onDown(e) {
      const p = mpos(e);
      const hit = nodeAt(p.x, p.y);
      if (hit) { dragId = hit.id; canvas.style.cursor = 'grabbing'; }
    }

    function onUp() {
      if (dragId) {
        const nd = nodes.find(n => n.id === dragId);
        if (nd) { nd.vx = (Math.random() - 0.5) * 1.5; nd.vy = (Math.random() - 0.5) * 1.5; }
      }
      dragId = null;
      canvas.style.cursor = hoveredId ? 'grab' : 'default';
    }

    function onLeave() {
      hoveredId = null;
      dragId = null;
      canvas.style.cursor = 'default';
    }

    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mousedown', onDown);
    canvas.addEventListener('mouseup', onUp);
    canvas.addEventListener('mouseleave', onLeave);

    const ro = new ResizeObserver(() => { resize(); generateStars(); });
    ro.observe(container);

    tick();

    // Return cleanup function
    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mousedown', onDown);
      canvas.removeEventListener('mouseup', onUp);
      canvas.removeEventListener('mouseleave', onLeave);
      ro.disconnect();
    };
  }

  onMount(() => {
    cleanup = init();
    return () => { if (cleanup) cleanup(); };
  });

  // Watch for visible prop change to trigger bloom
  $: if (visible && triggerBloom) triggerBloom();
</script>

<canvas class="force-graph" bind:this={canvas}></canvas>

<style>
  .force-graph {
    width: 100%;
    height: 100%;
    min-height: 420px;
    display: block;
    border-radius: 16px;
  }
</style>
