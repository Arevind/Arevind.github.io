const siteData = {
  profile: {
    name: "Arevind Mohan",
    shortName: "rvnd",
    role: "AI Systems Builder",
    kicker: "boot log // applied ai, retrieval, voice, backend product work",
    heroSummary:
      "I build retrieval systems, offline assistants, and backend-heavy tools that turn technical depth into something people can actually use.",
    about:
      "I enjoy building systems that hold up under real constraints: local-first where it helps, clear in how they behave, and polished enough to feel good to use. Most of my work sits around applied AI, backend engineering, voice interaction, and practical tooling.",
    tags: ["RAG Systems", "Offline AI", "Voice UX", "Product Thinking"],
    meta: [
      { label: "Base", value: "Trivandrum, Kerala" },
      { label: "Availability", value: "Working full-time. Open to interesting opportunities and collaborations." },
      { label: "Resume", value: "View resume", href: "resume/Arevind_Mohan-Resume.pdf" },
      { label: "Email", value: "arevindmohan@gmail.com" }
    ]
  },
  skills: [
    {
      title: "AI / LLM Systems",
      items: ["RAG pipelines", "Embeddings", "Vector search", "Hybrid retrieval", "Evaluation workflows", "Local LLM tooling"]
    },
    {
      title: "Backend & APIs",
      items: ["Python", "FastAPI", "Service design", "Async workflows", "Data processing", "Diagnostics"]
    },
    {
      title: "Frontend & Product",
      items: ["Next.js", "Dashboards", "Developer UX", "Interaction design", "Responsive UI", "Technical storytelling"]
    },
    {
      title: "Tools & Infra",
      items: ["Docker", "SQLite", "Qdrant", "Ollama", "GitHub", "Local-first workflows"]
    }
  ],
  featuredProjects: [
    {
      name: "vecseek",
      kicker: "Flagship build",
      href: "https://github.com/Arevind/vecseek",
      summary:
        "A self-hosted multi-workspace RAG platform for uploading documents, indexing them, and querying them through a clean UI or API.",
      impact:
        "Built with FastAPI, Qdrant, SQLite FTS, evaluation workflows, and a Next.js dashboard for managing documents, retrieval, and search results in one place.",
      stack: ["Python", "FastAPI", "Next.js", "Qdrant", "SQLite", "OpenAI / Ollama"]
    },
    {
      name: "raven",
      kicker: "Local-first assistant",
      href: "https://github.com/Arevind/raven",
      summary:
        "A privacy-first offline voice assistant designed to run on CPU with local LLM inference, speech interaction, and function calling.",
      impact:
        "Built around local inference, speech input and output, and function calling so the assistant can run privately without depending on cloud-hosted models.",
      stack: ["Python", "FastAPI", "Docker", "Speech", "Local LLMs", "Function calling"]
    },
    {
      name: "ascii-cake",
      kicker: "Personality project",
      href: "https://github.com/Arevind/ascii-cake",
      summary:
        "A chaotic and joyful terminal birthday experience with ASCII art, fireworks, music, and staged interaction.",
      impact:
        "A playful CLI project that mixes animation, audio, and timed terminal interactions to turn a simple script into a full little experience.",
      stack: ["Python", "Rich", "Pygame", "CLI design", "Animation"]
    }
  ],
  contact: [
    {
      title: "GitHub",
      text: "Public repos, experiments, and project work.",
      label: "github.com/Arevind",
      href: "https://github.com/Arevind"
    },
    {
      title: "Email",
      text: "The best way to reach me directly.",
      label: "arevindmohan@gmail.com",
      href: "mailto:arevindmohan@gmail.com"
    },
    {
      title: "LinkedIn",
      text: "A quick overview of my experience and work history.",
      label: "linkedin.com/in/arevind-mohan/",
      href: "https://linkedin.com/in/arevind-mohan/"
    },
    {
      title: "Resume",
      text: "A PDF version of my resume.",
      label: "View resume",
      href: "resume/Arevind_Mohan-Resume.pdf"
    }
  ]
};

const themeStorageKey = "rvnd-theme";

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = value;
  }
}

function createTag(tagName, className, text) {
  const element = document.createElement(tagName);
  if (className) {
    element.className = className;
  }
  element.textContent = text;
  return element;
}

function renderMeta() {
  const container = document.getElementById("meta-grid");
  siteData.profile.meta.forEach((item) => {
    const metaItem = createTag("div", "meta-item");
    metaItem.append(createTag("p", "meta-label", item.label));

    if (item.href) {
      const valueLink = createTag("a", "meta-value meta-link", item.value);
      valueLink.href = item.href;
      if (item.href.startsWith("http") || item.href.endsWith(".pdf")) {
        valueLink.target = "_blank";
        valueLink.rel = "noreferrer";
      }
      metaItem.append(valueLink);
    } else {
      metaItem.append(createTag("p", "meta-value", item.value));
    }

    container.append(metaItem);
  });
}

function renderSkills() {
  const container = document.getElementById("skills-grid");
  siteData.skills.forEach((group) => {
    const article = createTag("article", "skill-group");
    article.append(createTag("p", "section-label", group.title));

    const list = createTag("ul", "skill-list");
    group.items.forEach((item) => {
      list.append(createTag("li", "", item));
    });

    article.append(list);
    container.append(article);
  });
}

