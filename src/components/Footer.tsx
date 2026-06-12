import { ArrowRight } from 'lucide-react';
import logoGold from '../assets/logo_gold.png';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-[#EAE3D2] pt-16 pb-8 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10 lg:gap-8 mb-16">
          
          {/* Column 1: Logo, Bio & Socials */}
          <div className="flex flex-col space-y-6">
            <a href="#" className="flex items-center group">
              <img src={logoGold} alt="Momentos Inesquecíveis" className="w-16 h-16 object-contain" />
            </a>
            <p className="text-xs text-[#6E6B64] font-light leading-relaxed max-w-[220px]">
              A plataforma completa para transformar seu evento em uma experiência inesquecível.
            </p>
            {/* Social Icons matching mockup */}
            <div className="flex items-center space-x-3.5 pt-2">
              <a href="#" className="text-[#6E6B64] hover:text-[#B8975A] transition-colors" aria-label="Instagram">
                <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a href="#" className="text-[#6E6B64] hover:text-[#B8975A] transition-colors" aria-label="Facebook">
                <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href="#" className="text-[#6E6B64] hover:text-[#B8975A] transition-colors" aria-label="Pinterest">
                {/* Pinterest SVG */}
                <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.08 3.16 9.42 7.63 11.16-.1-.95-.2-2.4.04-3.43.22-.93 1.4-5.93 1.4-5.93s-.36-.72-.36-1.77c0-1.66.96-2.9 2.17-2.9 1.02 0 1.51.77 1.51 1.69 0 1.03-.65 2.56-.99 3.98-.28 1.19.6 2.16 1.77 2.16 2.12 0 3.76-2.24 3.76-5.47 0-2.86-2.06-4.86-5-4.86-3.4 0-5.4 2.56-5.4 5.2 0 1.03.4 2.13.9 2.73.1.12.1.22.08.33l-.34 1.39c-.06.22-.18.28-.4.18-1.52-.7-2.46-2.92-2.46-4.7 0-3.83 2.78-7.35 8.03-7.35 4.22 0 7.5 3.01 7.5 7.03 0 4.19-2.64 7.56-6.3 7.56-1.23 0-2.39-.64-2.79-1.4l-.76 2.9c-.28 1.07-1 2.4-1.5 3.2 1.1.34 2.26.53 3.48.53 6.63 0 12-5.37 12-12S18.63 0 12 0Z"/>
                </svg>
              </a>
              <a href="#" className="text-[#6E6B64] hover:text-[#B8975A] transition-colors" aria-label="LinkedIn">
                <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Navegação */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-xs font-bold text-[#2B2A27] uppercase tracking-wider">
              Navegação
            </h4>
            <ul className="space-y-2 text-xs text-[#6E6B64]">
              <li>
                <a href="#" className="hover:text-[#B8975A] transition-colors font-light">Locais</a>
              </li>
              <li>
                <a href="#" className="hover:text-[#B8975A] transition-colors font-light">Fornecedores</a>
              </li>
              <li>
                <a href="#" className="hover:text-[#B8975A] transition-colors font-light">Inspirações</a>
              </li>
              <li>
                <a href="#como-funciona" className="hover:text-[#B8975A] transition-colors font-light">Como Funciona</a>
              </li>
              <li>
                <a href="#" className="hover:text-[#B8975A] transition-colors font-light">Planos</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Ajuda */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-xs font-bold text-[#2B2A27] uppercase tracking-wider">
              Ajuda
            </h4>
            <ul className="space-y-2 text-xs text-[#6E6B64]">
              <li>
                <a href="#" className="hover:text-[#B8975A] transition-colors font-light">Central de ajuda</a>
              </li>
              <li>
                <a href="#" className="hover:text-[#B8975A] transition-colors font-light">Fale conosco</a>
              </li>
              <li>
                <a href="#" className="hover:text-[#B8975A] transition-colors font-light">Política de Privacidade</a>
              </li>
              <li>
                <a href="#" className="hover:text-[#B8975A] transition-colors font-light">Termos de uso</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Para Fornecedores */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-xs font-bold text-[#2B2A27] uppercase tracking-wider">
              Para Fornecedores
            </h4>
            <ul className="space-y-2 text-xs text-[#6E6B64]">
              <li>
                <a href="#" className="hover:text-[#B8975A] transition-colors font-light">Seja um parceiro</a>
              </li>
              <li>
                <a href="#" className="hover:text-[#B8975A] transition-colors font-light">Area de Fornecedor</a>
              </li>
              <li>
                <a href="#" className="hover:text-[#B8975A] transition-colors font-light">Dicas e Recursos</a>
              </li>
            </ul>
          </div>

          {/* Column 5: Newsletter */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-xs font-bold text-[#2B2A27] uppercase tracking-wider">
              Newsletter
            </h4>
            <p className="text-xs text-[#6E6B64] font-light leading-relaxed">
              Receba dicas, insiprações e novidades para oo seu evento.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex items-stretch w-full mt-2">
              <input 
                type="email" 
                placeholder="Seu melhor e-mail"
                className="bg-[#FAF8F5] text-xs px-3.5 py-2.5 rounded-l-md border border-[#EAE3D2] border-r-0 focus:ring-1 focus:ring-[#B8975A] focus:outline-none w-full text-[#2B2A27] placeholder:text-[#6E6B64]/50"
              />
              <button 
                type="submit" 
                className="bg-[#B8975A] hover:bg-[#A38349] text-white px-3.5 rounded-r-md transition-colors flex items-center justify-center cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

        {/* Copyright Section */}
        <div className="pt-8 border-t border-[#EAE3D2]/60 text-xs text-[#6E6B64] font-light text-left">
          @ {currentYear} Momentos Inesquecíveis. Todos os direitos reservados.
        </div>

      </div>
    </footer>
  );
}
