import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Send,
} from "lucide-react";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import "../styles/contact.css";

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [notice, setNotice] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setNotice(
      "Your enquiry form is ready. Online submission will be available after backend integration."
    );
  };

  return (
    <>
      <Navbar />

      <main className="contact-page">
        <section className="contact-main-section">
          <div className="contact-container contact-main-grid">

            {/* LEFT CONTACT INFORMATION */}
            <div className="contact-left">
              <span className="contact-eyebrow">GET IN TOUCH</span>

              <h1>
                We're here
                <br />
                <span>to help.</span>
              </h1>

              <p className="contact-intro">
                Whether you want to know more about our 3D printing
                services, customized products, or have an engineering
                requirement, feel free to reach out to us.
              </p>

              <div className="contact-detail-list">

                <div className="contact-detail-item">
                  <div className="contact-detail-icon">
                    <Mail size={20} />
                  </div>
                  <div>
                    <span>EMAIL</span>
                    <h3><a href="mailto:jpsmarttechlabs@gmail.com">jpsmarttechlabs@gmail.com</a></h3>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="contact-detail-icon">
                    <Phone size={20} />
                  </div>
                  <div>
                    <span>PHONE</span>
                    <h3><a href="tel:+918600635597">+91 8600635597</a></h3>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="contact-detail-icon">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <span>LOCATION</span>
                    <h3>Coimbatore</h3>
                    <p>Tamil Nadu, India</p>
                  </div>
                </div>

              </div>

              <a className="contact-whatsapp-note" href="https://wa.me/918600635597" target="_blank" rel="noreferrer">
                <div className="contact-whatsapp-icon">
                  <MessageCircle size={21} />
                </div>
                <div>
                  <strong>Let's discuss your idea.</strong>
                  <p>
                    Share your project requirements with JP SMART TECH LABS.
                  </p>
                </div>
              </a>
            </div>

            {/* RIGHT CONTACT FORM */}
            <div className="contact-form-card" id="contact-form">

              <div className="contact-form-heading">
                <h2>Send us a message</h2>
                <p>
                  Fill in the details below and tell us how we can help.
                </p>
              </div>

              <form onSubmit={handleSubmit}>

                <div className="contact-field">
                  <label htmlFor="contact-name">Full Name *</label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="contact-input-grid">
                  <div className="contact-field">
                    <label htmlFor="contact-email">Email Address *</label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="contact-field">
                    <label htmlFor="contact-phone">Phone Number</label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      placeholder="Enter phone number"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="contact-field">
                  <label htmlFor="contact-subject">Subject *</label>
                  <select
                    id="contact-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="3D Model Printing">3D Model Printing</option>
                    <option value="3D Printed Products">3D Printed Products</option>
                    <option value="Engineering Prototyping">
                      Engineering Prototyping
                    </option>
                    <option value="3D Filament & Materials">
                      3D Filament & Materials
                    </option>
                    <option value="General Enquiry">General Enquiry</option>
                  </select>
                </div>

                <div className="contact-field">
                  <label htmlFor="contact-message">Message *</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows="5"
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button type="submit" className="contact-submit-button">
                  <Send size={16} />
                  SEND MESSAGE
                </button>

                {notice && (
                  <p className="contact-form-notice" role="status">
                    {notice}
                  </p>
                )}

                

              </form>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default ContactPage;






