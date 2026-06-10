import { useState, type FormEvent } from 'react';
import { ShieldCheck, User, Store, ArrowLeft, Eye, EyeOff, CheckCircle } from 'lucide-react';
import logoGold from '../assets/logo_gold.png';
import authBanner from '../assets/auth_banner.jpg';

interface AuthScreenProps {
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

export default function AuthScreen({ onClose, initialMode = 'register' }: AuthScreenProps) {
  const [role, setRole] = useState<'cliente' | 'fornecedor'>('fornecedor');
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [receiveNews, setReceiveNews] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Errors state
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Formats phone input (xx) xxxxx-xxxx
  const handlePhoneChange = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    let formatted = cleaned;
    if (cleaned.length > 0) {
      formatted = `(${cleaned.substring(0, 2)}`;
      if (cleaned.length > 2) {
        formatted += `) ${cleaned.substring(2, 7)}`;
      }
      if (cleaned.length > 7) {
        formatted += `-${cleaned.substring(7, 11)}`;
      }
    }
    setPhone(formatted);
  };

  // Formats CPF input xxx.xxx.xxx-xx
  const handleCpfChange = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    let formatted = cleaned;
    if (cleaned.length > 0) {
      formatted = cleaned.substring(0, 3);
      if (cleaned.length > 3) {
        formatted += `.${cleaned.substring(3, 6)}`;
      }
      if (cleaned.length > 6) {
        formatted += `.${cleaned.substring(6, 9)}`;
      }
      if (cleaned.length > 9) {
        formatted += `-${cleaned.substring(9, 11)}`;
      }
    }
    setCpf(formatted);
  };

  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = 'Nome completo é obrigatório';
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) newErrors.email = 'E-mail válido é obrigatório';
    if (phone.length < 14) newErrors.phone = 'Telefone inválido';
    if (cpf.length < 14) newErrors.cpf = 'CPF inválido';
    if (password.length < 6) newErrors.password = 'A senha precisa ter pelo menos 6 caracteres';
    if (!agreeTerms) newErrors.agreeTerms = 'Você precisa aceitar os Termos e Políticas';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSuccessMessage(`Cadastro de ${role === 'cliente' ? 'Cliente' : 'Fornecedor'} realizado com sucesso!`);
    setTimeout(() => {
      setSuccessMessage(null);
      onClose();
    }, 2500);
  };

  const handleLoginSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) newErrors.email = 'E-mail válido é obrigatório';
    if (password.length < 6) newErrors.password = 'Senha inválida';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSuccessMessage('Login efetuado com sucesso!');
    setTimeout(() => {
      setSuccessMessage(null);
      onClose();
    }, 2000);
  };

  return (
    <div className="h-screen bg-[#FAF8F5] flex flex-col font-sans relative antialiased overflow-hidden">
      {/* Top Navbar */}
      <header className="w-full h-20 bg-[#FAF8F5] border-b border-[#EAE3D2] px-6 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center cursor-pointer relative h-full" onClick={onClose}>
          <img src={logoGold} alt="Momentos Inesquecíveis Logo" className="w-24 h-24 object-contain absolute left-0 top-1/2 -translate-y-1/2 max-w-none" />
          <div className="flex flex-col text-left pl-[108px]">
            <span className="font-serif text-base tracking-wider text-[#2B2A27] font-semibold leading-tight uppercase">
              Momentos Inesquecíveis
            </span>
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#B8975A] font-medium leading-none">
              Plataforma
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-xs text-[#6E6B64] hidden sm:inline">Já tem uma conta?</span>
          <button
            onClick={() => setIsLogin(true)}
            className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-[#B8975A] hover:text-[#A38349] border border-[#B8975A] rounded-md transition-all bg-white hover:bg-[#FAF8F5]"
          >
            Entrar
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-3 flex flex-col justify-center overflow-hidden">
        <button
          onClick={onClose}
          className="self-start mb-3 flex items-center space-x-2 text-xs font-semibold text-[#6E6B64] hover:text-[#B8975A] transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Voltar para Início</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch h-[calc(100vh-120px)] min-h-0 overflow-hidden">
          {/* Left Column: Image Banner */}
          <div className="lg:col-span-5 h-full flex flex-col justify-center min-h-0">
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl border-4 border-white transition-transform duration-500 hover:scale-[1.01] flex flex-col justify-end min-h-0">
              <img
                src={authBanner}
                alt="Beautiful event space with string lights and white table setup"
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>

              {/* Security info card overlay */}
              <div className="relative z-10 m-5 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-[#EAE3D2] shadow-lg flex items-start gap-3 text-left">
                <div className="w-8 h-8 rounded-full bg-[#F4F0E6] flex items-center justify-center text-[#B8975A] flex-shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-xs text-[#2B2A27] tracking-wide mb-0.5">
                    Sua segurança é nossa prioridade
                  </h4>
                  <p className="text-[9px] text-[#6E6B64] font-light leading-relaxed">
                    Todos os seus dados são criptografados e protegidos com tecnologia de ponta.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Form */}
          <div className="lg:col-span-7 h-full flex flex-col justify-center overflow-y-auto pr-1 min-h-0">
            <div className="space-y-4 max-w-xl w-full mx-auto py-1">
              {!isLogin ? (
                <>
                  {/* Option Choice Card */}
                  <div className="bg-[#FAF8F5] border border-[#EAE3D2] rounded-2xl p-4 sm:p-5 shadow-sm space-y-4 text-left">
                    <div>
                      <h2 className="font-serif text-lg text-[#2B2A27] font-semibold">
                        Continue sua reserva
                      </h2>
                      <p className="text-[#6E6B64] font-light text-[10px] mt-0.5">
                        Entre ou crie sua conta para continuar
                      </p>
                    </div>

                    <div className="space-y-2.5">
                      <p className="text-[9px] uppercase tracking-wider font-semibold text-[#B8975A]">
                        Como deseja usar a plataforma?
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {/* Option Client */}
                        <div
                          onClick={() => setRole('cliente')}
                          className={`border rounded-xl p-3 flex items-start gap-2.5 cursor-pointer transition-all duration-300 ${
                            role === 'cliente'
                              ? 'border-[#B8975A] bg-[#B8975A]/5 shadow-sm'
                              : 'border-[#EAE3D2] bg-white hover:border-[#B8975A]/60'
                          }`}
                        >
                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                              role === 'cliente' ? 'bg-[#B8975A] text-white' : 'bg-[#F4F0E6] text-[#B8975A]'
                            }`}
                          >
                            <User className="w-3.5 h-3.5" />
                          </div>
                          <div className="text-left">
                            <p className="text-xs font-semibold text-[#2B2A27]">Cliente</p>
                            <p className="text-[9px] text-[#6E6B64] font-light mt-0.5 leading-tight">
                              Quero reservar espaços para o meu evento.
                            </p>
                          </div>
                        </div>

                        {/* Option Provider */}
                        <div
                          onClick={() => setRole('fornecedor')}
                          className={`border rounded-xl p-3 flex items-start gap-2.5 cursor-pointer transition-all duration-300 ${
                            role === 'fornecedor'
                              ? 'border-[#B8975A] bg-[#B8975A]/5 shadow-sm'
                              : 'border-[#EAE3D2] bg-white hover:border-[#B8975A]/60'
                          }`}
                        >
                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                              role === 'fornecedor' ? 'bg-[#B8975A] text-white' : 'bg-[#F4F0E6] text-[#B8975A]'
                            }`}
                          >
                            <Store className="w-3.5 h-3.5" />
                          </div>
                          <div className="text-left">
                            <p className="text-xs font-semibold text-[#2B2A27]">Fornecedor</p>
                            <p className="text-[9px] text-[#6E6B64] font-light mt-0.5 leading-tight">
                              Quero cadastrar e gerenciar meus espaços.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#EAE3D2]/60 flex flex-col sm:flex-row items-center justify-between gap-3">
                      <span className="text-xs text-[#6E6B64]">ou faça login se possuir conta</span>
                      <button
                        onClick={() => setIsLogin(true)}
                        className="w-full sm:w-auto px-5 py-2 bg-[#B8975A] hover:bg-[#A38349] text-white rounded-md text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
                      >
                        Entrar
                      </button>
                    </div>
                  </div>

                  {/* Register Form */}
                  <div className="space-y-4 text-left">
                    <div>
                      <h3 className="font-serif text-xl text-[#B8975A] font-normal tracking-wide">
                        Cadastro {role === 'cliente' ? 'Cliente' : 'Fornecedor'}
                      </h3>
                      <div className="h-[2px] w-10 bg-[#B8975A] mt-1.5"></div>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-2.5">
                      <div className="space-y-0.5">
                        <label className="text-[9px] uppercase tracking-wider font-semibold text-[#6E6B64]">
                          Nome completo
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Digite seu nome completo"
                          className="w-full bg-white border border-[#EAE3D2] rounded-lg px-3 py-2 text-xs text-[#2B2A27] focus:ring-1 focus:ring-[#B8975A] focus:border-[#B8975A] focus:outline-none transition-all placeholder:text-gray-300"
                        />
                        {errors.name && <p className="text-[9px] text-red-500">{errors.name}</p>}
                      </div>

                      <div className="space-y-0.5">
                        <label className="text-[9px] uppercase tracking-wider font-semibold text-[#6E6B64]">
                          Email
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Digite seu melhor e-mail"
                          className="w-full bg-white border border-[#EAE3D2] rounded-lg px-3 py-2 text-xs text-[#2B2A27] focus:ring-1 focus:ring-[#B8975A] focus:border-[#B8975A] focus:outline-none transition-all placeholder:text-gray-300"
                        />
                        {errors.email && <p className="text-[9px] text-red-500">{errors.email}</p>}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-0.5">
                          <label className="text-[9px] uppercase tracking-wider font-semibold text-[#6E6B64]">
                            Telefone
                          </label>
                          <input
                            type="text"
                            value={phone}
                            onChange={(e) => handlePhoneChange(e.target.value)}
                            placeholder="(00) 00000-0000"
                            maxLength={15}
                            className="w-full bg-white border border-[#EAE3D2] rounded-lg px-3 py-2 text-xs text-[#2B2A27] focus:ring-1 focus:ring-[#B8975A] focus:border-[#B8975A] focus:outline-none transition-all placeholder:text-gray-300"
                          />
                          {errors.phone && <p className="text-[9px] text-red-500">{errors.phone}</p>}
                        </div>

                        <div className="space-y-0.5">
                          <label className="text-[9px] uppercase tracking-wider font-semibold text-[#6E6B64]">
                            CPF
                          </label>
                          <input
                            type="text"
                            value={cpf}
                            onChange={(e) => handleCpfChange(e.target.value)}
                            placeholder="000.000.000-00"
                            maxLength={14}
                            className="w-full bg-white border border-[#EAE3D2] rounded-lg px-3 py-2 text-xs text-[#2B2A27] focus:ring-1 focus:ring-[#B8975A] focus:border-[#B8975A] focus:outline-none transition-all placeholder:text-gray-300"
                          />
                          {errors.cpf && <p className="text-[9px] text-red-500">{errors.cpf}</p>}
                        </div>
                      </div>

                      <div className="space-y-0.5">
                        <label className="text-[9px] uppercase tracking-wider font-semibold text-[#6E6B64]">
                          Senha
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Crie uma senha forte"
                            className="w-full bg-white border border-[#EAE3D2] rounded-lg pl-3 pr-8 py-2 text-xs text-[#2B2A27] focus:ring-1 focus:ring-[#B8975A] focus:border-[#B8975A] focus:outline-none transition-all placeholder:text-gray-300"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#B8975A]"
                          >
                            {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                        {errors.password && <p className="text-[9px] text-red-500">{errors.password}</p>}
                      </div>

                      {/* Checkboxes */}
                      <div className="pt-1 space-y-2">
                        <label className="flex items-center space-x-2.5 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={receiveNews}
                            onChange={(e) => setReceiveNews(e.target.checked)}
                            className="w-3.5 h-3.5 text-[#B8975A] border-[#EAE3D2] rounded focus:ring-[#B8975A] cursor-pointer"
                          />
                          <span className="text-[10px] text-[#6E6B64] font-light">
                            Quero receber novidades e ofertas exclusivas
                          </span>
                        </label>

                        <label className="flex items-start space-x-2.5 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={agreeTerms}
                            onChange={(e) => setAgreeTerms(e.target.checked)}
                            className="w-3.5 h-3.5 mt-0.5 text-[#B8975A] border-[#EAE3D2] rounded focus:ring-[#B8975A] cursor-pointer"
                          />
                          <span className="text-[10px] text-[#6E6B64] font-light leading-tight">
                            Li e concordo com os{' '}
                            <a href="#" className="text-[#B8975A] hover:underline font-medium">
                              Termos de Uso
                            </a>{' '}
                            e{' '}
                            <a href="#" className="text-[#B8975A] hover:underline font-medium">
                              Política de Privacidade
                            </a>
                            .
                          </span>
                        </label>
                        {errors.agreeTerms && (
                          <p className="text-[9px] text-red-500 mt-0.5">{errors.agreeTerms}</p>
                        )}
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-[#B8975A] hover:bg-[#A38349] text-white py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg mt-2"
                      >
                        Criar conta
                      </button>
                    </form>

                    <div className="text-center pt-1">
                      <p className="text-xs text-[#6E6B64]">
                        Já tem uma conta?{' '}
                        <button
                          onClick={() => setIsLogin(true)}
                          className="text-[#B8975A] font-semibold hover:underline"
                        >
                          Entrar
                        </button>
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                /* Login Form Mode */
                <div className="bg-white border border-[#EAE3D2] rounded-2xl p-6 sm:p-8 shadow-sm space-y-5 text-left max-w-md mx-auto">
                  <div className="text-center">
                    <h2 className="font-serif text-xl text-[#2B2A27] font-semibold">
                      Acesse sua Conta
                    </h2>
                    <p className="text-[#6E6B64] font-light text-[10px] mt-0.5">
                      Entre para continuar navegando e reservando
                    </p>
                  </div>

                  <form onSubmit={handleLoginSubmit} className="space-y-3">
                    <div className="space-y-0.5">
                      <label className="text-[9px] uppercase tracking-wider font-semibold text-[#6E6B64]">
                        Email
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Digite seu e-mail"
                        className="w-full bg-white border border-[#EAE3D2] rounded-lg px-3 py-2 text-xs text-[#2B2A27] focus:ring-1 focus:ring-[#B8975A] focus:border-[#B8975A] focus:outline-none transition-all placeholder:text-gray-300"
                      />
                      {errors.email && <p className="text-[9px] text-red-500">{errors.email}</p>}
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex justify-between items-center">
                        <label className="text-[9px] uppercase tracking-wider font-semibold text-[#6E6B64]">
                          Senha
                        </label>
                        <a href="#" className="text-[9px] text-[#B8975A] hover:underline font-medium">
                          Esqueceu a senha?
                        </a>
                      </div>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Digite sua senha"
                          className="w-full bg-white border border-[#EAE3D2] rounded-lg pl-3 pr-8 py-2 text-xs text-[#2B2A27] focus:ring-1 focus:ring-[#B8975A] focus:border-[#B8975A] focus:outline-none transition-all placeholder:text-gray-300"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#B8975A]"
                        >
                          {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                      {errors.password && <p className="text-[9px] text-red-500">{errors.password}</p>}
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#B8975A] hover:bg-[#A38349] text-white py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg mt-3"
                    >
                      Entrar
                    </button>
                  </form>

                  <div className="text-center pt-1">
                    <p className="text-xs text-[#6E6B64]">
                      Não tem uma conta?{' '}
                      <button
                        onClick={() => setIsLogin(false)}
                        className="text-[#B8975A] font-semibold hover:underline"
                      >
                        Cadastre-se
                      </button>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Success Modal Overlay */}
      {successMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 shadow-2xl text-center space-y-4 border border-[#EAE3D2] animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-center">
              <CheckCircle className="w-16 h-16 text-[#B8975A] animate-bounce" />
            </div>
            <h3 className="font-serif text-lg text-[#2B2A27] font-semibold">
              {successMessage}
            </h3>
            <p className="text-xs text-[#6E6B64] font-light">
              Você está sendo redirecionado...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
