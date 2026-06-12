import { useState } from 'react';
import { Star, MapPin, Users, Heart, ArrowLeft, SlidersHorizontal, Search, X } from 'lucide-react';

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

const ALL_MOCK_VENUES: Venue[] = [
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
  {
    id: 5,
    name: 'Espaço Vista da Serra',
    location: 'Mairiporã, SP',
    image: villaImg,
    rating: 4.7,
    reviewsCount: 56,
    capacity: 400,
    price: 9500,
    category: 'Formatura',
    featured: false,
    idealFor: 'Formaturas • Casamentos'
  },
  {
    id: 6,
    name: 'Salão Majestic',
    location: 'São Paulo, SP',
    image: glassImg,
    rating: 4.6,
    reviewsCount: 22,
    capacity: 120,
    price: 6000,
    category: 'Aniversário',
    featured: false,
    idealFor: 'Aniversários • Corporativo'
  },
  {
    id: 7,
    name: 'Chácara Primavera',
    location: 'Atibaia, SP',
    image: solarImg,
    rating: 4.9,
    reviewsCount: 81,
    capacity: 500,
    price: 11000,
    category: 'Casamento',
    featured: false,
    idealFor: 'Casamentos • Confraternizações'
  },
  {
    id: 8,
    name: 'Auditório Tech Inovação',
    location: 'São Paulo, SP',
    image: glassImg,
    rating: 4.9,
    reviewsCount: 15,
    capacity: 100,
    price: 5000,
    category: 'Palestras',
    featured: false,
    idealFor: 'Palestras • Workshops'
  }
];

interface AllVenuesProps {
  onBack: () => void;
  onSelectVenue: (venue: any) => void;
}

