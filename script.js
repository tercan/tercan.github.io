const translations = {
  tr: {
    aboutTitle: "Tercan Keskin — Bir web geliştiricisinin kişisel projeleri",
    aboutDescription: "Merhaba! Ben Tercan. Uzun yıllardır web geliştirme, WordPress tema ve eklenti yazarlığı gibi konular üzerine çalışıyorum. Kullanıcıların işlerini kolaylaştıran, pratik ve gizlilik odaklı araçlar geliştirmeyi seviyorum.",
    roleDev: "Web Geliştirici",
    roleWordPress: "WordPress Sever",
    rolePoet: "Şair",
    roleDad: "Baba",
    roleHuman: "İnsan",
    personalWebsite: "Kişisel Web Sitem",
    projectsTitle: "Projeler",
    badgeWebTool: "Web Aracı",
    badgeWordPress: "WordPress Eklentisi",
    badgeExtension: "Tarayıcı Eklentisi",
    terkipDesc: "Geliştiriciler, tasarımcılar ve içerik üreticileri için pratik, hızlı ve gizlilik odaklı tümleşik web araçları koleksiyonu.",
    telkariDesc: "Tema bağımsız WordPress sosyal medya bağlantıları yönetim eklentisi. 3 farklı tasarım şablonu, sürükle-bırak sıralama ve 13 platform desteği.",
    tabibeDesc: "Her yeni sekmeyi kişisel bir verimlilik merkezine dönüştüren modern, minimalist Chrome uzantısı. Hızlı erişim ızgarası, çoklu arama motoru ve 10 dil desteği.",
    wpHeadingDesc: "WordPress Classic Editor ve Gutenberg (Block Editor) için tek tıklama ile başlık düğmeleri (H1-H6) ekleyen eklenti.",
    visitSite: "Siteyi Ziyaret Et",
    viewProject: "Projeyi Görüntüle",
    viewOnGitHub: "GitHub'da İncele",
    contactTitle: "İletişim",
    contactText: "Soru, görüş ve önerileriniz için aşağıdaki kanallardan benimle iletişime geçebilirsiniz.",
    personalSite: "Kişisel Site",
    companySite: "Kurumsal Site",
    copyright: "Tercan Keskin",
    toggleLanguage: "Dili değiştir",
    toggleTheme: "Temayı değiştir"
  },
  en: {
    aboutTitle: "Tercan Keskin — A web developer's personal projects",
    aboutDescription: "Hi! I'm Tercan. I've been working in web development, WordPress theme and plugin writing, for many, many years. I enjoy developing practical, privacy-focused tools that make things easier for users.",
    roleDev: "Software Developer",
    roleWordPress: "WordPress Lover",
    rolePoet: "Poet",
    roleDad: "Dad",
    roleHuman: "Human",
    personalWebsite: "My Website",
    projectsTitle: "Projects",
    badgeWebTool: "Web Tool",
    badgeWordPress: "WordPress Plugin",
    badgeExtension: "Browser Extension",
    terkipDesc: "A collection of privacy-focused, fast, all-in-one useful web tools for developers, designers, and content creators.",
    telkariDesc: "Theme-independent WordPress social media links management plugin. 3 design templates, drag-and-drop sorting, and 13 platform support.",
    tabibeDesc: "A modern, minimalist Chrome extension that transforms every new tab into a personal productivity hub. Quick access grid, multiple search engines, and 10 language support.",
    wpHeadingDesc: "Add one-click heading buttons (H1-H6) to the WordPress Classic Editor and Gutenberg (Block Editor).",
    visitSite: "Visit Site",
    viewProject: "View Project",
    viewOnGitHub: "View on GitHub",
    contactTitle: "Contact",
    contactText: "For questions, comments, and suggestions, you can contact me through the following channels.",
    personalSite: "Personal Site",
    companySite: "Company Site",
    copyright: "Tercan Keskin",
    toggleLanguage: "Toggle language",
    toggleTheme: "Toggle theme"
  }
};

function getStoredTheme() {
  return localStorage.getItem("theme");
}

function getStoredLang() {
  return localStorage.getItem("lang") || "tr";
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

function setLang(lang) {
  document.documentElement.setAttribute("lang", lang);
  document.documentElement.setAttribute("data-lang", lang);
  localStorage.setItem("lang", lang);
  updateTranslations();
}

function updateTranslations() {
  const lang = getStoredLang();
  const elements = document.querySelectorAll("[data-i18n]");
  elements.forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
  const ariaElements = document.querySelectorAll("[data-i18n-aria-label]");
  ariaElements.forEach((el) => {
    const key = el.getAttribute("data-i18n-aria-label");
    if (translations[lang][key]) {
      el.setAttribute("aria-label", translations[lang][key]);
    }
  });
}

function initTheme() {
  const stored = getStoredTheme();
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = stored || (prefersDark ? "dark" : "light");
  setTheme(theme);
}

function initLang() {
  const stored = getStoredLang();
  setLang(stored);
}

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initLang();

  const themeToggle = document.querySelector(".theme-toggle");
  themeToggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    setTheme(next);
  });

  const langToggle = document.querySelector(".lang-toggle");
  langToggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-lang");
    const next = current === "tr" ? "en" : "tr";
    setLang(next);
  });
});
