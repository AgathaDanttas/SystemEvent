import { useState, useEffect } from 'react';
import { 
  Star, MapPin, Users, Sparkles, ArrowLeft, 
  Calendar as CalendarIcon, Clock, Bell, ChevronDown, ShieldCheck, 
  Check, FileText, CheckCircle, Info, Search
} from 'lucide-react';
import logoGold from '../assets/logo_gold.png';

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

interface BookingDetailsProps {
  venue: Venue;
  onBack: () => void;
  userAvatar?: string;
  userEmail?: string;
  userName?: string;
}

interface CalendarDay {
  day: number;
  isCurrentMonth: boolean;
  status: 'available' | 'pending' | 'reserved' | 'none';
}

const MONTHS = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const YEARS = Array.from({ length: 15 }, (_, i) => 2025 + i); // 2025 to 2039

const getDaysInMonth = (year: number, month: number): CalendarDay[] => {
  const firstDayDate = new Date(year, month, 1);
  const firstWeekday = firstDayDate.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
  
  const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  
  const days: CalendarDay[] = [];
  
  // Previous month trailing days
  for (let i = firstWeekday - 1; i >= 0; i--) {
    days.push({
      day: daysInPrevMonth - i,
      isCurrentMonth: false,
      status: 'none'
    });
  }
  
  // Current month days
  for (let d = 1; d <= daysInCurrentMonth; d++) {
    let status: 'available' | 'pending' | 'reserved' | 'none' = 'available';
    
    if (year === 2026 && month === 5 && d === 14) {
      status = 'pending';
    } else {
      const dateObj = new Date(year, month, d);
      const weekday = dateObj.getDay();
      
      if (weekday === 6) { // Saturday
        status = d % 3 === 0 ? 'none' : 'reserved';
      } else if (weekday === 0) { // Sunday
        status = d % 2 === 0 ? 'reserved' : 'pending';
      } else {
        const seed = (year * 37) + (month * 17) + d;
        if (seed % 7 === 0) {
          status = 'reserved';
        } else if (seed % 11 === 0) {
          status = 'pending';
        } else {
          status = 'available';
        }
      }
    }
    
    days.push({
      day: d,
      isCurrentMonth: true,
      status
    });
  }
  
  // Next month leading days
  const totalCells = days.length <= 35 ? 35 : 42;
  const remaining = totalCells - days.length;
  for (let i = 1; i <= remaining; i++) {
    days.push({
      day: i,
      isCurrentMonth: false,
      status: 'none'
    });
  }
  
  return days;
};

