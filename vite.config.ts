import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Relative base so the site works whether it's served from a GitHub Pages
  // sub-path (username.github.io/rashidadiaries/) or a root domain (Vercel/custom).
  base: "./",
  plugins: [react()],
});
