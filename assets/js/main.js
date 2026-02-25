"use strict";

/**
 * 1. App configuration
 */
const SUPPORTED_LANGUAGES = ["tr", "en"];
const SUPPORTED_THEMES = ["light", "dark"];
const STORAGE_KEYS = {
  language: "tercan-language",
  theme: "tercan-theme"
};
const ENDPOINTS = {
  tr: "locales/tr.json",
  en: "locales/en.json",
  projects: "data/projects.json"
};
const FALLBACK_TRANSLATIONS = {
  tr: {
    a11y: {
      "skip-to-content": "Ana içeriğe geç"
    },
    brand: {
      kicker: "Personal Project Home",
      title: "Tercan Keskin"
    },
    navigation: {
      "primary-label": "Ana gezinme",
      projects: "Projeler",
      about: "Hakkında"
    },
    controls: {
      "group-label": "Görünüm kontrolleri",
      "language-label": "Dil seçimi",
      "switch-dark": "Koyu moda geç",
      "switch-light": "Açık moda geç"
    },
    hero: {
      title: "Projelerim: doğrulanmış içerik, net teknoloji özeti.",
      description:
        "Bu sayfadaki tüm proje kartları, ilgili README dokümanlarından doğrulanmış bilgilerle hazırlanmıştır.",
      cta: "Projeleri incele",
      "summary-title": "Hızlı Bakış",
      "summary-projects-label": "Öne çıkan proje",
      "summary-languages-label": "Dil desteği",
      "summary-languages-value": "Türkçe / English",
      "summary-themes-label": "Tema desteği",
      "summary-themes-value": "Açık / Koyu"
    },
    projects: {
      title: "Öne Çıkan Projeler",
      description:
        "Her kartta proje tanımı, amacı, öne çıkan özellikler, teknoloji seti ve bağlantılar yer alır.",
      "type-label": "Tür",
      "what-label": "Proje tanımı",
      "purpose-label": "Proje amacı",
      "highlights-label": "Öne çıkanlar",
      "tech-label": "Teknolojiler",
      "view-project": "Projeyi aç",
      "view-source": "Kaynağı aç",
      "link-unavailable": "Bağlantı mevcut değil",
      "fallback-name": "İsimsiz proje",
      "fallback-type": "Tür bilgisi yok",
      "fallback-description": "Proje tanımı bulunamadı.",
      "fallback-purpose": "Proje amacı bulunamadı.",
      "fallback-highlight": "Öne çıkan bilgi bulunamadı.",
      "fallback-technology": "Teknoloji bilgisi yok"
    },
    states: {
      loading: {
        title: "Projeler yükleniyor",
        description: "Kart içerikleri hazırlanıyor."
      },
      empty: {
        title: "Listelenecek proje bulunamadı",
        description: "Proje veri kümesi şu anda boş görünüyor.",
        action: "Yeniden dene"
      },
      error: {
        title: "Proje verisi alınamadı",
        description: "Bağlantı veya dosya erişimi kaynaklı bir sorun oluştu.",
        action: "Tekrar yükle"
      },
      fallback: {
        title: "Yerel yedek veri kullanılıyor",
        description: "Dosyayı doğrudan açtığınız için (file://), gömülü yedek içerik gösteriliyor."
      }
    },
    about: {
      title: "GitHub Profili",
      description:
        "Tüm depolar ve yeni deneysel çalışmalar için GitHub profilimi ziyaret edebilirsiniz.",
      cta: "Tüm depoları görüntüle"
    },
    footer: {
      copy: "{{year}} Tercan Keskin. Tüm hakları saklıdır.",
      github: "GitHub profili"
    }
  },
  en: {
    a11y: {
      "skip-to-content": "Skip to main content"
    },
    brand: {
      kicker: "Personal Project Home",
      title: "Tercan Keskin"
    },
    navigation: {
      "primary-label": "Primary navigation",
      projects: "Projects",
      about: "About"
    },
    controls: {
      "group-label": "Display controls",
      "language-label": "Language selection",
      "switch-dark": "Switch to dark mode",
      "switch-light": "Switch to light mode"
    },
    hero: {
      title: "My projects: verified content, clear technology overview.",
      description:
        "All project cards on this page are prepared with verified information from their README documentation.",
      cta: "Explore projects",
      "summary-title": "Quick Overview",
      "summary-projects-label": "Featured projects",
      "summary-languages-label": "Language support",
      "summary-languages-value": "Turkish / English",
      "summary-themes-label": "Theme support",
      "summary-themes-value": "Light / Dark"
    },
    projects: {
      title: "Featured Projects",
      description:
        "Each card includes project definition, purpose, key highlights, technology stack, and links.",
      "type-label": "Type",
      "what-label": "Project definition",
      "purpose-label": "Project purpose",
      "highlights-label": "Highlights",
      "tech-label": "Technologies",
      "view-project": "Open project",
      "view-source": "Open source",
      "link-unavailable": "Link unavailable",
      "fallback-name": "Untitled project",
      "fallback-type": "Type unavailable",
      "fallback-description": "Project definition is unavailable.",
      "fallback-purpose": "Project purpose is unavailable.",
      "fallback-highlight": "Highlight is unavailable.",
      "fallback-technology": "Technology info unavailable"
    },
    states: {
      loading: {
        title: "Loading projects",
        description: "Preparing card content."
      },
      empty: {
        title: "No projects available",
        description: "The project dataset appears to be empty right now.",
        action: "Try again"
      },
      error: {
        title: "Failed to load project data",
        description: "A connection or file access issue occurred.",
        action: "Reload"
      },
      fallback: {
        title: "Local fallback data is active",
        description: "You opened this page via file://, so embedded fallback content is shown."
      }
    },
    about: {
      title: "GitHub Profile",
      description:
        "Visit my GitHub profile to explore all repositories and new experimental work.",
      cta: "View all repositories"
    },
    footer: {
      copy: "{{year}} Tercan Keskin. All rights reserved.",
      github: "GitHub profile"
    }
  }
};
const FALLBACK_PROJECTS = [
  {
    id: "terkip",
    name: {
      tr: "Terkip",
      en: "Terkip"
    },
    type: {
      tr: "Next.js web uygulaması",
      en: "Next.js web application"
    },
    description: {
      tr: "Gizlilik odaklı, hızlı ve hepsi bir arada kullanışlı web araçları koleksiyonu sunan modern bir Next.js uygulaması.",
      en: "A modern Next.js application that provides a privacy-focused, fast, all-in-one collection of practical web tools."
    },
    purpose: {
      tr: "Günlük iş akışında sık kullanılan araçları tek bir çatı altında toplayarak geliştirme ve içerik üretim süreçlerini hızlandırmak.",
      en: "To gather frequently used workflow tools in a single place and accelerate development and content creation processes."
    },
    highlights: {
      tr: [
        "Slug, JSON Formatter, Regex Tester, QR Code Generator ve Diff Checker dahil geniş araç seti.",
        "Türkçe/İngilizce tam lokalizasyon, URL yapısı dahil çoklu dil desteği.",
        "PWA desteği, favoriler, kullanım istatistikleri ve admin paneli özellikleri."
      ],
      en: [
        "Broad toolset including Slug, JSON Formatter, Regex Tester, QR Code Generator, and Diff Checker.",
        "Full Turkish/English localization including localized URL structures.",
        "PWA support, favorites, usage stats, and admin panel capabilities."
      ]
    },
    technologies: ["Next.js 16", "React 19", "TypeScript", "next-intl", "PostgreSQL", "Prisma 7"],
    url: "https://www.terkip.net",
    source: "https://github.com/tercan/terkip"
  },
  {
    id: "telkari",
    name: {
      tr: "Telkari",
      en: "Telkari"
    },
    type: {
      tr: "WordPress eklentisi",
      en: "WordPress plugin"
    },
    description: {
      tr: "Tema bağımsız sosyal medya bağlantıları yönetimi sağlayan, çoklu tasarım şablonlarına sahip bir WordPress eklentisi.",
      en: "A theme-independent WordPress plugin for managing social media links with multiple built-in design layouts."
    },
    purpose: {
      tr: "Sosyal medya hesaplarını site üzerinde esnek konumlandırma, platform bazlı renk yönetimi ve düzenli bir yönetim paneli ile sunmak.",
      en: "To present social accounts on-site with flexible positioning, per-platform color control, and a structured admin workflow."
    },
    highlights: {
      tr: [
        "Orbit, Ribbon ve Pillar olmak üzere üç tasarım şablonu ve şablona bağlı konum sistemi.",
        "13 platform için gömülü SVG ikon seti; CDN bağımlılığı yok.",
        "Sürükle-bırak sıralama, hesap etkinleştirme ve URL doğrulama içeren yönetim ekranı."
      ],
      en: [
        "Three layouts (Orbit, Ribbon, Pillar) with design-specific position options.",
        "Bundled SVG icon set for 13 platforms with no CDN dependency.",
        "Admin workflow with drag-and-drop ordering, account toggles, and URL validation."
      ]
    },
    technologies: ["PHP", "WordPress", "Vanilla JavaScript", "CSS", "SortableJS"],
    url: "https://tercan.github.io/telkari",
    source: "https://github.com/tercan/telkari"
  },
  {
    id: "tabibe",
    name: {
      tr: "Tabibe",
      en: "Tabibe"
    },
    type: {
      tr: "Chromium yeni sekme eklentisi",
      en: "Chromium new tab extension"
    },
    description: {
      tr: "Chromium tabanlı tarayıcılarda yeni sekme açılış deneyimini modern, minimalist ve yüksek performanslı bir üretkenlik alanına dönüştüren eklenti.",
      en: "An extension that turns the new tab experience in Chromium-based browsers into a modern, minimalist, high-performance productivity space."
    },
    purpose: {
      tr: "Yeni sekmeyi kişisel kontrol merkezi haline getirerek hızlı erişim, not alma ve arama akışlarını tek bir ekranda toplamak.",
      en: "To convert the new tab into a personal control hub by combining quick access, note taking, and search workflows in one screen."
    },
    highlights: {
      tr: [
        "Saat/tarih, speed dial ızgarası, not paneli ve çoklu arama motoru desteği.",
        "Sürükle-bırak ile site sıralama ve klasörleme, light/dark tema desteği.",
        "Arka plan özelleştirme, favicon/simple icons modu, JSON yedekleme ve geri yükleme."
      ],
      en: [
        "Clock/date widget, speed dial grid, notes panel, and multi-engine search support.",
        "Drag-and-drop ordering/foldering and full light/dark theme support.",
        "Background customization, favicon/simple icons mode, and JSON backup/restore."
      ]
    },
    technologies: ["React", "Vite", "Vanilla CSS", "Chrome Extension Manifest V3", "chrome.storage.local"],
    url: "https://tercan.github.io/tabibe",
    source: "https://github.com/tercan/tabibe"
  },
  {
    id: "wp-heading-buttons",
    name: {
      tr: "WP Heading Buttons",
      en: "WP Heading Buttons"
    },
    type: {
      tr: "WordPress düzenleyici eklentisi",
      en: "WordPress editor plugin"
    },
    description: {
      tr: "WordPress Classic Editor (TinyMCE) ve Gutenberg araç çubuklarına tek tıklamalı H1-H6 başlık butonları ekleyen eklenti.",
      en: "A plugin that adds one-click H1-H6 heading buttons to WordPress Classic Editor (TinyMCE) and Gutenberg toolbars."
    },
    purpose: {
      tr: "Başlık seviyeleri arasında hızlı geçiş sağlayarak yazım sürecini hızlandırmak ve editör deneyiminde tutarlılık sağlamak.",
      en: "To speed up writing workflows and keep heading formatting consistent with quick heading-level access."
    },
    highlights: {
      tr: [
        "Classic Editor ve Block Editor için başlık buton desteği.",
        "Ayar ekranından görünür başlık seviyelerini seçme imkanı.",
        "Gutenberg içindeki Classic Block için isteğe bağlı başlık buton desteği."
      ],
      en: [
        "Heading buttons for both Classic Editor and Block Editor workflows.",
        "Settings page to choose which heading levels are visible.",
        "Optional heading buttons inside the Classic block in Gutenberg."
      ]
    },
    technologies: ["PHP", "WordPress", "JavaScript", "TinyMCE", "Gutenberg", "CSS"],
    url: "https://github.com/tercan/wp-heading-buttons",
    source: "https://github.com/tercan/wp-heading-buttons"
  }
];

