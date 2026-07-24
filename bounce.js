(function () {
  "use strict";

  // ─── palette ───
  const BG = "#0d1410";
  const PHOSPHOR = "#4a6f56";
  const PHOSPHOR_BRIGHT = "#6b9077";
  const PHOSPHOR_FAINT = "rgba(74, 111, 86, 0.14)";
  const BALL = "#c4a87e";
  const BALL_BRIGHT = "#d9b47a";
  const BALL_GLOW = "rgba(196, 168, 126, 0.5)";
  const OBSTACLE = "#8c6d46";
  const OBSTACLE_GLOW = "rgba(140, 109, 70, 0.35)";
  const POCKET = "#d97a6a";
  const POCKET_GLOW = "rgba(217, 122, 106, 0.5)";
  const AIM = "rgba(196, 168, 126, 0.5)";

  // ─── canvas ───
  const canvas = document.getElementById("board");
  const ctx = canvas.getContext("2d");
  const W = canvas.width;
  const H = canvas.height;

  // ─── config (mutable via controls) ───
  let obsCount = 10;
  let restitution = 0.86;
  let gravity = 120;             // pixels / sec^2
  let shapeMode = "mix";         // "mix" | "poly" | "circle"

  // ─── state ───
  let obstacles = [];            // {type, ...}
  let launcher = { x: 50, y: 240, r: 14 };
  let pocket = { x: 590, y: 240, r: 26 };
  let ball = null;               // {x,y,vx,vy,r,alive,bounces}
  let aim = null;                // {x,y}
  let stats = { round: 1, shots: 0, landed: 0, bounces: 0 };
  let running = true;

  // ─── procedural field generation ───
  function generateField() {
    obstacles = [];
    launcher = { x: 50, y: 80 + Math.random() * (H - 160), r: 14 };
    pocket = { x: W - 60, y: 80 + Math.random() * (H - 160), r: 26 };

    const attempts = obsCount * 30;
    let placed = 0;
    let tries = 0;
    while (placed < obsCount && tries < attempts) {
      tries++;
      const cx = 140 + Math.random() * (W - 260);
      const cy = 40 + Math.random() * (H - 80);

      // pick shape kind based on shapeMode
      let kind;
      if (shapeMode === "circle") kind = "circle";
      else if (shapeMode === "poly") kind = "poly";
      else kind = Math.random() < 0.45 ? "circle" : "poly";

      let obs;
      if (kind === "circle") {
        const r = 14 + Math.random() * 22;
        obs = { type: "circle", x: cx, y: cy, r };
      } else {
        // polygon: random regular-ish polygon (triangle to hexagon)
        const sides = 3 + Math.floor(Math.random() * 4);
        const baseR = 18 + Math.random() * 26;
        const rot = Math.random() * Math.PI * 2;
        const pts = [];
        for (let i = 0; i < sides; i++) {
          const a = rot + (i / sides) * Math.PI * 2;
          const jitter = 0.7 + Math.random() * 0.6;
          pts.push({ x: cx + Math.cos(a) * baseR * jitter, y: cy + Math.sin(a) * baseR * jitter });
        }
        obs = { type: "poly", pts, bbox: bbox(pts), cx, cy };
      }

      // don't overlap the launcher or pocket
      if (distSq(cx, cy, launcher.x, launcher.y) < (80 * 80)) continue;
      if (distSq(cx, cy, pocket.x, pocket.y) < (80 * 80)) continue;

      // don't overlap other obstacles too much
      let overlap = false;
      for (const o of obstacles) {
        const ox = o.type === "circle" ? o.x : o.cx;
        const oy = o.type === "circle" ? o.y : o.cy;
        if (distSq(cx, cy, ox, oy) < 60 * 60) { overlap = true; break; }
      }
      if (overlap) continue;

      obstacles.push(obs);
      placed++;
    }

    ball = null;
    aim = null;
  }

  function bbox(pts) {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const p of pts) {
      if (p.x < minX) minX = p.x;
      if (p.y < minY) minY = p.y;
      if (p.x > maxX) maxX = p.x;
      if (p.y > maxY) maxY = p.y;
    }
    return { minX, minY, maxX, maxY };
  }
  function distSq(ax, ay, bx, by) {
    const dx = ax - bx, dy = ay - by;
    return dx * dx + dy * dy;
  }

  // ─── physics ───
  function launch(tx, ty) {
    if (ball && ball.alive) return; // wait
    const dx = tx - launcher.x, dy = ty - launcher.y;
    const len = Math.hypot(dx, dy) || 1;
    const speed = 460;
    ball = {
      x: launcher.x, y: launcher.y,
      vx: (dx / len) * speed, vy: (dy / len) * speed,
      r: 7, alive: true, bounces: 0, trail: []
    };
    stats.shots++;
    updateHUD();
  }

  function reflect(vx, vy, nx, ny) {
    const dot = vx * nx + vy * ny;
    return { x: vx - 2 * dot * nx, y: vy - 2 * dot * ny };
  }

  function step(dt) {
    if (!ball || !ball.alive) return;

    // multi-step for stability at high speed
    const substeps = 4;
    const sdt = dt / substeps;
    for (let s = 0; s < substeps; s++) {
      // apply gravity
      ball.vy += gravity * sdt;

      // integrate
      let nx = ball.x + ball.vx * sdt;
      let ny = ball.y + ball.vy * sdt;

      // walls
      if (nx - ball.r < 0) {
        nx = ball.r;
        ball.vx = -ball.vx * restitution;
        ball.bounces++;
      } else if (nx + ball.r > W) {
        nx = W - ball.r;
        ball.vx = -ball.vx * restitution;
        ball.bounces++;
      }
      if (ny - ball.r < 0) {
        ny = ball.r;
        ball.vy = -ball.vy * restitution;
        ball.bounces++;
      } else if (ny + ball.r > H) {
        ny = H - ball.r;
        ball.vy = -ball.vy * restitution;
        ball.bounces++;
      }

      ball.x = nx;
      ball.y = ny;

      // obstacle collisions
      for (const o of obstacles) {
        if (o.type === "circle") {
          const dx = ball.x - o.x, dy = ball.y - o.y;
          const d = Math.hypot(dx, dy);
          const rSum = ball.r + o.r;
          if (d < rSum && d > 0.0001) {
            const nx2 = dx / d, ny2 = dy / d;
            // push out
            ball.x = o.x + nx2 * rSum;
            ball.y = o.y + ny2 * rSum;
            const rr = reflect(ball.vx, ball.vy, nx2, ny2);
            ball.vx = rr.x * restitution;
            ball.vy = rr.y * restitution;
            ball.bounces++;
          }
        } else {
          // polygon: check each edge
          const pts = o.pts;
          let hit = false, hitNx = 0, hitNy = 0, minPen = Infinity, hitCp = null;
          for (let i = 0; i < pts.length; i++) {
            const a = pts[i], b = pts[(i + 1) % pts.length];
            const cp = closestOnSegment(a.x, a.y, b.x, b.y, ball.x, ball.y);
            const dx = ball.x - cp.x, dy = ball.y - cp.y;
            const d = Math.hypot(dx, dy);
            if (d < ball.r) {
              // outward normal along cp -> ball
              let nx2, ny2;
              if (d < 0.0001) {
                // fallback: use edge normal
                const ex = b.x - a.x, ey = b.y - a.y;
                const eLen = Math.hypot(ex, ey) || 1;
                nx2 = -ey / eLen; ny2 = ex / eLen;
                // orient outward via poly center
                const toBall = { x: ball.x - o.cx, y: ball.y - o.cy };
                if (nx2 * toBall.x + ny2 * toBall.y < 0) { nx2 = -nx2; ny2 = -ny2; }
              } else {
                nx2 = dx / d; ny2 = dy / d;
              }
              const pen = ball.r - d;
              if (pen < minPen) {
                minPen = pen;
                hit = true;
                hitNx = nx2; hitNy = ny2;
                hitCp = cp;
              }
            }
          }
          if (hit) {
            ball.x += hitNx * minPen;
            ball.y += hitNy * minPen;
            const rr = reflect(ball.vx, ball.vy, hitNx, hitNy);
            ball.vx = rr.x * restitution;
            ball.vy = rr.y * restitution;
            ball.bounces++;
          }
        }
      }

      // pocket check
      if (distSq(ball.x, ball.y, pocket.x, pocket.y) < pocket.r * pocket.r) {
        ball.alive = false;
        stats.landed++;
        stats.bounces += ball.bounces;
        stats.round++;
        updateHUD();
        // brief celebratory pause, then a new field
        setTimeout(() => { generateField(); }, 650);
        return;
      }

      // dead if too slow AND at rest at bottom
      const speed2 = ball.vx * ball.vx + ball.vy * ball.vy;
      if (speed2 < 15 * 15 && ball.y > H - ball.r - 2) {
        ball.alive = false;
        stats.bounces += ball.bounces;
        updateHUD();
        return;
      }
    }

    // trail
    ball.trail.push({ x: ball.x, y: ball.y });
    if (ball.trail.length > 40) ball.trail.shift();
  }

  function closestOnSegment(ax, ay, bx, by, px, py) {
    const abx = bx - ax, aby = by - ay;
    const denom = abx * abx + aby * aby || 1;
    const t = ((px - ax) * abx + (py - ay) * aby) / denom;
    const tc = Math.max(0, Math.min(1, t));
    return { x: ax + abx * tc, y: ay + aby * tc };
  }

  // ─── rendering ───
  function render() {
    // BG
    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, W, H);

    // dot grid
    ctx.fillStyle = PHOSPHOR_FAINT;
    const gap = 20;
    for (let x = gap; x < W; x += gap) {
      for (let y = gap; y < H; y += gap) {
        ctx.fillRect(x, y, 1, 1);
      }
    }

    // obstacles
    ctx.shadowColor = OBSTACLE_GLOW;
    ctx.shadowBlur = 8;
    for (const o of obstacles) {
      ctx.fillStyle = OBSTACLE;
      ctx.strokeStyle = OBSTACLE;
      ctx.lineWidth = 1.5;
      if (o.type === "circle") {
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.moveTo(o.pts[0].x, o.pts[0].y);
        for (let i = 1; i < o.pts.length; i++) ctx.lineTo(o.pts[i].x, o.pts[i].y);
        ctx.closePath();
        ctx.fill();
      }
    }
    ctx.shadowBlur = 0;

    // pocket (glowing amber ring)
    ctx.strokeStyle = POCKET;
    ctx.shadowColor = POCKET_GLOW;
    ctx.shadowBlur = 14;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(pocket.x, pocket.y, pocket.r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(pocket.x, pocket.y, pocket.r - 6, 0, Math.PI * 2);
    ctx.stroke();
    // center dot
    ctx.fillStyle = POCKET;
    ctx.beginPath();
    ctx.arc(pocket.x, pocket.y, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // launcher
    ctx.strokeStyle = PHOSPHOR;
    ctx.shadowColor = "rgba(74, 111, 86, 0.4)";
    ctx.shadowBlur = 10;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(launcher.x, launcher.y, launcher.r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = PHOSPHOR;
    ctx.beginPath();
    ctx.arc(launcher.x, launcher.y, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // aim line
    if (aim && (!ball || !ball.alive)) {
      const dx = aim.x - launcher.x, dy = aim.y - launcher.y;
      const len = Math.hypot(dx, dy) || 1;
      const ux = dx / len, uy = dy / len;
      ctx.strokeStyle = AIM;
      ctx.setLineDash([5, 5]);
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(launcher.x + ux * (launcher.r + 3), launcher.y + uy * (launcher.r + 3));
      ctx.lineTo(launcher.x + ux * 100, launcher.y + uy * 100);
      ctx.stroke();
      ctx.setLineDash([]);
      // arrow head
      const ex = launcher.x + ux * 100, ey = launcher.y + uy * 100;
      const perpX = -uy, perpY = ux;
      ctx.beginPath();
      ctx.moveTo(ex, ey);
      ctx.lineTo(ex - ux * 10 + perpX * 5, ey - uy * 10 + perpY * 5);
      ctx.lineTo(ex - ux * 10 - perpX * 5, ey - uy * 10 - perpY * 5);
      ctx.closePath();
      ctx.fillStyle = AIM;
      ctx.fill();
    }

    // ball trail
    if (ball && ball.trail.length > 1) {
      ctx.strokeStyle = "rgba(196, 168, 126, 0.35)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let i = 0; i < ball.trail.length; i++) {
        const p = ball.trail[i];
        if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
    }

    // ball
    if (ball) {
      ctx.fillStyle = ball.alive ? BALL_BRIGHT : "rgba(196, 168, 126, 0.4)";
      ctx.shadowColor = BALL_GLOW;
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  // ─── HUD ───
  function updateHUD() {
    document.getElementById("hudRound").textContent = stats.round;
    document.getElementById("hudShots").textContent = stats.shots;
    document.getElementById("hudLanded").textContent = stats.landed;
    const totalBounces = stats.bounces + (ball && ball.alive ? ball.bounces : 0);
    document.getElementById("hudBounces").textContent = totalBounces;
  }

  function hideOverlay() { document.getElementById("overlay").classList.remove("show"); }

  // ─── input ───
  canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    aim = {
      x: ((e.clientX - rect.left) / rect.width) * W,
      y: ((e.clientY - rect.top) / rect.height) * H
    };
  });
  canvas.addEventListener("mouseleave", () => { aim = null; });
  canvas.addEventListener("click", (e) => {
    hideOverlay();
    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * W;
    const y = ((e.clientY - rect.top) / rect.height) * H;
    launch(x, y);
  });
  // touch
  canvas.addEventListener("touchstart", (e) => {
    e.preventDefault();
    const t = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    const x = ((t.clientX - rect.left) / rect.width) * W;
    const y = ((t.clientY - rect.top) / rect.height) * H;
    aim = { x, y };
    hideOverlay();
    launch(x, y);
  }, { passive: false });

  document.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();
    if (key === "n") { generateField(); resetStats(); updateHUD(); return; }
    if (key === "r") { resetStats(); updateHUD(); return; }
    if (e.key === " ") { e.preventDefault(); if (ball) { ball.alive = false; } return; }
  });

  // ─── controls wiring ───
  function wireSeg(id, onChange) {
    const seg = document.getElementById(id);
    seg.querySelectorAll("button").forEach(btn => {
      btn.addEventListener("click", () => {
        seg.querySelectorAll("button").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        onChange(btn.dataset.value);
      });
    });
  }
  wireSeg("gravSeg", (v) => { gravity = parseFloat(v); });
  wireSeg("shapeSeg", (v) => { shapeMode = v; generateField(); });

  const obsSlider = document.getElementById("obsCountSlider");
  obsSlider.addEventListener("input", (e) => {
    obsCount = parseInt(e.target.value, 10);
    document.getElementById("obsCountVal").textContent = obsCount;
  });
  obsSlider.addEventListener("change", () => generateField());

  const restSlider = document.getElementById("restSlider");
  restSlider.addEventListener("input", (e) => {
    restitution = parseFloat(e.target.value);
    document.getElementById("restVal").textContent = restitution.toFixed(2);
  });

  document.getElementById("newFieldBtn").addEventListener("click", () => {
    generateField(); updateHUD(); hideOverlay();
  });
  document.getElementById("overlayBtn").addEventListener("click", () => {
    generateField(); resetStats(); updateHUD(); hideOverlay();
  });
  document.getElementById("resetStatsBtn").addEventListener("click", () => {
    resetStats(); updateHUD();
  });

  function resetStats() {
    stats = { round: 1, shots: 0, landed: 0, bounces: 0 };
  }

  // ─── main loop ───
  let lastT = 0;
  function loop(t) {
    if (!lastT) lastT = t;
    const dt = Math.min(0.04, (t - lastT) / 1000);
    lastT = t;
    if (running) step(dt);
    render();
    requestAnimationFrame(loop);
  }

  // ─── init ───
  generateField();
  updateHUD();
  requestAnimationFrame(loop);
})();
