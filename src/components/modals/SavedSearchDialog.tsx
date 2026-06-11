import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type SavedSearchDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  criteria?: string;
};

export function SavedSearchDialog({ open, onOpenChange, criteria }: SavedSearchDialogProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      toast.error("Informe um e-mail válido.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    setLoading(false);
    toast.success("Alerta configurado. Avisaremos quando houver novos imóveis compatíveis.");
    onOpenChange(false);
    setEmail("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-line bg-onyx text-ink sm:max-w-md">
        <form onSubmit={submit}>
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">Salvar esta busca</DialogTitle>
            <DialogDescription className="text-ink-muted">
              Receba alertas privados quando imóveis compatíveis entrarem no mercado.
              {criteria && (
                <span className="mt-2 block rounded-md border border-line bg-surface/40 px-3 py-2 text-xs text-ink">
                  {criteria}
                </span>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <label className="eyebrow">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="voce@exemplo.com"
              className="mt-2 w-full rounded-md border border-line bg-surface/40 px-3 py-2.5 text-sm focus:border-gold focus:outline-none"
            />
          </div>
          <DialogFooter className="mt-6 gap-2">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="rounded-md border border-line px-4 py-2 text-xs text-ink-muted"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-gold px-4 py-2 text-xs font-bold uppercase tracking-widest text-primary-foreground disabled:opacity-60"
            >
              {loading ? "Salvando…" : "Receber alertas"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
