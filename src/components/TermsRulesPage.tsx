import { AlertTriangle, FileText, ShieldCheck } from 'lucide-react';

interface TermsRulesPageProps {
  onBack: () => void;
}

const sections = [
  {
    title: 'Termos da reserva',
    icon: FileText,
    items: [
      'A solicitação de reserva fica pendente até a aprovação do fornecedor.',
      'O pagamento só deve ser realizado após confirmação formal do espaço.',
      'Alterações de data e horário dependem da disponibilidade informada na agenda.',
    ],
  },
  {
    title: 'Responsabilidade por danos',
    icon: ShieldCheck,
    items: [
      'O cliente é responsável por danos causados ao espaço, móveis, objetos e equipamentos.',
      'Cobranças adicionais podem ser aplicadas conforme vistoria e contrato do fornecedor.',
      'A comunicação sobre avarias deve acontecer dentro da própria plataforma.',
    ],
  },
  {
    title: 'Regras do espaço',
    icon: AlertTriangle,
    items: [
      'Cada espaço pode definir regras próprias de som, decoração, montagem e desmontagem.',
      'A capacidade máxima informada pelo fornecedor deve ser respeitada.',
      'Serviços extras devem ser confirmados antes da etapa final da reserva.',
    ],
  },
];

export default function TermsRulesPage({ onBack }: TermsRulesPageProps) {
  return (
    <main className="flex-grow bg-[#FAF8F5]">
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-left">
        <button
          onClick={onBack}
          className="text-xs font-bold uppercase tracking-wider text-[#B8975A] hover:text-[#A38349] mb-8 cursor-pointer"
        >
          Voltar para início
        </button>
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.24em] text-[#B8975A] font-bold mb-3">Termos e regras</p>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#2B2A27] font-normal">
            Condições claras para reservar com segurança.
          </h1>
          <p className="text-sm text-[#6E6B64] font-light mt-4 max-w-3xl leading-relaxed">
            Esta área reúne as principais regras da plataforma, responsabilidades de uso e pontos
            que precisam ser aceitos antes de enviar uma solicitação de reserva.
          </p>
        </div>
        <div className="space-y-5">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <article key={section.title} className="bg-white border border-[#EAE3D2] rounded-3xl p-6 shadow-sm">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-11 h-11 rounded-2xl bg-[#F4F0E6] flex items-center justify-center text-[#B8975A]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h2 className="font-serif text-2xl text-[#2B2A27]">{section.title}</h2>
                </div>
                <ul className="space-y-3">
                  {section.items.map((item) => (
                    <li key={item} className="text-sm text-[#6E6B64] leading-relaxed border-l-2 border-[#EAE3D2] pl-4">
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
