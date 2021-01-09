"use strict";

const { Sequelize } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      username: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      firstname: {
        type: Sequelize.STRING,
      },
      lastname: {
        type: Sequelize.STRING,
      },
      birthdate: {
        type: Sequelize.DATEONLY,
        get: function () {
          const rawValue = this.getDataValue("birthdate");
          console.log("TEST", rawValue);
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
    await queryInterface.changeColumn("users", "birthdate", {
      type: Sequelize.DATEONLY,
    });
  },
  // down: async (queryInterface, Sequelize) => {
  //   await queryInterface.dropTable("users");
  // },
};
