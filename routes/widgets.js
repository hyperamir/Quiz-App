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
    db.query(`SELECT upper(quizzes.name) as quiz_name
    FROM quizzes
    `)
      .then(data => {
        console.log(data.rows)
        results = data.rows;  //
        templateVars = { results } //
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


