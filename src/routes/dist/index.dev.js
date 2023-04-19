"use strict";

var _require = require("express"),
    Router = _require.Router;

var countries = require("./middlewares/countries");

var activities = require("./middlewares/activities"); // Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


var router = Router(); // Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/", function (req, res) {
  res.send("Server Ok");
});
router.use("/countries", countries);
router.use("/activities", activities);
module.exports = router;