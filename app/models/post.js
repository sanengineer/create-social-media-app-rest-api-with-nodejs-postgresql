"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  post.init(
    {
      post_id: {
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
      content: DataTypes.TEXT,
      image: DataTypes.STRING,
      cloudinary_id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "post",
    }
  );
  post.associate = function (models) {
    post.belongsTo(models.user, {
      foreignKey: "user_id",
    });
    post.hasMany(models.comment, {
      foreignKey: { field: "post_id" },
      as: "PostIdCom",
    });
    post.hasMany(models.love, {
      // foreignKey: {field:"post_id"},
      // as: "PostIdLove"
      foreignKey: "post_id",
      sourceKey: "post_id",
    });
  };
  return post;
};
