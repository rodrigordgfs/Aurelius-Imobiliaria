import { motion } from "framer-motion";

type MenuButtonProps = {
  open: boolean;
  onClick: () => void;
};

const line = "absolute left-1/2 h-0.5 w-[18px] -translate-x-1/2 rounded-full bg-current";

export function MenuButton({ open, onClick }: MenuButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative grid size-10 place-items-center rounded-full border transition md:hidden ${
        open
          ? "border-gold/50 bg-gold-soft text-gold"
          : "border-line bg-surface/40 text-ink-muted hover:border-ink-muted hover:text-ink"
      }`}
      aria-label={open ? "Fechar menu" : "Abrir menu"}
      aria-expanded={open}
    >
      <span className="relative block size-[18px]">
        <motion.span
          className={line}
          animate={open ? { top: 8, rotate: 45 } : { top: 3, rotate: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.span
          className={line}
          animate={open ? { opacity: 0, scaleX: 0, top: 8 } : { opacity: 1, scaleX: 1, top: 8 }}
          transition={{ duration: 0.2 }}
        />
        <motion.span
          className={line}
          animate={open ? { top: 8, rotate: -45 } : { top: 13, rotate: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
      </span>
    </button>
  );
}
