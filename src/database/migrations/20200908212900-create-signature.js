'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('signatures', { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      recipient_id: {
        type: Sequelize.INTEGER,
        references:{
          model: 'recipients',
          key: 'id'
        },
       onUpdate: 'CASCADE',
       onDelete: 'SET NULL',
       allowNull: true
      },
      path_file: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      } 
    });
    
  },

  down: async queryInterface => {
    await queryInterface.dropTable('signatures');
  }
};
