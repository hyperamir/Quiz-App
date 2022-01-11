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
    db.query(`SELECT questions.text AS question, answers.text as answer
    FROM questions
    JOIN answers ON questions.id = question_id
    WHERE questions.id BETWEEN $1 AND $2` , [7, 10])
      .then(data => {
        console.log(data.rows)
        results = data.rows;  //
        templateVars = { results } //
        res.render('secondquiz.ejs', templateVars); //
        //res.json(data.rows[0]);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      })
  })

  return router;
};

