# Aurelius Imobiliaria

Site institucional e portfólio de imóveis de alto padrão em **Porto Alegre, RS**. Projeto estático com SSR, focado em experiência premium, busca avançada e apresentação curatorial de residências exclusivas.

---

## Sumário

- [Visão geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Stack tecnológica](#stack-tecnológica)
- [Pré-requisitos](#pré-requisitos)
- [Instalação e execução](#instalação-e-execução)
- [Scripts disponíveis](#scripts-disponíveis)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Rotas públicas](#rotas-públicas)
- [Dados estáticos](#dados-estáticos)
- [Deploy na Vercel](#deploy-na-vercel)
- [Qualidade de código](#qualidade-de-código)
- [Créditos](#créditos)

---

## Visão geral

A **Aurelius Imobiliaria** é uma corretora privada especializada em residências de prestígio nos bairros nobres de Porto Alegre — Moinhos de Vento, Três Figueiras, Bela Vista e região.

Este repositório contém o site público da marca: catálogo de imóveis, perfis de assessores, páginas institucionais e ferramentas de descoberta (busca, filtros, mapa e paleta de comandos). Não há backend nem painel administrativo — todo o conteúdo é servido a partir de dados estáticos em `src/data/mock.ts`.

---

## Funcionalidades

### Portfólio e descoberta

- **Home** com hero, busca rápida por localização e destaques do portfólio
- **Busca avançada** com filtros (preço, quartos, área, bairro, status)
- **Mapa interativo** (Leaflet) com marcadores e preview ao passar o mouse
- **Detalhe do imóvel** com galeria, características, assessor responsável e ações (compartilhar, agendar visita)
- **Paleta de comandos** (`Cmd/Ctrl + K`) para navegação rápida entre imóveis, assessores e páginas

### Institucional

- **Sobre** — doutrina e valores da corretora
- **Contato** — formulário e endereços dos escritórios (Moinhos de Vento e Auxiliadora)
- **Assessores** — perfis de Lucas Mendes e Rafael Souza com listagens vinculadas

### UX e interface

- Design escuro com acentos dourados (paleta zinc + gold)
- Navegação responsiva com menu mobile animado (Framer Motion)
- Favoritos persistidos no `localStorage` do navegador
- Meta tags e Open Graph por página
- Sitemap XML gerado em `/sitemap.xml`

---

## Stack tecnológica

| Camada | Tecnologia |
|--------|------------|
| Framework | [TanStack Start](https://tanstack.com/start) + [TanStack Router](https://tanstack.com/router) |
| UI | React 19, TypeScript, Tailwind CSS 4 |
| Componentes | Radix UI, shadcn/ui, Lucide Icons |
| Animações | Framer Motion |
| Mapas | Leaflet + React Leaflet |
| Build / Deploy | Vite 7, [Nitro](https://nitro.build) (preset `vercel`) |
| Formulários | React Hook Form + Zod |

---

## Pré-requisitos

- **Node.js** ≥ 20
- **npm** (recomendado para instalação e deploy na Vercel)

---

## Instalação e execução

```bash
# Clonar o repositório
git clone https://github.com/rodrigordgfs/Aurelius-Imobiliaria.git
cd Aurelius-Imobiliaria

# Instalar dependências
npm install

# Servidor de desenvolvimento (http://localhost:8080)
npm run dev
```

---

## Scripts disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento com hot reload |
| `npm run build` | Build de produção (client + SSR + saída Vercel via Nitro) |
| `npm run build:dev` | Build em modo development |
| `npm run preview` | Pré-visualiza o build localmente |
| `npm run lint` | Executa o ESLint |
| `npm run format` | Formata o código com Prettier |

O build de produção gera:

- `dist/client/` — assets estáticos
- `dist/server/` — bundle SSR
- `.vercel/output/` — Build Output API para deploy na Vercel

---

## Estrutura do projeto

```
.
├── public/                  # Favicon, robots.txt, ícones
├── src/
│   ├── assets/              # Imagens WebP dos imóveis, bairros e hero
│   ├── components/
│   │   ├── modals/          # Galeria, compartilhar, filtros, paleta de comandos
│   │   ├── site/            # Nav, footer, cards, mapa de busca
│   │   └── ui/              # Componentes base (shadcn/ui)
│   ├── context/             # Contexto da paleta de comandos
│   ├── data/
│   │   └── mock.ts          # Imóveis, assessores e bairros (fonte de dados)
│   ├── hooks/               # Favoritos, detecção mobile
│   ├── lib/                 # Tipos, filtros, mapa, utilitários
│   ├── routes/              # Páginas file-based (TanStack Router)
│   ├── server.ts            # Entry point do servidor
│   ├── start.ts             # Configuração TanStack Start
│   └── styles.css           # Tokens de design e Tailwind
├── vercel.json              # Configuração de deploy
└── vite.config.ts           # Vite + Nitro (preset vercel)
```

---

## Rotas públicas

| Rota | Descrição |
|------|-----------|
| `/` | Página inicial |
| `/search` | Busca e listagem com mapa |
| `/property/:id` | Detalhe de um imóvel |
| `/agent/:id` | Perfil do assessor |
| `/about` | Sobre a Aurelius |
| `/contact` | Contato e escritórios |
| `/sitemap.xml` | Sitemap para SEO |

---

## Dados estáticos

O conteúdo do site vive em `src/data/mock.ts` e é acessado pela camada `src/lib/data.ts`:

| Entidade | Quantidade | Descrição |
|----------|------------|-----------|
| Imóveis | 12 | Coberturas, casas, lofts e apartamentos em POA |
| Assessores | 2 | Lucas Mendes, Rafael Souza |
| Bairros | 3 | Moinhos de Vento, Três Figueiras, Bela Vista |

### Como adicionar um imóvel

1. Adicione a imagem em `src/assets/` (formato WebP recomendado)
2. Inclua o objeto em `properties` dentro de `src/data/mock.ts`
3. Vincule um `agentId` e, se aplicável, um `neighborhoodSlug`
4. O imóvel aparecerá automaticamente na busca, no mapa e no sitemap

Tipos TypeScript em `src/lib/types.ts`: `PublicProperty`, `PublicAgent`, `PublicNeighborhood`.

---

## Deploy na Vercel

O projeto usa **Nitro** com preset `vercel`, compatível com TanStack Start e Vercel Functions (Fluid Compute).

### Via dashboard

1. Importe o repositório em [vercel.com/new](https://vercel.com/new)
2. Framework Preset: **TanStack Start** (detecção automática)
3. Build command: `npm run build`
4. Install command: `npm install`
5. Deploy

### Via CLI

```bash
npx vercel        # preview
npx vercel --prod # produção
```

O arquivo `vercel.json` na raiz já define framework, install e build commands.

---

## Qualidade de código

```bash
npm run lint    # ESLint + TypeScript ESLint
npm run format  # Prettier
```

Configurações: `eslint.config.js`, `.prettierrc`, `tsconfig.json`.

---

## Créditos

- **Aurelius Imobiliaria** — marca e conteúdo
- **Shinoda Labs** — desenvolvimento do site

---

## Licença

Projeto privado. Todos os direitos reservados.
