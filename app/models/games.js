'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class games extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  games.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    images: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'games',
  });
  games.associate = function (models) {
    games.hasMany(models.game_assets, {
      foreignKey: 'game_id', sourceKey: 'id'
    });
    games.hasMany(models.histories, {
      foreignKey: 'game_id', sourceKey: 'id'
    });
  }
  return games;
};