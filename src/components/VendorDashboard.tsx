import { useState } from 'react';
import {
  LayoutDashboard, Store, CalendarCheck, ClipboardList, MessageSquare,
  Star, CircleDollarSign, Calendar, Percent, BarChart3, Settings,
  Bell, ChevronDown, LogOut, FolderPlus, CalendarPlus, Image,
  Tag, ChevronLeft, ChevronRight, TrendingUp, MoreHorizontal,
  X, Check, AlertCircle, Plus, Send, Trash2, MapPin, Users
} from 'lucide-react';
import logoGold from '../assets/logo_gold.png';
import authBanner from '../assets/auth_banner.jpg';

interface VendorDashboardProps {
  userName: string;
  userEmail: string;
  userAvatar: string;
  onLogout: () => void;
  onSwitchToClient: () => void;
}

export default function VendorDashboard({
  userName,
  userEmail,
  userAvatar,
  onLogout,
  onSwitchToClient
}: VendorDashboardProps) {
  const [activeTab, setActiveTab] = useState('Painel');
  const [activeSidebar, setActiveSidebar] = useState('Visão geral');
  const [profileOpen, setProfileOpen] = useState(false);

  // Core functional states
  const [reservationsList, setReservationsList] = useState([
    { id: 1, event: 'Casamento de Juliana e Pedro', venue: 'Villa Natureza', date: '24/06/2026', time: '16:00', guests: 150, status: 'Confirmada' },
    { id: 2, event: 'Evento Corporativo - Summit', venue: 'Espaço Serra', date: '02/07/2026', time: '09:00', guests: 80, status: 'Pendente' },
    { id: 3, event: 'Aniversário 50 anos - Carlos', venue: 'Villa Natureza', date: '10/07/2026', time: '18:00', guests: 120, status: 'Confirmada' },
    { id: 4, event: 'Workshop de Marketing', venue: 'Espaço Serra', date: '18/07/2026', time: '14:00', guests: 60, status: 'Confirmada' },
    { id: 5, event: 'Casamento de Marina e Lucas', venue: 'Villa Natureza', date: '25/07/2026', time: '17:00', guests: 200, status: 'Pendente' }
  ]);

  const [requestsList, setRequestsList] = useState([
    { id: 101, type: 'Casamento', venue: 'Villa Natureza', date: '15/07/2026', guests: '150 pessoas', badge: 'Nova', name: 'Juliana & Pedro' },
    { id: 102, type: 'Evento Corporativo', venue: 'Espaço Serra', date: '22/07/2026', guests: '80 pessoas', name: 'Summit Group' },
    { id: 103, type: 'Aniversário', venue: 'Villa Natureza', date: '30/07/2026', guests: '100 pessoas', name: 'Helena Santos' }
  ]);

  // Dashboard Stats States
  const [confirmedCount, setConfirmedCount] = useState(32);
  const [solicitacoesCount, setSolicitacoesCount] = useState(86);
  const [receitaTotal, setReceitaTotal] = useState(48750);
  const [viewsCount] = useState(1248);

  // Modals Toggler State
  const [activeModal, setActiveModal] = useState<'addSpace' | 'blockAvailability' | 'addPhotos' | 'createPromo' | null>(null);
  
  // Quick actions forms data states
  const [newSpace, setNewSpace] = useState({ name: '', location: '', capacity: '', price: '', category: 'Casamento' });
  const [blockedDatesInput, setBlockedDatesInput] = useState({ venue: 'Villa Natureza', date: '2026-06-12', type: 'reserved' });
  const [promoInput, setPromoInput] = useState({ code: '', discount: '', description: '' });
  const [spaceList, setSpaceList] = useState([
    {
      id: 1,
      name: 'Villa Natureza',
      location: 'São Paulo, SP',
      price: 8500,
      capacity: 150,
      category: 'Casamento',
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
      status: 'Ativo',
      rating: 4.9,
      reviewsCount: 42
    },
    {
      id: 2,
      name: 'Espaço Serra',
      location: 'Mairiporã, SP',
      price: 7500,
      capacity: 100,
      category: 'Corporativo',
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80',
      status: 'Ativo',
      rating: 4.8,
      reviewsCount: 28
    }
  ]);

  // Alert/Notifications state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  // Calendar Toggles
  const [currentMonthIndex, setCurrentMonthIndex] = useState(5); // 5 = June, 6 = July
  const monthsList = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  
  const [calendarEvents, setCalendarEvents] = useState<Record<number, { title: string; type: 'reserved' | 'pending' | 'blocked'; description?: string }>>({
    15: { title: 'Casamento de Helena Santos (Pendente)', type: 'pending' },
    24: { title: 'Casamento de Juliana e Pedro', type: 'reserved' },
    26: { title: 'Reserva Particular - Espaço Serra', type: 'reserved' },
    27: { title: 'Festa de Debutante', type: 'reserved' }
  });
  
  const [selectedDayInfo, setSelectedDayInfo] = useState<number | null>(null);

  // Messaging state
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'client', text: 'Olá! Tenho interesse em reservar o espaço Villa Natureza para o dia 15 de julho. A data está disponível?', time: '10:28' },
    { sender: 'vendor', text: 'Olá Juliana! Sim, a data de 15 de julho está livre no momento. Você gostaria de agendar uma visita virtual?', time: '10:29' },
    { sender: 'client', text: 'Sim, por favor! Uma visita no final da tarde seria excelente.', time: '10:30' }
  ]);
  const [replyText, setReplyText] = useState('');

  const triggerToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Action handlers
  const handleAcceptRequest = (id: number) => {
    const req = requestsList.find(r => r.id === id);
    if (!req) return;

    // Remove from request list
    setRequestsList(prev => prev.filter(r => r.id !== id));
    
    // Add to reservations list
    const newRes = {
      id: Date.now(),
      event: `${req.type} de ${req.name || 'Cliente'}`,
      venue: req.venue,
      date: req.date,
      time: '16:00',
      guests: parseInt(req.guests) || 100,
      status: 'Confirmada'
    };
    
    setReservationsList(prev => [newRes, ...prev]);

    // Update stats
    setConfirmedCount(prev => prev + 1);
    setSolicitacoesCount(prev => Math.max(0, prev - 1));
    setReceitaTotal(prev => prev + 8500);

    // Dynamic calendar update if matches date format
    const dayMatch = req.date.match(/^(\d+)/);
    if (dayMatch) {
      const day = parseInt(dayMatch[1]);
      setCalendarEvents(prev => ({
        ...prev,
        [day]: { title: `${req.type} - ${req.venue}`, type: 'reserved' }
      }));
    }

    triggerToast(`Solicitação de ${req.name || 'Cliente'} aceita com sucesso!`);
  };

  const handleDeclineRequest = (id: number) => {
    const req = requestsList.find(r => r.id === id);
    if (!req) return;

    // Remove from request list
    setRequestsList(prev => prev.filter(r => r.id !== id));
    setSolicitacoesCount(prev => Math.max(0, prev - 1));

    triggerToast(`Solicitação de ${req.name || 'Cliente'} recusada.`, 'info');
  };

  const handleCreateSpace = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSpace.name || !newSpace.price) return;

    const added = {
      id: Date.now(),
      name: newSpace.name,
      location: newSpace.location || 'São Paulo, SP',
      price: parseFloat(newSpace.price) || 5000,
      capacity: parseInt(newSpace.capacity) || 150,
      category: newSpace.category || 'Casamento',
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
      status: 'Ativo',
      rating: 5.0,
      reviewsCount: 0
    };

    setSpaceList(prev => [...prev, added]);
    triggerToast(`Espaço "${newSpace.name}" cadastrado com sucesso!`);
    setNewSpace({ name: '', location: '', capacity: '', price: '', category: 'Casamento' });
    setActiveModal(null);
  };

  const handleDeleteSpace = (name: string) => {
    if (confirm(`Tem certeza que deseja excluir o espaço "${name}"?`)) {
      setSpaceList(prev => prev.filter(s => s.name !== name));
      triggerToast(`Espaço "${name}" excluído com sucesso!`, 'info');
    }
  };

  const handleBlockAvailability = (e: React.FormEvent) => {
    e.preventDefault();
    const dateObj = new Date(blockedDatesInput.date);
    const day = dateObj.getDate() + 1; // standard timezone adjustment for mock
    
    setCalendarEvents(prev => ({
      ...prev,
      [day]: { 
        title: `Bloqueado: ${blockedDatesInput.venue}`, 
        type: blockedDatesInput.type as 'reserved' | 'pending' | 'blocked'
      }
    }));

    triggerToast(`Bloqueio de data agendado para o dia ${day} de Junho!`);
    setActiveModal(null);
  };

  const handleCreatePromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.code || !promoInput.discount) return;

    triggerToast(`Cupom de desconto "${promoInput.code.toUpperCase()}" criado com ${promoInput.discount}% OFF!`);
    setPromoInput({ code: '', discount: '', description: '' });
    setActiveModal(null);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const timeStr = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    setChatMessages(prev => [...prev, { sender: 'vendor', text: replyText, time: timeStr }]);
    setReplyText('');
    
    // Auto simulated reply from client after 2 seconds
    setTimeout(() => {
      setChatMessages(prev => [...prev, { 
        sender: 'client', 
        text: 'Perfeito! Obrigado pelo retorno rápido. Vou analisar e te confirmo.', 
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) 
      }]);
    }, 2000);
  };

  // Mocking calendar days block
  const getDaysInMonth = (month: number) => {
    return month === 5 ? 30 : 31; // June = 30, July = 31
  };
  const calendarDays = Array.from({ length: getDaysInMonth(currentMonthIndex) }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-[#FAF8F5] font-sans antialiased text-[#2B2A27]">
      
      {/* Toast Alert Popups */}
      {toast && (
        <div className="fixed top-4 right-4 z-[100] flex items-center space-x-3 bg-white border border-[#EAE3D2] rounded-2xl px-5 py-3.5 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            toast.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
          }`}>
            {toast.type === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          </div>
          <div>
            <p className="text-xs font-bold text-[#2B2A27]">{toast.message}</p>
          </div>
        </div>
      )}

      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-[#EAE3D2] px-4 py-2.5 sm:px-6 sm:py-3 shadow-sm flex items-center justify-between">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="flex items-center cursor-pointer relative h-12">
            <img src={logoGold} alt="Logo" className="w-9 h-9 sm:w-12 sm:h-12 object-contain" />
            <div className="flex flex-col text-left pl-2 sm:pl-3">
              <span className="font-serif text-[10px] sm:text-sm tracking-wider font-bold uppercase text-[#2B2A27] leading-tight">
                MOMENTOS<br className="sm:hidden" /> INESQUECÍVEIS
              </span>
              <span className="text-[7px] sm:text-[8px] uppercase tracking-[0.1em] sm:tracking-[0.2em] text-[#B8975A] font-bold leading-none mt-0.5">
                PLATAFORMA PARA FORNECEDORES
              </span>
            </div>
          </div>

          {/* Top navigation links */}
          <nav className="hidden lg:flex items-center space-x-6 pl-8">
            {['Painel', 'Meus espaços', 'Reservas', 'Mensagens', 'Financeiro', 'Avaliações'].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  if (tab === 'Painel') {
                    setActiveSidebar('Visão geral');
                  } else {
                    setActiveSidebar(tab);
                  }
                }}
                className={`relative py-2 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                  activeTab === tab ? 'text-[#B8975A]' : 'text-[#6E6B64] hover:text-[#B8975A]'
                }`}
              >
                {tab}
                {tab === 'Mensagens' && (
                  <span className="ml-1 px-1.5 py-0.5 bg-[#FAF0E6] text-[#B8975A] rounded-full text-[9px] font-bold">5</span>
                )}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B8975A] rounded-full"></span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Top Right Profile info */}
        <div className="flex items-center space-x-3 sm:space-x-6">
          <button className="relative p-1.5 text-[#6E6B64] hover:text-[#B8975A] transition-colors focus:outline-none cursor-pointer">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>

          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center space-x-2 sm:space-x-3 focus:outline-none cursor-pointer"
            >
              <img
                src={userAvatar}
                alt="Profile Avatar"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border border-[#B8975A]/40 shadow-inner"
              />
              <div className="hidden md:flex flex-col text-left">
                <span className="text-xs font-bold leading-tight">{userName}</span>
                <span className="text-[10px] text-[#6E6B64] font-medium leading-none">Fornecedor</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-[#6E6B64]" />
            </button>

            {/* Profile Dropdown Menu */}
            {profileOpen && (
              <div className="absolute right-0 mt-2.5 w-52 rounded-2xl shadow-xl bg-white border border-[#EAE3D2] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-4 py-2 border-b border-[#EAE3D2]/60">
                  <p className="text-xs font-bold text-[#2B2A27]">{userName}</p>
                  <p className="text-[10px] text-[#6E6B64] truncate">{userEmail}</p>
                </div>
                <button
                  onClick={() => { setProfileOpen(false); onSwitchToClient(); }}
                  className="w-full text-left flex items-center space-x-2 px-4 py-2.5 text-xs text-[#2B2A27] hover:bg-[#F4F0E6] hover:text-[#B8975A] transition-colors cursor-pointer"
                >
                  <Store className="w-4 h-4" />
                  <span>Ver Site de Cliente</span>
                </button>
                <button
                  onClick={() => { setProfileOpen(false); onLogout(); }}
                  className="w-full text-left flex items-center space-x-2 px-4 py-2.5 text-xs text-red-500 hover:bg-red-50 transition-colors cursor-pointer border-t border-[#EAE3D2]/40"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sair da Conta</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Grid: Sidebar + Content */}
      <div className="flex">
        {/* Left Sidebar */}
        <aside className="w-64 bg-white border-r border-[#EAE3D2] p-4 space-y-6 hidden md:flex flex-col justify-between">
          <div className="space-y-1">
            {[
              { label: 'Visão geral', icon: LayoutDashboard },
              { label: 'Meus espaços', icon: Store },
              { label: 'Reservas', icon: CalendarCheck, count: confirmedCount },
              { label: 'Solicitações', icon: ClipboardList, count: solicitacoesCount },
              { label: 'Mensagens', icon: MessageSquare, count: 5 },
              { label: 'Avaliações', icon: Star },
              { label: 'Financeiro', icon: CircleDollarSign },
              { label: 'Calendário', icon: Calendar },
              { label: 'Promoções', icon: Percent },
              { label: 'Relatórios', icon: BarChart3 },
              { label: 'Configurações', icon: Settings }
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeSidebar === item.label;
              return (
                <button
                  key={item.label}
                  onClick={() => {
                    setActiveSidebar(item.label);
                    if (item.label === 'Visão geral') {
                      setActiveTab('Painel');
                    } else {
                      setActiveTab(item.label);
                    }
                    if (item.label === 'Mensagens') setChatOpen(true);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer text-left ${
                    isActive
                      ? 'bg-[#FAF0E6]/60 text-[#B8975A] border-l-4 border-[#B8975A] rounded-l-none'
                      : 'text-[#6E6B64] hover:bg-[#FAF8F5] hover:text-[#B8975A]'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#B8975A]' : 'text-[#6E6B64]'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.count !== undefined && (
                    <span className="px-1.5 py-0.5 bg-[#FAF0E6] text-[#B8975A] rounded-full text-[9px] font-bold">
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Plan Widget */}
          <div className="bg-[#FAF8F5] border border-[#EAE3D2] rounded-2xl p-4 text-center space-y-3.5 shadow-inner">
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-wider text-[#6E6B64] font-semibold flex items-center justify-center space-x-1">
                <Star className="w-3.5 h-3.5 fill-[#B8975A] text-[#B8975A] mr-1" />
                <span>Plano Profissional</span>
              </p>
              <p className="text-[9px] text-[#6E6B64] font-light">Válido até 24/05/2026</p>
            </div>
            <button className="w-full py-2 border border-[#B8975A] text-[#B8975A] text-[10px] font-bold uppercase tracking-wider rounded-xl hover:bg-[#B8975A] hover:text-white transition-all duration-300 cursor-pointer">
              Gerenciar plano
            </button>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-grow p-4 sm:p-6 space-y-6 max-w-[1400px] mx-auto">
          {activeSidebar === 'Meus espaços' || activeTab === 'Meus espaços' ? (
            <div className="space-y-6 animate-in fade-in duration-300 text-left">
              {/* Header row */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#EAE3D2]/60">
                <div>
                  <h1 className="font-serif text-2xl sm:text-3xl text-[#2B2A27] font-normal">
                    Meus Espaços
                  </h1>
                  <p className="text-xs text-[#6E6B64] font-light mt-1">
                    Gerencie as informações, fotos e preços de cada um dos seus locais.
                  </p>
                </div>
                <button
                  onClick={() => setActiveModal('addSpace')}
                  className="inline-flex items-center justify-center space-x-2 bg-[#B8975A] hover:bg-[#A38349] text-white text-xs font-bold uppercase tracking-wider py-3 px-5 rounded-2xl shadow-sm hover:shadow transition-all duration-300 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Cadastrar Novo Espaço</span>
                </button>
              </div>

              {/* Spaces Grid */}
              {spaceList.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
                  {spaceList.map((space, idx) => (
                    <div 
                      key={space.id || idx} 
                      className="bg-white border border-[#EAE3D2] rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group"
                    >
                      {/* Image cover header */}
                      <div className="relative h-48 overflow-hidden bg-gray-100">
                        <img 
                          src={space.image || 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80'} 
                          alt={space.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 bg-[#FAF8F5]/90 backdrop-blur-xs border border-[#EAE3D2]/60 text-[9px] font-bold text-[#B8975A] px-2.5 py-1 rounded-full uppercase tracking-wider">
                          {space.category || 'Local'}
                        </div>
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-emerald-700 border border-emerald-100 text-[9px] font-bold px-2.5 py-1 rounded-full flex items-center space-x-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          <span>{space.status || 'Ativo'}</span>
                        </div>
                      </div>

                      {/* Content Card Body */}
                      <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                        <div className="space-y-1">
                          <h3 className="font-serif text-base text-[#2B2A27] font-semibold leading-snug truncate">
                            {space.name}
                          </h3>
                          <div className="flex items-center space-x-1.5 text-[11px] text-[#6E6B64]">
                            <Star className="w-3.5 h-3.5 text-[#B8975A] fill-[#B8975A]" />
                            <span className="font-semibold text-[#2B2A27]">{space.rating ? space.rating.toFixed(1) : '5.0'}</span>
                            <span>({space.reviewsCount || 0} avaliações)</span>
                          </div>
                        </div>

                        {/* Specs grid */}
                        <div className="grid grid-cols-2 gap-3 border-t border-b border-[#EAE3D2]/50 py-3 text-xs text-[#6E6B64]">
                          <div className="flex items-center space-x-1.5">
                            <Users className="w-4 h-4 text-[#B8975A]" />
                            <span>Até {space.capacity || 150} convidados</span>
                          </div>
                          <div className="flex items-center space-x-1.5 min-w-0">
                            <MapPin className="w-4 h-4 text-[#B8975A] flex-shrink-0" />
                            <span className="truncate">{space.location}</span>
                          </div>
                        </div>

                        {/* Pricing and Action row */}
                        <div className="space-y-3.5">
                          <div className="flex items-baseline justify-between pt-1">
                            <span className="text-[9px] uppercase font-bold text-[#6E6B64] tracking-wider">Valor do Aluguel</span>
                            <span className="text-base font-serif font-bold text-[#B8975A]">
                              R$ {space.price ? space.price.toLocaleString('pt-BR') : '0'}
                            </span>
                          </div>

                          <div className="flex items-center space-x-2.5 pt-3 border-t border-[#EAE3D2]/40">
                            <button
                              onClick={() => triggerToast('Edição de espaço - Recurso em breve!', 'info')}
                              className="flex-grow py-2 px-2 border border-[#EAE3D2] rounded-xl text-center text-[10px] font-bold uppercase tracking-wider text-[#6E6B64] hover:text-[#B8975A] hover:border-[#B8975A] transition-all cursor-pointer"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => {
                                setActiveSidebar('Calendário');
                                setActiveTab('Calendário');
                              }}
                              className="flex-grow py-2 px-2 border border-[#B8975A]/20 bg-[#FAF0E6]/30 rounded-xl text-center text-[10px] font-bold uppercase tracking-wider text-[#B8975A] hover:bg-[#B8975A] hover:text-white transition-all cursor-pointer"
                            >
                              Agenda
                            </button>
                            <button
                              onClick={() => handleDeleteSpace(space.name)}
                              className="p-2 border border-red-100 hover:border-red-200 bg-red-50/10 text-red-500 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
                              aria-label="Excluir espaço"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white border border-[#EAE3D2] rounded-3xl p-12 text-center shadow-sm space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#FAF8F5] border border-[#EAE3D2]/60 flex items-center justify-center text-[#B8975A] mx-auto">
                    <Store className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-serif text-lg font-medium text-[#2B2A27]">Nenhum espaço cadastrado</h3>
                    <p className="text-xs text-[#6E6B64] font-light max-w-sm mx-auto leading-relaxed">
                      Você ainda não possui nenhum espaço cadastrado na plataforma. Comece agora mesmo publicando o seu primeiro local!
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveModal('addSpace')}
                    className="inline-flex items-center justify-center space-x-2 bg-[#B8975A] hover:bg-[#A38349] text-white text-xs font-bold uppercase tracking-wider py-2.5 px-5 rounded-2xl transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Cadastrar Primeiro Espaço</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Welcome Banner */}
              <div className="bg-white border border-[#EAE3D2] rounded-3xl p-6 relative overflow-hidden shadow-sm flex flex-col md:flex-row items-center md:justify-between text-left gap-6 md:gap-0">
                {/* Banner image background on the right */}
                <div className="absolute right-0 top-0 bottom-0 w-full md:w-1/2 hidden md:block">
                  <img
                    src={authBanner}
                    alt="Reception Banner"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
                </div>

                <div className="relative z-10 space-y-3 max-w-xl">
                  <p className="text-xs font-semibold text-[#6E6B64]">Olá, Ana! 👋</p>
                  <h1 className="font-serif text-2xl md:text-3xl text-[#2B2A27] font-normal leading-snug">
                    Conecte seu espaço a <br />
                    <span className="font-script text-3xl md:text-4xl text-[#B8975A] normal-case leading-none mt-1 inline-block">momentos inesquecíveis</span>
                  </h1>
                  <p className="text-xs text-[#6E6B64] font-light leading-relaxed max-w-md">
                    Gerencie reservas, acompanhe solicitações e aumente a visibilidade do seu negócio.
                  </p>
                </div>
              </div>

              {/* Stats Widgets Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {[
                  { label: 'Reservas confirmadas', value: confirmedCount, change: '+ 25% vs. período anterior', icon: CalendarCheck, type: 'count' },
                  { label: 'Solicitações', value: solicitacoesCount, change: '+ 18% vs. período anterior', icon: ClipboardList, type: 'count' },
                  { label: 'Visualizações', value: viewsCount.toLocaleString('pt-BR'), change: '+ 22% vs. período anterior', icon: EyeIcon, type: 'count' },
                  { label: 'Receita (mês)', value: `R$ ${receitaTotal.toLocaleString('pt-BR')}`, change: '+ 20% vs. período anterior', icon: CircleDollarSign, type: 'money' },
                  { label: 'Avaliação média', value: '4,9', change: 'Baseado em 128 avaliações', icon: Star, type: 'rating' }
                ].map((stat) => {
                  const StatIcon = stat.icon;
                  return (
                    <div key={stat.label} className="bg-white border border-[#EAE3D2] rounded-2xl p-5 shadow-sm space-y-4 text-left">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] uppercase tracking-wider text-[#B8975A] font-bold">
                          {stat.label}
                        </span>
                        <div className="w-9 h-9 rounded-full bg-[#FAF8F3] border border-[#D4BC8A]/30 flex items-center justify-center text-[#B8975A]">
                          <StatIcon className="w-5 h-5" />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <p className="text-3xl font-bold font-serif text-[#2B2A27]">{stat.value}</p>
                        {stat.type === 'rating' ? (
                          <div className="flex items-center space-x-1 mt-0.5">
                            <div className="flex text-amber-400">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star key={i} className="w-3 h-3 fill-current" />
                              ))}
                            </div>
                            <span className="text-[9px] text-[#6E6B64] font-light pl-1">{stat.change}</span>
                          </div>
                        ) : (
                          <p className="text-[10px] text-emerald-600 font-semibold flex items-center space-x-1">
                            <TrendingUp className="w-3.5 h-3.5 inline mr-0.5" />
                            <span>{stat.change}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Columns Grid layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left Column: Próximas reservas Table (7/12) */}
                <div className="lg:col-span-7 bg-white border border-[#EAE3D2] rounded-3xl p-5 shadow-sm text-left flex flex-col">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-serif text-base text-[#2B2A27] font-semibold">
                      Próximas reservas
                    </h3>
                    <span className="px-2.5 py-1 rounded-full bg-[#FAF8F5] border border-[#EAE3D2] text-[10px] text-[#6E6B64] font-semibold">
                      Total: {reservationsList.length}
                    </span>
                  </div>

                  <div className="overflow-x-auto flex-grow">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-[#EAE3D2] text-[10px] uppercase tracking-wider text-[#6E6B64] font-semibold">
                          <th className="pb-3 pr-2">Evento</th>
                          <th className="pb-3 px-2">Data</th>
                          <th className="pb-3 px-2">Pessoas</th>
                          <th className="pb-3 pl-2">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#EAE3D2]/50 text-xs">
                        {reservationsList.map((res) => (
                          <tr key={res.id} className="group hover:bg-[#FAF8F5]/40 transition-colors">
                            <td className="py-3.5 pr-2">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                                  <img src={authBanner} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                  <p className="font-semibold text-[#2B2A27]">{res.event}</p>
                                  <p className="text-[10px] text-[#6E6B64] font-light">{res.venue}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-3.5 px-2">
                              <p className="font-semibold text-[#2B2A27]">{res.date}</p>
                              <p className="text-[10px] text-[#6E6B64] font-light">{res.time}</p>
                            </td>
                            <td className="py-3.5 px-2 font-medium text-[#6E6B64]">
                              {res.guests}
                            </td>
                            <td className="py-3.5 pl-2">
                              <div className="flex items-center justify-between">
                                <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold ${
                                  res.status === 'Confirmada'
                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                                    : 'bg-amber-50 text-amber-700 border border-amber-100'
                                }`}>
                                  {res.status}
                                </span>
                                <button className="text-[#6E6B64] hover:text-[#B8975A] opacity-0 group-hover:opacity-100 transition-opacity p-1 cursor-pointer">
                                  <MoreHorizontal className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="border-t border-[#EAE3D2] pt-4 mt-6 text-center">
                    <button 
                      onClick={() => triggerToast('Carregando mais reservas...', 'info')}
                      className="text-xs font-semibold text-[#B8975A] hover:text-[#A38349] transition-colors cursor-pointer"
                    >
                      Ver todas as reservas
                    </button>
                  </div>
                </div>

                {/* Middle Column: Requests & Unread Messages (5/12) */}
                <div className="lg:col-span-5 space-y-6 flex flex-col">
                  {/* Requests panel */}
                  <div className="bg-white border border-[#EAE3D2] rounded-3xl p-5 shadow-sm text-left space-y-5">
                    <div className="flex justify-between items-center">
                      <h3 className="font-serif text-base text-[#2B2A27] font-semibold">
                        Solicitações recentes
                      </h3>
                      <span className="px-2.5 py-0.5 bg-[#FAF0E6] text-[#B8975A] rounded text-[10px] font-bold">
                        {requestsList.length} novas
                      </span>
                    </div>

                    <div className="space-y-4">
                      {requestsList.length > 0 ? (
                        requestsList.map((req) => (
                          <div key={req.id} className="border border-[#EAE3D2]/60 rounded-2xl p-4 space-y-4 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start">
                              <div className="flex items-start space-x-3">
                                <div className="w-8 h-8 rounded-full bg-[#FAF0E6] flex items-center justify-center text-[#B8975A] flex-shrink-0 mt-0.5">
                                  <ClipboardList className="w-4 h-4" />
                                </div>
                                <div>
                                  <div className="flex items-center space-x-2">
                                    <p className="font-bold text-xs text-[#2B2A27]">{req.type}</p>
                                    {req.badge && (
                                      <span className="px-1.5 py-0.5 bg-[#B8975A]/10 text-[#B8975A] rounded text-[8px] font-bold animate-pulse">
                                        {req.badge}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-[10px] text-[#6E6B64] font-light mt-0.5">{req.venue}</p>
                                  <p className="text-[10px] text-[#6E6B64] font-light">{req.date}</p>
                                </div>
                              </div>
                              <span className="text-[10px] font-semibold text-[#6E6B64]">{req.guests}</span>
                            </div>

                            <div className="flex space-x-3 pt-1">
                              <button 
                                onClick={() => handleAcceptRequest(req.id)}
                                className="flex-1 py-2 bg-[#B8975A] hover:bg-[#A38349] text-white text-[10px] font-bold uppercase tracking-wider rounded-xl shadow-sm transition-all cursor-pointer"
                              >
                                Aceitar
                              </button>
                              <button 
                                onClick={() => handleDeclineRequest(req.id)}
                                className="flex-1 py-2 border border-[#EAE3D2] text-[#6E6B64] text-[10px] font-bold uppercase tracking-wider rounded-xl hover:bg-[#FAF8F5] transition-all cursor-pointer"
                              >
                                Recusar
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-6 text-xs text-[#6E6B64]">
                          Nenhuma solicitação pendente no momento.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Messages Widget */}
                  <div className="bg-white border border-[#EAE3D2] rounded-3xl p-5 shadow-sm text-left space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-serif text-base text-[#2B2A27] font-semibold">
                        Mensagens não lidas
                      </h3>
                      <button 
                        onClick={() => setChatOpen(true)}
                        className="text-xs font-semibold text-[#B8975A] hover:underline cursor-pointer"
                      >
                        Abrir Chat
                      </button>
                    </div>

                    <div 
                      onClick={() => setChatOpen(true)}
                      className="flex items-center justify-between bg-[#FAF8F5] p-3 rounded-2xl border border-[#EAE3D2]/50 hover:bg-[#F4F0E6]/30 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                          <img
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
                            alt="Juliana Santos"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#2B2A27]">Juliana Santos</p>
                          <p className="text-[10px] text-[#6E6B64] truncate max-w-[180px] font-light">
                            Olá! Tenho interesse em reservar o espaço...
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-1">
                        <span className="text-[9px] text-[#6E6B64] font-medium">10:30</span>
                        <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Calendar & Actions block */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Column: Mini Calendar (7/12) */}
                <div className="lg:col-span-7 bg-white border border-[#EAE3D2] rounded-3xl p-5 shadow-sm text-left space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-serif text-base text-[#2B2A27] font-semibold">
                      Calendário
                    </h3>
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => setCurrentMonthIndex(prev => Math.max(0, prev - 1))}
                        className="p-1 rounded hover:bg-[#FAF8F5] text-[#6E6B64] cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#2B2A27]">
                        {monthsList[currentMonthIndex]} 2026
                      </span>
                      <button 
                        onClick={() => setCurrentMonthIndex(prev => Math.min(11, prev + 1))}
                        className="p-1 rounded hover:bg-[#FAF8F5] text-[#6E6B64] cursor-pointer"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Grid columns of weekdays */}
                  <div className="grid grid-cols-7 gap-1 text-center font-bold text-[9px] uppercase tracking-wider text-[#6E6B64] border-b border-[#EAE3D2]/50 pb-2">
                    <span>D</span><span>S</span><span>T</span><span>Q</span><span>Q</span><span>S</span><span>S</span>
                  </div>

                  {/* Grid items of days */}
                  <div className="grid grid-cols-7 gap-y-2.5 gap-x-1 text-center text-xs">
                    {/* Pad first week days for June 2026 starts on Monday */}
                    {currentMonthIndex === 5 && <span></span>}
                    {/* Pad first week days for July 2026 starts on Wednesday */}
                    {currentMonthIndex === 7 && (
                      <><span></span><span></span></>
                    )}
                    {calendarDays.map((day) => {
                      const event = calendarEvents[day];
                      let badgeType = 'default';
                      if (event) badgeType = event.type;

                      return (
                        <div key={day} className="flex justify-center items-center h-8 relative">
                          <button 
                            onClick={() => setSelectedDayInfo(day)}
                            className={`w-8 h-8 flex items-center justify-center rounded-full font-semibold transition-all cursor-pointer ${
                              badgeType === 'reserved'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold'
                                : badgeType === 'pending'
                                ? 'bg-amber-50 text-amber-700 border border-amber-200 font-bold animate-pulse'
                                : badgeType === 'blocked'
                                ? 'bg-red-50 text-red-600 border border-red-200'
                                : 'text-[#2B2A27] hover:bg-[#FAF8F5]'
                            }`}
                          >
                            {day}
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  {/* Calendar Selected Day Info details block */}
                  {selectedDayInfo !== null && (
                    <div className="mt-4 p-3 bg-[#FAF8F5] border border-[#EAE3D2] rounded-2xl flex items-center justify-between text-xs animate-in fade-in slide-in-from-bottom-2 duration-150">
                      <div>
                        <span className="font-bold text-[#6E6B64]">Dia {selectedDayInfo} de {monthsList[currentMonthIndex]}:</span>
                        <p className="font-medium text-[#2B2A27] mt-0.5">
                          {calendarEvents[selectedDayInfo] 
                            ? calendarEvents[selectedDayInfo].title 
                            : 'Disponível para reservas e agendamentos.'}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        {!calendarEvents[selectedDayInfo] && (
                          <button 
                            onClick={() => {
                              setCalendarEvents(prev => ({ ...prev, [selectedDayInfo]: { title: 'Bloqueado manualmente', type: 'blocked' } }));
                              triggerToast(`Dia ${selectedDayInfo} bloqueado no calendário.`);
                            }}
                            className="px-2 py-1 text-[10px] font-bold text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-all cursor-pointer"
                          >
                            Bloquear Dia
                          </button>
                        )}
                        {calendarEvents[selectedDayInfo] && (
                          <button 
                            onClick={() => {
                              setCalendarEvents(prev => {
                                const copy = { ...prev };
                                delete copy[selectedDayInfo];
                                return copy;
                              });
                              triggerToast(`Dia ${selectedDayInfo} liberado no calendário.`, 'info');
                            }}
                            className="px-2 py-1 text-[10px] font-bold text-[#6E6B64] border border-[#EAE3D2] rounded-lg hover:bg-white transition-all cursor-pointer"
                          >
                            Desbloquear
                          </button>
                        )}
                        <button 
                          onClick={() => setSelectedDayInfo(null)}
                          className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Legend */}
                  <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center pt-4 border-t border-[#EAE3D2]/60 text-[10px] font-semibold text-[#6E6B64]">
                    <div className="flex items-center space-x-1.5">
                      <span className="w-2.5 h-2.5 bg-emerald-50 border border-emerald-200 rounded-full"></span>
                      <span>Reservado</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <span className="w-2.5 h-2.5 bg-amber-50 border border-amber-200 rounded-full"></span>
                      <span>Pendente</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <span className="w-2.5 h-2.5 bg-white border border-[#EAE3D2] rounded-full"></span>
                      <span>Disponível</span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Quick Actions Widget (5/12) */}
                <div className="lg:col-span-5 bg-white border border-[#EAE3D2] rounded-3xl p-5 shadow-sm text-left space-y-4">
                  <h3 className="font-serif text-base text-[#2B2A27] font-semibold">
                    Ações rápidas
                  </h3>

                  <div className="grid grid-cols-2 gap-3.5">
                    {[
                      { label: 'Novo espaço', icon: FolderPlus, desc: 'Cadastrar espaço', modal: 'addSpace' },
                      { label: 'Nova disponibilidade', icon: CalendarPlus, desc: 'Datas de bloqueio', modal: 'blockAvailability' },
                      { label: 'Adicionar fotos', icon: Image, desc: 'Galeria do espaço', modal: 'addPhotos' },
                      { label: 'Criar promoção', icon: Tag, desc: 'Cupons e descontos', modal: 'createPromo' }
                    ].map((action, i) => {
                      const ActionIcon = action.icon;
                      return (
                        <button
                          key={i}
                          onClick={() => setActiveModal(action.modal as any)}
                          className="border border-[#EAE3D2]/70 rounded-2xl p-4 flex flex-col items-center justify-center text-center space-y-2 hover:border-[#B8975A] hover:bg-[#FAF0E6]/10 transition-all cursor-pointer group shadow-sm hover:shadow-md"
                        >
                          <div className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#EAE3D2]/40 flex items-center justify-center text-[#B8975A] group-hover:scale-105 transition-transform">
                            <ActionIcon className="w-5 h-5" />
                          </div>
                          <div className="space-y-0.5">
                            <p className="font-bold text-[11px] text-[#2B2A27] leading-none">{action.label}</p>
                            <p className="text-[9px] text-[#6E6B64] font-light leading-none">{action.desc}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          )}
        </main>
      </div>

      {/* Interactive Modal 1: Novo Espaço */}
      {activeModal === 'addSpace' && (
        <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#EAE3D2] w-full max-w-md p-6 space-y-5 animate-in zoom-in-95 duration-150 relative text-left">
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div>
              <h4 className="font-serif text-lg font-bold text-[#2B2A27]">Cadastrar Novo Espaço</h4>
              <p className="text-[10px] text-[#6E6B64] font-light">Publique seu local para reservas de clientes</p>
            </div>
            <form onSubmit={handleCreateSpace} className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-[#6E6B64]">Nome do Espaço</label>
                <input 
                  type="text" 
                  required
                  placeholder="Ex: Mansão Imperial"
                  value={newSpace.name}
                  onChange={(e) => setNewSpace(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-white border border-[#EAE3D2] rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-[#B8975A] focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-[#6E6B64]">Preço base (R$)</label>
                  <input 
                    type="number" 
                    required
                    placeholder="Ex: 8500"
                    value={newSpace.price}
                    onChange={(e) => setNewSpace(prev => ({ ...prev, price: e.target.value }))}
                    className="w-full bg-white border border-[#EAE3D2] rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-[#B8975A] focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-[#6E6B64]">Capacidade (Pessoas)</label>
                  <input 
                    type="number" 
                    placeholder="Ex: 250"
                    value={newSpace.capacity}
                    onChange={(e) => setNewSpace(prev => ({ ...prev, capacity: e.target.value }))}
                    className="w-full bg-white border border-[#EAE3D2] rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-[#B8975A] focus:outline-none"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="font-bold text-[#6E6B64]">Localização</label>
                <input 
                  type="text" 
                  placeholder="Ex: Campinas, SP"
                  value={newSpace.location}
                  onChange={(e) => setNewSpace(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full bg-white border border-[#EAE3D2] rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-[#B8975A] focus:outline-none"
                />
              </div>
              <button 
                type="submit"
                className="w-full py-2.5 bg-[#B8975A] hover:bg-[#A38349] text-white font-bold uppercase rounded-xl transition-all mt-2 cursor-pointer"
              >
                Salvar Espaço
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Interactive Modal 2: Bloquear Disponibilidade */}
      {activeModal === 'blockAvailability' && (
        <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#EAE3D2] w-full max-w-md p-6 space-y-5 animate-in zoom-in-95 duration-150 relative text-left">
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div>
              <h4 className="font-serif text-lg font-bold text-[#2B2A27]">Bloquear Calendário</h4>
              <p className="text-[10px] text-[#6E6B64] font-light">Defina datas de bloqueio temporário ou reservas off-line</p>
            </div>
            <form onSubmit={handleBlockAvailability} className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-[#6E6B64]">Selecione o local</label>
                <select 
                  value={blockedDatesInput.venue}
                  onChange={(e) => setBlockedDatesInput(prev => ({ ...prev, venue: e.target.value }))}
                  className="w-full bg-white border border-[#EAE3D2] rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-[#B8975A] focus:outline-none"
                >
                  {spaceList.map((space, i) => (
                    <option key={i} value={space.name}>{space.name}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-[#6E6B64]">Data</label>
                  <input 
                    type="date" 
                    required
                    value={blockedDatesInput.date}
                    onChange={(e) => setBlockedDatesInput(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full bg-white border border-[#EAE3D2] rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-[#B8975A] focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-[#6E6B64]">Tipo de Bloqueio</label>
                  <select 
                    value={blockedDatesInput.type}
                    onChange={(e) => setBlockedDatesInput(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full bg-white border border-[#EAE3D2] rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-[#B8975A] focus:outline-none"
                  >
                    <option value="blocked">Indisponível (Manutenção)</option>
                    <option value="reserved">Reservado Off-line</option>
                    <option value="pending">Reserva Pendente</option>
                  </select>
                </div>
              </div>
              <button 
                type="submit"
                className="w-full py-2.5 bg-[#B8975A] hover:bg-[#A38349] text-white font-bold uppercase rounded-xl transition-all mt-2 cursor-pointer"
              >
                Bloquear Data
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Interactive Modal 3: Adicionar Fotos */}
      {activeModal === 'addPhotos' && (
        <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#EAE3D2] w-full max-w-md p-6 space-y-5 animate-in zoom-in-95 duration-150 relative text-left">
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div>
              <h4 className="font-serif text-lg font-bold text-[#2B2A27]">Adicionar Fotos da Galeria</h4>
              <p className="text-[10px] text-[#6E6B64] font-light">Envie fotos de alta qualidade do seu local</p>
            </div>
            <div className="border-2 border-dashed border-[#B8975A]/40 rounded-2xl p-8 text-center hover:bg-[#FAF8F5] transition-colors cursor-pointer space-y-3 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#FAF0E6] flex items-center justify-center text-[#B8975A]">
                <Plus className="w-6 h-6" />
              </div>
              <p className="text-xs font-bold text-[#2B2A27]">Arraste arquivos aqui ou clique para fazer upload</p>
              <p className="text-[9px] text-[#6E6B64]">PNG, JPG, JPEG de até 10MB</p>
            </div>
            <button 
              onClick={() => {
                triggerToast('Fotos adicionadas à galeria!');
                setActiveModal(null);
              }}
              className="w-full py-2.5 bg-[#B8975A] hover:bg-[#A38349] text-white font-bold uppercase rounded-xl transition-all cursor-pointer"
            >
              Salvar fotos
            </button>
          </div>
        </div>
      )}

      {/* Interactive Modal 4: Criar Promoção */}
      {activeModal === 'createPromo' && (
        <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#EAE3D2] w-full max-w-md p-6 space-y-5 animate-in zoom-in-95 duration-150 relative text-left">
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div>
              <h4 className="font-serif text-lg font-bold text-[#2B2A27]">Criar Cupom de Desconto</h4>
              <p className="text-[10px] text-[#6E6B64] font-light">Ofereça vantagens exclusivas para fechamento rápido</p>
            </div>
            <form onSubmit={handleCreatePromo} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-[#6E6B64]">Código do Cupom</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Ex: NOIVA10"
                    value={promoInput.code}
                    onChange={(e) => setPromoInput(prev => ({ ...prev, code: e.target.value }))}
                    className="w-full bg-white border border-[#EAE3D2] rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-[#B8975A] focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-[#6E6B64]">Desconto (%)</label>
                  <input 
                    type="number" 
                    required
                    placeholder="Ex: 10"
                    value={promoInput.discount}
                    onChange={(e) => setPromoInput(prev => ({ ...prev, discount: e.target.value }))}
                    className="w-full bg-white border border-[#EAE3D2] rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-[#B8975A] focus:outline-none"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="font-bold text-[#6E6B64]">Descrição</label>
                <textarea 
                  placeholder="Ex: Válido apenas para casamentos fechados em Junho de 2026"
                  value={promoInput.description}
                  onChange={(e) => setPromoInput(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full bg-white border border-[#EAE3D2] rounded-xl px-3 py-2 text-xs h-16 focus:ring-1 focus:ring-[#B8975A] focus:outline-none"
                />
              </div>
              <button 
                type="submit"
                className="w-full py-2.5 bg-[#B8975A] hover:bg-[#A38349] text-white font-bold uppercase rounded-xl transition-all mt-2 cursor-pointer"
              >
                Criar Cupom
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Messages Chat Modal popup */}
      {chatOpen && (
        <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#EAE3D2] w-full max-w-md h-[500px] flex flex-col justify-between p-6 animate-in zoom-in-95 duration-150 relative text-left">
            <button 
              onClick={() => setChatOpen(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            
            {/* Header info */}
            <div className="flex items-center space-x-3 pb-3 border-b border-[#EAE3D2]/70">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
                alt="Juliana Santos"
                className="w-10 h-10 rounded-full object-cover border border-[#B8975A]/40"
              />
              <div>
                <p className="text-xs font-bold text-[#2B2A27]">Juliana Santos</p>
                <p className="text-[10px] text-emerald-500 font-semibold flex items-center">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-1.5 inline-block"></span>
                  Online
                </p>
              </div>
            </div>

            {/* Chat Messages Logs */}
            <div className="flex-grow overflow-y-auto py-4 space-y-3 pr-1 text-xs">
              {chatMessages.map((msg, i) => {
                const isMe = msg.sender === 'vendor';
                return (
                  <div key={i} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                    <div className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 leading-relaxed ${
                      isMe 
                        ? 'bg-[#B8975A] text-white rounded-br-none' 
                        : 'bg-[#FAF8F5] border border-[#EAE3D2] text-[#2B2A27] rounded-bl-none'
                    }`}>
                      {msg.text}
                    </div>
                    <span className="text-[8px] text-[#6E6B64] font-medium mt-1 px-1">{msg.time}</span>
                  </div>
                );
              })}
            </div>

            {/* Reply sender form input */}
            <form onSubmit={handleSendMessage} className="flex items-center space-x-2.5 pt-3 border-t border-[#EAE3D2]/70">
              <input
                type="text"
                placeholder="Escreva uma resposta..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="flex-grow bg-[#FAF8F5] border border-[#EAE3D2] rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-[#B8975A] focus:outline-none"
              />
              <button 
                type="submit"
                className="w-10 h-10 rounded-xl bg-[#B8975A] hover:bg-[#A38349] text-white flex items-center justify-center transition-all cursor-pointer shadow-sm hover:shadow-md"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

// Custom Helper Icons
function EyeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
