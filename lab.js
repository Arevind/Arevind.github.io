const themeStorageKey = "rvnd-theme";

const fortunes = [
  "fortune: every bug becomes documentation if you stare at it long enough.",
  "fortune: local-first is a lifestyle, not just an architecture choice.",
  "fortune: the cleanest deploy is the one you can explain half-asleep.",
  "fortune: if it works offline, it probably works better online too.",
  "fortune: small tools with good taste age surprisingly well."
];

const petStates = {
  calm: { art: "(=^..^=)", status: "status // calm" },
  zoom: { art: "/\\_/\\\\\n( o.o )\n > ^ <", status: "status // chasing invisible packets" },
  sleep: { art: "(=-.-=)\n z z z", status: "status // conserving cpu" },
  compile: { art: "(=o.o=)\n<[###]>", status: "status // compiling nonsense" },
  judge: { art: "(=~.~=)", status: "status // silently judging your tabs vs spaces" },
  feed: { art: "(=^.^=)\n nom nom", status: "status // happily fed" }
};

const autonomousPetStates = ["calm", "zoom", "judge", "sleep", "compile"];

const commandDeck = {
  neofetch: [
    "$ neofetch",
    "user: rvnd",
    "os: portfolio linux (imaginary)",
    "shell: powershell with terminal envy",
    "theme: green, warm, and slightly caffeinated"
  ].join("\n"),
  htop: [
    "$ htop",
    "python        12.0%   building side quests",
    "fastapi        8.3%   serving useful things",
    "curiosity     99.9%   cannot be killed"
  ].join("\n"),
  sl: [
    "$ sl",
    "      ====        ________                ___________ ",
    "  _D _|  |_______/        \\__I_I_____===__|_________| ",
    "   |(_)---  |   H\\________/ |   |        =|___ ___|   ",
    "   /     |  |   H  |  |     |   |         ||_| |_||   ",
    "  |      |  |   H  |__--------------------| [___] |   "
  ].join("\n"),
  cowsay: [
    "$ cowsay \"ship it\"",
    " __________",
    "< ship it >",
    " ----------",
    "        \\   ^__^",
    "         \\  (oo)\\_______",
    "            (__)\\       )\\/\\",
    "                ||----w |",
    "                ||     ||"
  ].join("\n")
};

const logEntries = [
  "[info] warmed up sidequest runtime",
  "[trace] pet.proc inspected the room and found snacks",
  "[ok] snake.bin accepted keyboard ownership",
  "[note] command deck is entirely unserious",
  "[warn] too much whimsy may improve morale",
  "[info] local delight pipeline running nominally"
];

function applyTheme(theme) {
  document.body.setAttribute("data-theme", theme);
  const value = document.getElementById("lab-theme-value");
  if (value) {
    value.textContent = theme;
  }
}

function getPreferredTheme() {
  const savedTheme = window.localStorage.getItem(themeStorageKey);
  if (savedTheme === "dark" || savedTheme === "light") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function setupThemeToggle() {
  const toggle = document.getElementById("lab-theme-toggle");
  if (!(toggle instanceof HTMLButtonElement)) {
    return;
  }

  applyTheme(getPreferredTheme());

  toggle.addEventListener("click", () => {
    const currentTheme = document.body.getAttribute("data-theme") === "light" ? "light" : "dark";
    const nextTheme = currentTheme === "light" ? "dark" : "light";
    window.localStorage.setItem(themeStorageKey, nextTheme);
    applyTheme(nextTheme);
  });
}

function setupFortune() {
  const button = document.getElementById("fortune-button");
  const output = document.getElementById("fortune-output");
  if (!(button instanceof HTMLButtonElement) || !(output instanceof HTMLElement)) {
    return;
  }

  button.addEventListener("click", () => {
    const fortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    output.textContent = `$ fortune\n${fortune}`;
  });
}

function setupPet() {
  const pet = document.getElementById("lab-pet");
  const status = document.getElementById("lab-pet-status");
  const buttons = document.querySelectorAll("[data-pet-action]");
  if (!(pet instanceof HTMLElement) || !(status instanceof HTMLElement)) {
    return;
  }

  function renderState(name) {
    const state = petStates[name];
    if (!state) {
      return;
    }
    pet.textContent = state.art;
    status.textContent = state.status;
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.getAttribute("data-pet-action");
      if (!action) {
        return;
      }
      renderState(action);
    });
  });

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.setInterval(() => {
      const state = autonomousPetStates[Math.floor(Math.random() * autonomousPetStates.length)];
      renderState(state);
    }, 3400);
  }

  renderState("calm");
}

function setupCommandDeck() {
  const output = document.getElementById("command-output");
  const buttons = document.querySelectorAll("[data-command]");
  if (!(output instanceof HTMLElement)) {
    return;
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const command = button.getAttribute("data-command");
      if (!command) {
        return;
      }

      if (command === "cd-home") {
        output.textContent = "$ cd ..\nreturning to /home ...";
        window.setTimeout(() => {
          window.location.href = "index.html";
        }, 550);
        return;
      }

      if (!commandDeck[command]) {
        return;
      }

      output.textContent = commandDeck[command];
    });
  });
}

