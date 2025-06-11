const { Router } = require("express");
const router = Router();
const validateJWT = require("../middlewares/validateJWT");
//Controllers
const { register, login, me } = require("../controllers/auth.controller");

//USUARIOS
//Register
router.post("/register", register);
//Login
router.post("/login", login);
//Me
router.get("/me",validateJWT, me);

module.exports = router;
