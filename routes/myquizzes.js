const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/:id", (req, res) => {
    console.log(req.params.id);
    const userId = req.params.id;
    db.query(`SELECT * FROM quizzes WHERE user_id = $1`, [userId])
      .then(data => {
        console.log(data.rows);
        res.json(data.rows);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

  });

  router.get('/taken/:id', (req, res) => {
    const userId = req.params.id;
    db.query(`SELECT * FROM users_quizzes WHERE user_id =  $1`, [userId])
      .then(data => {
        console.log(data.rows);
        res.json(data.rows);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};