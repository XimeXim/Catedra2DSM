const { Router } = require("express");
const router = Router();
const validateJWT = require("../middlewares/validateJWT")
const { addBook,getBooks,getBookById,updateBook,deleteBook, restoreBook } = require("../controllers/libro.controller");
//LIBROS
//Add/book
router.post("/add/book",validateJWT, addBook);
//Books listar libros
router.get("/books", getBooks);
//Book/id detalle
router.get("/book/:id", getBookById);
//Book/id editar
router.put("/book/:id", validateJWT,updateBook);
//Book/id eliminar
router.delete("/book/:id", validateJWT, deleteBook);
//Restore/book/id reintegrar libro
router.put("/restore/book/:id", validateJWT ,restoreBook);

module.exports = router;
