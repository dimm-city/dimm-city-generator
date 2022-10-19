const rabbits = {
    growEditionSizeTo: 1000,
    layersOrder: [
      {
        name: "Background",
        options: {
          displayName: "Background",
          bypassDNA: true,
          opacity: 0.55,       
        },
      },
      {
        name: "Body_Rabbit_Grey",
        options: {
          displayName: "Fur",
        },
      },
      {
        name: "Ears_Rabbit_Grey",
        options: {
          displayName: "Ears",
          bypassDNA: true
        },
      },
      {
        name: "Expressions_Rabbit",
        options: {
          displayName: "Expression",
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
        name: "Armor",
        options: {
          displayName: "Armor",
        },
      },
      {
        name: "Bots",
        options: {
          displayName: "Bot",
        },
      },
      {
        name: "Equipment",
        options: {
          displayName: "Equipment",
        },
      }
    ],
  };
  module.exports.rabbits = rabbits;