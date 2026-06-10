import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedVenues from './components/FeaturedVenues';
import FeaturesList from './components/FeaturesList';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';
import AuthScreen from './components/AuthScreen';

interface SearchFilters {
  type: string;
  location: string;
  date: string;
  guests: string;
  budget: string;
}

function App() {
  const [filters, setFilters] = useState<SearchFilters | null>(null);
  const [view, setView] = useState<'landing' | 'login' | 'register'>('landing');

  const handleSearch = (newFilters: SearchFilters) => {
    setFilters(newFilters);
    const venuesSection = document.getElementById('locais-destaque');
    if (venuesSection) {
      venuesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (view === 'login' || view === 'register') {
    return (
      <AuthScreen
        initialMode={view}
        onClose={() => setView('landing')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col antialiased">
      <Navbar onOpenAuth={(mode) => setView(mode)} />

      <main className="flex-grow">
        <Hero onSearch={handleSearch} />

        <div id="locais-destaque">
          <FeaturedVenues filters={filters} />
        </div>

        <FeaturesList />

        <HowItWorks />
      </main>

      <Footer />
    </div>
  );
}

export default App;

