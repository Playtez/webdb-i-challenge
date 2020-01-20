const express = require("express");

const db = require("../data/dbConfig.js");

const router = express.Router();

router.get("/", (req, res) => {
  db("accounts")
    .then(account => {
      console.log(account[0]);
      res.json(account);
    })
    .catch(error => {
      res.status(500).json({ message: "Failed to get posts" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  db("accounts")
    .where({ id })
    .then(account => {
      res.json(account);
    })
    .catch(error => {
      res.status(500).json({ message: "Failed to get posts" });
    });
});

router.post("/", (req, res) => {
  const accountData = req.body;
  db("accounts")
    .insert(accountData)
    .then(account => {
      res.status(201).json(account);
    })
    .catch(error => {
      res.status(500).json({
        message: "invalid post"
      });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  db("accounts")
    .where({ id })
    .update(changes)
    .then(count => {
      if (count) {
        res.json({ updated: count });
      } else {
        res.status(404).json({
          message: "invalid id"
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fail server"
      });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db("accounts")
    .where({ id })
    .del()
    .then(count => {
      if (count) {
        res.json({ deleted: count });
      } else {
        res.status(404).json({
          message: "invalid post id"
        });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Failed to delete account" });
    });
});

module.exports = router;
