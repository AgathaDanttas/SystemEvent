import { Calendar, Star, Expand, Users, ShieldCheck } from 'lucide-react';
import logoGold from '../assets/logo_gold.png';

const FEATURES = [
  {
    icon: Calendar,
    title: 'Disponibilidade Real',
    description: 'Consulte a agenda dos locais em tempo real e evite surpresas.',
  },
  {
    icon: Star,
    title: 'Avaliações Confiáveis',
    description: 'Consulte a agenda dos locais em tempo real e evite surpresas.',
  },
  {
    icon: Expand,
    title: 'Experiência Imersiva',
    description: 'Fotos Profissionais, e vídeos para conhecer cada detalhe.',
  },
  {
    icon: Users,
    title: 'Organizadores Parceiros',
    description: 'Consulte a agenda dos locais em tempo real e evite surpresas.',
  },
  {
    icon: ShieldCheck,
    title: 'Reserva Segura',
    description: 'Consulte a agenda dos locais em tempo real e evite surpresas.',
  },
];

export default function FeaturesList() {
  return (
    <section className="py-16 bg-[#FAF8F5] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* "Momentos marcantes" — fora do card, Imperial Script */}
        <div className="text-center mb-2">
          <span className="font-script text-4xl sm:text-5xl text-[#B8975A] block leading-none">
            Momentos marcantes
          </span>
        </div>

        {/* Card container */}
        <div className="relative bg-[#FAF5EA]/60 rounded-3xl px-6 sm:px-10 pt-8 pb-10 border border-[#D4BC8A]/40 shadow-sm">

          {/* Watermark logo — topo esquerdo, sem opacidade */}
          <img
            src={logoGold}
            alt=""
            aria-hidden="true"
            className="absolute -top-6 left-6 w-14 h-14 object-contain select-none pointer-events-none"
          />

          {/* Subtítulo dentro do card */}
          <h2 className="font-serif text-xl sm:text-2xl text-[#2B2A27] font-medium leading-tight text-center mb-8">
            Tudo que você precisa para um evento perfeito
          </h2>

          {/* Features grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 sm:gap-8 justify-items-center">
            {FEATURES.map((feat, index) => {
              const Icon = feat.icon;
              return (
                <div
                  key={index}
                  className="flex flex-col items-center text-center space-y-2.5 group cursor-pointer"
                >
                  {/* Circle icon */}
                  <div className="w-12 h-12 rounded-full border border-[#B8975A]/35 bg-white flex items-center justify-center group-hover:bg-[#B8975A]/10 group-hover:border-[#B8975A] transition-all duration-300 transform group-hover:scale-105 shadow-sm">
                    <Icon className="w-5 h-5 text-[#B8975A] transition-colors duration-300" />
                  </div>

                  {/* Title */}
                  <h3 className="font-semibold text-[11px] sm:text-xs text-[#2B2A27] leading-tight px-1 group-hover:text-[#B8975A] transition-colors">
                    {feat.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[10px] sm:text-[11px] text-[#6E6B64] font-light leading-snug px-1">
                    {feat.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Watermark logo — canto inferior direito, sem opacidade */}
          <img
            src={logoGold}
            alt=""
            aria-hidden="true"
            className="absolute -bottom-6 right-6 w-16 h-16 object-contain select-none pointer-events-none"
          />
        </div>

      </div>
    </section>
  );
}
