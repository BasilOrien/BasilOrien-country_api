const express = require("express");
const { AsyncQueueError } = require("sequelize");
const { Country, Activity } = require("../../db");
const Router = express.Router;
const axios = require("axios");
const countries = Router();

countries.get("/", async function (req, res) {
  const { name } = req.query;
  const dbResponse = await Country.findAll({
    include: Activity,
  });

  if (name) {
    const filteredData = await dbResponse.filter((element) =>
      element.Nombre.toLowerCase().startsWith(name.toLowerCase())
    );
    filteredData.length
      ? res.json(filteredData)
      : res.status(404).json({ msg: "No se ha encontrado el recurso" });
  } else {
    res.json(dbResponse);
  }
});

countries.get("/:id", async function (req, res) {
  const { id } = req.params;

  try {
    const foundCountry = await Country.findByPk(id.toUpperCase(), {
      include: Activity
    });
    console.log(foundCountry);
    res.json(foundCountry);
  } catch (error) {
    res.status(400).json({
      message: `${error}`,
      statusCode: 400,
    });
  }
});
module.exports = countries;
