const fs = require("fs");
const { basename, extname } = require("path");

const { getConfigPath,  getAssetPath } = require("../src/paths");
const { rarityDelimiter } = require(getConfigPath());

const editionCount = 100;

if (fs.existsSync(getAssetPath())) {
  files = fs.readdirSync(getAssetPath());
} else {
  console.error("Directory not found", getAssetPath());
  return 1;
}
let totalWeight = 0;
let items = [];

for (let index = 0; index < files.length; index++) {
  const file = files[index];
  try {
    let filename = basename(file);
    let parts = filename.split(rarityDelimiter);
    let weight = 0;
    if (filename.indexOf(rarityDelimiter) > -1)
      weight = parts[1].replace(extname(filename), "") * 1;
    else weight = 1;

    if (weight > 1) {
      totalWeight += weight;
    } else {
      totalWeight += 1;
    }
    items.push({
      name: parts[0],
      filename: filename,
      weight: weight,
    });
  } catch (error) {
    console.log(error);
  }
}

let totalEstimate = 0;
let chanceOfNone = 0;
console.log("Name,Weight,Chance,Approximate Count");
items.forEach((item) => {
  let estimate = item.weight / totalWeight;
  console.log(
    `${item.name},${item.weight},${estimate},${Math.round(
      editionCount * estimate
    )}`
  );
  totalEstimate += estimate;
  if (item.name.toLowerCase() == "none" || item.name.toLowerCase() == "blank")
    chanceOfNone = estimate;
});
console.log("================================================");
console.log(
  "Total weight:",
  totalWeight,
  "Total files:",
  files.length,
  "Chance of getting no item:",
  chanceOfNone * 100
);
