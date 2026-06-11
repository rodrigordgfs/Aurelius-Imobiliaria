import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PublicNav } from "@/components/site/PublicNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { PropertyCard } from "@/components/site/PropertyCard";
import { Map as MapIcon, SlidersHorizontal, LayoutGrid, Bookmark } from "lucide-react";
import {
  DEFAULT_FILTERS,
  SearchFiltersSheet,
  type SearchFilters,
} from "@/components/modals/SearchFiltersSheet";
import { SavedSearchDialog } from "@/components/modals/SavedSearchDialog";
import { filterProperties, sortProperties } from "@/lib/filter-properties";
import { SearchMap } from "@/components/site/SearchMap";
import { getProperties } from "@/lib/data";

type SearchParams = {
  q?: string;
  sort?: string;
};

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>): SearchParams => ({
    q: typeof search.q === "string" ? search.q : undefined,
    sort: typeof search.sort === "string" ? search.sort : "relevant",
  }),
  head: () => ({
    meta: [
      { title: "Buscar no portfólio — Aurelius Imobiliaria" },
      {
        name: "description",
        content: "Busque entre residências de prestígio nos melhores bairros de Porto Alegre.",
      },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q, sort = "relevant" } = Route.useSearch();
  const navigate = useNavigate();
  const [filters, setFilters] = useState<SearchFilters>({
    ...DEFAULT_FILTERS,
    location: q ?? "",
  });
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [savedOpen, setSavedOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");

  const properties = getProperties();

  const results = useMemo(
    () => sortProperties(filterProperties(properties, filters, q), sort),
    [properties, filters, q, sort],
  );

  const criteriaLabel = [
    q || filters.location || "Porto Alegre",
    filters.assetType,
    `${filters.beds} quartos`,
    `R$ ${filters.priceMin}M – R$ ${filters.priceMax}M`,
    filters.features.join(", ") || "Sem filtros extras",
  ].join(" · ");

  const applyFilters = () => {
    navigate({ to: "/search", search: { q: filters.location || q, sort } });
  };

  return (
    <div className="min-h-screen bg-onyx text-ink">
      <PublicNav />
      <div className="pt-16">
        <div className="sticky top-16 z-30 border-b border-line glass">
          <div className="mx-auto flex max-w-[1600px] flex-wrap items-center gap-3 px-6 py-3">
            <button
              onClick={() => setFiltersOpen(true)}
              className="group flex items-center gap-2 rounded-full border border-line bg-surface/60 px-4 py-2 text-xs transition hover:border-ink-muted"
            >
              <span className="text-ink-dim">Local</span>
              <span className="text-ink">{q || filters.location || "Porto Alegre"}</span>
            </button>
            <button
              onClick={() => setFiltersOpen(true)}
              className="group flex items-center gap-2 rounded-full border border-line bg-surface/60 px-4 py-2 text-xs transition hover:border-ink-muted"
            >
              <span className="text-ink-dim">Quartos</span>
              <span className="text-ink">{filters.beds}</span>
            </button>
            <button
              onClick={() => setFiltersOpen(true)}
              className="group flex items-center gap-2 rounded-full border border-line bg-surface/60 px-4 py-2 text-xs transition hover:border-ink-muted"
            >
              <span className="text-ink-dim">Preço</span>
              <span className="text-ink">R$ {filters.priceMin}M – R$ {filters.priceMax}M</span>
            </button>
            <button
              onClick={() => setFiltersOpen(true)}
              className="flex items-center gap-2 rounded-full border border-line px-4 py-2 text-xs text-ink-muted hover:border-ink-muted"
            >
              <SlidersHorizontal className="size-3.5" />
              Todos os filtros
            </button>
            <div className="ml-auto flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-ink-dim">
                {results.length} resultado{results.length !== 1 ? "s" : ""}
              </span>
              <div className="flex items-center rounded-md border border-line">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`grid size-8 place-items-center ${viewMode === "grid" ? "bg-surface text-ink" : "text-ink-muted"}`}
                >
                  <LayoutGrid className="size-3.5" />
                </button>
                <button
                  onClick={() => setViewMode("map")}
                  className={`grid size-8 place-items-center ${viewMode === "map" ? "bg-surface text-ink" : "text-ink-muted"}`}
                >
                  <MapIcon className="size-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`mx-auto grid max-w-[1600px] gap-0 ${
            viewMode === "grid" ? "grid-cols-1 lg:grid-cols-[1fr_520px]" : "grid-cols-1"
          }`}
        >
          {viewMode === "map" && (
            <div className="col-span-full px-6 py-6">
              <SearchMap properties={results} className="h-[calc(100vh-180px)] min-h-[480px] rounded-xl border border-line" />
              {results.length > 0 && (
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {results.map((p, i) => (
                    <PropertyCard key={p.id} property={p} index={i} />
                  ))}
                </div>
              )}
            </div>
          )}

          {viewMode === "grid" && (
            <div className="px-6 py-8">
              <div className="mb-6 flex items-center justify-between">
                <h1 className="font-serif text-3xl italic">Porto Alegre · Propriedades privadas</h1>
                <select
                  value={sort}
                  onChange={(e) =>
                    navigate({ to: "/search", search: { q, sort: e.target.value } })
                  }
                  className="rounded-md border border-line bg-surface/40 px-3 py-1.5 text-xs text-ink-muted"
                >
                  <option value="relevant">Mais relevantes</option>
                  <option value="newest">Mais recentes</option>
                  <option value="price-desc">Preço · maior para menor</option>
                  <option value="price-asc">Preço · menor para maior</option>
                </select>
              </div>
              {results.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-line p-12 text-center">
                  <p className="font-serif text-2xl italic">Nenhum imóvel encontrado</p>
                  <p className="mt-2 text-sm text-ink-muted">Ajuste os filtros ou amplie a busca.</p>
                  <button
                    onClick={() => {
                      setFilters(DEFAULT_FILTERS);
                      navigate({ to: "/search" });
                    }}
                    className="mt-6 rounded-full border border-line px-5 py-2.5 text-xs font-bold uppercase tracking-widest"
                  >
                    Limpar filtros
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2">
                  {results.map((p, i) => (
                    <PropertyCard key={p.id} property={p} index={i} />
                  ))}
                </div>
              )}
              <div className="mt-16 rounded-2xl border border-dashed border-line p-12 text-center">
                <Bookmark className="mx-auto size-6 text-gold" />
                <p className="mt-4 font-serif text-2xl italic">Salvar esta busca</p>
                <p className="mt-2 text-sm text-ink-muted">
                  Avisaremos você em particular quando imóveis compatíveis entrarem no mercado.
                </p>
                <button
                  onClick={() => setSavedOpen(true)}
                  className="mt-6 rounded-full bg-gold px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-primary-foreground"
                >
                  Receber alertas
                </button>
              </div>
            </div>
          )}

          {viewMode === "grid" && (
            <div className="sticky top-[125px] hidden h-[calc(100vh-125px)] border-l border-line lg:block">
              <SearchMap properties={results} className="h-full" />
            </div>
          )}
        </div>
      </div>
      <SiteFooter />

      <SearchFiltersSheet
        open={filtersOpen}
        onOpenChange={setFiltersOpen}
        filters={filters}
        onChange={setFilters}
        onApply={applyFilters}
      />
      <SavedSearchDialog open={savedOpen} onOpenChange={setSavedOpen} criteria={criteriaLabel} />
    </div>
  );
}
