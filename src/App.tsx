import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedVenues from './components/FeaturedVenues';
import FeaturesList from './components/FeaturesList';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';
import AuthScreen from './components/AuthScreen';
import BookingDetails from './components/BookingDetails';
import VendorDashboard from './components/VendorDashboard';
import RegisterBanner from './components/RegisterBanner';
import { Home, Heart, Calendar, MessageSquare, User, Search, MapPin, Star, Clock, CheckCircle, Store } from 'lucide-react';

import villaImg from './assets/venue_villa_natureza.png';
import jardimImg from './assets/venue_espaco_jardim.png';
import glassImg from './assets/venue_mansao_glass.png';

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

interface SearchFilters {
  type: string;
  location: string;
  date: string;
  guests: string;
  budget: string;
  query?: string;
}

type AuthView = 'landing' | 'login' | 'register';
type ClientArea = 'home' | 'favoritos' | 'agendamentos' | 'mensagens' | 'conta';

const favoriteVenues: Venue[] = [
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
    name: 'Espaco Jardim',
    location: 'Mairipora - SP',
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
    name: 'Mansao Glass',
    location: 'Sao Paulo - SP',
    image: glassImg,
    rating: 5,
    reviewsCount: 42,
    capacity: 200,
    price: 12000,
    category: 'Corporativo',
    featured: true,
  },
];

