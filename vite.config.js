import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        favorites: resolve(__dirname, "src/favorites/index.html"),
        dashboard: resolve(__dirname, "src/dashboard/index.html"),
        teams: resolve(__dirname, "src/teams/index.html"),
        players: resolve(__dirname, "src/players/index.html"),
      },
    },
  },
});
