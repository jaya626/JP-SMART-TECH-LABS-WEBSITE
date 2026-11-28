import {
  ArrowUpRight,
  Box,
  Layers3,
  Lightbulb,
  Printer,
  Ruler,
  Settings2,
} from "lucide-react";

import "../styles/about.css";

const services = [
  {
    number: "01",
    icon: Printer,
    title: "3D MODEL PRINTING",
    subtitle: "Transforming Digital Designs into Physical Components.",
    description:
      "We provide 3D printing solutions for customer-supplied digital models, converting CAD designs and 3D files into physical components through additive manufacturing.",
    detail:
      "From mechanical components and customized enclosures to architectural models and functional parts, we consider design specifications, material characteristics, and intended applications to achieve suitable printing outcomes.",
    tags: ["CAD Models", "Custom Components", "Additive Manufacturing"],
  },
  {
    number: "02",
    icon: Box,
    title: "3D PRINTED PRODUCTS",
    subtitle: "Innovation Meets Customization.",
    description:
      "We develop and offer a range of customized 3D-printed products designed to combine functionality, creativity, and practical application.",
    detail:
      "Our product development approach emphasizes design versatility, customization, and usability, enabling solutions for everyday requirements as well as specialized applications.",
    tags: ["Custom Products", "Creative Designs", "Practical Solutions"],
  },
  {
    number: "03",
    icon: Ruler,
    title: "ENGINEERING PROTOTYPING",
    subtitle: "From Concept Development to Physical Validation.",
    description:
      "We support engineering and product development through physical prototyping, enabling concepts to be evaluated beyond the digital design stage.",
    detail:
      "Our prototyping solutions facilitate the assessment of dimensions, structural fit, assembly compatibility, appearance, and functional requirements. This iterative approach supports design refinement, practical evaluation, and continuous product improvement.",
    tags: ["Design Validation", "Fit & Assembly", "Product Development"],
  },
  {
    number: "04",
    icon: Layers3,
    title: "3D FILAMENT & MATERIALS",
    subtitle: "Material Selection for Performance and Application.",
    description:
      "We explore and offer commonly used 3D printing materials selected according to specific design requirements, functional expectations, and manufacturing applications.",
    materials: [
      {
        name: "PLA",
        fullName: "Polylactic Acid",
        description:
          "Suitable for concept models, visual prototypes, decorative products, and general-purpose components.",
      },
      {
        name: "PETG",
        fullName: "Polyethylene Terephthalate Glycol",
        description:
          "Offers a practical balance of durability, flexibility, and functional performance for various applications.",
      },
      {
        name: "TPU",
        fullName: "Thermoplastic Polyurethane",
        description:
          "Ideal for flexible components and applications requiring elasticity, impact absorption, and flexibility.",
      },
    ],
    note:
      "Material recommendations are based on the intended application, design specifications, and individual material properties.",
    tags: ["PLA", "PETG", "TPU"],
  },
];

