import { useParams, Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import {
  Printer,
  Box,
  Ruler,
  Layers3,
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";

import "../styles/services.css";
import "../styles/service-detail.css";

const serviceDetails = {
  "3d-model-printing": {
    number: "01",
    title: "3D Model Printing",
    subtitle: "Transforming Digital Designs into Physical Components.",
    icon: Printer,
    introduction:
      "We provide 3D printing solutions for customer-supplied digital models, converting CAD designs and 3D files into physical components through additive manufacturing.",
    description:
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
      "Customized enclosures",
      "Architectural models",
      "Functional components",
    ],
    requirements: [
      "3D model or CAD file",
      "Required dimensions",
      "Intended application",
      "Preferred material, if known",
    ],
  },

  "3d-printed-products": {
    number: "02",
    title: "3D Printed Products",
    subtitle: "Innovation Meets Customization.",
    icon: Box,
    introduction:
      "We develop and offer a range of customized 3D-printed products designed to combine functionality, creativity, and practical application.",
    description:
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
    requirements: [
      "Product idea or reference image",
      "Required dimensions",
      "Customization preferences",
      "Intended use of the product",
    ],
  },

  "engineering-prototyping": {
    number: "03",
    title: "Engineering Prototyping",
    subtitle: "From Concept Development to Physical Validation.",
    icon: Ruler,
    introduction:
      "We support engineering and product development through physical prototyping, enabling concepts to be evaluated beyond the digital design stage.",
    description:
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
    requirements: [
      "Concept description or CAD model",
      "Dimensions and design specifications",
      "Features to be evaluated",
      "Prototype application",
    ],
  },

  materials: {
    number: "04",
    title: "3D Filament & Materials",
    subtitle: "Material Selection for Performance and Application.",
    icon: Layers3,
    introduction:
      "We explore and offer commonly used 3D printing materials selected according to specific design requirements, functional expectations, and manufacturing applications.",
    description:
      "Material selection plays an important role in 3D printing. The appropriate material depends on the design, intended application, and the properties required from the final component.",
    features: [
      "Material selection based on application requirements",
      "Consideration of design and functional expectations",
      "Exploration of commonly used 3D printing materials",
      "Material recommendations based on individual properties",
    ],
    applications: [
      "Concept models",
      "Visual prototypes",
      "Functional components",
      "Flexible components",
    ],
    requirements: [
      "Intended application",
      "Design specifications",
      "Required flexibility or durability",
      "Expected operating conditions",
    ],
    materials: [
      {
        code: "PLA",
        name: "Polylactic Acid",
        description:
          "Suitable for concept models, visual prototypes, decorative products, and general-purpose components.",
      },
      {
        code: "PETG",
        name: "Polyethylene Terephthalate Glycol",
        description:
          "Offers a practical balance of durability, flexibility, and functional performance for various applications.",
      },
      {
        code: "TPU",
        name: "Thermoplastic Polyurethane",
        description:
          "Ideal for flexible components and applications requiring elasticity, impact absorption, and flexibility.",
      },
    ],
    note:
      "Material recommendations are based on the intended application, design specifications, and individual material properties.",
  },
};

function ServiceDetailPage() {
  const { serviceSlug } = useParams();
  const service = serviceDetails[serviceSlug];

  if (!service) {
    return (
      <>
        <Navbar />
        <main className="service-detail-page">
          <div className="service-detail-container">
            <h1>Service not found</h1>
            <Link to="/services" className="service-back-link">
              <ArrowLeft size={17} /> Back to Services
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const Icon = service.icon;

  return (
    <>
      <Navbar />

      <main className="service-detail-page">
        <section className="service-detail-hero">
          <div className="service-detail-container">
            <Link to="/services" className="service-back-link">
              <ArrowLeft size={16} />
              BACK TO ALL SERVICES
            </Link>

            <div className="service-detail-hero-content">
              <div className="service-detail-hero-copy">
                <span className="services-eyebrow">
                  JP SMART TECH LABS / SERVICE {service.number}
                </span>

                <h1>{service.title}</h1>
                <h2>{service.subtitle}</h2>
                <p>{service.introduction}</p>

                <a href="/contact" className="services-hero-link">
                  ENQUIRE ABOUT THIS SERVICE
                  <ArrowUpRight size={18} />
                </a>
              </div>

              <div className="service-detail-visual">
                <div className="service-detail-visual-icon">
                  <Icon size={88} strokeWidth={1.2} />
                </div>
                <span>JP SMART TECH LABS</span>
                <strong>{service.number} / 04</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="service-detail-body">
          <div className="service-detail-container">
            <div className="service-detail-overview">
              <div>
                <span className="services-eyebrow">SERVICE OVERVIEW</span>
                <h2>Understanding the <span>Service.</span></h2>
              </div>
              <p>{service.description}</p>
            </div>

            <div className="service-detail-columns">
              <article className="service-info-panel">
                <h3>What This Service Includes</h3>
                <ul>
                  {service.features.map((feature) => (
                    <li key={feature}>
                      <CheckCircle2 size={18} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </article>

              <article className="service-info-panel">
                <h3>Applications & Use Cases</h3>
                <div className="service-application-list">
                  {service.applications.map((application) => (
                    <span key={application}>{application}</span>
                  ))}
                </div>
              </article>
            </div>

            {service.materials && (
              <section className="detail-materials">
                <span className="services-eyebrow">MATERIAL OPTIONS</span>
                <h2>Explore Available <span>Materials.</span></h2>

                <div className="detail-material-grid">
                  {service.materials.map((material) => (
                    <article key={material.code}>
                      <strong>{material.code}</strong>
                      <h3>{material.name}</h3>
                      <p>{material.description}</p>
                    </article>
                  ))}
                </div>

                <p className="detail-material-note">{service.note}</p>
              </section>
            )}

            <article className="service-requirements">
              <span className="services-eyebrow">GETTING STARTED</span>
              <h2>What to <span>Prepare.</span></h2>
              <p>
                Sharing the following information can help us understand
                your requirements and discuss a suitable solution.
              </p>

              <ul>
                {service.requirements.map((requirement) => (
                  <li key={requirement}>
                    <CheckCircle2 size={17} />
                    {requirement}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className="service-detail-cta">
          <div className="service-detail-container">
            <span className="services-eyebrow">HAVE A PROJECT IN MIND?</span>
            <h2>Let's discuss your <span>requirements.</span></h2>
            <p>
              Contact JP SMART TECH LABS to discuss your design,
              product, or engineering requirements.
            </p>
            <a href="/contact" className="services-cta-button">
              SEND AN ENQUIRY <ArrowUpRight size={18} />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default ServiceDetailPage;
