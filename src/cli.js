const { Command } = require("commander");
const fs = require("fs");
const paths = require("./paths.js");

class App {
  constructor() {
    this.program = new Command();
    this.program.version("1.0.0");
  }

  init() {
    this.program
      .command("generate")
      .argument("<path>", "generate random images")
      .option("--path <path>", "path to assets directory")
      .action(async (configPath, cmdObj) => {
        console.log("configPath", configPath);
        paths.setAssetPath(configPath || cmdObj.path || "./");
        await this.generateImages();
      });

    this.program
      .command("preview")
      .argument("configPath")
      .description("preview <configPath>", "generate a preview image")
      .action(async (configPath) => {
        console.log("preview", configPath);
        paths.setAssetPath(configPath);
        await this.generatePreviewImage();
      });

    this.program.parse(process.argv);
  }

  async generateImages() {
    console.log("asset path", paths.getAssetPath());
    // Code to generate images using the config and path
    const { startCreating, buildSetup } = require(`./main.js`);
    buildSetup();
    startCreating();
  }

  async generatePreviewImage() {
    const { saveProjectPreviewImage } = require("../utils/preview.js");
    await saveProjectPreviewImage();
  }
}

const app = new App();
app.init();
