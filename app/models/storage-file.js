"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class storagefile extends Model {
    static associate(models) {}
  }

  storagefile.init(
    {
      storage_file_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "user",
          key: "user_id",
        },
        field: "user_id",
      },
      file_link: DataTypes.STRING,
      cloudinary_id: DataTypes.STRING,
    },
    { sequelize, modelName: "storage_file" }
  );
  storagefile.associate = function (models) {
    storagefile.belongsTo(models.user, {
      foreignKey: "user_id",
    });
  };

  return storagefile;
};
