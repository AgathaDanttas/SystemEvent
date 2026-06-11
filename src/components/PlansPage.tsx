import { Check, Crown, Sparkles, Star, Store } from 'lucide-react';

interface PlansPageProps {
  onBack: () => void;
  onRegister: () => void;
}

const plans = [
  {
    name: 'Básico',
    price: 'R$ 79',
    description: 'Para proprietários que estão começando a divulgar seu primeiro espaço.',
    icon: Store,
    features: ['1 espaço publicado', 'Até 8 fotos por espaço', 'Solicitações de reserva', 'Calendário de disponibilidade'],
  },
  {
    name: 'Pro',
    price: 'R$ 149',
    description: 'O plano ideal para gerenciar reservas com mais visibilidade e controle.',
    icon: Star,
    featured: true,
    features: ['Até 5 espaços publicados', 'Fotos e vídeos ilimitados', 'Métricas de visualização', 'Destaque nas buscas', 'Campanhas promocionais'],
  },
  {
    name: 'Premium',
    price: 'R$ 249',
    description: 'Para operações maiores com vários espaços, equipe e acompanhamento avançado.',
    icon: Crown,
    features: ['Espaços ilimitados', 'Selo verificado', 'Relatórios avançados', 'Prioridade no suporte', 'Negociação assistida'],
  },
];

export default function PlansPage({ onBack, onRegister }: PlansPageProps) {
  return (
    <main className="flex-grow bg-[#FAF8F5]">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-left">
        <button
          onClick={onBack}
          className="text-xs font-bold uppercase tracking-wider text-[#B8975A] hover:text-[#A38349] mb-8 cursor-pointer"
        >
          Voltar para início
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-10">
          <div className="lg:col-span-7 space-y-4">
            <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] font-bold text-[#B8975A]">
              <Sparkles className="w-4 h-4" />
              Planos para proprietários
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-[#2B2A27] font-normal leading-tight">
              Publique seus espaços e acompanhe cada reserva com elegância.
            </h1>
          </div>
          <p className="lg:col-span-5 text-sm sm:text-base text-[#6E6B64] font-light leading-relaxed">
            Escolha o plano que combina com o tamanho da sua operação. Todos incluem cadastro seguro,
            agenda de disponibilidade e solicitações organizadas em um painel para fornecedores.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <article
                key={plan.name}
                className={`relative bg-white border rounded-3xl p-6 sm:p-7 shadow-sm flex flex-col min-h-[440px] ${
                  plan.featured ? 'border-[#B8975A] shadow-xl shadow-[#B8975A]/10' : 'border-[#EAE3D2]'
                }`}
              >
                {plan.featured && (
                  <span className="absolute right-5 top-5 px-3 py-1 rounded-full bg-[#FAF0D9] text-[#B8975A] text-[10px] font-bold uppercase tracking-wider">
                    Mais escolhido
                  </span>
                )}
                <div className="w-12 h-12 rounded-2xl bg-[#F4F0E6] border border-[#EAE3D2] flex items-center justify-center text-[#B8975A] mb-6">
                  <Icon className="w-6 h-6" />
                </div>
                <h2 className="font-serif text-2xl text-[#2B2A27] font-semibold">{plan.name}</h2>
                <p className="text-sm text-[#6E6B64] font-light leading-relaxed mt-3">{plan.description}</p>
                <div className="mt-6 pb-6 border-b border-[#EAE3D2]">
                  <span className="font-serif text-4xl text-[#B8975A] font-bold">{plan.price}</span>
                  <span className="text-xs text-[#6E6B64] font-semibold"> / mês</span>
                </div>
                <ul className="space-y-3 mt-6 flex-grow">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-xs text-[#2B2A27]">
                      <Check className="w-4 h-4 text-[#B8975A] flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={onRegister}
                  className={`mt-8 w-full py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    plan.featured
                      ? 'bg-[#B8975A] text-white hover:bg-[#A38349] shadow-md'
                      : 'border border-[#B8975A] text-[#B8975A] hover:bg-[#FAF0D9]/40'
                  }`}
                >
                  Começar com {plan.name}
                </button>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
