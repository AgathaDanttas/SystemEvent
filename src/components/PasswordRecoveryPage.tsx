import { useState } from 'react';
import { ArrowLeft, CheckCircle, Mail, ShieldCheck } from 'lucide-react';
import logoGold from '../assets/logo_gold.png';

interface PasswordRecoveryPageProps {
  onBack: () => void;
}

export default function PasswordRecoveryPage({ onBack }: PasswordRecoveryPageProps) {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <main className="min-h-screen bg-[#FAF8F5] flex flex-col">
      <header className="h-20 border-b border-[#EAE3D2] bg-[#FAF8F5]">
        <div className="max-w-6xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2 text-xs font-bold text-[#6E6B64] hover:text-[#B8975A] cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
            Voltar para login
          </button>
          <img src={logoGold} alt="Momentos Inesquecíveis" className="w-16 h-16 object-contain" />
        </div>
      </header>
      <section className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white border border-[#EAE3D2] rounded-3xl p-8 shadow-xl text-left">
          <div className="w-14 h-14 rounded-2xl bg-[#F4F0E6] flex items-center justify-center text-[#B8975A] mb-6">
            {sent ? <CheckCircle className="w-7 h-7" /> : <ShieldCheck className="w-7 h-7" />}
          </div>
          <h1 className="font-serif text-2xl text-[#2B2A27] font-semibold">
            {sent ? 'Link enviado com sucesso' : 'Recuperar senha'}
          </h1>
          <p className="text-sm text-[#6E6B64] font-light leading-relaxed mt-3">
            {sent
              ? 'Enviamos instruções para redefinir sua senha. Verifique a caixa de entrada e o spam.'
              : 'Digite o e-mail cadastrado para receber as instruções de redefinição da sua senha.'}
          </p>
          {!sent ? (
            <form
              className="mt-6 space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                if (email.trim()) setSent(true);
              }}
            >
              <label className="block text-[10px] uppercase tracking-wider font-bold text-[#6E6B64]">Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#B8975A] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="seuemail@exemplo.com"
                  className="w-full border border-[#EAE3D2] rounded-xl pl-10 pr-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#B8975A]"
                />
              </div>
              <button className="w-full py-3 bg-[#B8975A] hover:bg-[#A38349] text-white rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer">
                Enviar link de recuperação
              </button>
            </form>
          ) : (
            <button
              onClick={onBack}
              className="mt-6 w-full py-3 bg-[#B8975A] hover:bg-[#A38349] text-white rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              Voltar para login
            </button>
          )}
        </div>
      </section>
    </main>
  );
}
