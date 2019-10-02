const express = require("express");

const db = require("../data/db");

const router = express.Router();

//Get All Post

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

//Get post by ID

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(post => {
      post && post.length
        ? res.json(post)
        : res.status(404).json({
            message: "The post with the specified ID does not exist."
          });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

//get comments by id
router.get("/:id/comments", (req, res) => {
  Posts.findCommentById(req.params.id)
    .then(comments => {
      if (comments) {
        res.status(200).json(comments);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ error: "The comments information could not be retrieved." });
    });
});

//Post request
router.post("/", (req, res) => {
  const newPost = req.body;

  if (!newPost.title || !newPost.contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  } else {
    db.insert(newPost)
      .then(() => {
        res.status(201).json(newPost);
      })
      .catch(err => {
        res.status(500).json({
          err: "There was an error while saving the post to the database"
        });
      });
  }
});

module.exports = router;
