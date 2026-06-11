import { createFileRoute } from "@tanstack/react-router";
import { PublicNav } from "@/components/site/PublicNav";
import { SiteFooter } from "@/components/site/SiteFooter";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Sobre — Aurelius Imobiliaria" },
      { name: "description", content: "A doutrina Aurelius: discrição, bom gosto e a arte da representação." },
    ],
  }),
  component: AboutPage,
});

const PRINCIPLES = [
  ["01", "Discrição", "Não divulgamos nossos principais. Não os fotografamos. Não os nomeamos. Tudo o que sabemos permanece dentro do escritório."],
  ["02", "Bom gosto", "A Aurelius representa apenas residências em que viveríamos. O portfólio é pequeno por design — um ato curatorial, não um inventário."],
  ["03", "Geografia", "Doze bairros de Porto Alegre, nada mais. Cada um é liderado por um assessor residente com pelo menos quinze anos de presença."],
  ["04", "Tempo", "Aceitamos três novos principais por sócio, por ano. O relacionamento é medido em décadas."],
];

function AboutPage() {
  return (
    <div className="min-h-screen bg-onyx text-ink">
      <PublicNav />
      <section className="mx-auto max-w-5xl px-6 pb-24 pt-40 text-center">
        <span className="eyebrow">Desde 2014</span>
        <h1 className="mt-6 font-serif text-5xl leading-[1.05] md:text-7xl">
          Um escritório privado para o investimento mais pessoal que alguém faz.
        </h1>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid grid-cols-1 divide-y divide-line border-y border-line md:grid-cols-2 md:divide-x md:divide-y-0">
          {PRINCIPLES.map(([n, t, b]) => (
            <div key={n} className="p-10 md:p-14">
              <div className="number text-xs text-gold">{n}</div>
              <h3 className="mt-4 font-serif text-3xl">{t}</h3>
              <p className="mt-4 text-ink-muted">{b}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <span className="eyebrow">Em números</span>
            <h2 className="mt-4 font-serif text-4xl">Uma década de prática.</h2>
          </div>
          <div className="md:col-span-7">
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-line bg-line">
              {[
                ["R$ 840M", "Transações fechadas"],
                ["127", "Residências colocadas"],
                ["12", "Bairros atendidos"],
                ["8", "Assessores residentes"],
              ].map(([v, l]) => (
                <div key={l} className="bg-onyx p-10">
                  <div className="number text-4xl text-ink">{v}</div>
                  <div className="mt-2 text-sm text-ink-muted">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
