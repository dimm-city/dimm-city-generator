const { getConfigPath, getBuildDir } = require("../src/paths");
const fs = require("fs");
const { createCanvas, loadImage } = require("canvas");

const { preview } = require(getConfigPath());

const saveProjectPreviewImage = async (_data) => {
  // Extract from preview config
  const { thumbWidth, thumbPerRow, imageRatio, imageName } = preview;
  // Calculate height on the fly
  const thumbHeight = thumbWidth * imageRatio;
  // Prepare canvas
  const previewCanvasWidth = thumbWidth * thumbPerRow;
  const previewCanvasHeight =
    thumbHeight * Math.ceil(_data.length / thumbPerRow);
  // Shout from the mountain tops
  console.log(
    `Preparing a ${previewCanvasWidth}x${previewCanvasHeight} project preview with ${_data.length} thumbnails.`
  );

  // Initiate the canvas now that we have calculated everything
  const previewPath = `${getBuildDir()}/${imageName}`;
  const previewCanvas = createCanvas(previewCanvasWidth, previewCanvasHeight);
  const previewCtx = previewCanvas.getContext("2d");

  // Iterate all NFTs and insert thumbnail into preview image
  // Don't want to rely on "edition" for assuming index
  for (let index = 0; index < _data.length; index++) {
    const nft = _data[index];
    await loadImage(`${getBuildDir()}/images/${nft.edition}.png`).then(
      (image) => {
        previewCtx.drawImage(
          image,
          thumbWidth * (index % thumbPerRow),
          thumbHeight * Math.trunc(index / thumbPerRow),
          thumbWidth,
          thumbHeight
        );
      }
    );
  }

  // Write Project Preview to file
  fs.writeFileSync(previewPath, previewCanvas.toBuffer("image/png"));
  console.log(`Project preview image located at: ${previewPath}`);
};

module.exports = {
  saveProjectPreviewImage: async () => {
    // read json data
    const rawdata = fs.readFileSync(`${getBuildDir()}/json/_metadata.json`);
    const metadataList = JSON.parse(rawdata);
    await saveProjectPreviewImage(metadataList);
  },
};
