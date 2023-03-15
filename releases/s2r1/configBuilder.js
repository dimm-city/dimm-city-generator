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
      },
    },
    {
      name: "Equipment",
      options: {
        displayName: "Equipment",
      },
    },
    {
      name: "Headgear",
      options: {
        displayName: "Headgear",
      },
    },
  ],
};

const botLayer = {
    name: "Bots",
    options: {
        displayName: "Bot",
    },
};
function createConfig(race, editionSize, numberOfGroups, includeTail) {
  const output = [];
  const tokensPerGroup = editionSize / (numberOfGroups ?? 1);

  for (let index = 1; index <= numberOfGroups; index++) {
    let groupLayerConfig = JSON.parse(JSON.stringify(layerConfig));
    groupLayerConfig.growEditionSizeTo = tokensPerGroup * index;
    groupLayerConfig.layersOrder = [
      backgroundLayer,
      ...groupTemplateLayers
        .filter((l) => (includeTail ? true : l.name.includes("Tail") == false))
        .map((l) => {
          let item = JSON.parse(JSON.stringify(l));
          item.name = `${race}/Colors/Group${index}/${l.name}`;
          item.sharedPath = `${race}/${l.name}`;
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
