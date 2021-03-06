const express = require('express');
const router = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {
    const userId = req.session.user_id;
    res.redirect(`/taken/${userId}`);
  });

  router.get('/:id', (req, res) => {
    const userId = req.params.id;

    db.query(`
    SELECT * FROM users_quizzes
    JOIN quizzes ON quiz_id = quizzes.id
    WHERE users_quizzes.user_id =  $1`, [userId])
      .then(data => {
        console.log(data.rows);
        const results = data.rows;
        const templateVars = { results };
        res.render('myquizzes.ejs', templateVars);
        //res.json(data.rows);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get('/:id/:quiz', (req, res) => {
    const userId = req.params.id;
    const quizId = req.params.quiz;

    db.query(`
    SELECT * FROM users_quizzes
    JOIN quizzes ON quiz_id = quizzes.id
    WHERE users_quizzes.user_id = $1 AND quiz_id = $2;`, [userId, quizId])
      .then(data => {
        console.log(data.rows);
        const results = data.rows;
        const templateVars = { results };
        res.render('myquizzes.ejs', templateVars);
        //res.json(data.rows);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  return router;
};
