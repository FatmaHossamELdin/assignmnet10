let themeButton = document.getElementById("theme-toggle-button");
let htmlElement = document.documentElement;
let savedTheme = localStorage.getItem("theme");
let savedFont = localStorage.getItem("fontName");

if (savedTheme === "dark") {
  htmlElement.classList.add("dark");
} else {
  htmlElement.classList.remove("dark");
}

themeButton.addEventListener("click", function () {
  let isDark = htmlElement.classList.contains("dark");
  if (isDark) {
    htmlElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  } else {
    htmlElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }
});

/********************** settings **********************/

let settingsToggle = document.getElementById("settings-toggle");
let settingsSidebar = document.getElementById("settings-sidebar");
let closeSettings = document.getElementById("close-settings");
let fontOptions = document.querySelectorAll(".font-option");
let body = document.querySelector("body");
let root = document.documentElement;
let resetSettings = document.getElementById("reset-settings");
let availableFonts = ["alexandria", "tajawal", "cairo"];
let colors = [
  { primary: "#6366f1", secondary: "#8b5cf6" },
  { primary: "#ec4899", secondary: "#f97316" },
  { primary: "#10b981", secondary: "#059669" },
  { primary: "#3b82f6", secondary: "#06b6d4" },
  { primary: "#ef4444", secondary: "#f43f5e" },
  { primary: "#f59e0b", secondary: "#ea580c" },
];
let themeColorsGrid = document.getElementById("theme-colors-grid");
addColorButtons();
alterFont();
resetSettings.addEventListener("click", function () {
  for (let i = 0; i < availableFonts.length; i++) {
    body.classList.remove("font-" + availableFonts[i]);
  }
  body.classList.add("font-tajawal");
  for (let i = 0; i < fontOptions.length; i++) {
    if (fontOptions[i].getAttribute("data-font") === "tajawal") {
      fontOptions[i].classList.add(
        "active",
        "border-primary",
        "bg-slate-50",
        "dark:bg-slate-800",
      );

      fontOptions[i].classList.remove(
        "border-slate-200",
        "dark:border-slate-700",
      );
    } else {
      fontOptions[i].classList.remove(
        "active",
        "border-primary",
        "bg-slate-50",
        "dark:bg-slate-800",
      );

      fontOptions[i].classList.add("border-slate-200", "dark:border-slate-700");
    }
  }
  root.style.setProperty("--color-primary", colors[0].primary);
  root.style.setProperty("--color-secondary", colors[0].secondary);

  let themeColorButtons = themeColorsGrid.querySelectorAll(".theme-color");

  for (let i = 1; i < themeColorButtons.length; i++) {
    themeColorButtons[i].classList.remove(
      "ring-2",
      "ring-primary",
      "ring-offset-2",
      "ring-offset-white",
      "dark:ring-offset-slate-900",
    );
  }
  themeColorButtons[0].classList.add(
    "ring-2",
    "ring-primary",
    "ring-offset-2",
    "ring-offset-white",
    "dark:ring-offset-slate-900",
  );

  localStorage.removeItem("fontName");
  localStorage.removeItem("themeColors");
});
settingsToggle.addEventListener("click", function () {
  settingsSidebar.classList.remove("translate-x-full");
});

closeSettings.addEventListener("click", function () {
  settingsSidebar.classList.add("translate-x-full");
});

