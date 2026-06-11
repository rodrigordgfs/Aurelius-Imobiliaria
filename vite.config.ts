import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    optimizeDeps: {
      include: ["leaflet", "react-leaflet"],
    },
    ssr: {
      external: ["leaflet", "react-leaflet"],
    },
  },
});
