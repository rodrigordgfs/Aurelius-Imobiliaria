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

type ScheduleViewingDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  propertyTitle: string;
  agentName: string;
  defaultMessage?: string;
};

export function ScheduleViewingDialog({
  open,
  onOpenChange,
  propertyTitle,
  agentName,
  defaultMessage,
}: ScheduleViewingDialogProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(
    defaultMessage ?? `Gostaria de solicitar uma visita privada ao ${propertyTitle}.`,
  );
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      toast.error("Preencha nome e e-mail.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    toast.success(`Solicitação enviada. ${agentName} responderá em até 48 horas.`);
    onOpenChange(false);
    setName("");
    setEmail("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-line bg-onyx text-ink sm:max-w-md">
        <form onSubmit={submit}>
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">Agendar visita privada</DialogTitle>
            <DialogDescription className="text-ink-muted">
              {propertyTitle} · com {agentName}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 space-y-3">
            <div>
              <label className="eyebrow">Nome completo</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 w-full rounded-md border border-line bg-surface/40 px-3 py-2.5 text-sm focus:border-gold focus:outline-none"
                placeholder="Seu nome"
              />
            </div>
            <div>
              <label className="eyebrow">E-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full rounded-md border border-line bg-surface/40 px-3 py-2.5 text-sm focus:border-gold focus:outline-none"
                placeholder="voce@exemplo.com"
              />
            </div>
            <div>
              <label className="eyebrow">Mensagem</label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-2 w-full resize-none rounded-md border border-line bg-surface/40 px-3 py-2.5 text-sm focus:border-gold focus:outline-none"
              />
            </div>
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
              {loading ? "Enviando…" : "Confirmar solicitação"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
