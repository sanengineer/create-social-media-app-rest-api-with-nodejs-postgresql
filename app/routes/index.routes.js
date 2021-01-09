var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    title: "Welcome To RestAPI Rock Paper Scissors Game",
  });
});

module.exports = router;
