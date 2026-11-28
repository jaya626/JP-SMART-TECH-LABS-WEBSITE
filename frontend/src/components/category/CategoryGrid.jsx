
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./CategoryGrid.css";

const categories = [
  {
    id: "custom-enclosures",
    number: "01",
    name: "Custom Enclosures",
    description:
      "Precision-designed enclosures for electronic components and equipment.",
    image: "/images/Categories/custom-enclosures.png",
  },
  {
    id: "mounting-brackets",
    number: "02",
    name: "Mounting Brackets",
    description:
      "Reliable mounting solutions engineered for secure installation and support.",
    image: "/images/Categories/mounting-brackets.png",
  },
  {
    id: "sensor-housings",
    number: "03",
    name: "Sensor Housings",
    description:
      "Protective housing solutions for sensors and industrial applications.",
    image: "/images/Categories/sensor-housings.png",
  },
  {
    id: "gear-kits",
    number: "04",
    name: "Gear Kits",
    description:
      "Precision gear components and kits for mechanical applications.",
    image: "/images/Categories/gear-kits.png",
  },
];

function CategoryGrid() {
  const scrollRef = useRef(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateArrows = () => {
    const container = scrollRef.current;
    if (!container) return;

    const hasOverflow =
      container.scrollWidth > container.clientWidth + 2;

    setCanScrollLeft(
      hasOverflow && container.scrollLeft > 2
    );

    setCanScrollRight(
      hasOverflow &&
        container.scrollLeft + container.clientWidth <
          container.scrollWidth - 2
    );
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    updateArrows();

    container.addEventListener("scroll", updateArrows, {
      passive: true,
    });

    const resizeObserver = new ResizeObserver(updateArrows);
    resizeObserver.observe(container);

    window.addEventListener("resize", updateArrows);

    return () => {
      container.removeEventListener("scroll", updateArrows);
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateArrows);
    };
  }, []);

  const scrollCategories = (direction) => {
    const container = scrollRef.current;
    if (!container) return;

    const card = container.querySelector(".category-card");
    const gap = parseFloat(
      window.getComputedStyle(container).columnGap
    ) || 24;

    const cardWidth = card
      ? card.getBoundingClientRect().width
      : 300;

    container.scrollBy({
      left: direction * (cardWidth + gap),
      behavior: "smooth",
    });
  };

  return (
    <section className="category-section" id="categories">
      <div className="category-section-container">

        {/* SECTION HEADING */}
        <div className="category-section-heading">
          <div className="category-heading-content">
            <span className="category-eyebrow">
              EXPLORE OUR COLLECTION
            </span>

            <h2>
              Explore Our <span>Categories</span>
            </h2>

            <p>
              Discover our carefully curated product collections,
              designed to meet your technical and industrial needs.
            </p>
          </div>

          {/* HEADING ACTIONS */}
          <div className="category-heading-actions">
            <span className="category-total">
              {String(categories.length).padStart(2, "0")} CATEGORIES
            </span>

            {canScrollLeft && (
              <button
                className="category-scroll-btn"
                type="button"
                onClick={() => scrollCategories(-1)}
                aria-label="Scroll categories left"
              >
                ←
              </button>
            )}

            {canScrollRight && (
              <button
                className="category-scroll-btn"
                type="button"
                onClick={() => scrollCategories(1)}
                aria-label="Scroll categories right"
              >
                →
              </button>
            )}
          </div>
        </div>

        {/* CATEGORY CARDS */}
        <div className="category-scroll-wrapper">
          <div className="category-grid" ref={scrollRef}>
            {categories.map((category) => (
              <article
                className="category-card"
                key={category.id}
              >
                <Link
                  to={`/shop?category=${category.id}`}
                  className="category-card-image"
                  aria-label={`Explore ${category.name}`}
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    loading="lazy"
                  />

                  <span className="category-card-number">
                    {category.number}
                  </span>

                  <span className="category-card-arrow">
                    ↗
                  </span>
                </Link>

                <div className="category-card-content">
                  <h3>{category.name}</h3>

                  <p>{category.description}</p>

                  <Link
                    to={`/shop?category=${category.id}`}
                    className="category-card-link"
                  >
                    Explore Category <span>→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default CategoryGrid;
