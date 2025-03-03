import React from 'react';
import { StaticImageData } from 'next/image';
import Image from 'next/image';
import { Calendar, MapPin, Ticket } from 'lucide-react';
import CardEvent from '@/app/public/images/feed/Rectangle 7.png';

// Define TypeScript interfaces
interface EventType {
  id: number;
  title: string;
  image: StaticImageData;
  category: string;
  date: string;
  location: string;
  price: string;
}

interface EventCardProps {
  event: EventType;
}

// Event Card component
function EventCard(props:any) {
  const { event } = props;
  
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full">
      <div className="relative">
        <Image
          src={event.image}
          alt={event.title}
          className="w-full h-32 object-cover"
        />
        <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 text-xs font-medium rounded-md">
          {event.category}
        </div>
      </div>
      
      <div className="p-3">
        <h3 className="text-sm font-medium text-blue-800 line-clamp-1 mb-2">{event.title}</h3>
        
        <div className="text-xs space-y-1">
          <div className="flex items-center text-gray-600">
            <Calendar size={12} className="mr-1 flex-shrink-0" />
            <span className="truncate">{event.date}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <MapPin size={12} className="mr-1 flex-shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>
        </div>
        
        <div className="mt-2 flex items-center justify-between">
          <div className="text-blue-600 font-medium text-sm">{event.price}</div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-xs flex items-center transition-colors">
            <Ticket size={10} className="mr-1" />
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
}

// Main component
function EventsSection() {
  const events = [
    {
      id: 1,
      title: "Empreendorismo digital",
      image: CardEvent,
      category: "digital",
      date: "25 Mar • 19:00",
      location: "São Paulo, SP",
      price: "R$ 120,00"
    },
    {
      id: 2,
      title: "Networking Beleza Brasileira",
      image: CardEvent,
      category: "beleza",
      date: "12 Abr • 15:30",
      location: "Rio de Janeiro, RJ",
      price: "R$ 89,90"
    },
    {
      id: 3,
      title: "TechWings - Novas tendências com IA",
      image: CardEvent,
      category: "tech",
      date: "05 Mai • 09:00",
      location: "Florianópolis, SC",
      price: "R$ 199,00"
    },
    {
      id: 4,
      title: "Networking Beleza Brasileira",
      image: CardEvent,
      category: "beleza",
      date: "30 Mar • 14:00",
      location: "Belo Horizonte, MG",
      price: "R$ 75,00"
    },
    {
      id: 5,
      title: "Workshop de Fotografia",
      image: CardEvent,
      category: "arte",
      date: "15 Abr • 10:00",
      location: "Curitiba, PR",
      price: "R$ 150,00"
    },
    {
      id: 6,
      title: "Festival Gastronômico",
      image: CardEvent,
      category: "gastronomia",
      date: "22 Mai • 12:00",
      location: "Salvador, BA",
      price: "R$ 65,00"
    }
  ];
  
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Eventos</h2>
        <button className="text-sm text-blue-600 hover:text-blue-800">Ver todos</button>
      </div>
      
      {/* Desktop Grid (hidden on mobile) */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {events.slice(0, 4).map(function(event) {
          return <EventCard key={event.id} event={event} />;
        })}
      </div>
      
      {/* Mobile Horizontal Scroll (visible only on mobile) */}
      <div className="md:hidden -mx-4 px-4 overflow-x-auto scrollbar-hide">
        <div className="flex space-x-4 pb-4 w-max">
          {events.map(function(event) {
            return (
              <div key={event.id} className="w-56 flex-shrink-0">
                <EventCard event={event} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

EventCard.displayName = 'EventCard';
EventsSection.displayName = 'EventsSection';

export default EventsSection;