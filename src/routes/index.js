const { Router } = require("express");
const countries = require("./middlewares/countries");
const activities = require("./middlewares/activities");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/", function(req,res){
    res.send("Server Ok")
})
router.use("/countries", countries);
router.use("/activities", activities);


module.exports = router;
