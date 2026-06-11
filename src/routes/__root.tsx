import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Toaster } from "@/components/ui/sonner";
import { CommandPaletteProvider } from "@/context/command-palette";
import { CommandPalette } from "@/components/modals/CommandPalette";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <span className="eyebrow">Erro 404</span>
        <h1 className="mt-4 font-serif text-6xl italic text-foreground">Fora do mapa.</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          A página que você procura não faz mais parte do nosso portfólio.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-gold px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground transition hover:brightness-110"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <span className="eyebrow">Algo deu errado</span>
        <h1 className="mt-4 font-serif text-4xl italic text-foreground">Um momento, por favor.</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Não foi possível concluir essa solicitação. Tente novamente ou volte à página inicial.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-full bg-gold px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-primary-foreground"
          >
            Tentar novamente
          </button>
          <a
            href="/"
            className="rounded-full border border-line px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-foreground hover:bg-surface"
          >
            Ir ao início
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Aurelius Imobiliaria — Imóveis de alto padrão em Porto Alegre" },
      {
        name: "description",
        content:
          "Aurelius Imobiliaria é uma corretora privada especializada em residências de prestígio em Porto Alegre.",
      },
      { property: "og:title", content: "Aurelius Imobiliaria" },
      { property: "og:description", content: "Imóveis de alto padrão em Porto Alegre." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.webp", type: "image/webp", sizes: "180x180" },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <CommandPaletteProvider>
        <Outlet />
        <CommandPalette />
        <Toaster />
      </CommandPaletteProvider>
    </QueryClientProvider>
  );
}
