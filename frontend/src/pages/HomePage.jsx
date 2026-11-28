import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import Hero from "../components/home/Hero";
import CategoryGrid from "../components/category/CategoryGrid";

import "../styles/home.css";

function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <CategoryGrid />
      </main>
      <Footer />
    </>
  );
}

export default HomePage;
