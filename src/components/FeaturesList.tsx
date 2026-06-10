import { ClipboardCheck, BadgeCheck, Users, Percent, ShieldCheck } from 'lucide-react';

const FEATURES = [
  {
    icon: ClipboardCheck,
    title: 'Organização completa',
  },
  {
    icon: BadgeCheck,
    title: 'Avaliações confiáveis',
  },
  {
    icon: Users,
    title: 'Especialistas verificados',
  },
  {
    icon: Percent,
    title: 'Orçamentos personalizados',
  },
  {
    icon: ShieldCheck,
    title: 'Eventos seguros',
  },
];

export default function FeaturesList() {
  return (
    <section className="py-16 bg-[#FAF8F5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title block matching mockup */}
        <div className="text-center mb-8 relative z-10">
          <span className="font-script text-5xl sm:text-6xl text-[#B8975A] block leading-none mb-1">
            Tudo que você precisa
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#2B2A27] font-semibold leading-tight">
            para um evento perfeito
          </h2>
        </div>

        {/* Container with gold border and rounded corners */}
        <div className="bg-[#FAF8F5]/30 rounded-3xl p-6 sm:p-10 border border-[#B8975A]/25 relative shadow-sm max-w-4xl mx-auto">
          {/* Grid of features */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 sm:gap-8 relative z-10 justify-items-center">
            {FEATURES.map((feat, index) => {
              const Icon = feat.icon;
              return (
                <div key={index} className="flex flex-col items-center text-center space-y-3 group flex-1 min-w-[100px] cursor-pointer">
                  {/* Circular Icon container with gold border */}
                  <div className="w-12 h-12 rounded-full border border-[#B8975A]/40 bg-white flex items-center justify-center group-hover:bg-[#B8975A]/10 group-hover:border-[#B8975A] transition-all duration-300 transform group-hover:scale-105 shadow-sm">
                    <Icon className="w-5 h-5 text-[#B8975A] transition-colors duration-300" />
                  </div>

                  {/* Text Details */}
                  <h3 className="font-semibold text-[10px] sm:text-[11px] text-[#6E6B64] tracking-wide leading-tight px-1 group-hover:text-[#B8975A] transition-colors">
                    {feat.title}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
