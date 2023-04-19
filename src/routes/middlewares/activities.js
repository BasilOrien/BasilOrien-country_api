const express = require("express");
const { AsyncQueueError } = require("sequelize");
const { Country, Activity } = require("../../db");
const Router = express.Router;
const axios = require("axios");
const countries = require("./countries");
const activities = Router();

activities.get("/", async function (req, res) {
  try {
    const dbResponse = await Activity.findAll({
      include: Country
    });
    res.json(dbResponse);
  } catch (error) {
    res.status(400).json({
      message: error + " error ",
      status: 400,
    });
  }
});

activities.post("/", async function (req, res) {
  const { name, difficulty, duration, season, country } = req.body;

  try {
    let activity = await Activity.create({
      name,
      difficulty,
      duration,
      season,
    });
    await activity.setCountries(country);

    let activityWithCountry = await Activity.findOne({
      where: { name: name },
      attributes: {
        exclude: ["updatedAt", "createdAt"],
      },
      include: {
        model: Country,
        through: {
          attributes: [],
        },
      },
    });
    res.json(activityWithCountry);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = activities;
