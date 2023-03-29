const backgroundLayer = {
  name: "Background",
  options: {
    displayName: "District",
    bypassDNA: true,
    opacity: 0.35,
  },
};

const groupTemplateLayers = [
  {
    name: "Tails",
    options: {
      displayName: "Tail",
    },
  },
  {
    name: "Left_Arm",
    options: {
      displayName: "Weapon 1",
    },
  },
  {
    name: "Right_Arm",
    options: {
      displayName: "Weapon 2",
    },
  },
  {
    name: "Body",
    options: {
      displayName: "Body",
    },
  },
  {
    name: "Eyes",
    options: {
      displayName: "Eyes",
    },
  },
];
const layerConfig = {
  growEditionSizeTo: 5,
  layersOrder: [
    {
      name: "Embellishments",
      options: {
        displayName: "Embellishments",
      },
    },
    {
      name: "Armor",
      options: {
        displayName: "Armor",
        bypassDNA: true,
      },
    },
    {
      name: "Equipment",
      options: {
        displayName: "Equipment",
        bypassDNA: true,
      },
    },
    {
      name: "Headgear",
      options: {
        displayName: "Headgear",
        bypassDNA: true,
      },
    },
  ],
};

const botLayer = {
  name: "Bots",
  options: {
    displayName: "Bot",
    bypassDNA: true,
  },
};
function createConfig(race, editionSize, groups, includeTail) {
  const output = [];
  const tokensPerGroup = editionSize / (groups.length ?? 1);

  for (let index = 1; index <= groups.length; index++) {
    let groupLayerConfig = JSON.parse(JSON.stringify(layerConfig));
    groupLayerConfig.growEditionSizeTo =
      Math.round(tokensPerGroup * index) +
      (Number.isSafeInteger(tokensPerGroup) ? 0 : 1);

    if (groupLayerConfig.growEditionSizeTo > editionSize)
      groupLayerConfig.growEditionSizeTo = editionSize;

    groupLayerConfig.layersOrder = [
      backgroundLayer,
      ...groupTemplateLayers
        .filter((l) => (includeTail ? true : l.name.includes("Tail") == false))
        .map((l) => {
          let item = JSON.parse(JSON.stringify(l));
          item.name = `${race}/Colors/${groups[index]}/${l.name}`;
          item.sharedPaths = [`${race}/${l.name}`, l.name];
          return item;
        }),
      ...groupLayerConfig.layersOrder.map((l) => {
        l.name = `${race}/${l.name}`;
        return { ...l };
      }),
      botLayer,
    ];

    output.push(groupLayerConfig);
  }

  return output;
}
module.exports = { createConfig };
