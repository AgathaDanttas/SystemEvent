import { useState } from 'react';
import { Star, MapPin, Heart } from 'lucide-react';

import villaImg from '../assets/venue_villa_natureza.png';
import jardimImg from '../assets/venue_espaco_jardim.png';
import glassImg from '../assets/venue_mansao_glass.png';
import solarImg from '../assets/venue_solar_flores.png';

interface Venue {
  id: number;
  name: string;
  location: string;
  image: string;
  rating: number;
  reviewsCount: number;
  capacity: number;
  price: number;
  category: string;
  featured: boolean;
  idealFor: string;
}

const INITIAL_VENUES: Venue[] = [
  {
    id: 1,
    name: 'Villa Natureza',
    location: 'São Paulo, SP',
    image: villaImg,
    rating: 4.9,
    reviewsCount: 128,
    capacity: 150,
    price: 8500,
    category: 'Casamento',
    featured: true,
    idealFor: 'Casamentos • Corporativo'
  },
  {
    id: 2,
    name: 'Espaço Jardim',
    location: 'Mairiporã, SP',
    image: jardimImg,
    rating: 4.8,
    reviewsCount: 34,
    capacity: 250,
    price: 7500,
    category: 'Casamento',
    featured: true,
    idealFor: 'Casamentos • Aniversários'
  },
  {
    id: 3,
    name: 'Mansão Glass',
    location: 'São Paulo, SP',
    image: glassImg,
    rating: 5.0,
    reviewsCount: 42,
    capacity: 200,
    price: 12000,
    category: 'Corporativo',
    featured: true,
    idealFor: 'Corporativo • Palestras'
  },
  {
    id: 4,
    name: 'Solar das Flores',
    location: 'Campinas, SP',
    image: solarImg,
    rating: 4.9,
    reviewsCount: 19,
    capacity: 300,
    price: 15000,
    category: 'Casamento',
    featured: true,
    idealFor: 'Casamentos • Formaturas'
  },
];

interface FeaturedVenuesProps {
  filters: {
    type: string;
    location: string;
    date: string;
    guests: string;
    budget: string;
    query?: string;
  } | null;
  onSelectVenue?: (venue: Venue) => void;
  onShowAll?: () => void;
}

