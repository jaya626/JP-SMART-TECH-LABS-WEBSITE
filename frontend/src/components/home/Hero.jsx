
import { useEffect, useState } from "react";
import "./Hero.css";

const slides = [
  {
    image: "/images/Hero/hero-1.png",
    title: <>Technology That<br />Moves You Forward.</>,
    description:
      "Discover innovative products and smarter solutions designed to make everyday life better.",
    button: "Explore Products",
    link: "/shop",
  },
  {
    image: "/images/Hero/hero-2.png",
    title: <>Building Ideas Into<br />Reality.</>,
    description:
      "We bring creativity, technology and innovation together to create meaningful solutions.",
    button: "Discover More",
    link: "/services",
  },
  {
    image: "/images/Hero/hero-3.png",
    title: <>Smarter Products.<br />Better Possibilities.</>,
    description:
      "Explore products that combine quality, performance and modern technology.",
    button: "View Collection",
    link: "/shop",
  },
  {
    image: "/images/Hero/hero-4.png",
    title: <>Precision Meets<br />Performance.</>,
    description:
      "Experience reliable products and carefully selected materials built around your needs.",
    button: "Explore Materials",
    link: "/materials",
  },
  {
    image: "/images/Hero/hero-5.png",
    title: <>Innovate. Build.<br />Automate.</>,
    description:
      "Step into a world of technology where innovation creates new opportunities.",
    button: "Get Started",
    link: "/services",
  },
];

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Automatically change slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((previousSlide) =>
        (previousSlide + 1) % slides.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const activeSlide = slides[currentSlide];

  return (
    <section className="hero">

      {/* BACKGROUND SLIDESHOW */}
      <div className="hero-background">
        {slides.map((slide, index) => (
          <div
            key={slide.image}
            className={`hero-slide ${
              currentSlide === index ? "active" : ""
            }`}
            style={{
              backgroundImage: `url("${slide.image}")`,
            }}
          />
        ))}
      </div>

      {/* DARK OVERLAY */}
      <div className="hero-overlay"></div>

      {/* HERO CONTENT */}
      <div className="hero-container">
        <div className="hero-content" key={currentSlide}>

          <span className="hero-tag">
            WELCOME TO JP SMART TECH LABS
          </span>

          <h1 className="hero-title">
            {activeSlide.title}
          </h1>

          <p className="hero-description">
            {activeSlide.description}
          </p>

          <div className="hero-buttons">
            <a
              href={activeSlide.link}
              className="hero-primary-btn"
            >
              {activeSlide.button}
              <span>→</span>
            </a>

            <a
              href="/contact"
              className="hero-secondary-btn"
            >
              Contact Us
            </a>
          </div>

        </div>
      </div>

      {/* SLIDE INDICATORS - NO COUNTER OR ARROWS */}
      <div className="hero-indicators">
        {slides.map((slide, index) => (
          <button
            key={slide.image}
            className={`hero-dot ${
              currentSlide === index ? "active" : ""
            }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={currentSlide === index ? "true" : undefined}
          />
        ))}
      </div>

    </section>
  );
}

export default Hero;