/**
 * 2. App state
 */
const appState = {
  translations: {},
  projects: [],
  language: "tr",
  theme: "light",
  observer: null,
  projectStatus: "idle",
  fallbackMode: false
};

/**
 * 3. Bootstrap
 */
document.addEventListener("DOMContentLoaded", () => {
  void initPage();
});

async function initPage() {
  setInitialPreferences();
  bindControls();
  applyTheme(appState.theme);

  await loadTranslations();
  applyTranslations();

  renderLoadingState();
  await loadProjects();
  renderProjects();
}

/**
 * 4. Data loading
 */
async function fetchJson(path) {
  const response = await fetch(path, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`Failed to load: ${path}`);
  }

  return response.json();
}

async function loadTranslations() {
  if (window.location.protocol === "file:") {
    appState.translations = cloneData(FALLBACK_TRANSLATIONS);
    appState.fallbackMode = true;
    return;
  }

  try {
    const [trData, enData] = await Promise.all([fetchJson(ENDPOINTS.tr), fetchJson(ENDPOINTS.en)]);
    appState.translations.tr = trData;
    appState.translations.en = enData;
  } catch {
    appState.translations = cloneData(FALLBACK_TRANSLATIONS);
    appState.fallbackMode = true;
  }
}

async function loadProjects() {
  if (window.location.protocol === "file:") {
    appState.projects = cloneData(FALLBACK_PROJECTS);
    appState.fallbackMode = true;
    updateProjectCount();
    return;
  }

  try {
    const payload = await fetchJson(ENDPOINTS.projects);
    appState.projects = Array.isArray(payload.projects) ? payload.projects : [];
  } catch {
    appState.projects = cloneData(FALLBACK_PROJECTS);
    appState.fallbackMode = true;
  }

  updateProjectCount();
}

