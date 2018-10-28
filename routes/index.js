const express = require("express");
const router = express.Router();
const axios = require("axios");

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/users/login");
  }
};

router.get("/", isLoggedIn, (req, res, next) => {
  axios
    .get(
      "https://www.food2fork.com/api/search?key=6f1f25b1710aebcbfb0c213701a4fa30&q=shredded%20chicken&count=5"
    )
    .then(results => {
        res.render('index', {
          recipe : results.data.recipes
        })
      })
    .catch(err => {
      console.error("error: ", err);
    });
});

module.exports = router;
