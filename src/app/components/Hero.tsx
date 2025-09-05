"use client";

import React, { useState, useEffect } from 'react';


export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [showMenu, setShowMenu] = useState(false);
  
  const coffeeImages = [
    'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1920&h=1080&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1920&h=1080&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1920&h=1080&fit=crop&crop=center'
  ];
  
  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % coffeeImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Animated Background Images */}
      <div className="absolute inset-0">
        {coffeeImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-2000 ${
              index === currentImageIndex ? 'opacity-70' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
      </div>

      {/* Floating Coffee Beans Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-3 bg-amber-800 rounded-full opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Title */}
          <h1 className={`text-6xl md:text-8xl font-black mb-6 transition-all duration-1500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              BREW
            </span>
            <span className="text-white ml-4">BLISS</span>
          </h1>

          {/* Subtitle */}
          <p className={`text-xl md:text-2xl text-gray-200 mb-8 font-light leading-relaxed transition-all duration-1500 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            Where every cup tells a story of <span className="text-amber-400 font-semibold">perfection</span>
          </p>

          {/* Feature Pills */}
          <div className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-1500 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            {['Artisan Roasted', 'Locally Sourced', 'Premium Quality'].map((feature, index) => (
              <span
                key={feature}
                className="px-6 py-2 bg-white/20 backdrop-blur-md rounded-full text-white border border-white/30 hover:bg-white/30 transition-all duration-300 cursor-default"
              >
                {feature}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1500 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <button className="group px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-full hover:from-amber-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-amber-500/25"
              onClick={() => setShowMenu(true)}>
              <span className="flex items-center gap-2">
                Order Now
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>
            
            <button className="group px-8 py-4 bg-transparent text-white font-bold rounded-full border-2 border-white/50 hover:bg-white hover:text-gray-900 transition-all duration-300 backdrop-blur-sm">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.5a1.5 1.5 0 011.5 1.5v1a1.5 1.5 0 01-1.5 1.5H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Our Story
              </span>
            </button>
          </div>

          {/* Stats */}
          <div className={`mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto transition-all duration-1500 delay-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            {[
              { number: '15K+', label: 'Happy Customers' },
              { number: '50+', label: 'Coffee Varieties' },
              { number: '24/7', label: 'Always Fresh' }
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-black text-amber-400 mb-2">{stat.number}</div>
                <div className="text-sm text-gray-300 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}