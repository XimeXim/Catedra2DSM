const { DataTypes, Model } = require("sequelize");
const bd = require("../config/database.js");

class Libro extends Model {
  static id;
  static titulo;
  static autor;
  static genero;
  static fecha_pub;
  static disponible;
  static eliminado;
}

Libro.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    autor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genero: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fecha_pub: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    disponible: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    eliminado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize: bd,
    modelName: "Libro",
    timestamps: true,
  }
);


Libro.prototype.toJSON = function () {
  const values = { ...this.get() };
  return values;
};

module.exports = Libro;
