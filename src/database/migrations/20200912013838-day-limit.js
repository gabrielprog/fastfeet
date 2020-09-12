'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('daylimits', { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      deliveryman_id: {
        type: Sequelize.INTEGER,
        references:{
          model: 'deliverymans',
          key: 'id'
        },
       onUpdate: 'CASCADE',
       onDelete: 'SET NULL',
       allowNull: true
      },
      count_used: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      date: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable('daylimits');
  }
};
