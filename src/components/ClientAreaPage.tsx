import { Calendar, CheckCircle, Clock, Heart, MapPin, QrCode, Star, Ticket } from 'lucide-react';

interface ClientAreaPageProps {
  section: 'dashboard' | 'agenda' | 'favorites';
  userName: string;
  userEmail: string;
  onSectionChange: (section: 'dashboard' | 'agenda' | 'favorites') => void;
  onBack: () => void;
}

const bookings = [
  { title: 'Villa Natureza', date: '24/06/2026', place: 'São Paulo, SP', status: 'Reservado', price: 'R$ 8.500' },
  { title: 'Mansão Glass', date: '02/07/2026', place: 'São Paulo, SP', status: 'Pendente', price: 'R$ 12.000' },
  { title: 'Solar das Flores', date: '18/07/2026', place: 'Campinas, SP', status: 'Em negociação', price: 'R$ 15.000' },
];

const favorites = [
  { title: 'Espaço Jardim', place: 'Mairiporã, SP', rating: '4.8', price: 'R$ 7.500' },
  { title: 'Villa Natureza', place: 'São Paulo, SP', rating: '4.9', price: 'R$ 8.500' },
  { title: 'Solar das Flores', place: 'Campinas, SP', rating: '4.9', price: 'R$ 15.000' },
];

export default function ClientAreaPage({ section, userName, userEmail, onSectionChange, onBack }: ClientAreaPageProps) {
  const tabs = [
    { id: 'dashboard' as const, label: 'Área do Cliente', icon: Ticket },
    { id: 'agenda' as const, label: 'Agenda', icon: Calendar },
    { id: 'favorites' as const, label: 'Favoritos', icon: Heart },
  ];

  return (
    <main className="flex-grow bg-[#FAF8F5]">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-left">
        <button
          onClick={onBack}
          className="text-xs font-bold uppercase tracking-wider text-[#B8975A] hover:text-[#A38349] mb-6 cursor-pointer"
        >
          Voltar para início
        </button>

        <div className="bg-white border border-[#EAE3D2] rounded-3xl p-6 sm:p-8 shadow-sm mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <p className="text-xs font-semibold text-[#B8975A] uppercase tracking-[0.2em] mb-3">Minha conta</p>
              <h1 className="font-serif text-3xl text-[#2B2A27] font-normal">
                Olá, {userName || 'cliente'}
              </h1>
              <p className="text-sm text-[#6E6B64] mt-2">{userEmail || 'cliente@momentos.com.br'}</p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const active = section === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => onSectionChange(tab.id)}
                    className={`px-4 py-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                      active ? 'bg-[#B8975A] text-white border-[#B8975A]' : 'bg-[#FAF8F5] text-[#6E6B64] border-[#EAE3D2] hover:text-[#B8975A]'
                    }`}
                  >
                    <Icon className="w-4 h-4 mx-auto mb-1" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {section === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 bg-white border border-[#EAE3D2] rounded-3xl p-6 shadow-sm">
              <h2 className="font-serif text-2xl text-[#2B2A27] mb-5">Minhas reservas</h2>
              <div className="space-y-4">
                {bookings.map((item) => (
                  <ReservationCard key={item.title} item={item} />
                ))}
              </div>
            </div>
            <aside className="lg:col-span-4 space-y-6">
              <SummaryCard label="Reservas ativas" value="2" icon={CheckCircle} />
              <SummaryCard label="Pagamento pendente" value="1" icon={Clock} />
              <SummaryCard label="Espaços favoritos" value="3" icon={Heart} />
            </aside>
          </div>
        )}

        {section === 'agenda' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 bg-white border border-[#EAE3D2] rounded-3xl p-6 shadow-sm">
              <h2 className="font-serif text-2xl text-[#2B2A27] mb-5">Agenda do cliente</h2>
              <div className="grid grid-cols-7 gap-2 text-center text-xs">
                {Array.from({ length: 30 }).map((_, index) => {
                  const day = index + 1;
                  const marked = day === 24 || day === 2 || day === 18;
                  return (
                    <div
                      key={day}
                      className={`aspect-square rounded-2xl border flex items-center justify-center font-semibold ${
                        marked ? 'bg-[#FAF0D9] border-[#B8975A] text-[#B8975A]' : 'bg-[#FAF8F5] border-[#EAE3D2] text-[#6E6B64]'
                      }`}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="lg:col-span-5 bg-white border border-[#EAE3D2] rounded-3xl p-6 shadow-sm">
              <h3 className="font-serif text-xl text-[#2B2A27] mb-5">Próximos compromissos</h3>
              <div className="space-y-4">
                {bookings.map((item) => (
                  <ReservationCard key={item.title} item={item} compact />
                ))}
              </div>
            </div>
          </div>
        )}

        {section === 'favorites' && (
          <div className="bg-white border border-[#EAE3D2] rounded-3xl p-6 shadow-sm">
            <h2 className="font-serif text-2xl text-[#2B2A27] mb-5">Favoritos</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {favorites.map((item) => (
                <article key={item.title} className="border border-[#EAE3D2] rounded-3xl p-5 bg-[#FAF8F5] space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-serif text-xl text-[#2B2A27]">{item.title}</h3>
                    <Heart className="w-5 h-5 fill-[#B8975A] text-[#B8975A]" />
                  </div>
                  <p className="text-xs text-[#6E6B64] flex items-center gap-1"><MapPin className="w-4 h-4 text-[#B8975A]" /> {item.place}</p>
                  <p className="text-xs text-[#6E6B64] flex items-center gap-1"><Star className="w-4 h-4 fill-[#B8975A] text-[#B8975A]" /> {item.rating} avaliações</p>
                  <div className="pt-4 border-t border-[#EAE3D2] flex justify-between items-center">
                    <span className="text-xs text-[#6E6B64]">A partir de</span>
                    <strong className="text-[#B8975A]">{item.price}</strong>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

function ReservationCard({ item, compact = false }: { item: (typeof bookings)[number]; compact?: boolean }) {
  return (
    <article className="border border-[#EAE3D2] rounded-2xl p-4 bg-[#FAF8F5] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h3 className="font-serif text-lg text-[#2B2A27]">{item.title}</h3>
        <p className="text-xs text-[#6E6B64] mt-1">{item.date} · {item.place}</p>
      </div>
      <div className="flex items-center gap-3">
        <span className="px-3 py-1 rounded-full bg-white border border-[#EAE3D2] text-[10px] font-bold text-[#B8975A]">
          {item.status}
        </span>
        {!compact && <QrCode className="w-5 h-5 text-[#6E6B64]" />}
        <strong className="text-sm text-[#2B2A27]">{item.price}</strong>
      </div>
    </article>
  );
}

function SummaryCard({ label, value, icon: Icon }: { label: string; value: string; icon: typeof CheckCircle }) {
  return (
    <div className="bg-white border border-[#EAE3D2] rounded-3xl p-6 shadow-sm">
      <div className="w-10 h-10 rounded-2xl bg-[#F4F0E6] flex items-center justify-center text-[#B8975A] mb-4">
        <Icon className="w-5 h-5" />
      </div>
      <p className="text-[10px] uppercase tracking-wider font-bold text-[#6E6B64]">{label}</p>
      <p className="font-serif text-3xl text-[#2B2A27] mt-2">{value}</p>
    </div>
  );
}
