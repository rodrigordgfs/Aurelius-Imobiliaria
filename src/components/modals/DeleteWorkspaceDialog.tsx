import { useState } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type DeleteWorkspaceDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const CONFIRM_TEXT = "EXCLUIR";

export function DeleteWorkspaceDialog({ open, onOpenChange }: DeleteWorkspaceDialogProps) {
  const [confirm, setConfirm] = useState("");

  const handleOpenChange = (v: boolean) => {
    if (!v) setConfirm("");
    onOpenChange(v);
  };

  const deleteWorkspace = () => {
    if (confirm !== CONFIRM_TEXT) {
      toast.error(`Digite ${CONFIRM_TEXT} para confirmar.`);
      return;
    }
    toast.error("Esta ação está desabilitada na demonstração.");
    handleOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogContent className="border-line bg-onyx text-ink">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-serif text-xl text-destructive">
            Excluir workspace
          </AlertDialogTitle>
          <AlertDialogDescription className="text-ink-muted">
            Todos os dados, anúncios e leads serão removidos permanentemente. Esta ação não pode
            ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="my-2">
          <label className="eyebrow">
            Digite <span className="text-destructive">{CONFIRM_TEXT}</span> para confirmar
          </label>
          <input
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="mt-2 w-full rounded-md border border-destructive/40 bg-surface/40 px-3 py-2.5 text-sm focus:border-destructive focus:outline-none"
          />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel className="border-line bg-transparent text-ink-muted">
            Cancelar
          </AlertDialogCancel>
          <button
            onClick={deleteWorkspace}
            className="rounded-md bg-destructive px-4 py-2 text-xs font-bold text-destructive-foreground"
          >
            Excluir permanentemente
          </button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
