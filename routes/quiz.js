const express = require('express');
const router  = express.Router();

// create route to quiz page
module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT questions.text AS question, answers.text AS answer
    FROM questions
    JOIN answers ON questions.id = question_id
    WHERE questions.id = $1 AND answers.question_id = $2;` , [1,1])
      .then(data => {
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
