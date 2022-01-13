/* eslint-disable camelcase */
/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/:id", (req, res) => {
    const quiz_id = req.params.id;
    //req.session.params_id = ;

    db.query(`SELECT questions.id FROM questions WHERE quiz_id = $1 LIMIT 1;`, [quiz_id])
      .then((data) => {
        //return data.rows[0];
        const firstQuestion = data.rows[0].id;

        db.query(`SELECT questions.id FROM questions WHERE quiz_id = $1 ORDER BY questions.id DESC LIMIT 1;`, [quiz_id])
          .then((data) => {
            // return data.rows[0];
            const lastQuestion = data.rows[0].id;
            console.log(firstQuestion, lastQuestion);

            console.log(lastQuestion);
            db.query(`SELECT questions.text AS question, answers.text as answer, quizzes.name AS title
    FROM questions
    JOIN quizzes ON quizzes.id = quiz_id
    JOIN answers ON questions.id = question_id
    WHERE questions.id BETWEEN $1 AND $2` , [firstQuestion, lastQuestion])
              .then(data => {
                const results = data.rows;  //
                console.log(data.rows);
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
    const user_id = req.session.id;
    console.log(req.body);

    const usersAnswers = [
      req.body.q1option,
      req.body.q2option,
      req.body.q3option,
      req.body.q4option,
      req.body.q5option
    ];
    console.log(usersAnswers);

    // `INSERT INTO users_quizzes (quiz_id, user_id, correct)
    // VALUES ($1,$2,$3)`, [quiz_id,user_id,];
    const correct = function() {
      //array of users answers
      //get database answers
      // look at the true and false in the answers table
      // for each correct integer++


      // need a function that compares users chosen answers with db answers
      // return a single value, the number of correct answers they have
      // this function returns the value for users_quizzes.correct
    };

      db.query(`SELECT answers.text FROM answers
      JOIN questions ON questions.id = question_id
      JOIN quizzes ON quizzes.id = quiz_id
      WHERE correct = true
      AND quiz_id = $1;`, [quiz_id])
      .then(data => {
        const results = data.rows;  //
        console.log(results);

        const correctAnswers = [
          results[0].text,
          results[1].text,
          results[2].text,
          results[3].text,
          results[4].text,
        ]
        const score = getScore(usersAnswers, correctAnswers)
        console.log(score);

      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
      // this query returns ALL the correct answers for a given quiz AS A COLUMN
      //> how do i make this into an array

      //const integer = 0;
      //return integer;

  });


  return router;



};


const getScore = function (array1, array2) {
  let score = 0;

  for (let i = 0; i < 6; i++) {
    if (array1[i] === array2[i]) {
      score += 1
    }
  }
  return score;

}

