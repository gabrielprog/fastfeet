'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('deliveryman', { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      avatar_id: {
        type: Sequelize.INTEGER,
        references:{
          model: 'avatar',
          key: 'id'
        },
       onUpdate: 'CASCADE',
       onDelete: 'SET NULL',
       allowNull: true
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
    await queryInterface.dropTable('deliveryman');
    
  }
};
