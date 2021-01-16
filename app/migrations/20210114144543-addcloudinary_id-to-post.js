'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
          queryInterface.addColumn('posts', 'cloudinary_id', {
              type: Sequelize.STRING,
              allowNull: true,
          })
      ])
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.sequelize.transaction(() => {
      return Promise.all([
          queryInterface.removeColumn('posts', 'cloudinary_id')
      ])
    })
  }
};
