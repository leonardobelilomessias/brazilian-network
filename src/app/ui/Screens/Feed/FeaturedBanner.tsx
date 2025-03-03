import React, { useState, useEffect } from 'react';

export default function FeaturedBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const banners = [
    {
      id: 1,
      title: "Consultoria de Imigração",
      description: "Suporte jurídico | Orientação de documentos | Ajuda para processos",
      image: "/images/immigration-banner.png",
    },
    // More banners would be added here
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % banners.length);
    }, 5000);
    return () => clearTimeout(timer);
  }, [currentSlide, banners.length]);

  return (
    <div className="relative w-full h-64 mb-8 rounded-lg overflow-hidden">
      {/* Banner Image and Content */}
      <div className="relative h-full bg-blue-100 rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-blue-100 flex items-center">
          <div className="w-1/2 p-6">
            <h2 className="text-2xl font-bold text-blue-900 mb-2">{banners[currentSlide].title}</h2>
            <p className="text-sm text-blue-800">{banners[currentSlide].description}</p>
            <div className="mt-4 flex space-x-2">
              <div className="bg-gray-700 rounded-full p-2 text-white text-xs flex items-center">
                <span className="mr-2">🔍</span>
                <span>Ver detalhes</span>
              </div>
              <div className="bg-blue-700 rounded-full p-2 text-white text-xs flex items-center">
                <span className="mr-2">📞</span>
                <span>Fale Conosco</span>
              </div>
            </div>
          </div>
          <div className="w-1/2 flex justify-center items-center">
            <div className="relative">
              <img 
                src="/api/placeholder/400/320" 
                alt="Consultoria de Imigração" 
                className="h-48 object-contain"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Slide indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentSlide ? 'bg-blue-500' : 'bg-gray-300'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}