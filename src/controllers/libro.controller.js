const { request, response } = require("express");
const Libro = require("../models/libro");

// Agregar libro con usuario autenticado
const addBook = async (req = request, res = response) => {
  try {
    // Datos del libro obligatorios en el body
    const { titulo, autor, genero, fecha_pub } = req.body;

    // Validacion de campos obligatorios
    if (!titulo || !autor || !genero || !fecha_pub) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Faltan datos obligatorios para agregar el libro",
      });
    }

    // Creacion de libro
    const libro = await Libro.create({
      titulo,
      autor,
      genero,
      fecha_pub,
    });

    //Respuesta si fue creado exitosamente
    return res.status(201).json({
      success: true,
      error: false,
      message: "Libro agregado exitosamente",
      data: libro,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: true,
      message: "Error al agregar libro",
    });
  }
};

// Listar libros disponibles
const getBooks = async (req = request, res = response) => {
  try {
    // Busca los libros que no se encuentran eliminados
    const libros = await Libro.findAll({
      where: { eliminado: false },
    });

    // Respuesta de lista de libros
    return res.json({
      success: true,
      error: false,
      data: libros,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: true,
      message: "Error al obtener libros",
    });
  }
};

// Detalle de un libro segun su id
const getBookById = async (req = request, res = response) => {
  try {
    const { id } = req.params; // id del libro a buscar

    // Busqueda del libro NO eliminado
    const libro = await Libro.findOne({
      where: { id, eliminado: false },
    });

    // Si no existe, respondemos error 404
    if (!libro) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Libro no encontrado",
      });
    }

    // Respondemos con la información del libro
    return res.json({
      success: true,
      error: false,
      data: libro,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: true,
      message: "Error al buscar detalles del libro",
    });
  }
};

// Editar datos de libro
const updateBook = async (req = request, res = response) => {
  try {
    const { id } = req.params; // id del libro a editar
    const { titulo, autor, genero, fecha_pub, disponible } = req.body; 

    // Buscamos el libro por id que no esta eliminado
    const libro = await Libro.findOne({ where: { id, eliminado: false } });

    // Error 404 si no lo encuentra
    if (!libro) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Libro no encontrado",
      });
    }

    // Actualizacion de los campos que vienen en el body solo si etan presentes en el body
    if (titulo !== undefined) libro.titulo = titulo;
    if (autor !== undefined) libro.autor = autor;
    if (genero !== undefined) libro.genero = genero;
    if (fecha_pub !== undefined) libro.fecha_pub = fecha_pub;
    if (disponible !== undefined) libro.disponible = disponible;

    // Guarda cambios
    await libro.save();

    //Respuesta de actualizacion exitosa
    return res.json({
      success: true,
      error: false,
      message: "Libro actualizado exitosamente",
      data: libro,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: true,
      message: "Error al actualizar libro",
    });
  }
};

// Eliminar libro
const deleteBook = async (req = request, res = response) => {
  try {
    const { id } = req.params; // id del libro a eliminar

    // Busca el libro que no debe estar eliminado
    const libro = await Libro.findOne({ where: { id, eliminado: false } });

    //Error si no existe
    if (!libro) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Libro no encontrado",
      });
    }

    // Marcar libro como eliminado y guarda el cambio
    libro.eliminado = true;
    await libro.save();

    // Confirma la eliminacion
    return res.json({
      success: true,
      error: false,
      message: "Libro eliminado exitosamente",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: true,
      message: "Error al eliminar libro",
    });
  }
};

// Reintegra un libro
const restoreBook = async (req = request, res = response) => {
  try {
    const id = req.params.id;

    // Busca el libro
    const libro = await Libro.findByPk(id);

    if (!libro) {
      return res.status(404).json({ mensaje: "Libro no encontrado" });
    }

    // Restaura solo si esta eliminado
    if (!libro.eliminado) {
      return res.status(400).json({ mensaje: "El libro se encuentra activo" });
    }

    libro.eliminado = false;
    await libro.save();

    res.json({ mensaje: "Libro restaurado exitosamente", libro });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al restaurar el libro" });
  }
};


module.exports = {
  addBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
  restoreBook
};