function createAvatar(name: string) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="50" fill="#FAF0D9"/><text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-family="serif" font-size="36" font-weight="bold" fill="#B8975A">${initials}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function App() {
  const [filters, setFilters] = useState<SearchFilters | null>(null);
  const [view, setView] = useState<AuthView>('landing');
  const [clientArea, setClientArea] = useState<ClientArea>('home');
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [pendingVenue, setPendingVenue] = useState<Venue | null>(null);
  const [showSupplierDashboard, setShowSupplierDashboard] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('eventix_logged_in') === 'true');
  const [userProfile, setUserProfile] = useState(() => {
    const stored = localStorage.getItem('eventix_user_profile');
    return stored
      ? JSON.parse(stored)
      : { name: '', email: '', avatar: '', role: '' };
  });

  const handleSearch = (newFilters: SearchFilters) => {
    setFilters(newFilters);
    setClientArea('home');
    setSelectedVenue(null);
    document.getElementById('locais-destaque')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectVenue = (venue: Venue) => {
    if (!isLoggedIn) {
      setPendingVenue(venue);
      setView('login');
      return;
    }

    setSelectedVenue(venue);
    setClientArea('home');
  };

  const handleLogout = () => {
    localStorage.removeItem('eventix_logged_in');
    localStorage.removeItem('eventix_user_profile');
    setIsLoggedIn(false);
    setUserProfile({ name: '', email: '', avatar: '', role: '' });
    setSelectedVenue(null);
    setShowSupplierDashboard(false);
    setClientArea('home');
  };

  const handleAuthSuccess = (user: { name: string; email: string; role: string }) => {
    const profile = {
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: createAvatar(user.name),
    };

    localStorage.setItem('eventix_logged_in', 'true');
    localStorage.setItem('eventix_user_profile', JSON.stringify(profile));

    setIsLoggedIn(true);
    setUserProfile(profile);
    setView('landing');

    if (user.role === 'fornecedor') {
      setShowSupplierDashboard(true);
      return;
    }

    if (pendingVenue) {
      setSelectedVenue(pendingVenue);
      setPendingVenue(null);
    }
  };

  const openClientArea = (area: ClientArea) => {
    if (!isLoggedIn && area !== 'home') {
      setView('login');
      return;
    }

    setSelectedVenue(null);
    setShowSupplierDashboard(false);
    setClientArea(area);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (view === 'login' || view === 'register') {
    return (
      <AuthScreen
        initialMode={view}
        onClose={() => {
          setView('landing');
          setPendingVenue(null);
        }}
        onAuthSuccess={handleAuthSuccess}
      />
    );
  }

  if (isLoggedIn && userProfile.role === 'fornecedor' && showSupplierDashboard) {
    return (
      <VendorDashboard
        userName={userProfile.name}
        userEmail={userProfile.email}
        userAvatar={userProfile.avatar}
        onLogout={handleLogout}
        onSwitchToClient={() => {
          setShowSupplierDashboard(false);
          setClientArea('home');
        }}
      />
    );
  }

  if (selectedVenue) {
    return (
      <BookingDetails
        venue={selectedVenue}
        onBack={() => setSelectedVenue(null)}
        userName={userProfile.name}
        userEmail={userProfile.email}
        userAvatar={userProfile.avatar}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col antialiased pb-20 lg:pb-0">
      <Navbar
        onOpenAuth={(mode) => setView(mode)}
        isLoggedIn={isLoggedIn}
        userAvatar={userProfile.avatar}
        userName={userProfile.name}
        userEmail={userProfile.email}
        onLogout={handleLogout}
        showDashboardLink={isLoggedIn && userProfile.role === 'fornecedor' && !showSupplierDashboard}
        onSwitchToDashboard={() => setShowSupplierDashboard(true)}
      />

      <main className="flex-grow">
        {clientArea === 'home' ? (
          <>
            <Hero onSearch={handleSearch} />

            <div id="locais-destaque">
              <FeaturedVenues filters={filters} onSelectVenue={handleSelectVenue} />
            </div>

            <FeaturesList />
            <HowItWorks />
            <RegisterBanner onRegisterClick={() => setView('register')} />
          </>
        ) : (
          <ClientWorkspace
            area={clientArea}
            userProfile={userProfile}
            onAreaChange={setClientArea}
            onSelectVenue={handleSelectVenue}
            onOpenAuth={setView}
            onLogout={handleLogout}
            onOpenSupplier={() => setShowSupplierDashboard(true)}
          />
        )}
      </main>

      <Footer />

      <MobileNav
        area={clientArea}
        selectedVenue={selectedVenue}
        isLoggedIn={isLoggedIn}
        userRole={userProfile.role}
        onAreaChange={openClientArea}
        onOpenAuth={() => setView('login')}
        onOpenSupplier={() => setShowSupplierDashboard(true)}
      />
    </div>
  );
}

interface ClientWorkspaceProps {
  area: ClientArea;
  userProfile: { name: string; email: string; avatar: string; role: string };
  onAreaChange: (area: ClientArea) => void;
  onSelectVenue: (venue: Venue) => void;
  onOpenAuth: (view: AuthView) => void;
  onLogout: () => void;
  onOpenSupplier: () => void;
}

function ClientWorkspace({
  area,
  userProfile,
  onAreaChange,
  onSelectVenue,
  onOpenAuth,
  onLogout,
  onOpenSupplier,
}: ClientWorkspaceProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#B8975A]">Area do cliente</p>
          <h1 className="font-serif text-4xl sm:text-5xl text-[#2B2A27] mt-2">
            {area === 'favoritos' && 'Favoritos'}
            {area === 'agendamentos' && 'Agendamentos'}
            {area === 'mensagens' && 'Mensagens'}
            {area === 'conta' && 'Minha conta'}
          </h1>
        </div>

        <div className="grid grid-cols-2 sm:flex gap-2">
          <ClientTab active={area === 'favoritos'} label="Favoritos" onClick={() => onAreaChange('favoritos')} />
          <ClientTab active={area === 'agendamentos'} label="Agendamentos" onClick={() => onAreaChange('agendamentos')} />
          <ClientTab active={area === 'mensagens'} label="Mensagens" onClick={() => onAreaChange('mensagens')} />
          <ClientTab active={area === 'conta'} label="Conta" onClick={() => onAreaChange('conta')} />
        </div>
      </div>

      {area === 'favoritos' && <FavoritesView onSelectVenue={onSelectVenue} />}
      {area === 'agendamentos' && <BookingsView onSelectVenue={onSelectVenue} />}
      {area === 'mensagens' && <MessagesView />}
      {area === 'conta' && (
        <ProfileView
          userProfile={userProfile}
          onOpenAuth={onOpenAuth}
          onLogout={onLogout}
          onOpenSupplier={onOpenSupplier}
        />
      )}
    </section>
  );
}

function ClientTab({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
        active
          ? 'bg-[#B8975A] border-[#B8975A] text-white'
          : 'bg-white border-[#EAE3D2] text-[#6E6B64] hover:text-[#B8975A]'
      }`}
    >
      {label}
    </button>
  );
}

function FavoritesView({ onSelectVenue }: { onSelectVenue: (venue: Venue) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {favoriteVenues.map((venue) => (
        <button
          key={venue.id}
          onClick={() => onSelectVenue(venue)}
          className="text-left bg-white border border-[#EAE3D2] rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
        >
          <img src={venue.image} alt={venue.name} className="h-52 w-full object-cover" />
          <div className="p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-[#B8975A]">{venue.category}</span>
              <span className="flex items-center gap-1 text-xs font-bold text-[#B8975A]">
                <Star className="w-3.5 h-3.5 fill-[#B8975A]" />
                {venue.rating}
              </span>
            </div>
            <h2 className="font-serif text-xl font-bold">{venue.name}</h2>
            <p className="flex items-center gap-2 text-sm text-[#6E6B64]">
              <MapPin className="w-4 h-4" />
              {venue.location}
            </p>
            <p className="font-semibold text-[#2B2A27]">R$ {venue.price.toLocaleString('pt-BR')}</p>
          </div>
        </button>
      ))}
    </div>
  );
}

function BookingsView({ onSelectVenue }: { onSelectVenue: (venue: Venue) => void }) {
  const bookings = [
    { venue: favoriteVenues[0], date: '24/06/2026', status: 'Confirmado', step: 'Contrato assinado' },
    { venue: favoriteVenues[1], date: '15/07/2026', status: 'Pendente', step: 'Aguardando fornecedor' },
    { venue: favoriteVenues[2], date: '02/08/2026', status: 'Visita', step: 'Visita agendada' },
  ];

  return (
    <div className="grid gap-4">
      {bookings.map((booking) => (
        <div key={`${booking.venue.id}-${booking.date}`} className="bg-white border border-[#EAE3D2] rounded-3xl p-5 flex flex-col md:flex-row md:items-center gap-5">
          <img src={booking.venue.image} alt={booking.venue.name} className="h-28 w-full md:w-40 object-cover rounded-2xl" />
          <div className="flex-1">
            <p className="text-xs font-bold uppercase tracking-wider text-[#B8975A]">{booking.status}</p>
            <h2 className="font-serif text-2xl font-bold">{booking.venue.name}</h2>
            <p className="text-sm text-[#6E6B64] flex items-center gap-2 mt-1">
              <Calendar className="w-4 h-4" />
              {booking.date}
            </p>
            <p className="text-sm text-[#6E6B64] flex items-center gap-2 mt-1">
              <Clock className="w-4 h-4" />
              {booking.step}
            </p>
          </div>
          <button onClick={() => onSelectVenue(booking.venue)} className="px-5 py-3 rounded-full bg-[#B8975A] text-white text-sm font-semibold">
            Ver detalhes
          </button>
        </div>
      ))}
    </div>
  );
}

function MessagesView() {
  const messages = [
    { from: 'Villa Natureza', text: 'Sua data esta pre-reservada. Podemos agendar visita virtual?', time: '10:29' },
    { from: 'Espaco Jardim', text: 'Enviamos uma proposta com buffet e decoracao inclusos.', time: 'Ontem' },
    { from: 'Mansao Glass', text: 'Temos disponibilidade para o periodo da manha.', time: 'Segunda' },
  ];

  return (
    <div className="grid lg:grid-cols-[320px_1fr] gap-6">
      <div className="bg-white border border-[#EAE3D2] rounded-3xl overflow-hidden">
        {messages.map((message, index) => (
          <div key={message.from} className={`p-5 border-b border-[#EAE3D2] ${index === 0 ? 'bg-[#F4F0E6]' : ''}`}>
            <p className="font-bold text-[#2B2A27]">{message.from}</p>
            <p className="text-sm text-[#6E6B64] line-clamp-1">{message.text}</p>
          </div>
        ))}
      </div>
      <div className="bg-white border border-[#EAE3D2] rounded-3xl p-6">
        <p className="text-xs uppercase tracking-wider text-[#B8975A] font-bold">Conversa</p>
        <h2 className="font-serif text-2xl font-bold mt-1">Villa Natureza</h2>
        <div className="mt-6 space-y-4">
          <ChatBubble side="left" text="Ola! A data escolhida esta disponivel no momento." />
          <ChatBubble side="right" text="Perfeito. Gostaria de saber se o pacote inclui buffet." />
          <ChatBubble side="left" text="Inclui sim. Posso enviar uma proposta completa agora." />
        </div>
        <div className="mt-6 flex gap-3">
          <input placeholder="Digite sua mensagem" className="flex-1 rounded-full border border-[#EAE3D2] px-5 py-3 outline-none focus:border-[#B8975A]" />
          <button className="rounded-full bg-[#B8975A] px-6 py-3 text-sm font-semibold text-white">Enviar</button>
        </div>
      </div>
    </div>
  );
}

