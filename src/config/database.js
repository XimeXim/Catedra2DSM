const { Sequelize } = require("sequelize");

const bd = new Sequelize({
    dialect: "sqlite",
    logging: false,
    storage: `${process.env.DB_NAME}.sqlite` ,
});

module.exports = bd;