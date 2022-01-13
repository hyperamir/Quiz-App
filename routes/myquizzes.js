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

  router.get("/:id/:quiz", (req, res) => {
    const userId = req.params.id;
    const quizId = req.params.quiz;

    db.query(`SELECT * FROM quizzes WHERE user_id = $1 AND id = $2`, [userId, quizId])
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

  router.post("/:id/:quiz", (req, res) => {
    const user_id = req.params.id;
    const quiz_id = req.params.quiz;
    const listed = req.body.listed;

    const UpdatedListed = function() {
      db.query(`UPDATE quizzes
       SET listed = $3
       WHERE id= $1 AND user_id = $2; `, [quiz_id,user_id, listed]);
    };
    UpdatedListed(quiz_id,user_id,listed);

  });

  return router;
};
