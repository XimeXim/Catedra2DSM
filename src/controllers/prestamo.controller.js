const Usuario = require("../models/usuario");
const Libro = require("../models/libro");
const Prestamo = require("../models/prestamo");

// Registro de nuevo prestamo Loan
const loan = async (req, res) => {
  try {
    const { id_usuario, id_libro } = req.body;

    const libro = await Libro.findByPk(id_libro); 

    if (!libro || libro.eliminado || !libro.disponible) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Libro no disponible",
      });
    }

    const fecha_prestamo = new Date();
    const fecha_devolucion = new Date();
    fecha_devolucion.setDate(fecha_prestamo.getDate() + 7);

    const prestamo = await Prestamo.create({
      id_usuario,
      id_libro,
      fecha_prestamo,
      fecha_devolucion,
      estado: "prestado",
    });

    libro.disponible = false;
    await libro.save();

    res.status(201).json({
      success: true,
      error: false,
      message: "Préstamo realizado con exito",
      data: prestamo,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: true,
      message: "Error al crear préstamo",
    });
  }
};

// Devolución de préstamo
const returnLoan = async (req, res) => {
  try {
    const { id } = req.params;

    const prestamo = await Prestamo.findByPk(id);
    if (!prestamo) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Préstamo no encontrado",
      });
    }

    const hoy = new Date();
    const estado = hoy > prestamo.fecha_devolucion ? "con retraso" : "devuelto";

    prestamo.estado = estado;
    await prestamo.save();

    // Marcar libro como disponible
    const libro = await Libro.findByPk(prestamo.id_libro);
    if (libro) {
      libro.disponible = true;
      await libro.save();
    }

    res.json({
      success: true,
      error: false,
      message: "Libro devuelto exitosamente",
      data: estado,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: true,
      message: "Error al devolver el libro",
    });
  }
};

// Listar todos los prestamos
const getLoans = async (req, res) => {
  try {
    const prestamos = await Prestamo.findAll();

    const prestamosDetalle = await Promise.all(
      prestamos.map(async (prestamo) => {
        const libro = await Libro.findByPk(prestamo.id_libro);
        const usuario = await Usuario.findByPk(prestamo.id_usuario);
        return {
          ...prestamo.toJSON(),
          libro,
          usuario,
        };
      })
    );

    res.json(prestamosDetalle);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: true,
      message: "Error al listar préstamos",
    });
  }
};

// Obtener prestamos por usuario
const getLoansByUser = async (req, res) => {
  try {
    const { id_usuario } = req.params;
    const prestamos = await Prestamo.findAll({
      where: { id_usuario: id_usuario },
    });

    const prestamosLibros = await Promise.all(
      prestamos.map(async (prestamo) => {
        const libro = await Libro.findByPk(prestamo.id_libro);
        return {
          ...prestamo.toJSON(),
          libro,
        };
      })
    );

    res.json({
      success: true,
      error: false,
      data: prestamosLibros,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: true,
      message: "Error al obtener préstamos del usuario",
    });
  }
};

module.exports = {
  loan,
  returnLoan,
  getLoans,
  getLoansByUser,
};