export default function FeaturedVenues({ filters, onSelectVenue, onShowAll }: FeaturedVenuesProps) {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  const filteredVenues = INITIAL_VENUES.filter(venue => {
    if (!filters) return true;

    if (filters.type && venue.category.toLowerCase() !== filters.type.toLowerCase()) {
      return false;
    }

    if (filters.location && filters.location !== 'Selecione' && !venue.location.toLowerCase().includes(filters.location.split(' ')[0].toLowerCase())) {
      return false;
    }

    const maxGuests = parseInt(filters.guests);
    if (!isNaN(maxGuests) && venue.capacity > maxGuests) {
      return false;
    }

    const budgetValue = parseInt(filters.budget.replace(/[^0-9]/g, ''));
    if (!isNaN(budgetValue) && venue.price > budgetValue) {
      return false;
    }

    if (filters.query) {
      const q = filters.query.toLowerCase();
      const matchesName = venue.name.toLowerCase().includes(q);
      const matchesLocation = venue.location.toLowerCase().includes(q);
      const matchesCategory = venue.category.toLowerCase().includes(q);
      if (!matchesName && !matchesLocation && !matchesCategory) {
        return false;
      }
    }

    return true;
  });

  return (
    <section className="pt-6 pb-16 lg:py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8 text-left">
          <div>
            <h2 className="font-serif text-xl sm:text-3xl text-[#2B2A27] font-semibold tracking-tight">
              Espaços em destaque
            </h2>
            <p className="hidden md:block text-[#6E6B64] font-light mt-2 text-sm sm:text-base">
              Espaços incríveis selecionados para o seu momento perfeito
            </p>
          </div>
          <button 
            onClick={onShowAll}
            className="inline-flex items-center text-xs sm:text-sm font-bold text-[#B8975A] hover:text-[#A38349] transition-colors cursor-pointer"
          >
            <span>Ver todos</span>
            <span className="ml-1 text-[10px] sm:text-xs font-semibold">&gt;</span>
          </button>
        </div>

        {filteredVenues.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredVenues.map((venue) => {
              const isFav = favorites.includes(venue.id);
              return (
                <div 
                  key={venue.id}
                  className="group bg-white border border-[#EAE3D2] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
                >
                  <div 
                    onClick={() => onSelectVenue?.(venue)}
                    className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100 cursor-pointer"
                  >
                    <img 
                      src={venue.image} 
                      alt={venue.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-60"></div>
                     
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(venue.id);
                      }}
                      className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#B8975A] border border-[#B8975A]/10 hover:bg-[#FAF8F5] transition-colors shadow-sm focus:outline-none z-10 cursor-pointer"
                    >
                      <Heart 
                        className={`w-4 h-4 transition-colors ${
                          isFav ? 'fill-[#B8975A] text-[#B8975A]' : 'text-[#B8975A]'
                        }`} 
                      />
                    </button>
                  </div>
  
                  <div className="p-5 flex flex-col flex-grow text-left space-y-3">
                    <div className="flex justify-between items-start">
                      <h3 
                        onClick={() => onSelectVenue?.(venue)}
                        className="font-serif text-base text-[#2B2A27] font-bold group-hover:text-[#B8975A] transition-colors cursor-pointer leading-tight"
                      >
                        {venue.name}
                      </h3>
                      <div className="flex items-center space-x-1 text-xs font-semibold text-[#6E6B64] flex-shrink-0 pt-0.5">
                        <Star className="w-3.5 h-3.5 fill-[#B8975A] text-[#B8975A]" />
                        <span className="text-[#2B2A27]">{venue.rating.toFixed(1)}</span>
                        <span className="text-[10px] font-normal">({venue.reviewsCount})</span>
                      </div>
                    </div>
  
                    <div className="flex items-center space-x-1.5 text-xs text-[#6E6B64]">
                      <MapPin className="w-4 h-4 text-[#B8975A] flex-shrink-0" />
                      <span className="truncate">{venue.location}</span>
                    </div>

                    <div className="inline-flex pt-0.5">
                      <span className="px-3 py-1.5 bg-[#FAF0D9]/40 text-[#6E6B64] text-[10px] font-semibold rounded-lg leading-none">
                        Ideal para: {venue.idealFor}
                      </span>
                    </div>
  
                    <div className="pt-4 border-t border-[#EAE3D2]/50 flex items-center justify-between mt-auto">
                      <div className="text-xs text-[#6E6B64] font-medium">
                        A partir de <span className="text-base font-bold text-[#B8975A] ml-0.5">R$ {venue.price.toLocaleString('pt-BR')}</span>
                      </div>
                      <button 
                        onClick={() => onSelectVenue?.(venue)}
                        className="px-4 py-2 bg-[#B8975A] hover:bg-[#A38349] text-white text-xs font-semibold rounded-xl flex items-center space-x-1 transition-all shadow-sm hover:shadow-md cursor-pointer"
                      >
                        <span>Ver detalhes</span>
                        <span className="text-[9px] font-bold">&gt;</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white border border-[#EAE3D2] rounded-2xl p-12 text-center max-w-lg mx-auto shadow-sm">
            <p className="text-lg font-medium text-[#2B2A27]">Nenhum local encontrado</p>
            <p className="text-sm text-[#6E6B64] mt-2 mb-6">
              Não encontramos locais correspondentes aos seus filtros de busca atuais. Tente ajustar a localização ou orçamento.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 text-sm font-medium text-white bg-[#B8975A] hover:bg-[#A38349] rounded-md transition-colors shadow-sm"
            >
              Limpar Filtros
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
