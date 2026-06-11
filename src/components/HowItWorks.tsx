import { Search, MessageSquare, ShieldCheck, ChevronRight, type LucideIcon } from 'lucide-react';

const STEPS: Array<{ icon: LucideIcon | 'custom-glasses'; title: string }> = [
  {
    icon: Search,
    title: '1. Encontre o espaço ideal',
  },
  {
    icon: MessageSquare,
    title: '2. Entre em contato',
  },
  {
    icon: ShieldCheck,
    title: '3. Receba sua proposta',
  },
  {
    icon: 'custom-glasses',
    title: '4. Viva seu momento',
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="py-16 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title block matching mockup */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-2xl sm:text-3xl text-[#2B2A27] font-semibold tracking-tight">
            Como funciona
          </h2>
          <p className="text-[#6E6B64] font-light mt-2 text-xs sm:text-sm max-w-xl mx-auto">
            Em poucos passos, o lugar perfeito para seu evento
          </p>
        </div>

        {/* Horizontal steps flow */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-2 lg:gap-6 max-w-5xl mx-auto">
          {STEPS.map((step, index) => {
            const Icon = step.icon !== 'custom-glasses' ? step.icon : null;
            return (
              <div key={index} className="flex items-center w-full md:w-auto">
                {/* Step Card */}
                <div 
                  className="bg-white border border-[#EAE3D2] rounded-3xl p-5 relative flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all duration-300 group flex-1 md:flex-initial md:w-48 h-40 justify-center"
                >
                  <div className="w-12 h-12 rounded-full bg-[#FAF8F5] border border-[#B8975A]/20 flex items-center justify-center text-[#B8975A] group-hover:bg-[#B8975A] group-hover:text-white transition-all duration-300 shadow-inner mb-4">
                    {step.icon === 'custom-glasses' ? (
                      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 transition-colors duration-300">
                        <path d="M6 3h5v5c0 2.2-1.8 4-4 4H6V3z" />
                        <path d="M8 12v7M5 19h6" />
                        <path d="M18 3h-5v5c0 2.2 1.8 4 4 4h1v-9z" />
                        <path d="M16 12v7M13 19h6" />
                        <path d="m11 5 2 2M13 5l-2 2" />
                      </svg>
                    ) : Icon ? (
                      <Icon className="w-5 h-5 transition-colors duration-300" />
                    ) : null}
                  </div>

                  <h3 className="font-bold text-[11px] sm:text-xs text-[#2B2A27] px-2 leading-tight">
                    {step.title}
                  </h3>
                </div>

                {/* Arrow Divider (except for last step) */}
                {index < STEPS.length - 1 && (
                  <div className="hidden md:flex items-center justify-center text-[#B8975A] mx-2 flex-shrink-0 animate-pulse">
                    <ChevronRight className="w-6 h-6 stroke-[1.5]" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
