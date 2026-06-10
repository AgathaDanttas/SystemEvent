import { useState } from 'react';
import { Star, MapPin, Users, Heart, Sparkles } from 'lucide-react';

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
}

const INITIAL_VENUES: Venue[] = [
  {
    id: 1,
    name: 'Villa Natureza',
    location: 'Santa Isabel - SP',
    image: villaImg,
    rating: 4.9,
    reviewsCount: 28,
    capacity: 150,
    price: 5000,
    category: 'Casamento',
    featured: true,
  },
  {
    id: 2,
    name: 'Espaço Jardim',
    location: 'Mairiporã - SP',
    image: jardimImg,
    rating: 4.8,
    reviewsCount: 34,
    capacity: 250,
    price: 7500,
    category: 'Casamento',
    featured: true,
  },
  {
    id: 3,
    name: 'Mansão Glass',
    location: 'São Paulo - SP',
    image: glassImg,
    rating: 5.0,
    reviewsCount: 42,
    capacity: 200,
    price: 12000,
    category: 'Corporativo',
    featured: true,
  },
  {
    id: 4,
    name: 'Solar das Flores',
    location: 'Campinas - SP',
    image: solarImg,
    rating: 4.9,
    reviewsCount: 19,
    capacity: 300,
    price: 15000,
    category: 'Casamento',
    featured: true,
  },
];

interface FeaturedVenuesProps {
  filters: {
    type: string;
    location: string;
    date: string;
    guests: string;
    budget: string;
  } | null;
}

export default function FeaturedVenues({ filters }: FeaturedVenuesProps) {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  const filteredVenues = INITIAL_VENUES.filter(venue => {
    if (!filters) return true;

    if (filters.type && venue.category !== filters.type) {
    }

    if (filters.location && filters.location !== 'Selecione' && venue.location !== filters.location) {
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

    return true;
  });

  return (
    <section className="py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 text-left">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#2B2A27] font-normal">
              Locais em destaque
            </h2>
            <p className="text-[#6E6B64] font-light mt-2 text-sm sm:text-base">
              Espaços incríveis selecionados para o seu momento perfeito
            </p>
          </div>
          <button className="mt-4 sm:mt-0 inline-flex items-center text-xs font-semibold uppercase tracking-wider text-[#B8975A] hover:text-[#A38349] transition-colors border-b border-[#B8975A] pb-1">
            Ver todos os locais
          </button>
        </div>

        {filteredVenues.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredVenues.map((venue) => {
              const isFav = favorites.includes(venue.id);
              return (
                <div 
                  key={venue.id}
                  className="group bg-white border border-[#EAE3D2] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                    <img 
                      src={venue.image} 
                      alt={venue.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-60"></div>

                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center space-x-1 shadow-sm">
                      <Sparkles className="w-3 h-3 text-[#B8975A] fill-[#B8975A]" />
                      <span className="text-[10px] font-bold text-[#B8975A] uppercase tracking-wider">
                        Exclusivo
                      </span>
                    </div>

                    <button
                      onClick={() => toggleFavorite(venue.id)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#6E6B64] hover:text-[#e11d48] transition-colors duration-200 shadow-sm focus:outline-none"
                    >
                      <Heart 
                        className={`w-4.5 h-4.5 transition-colors ${
                          isFav ? 'text-red-500 fill-red-500' : ''
                        }`} 
                      />
                    </button>

                    <div className="absolute bottom-3 right-3 bg-[#B8975A]/95 text-white backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center space-x-1 text-xs font-semibold shadow-sm">
                      <Star className="w-3 h-3 fill-white text-white" />
                      <span>{venue.rating.toFixed(1)}</span>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-grow text-left space-y-4">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#B8975A]">
                        {venue.category}
                      </span>
                      <h3 className="font-serif text-lg text-[#2B2A27] font-semibold mt-1 group-hover:text-[#B8975A] transition-colors">
                        {venue.name}
                      </h3>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-xs text-[#6E6B64]">
                        <MapPin className="w-4 h-4 text-[#B8975A]/80 flex-shrink-0" />
                        <span className="truncate">{venue.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-[#6E6B64]">
                        <Users className="w-4 h-4 text-[#B8975A]/80 flex-shrink-0" />
                        <span>Até {venue.capacity} convidados</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#EAE3D2]/60 flex items-end justify-between mt-auto">
                      <div className="flex flex-col">
                        <span className="text-[9px] uppercase tracking-wider text-[#6E6B64] font-medium">
                          Diária a partir de
                        </span>
                        <span className="text-base font-semibold text-[#2B2A27]">
                          R$ {venue.price.toLocaleString('pt-BR')}
                        </span>
                      </div>
                      <button className="text-xs font-semibold text-[#B8975A] hover:text-[#A38349] transition-colors">
                        Ver Detalhes →
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
