const { Router } = require("express");
const router = Router();
const validateJWT = require("../middlewares/validateJWT")
//Controllers
const { register, login, me } = require("../controllers/auth.controller");

//USUARIOS
//Register
router.post("/register", register);
//Login
router.post("/login", login);
//Me
router.get("/me",validateJWT, me);
//Verify token
//router.get("/validate-token", validateToken);

//LIBROS
//Add/book
//router.post("/add/book", addBook);
//Books listar libros
//router.get("/books", getBooks);
//Book/id detalle
//router.get("/book/:id", getBookById);
//Book/id editar
//router.put("/book/:id", updateBook);
//Book/id eliminar
//router.delete("/book/:id", deleteBook);
//Restore/book/id reintegrar libro
//router.put("/restore/book/:id", restoreBook);

//PRESTAMOS
//Loan
//router.post("/loan", loan);
//Loan/return/id marcar como devuelto
//router.put("/loan/return/:id", returnLoan);
//Loans listar prestamos
//router.get("/loans", getLoans);
//Loans/users/id_usuario  prestamos por usuario
//router.get("/loans/users/:id_usuario", getLoansByUser);

module.exports = router;
