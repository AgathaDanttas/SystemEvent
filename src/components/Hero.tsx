import { useState, type FormEvent } from 'react';
import { Calendar, MapPin, Sparkles, Users, DollarSign, CalendarCheck2, ShieldCheck, Star, Headset } from 'lucide-react';
import heroImage from '../assets/hero_event.png';

interface HeroProps {
  onSearch: (filters: {
    type: string;
    location: string;
    date: string;
    guests: string;
    budget: string;
  }) => void;
}

export default function Hero({ onSearch }: HeroProps) {
  const [type, setType] = useState('Casamento');
  const [location, setLocation] = useState('São Paulo - SP');
  const [date, setDate] = useState('24/09/2026');
  const [guests, setGuests] = useState('150 pessoas');
  const [budget, setBudget] = useState('Até R$ 20.000');

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    onSearch({ type, location, date, guests, budget });
  };


  return (
    <section className="relative pt-12 pb-20 overflow-hidden bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

          <div className="lg:col-span-5 relative">
            <div className="relative w-full aspect-[4/3] sm:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white transition-transform duration-500 hover:scale-[1.02]">
              <img 
                src={heroImage} 
                alt="Espaço elegante para eventos com mesas decoradas" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
            </div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full border border-[#B8975A]/20 flex items-center justify-center bg-[#FAF8F5] -z-10 animate-pulse"></div>
          </div>
        </div>

        <div className="mt-16 relative z-20">
          <form 
            onSubmit={handleSearch}
            className="bg-white border border-[#EAE3D2] rounded-2xl shadow-xl p-6 sm:p-8"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              <div className="flex flex-col text-left space-y-2 border-r border-transparent lg:border-[#EAE3D2]/60 pr-2 last:border-0">
                <label className="text-[10px] uppercase tracking-wider font-semibold text-[#B8975A] flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Tipo do Evento</span>
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="bg-transparent border-0 text-[#2B2A27] text-sm font-medium focus:ring-0 focus:outline-none p-0 cursor-pointer w-full"
                >
                  <option value="Casamento">Casamento</option>
                  <option value="Aniversário">Aniversário</option>
                  <option value="Corporativo">Corporativo</option>
                  <option value="Formatura">Formatura</option>
                </select>
              </div>

              <div className="flex flex-col text-left space-y-2 border-r border-transparent lg:border-[#EAE3D2]/60 pr-2 last:border-0">
                <label className="text-[10px] uppercase tracking-wider font-semibold text-[#B8975A] flex items-center space-x-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Localização</span>
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-transparent border-0 text-[#2B2A27] text-sm font-medium focus:ring-0 focus:outline-none p-0 cursor-pointer w-full"
                >
                  <option value="São Paulo - SP">São Paulo - SP</option>
                  <option value="Santa Isabel - SP">Santa Isabel - SP</option>
                  <option value="Campinas - SP">Campinas - SP</option>
                  <option value="Mairiporã - SP">Mairiporã - SP</option>
                </select>
              </div>

              <div className="flex flex-col text-left space-y-2 border-r border-transparent lg:border-[#EAE3D2]/60 pr-2 last:border-0">
                <label className="text-[10px] uppercase tracking-wider font-semibold text-[#B8975A] flex items-center space-x-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Data do Evento</span>
                </label>
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="Selecione a data"
                  className="bg-transparent border-0 text-[#2B2A27] text-sm font-medium focus:ring-0 focus:outline-none p-0 w-full"
                />
              </div>

              <div className="flex flex-col text-left space-y-2 border-r border-transparent lg:border-[#EAE3D2]/60 pr-2 last:border-0">
                <label className="text-[10px] uppercase tracking-wider font-semibold text-[#B8975A] flex items-center space-x-1.5">
                  <Users className="w-3.5 h-3.5" />
                  <span>Convidados</span>
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="bg-transparent border-0 text-[#2B2A27] text-sm font-medium focus:ring-0 focus:outline-none p-0 cursor-pointer w-full"
                >
                  <option value="50 pessoas">Até 50 pessoas</option>
                  <option value="150 pessoas">Até 150 pessoas</option>
                  <option value="300 pessoas">Até 300 pessoas</option>
                  <option value="500 pessoas">Mais de 300</option>
                </select>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch lg:items-center justify-between gap-4">
                <div className="flex flex-col text-left space-y-2 w-full">
                  <label className="text-[10px] uppercase tracking-wider font-semibold text-[#B8975A] flex items-center space-x-1.5">
                    <DollarSign className="w-3.5 h-3.5" />
                    <span>Orçamento</span>
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="bg-transparent border-0 text-[#2B2A27] text-sm font-medium focus:ring-0 focus:outline-none p-0 cursor-pointer w-full"
                  >
                    <option value="Até R$ 10.000">Até R$ 10.000</option>
                    <option value="Até R$ 20.000">Até R$ 20.000</option>
                    <option value="Até R$ 40.000">Até R$ 40.000</option>
                    <option value="R$ 40.000+">Acima de R$ 40.000</option>
                  </select>
                </div>
                
                <button
                  type="submit"
                  className="bg-[#B8975A] hover:bg-[#A38349] text-white text-sm font-medium px-6 py-4 rounded-xl shadow-lg shadow-[#B8975A]/20 transition-all duration-300 transform hover:-translate-y-0.5 whitespace-nowrap"
                >
                  Buscar Locais
                </button>
              </div>
            </div>
          </form>

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
      </div>
    </section>
  );
}