export default function AllVenues({ onBack, onSelectVenue }: AllVenuesProps) {
  const [favorites, setFavorites] = useState<number[]>([]);
  
  // Filtering States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedCapacity, setSelectedCapacity] = useState('Qualquer');
  const [maxBudget, setMaxBudget] = useState(20000);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  const filteredVenues = ALL_MOCK_VENUES.filter(venue => {
    // Search filter
    const matchesSearch = venue.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          venue.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Category filter
    const matchesCategory = selectedCategory === 'Todos' || venue.category === selectedCategory;

    // Capacity filter
    let matchesCapacity = true;
    if (selectedCapacity === 'Até 150') matchesCapacity = venue.capacity <= 150;
    else if (selectedCapacity === '150 a 300') matchesCapacity = venue.capacity > 150 && venue.capacity <= 300;
    else if (selectedCapacity === 'Mais de 300') matchesCapacity = venue.capacity > 300;

    // Budget filter
    const matchesBudget = venue.price <= maxBudget;

    return matchesSearch && matchesCategory && matchesCapacity && matchesBudget;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('Todos');
    setSelectedCapacity('Qualquer');
    setMaxBudget(20000);
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-left pb-16">
      {/* Top Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-xs font-semibold text-[#B8975A] hover:text-[#A38349] transition-colors mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para início</span>
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-serif text-2xl sm:text-4xl text-[#2B2A27] font-semibold tracking-tight">
              Todos os Espaços
            </h1>
            <p className="text-[#6E6B64] font-light mt-1.5 text-xs sm:text-sm">
              Encontre o local ideal comparando as melhores opções disponíveis na plataforma
            </p>
          </div>
          
          {/* Mobile Filter toggle */}
          <button 
            onClick={() => setShowMobileFilters(true)}
            className="lg:hidden flex items-center justify-center space-x-2 px-4 py-2.5 bg-white border border-[#EAE3D2] rounded-xl text-xs font-semibold text-[#6E6B64] cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#B8975A]" />
            <span>Filtrar</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Desktop Filter Sidebar (3/12 columns) */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6 bg-white border border-[#EAE3D2] rounded-3xl p-6 shadow-sm h-fit">
            <div className="flex items-center justify-between border-b border-[#EAE3D2]/50 pb-4">
              <h3 className="font-serif text-base font-bold text-[#2B2A27]">Filtros</h3>
              <button 
                onClick={clearFilters}
                className="text-xs text-[#B8975A] hover:text-[#A38349] font-medium"
              >
                Limpar tudo
              </button>
            </div>

            {/* Category Filter */}
            <div className="space-y-2.5">
              <h4 className="text-[10px] uppercase tracking-wider font-bold text-[#6E6B64]">Categorias</h4>
              <div className="flex flex-col space-y-1.5">
                {['Todos', 'Casamento', 'Aniversário', 'Formatura', 'Palestras', 'Corporativo'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-left text-xs py-1.5 px-3 rounded-lg transition-all ${
                      selectedCategory === cat 
                        ? 'bg-[#FAF0D9] text-[#B8975A] font-bold' 
                        : 'text-[#6E6B64] hover:bg-[#FAF8F5]'
                    }`}
                  >
                    {cat === 'Todos' ? 'Todos os eventos' : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Capacity Filter */}
            <div className="space-y-2.5 pt-4 border-t border-[#EAE3D2]/50">
              <h4 className="text-[10px] uppercase tracking-wider font-bold text-[#6E6B64]">Capacidade</h4>
              <div className="flex flex-col space-y-1.5">
                {['Qualquer', 'Até 150', '150 a 300', 'Mais de 300'].map((cap) => (
                  <button
                    key={cap}
                    onClick={() => setSelectedCapacity(cap)}
                    className={`text-left text-xs py-1.5 px-3 rounded-lg transition-all ${
                      selectedCapacity === cap 
                        ? 'bg-[#FAF0D9] text-[#B8975A] font-bold' 
                        : 'text-[#6E6B64] hover:bg-[#FAF8F5]'
                    }`}
                  >
                    {cap === 'Qualquer' ? 'Qualquer capacidade' : cap + ' convidados'}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget Range Filter */}
            <div className="space-y-3 pt-4 border-t border-[#EAE3D2]/50">
              <div className="flex justify-between items-center text-[10px] uppercase tracking-wider font-bold text-[#6E6B64]">
                <span>Orçamento Máximo</span>
                <span className="text-xs text-[#B8975A] lowercase font-bold">R$ {maxBudget.toLocaleString('pt-BR')}</span>
              </div>
              <input 
                type="range" 
                min="4000" 
                max="20000" 
                step="500"
                value={maxBudget}
                onChange={(e) => setMaxBudget(parseInt(e.target.value))}
                className="w-full h-1.5 bg-[#FAF0D9] rounded-lg appearance-none cursor-pointer accent-[#B8975A]"
              />
              <div className="flex justify-between text-[10px] text-[#6E6B64] font-medium leading-none">
                <span>R$ 4.000</span>
                <span>R$ 20.000</span>
              </div>
            </div>
          </aside>

          {/* Venues Grid & Search (9/12 columns) */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* Top Search input */}
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#B8975A]" />
              <input 
                type="text" 
                placeholder="Busque por nome do espaço, cidade, região..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-[#EAE3D2] rounded-2xl text-sm focus:outline-none focus:ring-1 focus:ring-[#B8975A] focus:border-[#B8975A] text-[#2B2A27] placeholder:text-[#6E6B64]/65 shadow-sm transition-all"
              />
            </div>

            {/* Total Results */}
            <p className="text-xs text-[#6E6B64] font-light">
              Mostrando <span className="font-semibold text-[#2B2A27]">{filteredVenues.length}</span> locais correspondentes
            </p>

            {/* Cards Grid */}
            {filteredVenues.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVenues.map((venue) => {
                  const isFav = favorites.includes(venue.id);
                  return (
                    <div 
                      key={venue.id}
                      className="group bg-white border border-[#EAE3D2] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
                    >
                      {/* Image header container */}
                      <div 
                        onClick={() => onSelectVenue(venue)}
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
      
                      {/* Information Container */}
                      <div className="p-5 flex flex-col flex-grow space-y-3">
                        <div className="flex justify-between items-start">
                          <h3 
                            onClick={() => onSelectVenue(venue)}
                            className="font-serif text-sm sm:text-base text-[#2B2A27] font-bold group-hover:text-[#B8975A] transition-colors cursor-pointer leading-tight"
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
                            onClick={() => onSelectVenue(venue)}
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
              <div className="bg-white border border-[#EAE3D2] rounded-3xl p-12 text-center max-w-lg mx-auto shadow-sm">
                <p className="text-lg font-medium text-[#2B2A27]">Nenhum local encontrado</p>
                <p className="text-sm text-[#6E6B64] mt-2 mb-6 font-light">
                  Não encontramos locais correspondentes aos filtros selecionados. Tente limpar os filtros ou digitar outro termo.
                </p>
                <button 
                  onClick={clearFilters}
                  className="px-6 py-2.5 text-sm font-semibold text-white bg-[#B8975A] hover:bg-[#A38349] rounded-xl transition-all shadow-sm cursor-pointer"
                >
                  Limpar todos os filtros
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Mobile Filter Sidebar Drawer */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex justify-end">
          <div className="w-80 bg-white h-full p-6 flex flex-col justify-between animate-in slide-in-from-right duration-200">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#EAE3D2]/50 pb-4">
                <h3 className="font-serif text-base font-bold text-[#2B2A27]">Filtros</h3>
                <button 
                  onClick={() => setShowMobileFilters(false)}
                  className="p-1 text-[#6E6B64] hover:text-[#2B2A27]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Category Filter */}
              <div className="space-y-2.5">
                <h4 className="text-[10px] uppercase tracking-wider font-bold text-[#6E6B64]">Categorias</h4>
                <div className="grid grid-cols-2 gap-2">
                  {['Todos', 'Casamento', 'Aniversário', 'Formatura', 'Palestras', 'Corporativo'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`text-center text-xs py-2 px-3 rounded-lg border transition-all ${
                        selectedCategory === cat 
                          ? 'bg-[#FAF0D9] border-[#B8975A] text-[#B8975A] font-bold' 
                          : 'border-[#EAE3D2] text-[#6E6B64] bg-[#FAF8F5]'
                      }`}
                    >
                      {cat === 'Todos' ? 'Todos' : cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Capacity Filter */}
              <div className="space-y-2.5 pt-4 border-t border-[#EAE3D2]/50">
                <h4 className="text-[10px] uppercase tracking-wider font-bold text-[#6E6B64]">Capacidade</h4>
                <div className="grid grid-cols-2 gap-2">
                  {['Qualquer', 'Até 150', '150 a 300', 'Mais de 300'].map((cap) => (
                    <button
                      key={cap}
                      onClick={() => setSelectedCapacity(cap)}
                      className={`text-center text-xs py-2 px-3 rounded-lg border transition-all ${
                        selectedCapacity === cap 
                          ? 'bg-[#FAF0D9] border-[#B8975A] text-[#B8975A] font-bold' 
                          : 'border-[#EAE3D2] text-[#6E6B64] bg-[#FAF8F5]'
                      }`}
                    >
                      {cap}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget Range Filter */}
              <div className="space-y-3 pt-4 border-t border-[#EAE3D2]/50">
                <div className="flex justify-between items-center text-[10px] uppercase tracking-wider font-bold text-[#6E6B64]">
                  <span>Orçamento Máximo</span>
                  <span className="text-xs text-[#B8975A] lowercase font-bold">R$ {maxBudget.toLocaleString('pt-BR')}</span>
                </div>
                <input 
                  type="range" 
                  min="4000" 
                  max="20000" 
                  step="500"
                  value={maxBudget}
                  onChange={(e) => setMaxBudget(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-[#FAF0D9] rounded-lg appearance-none cursor-pointer accent-[#B8975A]"
                />
              </div>
            </div>

            <div className="flex space-x-3 border-t border-[#EAE3D2]/50 pt-4 mt-6">
              <button 
                onClick={clearFilters}
                className="flex-1 py-2.5 border border-[#EAE3D2] text-xs font-semibold text-[#6E6B64] rounded-xl hover:bg-[#FAF8F5] transition-colors"
              >
                Limpar
              </button>
              <button 
                onClick={() => setShowMobileFilters(false)}
                className="flex-1 py-2.5 bg-[#B8975A] hover:bg-[#A38349] text-white text-xs font-semibold rounded-xl shadow-sm transition-colors"
              >
                Aplicar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
