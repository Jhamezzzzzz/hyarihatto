import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true,
        // This will transform your SVG to a React component
        exportType: "named",
        namedExport: "ReactComponent",
      },
    }),
  ],
  server: {
    host: '0.0.0.0',       // 👈 allows access from LAN IP
    port: 5173,            // optional: custom port
    strictPort: true,      // optional: prevents fallback to another port
    cors: true             // optional: basic CORS enabled
  }
});
