/* =================================
   JP SMART TECH LABS
   NAVIGATION JAVASCRIPT
================================= */

export function initializeNavigation() {
    const menuToggle = document.querySelector("#menu-toggle");
    const navMenu = document.querySelector("#nav-menu");

    if (!menuToggle || !navMenu) {
        return;
    }

    menuToggle.addEventListener("click", () => {
        const isExpanded =
            menuToggle.getAttribute("aria-expanded") === "true";

        menuToggle.setAttribute(
            "aria-expanded",
            String(!isExpanded)
        );

        navMenu.classList.toggle("active");
    });

    navMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}

export function initializeCategoryCarousel() {
    const grid = document.querySelector(".categories-grid");
    const previous = document.querySelector("#category-prev");
    const next = document.querySelector("#category-next");

    if (!grid || !previous || !next) return;

    const updateButtons = () => {
        previous.disabled = grid.scrollLeft <= 2;

        next.disabled =
            grid.scrollLeft + grid.clientWidth >= grid.scrollWidth - 2;
    };

    const scrollCards = (direction) => {
        const card = grid.querySelector(".category-card");
        if (!card) return;

        const gap = parseFloat(getComputedStyle(grid).gap) || 0;
        const distance = card.getBoundingClientRect().width + gap;

        grid.scrollBy({
            left: direction * distance,
            behavior: "smooth"
        });
    };

    previous.addEventListener("click", () => scrollCards(-1));
    next.addEventListener("click", () => scrollCards(1));

    grid.addEventListener("scroll", updateButtons);
    window.addEventListener("resize", updateButtons);

    updateButtons();
}


