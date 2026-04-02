/*
Name: Isaac Euceda
Date: 4/02/2026
CSC-372-01
This file sets up the Express server for the Jokebook application. It configures middleware for handling form data and JSON, serves static files from the 'public' directory, and defines routes for joke-related operations by importing the jokeRoutes module. The server listens on a specified port and logs a message when it starts successfully.
*/
"use strict";

const express = require("express");
const app = express();

const multer = require("multer");
app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

require("dotenv").config();

const jokeRoutes = require("./routes/jokeRoutes");
app.get("/test", (req, res) => res.json({ message: "Server is working!" }));
app.use('/jokebook', jokeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log("Server listening on port: " + PORT + "!");
});