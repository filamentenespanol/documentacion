import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "Filament en español",
  tagline: "Documentación no oficial de Filament en español",
  favicon: "img/favicon.svg",

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: "https://docs.filamentenespanol.com/",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "filamentenespanol", // Usually your GitHub org/user name.
  projectName: "documentacion", // Usually your repo name.

  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "es",
    locales: ["es"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/filamentenespanol/documentacion/tree/main/",
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/filamentenespanol/documentacion/tree/main/",
          // Useful options to enforce blogging best practices
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/docusaurus-social-card.jpg",
    // Algolia search config
    algolia: {
      apiKey: "243964705fe048036931848c24a0790e",
      indexName: "Documentación no oficial de Filament en español",
      appId: "K3IFF9JNIZ",
      contextualSearch: true,
      searchPagePath: 'search',
    },
    navbar: {
      title: "Filament en español",
      logo: {
        alt: "Filament en español Logo",
        src: "img/favicon.svg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "Documentación",
        },
        {
          href: "https://filamementenespanol.com",
          label: "Blog",
          position: "left",
        },
        {
          href: "https://github.com/filamentenespanol/documentacion",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Documentación",
          items: [
            {
              label: "Documentación",
              to: "/docs/",
            },
            {
              label: "Documentacion Oficial (en inglés)",
              href: "https://filamentphp.com/docs/",
            },
          ],
        },
        {
          title: "Enlaces Oficiales",
          items: [
            {
              label: "Sitio Web Oficial",
              href: "https://filamentphp.com/",
            },
            {
              label: "GitHub",
              href: "https://github.com/filamentphp/filament/",
            },
            {
              label: "Discord",
              href: "https://filamentphp.com/discord",
            },
            {
              label: "X",
              href: "https://twitter.com/filamentphp",
            },
          ],
        },
        {
          title: "Filament en Español",
          items: [
            {
              label: "Blog",
              href: "https://filamentenespanol.com/",
            },
            {
              label: "GitHub",
              href: "https://github.com/filamentenespanol/documentacion",
            },
          ],
        },
      ],
      copyright: `Traducción comunitaria © ${new Date().getFullYear()} Filament en Español bajo 
                  <a href="https://github.com/filamentenespanol/documentacion/blob/main/LICENSE.md" target="_blank">Licencia CC BY-SA 4.0</a>. |
                  Contenido original © <a href="https://filamentphp.com" target="_blank">Filament</a> <a href="https://github.com/filamentphp/filament/blob/4.x/LICENSE.md" target="_blank">(MIT)</a>.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
