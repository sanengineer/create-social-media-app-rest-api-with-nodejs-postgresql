"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class storageimage extends Model {
    static associate(models) {}
  }

  storageimage.init(
    {
      storage_image_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "user_id",
        },
        field: "user_id",
      },
      image_link: DataTypes.STRING,
      cloudinary_id: DataTypes.STRING,
    },
    { sequelize, modelName: "storage_image" }
  );
  storageimage.associate = function (models) {
    storageimage.belongsTo(models.user, {
      foreignKey: "user_id",
    });
  };

  return storageimage;
};