function cloneData(data) {
  return JSON.parse(JSON.stringify(data));
}

/**
 * 5. Preferences and controls
 */
function setInitialPreferences() {
  const queryParams = new URLSearchParams(window.location.search);
  const queryLanguage = queryParams.get("lang");
  const savedLanguage = window.localStorage.getItem(STORAGE_KEYS.language);
  const browserLanguage = navigator.language.slice(0, 2).toLowerCase();

  appState.language =
    getFirstSupported([savedLanguage, queryLanguage, browserLanguage, "tr"], SUPPORTED_LANGUAGES) || "tr";

  const savedTheme = window.localStorage.getItem(STORAGE_KEYS.theme);
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

  appState.theme = getFirstSupported([savedTheme, systemTheme, "light"], SUPPORTED_THEMES) || "light";
}

function bindControls() {
  const languageButtons = document.querySelectorAll(".language-button");
  languageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const nextLanguage = button.getAttribute("data-language");

      if (!nextLanguage || nextLanguage === appState.language) {
        return;
      }

      appState.language = nextLanguage;
      window.localStorage.setItem(STORAGE_KEYS.language, appState.language);
      applyTranslations();
      rerenderProjectArea();
    });
  });

  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      appState.theme = appState.theme === "dark" ? "light" : "dark";
      window.localStorage.setItem(STORAGE_KEYS.theme, appState.theme);
      applyTheme(appState.theme);
      applyThemeControlLabel();
    });
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);

  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.setAttribute("aria-pressed", String(theme === "dark"));
  }
}

