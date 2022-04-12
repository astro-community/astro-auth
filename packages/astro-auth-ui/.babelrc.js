const isTest = String(process.env.NODE_ENV) === "test";

module.exports = {
  presets: [
    [
      "@babel/env",
      {
        modules: isTest && "commonjs",
      },
    ],
    "@babel/react",
  ],
};
