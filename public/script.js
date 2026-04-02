/*
Name: Isaac Euceda
Date: 4/02/2026
CSC-372-01
This script handles the client-side logic for the Jokebook application. It fetches a random joke on page load, retrieves joke categories, allows users to search for jokes by category, and submit new jokes. The script uses the Fetch API to communicate with the server and updates the DOM to display jokes and categories dynamically.
*/
"use strict";

(function () {

  window.addEventListener("load", init);

  function init() {
    loadRandomJoke();
    loadCategories();

    let searchBtn = document.getElementById("search-btn");
    searchBtn.addEventListener("click", function () {
      let category = document.getElementById("category-input").value.trim();
      if (category) loadJokesByCategory(category);
    });

    let addBtn = document.getElementById("add-btn");
    addBtn.addEventListener("click", function (e) {
      e.preventDefault();
      submitJoke();
    });
  }

  function loadRandomJoke() {
    fetch("/jokebook/random")
      .then(function (res) { return res.json(); })
      .then(function (joke) {
        document.getElementById("random-joke").innerHTML =
          "<strong> S: </strong> " + joke.setup + "<br/><strong> D: </strong> " + joke.delivery;
      });
  }

  function loadCategories() {
    fetch("/jokebook/categories")
      .then(function (res) { return res.json(); })
      .then(function (categories) {
        let container = document.getElementById("category-buttons");
        container.innerHTML = "";
        categories.forEach(function (cat) {
          let btn = document.createElement("button");
          btn.textContent = cat;
          btn.addEventListener("click", function () {
            loadJokesByCategory(cat);
          });
          container.appendChild(btn);
        });
      });
  }

  function loadJokesByCategory(category) {
    fetch("/jokebook/category/" + category)
      .then(function (res) { return res.json(); })
      .then(function (jokes) {
        if (jokes.error) {
          alert(jokes.error);
          return;
        }
        renderJokes(jokes, "Jokes in: " + category);
      });
  }

  function submitJoke() {
    let category = document.getElementById("add-category").value.trim();
    let setup = document.getElementById("add-setup").value.trim();
    let delivery = document.getElementById("add-delivery").value.trim();
    let errorEl = document.getElementById("add-error");
    errorEl.textContent = "";

    if (!category || !setup || !delivery) {
      errorEl.textContent = "All fields required.";
      return;
    }

    let params = { category: category, setup: setup, delivery: delivery };
    let jsonBody = JSON.stringify(params);

    fetch("/jokebook/joke/add", {
      method: "POST",
      headers: {
        "Accept": "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: jsonBody
    })
      .then(function (res) { return res.json(); })
      .then(function (jokes) {

        document.getElementById("add-category").value = "";
        document.getElementById("add-setup").value = "";
        document.getElementById("add-delivery").value = "";
        renderJokes(jokes, "Jokes in: " + category + " (updated)");
      });
  }

  function renderJokes(jokes, heading) {
    document.getElementById("jokes-heading").textContent = heading;
    let list = document.getElementById("jokes-list");
    list.innerHTML = "";
    jokes.forEach(function (joke) {
      let card = document.createElement("div");
      card.className = "joke-card";
      card.innerHTML = "<strong> S: </strong> " + joke.setup + "<br/><strong> D: </strong> " + joke.delivery;
      list.appendChild(card);
    });
  }

})();

