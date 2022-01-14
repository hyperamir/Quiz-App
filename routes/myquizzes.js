const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/:id", (req, res) => {
    console.log(req.params.id);
    const userId = req.params.id;
    db.query(`SELECT * FROM quizzes WHERE user_id = $1`, [userId])
      .then(data => {
        console.log(data.rows);
        //res.json(data.rows);
        const results = data.rows;
        const templateVars = { results };
        res.render('mycreated.ejs', templateVars);
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
    req.session.quiz_id = quizId;
    req.session.user_id = userId;
    console.log("cookie1",req.session.user_id);
    console.log("cookie2",req.session.quiz_id);

    db.query(`SELECT * FROM quizzes WHERE user_id = $1 AND id = $2`, [userId, quizId])
      .then(data => {
        console.log(data.rows);
        //res.json(data.rows);
        console.log(data.rows);

        console.log(data.rows);
        const results = data.rows;
        const templateVars = { results };
        res.render('singlequiz.ejs', templateVars);
        //res.json(data.rows);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

  });

  router.post("/:id/:quiz", (req, res) => {
    const user_id = req.session.user_id;
    const quiz_id = req.session.quiz_id;
    const listed = req.body.listed;
    console.log("listed",listed);
    console.log(quiz_id);
    console.log(user_id);

    const UpdatedListed = function() {
      db.query(`UPDATE quizzes
       SET listed = $3
       WHERE id= $1 AND user_id = $2; `, [quiz_id,user_id, listed]);
    };

    UpdatedListed(quiz_id,user_id,listed);

    res.redirect('/quiz');

  });

  return router;
};
