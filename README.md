# ✨ Momentos Inesquecíveis

> **Plataforma premium de reserva de espaços para eventos** — encontre, compare e reserve com segurança os melhores locais para casamentos, aniversários, corporativos e muito mais.

---

## 📸 Visão Geral

**Momentos Inesquecíveis** é uma plataforma web moderna que conecta clientes que procuram espaços para eventos a fornecedores que gerenciam seus locais. O projeto oferece uma experiência completa, com fluxo de autenticação, pesquisa, agendamento e painel administrativo para fornecedores.

---

## 🚀 Funcionalidades

### 👤 Área do Cliente
- **Pesquisa e filtros** — busca por cidade, tipo de evento, data, capacidade e orçamento
- **Categorias interativas** — filtros circulares por tipo: Casamentos, Aniversários, Formatura, Palestras, Corporativo
- **Cards de locais em destaque** — com avaliação, localização, tags e botão "Ver detalhes"
- **Favoritos** — marcar locais favoritos com ícone de coração
- **Agendamento em etapas** — fluxo completo: Data & Horário → Informações → Revisão → Confirmação
- **Autenticação front-end** — cadastro e login validados localmente com `localStorage`
- **Perfil do cliente** — avatar gerado automaticamente com as iniciais do nome

### 🏪 Painel do Fornecedor
- **Dashboard completo** — estatísticas de reservas, solicitações, visualizações, receita e avaliação
- **Gestão de reservas** — tabela com status (Confirmada / Pendente) e listagem dinâmica
- **Solicitações recentes** — aceitar ou recusar pedidos com atualização automática das métricas
- **Calendário interativo** — bloquear/desbloquear datas, visualizar eventos por dia, navegar por mês
- **Ações rápidas** — modais para:
  - ➕ Cadastrar novo espaço
  - 🗓️ Bloquear datas de disponibilidade
  - 🖼️ Adicionar fotos à galeria
  - 🏷️ Criar cupom de desconto
- **Chat com clientes** — mensagens em tempo real simuladas com histórico e resposta automática
- **Sidebar de navegação** — acesso rápido a Reservas, Solicitações, Mensagens, Financeiro, Relatórios e Configurações

### 🔐 Autenticação
- Seleção de perfil: **Cliente** ou **Fornecedor**
- Validação de formulário com máscara de CPF e telefone
- Login verifica e-mail e senha contra contas registradas no `localStorage`
- Redirecionamento automático ao painel de acordo com o perfil

---

## 🛠️ Stack Tecnológica

| Tecnologia | Uso |
|---|---|
| **React 19** | Framework principal |
| **TypeScript** | Tipagem estática |
| **Vite 8** | Bundler e dev server |
| **Tailwind CSS v4** | Estilização utility-first |
| **Lucide React** | Biblioteca de ícones |
| **localStorage** | Persistência de autenticação |

---

## 📁 Estrutura do Projeto

```
src/
├── assets/                  # Imagens e logos
│   ├── logo_gold.png
│   ├── hero_new.png
│   └── venue_*.png
├── components/
│   ├── AuthScreen.tsx        # Login e Cadastro com seleção de perfil
│   ├── BookingDetails.tsx    # Fluxo de agendamento em 4 etapas
│   ├── FeaturedVenues.tsx    # Grid de locais em destaque
│   ├── FeaturesList.tsx      # Seção "Tudo que você precisa"
│   ├── Footer.tsx            # Rodapé completo
│   ├── Hero.tsx              # Hero com busca e categorias
│   ├── HowItWorks.tsx        # Seção "Como funciona"
│   ├── Navbar.tsx            # Navegação desktop e mobile
│   ├── RegisterBanner.tsx    # Banner CTA de cadastro
│   └── VendorDashboard.tsx   # Painel completo do fornecedor
├── App.tsx                   # Roteamento principal e estado global
├── index.css                 # Design tokens e estilos globais
└── main.tsx                  # Ponto de entrada
```

---

## 🎨 Design System

| Token | Valor | Uso |
|---|---|---|
| `gold-600` | `#B8975A` | Cor primária — botões, ícones, destaques |
| `gold-700` | `#A38349` | Hover dos elementos gold |
| `gold-50` | `#FAF8F5` | Background geral |
| `gold-100` | `#F4F0E6` | Cards e containers |
| `brand-dark` | `#2B2A27` | Texto principal |
| `brand-muted` | `#6E6B64` | Texto secundário |
| **Fonte Serif** | Playfair Display | Títulos e destaques |
| **Fonte Sans** | Plus Jakarta Sans | Corpo de texto |
| **Fonte Script** | Imperial Script | Elementos decorativos |

---

## ⚙️ Como rodar localmente

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/systemevent.git

# Acesse a pasta do projeto
cd systemevent

# Instale as dependências
npm install
# ou
yarn install

# Inicie o servidor de desenvolvimento
npm run dev
# ou
yarn dev
```

Acesse em: **http://localhost:5173**

---

## 🔑 Conta de teste

Para testar sem cadastrar, use as credenciais padrão:

| Campo | Valor |
|---|---|
| **E-mail** | `ana.silva@email.com` |
| **Senha** | `password123` |
| **Perfil** | Cliente |

> Para acessar o painel de **Fornecedor**, cadastre uma nova conta e selecione o perfil "Fornecedor" no momento do cadastro.

---

## 📱 Responsividade

O projeto é **totalmente responsivo**, com layouts distintos para:
- 📱 **Mobile** — barra de navegação inferior, busca simplificada, categorias em scroll horizontal
- 💻 **Desktop** — navbar completa, grid de 4 colunas, painel lateral de fornecedor

---

## 📌 Scripts disponíveis

```bash
yarn dev        # Servidor de desenvolvimento com HMR
yarn build      # Build de produção (TypeScript + Vite)
yarn preview    # Preview do build de produção
yarn lint       # Verificação de lint com ESLint
```

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Consulte o arquivo [LICENSE](./LICENSE) para mais detalhes.

---

<div align="center">
  <p>Feito com ✨ por <strong>Momentos Inesquecíveis</strong></p>
</div>
