'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.changeColumn('clientes', 'descripcion', 
    {
      type: Sequelize.TEXT,
    }
  );
  /**
   * Add altering commands here.
   *
   * Example:
   * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
   */
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.changeColumn('clientes', 'descripcion',
    {
      type: Sequelize.STRING,
    }
  );
  /**
   * Add reverting commands here.
   *
   * Example:
   * await queryInterface.dropTable('users');
   */
}
