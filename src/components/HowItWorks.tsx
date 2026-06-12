import lupaImg from '../assets/lupa.png';
import compareImg from '../assets/compare.png';
import securityImg from '../assets/security.png';
import festaImg from '../assets/festa.png';

const STEPS = [
  {
    number: '01',
    title: 'Encontre o local ideal',
    description: 'Busque por tipo de evento, localização, data e número de convidados.',
    image: lupaImg,
  },
  {
    number: '02',
    title: 'Compare e escolha',
    description: 'Compare preços, veja fotos, avaliações e disponibilidade do local.',
    image: compareImg,
  },
  {
    number: '03',
    title: 'Reserve com segurança',
    description: 'Negocie e faça sua reserva de forma segura e prática pela plataforma.',
    image: securityImg,
  },
  {
    number: '04',
    title: 'Viva seu momento',
    description: 'Aproveite seu evento com tranquilidade, cuidamos do resto para você.',
    image: festaImg,
  },
];

interface HowItWorksProps {
  onGetStarted?: () => void;
}

export default function HowItWorks({ onGetStarted }: HowItWorksProps) {
  return (
    <section id="como-funciona" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Title */}
        <div className="text-center mb-10">
          <h2 className="font-serif text-2xl sm:text-3xl text-[#2B2A27] font-semibold tracking-tight">
            Como funciona
          </h2>
          <p className="text-[#6E6B64] font-light mt-2 text-sm max-w-xl mx-auto">
            Em poucos passos, o lugar perfeito para seu evento
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="relative bg-[#FAF8F3] border border-[#EAE3D2] rounded-2xl p-4 sm:p-7 overflow-hidden group hover:shadow-md transition-all duration-300 min-h-[170px] sm:min-h-[220px]"
            >
              {/* Decorative image — top right, large */}
              <img
                src={step.image}
                alt=""
                className="absolute -top-1 -right-1 w-20 h-20 sm:w-28 sm:h-28 object-contain opacity-90 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105 pointer-events-none select-none"
              />

              {/* Step number */}
              <span className="block text-[10px] sm:text-xs font-semibold text-[#B8975A] tracking-widest mb-3 sm:mb-4">
                {step.number}
              </span>

              {/* Title */}
              <h3 className="font-sans font-bold text-xs sm:text-sm text-[#2B2A27] leading-tight sm:leading-snug mb-1.5 sm:mb-2 max-w-[55%]">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-[10px] sm:text-[11px] text-[#6E6B64] font-light leading-relaxed max-w-[60%]">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA button */}
        <div className="text-center mt-10">
          <button
            onClick={onGetStarted}
            className="px-14 py-4 bg-[#B8975A] hover:bg-[#A38349] text-white text-base font-semibold rounded-2xl shadow-md transition-all duration-300 hover:scale-[1.03] hover:shadow-lg cursor-pointer"
          >
            Começar agora
          </button>
        </div>

      </div>
    </section>
  );
}
