const { response } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

const validateJWT = async (req, res = response, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      error: true,
      message: "No tiene token",
    });
  }

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Usuario no encontrado",
      });
    }

    req.usuario = usuario;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        error: true,
        message: "Token expirado",
      });
    }

    return res.status(401).json({
      success: false,
      error: true,
      message: "Token inválido",
    });
  }
};

module.exports = validateJWT;
