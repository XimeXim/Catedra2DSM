const {DataTypes, Model} = require("sequelize");
const bd = require("../config/database.js");

class Prestamo extends Model {
    static id;
    static id_usuario;
    static id_libro;
    static fecha_prestamo;
    static fecha_devolucion;
    static estado;
}

Prestamo.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },        
        id_usuario: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Usuarios',
                key: 'id'
            }
        },
        id_libro: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Libros',
                key: 'id'
            }
        },
        fecha_prestamo: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        fecha_devolucion: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        estado: {
            type: DataTypes.ENUM("prestado","devuelto","con retraso"),
            defaultValue: "prestado",
            unique: true
        }
    },
    {
        sequelize: bd,
        modelName: "Prestamo",
        timestamps: true,
    }
);

Prestamo.Usuario = Prestamo.belongsTo(require("./usuario"),{foreignKey: "id_usuario"});
Prestamo.Libro = Prestamo.belongsTo(require("./libro"),{foreignKey: "id_libro"});

Prestamo.prototype.toJSON = function () {
     const values = { ...this.get() };
    return values;
}

module.exports = Prestamo;
    