/**
 * 6. Localization
 */
function applyTranslations() {
  document.documentElement.setAttribute("lang", appState.language);

  const textNodes = document.querySelectorAll("[data-i18n]");
  textNodes.forEach((node) => {
    const key = node.getAttribute("data-i18n");
    if (!key) {
      return;
    }

    node.textContent = translate(key, { year: String(new Date().getFullYear()) });
  });

  const ariaNodes = document.querySelectorAll("[data-i18n-aria-label]");
  ariaNodes.forEach((node) => {
    const key = node.getAttribute("data-i18n-aria-label");
    if (!key) {
      return;
    }

    node.setAttribute("aria-label", translate(key));
  });

  applyThemeControlLabel();
  updateLanguageButtons();
  updateProjectCount();
}

function applyThemeControlLabel() {
  const themeToggle = document.getElementById("theme-toggle");
  if (!themeToggle) {
    return;
  }

  const nextThemeLabel = appState.theme === "dark" ? "controls.switch-light" : "controls.switch-dark";
  const translatedLabel = translate(nextThemeLabel);
  const textNode = themeToggle.querySelector(".control-text");

  if (textNode) {
    textNode.textContent = translatedLabel;
  }

  themeToggle.setAttribute("aria-label", translatedLabel);
}

function updateLanguageButtons() {
  const languageButtons = document.querySelectorAll(".language-button");
  languageButtons.forEach((button) => {
    const buttonLanguage = button.getAttribute("data-language");
    const isActive = buttonLanguage === appState.language;

    button.setAttribute("aria-pressed", String(isActive));
    button.setAttribute("aria-current", isActive ? "true" : "false");
  });
}

