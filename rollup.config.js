require("dotenv").config();

import { terser } from "rollup-plugin-terser";
import html from "@rollup/plugin-html";
import postcss from "rollup-plugin-postcss";
import replace from "@rollup/plugin-replace";
import resolve from "@rollup/plugin-node-resolve";
import svelte from "rollup-plugin-svelte";
import sveltePreprocess from "svelte-preprocess";

const production = process.env.NODE_ENV === "production";

export default [
  {
    name: "inject",
    input: "src/inject/inject.js",
  },
  {
    name: "popup",
    input: "src/page_action/popup.js",
    html: "src/page_action/page_action.html",
  },
].map((entry, index) => ({
  input: entry.input,
  output: {
    dir: "dist",
    format: "iife",
  },
  plugins: [
    svelte({
      preprocess: sveltePreprocess({ postcss: true }),
      dev: !production,
      emitCss: true,
      css: false,
    }),
    resolve({
      browser: true,
      dedupe: ["svelte"],
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify(
        production ? "production" : "development"
      ),
      ...Object.keys(process.env).reduce((sum, key) => {
        sum[`process.env.${key}`] = JSON.stringify(process.env[key]);
        return sum;
      }, {}),
    }),
    postcss({
      extract: true,
    }),
    production && terser(),
    entry.html &&
      html({
        fileName: `${entry.name}.html`,
        title: "body",
        template: ({ attributes, bundle, files, publicPath, title }) => {
          const scripts = (files.js || [])
            .map(({ fileName }) => {
              return `<script src="${publicPath}${fileName}"></script>`;
            })
            .join("\n");

          const links = (files.css || [])
            .map(({ fileName }) => {
              return `<link href="${publicPath}${fileName}" rel="stylesheet">`;
            })
            .join("\n");

          return `<!doctype html>
<html>
  <head>
    <title>${title}</title>
    ${links}
  </head>
  <body>
    <div id="main-popup">
    </div>
    ${scripts}
  </body>
</html>`;
        },
      }),
  ],
}));
