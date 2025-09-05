import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Menu from '../components/Menu';
import About from '../components/About';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Menu />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Home;