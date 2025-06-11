const { Router } = require("express");
const router = Router();
const validateJWT = require("../middlewares/validateJWT");
const {  loan,  returnLoan,  getLoans,  getLoansByUser} = require("../controllers/prestamo.controller");

//PRESTAMOS
//Loan
router.post("/loan", validateJWT, loan);
//Loan/return/id marcar como devuelto
router.put("/loan/return/:id", validateJWT, returnLoan);
//Loans listar prestamos
router.get("/loans", validateJWT, getLoans);
//Loans/users/id_usuario  prestamos por usuario
router.get("/loans/users/:id_usuario", validateJWT, getLoansByUser);

module.exports = router;
