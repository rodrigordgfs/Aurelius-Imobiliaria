import { Check, Copy, Link2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type ShareDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  url?: string;
};

export function ShareDialog({ open, onOpenChange, title, url }: ShareDialogProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = url ?? (typeof window !== "undefined" ? window.location.href : "");

  const copyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast.success("Link copiado para a área de transferência.");
    setTimeout(() => setCopied(false), 2000);
  };

  const nativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url: shareUrl });
        onOpenChange(false);
      } catch {
        /* user cancelled */
      }
    } else {
      await copyLink();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-line bg-onyx text-ink sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">Compartilhar</DialogTitle>
          <DialogDescription className="text-ink-muted">
            Compartilhe <span className="text-ink">{title}</span> com discrição.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2 rounded-md border border-line bg-surface/40 px-3 py-2">
          <Link2 className="size-4 shrink-0 text-ink-dim" />
          <span className="min-w-0 flex-1 truncate text-xs text-ink-muted">{shareUrl}</span>
          <button
            onClick={copyLink}
            className="flex shrink-0 items-center gap-1.5 rounded-md border border-line px-2.5 py-1 text-xs hover:bg-surface"
          >
            {copied ? <Check className="size-3.5 text-gold" /> : <Copy className="size-3.5" />}
            {copied ? "Copiado" : "Copiar"}
          </button>
        </div>
        <button
          onClick={nativeShare}
          className="w-full rounded-md bg-gold py-2.5 text-xs font-bold uppercase tracking-widest text-primary-foreground"
        >
          Compartilhar
        </button>
      </DialogContent>
    </Dialog>
  );
}
