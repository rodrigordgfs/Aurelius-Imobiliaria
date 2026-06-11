import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { PublicNav } from "@/components/site/PublicNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Bed, Bath, Maximize, Calendar, MapPin, ArrowUpRight, Share2, Heart } from "lucide-react";
import { ShareDialog } from "@/components/modals/ShareDialog";
import { GalleryDialog } from "@/components/modals/GalleryDialog";
import { ScheduleViewingDialog } from "@/components/modals/ScheduleViewingDialog";
import { useFavorites } from "@/hooks/use-favorites";
import { getAgent, getProperties, getProperty } from "@/lib/data";

export const Route = createFileRoute("/property/$id")({
  loader: ({ params }) => {
    const property = getProperty(params.id);
    if (!property) throw notFound();
    return { property };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.property.title} — Aurelius Imobiliaria` },
      { name: "description", content: loaderData?.property.description },
      { property: "og:title", content: loaderData?.property.title },
      { property: "og:description", content: loaderData?.property.description },
      { property: "og:image", content: loaderData?.property.imageUrl },
    ],
  }),
  component: PropertyPage,
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center bg-onyx text-ink">Imóvel não encontrado.</div>
  ),
});

function PropertyPage() {
  const { id } = Route.useParams();
  const { property } = Route.useLoaderData();
  const agent = getAgent(property.agentId);

  const { isSaved, toggleFavorite } = useFavorites();
  const [shareOpen, setShareOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);

  const related = getProperties().filter((p) => p.id !== id).slice(0, 3);

  const saved = isSaved(property.id);
  const galleryImages = property.gallery.length > 0
    ? [...property.gallery, ...property.gallery, ...property.gallery].slice(0, 28)
    : property.imageUrl
      ? [property.imageUrl]
      : [];

  const handleSave = () => {
    const nowSaved = toggleFavorite(property.id);
    toast.success(nowSaved ? "Imóvel salvo no seu portfólio." : "Imóvel removido dos salvos.");
  };

  return (
    <div className="min-h-screen bg-onyx text-ink">
      <PublicNav />

      <section className="pt-20">
        <div className="mx-auto max-w-[1500px] px-6">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 text-xs text-ink-dim">
            <div className="flex items-center gap-2">
              <Link to="/search" className="hover:text-ink">Portfólio</Link>
              <span>/</span>
              <span>{property.location}</span>
              <span>/</span>
              <span className="text-ink">{property.title}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShareOpen(true)}
                className="flex items-center gap-2 rounded-full border border-line px-3 py-1.5 hover:bg-surface"
              >
                <Share2 className="size-3.5" /> Compartilhar
              </button>
              <button
                onClick={handleSave}
                className={`flex items-center gap-2 rounded-full border px-3 py-1.5 hover:bg-surface ${
                  saved ? "border-gold text-gold" : "border-line"
                }`}
              >
                <Heart className={`size-3.5 ${saved ? "fill-gold" : ""}`} /> {saved ? "Salvo" : "Salvar"}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-md">
            {galleryImages.slice(0, 5).map((src, i) =>
              i === 4 ? (
                <button
                  key={i}
                  type="button"
                  onClick={() => setGalleryOpen(true)}
                  className="relative size-full"
                >
                  <img src={src} alt="" loading="lazy" className="size-full object-cover opacity-60" />
                  <div className="absolute inset-0 grid place-items-center bg-onyx/60 text-xs font-bold uppercase tracking-widest text-ink">
                    + {Math.max(galleryImages.length - 4, 0)} fotos
                  </div>
                </button>
              ) : (
                <img
                  key={i}
                  src={src}
                  alt=""
                  loading={i === 0 ? "eager" : "lazy"}
                  className={`size-full cursor-pointer object-cover ${i === 0 ? "col-span-2 row-span-2 h-full w-full" : ""}`}
                  onClick={() => setGalleryOpen(true)}
                />
              ),
            )}
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-[1500px] grid-cols-1 gap-16 px-6 lg:grid-cols-[1fr_400px]">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <span className="rounded-full border border-gold/40 bg-gold-soft px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-gold">
                {property.status}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-ink-muted">
                <MapPin className="size-3.5" /> {property.location}, {property.region}
              </span>
            </div>
            <h1 className="mt-6 font-serif text-5xl text-ink md:text-7xl">{property.title}</h1>
            <div className="mt-6 number text-2xl text-ink">
              {property.currency} {property.price}
            </div>

            <div className="mt-10 grid grid-cols-2 gap-6 border-y border-line py-8 md:grid-cols-4">
              <Stat icon={<Bed />} label="Quartos" value={`${property.beds}`} />
              <Stat icon={<Bath />} label="Banheiros" value={`${property.baths}`} />
              <Stat icon={<Maximize />} label="Área interna" value={`${property.sqm} m²`} />
              <Stat icon={<Calendar />} label="Ano" value={`${property.year}`} />
            </div>

            <div className="mt-12">
              <span className="eyebrow">A residência</span>
              <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-ink-muted">
                {property.description}
              </p>
            </div>

            <div className="mt-12">
              <span className="eyebrow">Características</span>
              <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {property.features.map((f: string) => (
                  <li
                    key={f}
                    className="flex items-center gap-3 border-b border-line py-3 text-sm text-ink"
                  >
                    <span className="size-1.5 rounded-full bg-gold" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-12 rounded-2xl border border-line bg-surface/40 p-8">
              <span className="eyebrow">Localização</span>
              <p className="mt-2 text-sm text-ink-muted">
                {property.location}, {property.region}
              </p>
              <div
                className="mt-4 h-72 w-full rounded-md"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 50% 50%, var(--color-zinc-800) 0%, transparent 40%), linear-gradient(135deg, var(--surface) 25%, var(--surface-2) 75%)",
                }}
              />
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-line bg-surface/50 p-6 backdrop-blur">
              {agent ? (
                <>
                  <div className="flex items-center gap-4">
                    <img src={agent.imageUrl} alt={agent.name} className="size-14 rounded-full object-cover" />
                    <div>
                      <div className="text-xs text-ink-dim">Anunciado por</div>
                      <div className="font-serif text-lg">{agent.name}</div>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-ink-muted">
                    Visitas privadas disponíveis mediante agendamento com 48 horas de antecedência.
                  </p>
                  <div className="mt-6 space-y-3">
                    <button
                      type="button"
                      onClick={() => setScheduleOpen(true)}
                      className="w-full rounded-md bg-gold py-3 text-xs font-bold uppercase tracking-widest text-primary-foreground"
                    >
                      Agendar visita privada
                    </button>
                    <Link
                      to="/agent/$id"
                      params={{ id: agent.id }}
                      className="block text-center text-xs font-bold uppercase tracking-widest text-ink-muted hover:text-ink"
                    >
                      Ver perfil do assessor
                    </Link>
                  </div>
                </>
              ) : null}
            </div>
            <div className="mt-4 rounded-2xl border border-line p-6 text-xs text-ink-muted">
              <div className="eyebrow mb-3">Referência</div>
              <div className="number">AUR-{property.id.toUpperCase()}-{property.year}</div>
            </div>
          </aside>
        </div>

        <div className="mx-auto mt-32 max-w-[1500px] px-6 pb-32">
          <div className="mb-12 flex items-end justify-between">
            <h3 className="font-serif text-3xl italic">Você também pode considerar</h3>
            <Link to="/search" className="text-xs font-bold uppercase tracking-widest text-ink-muted hover:text-ink">
              Ver coleção <ArrowUpRight className="ml-1 inline size-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-3">
            {related.map((p) => (
              <Link key={p.id} to="/property/$id" params={{ id: p.id }} className="group block">
                <div className="overflow-hidden rounded-sm">
                  <img
                    src={p.imageUrl}
                    alt={p.title}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="mt-4">
                  <div className="font-serif text-lg">{p.title}</div>
                  <div className="mt-1 text-xs text-ink-muted">
                    {p.location} · {p.currency} {p.price}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />

      <ShareDialog open={shareOpen} onOpenChange={setShareOpen} title={property.title} />
      <GalleryDialog
        open={galleryOpen}
        onOpenChange={setGalleryOpen}
        images={galleryImages}
        title={property.title}
      />
      <ScheduleViewingDialog
        open={scheduleOpen}
        onOpenChange={setScheduleOpen}
        propertyTitle={property.title}
        agentName={agent?.name ?? "Assessor Aurelius"}
        defaultMessage={`Gostaria de solicitar uma visita privada ao ${property.title}.`}
      />
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div>
      <div className="text-gold [&_svg]:size-4">{icon}</div>
      <div className="mt-3 text-[10px] font-mono uppercase tracking-widest text-ink-dim">{label}</div>
      <div className="mt-1 text-lg text-ink">{value}</div>
    </div>
  );
}
