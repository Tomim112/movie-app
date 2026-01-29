const path = require("path");

module.exports = {
  mode: "development",
  entry: "./scripts/index.js",               // 👈 tu JS real está acá
  output: {
    path: path.resolve(__dirname, "public"), // 👈 carpeta public de la raíz
    filename: "bundle.js",
  },
  devtool: "source-map",
};
