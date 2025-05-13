// @ts-check
import { defineConfig, envField } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
    output: "server",
    adapter: node({
        mode: "standalone",
    }),
    site: "https://mdl.net.id/",
    vite: {
        plugins: [tailwindcss()],
    },
    env: {
        schema: {
            STRAPI_URL: envField.string({ context: "client", access: "public", default: "http://103.147.236.130:1337" }),
        }
    }
});
