/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT questions.text AS question, answers.text AS answer, upper(quizzes.name) as quiz_name
    FROM questions
    JOIN answers ON questions.id = question_id
    JOIN quizzes ON quiz_id = quizzes.id
    WHERE questions.id = $1 AND answers.question_id = $2;` , [1,1])
      .then(data => {
        console.log(data.rows)
        result = data.rows;  //
        templateVars = { result } //
        res.render('quiz.ejs', templateVars); //
        //res.json(data.rows[0]);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
