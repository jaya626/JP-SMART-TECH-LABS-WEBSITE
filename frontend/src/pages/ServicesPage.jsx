import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import {
  Printer,
  Box,
  Ruler,
  Layers3,
  ArrowUpRight,
  CheckCircle2,
  FileBox,
  Settings2,
  Lightbulb,
  PackageCheck,
} from "lucide-react";

import "../styles/services.css";

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
    features: [
      "Printing from customer-provided CAD designs and 3D files",
      "Mechanical components and customized enclosures",
      "Architectural and presentation models",
      "Functional and application-oriented components",
      "Consideration of design specifications and material characteristics",
    ],
    applications: [
      "Mechanical design",
      "Engineering projects",
      "Enclosures",
      "Architectural models",
    ],
    iconSmall: FileBox,
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
    features: [
      "Customized product concepts and designs",
      "Design versatility for different requirements",
      "Practical and application-oriented product ideas",
      "Creative product development",
      "Focus on usability and customization",
    ],
    applications: [
      "Customized products",
      "Everyday applications",
      "Creative designs",
      "Specialized requirements",
    ],
    iconSmall: PackageCheck,
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
    features: [
      "Physical representation of digital design concepts",
      "Dimensional and structural-fit evaluation",
      "Assembly compatibility assessment",
      "Appearance and design review",
      "Support for iterative design refinement",
    ],
    applications: [
      "Product development",
      "Engineering concepts",
      "Fit and assembly",
      "Design evaluation",
    ],
    iconSmall: Settings2,
  },
];

const materials = [
  {
    code: "PLA",
    name: "Polylactic Acid",
    description:
      "Suitable for concept models, visual prototypes, decorative products, and general-purpose components.",
    uses: ["Concept models", "Visual prototypes", "Decorative products"],
    character: "Concept & visual applications",
  },
  {
    code: "PETG",
    name: "Polyethylene Terephthalate Glycol",
    description:
      "Offers a practical balance of durability, flexibility, and functional performance for various applications.",
    uses: ["Functional components", "Practical products", "General applications"],
    character: "Durability & functionality",
  },
  {
    code: "TPU",
    name: "Thermoplastic Polyurethane",
    description:
      "Ideal for flexible components and applications requiring elasticity, impact absorption, and flexibility.",
    uses: ["Flexible components", "Elastic applications", "Impact absorption"],
    character: "Flexibility & elasticity",
  },
];

const projectSteps = [
  {
    number: "01",
    title: "Share Your Idea",
    description:
      "Discuss your product concept, design file, project objective, or component requirements.",
  },
  {
    number: "02",
    title: "Review Requirements",
    description:
      "Consider the design specifications, intended application, dimensions, and material requirements.",
  },
  {
    number: "03",
    title: "Manufacturing",
    description:
      "Proceed with the suitable 3D printing or prototyping approach based on the agreed requirements.",
  },
  {
    number: "04",
    title: "Evaluate the Result",
    description:
      "Review the physical component against the intended design and application requirements.",
  },
];

