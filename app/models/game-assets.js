"use strict";
const { Model } = require("sequelize");
const games = require("./games");
module.exports = (sequelize, DataTypes) => {
  class game_assets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  game_assets.init(
    {
      game_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "games",
          key: "id",
        },
        field: "game_id",
      },
      asset_name: DataTypes.STRING,
      images: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "game_assets",
    }
  );
  game_assets.associate = function (models) {
    game_assets.belongsTo(models.games, {
      foreignKey: "game_id",
    });
  };
  return game_assets;
};
