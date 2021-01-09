'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.sequelize.transaction((t) => {
        return Promise.all([
            queryInterface.addColumn('histories', 'game_id', {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                  model: "games",
                  key: "id"
                }
            }, { transaction: t })
        ])
    })
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
          queryInterface.removeColumn('histories', 'game_id', { transaction: t })
      ])
  })
  }
};