export default function BookingDetails({ 
  venue, 
  onBack,
  userAvatar = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
  userEmail = 'cliente@momentos.com.br',
  userName = 'Ana Silva'
}: BookingDetailsProps) {
  // Calendar current view state (defaults to June 2026)
  const [currentMonth, setCurrentMonth] = useState<number>(5);
  const [currentYear, setCurrentYear] = useState<number>(2026);

  // Selected date state (defaults to June 14, 2026)
  const [selectedDate, setSelectedDate] = useState<{ day: number; month: number; year: number }>({
    day: 14,
    month: 5,
    year: 2026
  });

  // Booking states
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('14:00 - 18:00');
  const [guestCount, setGuestCount] = useState<number>(venue.capacity);
  const [observations, setObservations] = useState<string>(
    'Precisamos do espaço das 14h às 22h para montagem...'
  );
  
  // Extra services states
  const [services, setServices] = useState({
    buffet: true,
    dj: true,
    decoracao: false,
    fotografia: false
  });

  // Checkbox agreement states
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreeLiability, setAgreeLiability] = useState(false);

  // Stepper state
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Scroll to top on load or step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [venue, currentStep]);

  // Pricing constants based on selections
  const serviceCosts = {
    buffet: 6000,
    dj: 2000,
    decoracao: 3500,
    fotografia: 2500
  };

  const servicesTotal = 
    (services.buffet ? serviceCosts.buffet : 0) +
    (services.dj ? serviceCosts.dj : 0) +
    (services.decoracao ? serviceCosts.decoracao : 0) +
    (services.fotografia ? serviceCosts.fotografia : 0);

  const spaceCost = venue.price;
  const platformFee = Math.round((spaceCost + servicesTotal) * 0.1); // 10%
  const grandTotal = spaceCost + servicesTotal + platformFee;

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };

  const handleDaySelect = (dayObj: CalendarDay) => {
    if (!dayObj.isCurrentMonth) return;
    if (dayObj.status === 'reserved') {
      alert('Esta data já está reservada. Por favor, selecione um dia disponível.');
      return;
    }
    setSelectedDate({
      day: dayObj.day,
      month: currentMonth,
      year: currentYear
    });
  };

  const toggleService = (key: keyof typeof services) => {
    setServices(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSubmitBooking = () => {
    if (!agreeTerms || !agreeLiability) {
      alert('Você precisa aceitar os termos e condições para prosseguir.');
      return;
    }
    setCurrentStep(4);
  };

  const stepsConfig = [
    { number: '01', label: 'Data e horário', icon: CalendarIcon },
    { number: '02', label: 'Informações', icon: Info },
    { number: '03', label: 'Revisão', icon: Search },
    { number: '04', label: 'Confirmação', icon: Check },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col font-sans antialiased text-[#2B2A27]">
      {/* Detail-specific Header */}
      <header className="w-full h-20 bg-[#FAF8F5] border-b border-[#EAE3D2] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto w-full h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center cursor-pointer relative h-full" onClick={onBack}>
            <img 
              src={logoGold} 
              alt="Momentos Inesquecíveis Logo" 
              className="w-11 h-11 sm:w-24 sm:h-24 object-contain absolute left-0 top-1/2 -translate-y-1/2 max-w-none" 
            />
            <div className="flex flex-col text-left pl-14 sm:pl-[108px]">
              <span className="font-serif text-xs sm:text-base tracking-wider text-[#2B2A27] font-semibold leading-tight uppercase">
                MOMENTOS<br className="sm:hidden" /> INESQUECÍVEIS
              </span>
              <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.1em] sm:tracking-[0.2em] text-[#B8975A] font-medium leading-none mt-0.5 sm:mt-0">
                Plataforma
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <button className="relative p-2 text-[#6E6B64] hover:text-[#B8975A] transition-colors focus:outline-none">
              <Bell className="w-6 h-6" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#FAF8F5]"></span>
            </button>
            
            <div className="flex items-center space-x-3 pl-4 border-l border-[#EAE3D2]">
              <img 
                src={userAvatar} 
                alt="Avatar do Usuário" 
                className="w-10 h-10 rounded-full object-cover border border-[#B8975A]/30 shadow-inner" 
              />
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-semibold text-[#2B2A27]">{userName}</span>
                <span className="text-[10px] text-[#6E6B64]">{userEmail}</span>
              </div>
              <ChevronDown className="w-4 h-4 text-[#6E6B64]" />
            </div>
          </div>
        </div>
      </header>

      {/* Top Space Detail Banner (Full Width: spans edge-to-edge of the screen) */}
      <div className="relative w-full h-[360px] sm:h-[426px] bg-white overflow-hidden border-b border-[#EAE3D2] text-left">
        {/* Background image on the right side */}
        <div 
          className="absolute inset-0 bg-cover bg-right" 
          style={{ backgroundImage: `url(${venue.image})` }}
        />
        
        {/* Gradient overlay (confined to the left side on desktop to keep the right side image crisp and clear) */}
        <div className="absolute inset-y-0 left-0 w-full sm:w-[60%] bg-gradient-to-r from-white via-white/95 to-transparent"></div>
        
        {/* Content container aligned with max-w-7xl */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-between py-8 sm:py-12 relative z-10">
          {/* Breadcrumb Back Button */}
          <button
            onClick={() => {
              if (currentStep > 1 && currentStep < 4) {
                setCurrentStep(prev => prev - 1);
              } else {
                onBack();
              }
            }}
            className="flex items-center space-x-2 text-xs font-semibold text-[#B8975A] hover:text-[#A38349] transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>
              {currentStep > 1 && currentStep < 4 
                ? 'Voltar para etapa anterior' 
                : 'Voltar para o espaço'}
            </span>
          </button>

          <div className="space-y-4">
            <h1 className="font-serif text-3xl sm:text-5xl text-[#2B2A27] font-normal leading-tight max-w-full sm:max-w-[55%]">
              {venue.name}
            </h1>
            
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#6E6B64]">
              <div className="flex items-center space-x-1.5">
                <MapPin className="w-4.5 h-4.5 text-[#B8975A]" />
                <span>{venue.location}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Star className="w-4.5 h-4.5 text-[#B8975A] fill-[#B8975A]" />
                <span className="font-semibold text-[#2B2A27]">{venue.rating.toFixed(1)}</span>
                <span>({venue.reviewsCount} avaliações)</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-3.5 py-1.5 text-xs font-medium text-[#6E6B64] bg-[#F4F0E6] rounded-full border border-[#EAE3D2]">
                Ambiente externo
              </span>
              <span className="px-3.5 py-1.5 text-xs font-medium text-[#6E6B64] bg-[#F4F0E6] rounded-full border border-[#EAE3D2]">
                {venue.category}
              </span>
              <span className="px-3.5 py-1.5 text-xs font-medium text-[#6E6B64] bg-[#F4F0E6] rounded-full border border-[#EAE3D2]">
                Até {venue.capacity} convidados
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 flex flex-col">

        {/* Stepper Navigation (Matching Mockup with Icons) */}
        <div className="w-full py-6 mb-10">
          <div className="flex items-center justify-between w-full text-center">
            {stepsConfig.map((step, idx) => {
              const stepNum = idx + 1;
              const isActive = currentStep === stepNum;
              const isCompleted = currentStep > stepNum;
              
              const IconComponent = step.icon;
              
              let iconBgClass = 'border-[#D1CDCE] bg-[#FAF8F5]/50 text-[#6E6B64]/60';
              if (isCompleted) {
                iconBgClass = 'bg-[#B8975A] border-[#B8975A] text-white shadow-sm';
              } else if (isActive) {
                iconBgClass = 'bg-[#FAF0D9]/80 border-[#B8975A]/30 text-[#B8975A] shadow-sm';
              }
              
              const textClass = (isActive || isCompleted) ? 'text-[#B8975A]' : 'text-[#6E6B64]/60';
              const numClass = (isActive || isCompleted) ? 'text-[#B8975A]' : 'text-[#6E6B64]/50';

              return (
                <div key={stepNum} className="flex items-center flex-grow last:flex-grow-0">
                  <div className="flex flex-col sm:flex-row items-center sm:space-x-3 text-center sm:text-left">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${iconBgClass}`}>
                      {isCompleted ? <Check className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" /> : <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />}
                    </div>
                    <div className="flex flex-col mt-1 sm:mt-0 items-center sm:items-start">
                      <span className={`text-[8px] sm:text-[10px] font-bold uppercase tracking-wider leading-none mb-0.5 sm:mb-1 ${numClass}`}>{step.number}</span>
                      <span className={`text-[9px] sm:text-xs font-semibold leading-none ${textClass}`}>{step.label}</span>
                    </div>
                  </div>
                  {idx < stepsConfig.length - 1 && (
                    <div className={`h-[1px] flex-grow mx-1.5 sm:mx-4 transition-all duration-300 ${isCompleted ? 'bg-[#B8975A]/40' : 'bg-[#EAE3D2]'}`}></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Split Layout: Form & Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Form Steps */}
          <div className={`${currentStep === 4 ? 'lg:col-span-12 max-w-2xl mx-auto' : 'lg:col-span-7'} space-y-10 text-left w-full`}>
            
            {/* Step 1: Calendar & Time Slots */}
            {currentStep === 1 && (
              <div className="space-y-10 animate-in fade-in duration-300">
                {/* Choose Date */}
                <div className="space-y-4 bg-white p-6 rounded-3xl border border-[#EAE3D2] shadow-sm">
                  <div className="flex items-center space-x-3 pb-3 border-b border-[#EAE3D2]/60">
                    <div className="w-9 h-9 rounded-full bg-[#F4F0E6] flex items-center justify-center text-[#B8975A]">
                      <CalendarIcon className="w-5 h-5" />
                    </div>
                    <h2 className="font-serif text-xl sm:text-2xl text-[#2B2A27] font-normal">
                      1. Escolha a data
                    </h2>
                  </div>
                  <p className="text-sm text-[#6E6B64] font-light">Selecione um dia disponível no calendário abaixo:</p>
                  
                  {/* Calendar Container */}
                  <div className="max-w-md mx-auto pt-2">
                    <div className="flex justify-between items-center mb-6">
                      <button 
                        type="button" 
                        onClick={handlePrevMonth}
                        className="text-sm font-semibold text-[#6E6B64] hover:text-[#B8975A] transition-colors p-2"
                      >
                        &lt;
                      </button>
                      <div className="flex items-center space-x-1.5 font-serif text-lg font-medium text-[#2B2A27]">
                        <select
                          value={currentMonth}
                          onChange={(e) => setCurrentMonth(parseInt(e.target.value))}
                          className="bg-transparent border-none outline-none cursor-pointer hover:text-[#B8975A] transition-colors font-serif text-lg font-medium text-[#2B2A27] appearance-none text-center pr-1"
                        >
                          {MONTHS.map((m, idx) => (
                            <option key={idx} value={idx} className="bg-white text-[#2B2A27] text-sm font-sans">{m}</option>
                          ))}
                        </select>
                        <select
                          value={currentYear}
                          onChange={(e) => setCurrentYear(parseInt(e.target.value))}
                          className="bg-transparent border-none outline-none cursor-pointer hover:text-[#B8975A] transition-colors font-serif text-lg font-medium text-[#2B2A27] appearance-none text-center"
                        >
                          {YEARS.map((y) => (
                            <option key={y} value={y} className="bg-white text-[#2B2A27] text-sm font-sans">{y}</option>
                          ))}
                        </select>
                      </div>
                      <button 
                        type="button" 
                        onClick={handleNextMonth}
                        className="text-sm font-semibold text-[#6E6B64] hover:text-[#B8975A] transition-colors p-2"
                      >
                        &gt;
                      </button>
                    </div>
                    
                    {/* Weekdays */}
                    <div className="grid grid-cols-7 gap-1 text-center mb-2">
                      {['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'].map((d) => (
                        <span key={d} className="text-[10px] font-bold text-[#6E6B64] uppercase tracking-wider py-1">
                          {d}
                        </span>
                      ))}
                    </div>

                    {/* Days Grid */}
                    <div className="grid grid-cols-7 gap-2">
                      {getDaysInMonth(currentYear, currentMonth).map((dayObj, index) => {
                        const isSelected = dayObj.isCurrentMonth && 
                          selectedDate.day === dayObj.day &&
                          selectedDate.month === currentMonth &&
                          selectedDate.year === currentYear;
                        
                        let statusColorClass = 'bg-transparent';
                        if (dayObj.status === 'available') statusColorClass = 'bg-green-500';
                        else if (dayObj.status === 'pending') statusColorClass = 'bg-yellow-500';
                        else if (dayObj.status === 'reserved') statusColorClass = 'bg-red-500';

                        return (
                          <button
                            key={index}
                            type="button"
                            onClick={() => handleDaySelect(dayObj)}
                            disabled={!dayObj.isCurrentMonth}
                            className={`
                              py-3 rounded-xl flex flex-col items-center justify-between relative focus:outline-none transition-all duration-200 aspect-square
                              ${!dayObj.isCurrentMonth ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-[#F4F0E6]'}
                              ${isSelected ? 'bg-[#B8975A] text-white hover:bg-[#A38349] shadow-sm font-semibold scale-105' : 'text-[#2B2A27]'}
                            `}
                          >
                            <span className="text-sm">{dayObj.day}</span>
                            {dayObj.status !== 'none' && (
                              <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : statusColorClass} absolute bottom-1.5`}></span>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Legend */}
                    <div className="flex justify-center items-center space-x-6 mt-6 pt-4 border-t border-[#EAE3D2]/40 text-xs">
                      <div className="flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                        <span className="text-[#6E6B64]">Disponível</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
                        <span className="text-[#6E6B64]">Pendente</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                        <span className="text-[#6E6B64]">Reservado</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2: Time Slots */}
                <div className="space-y-4 bg-white p-6 rounded-3xl border border-[#EAE3D2] shadow-sm">
                  <div className="flex items-center space-x-3 pb-3 border-b border-[#EAE3D2]/60">
                    <div className="w-9 h-9 rounded-full bg-[#F4F0E6] flex items-center justify-center text-[#B8975A]">
                      <Clock className="w-5 h-5" />
                    </div>
                    <h2 className="font-serif text-xl sm:text-2xl text-[#2B2A27] font-normal">
                      2. Selecione o horário
                    </h2>
                  </div>
                  <p className="text-sm text-[#6E6B64] font-light">Escolha o período do dia desejado para o seu evento:</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    {[
                      { time: '14:00 - 18:00', duration: '4 horas' },
                      { time: '09:00 - 13:00', duration: '4 horas' },
                      { time: '18:00 - 22:00', duration: '4 horas' },
                    ].map((slot) => {
                      const isSelected = selectedTimeSlot === slot.time;
                      return (
                        <button
                          key={slot.time}
                          type="button"
                          onClick={() => setSelectedTimeSlot(slot.time)}
                          className={`
                            p-4 rounded-xl border text-center transition-all duration-300 focus:outline-none relative flex flex-col justify-center items-center space-y-1
                            ${isSelected 
                              ? 'border-[#B8975A] bg-[#F4F0E6]/50 shadow-sm' 
                              : 'border-[#EAE3D2] bg-white hover:border-[#B8975A]/60 hover:bg-[#FAF8F5]'
                            }
                          `}
                        >
                          <span className="text-sm font-semibold text-[#2B2A27]">{slot.time}</span>
                          <span className="text-xs text-[#6E6B64] font-light">{slot.duration}</span>
                          
                          {isSelected && (
                            <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#B8975A] text-white flex items-center justify-center">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Navigation Button */}
                <div className="flex justify-end pt-4">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="px-8 py-3 text-sm font-semibold uppercase tracking-wider text-white bg-[#B8975A] hover:bg-[#A38349] rounded-full transition-all duration-300 transform hover:-translate-y-0.5 shadow-sm hover:shadow-md cursor-pointer"
                  >
                    Avançar para Informações
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Event Info & Extra Services */}
            {currentStep === 2 && (
              <div className="space-y-10 animate-in fade-in duration-300">
                {/* Step 3: Event Info */}
                <div className="space-y-4 bg-white p-6 rounded-3xl border border-[#EAE3D2] shadow-sm">
                  <div className="flex items-center space-x-3 pb-3 border-b border-[#EAE3D2]/60">
                    <div className="w-9 h-9 rounded-full bg-[#F4F0E6] flex items-center justify-center text-[#B8975A]">
                      <Users className="w-5 h-5" />
                    </div>
                    <h2 className="font-serif text-xl sm:text-2xl text-[#2B2A27] font-normal">
                      3. Informações do evento
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 gap-6 pt-2">
                    <div className="flex flex-col space-y-1.5">
                      <label htmlFor="guest-input" className="text-xs font-semibold text-[#6E6B64] uppercase tracking-wider">
                        Quantidade de convidados
                      </label>
                      <input
                        id="guest-input"
                        type="number"
                        min="1"
                        max={venue.capacity * 2}
                        value={guestCount}
                        onChange={(e) => setGuestCount(Math.max(1, parseInt(e.target.value) || 0))}
                        className="w-full max-w-[200px] border border-[#EAE3D2] bg-[#FAF8F5] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#B8975A] transition-colors"
                      />
                      <span className="text-[10px] text-[#6E6B64] font-light">Capacidade máxima recomendada: {venue.capacity} pessoas.</span>
                    </div>

                    <div className="flex flex-col space-y-1.5">
                      <label htmlFor="obs-input" className="text-xs font-semibold text-[#6E6B64] uppercase tracking-wider">
                        Observações (opcional)
                      </label>
                      <textarea
                        id="obs-input"
                        rows={4}
                        value={observations}
                        onChange={(e) => setObservations(e.target.value)}
                        placeholder="Adicione detalhes específicos, preferências de infraestrutura, dúvidas, etc."
                        className="w-full border border-[#EAE3D2] bg-[#FAF8F5] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#B8975A] transition-colors resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Step 4: Extra Services */}
                <div id="passo-servicos" className="space-y-4 bg-white p-6 rounded-3xl border border-[#EAE3D2] shadow-sm">
                  <div className="flex items-center space-x-3 pb-3 border-b border-[#EAE3D2]/60">
                    <div className="w-9 h-9 rounded-full bg-[#F4F0E6] flex items-center justify-center text-[#B8975A]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <h2 className="font-serif text-xl sm:text-2xl text-[#2B2A27] font-normal">
                      4. Serviços adicionais (opcional)
                    </h2>
                  </div>
                  <p className="text-sm text-[#6E6B64] font-light">Marque os serviços extras para facilitar a organização do seu evento:</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {[
                      { key: 'buffet', title: 'Buffet Completo', price: serviceCosts.buffet, desc: 'a partir de R$ 40/pessoa' },
                      { key: 'dj', title: 'DJ Profissional e Som', price: serviceCosts.dj, desc: 'a partir de R$ 200/h' },
                      { key: 'decoracao', title: 'Decoração Temática', price: serviceCosts.decoracao, desc: 'a partir de R$ 3.500' },
                      { key: 'fotografia', title: 'Fotografia e Vídeo', price: serviceCosts.fotografia, desc: 'a partir de R$ 500/h' },
                    ].map((serv) => {
                      const isChecked = services[serv.key as keyof typeof services];
                      return (
                        <div
                          key={serv.key}
                          onClick={() => toggleService(serv.key as keyof typeof services)}
                          className={`
                            p-4 rounded-xl border text-left cursor-pointer transition-all duration-300 relative flex items-start space-x-4
                            ${isChecked 
                              ? 'border-[#B8975A] bg-[#F4F0E6]/30 shadow-sm' 
                              : 'border-[#EAE3D2] bg-white hover:border-[#B8975A]/60'
                            }
                          `}
                        >
                          <div className="pt-0.5">
                            <div className={`
                              w-5 h-5 rounded flex items-center justify-center border transition-all
                              ${isChecked 
                                ? 'border-[#B8975A] bg-[#B8975A] text-white' 
                                : 'border-[#EAE3D2] bg-white'
                              }
                            `}>
                              {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </div>
                          </div>
                          
                          <div className="space-y-1">
                            <h3 className="text-sm font-semibold text-[#2B2A27] leading-tight">{serv.title}</h3>
                            <p className="text-[10px] text-[#6E6B64] font-light leading-none">{serv.desc}</p>
                            <p className="text-xs font-medium text-[#B8975A] pt-1">R$ {serv.price.toLocaleString('pt-BR')}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Navigation Row */}
                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="px-8 py-3 text-sm font-semibold uppercase tracking-wider text-[#B8975A] hover:text-[#A38349] border border-[#B8975A] rounded-full transition-all duration-300 hover:bg-[#FAF0D9]/30 cursor-pointer"
                  >
                    Voltar
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (guestCount <= 0) {
                        alert('Por favor, insira uma quantidade válida de convidados.');
                        return;
                      }
                      setCurrentStep(3);
                    }}
                    className="px-8 py-3 text-sm font-semibold uppercase tracking-wider text-white bg-[#B8975A] hover:bg-[#A38349] rounded-full transition-all duration-300 transform hover:-translate-y-0.5 shadow-sm hover:shadow-md cursor-pointer"
                  >
                    Avançar para Revisão
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Review and Acceptance */}
            {currentStep === 3 && (
              <div className="space-y-10 animate-in fade-in duration-300">
                {/* Review Card */}
                <div className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-[#EAE3D2] shadow-sm">
                  <div className="flex items-center space-x-3 pb-3 border-b border-[#EAE3D2]/60">
                    <div className="w-9 h-9 rounded-full bg-[#F4F0E6] flex items-center justify-center text-[#B8975A]">
                      <Search className="w-5 h-5" />
                    </div>
                    <h2 className="font-serif text-xl sm:text-2xl text-[#2B2A27] font-normal">
                      Revisão dos Detalhes
                    </h2>
                  </div>

                  <p className="text-sm text-[#6E6B64] font-light">
                    Por favor, revise as informações da sua solicitação de reserva antes de enviar:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 text-sm">
                    <div className="space-y-3">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#6E6B64] tracking-wider block">Espaço</span>
                        <span className="font-semibold text-base text-[#2B2A27]">{venue.name}</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#6E6B64] tracking-wider block">Data Selecionada</span>
                        <span className="font-semibold text-[#2B2A27]">
                          {selectedDate.day.toString().padStart(2, '0')}/
                          {(selectedDate.month + 1).toString().padStart(2, '0')}/
                          {selectedDate.year}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#6E6B64] tracking-wider block">Horário/Período</span>
                        <span className="font-semibold text-[#2B2A27]">{selectedTimeSlot} (4 horas)</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#6E6B64] tracking-wider block">Convidados</span>
                        <span className="font-semibold text-[#2B2A27]">{guestCount} pessoas</span>
                      </div>
                      {observations && (
                        <div>
                          <span className="text-[10px] uppercase font-bold text-[#6E6B64] tracking-wider block">Observações</span>
                          <span className="text-xs font-light text-[#6E6B64] leading-relaxed block max-h-[80px] overflow-y-auto">{observations}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Services summary inside review */}
                  <div className="pt-4 border-t border-[#EAE3D2]/60 space-y-2">
                    <span className="text-[10px] uppercase font-bold text-[#6E6B64] tracking-wider block">Serviços Adicionais Selecionados</span>
                    <div className="space-y-1.5 pt-1">
                      {services.buffet && <div className="text-xs text-[#2B2A27] flex items-center space-x-2"><Check className="w-3.5 h-3.5 text-green-600" /> <span>Buffet Completo - R$ {serviceCosts.buffet.toLocaleString('pt-BR')}</span></div>}
                      {services.dj && <div className="text-xs text-[#2B2A27] flex items-center space-x-2"><Check className="w-3.5 h-3.5 text-green-600" /> <span>DJ Profissional e Som - R$ {serviceCosts.dj.toLocaleString('pt-BR')}</span></div>}
                      {services.decoracao && <div className="text-xs text-[#2B2A27] flex items-center space-x-2"><Check className="w-3.5 h-3.5 text-green-600" /> <span>Decoração Temática - R$ {serviceCosts.decoracao.toLocaleString('pt-BR')}</span></div>}
                      {services.fotografia && <div className="text-xs text-[#2B2A27] flex items-center space-x-2"><Check className="w-3.5 h-3.5 text-green-600" /> <span>Fotografia e Vídeo - R$ {serviceCosts.fotografia.toLocaleString('pt-BR')}</span></div>}
                      {!services.buffet && !services.dj && !services.decoracao && !services.fotografia && (
                        <span className="text-xs text-[#6E6B64] italic">Nenhum serviço extra contratado.</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Step 5: Terms and Conditions */}
                <div className="space-y-6 bg-white p-6 rounded-3xl border border-[#EAE3D2] shadow-sm">
                  <div className="flex items-center space-x-3 pb-3 border-b border-[#EAE3D2]/60">
                    <div className="w-9 h-9 rounded-full bg-[#F4F0E6] flex items-center justify-center text-[#B8975A]">
                      <FileText className="w-5 h-5" />
                    </div>
                    <h2 className="font-serif text-xl sm:text-2xl text-[#2B2A27] font-normal">
                      Declaração de Aceite
                    </h2>
                  </div>
                  
                  <div className="space-y-4 pt-2">
                    <div className="flex items-start space-x-3">
                      <div className="pt-1">
                        <input
                          id="agree-terms"
                          type="checkbox"
                          checked={agreeTerms}
                          onChange={(e) => setAgreeTerms(e.target.checked)}
                          className="w-4 h-4 text-[#B8975A] border-[#EAE3D2] rounded focus:ring-[#B8975A]"
                        />
                      </div>
                      <label htmlFor="agree-terms" className="text-xs text-[#6E6B64] font-light leading-relaxed cursor-pointer select-none">
                        Concordo com os <a href="#" className="font-semibold text-[#B8975A] hover:underline">Termos de uso</a> e a <a href="#" className="font-semibold text-[#B8975A] hover:underline">Política de Privacidade</a> da Eventix.
                      </label>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="pt-1">
                        <input
                          id="agree-liability"
                          type="checkbox"
                          checked={agreeLiability}
                          onChange={(e) => setAgreeLiability(e.target.checked)}
                          className="w-4 h-4 text-[#B8975A] border-[#EAE3D2] rounded focus:ring-[#B8975A]"
                        />
                      </div>
                      <label htmlFor="agree-liability" className="text-xs text-[#6E6B64] font-light leading-relaxed cursor-pointer select-none">
                        Concordo que sou responsável por quaisquer danos causados ao espaço, móveis, objetos, equipamentos ou decorações, e estou ciente de que poderão gerar cobrança adicional conforme contrato do fornecedor.
                      </label>
                    </div>
                  </div>

                  {/* Submit buttons */}
                  <div className="pt-4 border-t border-[#EAE3D2]/60 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="px-8 py-3 text-sm font-semibold uppercase tracking-wider text-[#B8975A] hover:text-[#A38349] border border-[#B8975A] rounded-full transition-all duration-300 hover:bg-[#FAF0D9]/30 cursor-pointer"
                    >
                      Voltar
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmitBooking}
                      className="px-8 py-3 text-sm font-semibold uppercase tracking-wider text-white bg-[#B8975A] hover:bg-[#A38349] rounded-full transition-all duration-300 transform hover:-translate-y-0.5 shadow-sm hover:shadow-md focus:outline-none cursor-pointer"
                    >
                      Confirmar e Solicitar Reserva
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Full Width Success Layout */}
            {currentStep === 4 && (
              <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#EAE3D2] shadow-xl text-center space-y-8 animate-in zoom-in-95 duration-300 w-full">
                <div className="w-20 h-20 bg-[#F4F0E6] rounded-full flex items-center justify-center text-[#B8975A] mx-auto shadow-inner">
                  <CheckCircle className="w-12 h-12" />
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-serif text-3xl text-[#2B2A27] font-normal">Solicitação Enviada com Sucesso!</h3>
                  <div className="h-[2px] w-16 bg-[#B8975A] mx-auto mt-2"></div>
                  <p className="text-sm text-[#6E6B64] font-light leading-relaxed max-w-md mx-auto pt-2">
                    Sua solicitação de reserva para o espaço <strong>{venue.name}</strong> para o dia <strong>{selectedDate.day.toString().padStart(2, '0')}/{(selectedDate.month + 1).toString().padStart(2, '0')}/{selectedDate.year}</strong> foi enviada e está em processamento.
                  </p>
                  <p className="text-xs text-[#B8975A] font-semibold pt-1">
                    Você receberá updates no seu e-mail cadastrado ({userEmail}).
                  </p>
                </div>

                <div className="pt-6 border-t border-[#EAE3D2]/60">
                  <button
                    onClick={onBack}
                    className="px-8 py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#B8975A] hover:bg-[#A38349] rounded-full transition-all shadow-md hover:shadow-lg focus:outline-none cursor-pointer"
                  >
                    Voltar para a Landing Page
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Sidebar (Resumo da reserva) - Hidden on step 4 */}
          {currentStep < 4 && (
            <aside className="lg:col-span-5 w-full sticky top-28 space-y-6">
              <div className="bg-[#F4F0E6] rounded-3xl p-6 sm:p-8 border border-[#EAE3D2] text-left space-y-6 relative overflow-hidden">
                
                <h2 className="font-serif text-2xl text-[#2B2A27] font-normal pb-3 border-b border-[#EAE3D2] flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-[#B8975A]" />
                  <span>Resumo da reserva</span>
                </h2>

                {/* Space Thumbnail */}
                <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden border border-[#EAE3D2] bg-white">
                  <img 
                    src={venue.image} 
                    alt={venue.name} 
                    className="w-full h-full object-cover" 
                  />
                </div>

                {/* Selected Booking Info */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-xs text-[#2B2A27]">
                    <Sparkles className="w-4 h-4 text-[#B8975A] flex-shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-[10px] text-[#6E6B64] font-light leading-none">Espaço</span>
                      <span className="font-semibold">{venue.name}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 text-xs text-[#2B2A27]">
                    <CalendarIcon className="w-4 h-4 text-[#B8975A] flex-shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-[10px] text-[#6E6B64] font-light leading-none">Data</span>
                      <span className="font-semibold">
                        {selectedDate.day.toString().padStart(2, '0')}/
                        {(selectedDate.month + 1).toString().padStart(2, '0')}/
                        {selectedDate.year}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 text-xs text-[#2B2A27]">
                    <Clock className="w-4 h-4 text-[#B8975A] flex-shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-[10px] text-[#6E6B64] font-light leading-none">Horário</span>
                      <span className="font-semibold">{selectedTimeSlot} (4 horas)</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 text-xs text-[#2B2A27]">
                    <Users className="w-4 h-4 text-[#B8975A] flex-shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-[10px] text-[#6E6B64] font-light leading-none">Convidados</span>
                      <span className="font-semibold">{guestCount} pessoas</span>
                    </div>
                  </div>
                </div>

                {/* Added Services list */}
                <div className="pt-4 border-t border-[#EAE3D2] space-y-3">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[#6E6B64]">Serviços Adicionados</h3>
                  
                  <div className="space-y-2">
                    {services.buffet && (
                      <div className="flex justify-between items-center text-xs text-[#2B2A27]">
                        <div className="flex items-center space-x-2">
                          <Check className="w-3.5 h-3.5 text-green-600" />
                          <span>Buffet Completo</span>
                        </div>
                        <span className="font-medium">R$ {serviceCosts.buffet.toLocaleString('pt-BR')}</span>
                      </div>
                    )}
                    
                    {services.dj && (
                      <div className="flex justify-between items-center text-xs text-[#2B2A27]">
                        <div className="flex items-center space-x-2">
                          <Check className="w-3.5 h-3.5 text-green-600" />
                          <span>DJ Profissional e Som</span>
                        </div>
                        <span className="font-medium">R$ {serviceCosts.dj.toLocaleString('pt-BR')}</span>
                      </div>
                    )}

                    {services.decoracao && (
                      <div className="flex justify-between items-center text-xs text-[#2B2A27]">
                        <div className="flex items-center space-x-2">
                          <Check className="w-3.5 h-3.5 text-green-600" />
                          <span>Decoração Temática</span>
                        </div>
                        <span className="font-medium">R$ {serviceCosts.decoracao.toLocaleString('pt-BR')}</span>
                      </div>
                    )}

                    {services.fotografia && (
                      <div className="flex justify-between items-center text-xs text-[#2B2A27]">
                        <div className="flex items-center space-x-2">
                          <Check className="w-3.5 h-3.5 text-green-600" />
                          <span>Fotografia e Vídeo</span>
                        </div>
                        <span className="font-medium">R$ {serviceCosts.fotografia.toLocaleString('pt-BR')}</span>
                      </div>
                    )}

                    {!services.buffet && !services.dj && !services.decoracao && !services.fotografia && (
                      <p className="text-xs text-[#6E6B64] italic">Nenhum serviço extra selecionado.</p>
                    )}
                  </div>

                  {currentStep === 1 && (
                    <button 
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#B8975A] hover:text-[#A38349] transition-colors border-b border-[#B8975A] pb-0.5 pt-1 cursor-pointer"
                    >
                      Adicionar Serviços
                    </button>
                  )}
                </div>

                {/* Price Calculation details */}
                <div className="pt-4 border-t border-[#EAE3D2] space-y-2 text-xs">
                  <div className="flex justify-between text-[#6E6B64]">
                    <span>Valor do espaço</span>
                    <span>R$ {spaceCost.toLocaleString('pt-BR')}</span>
                  </div>
                  <div className="flex justify-between text-[#6E6B64]">
                    <span>Serviços</span>
                    <span>R$ {servicesTotal.toLocaleString('pt-BR')}</span>
                  </div>
                  <div className="flex justify-between text-[#6E6B64]">
                    <span>Taxa Plataforma</span>
                    <span>R$ {platformFee.toLocaleString('pt-BR')}</span>
                  </div>
                  
                  <div className="pt-3 border-t border-[#EAE3D2]/60 flex justify-between items-end">
                    <span className="font-serif text-base font-semibold text-[#2B2A27]">Total estimado</span>
                    <span className="text-xl font-bold text-[#B8975A]">R$ {grandTotal.toLocaleString('pt-BR')}</span>
                  </div>
                </div>

                <p className="text-[10px] text-[#6E6B64] font-light italic leading-relaxed pt-2 border-t border-[#EAE3D2]/40">
                  * Valor estimado. O valor final será verificado e confirmado pelo fornecedor após a análise da solicitação.
                </p>

                {/* Secure Reservation Badge */}
                <div className="mt-4 p-4 bg-white/70 backdrop-blur-sm rounded-2xl border border-[#EAE3D2] flex items-start space-x-3 text-left">
                  <ShieldCheck className="w-5 h-5 text-[#B8975A] flex-shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-semibold text-[#2B2A27]">Reserva Segura</h4>
                    <p className="text-[9px] text-[#6E6B64] leading-relaxed">Seu pagamento só será solicitado após a aprovação da reserva pelo fornecedor.</p>
                  </div>
                </div>

              </div>
            </aside>
          )}
          
        </div>
      </main>
    </div>
  );
}
