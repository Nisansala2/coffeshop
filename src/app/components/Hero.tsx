"use client";

import React, { useState, useEffect } from 'react';


export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [coffeeBeans, setCoffeeBeans] = useState<Array<{
    id: number;
    left: string;
    top: string;
    animationDelay: string;
    animationDuration: string;
  }>>([]);
  
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

    // Generate coffee beans data only on client side
    const beans = [...Array(12)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${4 + Math.random() * 4}s`
    }));
    setCoffeeBeans(beans);

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
        {coffeeBeans.map((bean) => (
          <div
            key={bean.id}
            className="absolute w-2 h-3 rounded-full bg-amber-800 opacity-20 animate-float"
            style={{
              left: bean.left,
              top: bean.top,
              animationDelay: bean.animationDelay,
              animationDuration: bean.animationDuration
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Title */}
          <h1 className={`text-6xl md:text-8xl font-black mb-6 transition-all duration-1500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <span className="text-transparent bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text">
              BREW
            </span>
            <span className="ml-4 text-white">BLISS</span>
          </h1>

          {/* Subtitle */}
          <p className={`text-xl md:text-2xl text-gray-200 mb-8 font-light leading-relaxed transition-all duration-1500 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            Where every cup tells a story of <span className="font-semibold text-amber-400">perfection</span>
          </p>

          {/* Feature Pills */}
          <div className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-1500 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            {['Artisan Roasted', 'Locally Sourced', 'Premium Quality'].map((feature, index) => (
              <span
                key={feature}
                className="px-6 py-2 text-white transition-all duration-300 border rounded-full cursor-default bg-white/20 backdrop-blur-md border-white/30 hover:bg-white/30"
              >
                {feature}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1500 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <button className="px-8 py-4 font-bold text-white transition-all duration-300 transform rounded-full shadow-2xl group bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 hover:scale-105 hover:shadow-amber-500/25"
              onClick={() => setShowMenu(true)}>
              <span className="flex items-center gap-2">
                Order Now
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>
            
            <button className="px-8 py-4 font-bold text-white transition-all duration-300 bg-transparent border-2 rounded-full group border-white/50 hover:bg-white hover:text-gray-900 backdrop-blur-sm">
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
                <div className="mb-2 text-3xl font-black md:text-4xl text-amber-400">{stat.number}</div>
                <div className="text-sm font-medium text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute transform -translate-x-1/2 bottom-8 left-1/2 animate-bounce">
        <div className="flex justify-center w-6 h-10 border-2 rounded-full border-white/50">
          <div className="w-1 h-3 mt-2 rounded-full bg-white/70 animate-pulse" />
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