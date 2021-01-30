"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class storagevideo extends Model {
    static associate(models) {}
  }

  storagevideo.init(
    {
      storage_video_id: {
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
      video_link: DataTypes.STRING,
      cloudinary_id: DataTypes.STRING,
    },
    { sequelize, modelName: "storage_video" }
  );
  storagevideo.associate = function (models) {
    storagevideo.belongsTo(models.user, {
      foreignKey: "user_id",
    });
  };

  return storagevideo;
};
