import { useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenAuth?: (mode: 'login' | 'register') => void;
}

export default function Navbar({ onOpenAuth }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#EAE3D2] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <a href="#" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-full border-2 border-[#B8975A] flex items-center justify-center bg-[#F4F0E6] group-hover:bg-[#B8975A] transition-colors duration-300">
                <span className="font-serif text-[#B8975A] group-hover:text-white font-semibold text-lg transition-colors duration-300">
                  M
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg tracking-wider text-[#2B2A27] font-semibold leading-tight">
                  MARÉ EVENTOS
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#B8975A] font-medium leading-none">
                  Plataforma
                </span>
              </div>
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <div className="relative group">
              <button className="flex items-center space-x-1 text-sm font-medium text-[#6E6B64] hover:text-[#B8975A] transition-colors py-2">
                <span>Locais</span>
                <ChevronDown className="w-4 h-4 text-[#6E6B64] group-hover:text-[#B8975A] transition-colors" />
              </button>
              <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white border border-[#EAE3D2] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                <div className="py-1">
                  <a href="#" className="block px-4 py-2 text-sm text-[#2B2A27] hover:bg-[#F4F0E6] hover:text-[#B8975A]">Salão de Festas</a>
                  <a href="#" className="block px-4 py-2 text-sm text-[#2B2A27] hover:bg-[#F4F0E6] hover:text-[#B8975A]">Sítios e Chácaras</a>
                  <a href="#" className="block px-4 py-2 text-sm text-[#2B2A27] hover:bg-[#F4F0E6] hover:text-[#B8975A]">Mansões Modernas</a>
                  <a href="#" className="block px-4 py-2 text-sm text-[#2B2A27] hover:bg-[#F4F0E6] hover:text-[#B8975A]">Espaços Rústicos</a>
                </div>
              </div>
            </div>

            <div className="relative group">
              <button className="flex items-center space-x-1 text-sm font-medium text-[#6E6B64] hover:text-[#B8975A] transition-colors py-2">
                <span>Planos</span>
                <ChevronDown className="w-4 h-4 text-[#6E6B64] group-hover:text-[#B8975A] transition-colors" />
              </button>
              <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white border border-[#EAE3D2] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                <div className="py-1">
                  <a href="#" className="block px-4 py-2 text-sm text-[#2B2A27] hover:bg-[#F4F0E6] hover:text-[#B8975A]">Para Proprietários</a>
                  <a href="#" className="block px-4 py-2 text-sm text-[#2B2A27] hover:bg-[#F4F0E6] hover:text-[#B8975A]">Para Organizadores</a>
                </div>
              </div>
            </div>

            <a href="#como-funciona" className="text-sm font-medium text-[#6E6B64] hover:text-[#B8975A] transition-colors">
              Como funciona
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => onOpenAuth?.('login')}
              className="px-5 py-2 text-sm font-medium text-[#B8975A] hover:text-[#A38349] transition-colors"
            >
              Entrar
            </button>
            <button
              onClick={() => onOpenAuth?.('register')}
              className="px-5 py-2.5 text-sm font-medium text-white bg-[#B8975A] hover:bg-[#A38349] rounded-md transition-all duration-300 transform hover:-translate-y-0.5 shadow-sm hover:shadow-md"
            >
              Cadastrar
            </button>
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#6E6B64] hover:text-[#B8975A] focus:outline-none p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-height-screen border-t border-[#EAE3D2] bg-[#FAF8F5]' : 'max-h-0'}`}>
        <div className="px-4 pt-2 pb-6 space-y-4 shadow-inner">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-[#B8975A] uppercase tracking-wider px-3 py-2">Locais</p>
            <a href="#" className="block px-6 py-2 text-sm font-medium text-[#6E6B64] hover:text-[#B8975A]">Salão de Festas</a>
            <a href="#" className="block px-6 py-2 text-sm font-medium text-[#6E6B64] hover:text-[#B8975A]">Sítios e Chácaras</a>
            <a href="#" className="block px-6 py-2 text-sm font-medium text-[#6E6B64] hover:text-[#B8975A]">Mansões</a>
          </div>
          
          <div className="space-y-1">
            <p className="text-xs font-semibold text-[#B8975A] uppercase tracking-wider px-3 py-2">Planos</p>
            <a href="#" className="block px-6 py-2 text-sm font-medium text-[#6E6B64] hover:text-[#B8975A]">Para Proprietários</a>
            <a href="#" className="block px-6 py-2 text-sm font-medium text-[#6E6B64] hover:text-[#B8975A]">Para Organizadores</a>
          </div>

          <a
            href="#como-funciona"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 text-base font-medium text-[#6E6B64] hover:text-[#B8975A] hover:bg-[#F4F0E6] rounded-md"
          >
            Como funciona
          </a>

          <div className="pt-4 flex flex-col space-y-2 px-3">
            <button
              onClick={() => { setIsOpen(false); onOpenAuth?.('login'); }}
              className="w-full py-2.5 text-center text-sm font-medium text-[#B8975A] hover:bg-[#F4F0E6] border border-[#B8975A] rounded-md transition-colors"
            >
              Entrar
            </button>
            <button
              onClick={() => { setIsOpen(false); onOpenAuth?.('register'); }}
              className="w-full py-2.5 text-center text-sm font-medium text-white bg-[#B8975A] hover:bg-[#A38349] rounded-md transition-colors shadow"
            >
              Cadastrar
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
