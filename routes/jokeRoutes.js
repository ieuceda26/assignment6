/*
Name: Isaac Euceda
Date: 4/02/2026
CSC-372-01
This file defines the routes for the Jokebook application. It uses Express to create a router and maps HTTP endpoints to corresponding controller functions in jokeController.js. The routes include fetching joke categories, fetching jokes by category, fetching a random joke, and adding a new joke. Each route is associated with an appropriate HTTP method (GET or POST) and URL pattern.
*/

"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../controllers/jokeController");

router.get("/categories", controller.getCategories);
router.get("/category/:category", controller.getJokesByCategory);
router.get("/random", controller.getRandomJoke);
router.post("/joke/add", controller.addJoke);

module.exports = router;