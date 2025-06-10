"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.createTable("Prestamos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        unique: true,
      },
      id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Usuarios",
          key: "id",
        },
      },
      id_libro: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Libros",
          key: "id",
        },
      },
      fecha_prestamo: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      fecha_devolucion: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      estado: {
        allowNull: false,
        defaultValue: "prestado",
        type: Sequelize.STRING,
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
    return await queryInterface.dropTable("Prestamos");
  },
};
