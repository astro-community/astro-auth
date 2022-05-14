export const SITE = {
  title: "Astro Auth",
  description: "The One Stop Solution To Authentication With Astro",
  defaultLanguage: "en_US",
};

export const OPEN_GRAPH = {
  image: {
    src: "https://raw.githubusercontent.com/osadavc/astro-auth/master/docs/public/astroauth_bg.png?token=GHSAT0AAAAAABLHC2RY3WJCGLNM7UTPMA2CYTDVLPA",
    alt: "The One Stop Solution To Authentication With Astro",
  },
  twitter: "osadavc",
};

export const KNOWN_LANGUAGES = {
  English: "en",
};

export const GITHUB_EDIT_URL =
  "https://github.com/osadavc/astro-auth/tree/master/docs/";

// Uncomment this to add an "Join our Community" button to every page of documentation.
// export const COMMUNITY_INVITE_URL = `https://astro.build/chat`;

// Uncomment this to enable site search.
// See "Algolia" section of the README for more information.
// export const ALGOLIA = {
//   indexName: 'XXXXXXXXXX',
//   appId: 'XXXXXXXXXX',
//   apiKey: 'XXXXXXXXXX',
// }

export const SIDEBAR = {
  en: [
    { text: "Getting Started", header: true },
    { text: "Introduction", link: "getting-started/introduction" },
    { text: "Getting Started", link: "getting-started/getting-started" },
    {
      text: "Using Astro Auth",
      link: "getting-started/using-astro-auth",
    },
    { text: "Astro Auth CLI", link: "getting-started/astro-auth-cli" },
    { text: "Typescript Support", link: "getting-started/typescript-support" },

    { text: "Hooks", header: true },
    { text: "JWT Hook", link: "hooks/jwt" },
    { text: "Sign In Hook", link: "hooks/sign-in" },
    { text: "Account Hook", link: "hooks/account" },
    { text: "Redirect Error Hook", link: "hooks/redirectError" },

    { text: "UI", header: true },
    { text: "Instructions", link: "ui-library/instructions" },
    { text: "Button", link: "ui-library/button" },
    { text: "Title", link: "ui-library/title" },
    { text: "Provider Buttons", link: "ui-library/provider-buttons" },

    { text: "Core", header: true },
    { text: "Get User", link: "core/get-user" },
    { text: "Redirect User", link: "core/redirect-user" },
    { text: "Get Error", link: "core/get-error" },

    { text: "Client", header: true },
    { text: "Sign In", link: "client/signIn" },
    { text: "Sign Out", link: "client/signOut" },
    { text: "State Store", link: "state-store/react" },

    { text: "State Store", header: true },
    { text: "React", link: "state-store/react" },
    { text: "Other Frameworks", link: "state-store/other-frameworks" },

    { text: "Providers", header: true },
    { text: "OAuth Provider", link: "providers/oauth" },
    { text: "Credentials Provider", link: "providers/credentials" },
  ],
};
