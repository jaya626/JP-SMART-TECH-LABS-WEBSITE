
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import Hero from "../components/home/Hero";
import CategoryGrid from "../components/category/CategoryGrid";
import CustomizationSection from "../components/customization/CustomizationSection";

import "../styles/home.css";

function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <CategoryGrid />
        <CustomizationSection />
      </main>
      <Footer />
    </>
  );
}

export default HomePage;
