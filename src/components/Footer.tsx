import { ArrowRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-[#EAE3D2] pt-16 pb-8 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-12">
          
          <div className="lg:col-span-2 flex flex-col space-y-6">
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
            <p className="text-xs text-[#6E6B64] font-light leading-relaxed max-w-sm">
              A plataforma completa para transformar o planejamento do seu evento em uma experiência inesquecível, conectando você aos melhores espaços com segurança e facilidade.
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="w-8 h-8 rounded-full border border-[#EAE3D2] flex items-center justify-center text-[#6E6B64] hover:text-[#B8975A] hover:border-[#B8975A] transition-colors" aria-label="Instagram">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-[#EAE3D2] flex items-center justify-center text-[#6E6B64] hover:text-[#B8975A] hover:border-[#B8975A] transition-colors" aria-label="Facebook">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-[#EAE3D2] flex items-center justify-center text-[#6E6B64] hover:text-[#B8975A] hover:border-[#B8975A] transition-colors" aria-label="LinkedIn">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-[#EAE3D2] flex items-center justify-center text-[#6E6B64] hover:text-[#B8975A] hover:border-[#B8975A] transition-colors" aria-label="YouTube">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
                  <polygon points="10 15 15 12 10 9" />
                </svg>
              </a>
            </div>
          </div>


          <div className="flex flex-col space-y-4">
            <h4 className="text-xs font-bold text-[#2B2A27] uppercase tracking-wider">
              Navegação
            </h4>
            <ul className="space-y-2.5 text-xs text-[#6E6B64]">
              <li>
                <a href="#" className="hover:text-[#B8975A] transition-colors font-light">Locais</a>
              </li>
              <li>
                <a href="#como-funciona" className="hover:text-[#B8975A] transition-colors font-light">Como funciona</a>
              </li>
              <li>
                <a href="#" className="hover:text-[#B8975A] transition-colors font-light">Planos</a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col space-y-4">
            <h4 className="text-xs font-bold text-[#2B2A27] uppercase tracking-wider">
              Ajuda
            </h4>
            <ul className="space-y-2.5 text-xs text-[#6E6B64]">
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

          <div className="flex flex-col space-y-4 col-span-1">
            <h4 className="text-xs font-bold text-[#2B2A27] uppercase tracking-wider">
              Para Proprietários
            </h4>
            <ul className="space-y-2.5 text-xs text-[#6E6B64]">
              <li>
                <a href="#" className="hover:text-[#B8975A] transition-colors font-light">Anuncie seu espaço</a>
              </li>
              <li>
                <a href="#" className="hover:text-[#B8975A] transition-colors font-light">Área do Proprietário</a>
              </li>
              <li>
                <a href="#" className="hover:text-[#B8975A] transition-colors font-light">Perguntas frequentes</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#EAE3D2]/60 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="w-full md:w-auto flex flex-col space-y-2 text-left">
            <span className="text-xs font-bold text-[#2B2A27]">Inscreva-se na nossa Newsletter</span>
            <span className="text-[11px] text-[#6E6B64] font-light">Receba dicas de planejamento e novidades exclusivas de locais.</span>
            <form onSubmit={(e) => e.preventDefault()} className="flex items-stretch w-full md:w-80 mt-2">
              <input 
                type="email" 
                placeholder="Seu melhor e-mail"
                className="bg-[#F4F0E6] text-xs px-4 py-2.5 rounded-l-md border-0 focus:ring-1 focus:ring-[#B8975A] focus:outline-none w-full text-[#2B2A27]"
              />
              <button 
                type="submit" 
                className="bg-[#B8975A] hover:bg-[#A38349] text-white px-4 rounded-r-md transition-colors flex items-center justify-center"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          <div className="text-[10px] text-[#6E6B64] font-light text-center md:text-right">
            © {currentYear} Maré Eventos Ltda. Todos os direitos reservados.
          </div>
        </div>

      </div>
    </footer>
  );
}
