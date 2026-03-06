import adapter from "@sveltejs/adapter-static";
import process from "node:process";

/** @type {import('@sveltejs/kit').Config} */
const config = {
    kit: {
        paths: {
            base: process.argv.includes("dev") ? "" : "/sankeetos-portfolio",
        },
        adapter: adapter({
            pages: "build",
            assets: "build",
            fallback: "404.html",
            precompress: false,
            strict: true,
        }),
    },
};

export default config;
