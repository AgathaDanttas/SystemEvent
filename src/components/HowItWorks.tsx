import { Search, MessagesSquare, ShieldAlert, Sparkles } from 'lucide-react';

const STEPS = [
  {
    number: '01',
    icon: Search,
    title: 'Busque o local ideal',
    description: 'Filtrando por data, localização, capacidade de convidados e orçamento.',
  },
  {
    number: '02',
    icon: MessagesSquare,
    title: 'Compare e escolha',
    description: 'Converse com proprietários, faça visitas virtuais e compare orçamentos com facilidade.',
  },
  {
    number: '03',
    icon: ShieldAlert,
    title: 'Reserve com segurança',
    description: 'Pagamento facilitado e contrato digital com total validade jurídica.',
  },
  {
    number: '04',
    icon: Sparkles,
    title: 'Viva o momento',
    description: 'Aproveite seu evento sabendo que todos os detalhes e garantias estão seguros.',
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-20">
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2B2A27] font-normal">
            Como funciona
          </h2>
          <p className="text-[#6E6B64] font-light mt-3 text-sm sm:text-base max-w-xl mx-auto">
            Encontre em poucos passos o local perfeito para o seu evento
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <div 
                key={index} 
                className="bg-white border border-[#EAE3D2] rounded-2xl p-8 relative flex flex-col items-start text-left shadow-sm hover:shadow-lg transition-all duration-300 group"
              >
                <span className="text-xs font-semibold text-[#B8975A]/60 tracking-wider">
                  {step.number}
                </span>

                <div className="my-6 w-12 h-12 rounded-xl bg-[#F4F0E6] flex items-center justify-center text-[#B8975A] group-hover:bg-[#B8975A] group-hover:text-white transition-all duration-300">
                  <Icon className="w-6 h-6 transition-colors duration-300" />
                </div>

                <h3 className="font-semibold text-base text-[#2B2A27] mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-[#6E6B64] font-light leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <button className="px-8 py-3.5 text-sm font-semibold text-white bg-[#B8975A] hover:bg-[#A38349] rounded-md transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg shadow-[#B8975A]/10">
            Começar agora
          </button>
        </div>

      </div>
    </section>
  );
}
