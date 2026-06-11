import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-onyx">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link
              to="/"
              className="inline-flex items-baseline gap-2 transition-opacity hover:opacity-90"
              aria-label="Aurelius Imobiliaria — início"
            >
              <span className="font-serif text-3xl italic">Aurelius</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-ink-dim">
                Imobiliaria
              </span>
            </Link>
            <p className="mt-6 max-w-md text-pretty text-sm leading-relaxed text-ink-muted">
              A Aurelius é uma corretora privada especializada em imóveis de alto padrão em Porto
              Alegre, assessorando famílias e investidores nos bairros mais nobres da cidade.
            </p>
            <div className="hairline my-10" />
            <div className="flex flex-wrap items-center gap-6 text-[10px] font-mono uppercase tracking-widest text-ink-dim">
              <span>Porto Alegre · 90430-001</span>
              <span>Rua Padre Chagas, 79 · Moinhos de Vento</span>
            </div>
          </div>

          <div className="md:col-span-7">
            <div className="grid grid-cols-2 gap-10 md:grid-cols-3">
              <FooterCol
                title="Portfólio"
                links={[
                  { to: "/search", label: "Buscar" },
                  { to: "/property/cobertura-moinhos", label: "Destaques" },
                ]}
              />
              <FooterCol
                title="Empresa"
                links={[
                  { to: "/about", label: "Sobre" },
                  { to: "/agent/lucas-mendes", label: "Assessores" },
                ]}
              />
              <FooterCol
                title="Contato"
                links={[
                  { to: "/contact", label: "Escritório privado" },
                  { to: "/contact", label: "Imprensa" },
                  { to: "/contact", label: "Carreiras" },
                ]}
              />
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-line pt-8 md:flex-row md:items-center">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-6 text-[10px] font-mono uppercase tracking-widest text-ink-dim">
              <span>© {new Date().getFullYear()} Aurelius Imobiliaria Ltda.</span>
              <span>CRECI-RS 12345-J</span>
              <span>Porto Alegre, RS</span>
            </div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-ink-dim">
              Site criado por{" "}
              <span className="text-ink-muted transition hover:text-gold">Shinoda Labs</span>
            </p>
          </div>
          <div className="flex gap-2">
            {["𝕏", "In", "IG"].map((s) => (
              <span
                key={s}
                className="grid size-9 place-items-center rounded-full border border-line text-xs text-ink-muted transition hover:border-gold hover:text-gold"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { to: string; label: string }[];
}) {
  return (
    <div>
      <div className="eyebrow mb-4">{title}</div>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.label}>
            <Link to={l.to} className="text-sm text-ink-muted transition hover:text-ink">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
