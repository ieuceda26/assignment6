
/* 
Name: Isaac Euceda
Date: 4/02/2026
CSC-372-01
JokeController handles the logic for fetching joke categories, jokes by category, random jokes, and adding new jokes. It interacts with the jokeModel to perform these operations and sends appropriate responses back to the client.
*/


"use strict";
const model = require("../models/jokeModel");

async function getCategories(req, res) {
  try {
    const categories = await model.getCategories();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
}

async function getJokesByCategory(req, res) {
  try {
    const { category } = req.params;
    const limit = req.query.limit ? parseInt(req.query.limit) : null;
    const jokes = await model.getJokesByCategory(category, limit);
    if (jokes === null) {
      return res.status(404).json({ error: `Category '${category}' not found` });
    }
    res.json(jokes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch jokes' });
  }
}

async function getRandomJoke(req, res) {
  try {
    const joke = await model.getRandomJoke();
    res.json(joke);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch random joke' });
  }
}

async function addJoke(req, res) {
  try {
    const { category, setup, delivery } = req.body;
    if (!category || !setup || !delivery) {
      return res.status(400).json({ error: 'category, setup, and delivery are all required' });
    }
    const updatedJokes = await model.addJoke(category, setup, delivery);
    res.json(updatedJokes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add joke' });
  }
}

module.exports = {
  getCategories,
  getJokesByCategory,
  getRandomJoke,
  addJoke
};
