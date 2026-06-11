# Aurelius Imobiliaria

Site de imóveis de alto padrão em Porto Alegre, RS.

## Desenvolvimento

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

O build gera a saída no formato da Vercel em `.vercel/output` (via Nitro).

## Deploy na Vercel

1. Importe o repositório em [vercel.com/new](https://vercel.com/new).
2. Confirme que o **Framework Preset** está como **TanStack Start** (ou deixe a detecção automática).
3. Build command: `npm run build` · Install command: `npm install`
4. Clique em **Deploy**.

Também é possível publicar pela CLI:

```bash
npx vercel
npx vercel --prod
```

## Estrutura

- `src/data/mock.ts` — dados estáticos de imóveis, assessores e bairros
- `src/routes/` — páginas públicas (home, busca, detalhe do imóvel, assessores, sobre, contato)
- `vite.config.ts` — Nitro com preset `vercel` para deploy serverless
