"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.createTable("Usuarios", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        unique: true,
      },
      nombre: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      apellido: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      correo: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      contrasena: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      token: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      isActive: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.dropTable("Usuarios");
  },
};
