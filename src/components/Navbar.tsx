import { useState } from 'react';
import { ChevronDown, Menu, X, Bell } from 'lucide-react';
import logoGold from '../assets/logo_gold.png';

interface NavbarProps {
  onOpenAuth?: (mode: 'login' | 'register') => void;
  isLoggedIn?: boolean;
  userAvatar?: string;
  userName?: string;
  userEmail?: string;
  onLogout?: () => void;
  showDashboardLink?: boolean;
  onSwitchToDashboard?: () => void;
}

export default function Navbar({ 
  onOpenAuth,
  isLoggedIn = false,
  userAvatar = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
  userName = 'Ana Silva',
  userEmail = 'cliente@momentos.com.br',
  onLogout,
  showDashboardLink = false,
  onSwitchToDashboard
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#EAE3D2] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Header Layout */}
        <div className="hidden md:flex justify-between w-full h-full items-center">
          <div className="flex items-center">
            <a href="#" className="flex items-center cursor-pointer relative h-full group">
              <img src={logoGold} alt="Momentos Inesquecíveis Logo" className="w-24 h-24 object-contain absolute left-0 top-1/2 -translate-y-1/2 max-w-none" />
              <div className="flex flex-col text-left pl-[108px]">
                <span className="font-serif text-base tracking-wider text-[#2B2A27] font-semibold leading-tight uppercase">
                  MOMENTOS INESQUECÍVEIS
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#B8975A] font-medium leading-none">
                  Plataforma
                </span>
              </div>
            </a>
          </div>

          <div className="flex items-center space-x-8">
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

          {isLoggedIn ? (
            <div className="flex items-center space-x-6">
              <button className="relative p-2 text-[#6E6B64] hover:text-[#B8975A] transition-colors focus:outline-none">
                <Bell className="w-6 h-6" />
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#FAF8F5]"></span>
              </button>
              
              <div className="relative group/avatar">
                <button className="flex items-center space-x-3 pl-4 border-l border-[#EAE3D2] focus:outline-none py-2 cursor-pointer">
                  <img 
                    src={userAvatar} 
                    alt="Avatar do Usuário" 
                    className="w-10 h-10 rounded-full object-cover border border-[#B8975A]/30 shadow-inner" 
                  />
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-semibold text-[#2B2A27]">{userName}</span>
                    <span className="text-[10px] text-[#6E6B64]">{userEmail}</span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-[#6E6B64]" />
                </button>
                {/* Logout Dropdown */}
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white border border-[#EAE3D2] opacity-0 invisible group-hover/avatar:opacity-100 group-hover/avatar:visible transition-all duration-200 transform translate-y-2 group-hover/avatar:translate-y-0 z-50">
                  <div className="py-1">
                    {showDashboardLink && (
                      <button 
                        onClick={onSwitchToDashboard}
                        className="w-full text-left block px-4 py-2 text-sm text-[#B8975A] hover:bg-[#F4F0E6] cursor-pointer border-b border-[#EAE3D2]/40 font-semibold"
                      >
                        Painel Fornecedor
                      </button>
                    )}
                    <button 
                      onClick={onLogout}
                      className="w-full text-left block px-4 py-2 text-sm text-[#2B2A27] hover:bg-[#F4F0E6] hover:text-[#B8975A] cursor-pointer"
                    >
                      Sair
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <button
                onClick={() => onOpenAuth?.('login')}
                className="px-5 py-2 text-sm font-medium text-[#B8975A] hover:text-[#A38349] transition-colors cursor-pointer"
              >
                Entrar
              </button>
              <button
                onClick={() => onOpenAuth?.('register')}
                className="px-5 py-2.5 text-sm font-medium text-white bg-[#B8975A] hover:bg-[#A38349] rounded-md transition-all duration-300 transform hover:-translate-y-0.5 shadow-sm hover:shadow-md cursor-pointer"
              >
                Cadastrar
              </button>
            </div>
          )}
        </div>

        {/* Mobile Header Layout (Matching Mockup) */}
        <div className="flex md:hidden justify-between items-center w-full py-3 h-full">
          {/* Hamburger Menu Toggle on Left */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-[#6E6B64] hover:text-[#B8975A] focus:outline-none p-1.5 cursor-pointer"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Central Circular Logo */}
          <a href="#" className="flex items-center justify-center cursor-pointer">
            <img src={logoGold} alt="Momentos Inesquecíveis Logo" className="w-[38px] h-[38px] object-contain" />
          </a>

          {/* Right Action: Entrar & Cadastre-se buttons (when logged out), or avatar (when logged in) */}
          <div className="flex items-center">
            {isLoggedIn ? (
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="focus:outline-none cursor-pointer p-0.5"
              >
                <img 
                  src={userAvatar} 
                  alt="Avatar" 
                  className="w-8 h-8 rounded-full object-cover border border-[#B8975A]/30 shadow-inner" 
                />
              </button>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onOpenAuth?.('login')}
                  className="px-4 py-1.5 text-xs font-semibold text-[#2B2A27] border border-[#EAE3D2] rounded-lg bg-white hover:bg-[#FAF8F5] transition-colors cursor-pointer"
                >
                  Entrar
                </button>
                <button
                  onClick={() => onOpenAuth?.('register')}
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-[#B8975A] hover:bg-[#A38349] rounded-lg transition-colors cursor-pointer"
                >
                  Cadastre-se
                </button>
              </div>
            )}
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

          {isLoggedIn ? (
            <div className="pt-4 flex flex-col space-y-3 px-3">
              <div className="flex items-center space-x-3 py-2 border-b border-[#EAE3D2]">
                <img 
                  src={userAvatar} 
                  alt="Avatar do Usuário" 
                  className="w-10 h-10 rounded-full object-cover border border-[#B8975A]/30 shadow-inner" 
                />
                <div className="flex flex-col text-left">
                  <span className="text-xs font-semibold text-[#2B2A27]">{userName}</span>
                  <span className="text-[10px] text-[#6E6B64]">{userEmail}</span>
                </div>
              </div>
              {showDashboardLink && (
                <button
                  onClick={() => { setIsOpen(false); onSwitchToDashboard?.(); }}
                  className="w-full py-2.5 text-center text-sm font-semibold text-[#B8975A] hover:bg-[#FAF0E6]/50 border border-[#B8975A] rounded-md transition-colors cursor-pointer mb-2"
                >
                  Painel Fornecedor
                </button>
              )}
              <button
                onClick={() => { setIsOpen(false); onLogout?.(); }}
                className="w-full py-2.5 text-center text-sm font-medium text-red-500 hover:bg-red-50 border border-red-200 rounded-md transition-colors cursor-pointer"
              >
                Sair da Conta
              </button>
            </div>
          ) : (
            <div className="pt-4 flex flex-col space-y-2 px-3">
              <button
                onClick={() => { setIsOpen(false); onOpenAuth?.('login'); }}
                className="w-full py-2.5 text-center text-sm font-medium text-[#B8975A] hover:bg-[#F4F0E6] border border-[#B8975A] rounded-md transition-colors cursor-pointer"
              >
                Entrar
              </button>
              <button
                onClick={() => { setIsOpen(false); onOpenAuth?.('register'); }}
                className="w-full py-2.5 text-center text-sm font-medium text-white bg-[#B8975A] hover:bg-[#A38349] rounded-md transition-colors shadow cursor-pointer"
              >
                Cadastrar
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
