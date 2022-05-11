#! /usr/bin/env node

import inquirer from "inquirer";
import path from "path";
import fs from "fs";

const isNPMInitialized = fs.existsSync(
  path.join(process.cwd(), "package.json")
);

const isProjectTS = fs.existsSync(path.join(process.cwd(), "tsconfig.json"));

const configPath = isProjectTS
  ? path.join(process.cwd(), "src", "pages", "api", "auth", "[...astroauth].ts")
  : path.join(
      process.cwd(),
      "src",
      "pages",
      "api",
      "auth",
      "[...astroauth].js"
    );

const createConfigFileFlow = () => {
  inquirer
    .prompt([
      {
        type: "confirm",
        name: "create",
        message: "✨ Do you want to create a astroauth config file ?",
        default: false,
      },
    ])
    .then((answers: { create: boolean }) => {
      if (answers.create) {
        createConfigFile();
      } else {
        console.log("Goodbye! 👋");
      }
    });
};

const createConfigFile = () => {
  const config = `import AstroAuth from "@astro-auth/core";
// Import Providers Here

export const all = AstroAuth({
  authProviders: [
    // Add Your Providers Here
  ],
});`;

  fs.mkdirSync(path.join(process.cwd(), "src", "pages", "api", "auth"), {
    recursive: true,
  });

  fs.writeFileSync(configPath, config, "utf8");
  console.log("✅ astroauth config file created successfully");
};

const createStateIsland = (defaultConfirmation?: boolean) => {
  inquirer
    .prompt([
      {
        type: "confirm",
        name: "state_island",
        message:
          "✨ Do you want to setup state-island? (Still Only Working With React)",
        default: defaultConfirmation || false,
      },
    ])
    .then((answers: { state_island: boolean }) => {
      const jsStateIsland = `import { ReactStateStore } from "@astro-auth/client";

const UserStore = ({ user }) => {
  return <ReactStateStore user={user} />;
};

export default UserStore;
`;

      const tsStateIsland = `import { ReactStateStore } from "@astro-auth/client";

const UserStore = ({ user }: any) => {
  return <ReactStateStore user={user} />;
};

export default UserStore;
`;

      fs.mkdirSync(path.join(process.cwd(), "src", "components", "UserStore"), {
        recursive: true,
      });

      if (answers.state_island) {
        if (isProjectTS) {
          fs.writeFileSync(
            path.join(
              process.cwd(),
              "src",
              "components",
              "UserStore",
              "index.tsx"
            ),
            tsStateIsland,
            "utf8"
          );
        } else {
          fs.writeFileSync(
            path.join(
              process.cwd(),
              "src",
              "components",
              "UserStore",
              "index.jsx"
            ),
            jsStateIsland,
            "utf8"
          );
        }

        const packageJSON = fs
          .readFileSync(path.join(process.cwd(), "package.json"))
          .toString();

        const isAstroClientInstalled = (
          Object.keys(JSON.parse(packageJSON).dependencies) as Array<any>
        ).find((item) => item == "@astro-auth/client");

        if (!isAstroClientInstalled) {
          return console.log("🚨 You need to install @astro-auth/client first");
        }

        console.log("✅ State island setup successfully");
        console.log(
          "📃 Read the documentation (https://astro-auth.weoffersolution.com/state-store/react) for more info about using the state island"
        );
      } else {
        console.log("Goodbye! 👋");
      }
    });
};

const main = () => {
  if (!isNPMInitialized) {
    return console.log("🚨 You need to run `npm init` first");
  }

  const isPackageJSON = fs.existsSync(path.join(process.cwd(), "package.json"));

  if (!isPackageJSON) {
    return console.log("🚨 You need to run `npm init` first");
  }

  const packageJSON = fs
    .readFileSync(path.join(process.cwd(), "package.json"))
    .toString();

  const isDevDeps = JSON.parse(packageJSON).devDependencies;

  if (!isDevDeps) {
    return console.log(
      "🚨 It doesn't look like a project that supports astroauth"
    );
  }

  const isAstroInstalled = (
    Object.keys(JSON.parse(packageJSON)?.devDependencies) as Array<any>
  ).find((item) => item == "astro");

  if (!isAstroInstalled) {
    return console.log(
      "🚨 It doesn't look like a project that supports astroauth"
    );
  }

  const isAstroAuthCoreInstalled = (
    Object.keys(JSON.parse(packageJSON).dependencies) as Array<any>
  ).find((item) => item == "@astro-auth/core");

  if (!isAstroAuthCoreInstalled) {
    return console.log("🚨 You need to install @astro-auth/core first");
  }

  const isConfigExists =
    fs.existsSync(
      path.join(
        process.cwd(),
        "src",
        "pages",
        "api",
        "auth",
        "[...astroauth].ts"
      )
    ) ||
    fs.existsSync(
      path.join(
        process.cwd(),
        "src",
        "pages",
        "api",
        "auth",
        "[...astroauth].js"
      )
    );

  if (isConfigExists) {
    inquirer
      .prompt([
        {
          type: "confirm",
          name: "overwrite",
          message:
            "🚨 astroauth config file already exists! Would you like to overwrite it?",
          default: false,
        },
      ])
      .then((answers: { overwrite: boolean }) => {
        if (answers.overwrite) {
          createConfigFile();
        } else {
          console.log("Goodbye! 👋");
        }
      });
  } else {
    createConfigFileFlow();
  }
};

if (process.argv[2] === "-state") {
  createStateIsland(true);
} else {
  main();
}
