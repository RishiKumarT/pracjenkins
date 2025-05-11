// src/pages/Home.jsx
import HeroSection from '../components/Herosection';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import  HeroSection3  from '../components/HeroSection3';
import  HeroSection2  from '../components/HeroSection2';

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <HeroSection2 />
      <HeroSection3 />
      <Footer />
      {/* You can add more sections like Featured Products, Categories etc. here */}
    </>
  );
}

