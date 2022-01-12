/* eslint-disable camelcase */
/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/:id", (req, res) => {
    const quiz_id = req.params.id;

    const firstQuestion = db.query(`SELECT questions.id FROM questions WHERE quiz_id = $1 LIMIT 1;`, [quiz_id])
      .then((data) => {
        return data.rows[0];
      });
    const lastQuestion = db.query(`SELECT questions.id FROM questions WHERE quiz_id = $1 ORDER BY questions.id DESC LIMIT 1;`, [quiz_id])
      .then((data) => {
        return data.rows[0];
      });

    console.log(firstQuestion);
    console.log(lastQuestion);
    db.query(`SELECT questions.text AS question, answers.text as answer
    FROM questions
    JOIN answers ON questions.id = question_id
    WHERE questions.id BETWEEN $1 AND $2` , [firstQuestion,lastQuestion])
      .then(data => {
        console.log(data.rows);
        const results = data.rows;  //
        const templateVars = { results };//
        res.render('fifthquiz.ejs', templateVars); //
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