function translate(key, replacements = {}) {
  const activeDictionary = appState.translations[appState.language] || {};
  const fallbackDictionary = appState.translations.tr || {};
  const resolvedValue = readNestedValue(activeDictionary, key) || readNestedValue(fallbackDictionary, key) || key;

  if (typeof resolvedValue !== "string") {
    return key;
  }

  return resolvedValue.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, tokenName) => {
    return replacements[tokenName] || match;
  });
}

function readNestedValue(source, key) {
  return key.split(".").reduce((value, part) => {
    if (value && typeof value === "object" && Object.hasOwn(value, part)) {
      return value[part];
    }

    return undefined;
  }, source);
}

function getFirstSupported(values, supportedValues) {
  return values.find((value) => value && supportedValues.includes(value)) || null;
}

/**
 * 7. Project states and rendering
 */
function renderLoadingState() {
  const projectList = document.getElementById("project-list");

  if (!projectList) {
    return;
  }

  projectList.innerHTML = "";
  projectList.setAttribute("aria-busy", "true");

  for (let index = 0; index < 4; index += 1) {
    const skeletonItem = document.createElement("li");
    skeletonItem.className = "project-item";
    skeletonItem.innerHTML = `
      <article class="project-skeleton" aria-hidden="true">
        <span class="skeleton-block skeleton-block--title"></span>
        <span class="skeleton-block skeleton-block--copy"></span>
        <span class="skeleton-block skeleton-block--copy"></span>
        <span class="skeleton-block skeleton-block--copy"></span>
        <div class="tech-list">
          <span class="skeleton-chip"></span>
          <span class="skeleton-chip"></span>
          <span class="skeleton-chip"></span>
        </div>
      </article>
    `;

    projectList.appendChild(skeletonItem);
  }

  setStatePanel({
    variant: "loading",
    title: translate("states.loading.title"),
    description: translate("states.loading.description")
  });

  appState.projectStatus = "loading";
}

function renderProjects() {
  const projectList = document.getElementById("project-list");

  if (!projectList) {
    return;
  }

  projectList.innerHTML = "";

  if (appState.projects.length === 0) {
    renderEmptyState();
    return;
  }

  appState.projects.forEach((project, index) => {
    projectList.appendChild(createProjectNode(project, index));
  });

  projectList.setAttribute("aria-busy", "false");
  revealCards();

  if (appState.fallbackMode) {
    setStatePanel({
      variant: "fallback",
      title: translate("states.fallback.title"),
      description: translate("states.fallback.description")
    });
  } else {
    clearStatePanel();
  }

  appState.projectStatus = "ready";
}

function renderEmptyState() {
  const projectList = document.getElementById("project-list");
  if (projectList) {
    projectList.innerHTML = "";
    projectList.setAttribute("aria-busy", "false");
  }

  setStatePanel({
    variant: "empty",
    title: translate("states.empty.title"),
    description: translate("states.empty.description"),
    actionText: translate("states.empty.action"),
    onAction: () => {
      void reloadProjects();
    }
  });

  appState.projectStatus = "empty";
}

