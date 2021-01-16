"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("users", {
      user_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      username: {
        type: Sequelize.STRING,
        unique: true,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        validate:{
          isEmail: true
        }
      },
      password: {
        type: Sequelize.STRING,
      },
      firstname: {
        type: Sequelize.STRING,
      },
      lastname: {
        type: Sequelize.STRING,
      },
      birthdate: {
        type: Sequelize.DATEONLY,
        allowNull: true,
        get: function () {
          const rawValue = this.getDataValue("birthdate");
          // console.log("TEST", rawValue);
          return moment(rawValue).format("DD-MM-YYYY");
        },
      },
      gender: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.TEXT,
      },
      avatar: {
        type: Sequelize.STRING,
      },
      cloudinary_id: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("users");
  },
};
