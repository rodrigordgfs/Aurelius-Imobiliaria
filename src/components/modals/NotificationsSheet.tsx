import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const NOTIFICATIONS = [
  { time: "há 12 min", text: "Eva Laurent agendou visita — Obsidian Pavilion", unread: true },
  { time: "há 1 h", text: "Marcus Thorne adicionou nota — Crown Penthouse", unread: true },
  { time: "há 3 h", text: "Sato Capital enviou proposta — Pacific Veil", unread: false },
  { time: "Ontem", text: "Helena Berg enviou fotos — Villa Vigna Rossa", unread: false },
  { time: "Ontem", text: "Novo lead qualificado em Saint-Moritz", unread: false },
];

type NotificationsSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function NotificationsSheet({ open, onOpenChange }: NotificationsSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full border-line bg-onyx text-ink sm:max-w-sm">
        <SheetHeader>
          <SheetTitle className="font-serif text-xl">Notificações</SheetTitle>
          <SheetDescription className="text-ink-muted">
            Atividade recente do seu workspace.
          </SheetDescription>
        </SheetHeader>
        <ul className="mt-6 space-y-1">
          {NOTIFICATIONS.map((n, i) => (
            <li
              key={i}
              className={`rounded-lg border border-line p-4 ${n.unread ? "bg-gold-soft/30" : "bg-surface/20"}`}
            >
              <p className="text-sm text-ink">{n.text}</p>
              <p className="mt-1 text-[11px] text-ink-dim">{n.time}</p>
            </li>
          ))}
        </ul>
        <button
          onClick={() => onOpenChange(false)}
          className="mt-6 w-full rounded-md border border-line py-2 text-xs text-ink-muted hover:bg-surface"
        >
          Marcar todas como lidas
        </button>
      </SheetContent>
    </Sheet>
  );
}
