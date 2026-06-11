import { useNavigate } from "@tanstack/react-router";
import { Building2, FileText, MapPin, User } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useCommandPalette } from "@/context/command-palette";
import { getAgents, getProperties } from "@/lib/data";

export function CommandPalette() {
  const { open, setOpen } = useCommandPalette();
  const navigate = useNavigate();
  const properties = getProperties();
  const agents = getAgents();

  const go = (
    to: string,
    opts?: { params?: Record<string, string>; search?: Record<string, string> },
  ) => {
    setOpen(false);
    navigate({ to, ...opts });
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Buscar imóveis, assessores…" />
      <CommandList>
        <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
        <CommandGroup heading="Navegação">
          <CommandItem onSelect={() => go("/search")}>
            <Building2 />
            Buscar portfólio
          </CommandItem>
          <CommandItem onSelect={() => go("/about")}>
            <FileText />
            Sobre a Aurelius
          </CommandItem>
          <CommandItem onSelect={() => go("/contact")}>
            <MapPin />
            Contato
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Imóveis">
          {properties.map((p) => (
            <CommandItem key={p.id} onSelect={() => go("/property/$id", { params: { id: p.id } })}>
              <Building2 />
              {p.title} — {p.location}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Assessores">
          {agents.map((a) => (
            <CommandItem key={a.id} onSelect={() => go("/agent/$id", { params: { id: a.id } })}>
              <User />
              {a.name}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
