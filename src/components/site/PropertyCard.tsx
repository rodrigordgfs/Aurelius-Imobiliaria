import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import type { PublicProperty } from "@/lib/types";
import { Bookmark } from "lucide-react";
import { toast } from "sonner";
import { useFavorites } from "@/hooks/use-favorites";

export function PropertyCard({ property, index = 0 }: { property: PublicProperty; index?: number }) {
  const { isSaved, toggleFavorite } = useFavorites();
  const saved = isSaved(property.id);

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    const nowSaved = toggleFavorite(property.id);
    toast.success(nowSaved ? "Imóvel salvo." : "Removido dos salvos.");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link to="/property/$id" params={{ id: property.id }} className="group block">
        <div className="relative overflow-hidden rounded-sm">
          {property.imageUrl ? (
            <img
              src={property.imageUrl}
              alt={property.title}
              loading="lazy"
              className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="skeleton aspect-[4/3] w-full" />
          )}
          <div className="absolute left-4 top-4 flex items-center gap-2">
            <span className="rounded-full border border-white/20 bg-onyx/60 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-ink backdrop-blur-md">
              {property.status}
            </span>
          </div>
          <button
            className={`absolute right-4 top-4 grid size-9 place-items-center rounded-full border border-white/20 bg-onyx/60 backdrop-blur-md transition hover:text-gold ${
              saved ? "text-gold" : "text-ink-muted"
            }`}
            aria-label="Salvar"
            onClick={handleSave}
          >
            <Bookmark className={`size-4 ${saved ? "fill-gold" : ""}`} />
          </button>
        </div>
        <div className="mt-5 flex items-start justify-between gap-6">
          <div className="min-w-0">
            <h3 className="font-serif text-xl text-ink">{property.title}</h3>
            <p className="mt-1 text-sm text-ink-muted">
              {property.location}, {property.region}
            </p>
          </div>
          <div className="shrink-0 text-right">
            <div className="number text-base font-medium text-ink">
              {property.currency} {property.price}
            </div>
            <div className="mt-1 text-[10px] uppercase tracking-widest text-ink-dim">
              {property.beds} quartos · {property.baths} banheiros · {property.sqm}m²
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
