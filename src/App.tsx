import { useState, type FormEvent } from 'react';
import { Calendar, Menu, Search, X } from 'lucide-react';
import heroImage from './assets/hero_event.png';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [message, setMessage] = useState('');

  function handleSearch(event: FormEvent) {
    event.preventDefault();
    setMessage('Busca feita apenas para demonstracao nesta etapa.');
    setTimeout(() => setMessage(''), 3000);
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2B2A27]">
      <header className="sticky top-0 z-40 border-b border-[#EAE3D2] bg-[#FAF8F5]/95">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#B8975A] bg-[#F4F0E6] font-serif text-lg font-bold text-[#B8975A]">
              E
            </div>
            <div>
              <p className="font-serif text-xl font-semibold">Eventix</p>
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#B8975A]">Plataforma</p>
            </div>
          </div>

          <nav className="hidden items-center gap-8 md:flex">
            <a href="#inicio" className="text-sm font-medium text-[#6E6B64] hover:text-[#B8975A]">Inicio</a>
            <a href="#sobre" className="text-sm font-medium text-[#6E6B64] hover:text-[#B8975A]">Sobre</a>
            <button className="rounded-md bg-[#B8975A] px-4 py-2 text-sm font-semibold text-white">Entrar</button>
          </nav>

          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu">
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {menuOpen && (
          <div className="space-y-2 border-t border-[#EAE3D2] px-4 py-4 md:hidden">
            <a href="#inicio" className="block text-[#6E6B64]">Inicio</a>
            <a href="#sobre" className="block text-[#6E6B64]">Sobre</a>
          </div>
        )}
      </header>

      <main>
        <section id="inicio" className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#B8975A]">Sistema de eventos</p>
            <h1 className="font-serif text-5xl leading-tight sm:text-7xl">Encontre o espaco ideal para seu evento</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#6E6B64]">
              A Eventix conecta clientes e proprietarios para buscar, reservar e gerenciar espacos.
            </p>

            <form onSubmit={handleSearch} className="mt-8 grid gap-3 rounded-2xl border border-[#EAE3D2] bg-white p-4 shadow-lg sm:grid-cols-[1fr_auto]">
              <input placeholder="Buscar por cidade ou espaco" className="rounded-lg border border-[#EAE3D2] px-4 py-3 outline-none focus:border-[#B8975A]" />
              <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#B8975A] px-5 py-3 font-semibold text-white">
                <Search className="h-4 w-4" />
                Buscar
              </button>
            </form>
          </div>

          <div className="overflow-hidden rounded-2xl border-4 border-white shadow-2xl">
            <img src={heroImage} alt="Evento decorado" className="h-[430px] w-full object-cover" />
          </div>
        </section>

        <section id="sobre" className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 pb-16 sm:grid-cols-3 sm:px-6 lg:px-8">
          <InfoCard number="120+" text="espacos cadastrados" />
          <InfoCard number="4.8" text="avaliacao media" />
          <InfoCard number="24h" text="tempo medio de resposta" />
        </section>
      </main>

      <footer className="border-t border-[#EAE3D2] bg-white py-8">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 text-sm text-[#6E6B64] sm:px-6 lg:px-8">
          <Calendar className="h-4 w-4 text-[#B8975A]" />
          Eventix - etapa home
        </div>
      </footer>

      {message && <div className="fixed bottom-5 right-5 rounded-lg bg-[#2B2A27] px-5 py-4 text-sm text-white">{message}</div>}
    </div>
  );
}

function InfoCard({ number, text }: { number: string; text: string }) {
  return (
    <div className="rounded-xl border border-[#EAE3D2] bg-white p-6">
      <strong className="text-3xl">{number}</strong>
      <p className="mt-1 text-sm text-[#6E6B64]">{text}</p>
    </div>
  );
}

export default App;
