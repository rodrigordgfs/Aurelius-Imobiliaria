import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type GalleryDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  images: string[];
  title: string;
};

export function GalleryDialog({ open, onOpenChange, images, title }: GalleryDialogProps) {
  const [index, setIndex] = useState(0);
  const total = images.length;

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v);
        if (!v) setIndex(0);
      }}
    >
      <DialogContent className="max-w-4xl border-line bg-onyx p-0 text-ink">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="font-serif text-xl">{title}</DialogTitle>
          <p className="text-xs text-ink-dim">
            {index + 1} de {total} fotos
          </p>
        </DialogHeader>
        <div className="relative px-6 pb-6">
          <img
            src={images[index]}
            alt={`${title} — foto ${index + 1}`}
            className="aspect-[16/10] w-full rounded-md object-cover"
          />
          {total > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-8 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-line bg-onyx/80 backdrop-blur"
                aria-label="Foto anterior"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                onClick={next}
                className="absolute right-8 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-line bg-onyx/80 backdrop-blur"
                aria-label="Próxima foto"
              >
                <ChevronRight className="size-5" />
              </button>
            </>
          )}
          <div className="mt-4 flex gap-2 overflow-x-auto">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`shrink-0 overflow-hidden rounded border-2 ${
                  i === index ? "border-gold" : "border-transparent opacity-60"
                }`}
              >
                <img src={img} alt="" className="size-16 object-cover" />
              </button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