function ServicesPage() {
  return (
    <>
      <Navbar />

      <main className="services-page">
        {/* HERO */}
        <section className="services-hero">
          <div className="services-container services-hero-layout">
            <div className="services-hero-copy">
              <span className="services-eyebrow">
                JP SMART TECH LABS / ENGINEERING SOLUTIONS
              </span>

              <h1>
                Our Services.
                <span className="services-hero-subheading">
                  Engineering ideas into physical possibilities.
                </span>
              </h1>

              <p>
                Explore our 3D printing, customized product development,
                engineering prototyping, and material solutions. We help
                bridge the gap between digital designs and physical products
                through application-oriented additive manufacturing.
              </p>

              <div className="services-hero-actions">
                <a href="#project-process" className="services-hero-link">
                  HOW IT WORKS
                  <ArrowUpRight size={18} />
                </a>


              </div>

              <div className="services-hero-points">
                <span><CheckCircle2 size={16} /> Customization</span>
                <span><CheckCircle2 size={16} /> Prototyping</span>
                <span><CheckCircle2 size={16} /> Material Options</span>
              </div>
            </div>

            <div className="services-hero-visual">
              <div className="hero-visual-orbit orbit-a" />
              <div className="hero-visual-orbit orbit-b" />
              <div className="hero-visual-card">
                <div className="hero-visual-top">
                  <span>ADDITIVE</span>
                  <span>MANUFACTURING</span>
                </div>
                <div className="hero-visual-object">
                  <Printer size={76} strokeWidth={1.1} />
                </div>
                <div className="hero-visual-bottom">
                  <span>DESIGN</span>
                  <span className="visual-divider" />
                  <span>PRINT</span>
                  <span className="visual-divider" />
                  <span>CREATE</span>
                </div>
              </div>
              <div className="hero-floating-label">
                <Layers3 size={17} />
                <span>3D PRINTING</span>
              </div>
            </div>
          </div>
        </section>

        {/* QUICK SERVICE NAVIGATION */}
        <section className="service-shortcuts" id="service-shortcuts">
          <div className="services-container">
            <div className="shortcuts-heading">
              <span className="services-eyebrow">EXPLORE OUR EXPERTISE</span>
              <h2>What Can We <span>Help You Create?</span></h2>
              <p>
                Choose a service to explore its capabilities, applications
                and available material options.
              </p>
            </div>

            <div className="service-shortcuts-grid">
              <a href="/services/3d-model-printing" className="service-shortcut-card">
                <span className="shortcut-number">01</span>
                <span className="shortcut-icon"><Printer size={27} /></span>
                <h3>3D Model Printing</h3>
                <p>Convert CAD designs and digital models into physical components.</p>
                <span className="shortcut-action">EXPLORE SERVICE <ArrowUpRight size={17} /></span>
              </a>

              <a href="/services/3d-printed-products" className="service-shortcut-card">
                <span className="shortcut-number">02</span>
                <span className="shortcut-icon"><Box size={27} /></span>
                <h3>3D Printed Products</h3>
                <p>Explore customized products designed for creativity and usability.</p>
                <span className="shortcut-action">EXPLORE SERVICE <ArrowUpRight size={17} /></span>
              </a>

              <a href="/services/engineering-prototyping" className="service-shortcut-card">
                <span className="shortcut-number">03</span>
                <span className="shortcut-icon"><Ruler size={27} /></span>
                <h3>Engineering Prototyping</h3>
                <p>Evaluate concepts through physical prototypes and design refinement.</p>
                <span className="shortcut-action">EXPLORE SERVICE <ArrowUpRight size={17} /></span>
              </a>

              <a href="/services/materials" className="service-shortcut-card">
                <span className="shortcut-number">04</span>
                <span className="shortcut-icon"><Layers3 size={27} /></span>
                <h3>3D Filament & Materials</h3>
                <p>Discover PLA, PETG and TPU for different applications.</p>
                <span className="shortcut-action">EXPLORE MATERIALS <ArrowUpRight size={17} /></span>
              </a>
            </div>
          </div>
        </section>


        {/* PROJECT PROCESS */}
        <section className="project-process-section" id="project-process">
          <div className="services-container">
            <div className="services-section-heading">
              <span className="services-eyebrow">WORKING WITH US</span>
              <h2>
                From Idea to <span>Physical Form.</span>
              </h2>
              <p>
                A clear project journey helps align design expectations,
                manufacturing requirements, and the intended application.
              </p>
            </div>

            <div className="project-process-grid">
              {projectSteps.map((step) => (
                <article className="project-step" key={step.number}>
                  <span className="project-step-number">{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="services-cta">
          <div className="services-container services-cta-inner">
            <div>
              <span className="services-eyebrow">LET'S BUILD SOMETHING</span>
              <h2>
                Have an idea? <span>Let's discuss it.</span>
              </h2>
              <p>
                Share your design, product concept, or engineering
                requirements with JP SMART TECH LABS.
              </p>
            </div>

            <a href="/contact" className="services-cta-button">
              DISCUSS YOUR PROJECT
              <ArrowUpRight size={18} />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default ServicesPage;





