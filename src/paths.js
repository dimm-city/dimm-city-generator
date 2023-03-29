const path = require("path");

let assetPath =
  process.argv.length === 3
    ? process.cwd() + "/" + process.argv[2]
    : process.cwd() + "/src/";

const getAssetPath = () => assetPath;

const paths = {
  basePath: process.cwd(),  
  getBuildDir: () => path.join(getAssetPath(), "build"),
  getJsonDir: () => path.join(getAssetPath(), "build/json"),
  getImagesDir: () => path.join(getAssetPath(), "build/images"),
  getLayersDir: () => path.join(getAssetPath(), "layers"),
  getConfigPath: () => path.join(getAssetPath(), "config.js"),
  setAssetPath: (aPath) => {
    assetPath = path.join(process.cwd(), aPath);
  },
  getAssetPath: () => assetPath,
};

module.exports = paths;
