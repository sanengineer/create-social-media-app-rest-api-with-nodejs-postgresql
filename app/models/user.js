"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const moment = require("moment");

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    // jwt method
    generateToken = () => {
      const payload = {
        user_id: this.user_id,
        email: this.email,
      };
      // token verification
      const secretToken = process.env.SECRET;
      // create token
      const token = jwt.sign(payload, secretToken, { expiresIn: 86400 * 30 });
      return token;
    };
  }
  user.init(
    {
      user_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: DataTypes.STRING,
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      bio: DataTypes.STRING,
      birthdate: {
        type: DataTypes.DATEONLY,
        get: function () {
          return moment(this.getDataValue("birthdate")).format("DD-MM-YYYY");
        },
      },
      gender: DataTypes.STRING,
      address: DataTypes.TEXT,
      avatar: DataTypes.STRING,
      cloudinary_id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "user",
    }
  );

  //encrypt password
  user.beforeSave((user, options) => {
    if (user.changed("password")) {
      user.password = bcrypt.hashSync(
        user.password,
        bcrypt.genSaltSync(8),
        null
      );
    }
  });

  // compare password
  user.prototype.checkPassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
      if (err) {
        return cb(err);
      }
      cb(null, isMatch);
    });
  };
  user.associate = function (models) {
    user.hasMany(models.post, {
      foreignKey: { field: "user_id" },
      as: "UserIdPost",
    });
    user.hasMany(models.comment, {
      foreignKey: { field: "user_id" },
      as: "UserIdCom",
    });
    user.hasMany(models.love, {
      foreignKey: { field: "user_id" },
      as: "UserIdLove",
    });
    user.hasMany(models.storage_file, {
      foreignKey: { field: "user_id" },
      as: "user_id_storage_file",
    });

    // console.log(
    //   "user:",
    //   user.hasMany(models.storage_file, {
    //     foreignKey: { field: "user_id" },
    //     as: "user_id_storage_file",
    //   })
    // );
  };

  return user;
};
