(function () {
  "use strict";

  // ─── palette (matches CSS vars) ───
  const BG = "#0d1410";
  const PHOSPHOR = "#4a6f56";
  const PHOSPHOR_BRIGHT = "#6b9077";
  const PHOSPHOR_FAINT = "rgba(74, 111, 86, 0.18)";
  const APPLE = "#d97a6a";
  const APPLE_GLOW = "rgba(217, 122, 106, 0.5)";
  const WALL = "#8c6d46";
  const WALL_GLOW = "rgba(140, 109, 70, 0.4)";

  // ─── config ───
  const SPEED_MAP = { slow: 190, normal: 130, fast: 85 };

  // ─── state ───
  let gridSize = 20;
  let startSpeedKey = "normal";
  let wallMode = "solid";
  let obstacleDensity = "few";

  let cellPx;      // pixels per cell
  let snake;       // array of {x,y}, head first
  let dir;         // {x,y}
  let queuedDir;   // buffered direction press
  let apple;       // {x,y}
  let obstacles;   // Set of "x,y"
  let score;
  let best = 0;
  let alive;
  let running;     // playing (not paused, not game-over, not pre-start)
  let started;     // has the current game been started
  let tickInterval;
  let currentSpeedMs;
  let speedTier;   // 1..N — grows every N apples

  const canvas = document.getElementById("board");
  const ctx = canvas.getContext("2d");

  // ─── init size ───
  function applyGridSize() {
    // Canvas stays fixed 560×560; cellPx derived from gridSize.
    cellPx = canvas.width / gridSize;
  }

  // ─── obstacles ───
  function generateObstacles() {
    obstacles = new Set();
    const counts = { none: 0, few: Math.floor(gridSize * 0.6), many: Math.floor(gridSize * 1.4) };
    const target = counts[obstacleDensity];

    // start with clear center for the snake
    const startY = Math.floor(gridSize / 2);
    const safe = new Set();
    for (let x = 0; x < 6; x++) safe.add(`${x},${startY}`);

    let tries = 0;
    while (obstacles.size < target && tries < target * 30) {
      tries++;
      const x = Math.floor(Math.random() * gridSize);
      const y = Math.floor(Math.random() * gridSize);
      const key = `${x},${y}`;
      if (safe.has(key)) continue;
      // don't place a wall directly adjacent to another wall too often - keep it feeling like broken bricks
      obstacles.add(key);
    }
  }

  // ─── reset / init game ───
  function initGame() {
    applyGridSize();
    generateObstacles();

    const midY = Math.floor(gridSize / 2);
    snake = [
      { x: 3, y: midY },
      { x: 2, y: midY },
      { x: 1, y: midY }
    ];
    dir = { x: 1, y: 0 };
    queuedDir = dir;
    score = 0;
    speedTier = 1;
    currentSpeedMs = SPEED_MAP[startSpeedKey];
    alive = true;
    placeApple();
    started = false;
    running = false;
    stopLoop();
    updateHUD();
    render();
    showStartOverlay();
  }

  function startGame() {
    if (!started) started = true;
    hideOverlay();
    running = true;
    updateHUD();
    stopLoop();
    tickInterval = setInterval(tick, currentSpeedMs);
  }
  function stopLoop() {
    if (tickInterval) { clearInterval(tickInterval); tickInterval = null; }
  }
  function pauseGame() {
    if (!started || !alive) return;
    if (running) {
      running = false;
      stopLoop();
      showPauseOverlay();
    } else {
      hideOverlay();
      running = true;
      stopLoop();
      tickInterval = setInterval(tick, currentSpeedMs);
    }
    updateHUD();
  }

  // ─── apple ───
  function placeApple() {
    const occupied = new Set();
    snake.forEach(s => occupied.add(`${s.x},${s.y}`));
    obstacles.forEach(o => occupied.add(o));
    const free = [];
    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        const key = `${x},${y}`;
        if (!occupied.has(key)) free.push({ x, y });
      }
    }
    if (free.length === 0) {
      apple = null;
      // full board = you win effectively
      alive = false;
      running = false;
      stopLoop();
      onDeath(true);
      return;
    }
    apple = free[Math.floor(Math.random() * free.length)];
  }

  // ─── one tick ───
  function tick() {
    // apply buffered direction (avoid instant 180)
    if (queuedDir.x !== -dir.x || queuedDir.y !== -dir.y) {
      dir = queuedDir;
    }
    const head = snake[0];
    let nx = head.x + dir.x;
    let ny = head.y + dir.y;

    // wall handling
    if (wallMode === "wrap") {
      if (nx < 0) nx = gridSize - 1;
      if (nx >= gridSize) nx = 0;
      if (ny < 0) ny = gridSize - 1;
      if (ny >= gridSize) ny = 0;
    } else {
      if (nx < 0 || nx >= gridSize || ny < 0 || ny >= gridSize) {
        return kill();
      }
    }
    const newKey = `${nx},${ny}`;
    if (obstacles.has(newKey)) return kill();
    // self collision — skip tail last cell since it will move (unless we're eating)
    const eating = apple && nx === apple.x && ny === apple.y;
    const checkBody = eating ? snake : snake.slice(0, -1);
    if (checkBody.some(s => s.x === nx && s.y === ny)) return kill();

    snake.unshift({ x: nx, y: ny });
    if (eating) {
      score++;
      // speed up every 5 apples
      if (score % 5 === 0) {
        speedTier++;
        currentSpeedMs = Math.max(50, Math.round(currentSpeedMs * 0.9));
        stopLoop();
        tickInterval = setInterval(tick, currentSpeedMs);
      }
      placeApple();
    } else {
      snake.pop();
    }
    updateHUD();
    render();
  }

  function kill() {
    alive = false;
    running = false;
    stopLoop();
    if (score > best) {
      best = score;
      try { localStorage.setItem("arcade.snake.best", String(best)); } catch (e) {}
    }
    updateHUD();
    render();
    onDeath(false);
  }

  // ─── rendering ───
  function render() {
    // clear
    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // subtle dot grid
    ctx.fillStyle = PHOSPHOR_FAINT;
    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        ctx.fillRect(x * cellPx + cellPx / 2 - 0.5, y * cellPx + cellPx / 2 - 0.5, 1, 1);
      }
    }

    // obstacles — amber "walls", like broken bricks
    ctx.shadowColor = WALL_GLOW;
    ctx.shadowBlur = 6;
    ctx.fillStyle = WALL;
    obstacles.forEach(key => {
      const [xStr, yStr] = key.split(",");
      const x = parseInt(xStr, 10);
      const y = parseInt(yStr, 10);
      ctx.fillRect(x * cellPx + 2, y * cellPx + 2, cellPx - 4, cellPx - 4);
    });
    ctx.shadowBlur = 0;

    // apple
    if (apple) {
      ctx.shadowColor = APPLE_GLOW;
      ctx.shadowBlur = 12;
      ctx.fillStyle = APPLE;
      ctx.beginPath();
      const cx = apple.x * cellPx + cellPx / 2;
      const cy = apple.y * cellPx + cellPx / 2;
      ctx.arc(cx, cy, cellPx * 0.36, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // snake
    ctx.shadowColor = "rgba(74, 111, 86, 0.4)";
    ctx.shadowBlur = 8;
    for (let i = snake.length - 1; i >= 0; i--) {
      const s = snake[i];
      const isHead = i === 0;
      ctx.fillStyle = isHead ? PHOSPHOR_BRIGHT : PHOSPHOR;
      // slight rounding on the head
      const pad = 2;
      if (isHead) {
        roundRect(s.x * cellPx + pad, s.y * cellPx + pad, cellPx - pad*2, cellPx - pad*2, 3);
        ctx.fill();
        // eye dot
        ctx.shadowBlur = 0;
        ctx.fillStyle = BG;
        const eyeSize = Math.max(1.5, cellPx * 0.11);
        const cx = s.x * cellPx + cellPx / 2 + dir.x * cellPx * 0.18;
        const cy = s.y * cellPx + cellPx / 2 + dir.y * cellPx * 0.18;
        ctx.beginPath();
        ctx.arc(cx, cy, eyeSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowColor = "rgba(74, 111, 86, 0.4)";
        ctx.shadowBlur = 8;
      } else {
        ctx.fillRect(s.x * cellPx + pad, s.y * cellPx + pad, cellPx - pad*2, cellPx - pad*2);
      }
    }
    ctx.shadowBlur = 0;
  }

  function roundRect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  // ─── HUD & overlay ───
  function updateHUD() {
    document.getElementById("hudScore").textContent = score;
    document.getElementById("hudLen").textContent = snake.length;
    document.getElementById("hudBest").textContent = best;
    document.getElementById("hudSpeed").textContent = speedTier + "×";
    document.getElementById("pauseBtn").textContent = running ? "⏸ pause" : "▶ resume";
    if (!started || !alive) document.getElementById("pauseBtn").textContent = "⏸ pause";
  }

  function showOverlayText(eyebrow, title, sub, btnText) {
    document.getElementById("overlayEyebrow").textContent = eyebrow;
    document.getElementById("overlayTitle").textContent = title;
    document.getElementById("overlaySub").textContent = sub;
    document.getElementById("overlayBtn").textContent = btnText;
    document.getElementById("overlay").classList.add("show");
  }
  function hideOverlay() {
    document.getElementById("overlay").classList.remove("show");
  }
  function showStartOverlay() {
    showOverlayText("press start", "serpent", "arrows or WASD to steer", "▷ start");
  }
  function showPauseOverlay() {
    showOverlayText("paused", "hold on", "press space or the button to resume", "▶ resume");
  }
  function onDeath(won) {
    if (won) {
      showOverlayText("board cleared", "you fill the field", "score: " + score + " · press start to play again", "▷ new game");
    } else {
      showOverlayText("game over", "you crashed", "score: " + score + " · best: " + best, "▷ new game");
    }
  }

  // ─── input ───
  document.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();
    if (key === "n") { initGame(); return; }
    if (e.key === " " || key === "p") {
      e.preventDefault();
      if (!started && alive) startGame();
      else if (!alive) initGame();
      else pauseGame();
      return;
    }

    let dx = 0, dy = 0;
    if (e.key === "ArrowUp" || key === "w")    { dx =  0; dy = -1; }
    else if (e.key === "ArrowDown" || key === "s")  { dx =  0; dy =  1; }
    else if (e.key === "ArrowLeft" || key === "a")  { dx = -1; dy =  0; }
    else if (e.key === "ArrowRight" || key === "d") { dx =  1; dy =  0; }
    else return;
    e.preventDefault();

    // buffer, but ignore direct reverse
    if (dx === -dir.x && dy === -dir.y) return;
    queuedDir = { x: dx, y: dy };

    // first arrow press starts the game if we're at pre-start
    if (!started && alive) startGame();
  });

  // touch: swipe support (simple)
  let touchStart = null;
  canvas.addEventListener("touchstart", (e) => {
    const t = e.touches[0];
    touchStart = { x: t.clientX, y: t.clientY };
  }, { passive: true });
  canvas.addEventListener("touchend", (e) => {
    if (!touchStart) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStart.x;
    const dy = t.clientY - touchStart.y;
    if (Math.abs(dx) < 20 && Math.abs(dy) < 20) {
      // tap — pause/start
      if (!started && alive) startGame();
      else if (!alive) initGame();
      else pauseGame();
      touchStart = null;
      return;
    }
    let ndx = 0, ndy = 0;
    if (Math.abs(dx) > Math.abs(dy)) ndx = dx > 0 ? 1 : -1;
    else ndy = dy > 0 ? 1 : -1;
    if (ndx === -dir.x && ndy === -dir.y) { touchStart = null; return; }
    queuedDir = { x: ndx, y: ndy };
    if (!started && alive) startGame();
    touchStart = null;
  }, { passive: true });

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
  wireSeg("sizeSeg", (v) => { gridSize = parseInt(v, 10); initGame(); });
  wireSeg("speedSeg", (v) => { startSpeedKey = v; initGame(); });
  wireSeg("wallSeg", (v) => { wallMode = v; initGame(); });
  wireSeg("obsSeg", (v) => { obstacleDensity = v; initGame(); });

  document.getElementById("newGameBtn").addEventListener("click", initGame);
  document.getElementById("overlayBtn").addEventListener("click", () => {
    if (!alive) initGame();
    else if (!started) startGame();
    else if (!running) { hideOverlay(); running = true; stopLoop(); tickInterval = setInterval(tick, currentSpeedMs); updateHUD(); }
  });
  document.getElementById("pauseBtn").addEventListener("click", pauseGame);

  // ─── restore best ───
  try {
    const b = localStorage.getItem("arcade.snake.best");
    if (b) best = parseInt(b, 10) || 0;
  } catch (e) {}

  // ─── init ───
  initGame();
})();
