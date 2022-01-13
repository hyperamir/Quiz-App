/* eslint-disable camelcase */
/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const { user } = require('pg/lib/defaults');
const router = express.Router();

module.exports = (db) => {
  router.get("/:id", (req, res) => {
    const quiz_id = req.params.id;
    req.session.quiz_id = quiz_id;
    //req.session.params_id = ;

    db.query(`SELECT questions.id FROM questions WHERE quiz_id = $1 LIMIT 1;`, [quiz_id])
      .then((data) => {
        //return data.rows[0];
        const firstQuestion = data.rows[0].id;

        db.query(`SELECT questions.id FROM questions WHERE quiz_id = $1 ORDER BY questions.id DESC LIMIT 1;`, [quiz_id])
          .then((data) => {
            // return data.rows[0];
            const lastQuestion = data.rows[0].id;
            //console.log("first and last question",firstQuestion, lastQuestion);

            db.query(`SELECT questions.text AS question, answers.text as answer, quizzes.name AS title
    FROM questions
    JOIN quizzes ON quizzes.id = quiz_id
    JOIN answers ON questions.id = question_id
    WHERE questions.id BETWEEN $1 AND $2
    GROUP BY question,answer,title,questions.id
    ORDER BY questions.id;` , [firstQuestion, lastQuestion])
              .then(data => {
                const results = data.rows;  //
                //console.log("data rows @ get route", data.rows);
                const templateVars = { results };//
                res.render('take.ejs', templateVars); //
                //res.json(data.rows[0]);
              });
          });


      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });


  });

  router.post("/:id", (req, res) => {

    // on submit insert the data to the database "users_quizzes"

    //const quiz_id = req.params.id;
    const quiz_id = req.session.quiz_id;
    const user_id = req.session.user_id;
    //console.log("user",user);
    //console.log('req.body',req.body);
    //console.log('quiz_id', quiz_id);
    //console.log('user_id', user_id);
    const usersAnswers = [
      req.body.q1option,
      req.body.q2option,
      req.body.q3option,
      req.body.q4option,
      req.body.q5option
    ];
    console.log("usersAnswers",usersAnswers);

    db.query(`SELECT answers.text FROM answers
      JOIN questions ON questions.id = question_id
      JOIN quizzes ON quizzes.id = quiz_id
      WHERE correct = true
      AND quiz_id = $1
      ORDER BY question_id;`, [quiz_id])
      .then(data => {
        const results = data.rows;  //
        console.log("post results", results);

        const correctAnswers = [
          results[0].text,
          results[1].text,
          results[2].text,
          results[3].text,
          results[4].text,
        ];

        const score = getScore(usersAnswers, correctAnswers);
        console.log('score', score);

        //where we have access to score so we need to insert here
        const saveAttempt = function() {
          db.query(`INSERT INTO users_quizzes (quiz_id, user_id, correct)
           VALUES ($1,$2,$3)`, [quiz_id,user_id, score]);
        };

        saveAttempt(quiz_id,user_id,score);

        res.redirect(`/myquizzes/taken/${user_id}`);


      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });


  });

  return router;

};


const getScore = function (array1, array2) {
  let score = 0;

  for (let i = 0; i < array1.length; i++) {
    if (array1[i] === array2[i]) {
      score++;
    }
  }
  return score;

};

