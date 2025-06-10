"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    //Definicion de
    const fecha_actual = new Date();
    const semana_plazo = new Date();
    semana_plazo.setDate(fecha_actual.getDate() + 7);

    return await queryInterface.bulkInsert("Prestamos", [
      {
        id_usuario: 3,
        id_libro: 2,
        fecha_prestamo: fecha_actual,
        fecha_devolucion: semana_plazo,
        estado: "prestado",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_usuario: 1,
        id_libro: 3,
        fecha_prestamo: fecha_actual,
        fecha_devolucion: semana_plazo,
        estado: "prestado",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("Prestamos", null, {});
  },
};
