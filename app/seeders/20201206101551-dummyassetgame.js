'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('game_assets',
    [{
      "game_id": 7,
      "asset_name": "rock",
      "images": "https://res.cloudinary.com/dzw64cudq/image/upload/v1600485142/batu_xomrrr.png",
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      "game_id": 7,
      "asset_name": "paper",
      "images": "https://res.cloudinary.com/dzw64cudq/image/upload/v1600485141/kertas_dpdfrf.png",
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      "game_id": 7,
      "asset_name": "scissors",
      "images": "https://res.cloudinary.com/dzw64cudq/image/upload/v1600485141/gunting_z8yaio.png",
      createdAt : new Date(),
      updatedAt : new Date()
    }]
  )
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
