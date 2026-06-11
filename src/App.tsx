import { useState, type ReactNode } from 'react';
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
import PlansPage from './components/PlansPage';
import ClientAreaPage from './components/ClientAreaPage';
import TermsRulesPage from './components/TermsRulesPage';
import PasswordRecoveryPage from './components/PasswordRecoveryPage';
import { Calendar, Heart, Home, MessageSquare, User } from 'lucide-react';

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
}

type AppView = 'landing' | 'login' | 'register' | 'recover' | 'plans' | 'terms' | 'client' | 'agenda' | 'favorites';

function App() {
  const [filters, setFilters] = useState<SearchFilters | null>(null);
  const [view, setView] = useState<AppView>('landing');

  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('momentos_logged_in') === 'true');
  const [userProfile, setUserProfile] = useState(() => {
    const stored = localStorage.getItem('momentos_user_profile');
    return stored ? JSON.parse(stored) : { name: '', email: '', avatar: '', role: '' };
  });

  const [showSupplierDashboard, setShowSupplierDashboard] = useState(true);
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [pendingVenue, setPendingVenue] = useState<Venue | null>(null);

  const handleSearch = (newFilters: SearchFilters) => {
    setFilters(newFilters);
    document.getElementById('locais-destaque')?.scrollIntoView({ behavior: 'smooth' });
  };

  const navigateTo = (nextView: 'landing' | 'plans' | 'terms' | 'client' | 'agenda' | 'favorites') => {
    setSelectedVenue(null);
    setPendingVenue(null);
    setView(nextView);
    if (nextView !== 'landing') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectVenue = (venue: Venue) => {
    if (isLoggedIn) {
      setSelectedVenue(venue);
    } else {
      setPendingVenue(venue);
      setView('login');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('momentos_logged_in');
    localStorage.removeItem('momentos_user_profile');
    setIsLoggedIn(false);
    setUserProfile({ name: '', email: '', avatar: '', role: '' });
    setSelectedVenue(null);
    setShowSupplierDashboard(true);
    setView('landing');
  };

  const handleAuthSuccess = (user: { name: string; email: string; role: string }) => {
    const initials = user.name
      .split(' ')
      .map((namePart: string) => namePart[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"><rect width="100" height="100" fill="#FAF0D9"/><text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-family="serif" font-size="38" font-weight="bold" fill="#B8975A">${initials}</text></svg>`;
    const avatarUrl = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
    const profile = { name: user.name, email: user.email, avatar: avatarUrl, role: user.role };

    localStorage.setItem('momentos_logged_in', 'true');
    localStorage.setItem('momentos_user_profile', JSON.stringify(profile));
    setIsLoggedIn(true);
    setUserProfile(profile);
    setView('landing');
    setShowSupplierDashboard(true);

    if (pendingVenue) {
      setSelectedVenue(pendingVenue);
      setPendingVenue(null);
    }
  };

  const framePage = (content: ReactNode) => (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col antialiased pb-20 lg:pb-0">
      <Navbar
        onOpenAuth={(mode) => setView(mode)}
        onNavigate={navigateTo}
        isLoggedIn={isLoggedIn}
        userAvatar={userProfile.avatar}
        userName={userProfile.name}
        userEmail={userProfile.email}
        onLogout={handleLogout}
        showDashboardLink={isLoggedIn && userProfile.role === 'fornecedor' && !showSupplierDashboard}
        onSwitchToDashboard={() => setShowSupplierDashboard(true)}
      />
      {content}
      <Footer />
      {mobileNav}
    </div>
  );

  const mobileNav = (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#EAE3D2] z-50 py-2.5 px-4 shadow-lg flex items-center justify-between">
      {[
        { id: 'inicio', label: 'Início', icon: Home, action: () => navigateTo('landing') },
        { id: 'favoritos', label: 'Favoritos', icon: Heart, action: () => navigateTo('favorites') },
        { id: 'agenda', label: 'Agenda', icon: Calendar, action: () => navigateTo('agenda') },
        { id: 'mensagens', label: 'Mensagens', icon: MessageSquare, action: () => navigateTo('client') },
        {
          id: 'conta',
          label: 'Conta',
          icon: User,
          action: () => {
            if (isLoggedIn) {
              if (userProfile.role === 'fornecedor') setShowSupplierDashboard(true);
              else navigateTo('client');
            } else {
              setView('login');
            }
          },
        },
      ].map((tab) => {
        const TabIcon = tab.icon;
        const isActive =
          (tab.id === 'inicio' && view === 'landing' && !selectedVenue) ||
          (tab.id === 'favoritos' && view === 'favorites') ||
          (tab.id === 'agenda' && view === 'agenda') ||
          (tab.id === 'conta' && (view === 'client' || view === 'login' || view === 'register'));

        return (
          <button key={tab.id} onClick={tab.action} className="flex flex-col items-center justify-center flex-1 py-1 focus:outline-none cursor-pointer">
            <TabIcon className={`w-5 h-5 transition-colors ${isActive ? 'text-[#B8975A] fill-[#B8975A]/10' : 'text-[#6E6B64]'}`} />
            <span className={`text-[10px] font-semibold mt-1 transition-colors ${isActive ? 'text-[#B8975A]' : 'text-[#6E6B64]'}`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );

  if (view === 'recover') {
    return <PasswordRecoveryPage onBack={() => setView('login')} />;
  }

  if (view === 'login' || view === 'register') {
    return (
      <AuthScreen
        initialMode={view}
        onRecoverPassword={() => setView('recover')}
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
          setView('client');
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

  if (view === 'plans') {
    return framePage(<PlansPage onBack={() => navigateTo('landing')} onRegister={() => setView('register')} />);
  }

  if (view === 'terms') {
    return framePage(<TermsRulesPage onBack={() => navigateTo('landing')} />);
  }

  if (view === 'client' || view === 'agenda' || view === 'favorites') {
    if (!isLoggedIn) {
      setView('login');
      return null;
    }

    return framePage(
      <ClientAreaPage
        section={view === 'agenda' ? 'agenda' : view === 'favorites' ? 'favorites' : 'dashboard'}
        userName={userProfile.name}
        userEmail={userProfile.email}
        onBack={() => navigateTo('landing')}
        onSectionChange={(section) => {
          if (section === 'dashboard') setView('client');
          if (section === 'agenda') setView('agenda');
          if (section === 'favorites') setView('favorites');
        }}
      />
    );
  }

  return framePage(
    <main className="flex-grow">
      <Hero onSearch={handleSearch} />
      <div id="locais-destaque">
        <FeaturedVenues filters={filters} onSelectVenue={handleSelectVenue} />
      </div>
      <FeaturesList />
      <HowItWorks />
      <RegisterBanner onRegisterClick={() => setView('register')} />
    </main>
  );
}

export default App;
