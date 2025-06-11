const { response, request } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");
const generateJWT = require("../utils/generateJWT");

const register = async (req = request, res = response) => {
  try {
    const { nombre, apellido, correo, contrasena } = req.body;

    // Valida si el usuario existe
    const existingUser = await Usuario.findOne({ where: { correo } });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: true,
        message: "El correo ya existe",
      });
    }

    const salt = bcryptjs.genSaltSync();
    const hash = bcryptjs.hashSync(contrasena, salt);

    const usuario = await Usuario.create({
      nombre,
      apellido,
      correo,
      contrasena: hash,
    });

    const token = await generateJWT(usuario.id);

    return res.status(201).json({
      success: true,
      error: false,
      message: "Usuario registrado con éxito",
      data: {
        id: usuario.id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        correo: usuario.correo,
        token,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: true,
      message: "Error al registrar el usuario",
    });
  }
};

const login = async (req = request, res = response) => {
  try {
    const { correo, contrasena } = req.body;

    // Busca al usuario por su correo
    const usuario = await Usuario.findOne({ where: { correo } });
    if (!usuario) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Correo o contraseña incorrectos",
      });
    }

    // Compara la contrasena ingresada con la almacenada en la base de datos
    const validPassword = bcryptjs.compareSync(contrasena, usuario.contrasena);
    if (!validPassword) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Correo o contraseña incorrectos",
      });
    }

    // Genera token
    const token = await generateJWT(usuario.id);

    return res.json({
      success: true,
      error: false,
      message: "Login exitoso",
      data: {
        id: usuario.id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        correo: usuario.correo,
        token,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: true,
      message: "Error en el login",
    });
  }
};

const me = async (req = request, res = response) => {
  try {
    const usuario = req.usuario;

    return res.json({
      success: true,
      error: false,
      data: {
        id: usuario.id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        correo: usuario.correo,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: true,
      message: "Error al obtener la información del usuario",
    });
  }
};

module.exports = {
  register,
  login,
  me,
};
