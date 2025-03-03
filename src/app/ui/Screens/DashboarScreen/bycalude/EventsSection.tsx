import React from 'react';

export default function EventsSection() {
  const events = [
    {
      id: 1,
      title: "Empreendorismo digital",
      image: "/api/placeholder/400/320",
      category: "digital"
    },
    {
      id: 2,
      title: "Networking Beleza Brasileira",
      image: "/api/placeholder/400/320",
      category: "beleza"
    },
    {
      id: 3,
      title: "TechWings - Novas tendências com IA",
      image: "/api/placeholder/400/320",
      category: "tech"
    },
    {
      id: 4,
      title: "Networking Beleza Brasileira",
      image: "/api/placeholder/400/320",
      category: "beleza"
    }
  ];
  
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Eventos</h2>
      <div className="grid grid-cols-4 gap-4">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <img 
              src={event.image} 
              alt={event.title} 
              className="w-full h-36 object-cover"
            />
            <div className="p-3">
              <h3 className="text-sm font-medium text-blue-600">{event.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}