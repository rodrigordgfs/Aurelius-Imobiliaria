import { Link, useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useState } from "react";
import { useCommandPalette } from "@/context/command-palette";
import { MenuButton } from "@/components/site/MenuButton";
import { MobileMenu } from "@/components/site/MobileMenu";

const NAV = [
  { to: "/search", label: "Imóveis" },
  { to: "/agent/lucas-mendes", label: "Assessores" },
  { to: "/about", label: "Sobre" },
  { to: "/contact", label: "Contato" },
];

export function PublicNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { setOpen: setPaletteOpen } = useCommandPalette();
  const navigate = useNavigate();

  const goHome = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    void navigate({ to: "/" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <nav className="fixed top-0 z-50 w-full glass border-b border-line">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-10">
            <Link
              to="/"
              onClick={goHome}
              className="flex items-baseline gap-2 transition-opacity hover:opacity-90"
              aria-label="Aurelius Imobiliaria — início"
            >
              <span className="font-serif text-xl italic text-ink">Aurelius</span>
              <span className="hidden text-[10px] font-semibold uppercase tracking-[0.3em] text-ink-dim md:inline">
                Imobiliaria
              </span>
            </Link>
            <div className="hidden items-center gap-7 md:flex">
              {NAV.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  className="text-sm font-medium text-ink-muted transition-colors hover:text-ink"
                  activeProps={{ className: "text-ink" }}
                >
                  {n.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              className="hidden items-center gap-2 rounded-full border border-line px-3 py-1.5 text-xs text-ink-muted transition hover:border-ink-muted hover:text-ink md:inline-flex"
            >
              <Search className="size-3.5" />
              <span>Buscar no portfólio</span>
              <kbd className="ml-2 rounded bg-surface px-1.5 py-0.5 text-[10px] font-mono">⌘K</kbd>
            </button>
            <Link
              to="/contact"
              className="hidden rounded-full bg-ink px-4 py-2 text-xs font-semibold uppercase tracking-widest text-onyx transition hover:bg-ink/90 md:inline-flex"
            >
              Contato
            </Link>
            <MenuButton open={menuOpen} onClick={() => setMenuOpen((v) => !v)} />
          </div>
        </div>
      </nav>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onSearch={() => setPaletteOpen(true)}
      />
    </>
  );
}
