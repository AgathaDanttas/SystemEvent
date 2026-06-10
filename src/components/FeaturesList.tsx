import { CalendarRange, Building2, UserCheck, Handshake, ShieldCheck } from 'lucide-react';

const FEATURES = [
  {
    icon: CalendarRange,
    title: 'Disponibilidade Real',
    description: 'Consulte a agenda dos locais em tempo real e evite surpresas.',
  },
  {
    icon: Building2,
    title: 'Instalações Confiáveis',
    description: 'Locais com infraestrutura completa e fotos verificadas.',
  },
  {
    icon: UserCheck,
    title: 'Apoio de Especialistas',
    description: 'Ajuda profissional de assessores para planejar cada detalhe.',
  },
  {
    icon: Handshake,
    title: 'Parceiros Homologados',
    description: 'Conecte-se com fornecedores e buffets parceiros indicados.',
  },
  {
    icon: ShieldCheck,
    title: 'Processo Seguro',
    description: 'Contrato digital e pagamento com garantia de ponta a ponta.',
  },
];

export default function FeaturesList() {
  return (
    <section className="py-24 bg-[#FAF8F5] relative overflow-hidden">
      <div className="absolute top-1/2 -left-20 -translate-y-1/2 w-72 h-72 rounded-full border border-[#B8975A]/10 flex items-center justify-center -z-10 select-none">
        <span className="font-serif text-[120px] text-[#B8975A]/5 font-light">M</span>
      </div>
      <div className="absolute top-1/2 -right-20 -translate-y-1/2 w-72 h-72 rounded-full border border-[#B8975A]/10 flex items-center justify-center -z-10 select-none">
        <span className="font-serif text-[120px] text-[#B8975A]/5 font-light">M</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Container with warm sand background */}
        <div className="bg-[#F4F0E6] rounded-3xl p-8 sm:p-12 lg:p-16 border border-[#EAE3D2] relative">
          
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 rounded-full border border-[#B8975A]/30 flex items-center justify-center bg-white/50">
              <span className="font-serif text-sm text-[#B8975A] font-semibold">M</span>
            </div>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl text-[#2B2A27] text-center font-normal mb-16 max-w-2xl mx-auto leading-tight">
            Tudo que você precisa para um evento perfeito
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {FEATURES.map((feat, index) => {
              const Icon = feat.icon;
              return (
                <div key={index} className="flex flex-col items-center text-center space-y-4 group">
                  <div className="w-16 h-16 rounded-full border border-[#B8975A] bg-white flex items-center justify-center shadow-sm group-hover:bg-[#B8975A] group-hover:text-white transition-all duration-300 transform group-hover:scale-105">
                    <Icon className="w-6 h-6 text-[#B8975A] group-hover:text-white transition-colors duration-300" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold text-sm text-[#2B2A27] tracking-wide">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-[#6E6B64] font-light leading-relaxed max-w-[200px] mx-auto">
                      {feat.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
