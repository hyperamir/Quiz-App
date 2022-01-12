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
    db.query(`SELECT quizzes.id, upper(quizzes.name) as quiz_name, url
    FROM quizzes
    `)
      .then(data => {
        console.log(data.rows)
        results = data.rows;
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



  // router.get('/login/:id', (req, res) => {
  //   const userId = req.params.id;
  //   console.log(userId)
  //   req.session.user_id = userId;

  //   res.redirect('/myquizzes');
  // });


  // router.get("/myquizzes", (req, res) => {
  //   const userId = req.params.id;

  //   db.query(`SELECT * FROM quizzes WHERE user_id = $1
  //   `, [userId])
  //     .then(data => {
  //       console.log(userId)
  //       console.log(data.rows)
  //       results = data.rows;
  //       templateVars = { results } //
  //       res.render('quiz.ejs', templateVars); //
  //       //res.json(data.rows[0]);
  //     })
  //     .catch(err => {
  //       res
  //         .status(500)
  //         .json({ error: err.message });
  //     });
  // });


  return router;
};


