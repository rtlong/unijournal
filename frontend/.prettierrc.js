module.exports = {
  printWidth: 100,
  semi: false,
  trailingComma: "all",
  overrides: [
    {
      files: "bin/test-watch",
      options: {
        parser: "babylon",
      },
    },
  ],
}
