import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PublicNav } from "@/components/site/PublicNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { PropertyCard } from "@/components/site/PropertyCard";
import { Phone, Mail, ArrowUpRight } from "lucide-react";
import { getAgent, getAgentListings } from "@/lib/data";

export const Route = createFileRoute("/agent/$id")({
  loader: ({ params }) => {
    const agent = getAgent(params.id);
    if (!agent) throw notFound();
    return { agent };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.agent.name} — Aurelius Imobiliaria` },
      { name: "description", content: loaderData?.agent.bio },
      { property: "og:image", content: loaderData?.agent.imageUrl },
    ],
  }),
  component: AgentPage,
});

function AgentPage() {
  const { agent } = Route.useLoaderData();
  const agentProperties = getAgentListings(agent.id);

  return (
    <div className="min-h-screen bg-onyx text-ink">
      <PublicNav />
      <section className="pt-32">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="overflow-hidden rounded-md">
              <img src={agent.imageUrl} alt={agent.name} className="aspect-[4/5] w-full object-cover" />
            </div>
          </div>
          <div className="md:col-span-7">
            <span className="eyebrow">{agent.title}</span>
            <h1 className="mt-4 font-serif text-6xl text-ink md:text-7xl">{agent.name}</h1>
            <p className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-ink-muted">
              {agent.bio}
            </p>

            <div className="mt-12 grid grid-cols-2 gap-6 border-y border-line py-8 md:grid-cols-4">
              <div>
                <div className="number text-3xl">{agent.closed}</div>
                <div className="mt-1 text-[10px] font-mono uppercase tracking-widest text-ink-dim">
                  Fechados (carreira)
                </div>
              </div>
              <div>
                <div className="number text-3xl">{agent.listings}</div>
                <div className="mt-1 text-[10px] font-mono uppercase tracking-widest text-ink-dim">
                  Anúncios ativos
                </div>
              </div>
              <div>
                <div className="number text-3xl">{agent.cities.length}</div>
                <div className="mt-1 text-[10px] font-mono uppercase tracking-widest text-ink-dim">
                  Cidades
                </div>
              </div>
              <div>
                <div className="number text-3xl">{agent.languages.length}</div>
                <div className="mt-1 text-[10px] font-mono uppercase tracking-widest text-ink-dim">
                  Idiomas
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <a href={`tel:${agent.phone}`} className="flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-xs font-bold uppercase tracking-widest text-primary-foreground">
                <Phone className="size-3.5" /> {agent.phone}
              </a>
              <a href={`mailto:${agent.email}`} className="flex items-center gap-2 rounded-full border border-line px-5 py-3 text-xs font-bold uppercase tracking-widest hover:bg-surface">
                <Mail className="size-3.5" /> {agent.email}
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-2">
              {agent.languages.map((l: string) => (
                <span key={l} className="rounded-full border border-line px-3 py-1 text-xs text-ink-muted">
                  {l}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-32">
        <div className="mb-12 flex items-end justify-between">
          <h2 className="font-serif text-4xl">Anúncios atuais</h2>
          <Link
            to="/search"
            search={{ q: agent.cities[0] }}
            className="text-xs font-bold uppercase tracking-widest text-ink-muted hover:text-ink"
          >
            Todos os {agent.listings} <ArrowUpRight className="ml-1 inline size-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2">
          {agentProperties.map((p, i) => (
            <PropertyCard key={p.id} property={p} index={i} />
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
