'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('deliveryproblems', { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      delivery_id: {
        type: Sequelize.INTEGER,
        references:{
          model: 'deliverymans',
          key: 'id'
        },
       onUpdate: 'CASCADE',
       onDelete: 'SET NULL',
       allowNull: true
      },
      description: {
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
    await queryInterface.dropTable('delivery_problems');
  }
};
