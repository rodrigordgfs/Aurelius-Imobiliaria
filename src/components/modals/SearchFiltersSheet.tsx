import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export type SearchFilters = {
  location: string;
  assetType: string;
  beds: string;
  priceMin: string;
  priceMax: string;
  features: string[];
};

export const DEFAULT_FILTERS: SearchFilters = {
  location: "",
  assetType: "Propriedades",
  beds: "1",
  priceMin: "0.5",
  priceMax: "10",
  features: [],
};

type SearchFiltersSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: SearchFilters;
  onChange: (filters: SearchFilters) => void;
  onApply: () => void;
};

const FEATURE_OPTIONS = ["Piscina", "Vista", "Spa", "Terraço", "Garagem", "Suíte"];

export function SearchFiltersSheet({
  open,
  onOpenChange,
  filters,
  onChange,
  onApply,
}: SearchFiltersSheetProps) {
  const toggleFeature = (f: string) => {
    const next = filters.features.includes(f)
      ? filters.features.filter((x) => x !== f)
      : [...filters.features, f];
    onChange({ ...filters, features: next });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full border-line bg-onyx text-ink sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-serif text-xl">Filtros</SheetTitle>
          <SheetDescription className="text-ink-muted">
            Refine sua busca no portfólio Aurelius.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-5">
          <Field label="Localização">
            <input
              value={filters.location}
              onChange={(e) => onChange({ ...filters, location: e.target.value })}
              placeholder="Zurique, Saint-Moritz…"
              className="w-full rounded-md border border-line bg-surface/40 px-3 py-2 text-sm focus:border-gold focus:outline-none"
            />
          </Field>
          <Field label="Tipo de ativo">
            <select
              value={filters.assetType}
              onChange={(e) => onChange({ ...filters, assetType: e.target.value })}
              className="w-full rounded-md border border-line bg-surface/40 px-3 py-2 text-sm focus:border-gold focus:outline-none"
            >
              <option>Propriedades</option>
              <option>Penthouses</option>
              <option>Villas</option>
              <option>Propriedades rurais</option>
            </select>
          </Field>
          <Field label="Quartos (mínimo)">
            <select
              value={filters.beds}
              onChange={(e) => onChange({ ...filters, beds: e.target.value })}
              className="w-full rounded-md border border-line bg-surface/40 px-3 py-2 text-sm focus:border-gold focus:outline-none"
            >
              {["3+", "4+", "5+", "6+", "8+"].map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
          </Field>
          <Field label="Orçamento (milhões USD)">
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={filters.priceMin}
                onChange={(e) => onChange({ ...filters, priceMin: e.target.value })}
                className="w-full rounded-md border border-line bg-surface/40 px-3 py-2 text-sm focus:border-gold focus:outline-none"
              />
              <span className="text-ink-dim">—</span>
              <input
                type="number"
                value={filters.priceMax}
                onChange={(e) => onChange({ ...filters, priceMax: e.target.value })}
                className="w-full rounded-md border border-line bg-surface/40 px-3 py-2 text-sm focus:border-gold focus:outline-none"
              />
            </div>
          </Field>
          <div>
            <label className="eyebrow">Características</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {FEATURE_OPTIONS.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => toggleFeature(f)}
                  className={`rounded-full border px-3 py-1 text-xs transition ${
                    filters.features.includes(f)
                      ? "border-gold bg-gold-soft text-gold"
                      : "border-line text-ink-muted hover:border-ink-muted"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>
        <SheetFooter className="mt-8 gap-2">
          <button
            type="button"
            onClick={() => onChange(DEFAULT_FILTERS)}
            className="rounded-md border border-line px-4 py-2 text-xs text-ink-muted"
          >
            Limpar
          </button>
          <button
            type="button"
            onClick={() => {
              onApply();
              onOpenChange(false);
            }}
            className="rounded-md bg-gold px-4 py-2 text-xs font-bold uppercase tracking-widest text-primary-foreground"
          >
            Aplicar filtros
          </button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="eyebrow">{label}</label>
      <div className="mt-2">{children}</div>
    </div>
  );
}
