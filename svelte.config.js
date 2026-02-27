import adapter from "@sveltejs/adapter-static";
import process from "node:process";

/** @type {import('@sveltejs/kit').Config} */
const config = {
    kit: {
        adapter: adapter({
            fallback: "404.html",
        }),
    },
};

export default config;
