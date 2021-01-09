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
   return queryInterface.bulkInsert('games',
      [
        {
          "name": "Dino Runner",
          "description": "Dinosaur Game, also known as T-Rex Game and Dino Runner, is an in-built browser game in the Google Chrome web browser. The game was created by Sebastien Gabriel in 2014, and can be accessed by hitting the spacebar when offline on Google Chrome.",
          "images": "https://e7.pngegg.com/pngimages/372/920/png-clipart-tyrannosaurus-dino-t-rex-t-rex-chrome-vr-jump-trex-runner-lava-jump-dinosaur-angle-text-thumbnail.png",
          createdAt : new Date(),
          updatedAt : new Date()
        },
        {
          "name": "HexGL",
          "description": "HexGL is a futuristic racing game built by Thibaut Despoulain (BKcore) using HTML5, Javascript and WebGL. Come challenge your friends on this fast-paced 3D",
          "images": "https://tutorialzine.com/media/2015/01/hexgl1.jpg",
          createdAt : new Date(),
          updatedAt : new Date()
        },
        {
          "name": "CrossCode",
          "description": "A retro-inspired 2D game set in the distant future. This one is full of great game mechanics such as combos, puzzles, skill trees, quests, items and more.",
          "images": "https://tutorialzine.com/media/2015/01/hexgl1.jpg",
          createdAt : new Date(),
          updatedAt : new Date()
        },
        {
          "name": "Sketchout",
          "description": "The objective of Sketchout is to protect your planet and destroy the opposition by deflecting meteors as you control an Breakout-style paddle and draw lines at the same time. Design is where this game shines with awesome visuals and music.",
          "images": "https://tutorialzine.com/media/2015/01/sketchout.jpg",
          createdAt : new Date(),
          updatedAt : new Date()
        },
        {
          "name": "Treasure Arena",
          "description": "Treasure Arena is a dynamic battle-arena game for up to 4 players built with the power of socket.io. It features different game modes, excellent framerate and a great soundtrack. A very fun game.",
          "images": "https://tutorialzine.com/media/2015/01/trasurearena.jpg",
          createdAt : new Date(),
          updatedAt : new Date()
        },
        {
          "name": "Swooop",
          "description": "Fly around and collect gems and stars in a beautiful and colorful 3D world.",
          "images": "https://tutorialzine.com/media/2015/01/swooop_.jpg",
          createdAt : new Date(),
          updatedAt : new Date()
        },
        {
          "name": "Rock Paper Scissors",
          "description": "Janken is played pretty similarly to the way most people play rock, paper, scissors in the US: you use one of three moves to beat your opponent. Rock breaks scissors, scissors cuts paper, and paper covers rock.",
          "images": "https://cotoacademy.com/wp-content/uploads/2019/07/Copy-of-Janken-3-1024x1024.png",
          createdAt : new Date(),
          updatedAt : new Date()
        }
      ]
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
