import type { AstroIntegration } from "astro";

const astroAuthComponents = (): AstroIntegration => {
  return {
    name: "@astro-auth/ui",
    hooks: {
      "astro:config:setup": ({ injectScript }) => {
        injectScript("page-ssr", `import '@astro-auth/ui/dist/esm/index.css';`);
      },
    },
  };
};

export default astroAuthComponents;
