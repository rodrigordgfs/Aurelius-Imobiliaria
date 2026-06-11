import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Building2, FileText, MapPin, Search, User, X } from "lucide-react";
import { useEffect } from "react";
import { createPortal } from "react-dom";

const NAV = [
  { to: "/search", label: "Imóveis", desc: "Explorar o portfólio", icon: Building2 },
  { to: "/agent/lucas-mendes", label: "Assessores", desc: "Nossa equipe em POA", icon: User },
  { to: "/about", label: "Sobre", desc: "A doutrina Aurelius", icon: FileText },
  { to: "/contact", label: "Contato", desc: "Escritório privado", icon: MapPin },
] as const;

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  onSearch: () => void;
};

const ease = [0.16, 1, 0.3, 1] as const;

export function MobileMenu({ open, onClose, onSearch }: MobileMenuProps) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.button
            type="button"
            aria-label="Fechar menu"
            className="absolute inset-0 bg-onyx/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegação"
            className="absolute inset-y-0 right-0 flex w-[min(100%,22rem)] flex-col border-l border-line/80 bg-gradient-to-b from-surface via-onyx to-onyx shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease }}
          >
            <div className="pointer-events-none absolute -right-16 top-24 size-48 rounded-full bg-gold/10 blur-3xl" />
            <div className="pointer-events-none absolute -left-8 bottom-32 size-32 rounded-full bg-gold/5 blur-2xl" />

            <div className="relative flex items-center justify-between border-b border-line/60 px-5 py-4">
              <div>
                <span className="eyebrow">Menu</span>
                <p className="mt-1 font-serif text-lg italic text-ink">Aurelius Imobiliaria</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="grid size-10 place-items-center rounded-full border border-line bg-surface/60 text-ink-muted transition hover:border-gold/40 hover:text-gold"
                aria-label="Fechar"
              >
                <X className="size-5" />
              </button>
            </div>

            <nav className="relative flex-1 overflow-y-auto px-3 py-4">
              <ul className="space-y-1">
                {NAV.map((item, i) => (
                  <motion.li
                    key={item.to}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.06, duration: 0.4, ease }}
                  >
                    <Link
                      to={item.to}
                      onClick={onClose}
                      className="group flex items-center gap-4 rounded-xl border border-transparent px-3 py-3.5 transition hover:border-line/80 hover:bg-surface/50 active:scale-[0.98]"
                      activeProps={{
                        className:
                          "border-gold/30 bg-gold-soft/40 [&_.nav-label]:text-gold",
                      }}
                    >
                      <span className="grid size-11 shrink-0 place-items-center rounded-full border border-line bg-surface/80 text-gold transition group-hover:border-gold/40 group-hover:bg-gold-soft">
                        <item.icon className="size-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="nav-label block font-serif text-xl text-ink transition group-hover:text-gold">
                          {item.label}
                        </span>
                        <span className="mt-0.5 block text-xs text-ink-dim">{item.desc}</span>
                      </span>
                      <ArrowUpRight className="size-4 shrink-0 text-ink-dim opacity-0 transition group-hover:opacity-100 group-hover:text-gold" />
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                className="mt-6 space-y-3 px-3"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.4, ease }}
              >
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onSearch();
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-line bg-surface/40 py-3.5 text-xs font-bold uppercase tracking-widest text-ink-muted transition hover:border-ink-muted hover:text-ink active:scale-[0.98]"
                >
                  <Search className="size-4" />
                  Buscar no portfólio
                </button>
                <Link
                  to="/contact"
                  onClick={onClose}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gold py-3.5 text-xs font-bold uppercase tracking-widest text-primary-foreground transition hover:brightness-110 active:scale-[0.98]"
                >
                  Iniciar conversa
                  <ArrowUpRight className="size-4" />
                </Link>
              </motion.div>
            </nav>

            <motion.div
              className="relative border-t border-line/60 px-5 py-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.35 }}
            >
              <p className="text-[10px] font-mono uppercase tracking-widest text-ink-dim">
                Porto Alegre · RS
              </p>
              <p className="mt-1 text-xs text-ink-muted">Rua Padre Chagas, 79 · Moinhos de Vento</p>
            </motion.div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