function renderFeaturedProjects() {
  const container = document.getElementById("featured-projects");
  siteData.featuredProjects.forEach((project) => {
    const article = createTag("article", "project-card");

    const left = createTag("div", "project-summary");
    left.append(createTag("p", "project-kicker", project.kicker));

    const titleRow = createTag("div", "project-title-row");
    titleRow.append(createTag("h3", "project-title", project.name));
    const link = createTag("a", "project-link", "View repo");
    link.href = project.href;
    link.target = "_blank";
    link.rel = "noreferrer";
    titleRow.append(link);
    left.append(titleRow);
    left.append(createTag("p", "project-copy", project.summary));

    const right = createTag("div", "project-detail");
    right.append(createTag("p", "project-impact", project.impact));

    const stack = createTag("div", "stack-list");
    project.stack.forEach((item) => stack.append(createTag("span", "", item)));
    right.append(stack);

    article.append(left, right);
    container.append(article);
  });
}

function renderContact() {
  const container = document.getElementById("contact-grid");
  siteData.contact.forEach((item) => {
    const article = createTag("article", "contact-card");
    const row = createTag("div", "contact-row");
    row.append(createTag("h3", "contact-title", item.title));

    const link = createTag("a", "contact-link", item.label);
    link.href = item.href;
    if (item.href.startsWith("http")) {
      link.target = "_blank";
      link.rel = "noreferrer";
    }

    row.append(link);
    article.append(row);
    article.append(createTag("p", "contact-text", item.text));
    container.append(article);
  });
}

function renderTags() {
  const container = document.getElementById("hero-tags");
  siteData.profile.tags.forEach((tag) => {
    container.append(createTag("span", "", tag));
  });
}

function populateContent() {
  document.title = `${siteData.profile.shortName} | ${siteData.profile.role}`;
  setText("hero-kicker", siteData.profile.kicker);
  setText("hero-identity", `${siteData.profile.name} / ${siteData.profile.role}`);
  setText("hero-summary", siteData.profile.heroSummary);
  setText("about-copy", siteData.profile.about);
  renderTags();
  renderMeta();
  renderSkills();
  renderFeaturedProjects();
  renderContact();
}

function getPreferredTheme() {
  const savedTheme = window.localStorage.getItem(themeStorageKey);
  if (savedTheme === "dark" || savedTheme === "light") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function applyTheme(theme) {
  document.body.setAttribute("data-theme", theme);

  const toggleValue = document.getElementById("theme-toggle-value");
  if (toggleValue) {
    toggleValue.textContent = theme;
  }
}

function setupThemeToggle() {
  const toggle = document.getElementById("theme-toggle");
  if (!toggle) {
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

function setupAvatarSprite() {
  const sprite = document.querySelector(".terminal-avatar-strip");
  const viewport = document.getElementById("terminal-avatar-art");
  if (!(sprite instanceof HTMLImageElement) || !(viewport instanceof HTMLElement)) {
    return;
  }

  const frameCount = 4;
  const nativeFrameWidth = 627;
  const frameOffsets = [0, 7.5, 14.5, 22.5];
  let frameIndex = 0;

  function renderFrame(index) {
    const viewportWidth = viewport.clientWidth;
    if (!viewportWidth) {
      return;
    }

    const correction = (frameOffsets[index] * viewportWidth) / nativeFrameWidth;
    sprite.style.transform = `translateX(calc(${-25 * index}% + ${correction}px))`;
  }

  renderFrame(frameIndex);

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  window.setInterval(() => {
    frameIndex = (frameIndex + 1) % frameCount;
    renderFrame(frameIndex);
  }, 280);

  window.addEventListener("resize", () => renderFrame(frameIndex));
}

function updateScrollProgress() {
  const scrollRange = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = scrollRange <= 0 ? 0 : window.scrollY / scrollRange;
  const clamped = Math.max(0, Math.min(1, ratio));
  const percent = Math.round(clamped * 100);
  const progressBar = document.getElementById("terminal-progress-bar");
  const progressValue = document.getElementById("terminal-progress-value");
  const track = progressBar?.parentElement;
  const trackWidth = track?.clientWidth ?? 0;
  const sampleCharWidth = 8;
  const totalSlots = Math.max(24, Math.floor(trackWidth / sampleCharWidth) - 2);
  const filledSlots = Math.round(clamped * totalSlots);
  const filled = "\u2588".repeat(filledSlots);
  const empty = "-".repeat(Math.max(0, totalSlots - filledSlots));

  document.body.style.setProperty("--scroll-progress", `${clamped * 100}%`);

  if (progressBar) {
    progressBar.textContent = `[${filled}${empty}]`;
  }

  if (progressValue) {
    progressValue.textContent = `${percent}%`;
  }
}

function revealHero() {
  const items = document.querySelectorAll(".reveal");
  items.forEach((item, index) => {
    window.setTimeout(() => {
      item.classList.add("is-visible");
    }, 140 * index);
  });
}

function updateParallax() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const blocks = document.querySelectorAll("[data-parallax]");
  const viewportHeight = window.innerHeight;

  blocks.forEach((block) => {
    const rect = block.getBoundingClientRect();
    const distance = rect.top - viewportHeight * 0.55;
    const shift = Math.max(-18, Math.min(18, distance * -0.02));
    block.style.setProperty("--parallax-shift", `${shift}px`);
  });
}

populateContent();
setupThemeToggle();
setupAvatarSprite();
revealHero();
updateParallax();
updateScrollProgress();

window.addEventListener("scroll", updateParallax, { passive: true });
window.addEventListener("scroll", updateScrollProgress, { passive: true });
window.addEventListener("resize", updateParallax);
window.addEventListener("resize", updateScrollProgress);
