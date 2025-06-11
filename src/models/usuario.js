const { DataTypes, Model } = require("sequelize");
const bd = require("../config/database.js");

class Usuario extends Model {
  static id;
  static nombre;
  static apellido;
  static correo;
  static contrasena;
  static token;
  static isActive;
}

Usuario.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    contrasena: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize: bd,
    modelName: "Usuario",
    timestamps: true,
  }
);

Usuario.associate = (models) => {
  Usuario.hasMany(models.Prestamo, {
    foreignKey: "id_usuario",
    as: "prestamos",
  });
};

Usuario.prototype.toJSON = function () {
  const { contrasena, ...usuario } = this.get();
  delete usuario.contrasena;
  return usuario;
};

module.exports = Usuario;