function ChatBubble({ side, text }: { side: 'left' | 'right'; text: string }) {
  return (
    <div className={`flex ${side === 'right' ? 'justify-end' : 'justify-start'}`}>
      <p className={`max-w-md rounded-2xl px-4 py-3 text-sm ${side === 'right' ? 'bg-[#B8975A] text-white' : 'bg-[#F4F0E6] text-[#2B2A27]'}`}>
        {text}
      </p>
    </div>
  );
}

function ProfileView({
  userProfile,
  onOpenAuth,
  onLogout,
  onOpenSupplier,
}: {
  userProfile: { name: string; email: string; avatar: string; role: string };
  onOpenAuth: (view: AuthView) => void;
  onLogout: () => void;
  onOpenSupplier: () => void;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <div className="bg-white border border-[#EAE3D2] rounded-3xl p-6">
        <div className="flex items-center gap-4">
          {userProfile.avatar ? (
            <img src={userProfile.avatar} alt={userProfile.name} className="w-20 h-20 rounded-full" />
          ) : (
            <div className="w-20 h-20 rounded-full bg-[#F4F0E6] flex items-center justify-center text-[#B8975A]">
              <User className="w-9 h-9" />
            </div>
          )}
          <div>
            <h2 className="font-serif text-3xl font-bold">{userProfile.name || 'Visitante'}</h2>
            <p className="text-[#6E6B64]">{userProfile.email || 'Entre para salvar suas reservas'}</p>
          </div>
        </div>

        <div className="mt-8 grid sm:grid-cols-3 gap-4">
          <ProfileStat value="3" label="Agendamentos" />
          <ProfileStat value="8" label="Favoritos" />
          <ProfileStat value="5" label="Mensagens" />
        </div>
      </div>

      <div className="bg-white border border-[#EAE3D2] rounded-3xl p-6 space-y-3">
        <button onClick={() => onOpenAuth('register')} className="w-full rounded-2xl border border-[#EAE3D2] px-5 py-3 text-left font-semibold hover:text-[#B8975A]">
          Criar nova conta
        </button>
        {userProfile.role === 'fornecedor' && (
          <button onClick={onOpenSupplier} className="w-full rounded-2xl bg-[#B8975A] px-5 py-3 text-left font-semibold text-white flex items-center gap-2">
            <Store className="w-4 h-4" />
            Abrir painel do fornecedor
          </button>
        )}
        <button onClick={onLogout} className="w-full rounded-2xl border border-red-200 px-5 py-3 text-left font-semibold text-red-600">
          Sair da conta
        </button>
      </div>
    </div>
  );
}

function ProfileStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl bg-[#FAF8F5] p-4">
      <p className="text-2xl font-bold text-[#2B2A27]">{value}</p>
      <p className="text-sm text-[#6E6B64]">{label}</p>
    </div>
  );
}

function MobileNav({
  area,
  selectedVenue,
  isLoggedIn,
  userRole,
  onAreaChange,
  onOpenAuth,
  onOpenSupplier,
}: {
  area: ClientArea;
  selectedVenue: Venue | null;
  isLoggedIn: boolean;
  userRole: string;
  onAreaChange: (area: ClientArea) => void;
  onOpenAuth: () => void;
  onOpenSupplier: () => void;
}) {
  const tabs = [
    { id: 'home' as ClientArea, label: 'Inicio', icon: Home, action: () => onAreaChange('home') },
    { id: 'favoritos' as ClientArea, label: 'Favoritos', icon: Heart, action: () => onAreaChange('favoritos') },
    { id: 'agendamentos' as ClientArea, label: 'Agenda', icon: Calendar, action: () => onAreaChange('agendamentos') },
    { id: 'mensagens' as ClientArea, label: 'Mensagens', icon: MessageSquare, action: () => onAreaChange('mensagens') },
    {
      id: 'conta' as ClientArea,
      label: 'Conta',
      icon: User,
      action: () => {
        if (!isLoggedIn) {
          onOpenAuth();
          return;
        }

        if (userRole === 'fornecedor') {
          onOpenSupplier();
          return;
        }

        onAreaChange('conta');
      },
    },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#EAE3D2] z-50 py-2.5 px-2 shadow-lg flex items-center justify-between">
      {tabs.map((tab) => {
        const TabIcon = tab.icon;
        const active = area === tab.id || (tab.id === 'agendamentos' && !!selectedVenue);

        return (
          <button key={tab.id} onClick={tab.action} className="flex flex-col items-center justify-center flex-1 py-1">
            <TabIcon className={`w-5 h-5 ${active ? 'text-[#B8975A] fill-[#B8975A]/10' : 'text-[#6E6B64]'}`} />
            <span className={`text-[10px] font-semibold mt-1 ${active ? 'text-[#B8975A]' : 'text-[#6E6B64]'}`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default App;
