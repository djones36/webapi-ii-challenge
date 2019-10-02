const express = require("express");

const db = require("../data/db");

const router = express.Router();

//Get Post

router.get("/", (req, res) => {
  db.find(req.query)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({
        error: "The post information could not be retrieved."
      });
    });
});

module.exports = router;
