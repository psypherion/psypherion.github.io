(function () {
  "use strict";

  // ─── palette ───
  const PAPER = "#f4f0e8";
  const PHOSPHOR = "#4a6f56";
  const PHOSPHOR_DIM = "rgba(74, 111, 86, 0.35)";
  const AMBER = "#c4a87e";
  const AMBER_BRIGHT = "#d9b47a";
  const AMBER_DIM = "rgba(140, 109, 70, 0.4)";
  const RED = "#d97a6a";

  // ─── state ───
  let mode = "cpu";          // "cpu" | "hotseat"
  let difficulty = "medium"; // "easy" | "medium" | "hard"
  let playerSide = "X";      // "X" | "O"
  let board;                 // array of 9, values: "X" | "O" | null
  let currentTurn;           // "X" | "O"
  let gameOver;
  let winLine;               // [i, j, k] or null
  let winner;                // "X" | "O" | "draw" | null
  const score = { X: 0, O: 0, D: 0 };
  let cpuThinking = false;

  // ─── canvas ───
  const canvas = document.getElementById("board");
  const ctx = canvas.getContext("2d");
  const CELL = canvas.width / 3;

  function newGame() {
    board = Array(9).fill(null);
    winLine = null;
    winner = null;
    gameOver = false;
    currentTurn = "X"; // X always starts
    hideOverlay();
    render();
    // if CPU is X (i.e. player chose O), it moves first
    if (mode === "cpu" && currentTurn !== playerSide) {
      scheduleCpu();
    }
  }

  // ─── rendering ───
  function render() {
    // background
    ctx.fillStyle = "#0d1410";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // phosphor scanline haze
    ctx.fillStyle = "rgba(74, 111, 86, 0.025)";
    for (let y = 0; y < canvas.height; y += 3) {
      ctx.fillRect(0, y, canvas.width, 1);
    }

    // grid lines
    ctx.strokeStyle = PHOSPHOR;
    ctx.lineWidth = 3;
    ctx.shadowColor = PHOSPHOR_DIM;
    ctx.shadowBlur = 8;
    ctx.lineCap = "round";

    const inset = 30;
    // verticals
    for (let i = 1; i < 3; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL, inset);
      ctx.lineTo(i * CELL, canvas.height - inset);
      ctx.stroke();
    }
    // horizontals
    for (let i = 1; i < 3; i++) {
      ctx.beginPath();
      ctx.moveTo(inset, i * CELL);
      ctx.lineTo(canvas.width - inset, i * CELL);
      ctx.stroke();
    }

    ctx.shadowBlur = 0;

    // marks
    for (let i = 0; i < 9; i++) {
      if (board[i]) drawMark(i, board[i]);
    }

    // winning line
    if (winLine) {
      drawWinLine(winLine);
    }
  }

  function cellCenter(i) {
    const col = i % 3;
    const row = Math.floor(i / 3);
    return { x: col * CELL + CELL / 2, y: row * CELL + CELL / 2 };
  }

  function drawMark(i, mark) {
    const { x, y } = cellCenter(i);
    const r = CELL * 0.28;

    if (mark === "X") {
      ctx.strokeStyle = AMBER_BRIGHT;
      ctx.shadowColor = AMBER_DIM;
      ctx.shadowBlur = 12;
      ctx.lineWidth = 5;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(x - r, y - r);
      ctx.lineTo(x + r, y + r);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x + r, y - r);
      ctx.lineTo(x - r, y + r);
      ctx.stroke();
    } else {
      ctx.strokeStyle = PHOSPHOR;
      ctx.shadowColor = PHOSPHOR_DIM;
      ctx.shadowBlur = 12;
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.shadowBlur = 0;
  }

  function drawWinLine(line) {
    const a = cellCenter(line[0]);
    const c = cellCenter(line[2]);
    ctx.strokeStyle = RED;
    ctx.shadowColor = "rgba(217, 122, 106, 0.5)";
    ctx.shadowBlur = 16;
    ctx.lineWidth = 6;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(c.x, c.y);
    ctx.stroke();
    ctx.shadowBlur = 0;
  }

  // ─── game logic ───
  const WINS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  function checkWin(bd) {
    for (const line of WINS) {
      const [a, b, c] = line;
      if (bd[a] && bd[a] === bd[b] && bd[a] === bd[c]) {
        return { winner: bd[a], line };
      }
    }
    if (bd.every(v => v !== null)) return { winner: "draw", line: null };
    return null;
  }

  function playAt(i) {
    if (gameOver || board[i] !== null || cpuThinking) return;

    board[i] = currentTurn;
    const result = checkWin(board);
    render();

    if (result) {
      finishGame(result);
      return;
    }

    currentTurn = currentTurn === "X" ? "O" : "X";
    updateHUD();

    if (mode === "cpu" && currentTurn !== playerSide && !gameOver) {
      scheduleCpu();
    }
  }

  function finishGame(result) {
    gameOver = true;
    winner = result.winner;
    winLine = result.line;
    render();

    if (result.winner === "draw") {
      score.D++;
    } else {
      score[result.winner]++;
    }
    updateHUD();
    setTimeout(showOverlay, 500);
  }

  function scheduleCpu() {
    cpuThinking = true;
    updateHUD();
    setTimeout(() => {
      const move = pickCpuMove();
      cpuThinking = false;
      if (move !== -1) playAt(move);
    }, 320 + Math.random() * 260);
  }

  function pickCpuMove() {
    const cpu = currentTurn;
    const human = cpu === "X" ? "O" : "X";
    const empty = [];
    for (let i = 0; i < 9; i++) if (board[i] === null) empty.push(i);
    if (empty.length === 0) return -1;

    if (difficulty === "easy") {
      // pure random
      return empty[Math.floor(Math.random() * empty.length)];
    }

    if (difficulty === "medium") {
      // 60% smart, 40% random-among-non-losing
      if (Math.random() < 0.6) return minimaxBest(board, cpu, human);
      return empty[Math.floor(Math.random() * empty.length)];
    }

    // hard = full minimax
    return minimaxBest(board, cpu, human);
  }

  function minimaxBest(bd, cpu, human) {
    let bestScore = -Infinity;
    let bestMoves = [];
    for (let i = 0; i < 9; i++) {
      if (bd[i] === null) {
        bd[i] = cpu;
        const s = minimax(bd, false, cpu, human, 0);
        bd[i] = null;
        if (s > bestScore) {
          bestScore = s;
          bestMoves = [i];
        } else if (s === bestScore) {
          bestMoves.push(i);
        }
      }
    }
    return bestMoves[Math.floor(Math.random() * bestMoves.length)];
  }

  function minimax(bd, isCpuTurn, cpu, human, depth) {
    const res = checkWin(bd);
    if (res) {
      if (res.winner === cpu) return 10 - depth;
      if (res.winner === human) return depth - 10;
      return 0;
    }
    if (isCpuTurn) {
      let best = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (bd[i] === null) {
          bd[i] = cpu;
          best = Math.max(best, minimax(bd, false, cpu, human, depth + 1));
          bd[i] = null;
        }
      }
      return best;
    } else {
      let best = Infinity;
      for (let i = 0; i < 9; i++) {
        if (bd[i] === null) {
          bd[i] = human;
          best = Math.min(best, minimax(bd, true, cpu, human, depth + 1));
          bd[i] = null;
        }
      }
      return best;
    }
  }

  // ─── HUD & overlay ───
  function updateHUD() {
    document.getElementById("hudX").textContent = score.X;
    document.getElementById("hudO").textContent = score.O;
    document.getElementById("hudD").textContent = score.D;
    const turnEl = document.getElementById("hudTurn");
    if (gameOver) {
      turnEl.textContent = winner === "draw" ? "—" : (winner + " wins");
      turnEl.className = winner === "X" ? "hud-value amber" : "hud-value";
    } else if (cpuThinking) {
      turnEl.textContent = "cpu…";
      turnEl.className = "hud-value";
    } else {
      turnEl.textContent = currentTurn;
      turnEl.className = currentTurn === "X" ? "hud-value amber" : "hud-value";
    }
  }

  function showOverlay() {
    const overlay = document.getElementById("overlay");
    const eyebrow = document.getElementById("overlayEyebrow");
    const title = document.getElementById("overlayTitle");
    const sub = document.getElementById("overlaySub");

    if (winner === "draw") {
      eyebrow.textContent = "round over";
      title.textContent = "draw";
      sub.textContent = "well played";
    } else if (mode === "cpu") {
      if (winner === playerSide) {
        eyebrow.textContent = "round over";
        title.textContent = "you win";
        sub.textContent = "against the machine";
      } else {
        eyebrow.textContent = "round over";
        title.textContent = "cpu wins";
        sub.textContent = "try again";
      }
    } else {
      eyebrow.textContent = "round over";
      title.textContent = winner + " wins";
      sub.textContent = "next round?";
    }
    overlay.classList.add("show");
  }
  function hideOverlay() {
    document.getElementById("overlay").classList.remove("show");
  }

  // ─── input ───
  canvas.addEventListener("click", (e) => {
    if (gameOver || cpuThinking) return;
    if (mode === "cpu" && currentTurn !== playerSide) return;
    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * canvas.width;
    const y = ((e.clientY - rect.top) / rect.height) * canvas.height;
    const col = Math.floor(x / CELL);
    const row = Math.floor(y / CELL);
    playAt(row * 3 + col);
  });

  document.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();
    if (key === "n") { newGame(); return; }
    if (key === "r") { resetScore(); return; }
    // numpad layout: 7 8 9 / 4 5 6 / 1 2 3
    const map = { "7": 0, "8": 1, "9": 2, "4": 3, "5": 4, "6": 5, "1": 6, "2": 7, "3": 8 };
    if (map[e.key] !== undefined) {
      if (gameOver || cpuThinking) return;
      if (mode === "cpu" && currentTurn !== playerSide) return;
      playAt(map[e.key]);
    }
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
  wireSeg("modeSeg", (v) => {
    mode = v;
    document.getElementById("difficultyGroup").style.display = v === "cpu" ? "" : "none";
    document.getElementById("playerSideGroup").style.display = v === "cpu" ? "" : "none";
    resetScore();
    newGame();
  });
  wireSeg("diffSeg", (v) => { difficulty = v; newGame(); });
  wireSeg("sideSeg", (v) => { playerSide = v; newGame(); });

  document.getElementById("newGameBtn").addEventListener("click", newGame);
  document.getElementById("overlayBtn").addEventListener("click", newGame);
  document.getElementById("resetScoreBtn").addEventListener("click", () => {
    resetScore();
    updateHUD();
  });

  function resetScore() {
    score.X = 0; score.O = 0; score.D = 0;
  }

  // ─── init ───
  newGame();
})();