function renderErrorState() {
  const projectList = document.getElementById("project-list");
  if (projectList) {
    projectList.innerHTML = "";
    projectList.setAttribute("aria-busy", "false");
  }

  setStatePanel({
    variant: "error",
    title: translate("states.error.title"),
    description: translate("states.error.description"),
    actionText: translate("states.error.action"),
    onAction: () => {
      void reloadProjects();
    }
  });

  appState.projectStatus = "error";
}

function setStatePanel({ variant, title, description, actionText = "", onAction = null }) {
  const projectState = document.getElementById("project-state");

  if (!projectState) {
    return;
  }

  projectState.innerHTML = "";

  const panel = document.createElement("article");
  panel.className = `project-state-panel project-state-panel--${variant}`;

  const heading = document.createElement("h3");
  heading.className = "project-state-title";
  heading.textContent = title;

  const paragraph = document.createElement("p");
  paragraph.className = "project-state-text";
  paragraph.textContent = description;

  panel.append(heading, paragraph);

  if (actionText && typeof onAction === "function") {
    const actionButton = document.createElement("button");
    actionButton.type = "button";
    actionButton.className = "project-state-action";
    actionButton.textContent = actionText;
    actionButton.addEventListener("click", onAction);
    panel.appendChild(actionButton);
  }

  projectState.appendChild(panel);
}

function clearStatePanel() {
  const projectState = document.getElementById("project-state");
  if (projectState) {
    projectState.innerHTML = "";
  }
}

function rerenderProjectArea() {
  switch (appState.projectStatus) {
    case "ready":
      renderProjects();
      break;
    case "empty":
      renderEmptyState();
      break;
    case "error":
      renderErrorState();
      break;
    case "loading":
      renderLoadingState();
      break;
    default:
      if (appState.projects.length > 0) {
        renderProjects();
      }
      break;
  }
}

async function reloadProjects() {
  renderLoadingState();

  try {
    await loadProjects();
    renderProjects();
  } catch {
    renderErrorState();
  }
}

function createProjectNode(project, index) {
  const localizedProject = resolveLocalizedProject(project);

  const listItem = document.createElement("li");
  listItem.className = "project-item";

  const card = document.createElement("article");
  card.className = "project-card";
  card.style.transitionDelay = `${index * 0.05}s`;

  const cardHeader = document.createElement("header");
  cardHeader.className = "project-card-head";

  const projectTitle = document.createElement("h3");
  projectTitle.className = "project-title";
  projectTitle.textContent = localizedProject.name;

  const projectType = document.createElement("p");
  projectType.className = "project-type";
  projectType.textContent = `${translate("projects.type-label")}: ${localizedProject.type}`;

  cardHeader.append(projectTitle, projectType);

  const definitionBlock = createTextBlock(
    "project-definition",
    translate("projects.what-label"),
    localizedProject.description
  );

  const purposeBlock = createTextBlock(
    "project-purpose",
    translate("projects.purpose-label"),
    localizedProject.purpose
  );

  const highlightBlock = createHighlightBlock(localizedProject.highlights);
  const technologyBlock = createTechnologyBlock(localizedProject.technologies);
  const actionBlock = createActionBlock(localizedProject);

  card.append(cardHeader, definitionBlock, purposeBlock, highlightBlock, technologyBlock, actionBlock);
  listItem.appendChild(card);

  return listItem;
}

function createTextBlock(blockClassName, title, content) {
  const container = document.createElement("section");
  container.className = `project-content-block ${blockClassName}`;

  const heading = document.createElement("h4");
  heading.className = "project-block-title";
  heading.textContent = title;

  const paragraph = document.createElement("p");
  paragraph.className = "project-block-text";
  paragraph.textContent = content;

  container.append(heading, paragraph);
  return container;
}

function createHighlightBlock(highlights) {
  const container = document.createElement("section");
  container.className = "project-content-block project-highlights";

  const heading = document.createElement("h4");
  heading.className = "project-block-title";
  heading.textContent = translate("projects.highlights-label");

  const list = document.createElement("ul");
  list.className = "project-highlight-list";

  highlights.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.className = "project-highlight-item";
    listItem.textContent = item;
    list.appendChild(listItem);
  });

  container.append(heading, list);
  return container;
}

