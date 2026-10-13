import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { viteSingleFile } from "vite-plugin-singlefile";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
    // Tout le site dans un seul index.html : une mise à jour = un seul fichier à envoyer chez one.com
    mode !== 'development' && viteSingleFile({ removeViteModuleLoader: true }),
  ].filter(Boolean),
  build: { assetsInlineLimit: 100_000_000, cssCodeSplit: false },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
