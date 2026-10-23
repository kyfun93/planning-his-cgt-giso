/* Bandeau DMD éphémère, isolé du planning.
   Pour tout désactiver : CELEBRATION_ENABLED = false.
   Pour le retirer du site : supprimer ce fichier, celebration.css,
   et les deux balises commentées dans index.html. */
(function () {
  "use strict";

  const CELEBRATION_ENABLED = true;
  // 2 novembre 2026, 23:59 heure de Paris. Passé cette date, plus rien ne s'affiche.
  const CELEBRATION_ENDS_AT = "2026-11-02T22:59:59Z";
  const CAMPAIGN_ID = "elections-2026-retraite";
  const PASSES = 2;
  const STORAGE_KEY = "pk-celebration-seen-" + CAMPAIGN_ID;
  const MESSAGE = "BRAVO À TOUS ! • MERCI POUR VOTRE MOBILISATION !!! ☺ 😉 ☻ • NOUS SOUHAITONS UNE BONNE RETRAITE À JR";

  const ROWS = 8;
  const PITCH = 5;
  // Trois largeurs de caractère par seconde. La durée suit la longueur du texte.
  const CELLS_PER_SECOND = 18;

  const PALETTE = [
    { core: "#ff3a2a", mid: "#ff6240", glow: "rgba(255, 36, 18, 0.55)" },
    { core: "#ffb000", mid: "#ff8a00", glow: "rgba(255, 150, 0, 0.5)" },
    { core: "#ffe29a", mid: "#f0b429", glow: "rgba(255, 200, 80, 0.48)" }
  ];

  function pad(rows) {
    return ["00000", ...rows];
  }

  const GLYPHS = {
    A: pad(["01110", "10001", "10001", "11111", "10001", "10001", "10001"]),
    B: pad(["11110", "10001", "10001", "11110", "10001", "10001", "11110"]),
    C: pad(["01111", "10000", "10000", "10000", "10000", "10000", "01111"]),
    D: pad(["11110", "10001", "10001", "10001", "10001", "10001", "11110"]),
    E: pad(["11111", "10000", "10000", "11110", "10000", "10000", "11111"]),
    F: pad(["11111", "10000", "10000", "11110", "10000", "10000", "10000"]),
    G: pad(["01111", "10000", "10000", "10111", "10001", "10001", "01111"]),
    H: pad(["10001", "10001", "10001", "11111", "10001", "10001", "10001"]),
    I: pad(["01110", "00100", "00100", "00100", "00100", "00100", "01110"]),
    J: pad(["00111", "00010", "00010", "00010", "00010", "10010", "01100"]),
    K: pad(["10001", "10010", "10100", "11000", "10100", "10010", "10001"]),
    L: pad(["10000", "10000", "10000", "10000", "10000", "10000", "11111"]),
    M: pad(["10001", "11011", "10101", "10001", "10001", "10001", "10001"]),
    N: pad(["10001", "11001", "10101", "10011", "10001", "10001", "10001"]),
    O: pad(["01110", "10001", "10001", "10001", "10001", "10001", "01110"]),
    P: pad(["11110", "10001", "10001", "11110", "10000", "10000", "10000"]),
    Q: pad(["01110", "10001", "10001", "10001", "10101", "10010", "01101"]),
    R: pad(["11110", "10001", "10001", "11110", "10100", "10010", "10001"]),
    S: pad(["01111", "10000", "10000", "01110", "00001", "00001", "11110"]),
    T: pad(["11111", "00100", "00100", "00100", "00100", "00100", "00100"]),
    U: pad(["10001", "10001", "10001", "10001", "10001", "10001", "01110"]),
    V: pad(["10001", "10001", "10001", "10001", "01010", "01010", "00100"]),
    W: pad(["10001", "10001", "10001", "10101", "10101", "01010", "01010"]),
    X: pad(["10001", "01010", "01010", "00100", "01010", "01010", "10001"]),
    Y: pad(["10001", "10001", "01010", "00100", "00100", "00100", "00100"]),
    Z: pad(["11111", "00001", "00010", "00100", "01000", "10000", "11111"]),
    À: ["11000", "01110", "10001", "10001", "11111", "10001", "10001", "10001"],
    É: ["11000", "11111", "10000", "11110", "10000", "10000", "10000", "11111"],
    "!": pad(["00100", "00100", "00100", "00100", "00100", "00000", "00100"]),
    "☺": ["0000000", "0111110", "1000001", "1010101", "1000001", "1100011", "1011101", "0111110"],
    "😉": ["0000000", "0111110", "1000001", "1010111", "1000001", "1100011", "1011101", "0111110"],
    "☻": ["0000000", "0111110", "1000001", "1010101", "1100011", "1011101", "1100011", "0111110"],
    "•": ["00000", "00000", "00000", "01110", "01110", "01110", "00000", "00000"],
    "?": pad(["01110", "10001", "00001", "00010", "00100", "00000", "00100"])
  };

  function seen() {
    try {
      return localStorage.getItem(STORAGE_KEY) === "1";
    } catch (error) {
      return false;
    }
  }

  function markSeen() {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch (error) {
      /* affichage unique impossible à mémoriser dans ce navigateur */
    }
  }

  function buildColumns(text) {
    const columns = [];
    let cursor = 0;
    text.split(" ").forEach(function (word, wordIndex) {
      if (wordIndex > 0) cursor += 3;
      const color = wordIndex % PALETTE.length;
      for (const ch of word) {
        const glyph = GLYPHS[ch] || GLYPHS["?"];
        const width = glyph[0].length;
        for (let col = 0; col < width; col++) {
          const bits = [];
          for (let row = 0; row < ROWS; row++) bits.push(glyph[row][col] === "1");
          columns.push({ x: cursor + col, bits: bits, color: color });
        }
        cursor += width + 1;
      }
    });
    return { columns: columns, total: cursor };
  }

  function makeSprite(color, dpr) {
    const size = Math.ceil(PITCH * 3 * dpr);
    const sprite = document.createElement("canvas");
    sprite.width = size;
    sprite.height = size;
    const ctx = sprite.getContext("2d");
    const center = size / 2;
    const radius = PITCH * 1.25 * dpr;
    const glow = ctx.createRadialGradient(center, center, PITCH * 0.2 * dpr, center, center, radius);
    glow.addColorStop(0, color.core);
    glow.addColorStop(0.42, color.mid);
    glow.addColorStop(0.72, color.glow);
    glow.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(center, center, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#fff6df";
    ctx.globalAlpha = 0.8;
    ctx.beginPath();
    ctx.arc(center, center, Math.max(0.6, PITCH * 0.18 * dpr), 0, Math.PI * 2);
    ctx.fill();
    return sprite;
  }

  function controlRects() {
    const nodes = [
      document.getElementById("colleagueSelect"),
      document.getElementById("prevMonth"),
      document.getElementById("nextMonth"),
      document.getElementById("addSlotBtn"),
      document.getElementById("currentMonthLabel")
    ].concat(Array.from(document.querySelectorAll("#hisFooter button")));
    return nodes.filter(Boolean).map(function (node) {
      return node.getBoundingClientRect();
    });
  }

  function place(root) {
    const title = document.querySelector(".pk-header-title");
    const height = root.getBoundingClientRect().height || 46;
    let top = 8;
    let left = 12;
    if (title) {
      const rect = title.getBoundingClientRect();
      top = Math.max(6, Math.round(rect.top));
      left = Math.max(8, Math.round(rect.left));
    }
    const ceiling = controlRects().reduce(function (min, rect) {
      return rect.top > top + 10 ? Math.min(min, rect.top) : min;
    }, window.innerHeight);
    if (top + height > ceiling - 4) {
      top = Math.max(6, Math.round(ceiling - 4 - height));
    }
    root.style.top = top + "px";
    root.style.bottom = "auto";
    root.style.left = left + "px";
    root.style.right = "12px";
    root.style.width = "auto";
  }

  function boot() {
    if (!CELEBRATION_ENABLED) return;
    if (Date.now() >= Date.parse(CELEBRATION_ENDS_AT)) return;
    if (seen()) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const model = buildColumns(MESSAGE);
    const root = document.createElement("div");
    root.className = "pk-celebration" + (reduce ? " is-static" : "");

    const status = document.createElement("p");
    status.className = "pk-celebration-status";
    status.setAttribute("role", "status");
    status.textContent = MESSAGE;
    root.appendChild(status);

    let screen = null;
    let canvas = null;
    if (!reduce) {
      screen = document.createElement("div");
      screen.className = "pk-celebration-screen";
      screen.setAttribute("aria-hidden", "true");
      canvas = document.createElement("canvas");
      screen.appendChild(canvas);
      root.appendChild(screen);
    }

    document.body.appendChild(root);
    markSeen();

    let disposed = false;
    let raf = 0;
    let passesDone = 0;
    let offsetCells = null;
    let lastTs = 0;
    let carry = 0;
    let sprites = [];
    let spriteDpr = 0;

    function dispose() {
      if (disposed) return;
      disposed = true;
      if (root._layoutObserver) root._layoutObserver.disconnect();
      if (root.parentNode) root.remove();
      cancelAnimationFrame(raf);
      window.removeEventListener("load", placeAndDraw);
      window.removeEventListener("resize", placeAndDraw);
      window.removeEventListener("storage", onStorage);
    }

    function onStorage(event) {
      if (event.key === STORAGE_KEY && event.newValue) dispose();
    }

    window.addEventListener("storage", onStorage);

    function watchLayout() {
      if (window.ResizeObserver) {
        const observer = new ResizeObserver(function () {
          placeAndDraw();
        });
        const main = document.getElementById("hisModule");
        const footer = document.getElementById("hisFooter");
        if (main) observer.observe(main);
        if (footer) observer.observe(footer);
        root._layoutObserver = observer;
      }
      window.addEventListener("load", placeAndDraw);
      window.setTimeout(placeAndDraw, 0);
      window.setTimeout(placeAndDraw, 400);
      window.setTimeout(placeAndDraw, 1200);
    }

    if (reduce) {
      place(root);
      watchLayout();
      window.addEventListener("resize", placeAndDraw);
      const readMs = Math.max(10000, MESSAGE.length * 120) * PASSES;
      window.setTimeout(dispose, readMs);
      return;
    }

    function ensureSprites() {
      const dpr = window.devicePixelRatio || 1;
      if (sprites.length && spriteDpr === dpr) return;
      spriteDpr = dpr;
      sprites = PALETTE.map(function (color) {
        return makeSprite(color, dpr);
      });
    }

    function draw() {
      if (!canvas || disposed) return;
      const width = screen.clientWidth;
      const height = screen.clientHeight;
      if (width < 20 || height < 20) return;
      const dpr = window.devicePixelRatio || 1;
      const pixelW = Math.round(width * dpr);
      const pixelH = Math.round(height * dpr);
      if (canvas.width !== pixelW || canvas.height !== pixelH) {
        canvas.width = pixelW;
        canvas.height = pixelH;
      }
      ensureSprites();
      const ctx = canvas.getContext("2d");
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, width, height);

      const gridTop = Math.round((height - ROWS * PITCH) / 2);
      const dot = 2;
      const inset = Math.floor((PITCH - dot) / 2);
      ctx.fillStyle = "rgba(255, 164, 48, 0.07)";
      for (let y = gridTop % PITCH; y < height; y += PITCH) {
        for (let x = 0; x < width; x += PITCH) {
          ctx.fillRect(x + inset, y + inset, dot, dot);
        }
      }

      if (offsetCells === null) offsetCells = Math.ceil(width / PITCH);
      const visibleCells = Math.ceil(width / PITCH);

      model.columns.forEach(function (col) {
        const cell = offsetCells + col.x;
        if (cell < -1 || cell > visibleCells) return;
        const dx = cell * PITCH;
        const sprite = sprites[col.color];
        for (let row = 0; row < ROWS; row++) {
          if (!col.bits[row]) continue;
          const dy = gridTop + row * PITCH;
          ctx.drawImage(sprite, dx - PITCH, dy - PITCH, PITCH * 3, PITCH * 3);
        }
      });
    }

    function placeAndDraw() {
      if (disposed) return;
      place(root);
      draw();
    }

    function frame(ts) {
      if (disposed) return;
      if (!lastTs) lastTs = ts;
      const dt = Math.min(0.05, (ts - lastTs) / 1000);
      lastTs = ts;
      carry += dt * CELLS_PER_SECOND;
      const steps = Math.floor(carry);
      if (steps > 0 && offsetCells !== null) {
        carry -= steps;
        offsetCells -= steps;
        if (offsetCells + model.total <= 0) {
          passesDone += 1;
          if (passesDone >= PASSES) {
            dispose();
            return;
          }
          offsetCells = Math.ceil(screen.clientWidth / PITCH);
          carry = 0;
        }
        draw();
      }
      raf = requestAnimationFrame(frame);
    }

    placeAndDraw();
    watchLayout();
    raf = requestAnimationFrame(frame);
    window.addEventListener("resize", placeAndDraw);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
