import { useState, type FormEvent } from 'react';
import { 
  Calendar, MapPin, Users, DollarSign, CalendarCheck2, ShieldCheck, 
  Star, Headset, ChevronDown, Search, SlidersHorizontal, Heart, 
  Cake, GraduationCap, MessageSquare, Briefcase, MoreHorizontal 
} from 'lucide-react';
import heroNew from '../assets/hero_new.png';

interface HeroProps {
  onSearch: (filters: {
    type: string;
    location: string;
    date: string;
    guests: string;
    budget: string;
    query?: string;
  }) => void;
}

export default function Hero({ onSearch }: HeroProps) {
  const [type, setType] = useState('Casamento');
  const [location, setLocation] = useState('São Paulo - SP');
  const [date, setDate] = useState('24/06/2026');
  const [guests, setGuests] = useState('150 pessoas');
  const [budget, setBudget] = useState('Até R$ 20.000');

  // Mobile search state
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    onSearch({ type, location, date, guests, budget, query: searchQuery });
  };

  const handleCategoryClick = (categoryName: string) => {
    if (selectedCategory === categoryName) {
      setSelectedCategory(null);
      onSearch({ type: '', location: '', date: '', guests: '', budget: '', query: searchQuery });
    } else {
      setSelectedCategory(categoryName);
      onSearch({
        type: categoryName,
        location: '',
        date: '',
        guests: '',
        budget: '',
        query: searchQuery
      });
    }
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    onSearch({
      type: selectedCategory || '',
      location: '',
      date: '',
      guests: '',
      budget: '',
      query: val
    });
  };


  return (
    <section className="relative pt-12 pb-20 overflow-hidden bg-[#FAF8F5]">
      {/* Background Image Layer at full opacity (100%) */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-100 z-0"
        style={{ backgroundImage: `url(${heroNew})` }}
      ></div>

      {/* Light gradient overlay to ensure readability on the left while keeping the right side fully clear */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/90 via-[#FAF8F5]/75 to-transparent z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-25">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col text-left space-y-6">
            <div className="inline-flex items-center space-x-2">
              <span className="text-xs font-semibold tracking-[0.25em] text-[#B8975A] uppercase bg-[#F4F0E6] px-3 py-1.5 rounded-full">
                O lugar certo para
              </span>
            </div>

            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl text-[#2B2A27] font-normal leading-[1.1] tracking-tight">
              Momentos <br />
              <span className="text-[#B8975A] italic font-serif">Inesquecíveis</span>
            </h1>

            <p className="text-base sm:text-lg text-[#6E6B64] font-light max-w-xl leading-relaxed">
              Encontre os melhores locais para o seu evento, compare preços, veja a disponibilidade em tempo real e realize sua reserva com segurança.
            </p>
          </div>
          <div className="lg:col-span-5"></div>
        </div>

        <div className="mt-16 relative z-20">
          {/* Desktop Search Form */}
          <form 
            onSubmit={handleSearch}
            className="hidden lg:flex bg-white border border-[#EAE3D2] rounded-3xl shadow-xl p-4 lg:py-4 lg:px-6 w-full flex-row items-stretch lg:items-center justify-between gap-4 lg:gap-0"
          >
            {/* Field 1: Tipo de Evento */}
            <div className="flex items-center text-left flex-1 min-w-0 pr-2">
              <Calendar className="w-8 h-8 text-[#B8975A] flex-shrink-0 mr-3" />
              <div className="flex flex-col w-full min-w-0">
                <span className="text-[10px] text-[#6E6B64] font-medium leading-none">Tipo de Evento</span>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="bg-transparent border-0 text-[#2B2A27] text-sm font-semibold focus:ring-0 focus:outline-none p-0 cursor-pointer w-full leading-snug mt-1 appearance-none"
                >
                  <option value="Casamento">Casamento</option>
                  <option value="Aniversário">Aniversário</option>
                  <option value="Corporativo">Corporativo</option>
                  <option value="Formatura">Formatura</option>
                </select>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden lg:block border-r border-[#EAE3D2] h-10 mx-4"></div>

            {/* Field 2: Localização */}
            <div className="flex items-center text-left flex-1 min-w-0 pr-2">
              <MapPin className="w-8 h-8 text-[#B8975A] flex-shrink-0 mr-3" />
              <div className="flex flex-col w-full min-w-0 relative">
                <span className="text-[10px] text-[#6E6B64] font-medium leading-none">Localização</span>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-transparent border-0 text-[#2B2A27] text-sm font-semibold focus:ring-0 focus:outline-none p-0 cursor-pointer w-full leading-snug mt-1 appearance-none pr-4"
                >
                  <option value="São Paulo - SP">São Paulo</option>
                  <option value="Santa Isabel - SP">Santa Isabel</option>
                  <option value="Campinas - SP">Campinas</option>
                  <option value="Mairiporã - SP">Mairiporã</option>
                </select>
                <div className="absolute right-0 bottom-1 pointer-events-none text-[#B8975A]">
                  <ChevronDown className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden lg:block border-r border-[#EAE3D2] h-10 mx-4"></div>

            {/* Field 3: Data de Evento */}
            <div className="flex items-center text-left flex-1 min-w-0 pr-2">
              <Calendar className="w-8 h-8 text-[#B8975A] flex-shrink-0 mr-3" />
              <div className="flex flex-col w-full min-w-0 relative">
                <span className="text-[10px] text-[#6E6B64] font-medium leading-none">Data de Evento</span>
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="Selecione"
                  className="bg-transparent border-0 text-[#2B2A27] text-sm font-semibold focus:ring-0 focus:outline-none p-0 w-full leading-snug mt-1"
                />
                <div className="absolute right-0 bottom-1 pointer-events-none text-[#B8975A]">
                  <ChevronDown className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden lg:block border-r border-[#EAE3D2] h-10 mx-4"></div>

            {/* Field 4: Convidados */}
            <div className="flex items-center text-left flex-1 min-w-0 pr-2">
              <Users className="w-8 h-8 text-[#B8975A] flex-shrink-0 mr-3" />
              <div className="flex flex-col w-full min-w-0 relative">
                <span className="text-[10px] text-[#6E6B64] font-medium leading-none">Convidados</span>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="bg-transparent border-0 text-[#2B2A27] text-sm font-semibold focus:ring-0 focus:outline-none p-0 cursor-pointer w-full leading-snug mt-1 appearance-none pr-4"
                >
                  <option value="50 pessoas">50 pessoas</option>
                  <option value="150 pessoas">150 pessoas</option>
                  <option value="300 pessoas">300 pessoas</option>
                  <option value="500 pessoas">500+ pessoas</option>
                </select>
                <div className="absolute right-0 bottom-1 pointer-events-none text-[#B8975A]">
                  <ChevronDown className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden lg:block border-r border-[#EAE3D2] h-10 mx-4"></div>

            {/* Field 5: Orçamento */}
            <div className="flex items-center text-left flex-1 min-w-0 pr-4">
              <DollarSign className="w-8 h-8 text-[#B8975A] flex-shrink-0 mr-3" />
              <div className="flex flex-col w-full min-w-0 relative">
                <div className="flex items-center space-x-1">
                  <span className="text-[10px] text-[#6E6B64] font-medium leading-none">Orçamento</span>
                  <ChevronDown className="w-3 h-3 text-[#B8975A]" />
                </div>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="bg-transparent border-0 text-xs font-semibold focus:ring-0 focus:outline-none p-0 cursor-pointer w-full leading-snug mt-1 appearance-none"
                >
                  <option value="Até R$ 10.000">Até R$ 10.000</option>
                  <option value="Até R$ 20.000">R$ 15.000 - R$ 30.000</option>
                  <option value="Até R$ 40.000">Até R$ 40.000</option>
                  <option value="R$ 40.000+">Acima de R$ 40.000</option>
                </select>
              </div>
            </div>

            {/* Search Button */}
            <div className="flex-shrink-0">
              <button
                type="submit"
                className="w-full lg:w-auto bg-[#B8975A] hover:bg-[#A38349] text-white text-sm font-semibold py-3 px-6 rounded-2xl flex items-center justify-center space-x-2 transition-all shadow-md hover:shadow-lg"
              >
                <Search className="w-4 h-4 text-white" />
                <span>Buscar Locais</span>
              </button>
            </div>
          </form>

          {/* Mobile Search & Categories (lg:hidden) */}
          <div className="block lg:hidden text-left relative z-20 space-y-6">
            {/* Search bar row */}
            <div className="flex items-center space-x-3 w-full">
              <div className="flex-grow relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#B8975A]/75" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder="Buscar por cidade, espaço ou evento..."
                  className="w-full pl-11 pr-4 py-3 bg-white border border-[#B8975A]/25 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#B8975A] focus:border-[#B8975A] text-[#2B2A27] placeholder:text-gray-400 shadow-sm"
                />
              </div>
              <button 
                type="button"
                className="p-3 bg-white border border-[#B8975A]/60 rounded-xl hover:bg-[#FAF8F5] transition-all text-[#B8975A] shadow-sm cursor-pointer"
              >
                <SlidersHorizontal className="w-5 h-5" />
              </button>
            </div>

            {/* Categories horizontal scrolling list */}
            <div className="space-y-2.5">
              <div className="flex overflow-x-auto gap-4 py-2 scrollbar-none snap-x snap-mandatory">
                {[
                  { name: 'Casamento', label: 'Casamentos', icon: 'custom-rings' },
                  { name: 'Aniversário', label: 'Aniversários', icon: Cake },
                  { name: 'Formatura', label: 'Formatura', icon: GraduationCap },
                  { name: 'Palestras', label: 'Palestras', icon: MessageSquare },
                  { name: 'Corporativo', label: 'Corporativo', icon: Users },
                  { name: 'Outros', label: 'Outros', icon: MoreHorizontal }
                ].map((cat) => {
                  const isSelected = selectedCategory === cat.name;

                  return (
                    <button
                      key={cat.name}
                      type="button"
                      onClick={() => handleCategoryClick(cat.name)}
                      className="flex flex-col items-center flex-shrink-0 snap-start focus:outline-none cursor-pointer group"
                    >
                      <div className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all duration-300 ${
                        isSelected 
                          ? 'bg-[#B8975A] border-[#B8975A] text-white shadow-md scale-105' 
                          : 'bg-white border-[#B8975A]/35 text-[#B8975A] shadow-sm hover:border-[#B8975A] group-hover:scale-105'
                      }`}>
                        {cat.icon === 'custom-rings' ? (
                          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                            <circle cx="9" cy="12" r="4.5" />
                            <circle cx="15" cy="12" r="4.5" />
                          </svg>
                        ) : (
                          // @ts-ignore
                          <cat.icon className="w-6 h-6" />
                        )}
                      </div>
                      <span className="text-[10px] font-semibold text-[#6E6B64] mt-1.5 leading-none transition-colors">
                        {cat.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-y-4 gap-x-8 text-xs font-medium text-[#6E6B64]">
            <div className="flex items-center space-x-2">
              <CalendarCheck2 className="w-4 h-4 text-[#B8975A]" />
              <span>Disponibilidade em tempo real</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-[#B8975A] fill-[#B8975A]/10" />
              <span>Avaliações verificadas</span>
            </div>
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-[#B8975A]" />
              <span>Pagamento seguro</span>
            </div>
            <div className="flex items-center space-x-2">
              <Headset className="w-4 h-4 text-[#B8975A]" />
              <span>Suporte especializado</span>
            </div>
          </div>
        </div>
      </section>
    );
  }
