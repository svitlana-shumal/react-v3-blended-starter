import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/react-v3-blended-starter/",
  build: {
    sourcemap: true,
  },
});
