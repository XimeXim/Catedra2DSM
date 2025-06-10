"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("Libros", [
      {
        titulo: "Cien años de soledad",
        autor: "Gabriel García Márquez",
        genero: "Realismo mágico",
        fecha_pub: new Date("1967-05-30"),
        disponible: true,
        eliminado: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        titulo: "Mujercitas",
        autor: "Louisa May Alcott",
        genero: "Novela",
        fecha_pub: new Date("1868-06-08"),
        disponible: true,
        eliminado: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        titulo: "One Piece Vol. 1",
        autor: "Eichiro Oda",
        genero: "Manga",
        fecha_pub: new Date("1997-12-24"),
        disponible: true,
        eliminado: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("Libros", null, {});
  },
};
