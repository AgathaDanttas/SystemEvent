import { Calendar, Check, CircleDollarSign, FileText, Image, MessageSquare, Settings, Star, Store, Tag } from 'lucide-react';

interface OwnerDashboardSectionProps {
  activeSidebar: string;
}

const ownerSpaces = [
  { name: 'Villa Natureza', location: 'São Paulo, SP', price: 'R$ 8.500', status: 'Publicado' },
  { name: 'Espaço Serra', location: 'Mairiporã, SP', price: 'R$ 7.500', status: 'Em revisão' },
];

const contentMap: Record<string, { title: string; description: string; icon: typeof Store; items: string[] }> = {
  'Meus espaços': {
    title: 'Meus espaços',
    description: 'Cadastre, edite e acompanhe os espaços disponíveis para reserva.',
    icon: Store,
    items: ['Editar descrição, endereço e capacidade', 'Adicionar fotos e vídeos', 'Publicar ou pausar espaços'],
  },
  Reservas: {
    title: 'Reservas recebidas',
    description: 'Acompanhe reservas confirmadas, pendentes e canceladas.',
    icon: Calendar,
    items: ['Casamento de Juliana e Pedro confirmado', 'Workshop de Marketing em análise', 'Evento corporativo com pagamento pendente'],
  },
  Solicitações: {
    title: 'Solicitações',
    description: 'Aprove, cancele ou negocie pedidos enviados pelos clientes.',
    icon: FileText,
    items: ['Aprovar pedido com um clique', 'Enviar contraproposta de data ou valor', 'Recusar com mensagem ao cliente'],
  },
  Mensagens: {
    title: 'Mensagens',
    description: 'Centralize conversas com clientes interessados nos espaços.',
    icon: MessageSquare,
    items: ['Juliana Santos perguntou sobre disponibilidade', 'Summit Group solicitou orçamento', 'Helena pediu visita virtual'],
  },
  Avaliações: {
    title: 'Avaliações',
    description: 'Veja notas, comentários e oportunidades de melhoria.',
    icon: Star,
    items: ['Média geral 4,9', '128 avaliações verificadas', 'Responder avaliações recentes'],
  },
  Financeiro: {
    title: 'Financeiro',
    description: 'Controle receita, taxas da plataforma e pagamentos previstos.',
    icon: CircleDollarSign,
    items: ['Receita do mês: R$ 48.750', 'Taxas estimadas: R$ 4.875', 'Próximo repasse em 28/06/2026'],
  },
  Calendário: {
    title: 'Disponibilidade',
    description: 'Defina bloqueios, períodos reservados e janelas livres.',
    icon: Calendar,
    items: ['Bloquear datas para manutenção', 'Marcar reserva offline', 'Liberar dias pendentes'],
  },
  Promoções: {
    title: 'Promoções',
    description: 'Crie cupons e condições especiais para períodos estratégicos.',
    icon: Tag,
    items: ['Cupom NOIVA10 ativo', 'Campanha para eventos corporativos', 'Desconto para dias de semana'],
  },
  Relatórios: {
    title: 'Métricas e relatórios',
    description: 'Acompanhe visualizações, conversão e desempenho por espaço.',
    icon: FileText,
    items: ['1.248 visualizações no mês', '32 reservas confirmadas', 'Taxa de conversão em alta'],
  },
  Configurações: {
    title: 'Configurações',
    description: 'Ajuste perfil, notificações, planos e permissões da conta.',
    icon: Settings,
    items: ['Dados do proprietário', 'Preferências de notificação', 'Gerenciar plano profissional'],
  },
};

export default function OwnerDashboardSection({ activeSidebar }: OwnerDashboardSectionProps) {
  if (activeSidebar === 'Visão geral') return null;

  const content = contentMap[activeSidebar] || contentMap['Meus espaços'];
  const Icon = content.icon;

  return (
    <section className="bg-white border border-[#EAE3D2] rounded-3xl p-6 shadow-sm text-left space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#F4F0E6] flex items-center justify-center text-[#B8975A] border border-[#EAE3D2]">
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] font-bold text-[#B8975A]">Área do proprietário</p>
            <h2 className="font-serif text-2xl text-[#2B2A27] mt-1">{content.title}</h2>
            <p className="text-sm text-[#6E6B64] font-light mt-2 max-w-2xl">{content.description}</p>
          </div>
        </div>
        <button className="px-5 py-2.5 rounded-full bg-[#B8975A] hover:bg-[#A38349] text-white text-xs font-bold uppercase tracking-wider cursor-pointer">
          Nova ação
        </button>
      </div>

      {activeSidebar === 'Meus espaços' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ownerSpaces.map((space) => (
            <article key={space.name} className="bg-[#FAF8F5] border border-[#EAE3D2] rounded-2xl p-5 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-serif text-xl text-[#2B2A27]">{space.name}</h3>
                  <p className="text-xs text-[#6E6B64] mt-1">{space.location}</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-white border border-[#EAE3D2] text-[10px] font-bold text-[#B8975A]">
                  {space.status}
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-[#EAE3D2] pt-4">
                <strong className="text-[#B8975A]">{space.price}</strong>
                <div className="flex gap-2 text-[#6E6B64]">
                  <Image className="w-4 h-4" />
                  <Check className="w-4 h-4" />
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {content.items.map((item) => (
            <div key={item} className="bg-[#FAF8F5] border border-[#EAE3D2] rounded-2xl p-5 min-h-[112px]">
              <Check className="w-5 h-5 text-[#B8975A] mb-3" />
              <p className="text-sm text-[#2B2A27] leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
