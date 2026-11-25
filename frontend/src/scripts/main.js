import {
    initializeNavigation,
    initializeCategoryCarousel
} from "./navigation.js";

import { initializeQuoteSection } from "./quote.js";
import { initializeHeroSlideshow } from "./slideshow.js";

async function loadComponent(selector, path) {
    const container = document.querySelector(selector);

    if (!container) {
        throw new Error(`Container not found: ${selector}`);
    }

    const response = await fetch(path);

    if (!response.ok) {
        throw new Error(`Failed to load: ${path}`);
    }

    container.insertAdjacentHTML(
        "beforeend",
        await response.text()
    );
}

async function initializeApp() {
    try {
        await loadComponent("#app", "./src/components/navbar/navbar.html");
        await loadComponent("#app", "./src/pages/home/home.html");
        await loadComponent("#app", "./src/pages/home/categories.html");
        await loadComponent("#app", "./src/pages/home/quote.html");
        await loadComponent("#app", "./src/pages/home/gallery.html");
        await loadComponent("#app", "./src/components/footer/footer.html");

        initializeNavigation();
        initializeCategoryCarousel();
        initializeQuoteSection();
        initializeHeroSlideshow();

        console.log("JP Smart Tech Labs initialized successfully!");

    } catch (error) {
        console.error("Application initialization failed:", error);
    }
}

initializeApp();
