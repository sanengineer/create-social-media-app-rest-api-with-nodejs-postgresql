'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class love extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  love.init({
    love_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "post",
        key: "post_id",
      },
      field: "post_id",
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "user_id",
      },
      field: "user_id",
    }
  }, {
    sequelize,
    modelName: 'love',
  });

  love.associate = function (models) {
    love.belongsTo(models.user, {
      foreignKey: "user_id",
    });
    love.belongsTo(models.post, {
      foreignKey: "post_id",
    });
  };
  return love;
};