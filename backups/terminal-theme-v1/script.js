const siteData = {
  profile: {
    name: "Arevind Mohan",
    shortName: "rvnd",
    role: "AI Systems Builder",
    kicker: "boot log // applied ai, retrieval, voice, backend product work",
    heroSummary:
      "I build retrieval systems, offline assistants, and product-facing engineering work that turns technical depth into tools people can actually navigate.",
    about:
      "I like systems that stay calm under real constraints: local-first where it matters, explicit in how they behave, and polished enough that the interface earns its keep. The work currently clusters around applied AI, backend workflows, voice interaction, and product-minded engineering with a playful edge.",
    tags: ["RAG Systems", "Offline AI", "Voice UX", "Product Thinking"],
    meta: [
      { label: "Base", value: "[Add your city / timezone]" },
      { label: "Availability", value: "[Add availability status]" },
      { label: "Resume", value: "[Add resume link]" },
      { label: "Email", value: "[Add email address]" }
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
        "Combines FastAPI, Qdrant, SQLite FTS, evaluation workflows, and a Next.js dashboard into a retrieval product that feels closer to a real platform than a demo.",
      stack: ["Python", "FastAPI", "Next.js", "Qdrant", "SQLite", "OpenAI / Ollama"]
    },
    {
      name: "raven",
      kicker: "Local-first assistant",
      href: "https://github.com/Arevind/raven",
      summary:
        "A privacy-first offline voice assistant designed to run on CPU with local LLM inference, speech interaction, and function calling.",
      impact:
        "Shows strength in systems thinking: balancing offline constraints, practical automation, and an interaction model that moves beyond basic chat.",
      stack: ["Python", "FastAPI", "Docker", "Speech", "Local LLMs", "Function calling"]
    },
    {
      name: "ascii-cake",
      kicker: "Personality project",
      href: "https://github.com/Arevind/ascii-cake",
      summary:
        "A chaotic and joyful terminal birthday experience with ASCII art, fireworks, music, and staged interaction.",
      impact:
        "A small project with outsized personality that proves the work is not just technically functional, but also capable of delight and tone.",
      stack: ["Python", "Rich", "Pygame", "CLI design", "Animation"]
    }
  ],
  miniProjects: [
    {
      name: "Ollama_Voice_Assistant",
      href: "https://github.com/Arevind/Ollama_Voice_Assistant",
      description: "An earlier voice assistant build that reinforces the local AI and speech interface thread."
    },
    {
      name: "Python-Chat-App",
      href: "https://github.com/Arevind/Python-Chat-App",
      description: "A chat-oriented web app project that adds breadth beyond AI-heavy systems work."
    }
  ],
  contact: [
    {
      title: "GitHub",
      text: "Primary public work and current project trail.",
      label: "github.com/Arevind",
      href: "https://github.com/Arevind"
    },
    {
      title: "Email",
      text: "Replace this placeholder with your preferred inbox for hiring or collaboration.",
      label: "[Add email address]",
      href: "mailto:hello@example.com"
    },
    {
      title: "LinkedIn",
      text: "Add your professional profile once you want recruiters to have a second touchpoint.",
      label: "[Add LinkedIn URL]",
      href: "https://www.linkedin.com/"
    },
    {
      title: "Resume",
      text: "Link a hosted PDF when you want a more traditional handoff for applications.",
      label: "[Add resume link]",
      href: "#"
    }
  ]
};

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
    metaItem.append(createTag("p", "meta-value", item.value));
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

function renderMiniProjects() {
  const container = document.getElementById("mini-projects");
  siteData.miniProjects.forEach((project) => {
    const article = createTag("article", "mini-project");
    const row = createTag("div", "project-title-row");
    row.append(createTag("h3", "project-title", project.name));

    const link = createTag("a", "project-link", "Open");
    link.href = project.href;
    link.target = "_blank";
    link.rel = "noreferrer";
    row.append(link);

    article.append(row);
    article.append(createTag("p", "", project.description));
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
  renderMiniProjects();
  renderContact();
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
revealHero();
updateParallax();

window.addEventListener("scroll", updateParallax, { passive: true });
window.addEventListener("resize", updateParallax);
