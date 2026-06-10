import { Heart, Calendar, Star } from 'lucide-react';

interface RegisterBannerProps {
  onRegisterClick: () => void;
}

export default function RegisterBanner({ onRegisterClick }: RegisterBannerProps) {
  return (
    <section className="px-4 py-8 bg-[#FAF8F5]">
      <div className="max-w-3xl mx-auto bg-white border border-[#EAE3D2] rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col items-center text-center space-y-6">
        <h3 className="font-sans text-base sm:text-lg text-[#2B2A27] font-bold tracking-tight px-2">
          Crie sua conta e aproveite todas as vantagens!
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl text-left">
          {/* Benefit 1 */}
          <div className="flex items-center space-x-3 bg-[#FAF8F5] p-3 rounded-2xl border border-[#FAF8F5] hover:border-[#EAE3D2] transition-colors">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white text-[#B8975A] border border-[#B8975A]/20 shadow-sm flex-shrink-0">
              <Heart className="w-5 h-5 text-[#B8975A]" />
            </div>
            <span className="text-[11px] sm:text-xs font-medium text-[#6E6B64] leading-snug">
              Favoritos e listas personalizadas
            </span>
          </div>

          {/* Benefit 2 */}
          <div className="flex items-center space-x-3 bg-[#FAF8F5] p-3 rounded-2xl border border-[#FAF8F5] hover:border-[#EAE3D2] transition-colors">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white text-[#B8975A] border border-[#B8975A]/20 shadow-sm flex-shrink-0">
              <div className="relative flex items-center justify-center">
                <Star className="w-5 h-5 text-[#B8975A]" />
                <div className="absolute inset-0 border border-[#B8975A] rounded-full scale-125"></div>
              </div>
            </div>
            <span className="text-[11px] sm:text-xs font-medium text-[#6E6B64] leading-snug">
              Acompanhe seus orçamentos
            </span>
          </div>

          {/* Benefit 3 */}
          <div className="flex items-center space-x-3 bg-[#FAF8F5] p-3 rounded-2xl border border-[#FAF8F5] hover:border-[#EAE3D2] transition-colors">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white text-[#B8975A] border border-[#B8975A]/20 shadow-sm flex-shrink-0">
              <Calendar className="w-5 h-5 text-[#B8975A]" />
            </div>
            <span className="text-[11px] sm:text-xs font-medium text-[#6E6B64] leading-snug">
              Agendamentos e histórico
            </span>
          </div>
        </div>

        <button
          onClick={onRegisterClick}
          className="w-full sm:w-auto px-10 py-3.5 bg-[#B8975A] hover:bg-[#A38349] text-white text-sm font-semibold rounded-2xl shadow-md transition-all hover:scale-[1.02] cursor-pointer"
        >
          Cadastre-se grátis
        </button>
      </div>
    </section>
  );
}
