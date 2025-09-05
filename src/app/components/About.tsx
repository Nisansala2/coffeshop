import React, { useState, useEffect } from 'react';
import { Coffee, Heart, Users, Award, MapPin, Clock, Leaf, Star } from 'lucide-react';

export default function About() {
  const [activeValue, setActiveValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const values = [
    {
      icon: <Coffee className="w-8 h-8" />,
      title: "Premium Quality",
      description: "Hand-selected beans from the world's finest coffee regions, roasted to perfection in small batches."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Community Love",
      description: "More than coffee - we're building connections and creating a warm space for everyone."
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Sustainability",
      description: "Committed to ethical sourcing and eco-friendly practices that support farmers and the planet."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Artisan Craft",
      description: "Every cup is crafted with passion by our skilled baristas who treat coffee as an art form."
    }
  ];

  const stats = [
    { number: "10K+", label: "Happy Customers", icon: <Users className="w-6 h-6" /> },
    { number: "50+", label: "Coffee Origins", icon: <MapPin className="w-6 h-6" /> },
    { number: "15", label: "Years Experience", icon: <Clock className="w-6 h-6" /> },
    { number: "4.9", label: "Average Rating", icon: <Star className="w-6 h-6" /> }
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-red-500/10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full mb-8 shadow-lg animate-pulse">
              <Coffee className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-amber-600 to-red-600 bg-clip-text text-transparent mb-6">
              Our Story
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Born from a passion for exceptional coffee and community connection, we've been brewing 
              dreams one cup at a time since 2009. Every bean tells a story, every cup creates a memory.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Stats */}
      <div className="bg-white py-16 border-b border-gray-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group text-center transform transition-all duration-300 hover:scale-105 cursor-pointer"
                onMouseEnter={() => setActiveValue(index)}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 transition-all duration-300 ${
                  activeValue === index 
                    ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white scale-110' 
                    : 'bg-gray-100 text-gray-600 group-hover:bg-amber-100'
                }`}>
                  {stat.icon}
                </div>
                <div className={`text-3xl font-bold transition-colors duration-300 ${
                  activeValue === index ? 'text-amber-600' : 'text-gray-800'
                }`}>
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Values Section */}
      <div className="bg-gradient-to-b from-white to-gray-50 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">What Drives Us</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our commitment goes beyond great coffee - it's about creating experiences that matter.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform transition-all duration-500 hover:-translate-y-2 cursor-pointer border border-gray-100 hover:border-amber-200"
                style={{
                  animationDelay: `${index * 150}ms`,
                  animation: isVisible ? 'fadeInUp 0.6s ease-out forwards' : 'none'
                }}
              >
                <div className="text-amber-500 mb-6 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-amber-600 transition-colors duration-300">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
                <div className="mt-6 w-12 h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Journey Timeline */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Journey</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From a small corner café to a beloved community hub, here's how our story unfolded.
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-amber-400 to-red-500 rounded-full"></div>
            
            {[
              { year: "2009", title: "The Beginning", desc: "Started as a small neighborhood café with big dreams" },
              { year: "2015", title: "Community Growth", desc: "Expanded to serve our growing coffee-loving community" },
              { year: "2020", title: "Sustainable Focus", desc: "Committed to ethical sourcing and eco-friendly practices" },
              { year: "2024", title: "Innovation Era", desc: "Embracing new brewing techniques while honoring traditions" }
            ].map((milestone, index) => (
              <div
                key={index}
                className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'} mb-12`}
              >
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                    <div className="text-2xl font-bold text-amber-600 mb-2">{milestone.year}</div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.desc}</p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-amber-500 rounded-full shadow-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 py-16">
        <div className="container mx-auto px-6 text-center">
          <div className="text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Experience Our Story?</h2>
            <p className="text-xl mb-8 text-amber-100 max-w-2xl mx-auto">
              Come visit us and become part of our continuing journey. Every cup is a new chapter.
            </p>
            <button className="bg-white text-amber-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-amber-50 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              Visit Our Café
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
