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

const createConfigFile = () => {
  const config = `import AstroAuth from "@astro-auth/core";
// Import Providers Here

export const all = AstroAuth({
  authProviders: [
    // Add Your Providers Here
  ],
});`;

  fs.writeFileSync(configPath, config, "utf8");
  console.log("✅ astroauth config file created successfully");
};

const main = () => {
  if (!isNPMInitialized) {
    return console.log("🚨 You need to run `npm init` first");
  }

  const packageJSON = fs
    .readFileSync(path.join(process.cwd(), "package.json"))
    .toString();

  const isAstroInstalled = (
    Object.keys(JSON.parse(packageJSON).devDependencies) as Array<any>
  ).find((item) => item == "astro");

  if (!isAstroInstalled) {
    return console.log("🚨 You need to install `astro` first");
  }

  const isAstroAuthInstalled = (
    Object.keys(JSON.parse(packageJSON).dependencies) as Array<any>
  ).find((item) => item == "@astro-auth/core");

  if (!isAstroAuthInstalled) {
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
    createConfigFile();
  }
};

main();