function alterFont() {
  if (savedFont) {
    if (savedFont != "tajawal") {
      body.classList.remove("font-tajawal");
      body.classList.add("font-" + savedFont);
    }
  }
  for (let i = 0; i < fontOptions.length; i++) {
    let fontName = fontOptions[i].getAttribute("data-font");

    if (fontName === (savedFont || "tajawal")) {
      fontOptions[i].classList.add(
        "active",
        "border-primary",
        "bg-slate-50",
        "dark:bg-slate-800",
      );
      fontOptions[i].classList.remove(
        "border-slate-200",
        "dark:border-slate-700",
      );
    } else {
      fontOptions[i].classList.remove(
        "active",
        "border-primary",
        "bg-slate-50",
        "dark:bg-slate-800",
      );
      fontOptions[i].classList.add("border-slate-200", "dark:border-slate-700");
    }

    fontOptions[i].addEventListener("click", function (e) {
      let selectedFont = this.getAttribute("data-font");

      for (let j = 0; j < availableFonts.length; j++) {
        body.classList.remove("font-" + availableFonts[j]);
      }

      body.classList.add("font-" + selectedFont);

      localStorage.setItem("fontName", selectedFont);

      for (let j = 0; j < fontOptions.length; j++) {
        fontOptions[j].classList.remove(
          "active",
          "border-primary",
          "bg-slate-50",
          "dark:bg-slate-800",
        );
        fontOptions[j].classList.add(
          "border-slate-200",
          "dark:border-slate-700",
        );
      }

      this.classList.add(
        "active",
        "border-primary",
        "bg-slate-50",
        "dark:bg-slate-800",
      );
      this.classList.remove("border-slate-200", "dark:border-slate-700");

      savedFont = selectedFont;
    });
  }
}

function addColorButtons() {
  let savedThemeColor = JSON.parse(localStorage.getItem("themeColors"));

  if (savedThemeColor) {
    root.style.setProperty("--color-primary", savedThemeColor.primary);
    root.style.setProperty("--color-secondary", savedThemeColor.secondary);
  }
  let box = "";
  for (let i = 0; i < colors.length; i++) {
    let isSelected =
      savedThemeColor && savedThemeColor.primary === colors[i].primary;
    let selectedStr = isSelected
      ? "ring-2 ring-primary ring-offset-2 ring-offset-white dark:ring-offset-slate-900"
      : "";

    box += `
    <button
                type="button" onclick="changeThemeColor(${i})"
                class="theme-color w-12 h-12 rounded-full cursor-pointer transition-transform hover:scale-110 border-2 border-slate-200 dark:border-slate-700 hover:border-primary shadow-sm  ${selectedStr}"
                style="background-color: ${colors[i].primary}"
              ></button>
              `;
  }
  themeColorsGrid.innerHTML = box;
  let themeColorButtons = themeColorsGrid.querySelectorAll(".theme-color");
  for (let i = 0; i < themeColorButtons.length; i++) {
    themeColorButtons[i].addEventListener("click", function (e) {
      for (let j = 0; j < themeColorButtons.length; j++) {
        themeColorButtons[j].classList.remove(
          "ring-2",
          "ring-primary",
          "ring-offset-2",
          "ring-offset-white",
          "dark:ring-offset-slate-900",
        );
      }

      this.classList.add(
        "ring-2",
        "ring-primary",
        "ring-offset-2",
        "ring-offset-white",
        "dark:ring-offset-slate-900",
      );
    });
  }
}

function changeThemeColor(index) {
  let selectedColor = colors[index];
  let root = document.documentElement;

  root.style.setProperty("--color-primary", selectedColor.primary);
  root.style.setProperty("--color-secondary", selectedColor.secondary);

  localStorage.setItem("themeColors", JSON.stringify(selectedColor));
}
/********************** active navabr scrol to top **********************/
let navLinks = document.querySelectorAll(".nav-links a");
let sections = document.querySelectorAll("section");
let scrollToTop = document.getElementById("scroll-to-top");

window.addEventListener("scroll", function () {
  let currentSection = "";
  let header = document.getElementById("header");

  for (let i = 0; i < sections.length; i++) {
    if (sections[i].getBoundingClientRect().top <= header.offsetHeight)
      currentSection = sections[i].getAttribute("id");
  }
  for (let i = 0; i < navLinks.length; i++) {
    if (navLinks[i].getAttribute("href") === "#" + currentSection) {
      navLinks[i].classList.add("active", "text-primary", "font-bold");
      for (let j = 0; j < navLinks.length; j++) {
        if (j != i) {
          navLinks[j].classList.remove("active", "text-primary", "font-bold");
        }
      }
    }
  }
  if (window.scrollY > 300) {
    scrollToTop.classList.remove("invisible", "opacity-0");
  } else {
    scrollToTop.classList.add("invisible", "opacity-0");
  }
});

