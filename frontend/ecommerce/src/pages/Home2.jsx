// src/pages/Home.jsx
import HeroSection from '../components/Herosection';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import  HeroSection3  from '../components/HeroSection3';
import  HeroSection2  from '../components/HeroSection2';
import Navbar3 from '../components/Navbar3';

export default function Home() {
  return (
    <>
      <Navbar3 />
      <HeroSection />
      <HeroSection2 />
      <HeroSection3 />
      <Footer />
      {/* You can add more sections like Featured Products, Categories etc. here */}
    </>
  );
}

