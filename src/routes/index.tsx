import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight, MapPin } from "lucide-react";
import heroImg from "@/assets/hero-guaiba.webp";
import { PublicNav } from "@/components/site/PublicNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { PropertyCard } from "@/components/site/PropertyCard";
import { getProperties } from "@/lib/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aurelius Imobiliaria — Imóveis de alto padrão em Porto Alegre" },
      {
        name: "description",
        content:
          "Corretora privada especializada em residências de prestígio em Porto Alegre. Imóveis exclusivos, assessoria personalizada e inteligência de mercado.",
      },
      { property: "og:title", content: "Aurelius Imobiliaria" },
      { property: "og:description", content: "Imóveis de alto padrão em Porto Alegre." },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: HomePage,
});

function HomeAmbientBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-onyx to-zinc-950" />
      <div className="absolute -left-[20%] top-[8%] size-[min(70vw,520px)] rounded-full bg-gold/[0.09] blur-[100px]" />
      <div className="absolute -right-[15%] top-[38%] size-[min(55vw,420px)] rounded-full bg-zinc-700/25 blur-[90px]" />
      <div className="absolute bottom-[12%] left-1/2 size-[min(60vw,480px)] -translate-x-1/2 rounded-full bg-gold/[0.06] blur-[110px]" />
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, oklch(0.96 0.005 250) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );
}

function HomePage() {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const allProperties = getProperties();
  const properties = allProperties.slice(0, 4);

  const handleSearch = () => {
    navigate({ to: "/search", search: location.trim() ? { q: location.trim() } : {} });
  };

  return (
    <div className="relative min-h-screen text-ink">
      <HomeAmbientBackground />
      <PublicNav />

      <section className="relative h-[92vh] overflow-hidden">
        <img
          src={heroImg}
          alt="Residência moderna de prestígio ao entardecer"
          width={1920}
          height={1080}
          className="absolute inset-0 size-full object-cover object-[center_30%] brightness-[0.88] saturate-[0.95]"
        />
        <div className="absolute inset-0 bg-onyx/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-onyx/75 via-onyx/35 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-onyx/40 via-transparent to-onyx/70" />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-between px-6 pb-16 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <span className="eyebrow drop-shadow-sm">Corretora Privada · Est. 2014</span>
            <h1 className="mt-6 font-serif text-5xl leading-[1.05] text-ink drop-shadow-[0_2px_28px_rgba(0,0,0,0.55)] md:text-7xl lg:text-[88px]">
              Os imóveis mais <em className="text-gold">distintos</em> de Porto Alegre.
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-ink/90 drop-shadow-[0_1px_12px_rgba(0,0,0,0.45)] md:text-lg">
              A Aurelius assessora famílias e investidores em aquisições residenciais nos bairros
              mais nobres de Porto Alegre — com discrição, decisão e o rigor de um escritório
              privado.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            <div className="glass flex w-full flex-col items-stretch gap-2 rounded-2xl border border-line/80 bg-onyx/55 p-2 shadow-2xl backdrop-blur-lg md:flex-row md:items-stretch">
              <div className="flex min-w-0 flex-1 items-center gap-3 px-4 py-3">
                <MapPin className="size-4 shrink-0 text-gold" />
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-ink-dim">
                    Onde
                  </div>
                  <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    placeholder="Moinhos de Vento, Bela Vista, Três Figueiras…"
                    className="w-full bg-transparent text-sm text-ink placeholder:text-ink-dim focus:outline-none"
                  />
                </div>
              </div>
              <div className="hidden w-px shrink-0 self-stretch bg-line md:block" />
              <div className="flex min-w-0 flex-1 flex-col justify-center px-4 py-3">
                <div className="text-[10px] font-bold uppercase tracking-widest text-ink-dim">
                  Tipo de ativo
                </div>
                <div className="text-sm text-ink">Propriedades privadas</div>
              </div>
              <div className="hidden w-px shrink-0 self-stretch bg-line md:block" />
              <div className="flex min-w-0 flex-1 flex-col justify-center px-4 py-3">
                <div className="text-[10px] font-bold uppercase tracking-widest text-ink-dim">
                  Orçamento
                </div>
                <div className="text-sm text-ink">R$ 1M — R$ 10M</div>
              </div>
              <button
                type="button"
                onClick={handleSearch}
                className="shrink-0 rounded-xl bg-gold px-8 py-4 text-center text-xs font-bold uppercase tracking-widest text-primary-foreground transition hover:brightness-110 md:px-10"
              >
                Buscar portfólio
              </button>
            </div>
            <div className="mt-4 flex flex-wrap gap-4 text-[10px] font-mono uppercase tracking-widest text-ink-muted drop-shadow-sm">
              <span>{allProperties.length} anúncios ativos</span>
              <span>·</span>
              <span>Porto Alegre, RS</span>
              <span>·</span>
              <span>R$ 42M em inventário</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative border-y border-line/80 bg-gradient-to-r from-surface/55 via-surface/35 to-surface/55 backdrop-blur-sm">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,transparent,oklch(0.78_0.13_85/0.04),transparent)]" aria-hidden />
        <div className="relative mx-auto grid max-w-7xl grid-cols-2 divide-x divide-line/80 md:grid-cols-4">
          {[
            ["R$ 42M", "Inventário ativo", "+12% a/a"],
            ["842", "Compradores verificados", "+131 no trim."],
            ["48d", "Média de dias no mercado", "-6d"],
            ["12", "Bairros atendidos", "+2 em '26"],
          ].map(([v, l, d]) => (
            <div key={l} className="p-6 md:p-8">
              <div className="number text-3xl text-ink md:text-4xl">{v}</div>
              <div className="mt-1 text-xs text-ink-muted">{l}</div>
              <div className="mt-3 text-[10px] font-mono uppercase tracking-widest text-gold">
                {d}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="pointer-events-none absolute right-0 top-24 size-64 rounded-full bg-gold/[0.06] blur-3xl" aria-hidden />
        <div className="relative mb-16 flex items-end justify-between gap-6">
          <div>
            <span className="eyebrow">Portfólio selecionado</span>
            <h2 className="mt-4 font-serif text-4xl text-ink md:text-5xl">
              A coleção atual.
            </h2>
          </div>
          <Link
            to="/search"
            className="group hidden items-center gap-2 text-xs font-bold uppercase tracking-widest text-ink-muted hover:text-ink md:inline-flex"
          >
            Ver todos os {allProperties.length}
            <ArrowUpRight className="size-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2">
          {properties.map((p, i) => (
            <PropertyCard key={p.id} property={p} index={i} />
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-4xl px-6 py-32 text-center">
        <div className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" aria-hidden />
        <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-soft blur-3xl" aria-hidden />
        <span className="eyebrow">Doutrina</span>
        <p className="mt-8 font-serif text-3xl leading-[1.3] text-ink md:text-5xl">
          Acreditamos que uma residência é o investimento mais pessoal que alguém faz —{" "}
          <em className="text-gold">e o menos transacional</em>. Nosso trabalho começa onde o anúncio
          termina.
        </p>
        <Link
          to="/about"
          className="mt-12 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-ink-muted hover:text-ink"
        >
          A doutrina Aurelius <ArrowUpRight className="size-4" />
        </Link>
      </section>

      <SiteFooter />
    </div>
  );
}
