"use strict";
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("Usuarios", [
      {
        nombre: "Ximena",
        apellido: "Brito",
        correo: "ximenab@catedra.cl",
        contrasena: bcrypt.hashSync("xime123", salt),
        token: null,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Carlos",
        apellido: "Cortes",
        correo: "carlosc@catedra.cl",
        contrasena: bcrypt.hashSync("usuario123", salt),
        token: null,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Lisette",
        apellido: "Ordenes",
        correo: "lisetteo@catedra.cl",
        contrasena: bcrypt.hashSync("usuario123", salt),
        token: null,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("Usuarios", null, {});
  },
};