function createTechnologyBlock(technologies) {
  const container = document.createElement("section");
  container.className = "project-content-block project-technologies";

  const heading = document.createElement("h4");
  heading.className = "project-block-title";
  heading.textContent = translate("projects.tech-label");

  const list = document.createElement("ul");
  list.className = "tech-list";

  technologies.forEach((technology) => {
    const item = document.createElement("li");
    item.className = "tech-item";
    item.textContent = technology;
    list.appendChild(item);
  });

  container.append(heading, list);
  return container;
}

function createActionBlock(project) {
  const actionWrapper = document.createElement("div");
  actionWrapper.className = "project-actions";

  const projectLink = buildActionLink(project.url, translate("projects.view-project"));
  const sourceLink = buildActionLink(project.source, translate("projects.view-source"), project.url);

  if (projectLink) {
    actionWrapper.appendChild(projectLink);
  } else {
    const unavailableButton = document.createElement("button");
    unavailableButton.type = "button";
    unavailableButton.disabled = true;
    unavailableButton.className = "project-link";
    unavailableButton.textContent = translate("projects.link-unavailable");
    actionWrapper.appendChild(unavailableButton);
  }

  if (sourceLink) {
    actionWrapper.appendChild(sourceLink);
  }

  return actionWrapper;
}

function buildActionLink(url, label, skipIfSameAs = "") {
  if (!url || url === skipIfSameAs) {
    return null;
  }

  const link = document.createElement("a");
  link.className = "project-link";
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = label;

  return link;
}

function resolveLocalizedProject(project) {
  const fallbackLanguage = appState.language === "tr" ? "en" : "tr";

  const localizedName = resolveLocalizedField(project.name, fallbackLanguage, translate("projects.fallback-name"));
  const localizedType = resolveLocalizedField(project.type, fallbackLanguage, translate("projects.fallback-type"));
  const localizedDescription = resolveLocalizedField(
    project.description,
    fallbackLanguage,
    translate("projects.fallback-description")
  );
  const localizedPurpose = resolveLocalizedField(
    project.purpose,
    fallbackLanguage,
    translate("projects.fallback-purpose")
  );
  const localizedHighlights = resolveLocalizedList(
    project.highlights,
    fallbackLanguage,
    translate("projects.fallback-highlight")
  );

  return {
    name: localizedName,
    type: localizedType,
    description: localizedDescription,
    purpose: localizedPurpose,
    highlights: localizedHighlights,
    technologies:
      Array.isArray(project.technologies) && project.technologies.length > 0
        ? project.technologies
        : [translate("projects.fallback-technology")],
    url: typeof project.url === "string" ? project.url : "",
    source: typeof project.source === "string" ? project.source : ""
  };
}

function resolveLocalizedField(value, fallbackLanguage, fallbackText) {
  if (typeof value === "string") {
    return value;
  }

  if (!value || typeof value !== "object") {
    return fallbackText;
  }

  return value[appState.language] || value[fallbackLanguage] || fallbackText;
}

function resolveLocalizedList(value, fallbackLanguage, fallbackText) {
  if (Array.isArray(value) && value.length > 0) {
    return value;
  }

  if (!value || typeof value !== "object") {
    return [fallbackText];
  }

  const preferredList = value[appState.language];
  if (Array.isArray(preferredList) && preferredList.length > 0) {
    return preferredList;
  }

  const fallbackList = value[fallbackLanguage];
  if (Array.isArray(fallbackList) && fallbackList.length > 0) {
    return fallbackList;
  }

  return [fallbackText];
}

function updateProjectCount() {
  const counters = document.querySelectorAll("[data-project-count]");
  counters.forEach((counter) => {
    counter.textContent = String(appState.projects.length);
  });
}

/**
 * 8. Motion and observers
 */
function revealCards() {
  const cards = document.querySelectorAll(".project-card");

  if (appState.observer) {
    appState.observer.disconnect();
    appState.observer = null;
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    cards.forEach((card) => {
      card.classList.add("is-visible");
    });

    return;
  }

  appState.observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.2
    }
  );

  cards.forEach((card) => {
    appState.observer.observe(card);
  });
}
