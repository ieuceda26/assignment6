/*
Name: Isaac Euceda
Date: 4/02/2026
CSC-372-01
The jokeModel interacts with the PostgreSQL database to perform operations related to joke categories and jokes. It provides functions to fetch all categories, fetch jokes by category, fetch a random joke, and add a new joke. Each function executes SQL queries using the connection pool established in dbConnection.js and returns the results to the controller for further processing.
*/

"use strict";
const pool = require("./dbConnection");

async function getCategories() {
  const queryText = "SELECT name FROM categories";
  const result = await pool.query(queryText);
  return result.rows.map(r => r.name);
}

async function getJokesByCategory(category, limit) {
  const queryText = "SELECT id FROM categories WHERE name = $1";
  const values = [category];
  const catResult = await pool.query(queryText, values);
  if (catResult.rows.length === 0) return null;

  const categoryId = catResult.rows[0].id;
  let jokeQuery = "SELECT setup, delivery FROM jokes WHERE category_id = $1";
  let jokeValues = [categoryId];

  if (limit) {
    jokeQuery += " LIMIT $2";
    jokeValues.push(limit);
  }

  const result = await pool.query(jokeQuery, jokeValues);
  return result.rows;
}

async function getRandomJoke() {
  const queryText = "SELECT setup, delivery FROM jokes ORDER BY RANDOM() LIMIT 1";
  const result = await pool.query(queryText);
  return result.rows[0];
}

async function addJoke(category, setup, delivery) {
  let queryText = "SELECT id FROM categories WHERE name = $1";
  let values = [category];
  let catResult = await pool.query(queryText, values);

  if (catResult.rows.length === 0) {
    queryText = "INSERT INTO categories (name) VALUES ($1) RETURNING id";
    values = [category];
    catResult = await pool.query(queryText, values);
  }

  const categoryId = catResult.rows[0].id;

  queryText = "INSERT INTO jokes (category_id, setup, delivery) VALUES ($1, $2, $3)";
  values = [categoryId, setup, delivery];
  await pool.query(queryText, values);

  queryText = "SELECT setup, delivery FROM jokes WHERE category_id = $1";
  values = [categoryId];
  const updated = await pool.query(queryText, values);
  return updated.rows;
}

module.exports = {
  getCategories,
  getJokesByCategory,
  getRandomJoke,
  addJoke
};
