export function initializeHeroSlideshow() {

    // Prefer the global slideshow; use hero slides as fallback
    const globalSlides = document.querySelectorAll(".site-slide");
    const heroSlides = document.querySelectorAll(".hero-slide");

    const slides = globalSlides.length > 0
        ? globalSlides
        : heroSlides;

    if (slides.length === 0) {
        console.error("Slideshow: No slides found.");
        return;
    }

    let currentIndex = 0;

    slides.forEach((slide, index) => {
        slide.classList.toggle("active", index === 0);
    });

    setInterval(() => {
        slides[currentIndex].classList.remove("active");

        currentIndex = (currentIndex + 1) % slides.length;

        slides[currentIndex].classList.add("active");
    }, 5000);

    console.log(
        globalSlides.length > 0
            ? "Global website slideshow started."
            : "Hero slideshow started."
    );
}
