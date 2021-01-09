"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const moment = require("moment");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    // checking password
    // checkPassword = (password, cb) => {
    //   bcrypt.compareSync(password, this.password, function (err, isMatch) {
    //     if (err) {
    //       return cb(err)
    //     }
    //     cb(null, isMatch)
    //   })
    // }

    // jwt method
    generateToken = () => {
      const payload = {
        id: this.id,
        email: this.email,
      };
      // token verification
      const secretToken = process.env.SECRET;
      // create token
      const token = jwt.sign(payload, secretToken, { expiresIn: 86400 * 30 });
      return token;
    };

    // authentication for login
    // static authenticate = async ({email, password}) => {
    //   try {
    //     const user = await this.findOne({ where: {email} })
    //     if(!user) return Promise.reject(`User with ${email} not found`)
    //     const isPasswordValid = user.checkPassword(password)
    //     if(!isPasswordValid) return Promise.reject("Wrong Password")
    //     return Promise.resolve(user)
    //   } catch (error) {
    //     return Promise.reject(error)
    //   }
    // }
  }
  users.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      birthdate:{
        type: DataTypes.DATEONLY,
        get: function() {
          return moment(this.getDataValue('birthdate')).format('DD-MM-YYYY')
        }
      },
      gender: DataTypes.STRING,
      address: DataTypes.TEXT,
      avatar: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "users",
    }
  );

  //encrypt password
  users.beforeSave((user, options) => {
    if (user.changed("password")) {
      user.password = bcrypt.hashSync(
        user.password,
        bcrypt.genSaltSync(8),
        null
      );
    }
  });

  // compare password
  users.prototype.checkPassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
      if (err) {
        return cb(err);
      }
      cb(null, isMatch);
    });
  };
  users.associate = function (models) {
    users.hasMany(models.histories, {
      foreignKey: 'user_id', sourceKey: 'id'
    });
  }
  return users;
};
