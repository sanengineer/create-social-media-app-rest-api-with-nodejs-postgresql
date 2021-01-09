'use strict';
const {
  Model
} = require('sequelize');
const moment = require("moment");
module.exports = (sequelize, DataTypes) => {
  class histories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  histories.init({
    high_score: DataTypes.INTEGER,
    last_play: {
      type: DataTypes.DATE,
      // get() {
      //   return moment(this.getDataValue('last_play'))
      //   .utcOffset(this.getDataValue('offset'));
      // }
    },
    user_id: DataTypes.INTEGER,
    game_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'histories',
  });
  histories.associate = function (models) {
    histories.belongsTo(models.games, {
      foreignKey: "game_id",
    });
    histories.belongsTo(models.users, {
      foreignKey: "user_id",
    });
  };
  return histories;
};