function setupLogStream() {
  const output = document.getElementById("lab-log-stream");
  if (!(output instanceof HTMLElement)) {
    return;
  }

  const lines = ["$ tail -f orbit.log"];
  output.textContent = lines.join("\n");

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  let index = 0;
  window.setInterval(() => {
    lines.push(logEntries[index % logEntries.length]);
    index += 1;
    while (lines.length > 7) {
      lines.splice(1, 1);
    }
    output.textContent = lines.join("\n");
  }, 2200);
}

function setupSnake() {
  const board = document.getElementById("lab-snake-board");
  const status = document.getElementById("lab-snake-status");
  const start = document.getElementById("snake-start");
  const reset = document.getElementById("snake-reset");
  if (!(board instanceof HTMLElement) || !(status instanceof HTMLElement) || !(start instanceof HTMLButtonElement) || !(reset instanceof HTMLButtonElement)) {
    return;
  }

  const width = 18;
  const height = 12;
  let snake = [{ x: 4, y: 6 }, { x: 3, y: 6 }, { x: 2, y: 6 }];
  let direction = { x: 1, y: 0 };
  let food = { x: 12, y: 7 };
  let timer;
  let running = false;
  let score = 0;

  function escapeHtml(value) {
    return value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll("\"", "&quot;")
      .replaceAll("'", "&#39;");
  }

  function randomFood() {
    let next = { x: 0, y: 0 };
    do {
      next = {
        x: Math.floor(Math.random() * width),
        y: Math.floor(Math.random() * height)
      };
    } while (snake.some((segment) => segment.x === next.x && segment.y === next.y));
    return next;
  }

  function render() {
    const headGlyph =
      direction.x === 1 ? ">" :
      direction.x === -1 ? "<" :
      direction.y === -1 ? "^" :
      "v";
    const rows = [];
    board.style.setProperty("--snake-cols", String(width + 2));

    const borderRow = [
      { char: "+", className: "lab-snake-cell is-border" },
      ...Array.from({ length: width }, () => ({ char: "-", className: "lab-snake-cell is-border" })),
      { char: "+", className: "lab-snake-cell is-border" }
    ];
    rows.push(borderRow);

    for (let y = 0; y < height; y += 1) {
      const row = [{ char: "|", className: "lab-snake-cell is-border" }];
      for (let x = 0; x < width; x += 1) {
        if (food.x === x && food.y === y) {
          row.push({ char: "*", className: "lab-snake-cell is-food" });
          continue;
        }

        const index = snake.findIndex((segment) => segment.x === x && segment.y === y);
        if (index === 0) {
          row.push({ char: headGlyph, className: "lab-snake-cell is-head" });
        } else if (index > 0) {
          row.push({ char: "o", className: "lab-snake-cell is-body" });
        } else {
          row.push({ char: ".", className: "lab-snake-cell" });
        }
      }
      row.push({ char: "|", className: "lab-snake-cell is-border" });
      rows.push(row);
    }
    rows.push(borderRow);

    board.innerHTML = rows.map((row) => {
      const cells = row.map((cell) => `<span class="${cell.className}">${escapeHtml(cell.char)}</span>`).join("");
      return `<span class="lab-snake-row">${cells}</span>`;
    }).join("");
    status.textContent = `status // score ${score}${running ? " // running" : " // idle"}`;
  }

  function resetGame() {
    window.clearInterval(timer);
    snake = [{ x: 4, y: 6 }, { x: 3, y: 6 }, { x: 2, y: 6 }];
    direction = { x: 1, y: 0 };
    food = randomFood();
    score = 0;
    running = false;
    render();
    status.textContent = "status // press start, then use arrow keys";
  }

  function tick() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    if (
      head.x < 0 || head.x >= width ||
      head.y < 0 || head.y >= height ||
      snake.some((segment) => segment.x === head.x && segment.y === head.y)
    ) {
      running = false;
      window.clearInterval(timer);
      render();
      status.textContent = `status // game over // score ${score}`;
      return;
    }

    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
      score += 1;
      food = randomFood();
    } else {
      snake.pop();
    }
    render();
  }

  function startGame() {
    if (running) {
      return;
    }
    running = true;
    window.clearInterval(timer);
    timer = window.setInterval(tick, 220);
    render();
  }

  window.addEventListener("keydown", (event) => {
    const next = {
      ArrowUp: { x: 0, y: -1 },
      ArrowDown: { x: 0, y: 1 },
      ArrowLeft: { x: -1, y: 0 },
      ArrowRight: { x: 1, y: 0 }
    }[event.key];

    if (!next) {
      return;
    }

    if (direction.x + next.x === 0 && direction.y + next.y === 0) {
      return;
    }

    direction = next;
    if (!running) {
      startGame();
    }
  });

  start.addEventListener("click", startGame);
  reset.addEventListener("click", resetGame);
  resetGame();
}

setupThemeToggle();
setupFortune();
setupPet();
setupCommandDeck();
setupLogStream();
setupSnake();
