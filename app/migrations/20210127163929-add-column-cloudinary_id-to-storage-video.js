"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn("storage_videos", "cloudinary_id", {
          type: Sequelize.STRING,
          allowNull: true,
        }),
      ]);
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(() => {
      return Promise.all([
        queryInterface.removeColumn("storage_videos", "cloudinary_id"),
      ]);
    });
  },
};