function AboutPage() {
  return (
    <main className="about-page">
      {/* ABOUT HERO */}
      <section className="about-hero">
        <div className="about-hero-glow about-glow-one" />
        <div className="about-hero-glow about-glow-two" />

        <div className="about-container">
          <div className="about-eyebrow">
            <span className="about-eyebrow-line" />
            GET TO KNOW US
          </div>

          <h1>
            Built on Innovation.
            <br />
            <span>Driven by Engineering.</span>
          </h1>

          <p className="about-hero-description">
            Turning ideas into possibilities through 3D printing,
            engineering and customized manufacturing solutions.
          </p>

          <a href="#about-content" className="about-scroll-link">
            DISCOVER OUR STORY
            <ArrowUpRight size={17} />
          </a>

          <div className="about-hero-decoration" aria-hidden="true">
            <div className="decoration-ring ring-one" />
            <div className="decoration-ring ring-two" />
            <div className="decoration-core">
              <Printer size={54} strokeWidth={1.1} />
            </div>
            <span className="decoration-dot dot-one" />
            <span className="decoration-dot dot-two" />
            <span className="decoration-dot dot-three" />
          </div>
        </div>
      </section>

      {/* ABOUT CONTENT */}
      <section className="about-content-section" id="about-content">
        <div className="about-container about-content-grid">
          <div className="about-section-heading">
            <span className="about-label">01 / WHO WE ARE</span>
            <h2>
              Engineering ideas.
              <br />
              <span>Creating possibilities.</span>
            </h2>

            <div className="about-heading-icon">
              <Lightbulb size={30} strokeWidth={1.3} />
            </div>
          </div>

          <div className="about-copy">
            <p>
              <strong>JP SMART TECH LABS</strong> is an engineering-driven
              3D printing and prototyping company based in Coimbatore,
              Tamil Nadu, specializing in additive manufacturing and
              customized product development.
            </p>

            <p>
              We believe every innovative product begins with an idea.
              Through advanced 3D printing technologies and
              engineering-focused solutions, we aim to bridge the gap
              between digital designs and physical products.
            </p>

            <p>
              Our expertise and interests span custom 3D-printed
              components, functional prototypes, customized products,
              and application-oriented manufacturing solutions. We
              focus on delivering solutions that balance design
              flexibility, functionality, precision, and practical
              usability.
            </p>

            <p>
              We aspire to support innovators, engineering
              professionals, students, developers, businesses, and
              individuals in transforming concepts into tangible
              outcomes.
            </p>

            <p>
              At JP SMART TECH LABS, we recognize the importance of
              innovation, adaptability, and continuous improvement in
              modern manufacturing. Our approach is driven by a
              commitment to exploring new technologies, expanding
              manufacturing possibilities, and making customized
              engineering solutions more accessible.
            </p>
          </div>
        </div>
      </section>

      {/* SERVICES INTRO */}
      <section className="services-section" id="services">
        <div className="about-container">
          <div className="services-heading">
            <div>
              <span className="about-label">02 / WHAT WE DO</span>
              <h2>
                Our <span>Services.</span>
              </h2>
            </div>

            <p>
              Engineering-focused solutions designed to take your ideas
              from digital concepts to real-world applications.
            </p>
          </div>

          {/* SERVICE CARDS */}
          <div className="services-grid">
            {services.map((service) => {
              const ServiceIcon = service.icon;

              return (
                <article className="service-card" key={service.number}>
                  <div className="service-card-top">
                    <span className="service-number">
                      {service.number}
                    </span>
                    <div className="service-icon">
                      <ServiceIcon size={25} strokeWidth={1.6} />
                    </div>
                    <ArrowUpRight
                      className="service-arrow"
                      size={20}
                    />
                  </div>

                  <h3>{service.title}</h3>
                  <h4>{service.subtitle}</h4>

                  <p className="service-description">
                    {service.description}
                  </p>

                  {service.detail && (
                    <p className="service-detail">
                      {service.detail}
                    </p>
                  )}

                  {service.materials && (
                    <div className="materials-list">
                      {service.materials.map((material) => (
                        <div
                          className="material-item"
                          key={material.name}
                        >
                          <div className="material-heading">
                            <span>{material.name}</span>
                            <small>{material.fullName}</small>
                          </div>
                          <p>{material.description}</p>
                        </div>
                      ))}

                      <p className="material-note">{service.note}</p>
                    </div>
                  )}

                  <div className="service-tags">
                    {service.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CLOSING SECTION */}
      <section className="about-closing">
        <div className="about-container closing-inner">
          <div className="closing-icon">
            <Settings2 size={29} strokeWidth={1.4} />
          </div>

          <div>
            <span className="about-label">JP SMART TECH LABS</span>
            <h2>
              Ideas deserve to become <span>reality.</span>
            </h2>
            <p>
              Explore what's possible with engineering, creativity
              and additive manufacturing.
            </p>
          </div>

          <a href="/contact" className="closing-link">
            LET'S CONNECT
            <ArrowUpRight size={18} />
          </a>
        </div>
      </section>
    </main>
  );
}

export default AboutPage;