scrollToTop.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

/********************** nav and tabs **********************/
let portofolioFilters = document.querySelectorAll(".portfolio-filter");
let portfolioItems = document.querySelectorAll(".portfolio-item");

for (let i = 0; i < portofolioFilters.length; i++) {
  portofolioFilters[i].addEventListener("click", function () {
    let selectedFilter = portofolioFilters[i].dataset.filter;
    for (let j = 0; j < portofolioFilters.length; j++) {
      portofolioFilters[j].classList.remove(
        "active",
        "bg-linear-to-r",
        "from-primary",
        "to-secondary",
        "text-white",
      );

      portofolioFilters[j].classList.add(
        "bg-white",
        "dark:bg-slate-800",
        "text-slate-600",
        "dark:text-slate-300",
        "border",
        "border-slate-300",
        "dark:border-slate-700",
      );
    }

    portofolioFilters[i].classList.add(
      "active",
      "bg-linear-to-r",
      "from-primary",
      "to-secondary",
      "text-white",
    );

    portofolioFilters[i].classList.remove(
      "bg-white",
      "dark:bg-slate-800",
      "text-slate-600",
      "dark:text-slate-300",
      "border",
      "border-slate-300",
      "dark:border-slate-700",
    );
    for (let j = 0; j < portfolioItems.length; j++) {
      let itemCategory = portfolioItems[j].dataset.category;

      if (selectedFilter === "all" || itemCategory === selectedFilter) {
        portfolioItems[j].classList.remove("hidden");
      } else {
        portfolioItems[j].classList.add("hidden");
      }
    }
  });
}

/**********************  carousel **********************/

let carousel = document.getElementById("testimonials-carousel");
let cards = carousel.querySelectorAll(".testimonial-card");
let nextBtn = document.getElementById("next-testimonial");
let prevBtn = document.getElementById("prev-testimonial");
let indicators = document.querySelectorAll(".carousel-indicator");

let currentIndex = 0;
let cardsPerView = 1;

function updateCardsPerView() {
  if (window.innerWidth >= 1024) {
    cardsPerView = 3;
  } else if (window.innerWidth >= 640) {
    cardsPerView = 2;
  } else {
    cardsPerView = 1;
  }
}

function getMaxIndex() {
  return cards.length - cardsPerView;
}

function updateCarousel() {
  updateCardsPerView();
  let percent = 100 / cardsPerView;
  let translateValue = currentIndex * percent;

  carousel.style.transform = `translateX(${translateValue}%)`;

  for (let i = 0; i < indicators.length; i++) {
    let indicator = indicators[i];
    let isActive = i === currentIndex || (currentIndex > 3 && i === 3);

    if (isActive) {
      indicator.classList.add("bg-accent");
      indicator.classList.remove("bg-slate-400", "dark:bg-slate-600");
      indicator.setAttribute("aria-selected", "true");
    } else {
      indicator.classList.remove("bg-accent");
      indicator.classList.add("bg-slate-400", "dark:bg-slate-600");
      indicator.setAttribute("aria-selected", "false");
    }
  }
}

function next() {
  let maxIndex = getMaxIndex();
  if (currentIndex == maxIndex) {
    currentIndex = 0;
  } else {
    currentIndex++;
  }
  updateCarousel();
}

function prev() {
  let maxIndex = getMaxIndex();
  if (currentIndex == 0) {
    currentIndex = maxIndex;
  } else {
    currentIndex--;
  }
  updateCarousel();
}

nextBtn.addEventListener("click", next);
prevBtn.addEventListener("click", prev);

for (let i = 0; i < indicators.length; i++) {
  indicators[i].addEventListener("click", function () {
    currentIndex = i;
    updateCarousel();
  });
}

window.addEventListener("resize", updateCarousel());
updateCarousel();
