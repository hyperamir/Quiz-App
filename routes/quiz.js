/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    // db.query(`SELECT questions.text AS question, answers.text AS answer
    // FROM questions JOIN answers ON questions.id = question_id
    // WHERE user_id = 1`)
    fetchQuestion(db, 1)
      .then(data => {
        console.log(data)
        res.json(data);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

  });

  router.get('/')

  return router;
};

const fetchQuestion = function (db, quizId) {
  const query = `
  SELECT questions.text, id FROM questions
  WHERE quiz_id = $1;
  `
  return db.query(query, [quizId])
    .then((result) => {
      console.log(result.rows)
      return new Promise((resolve, reject) => {
        const promises = [];
        const questions = [];
        result.rows.map((question) => {
          const p = fetchAnswers(db, question.id);
          promises.push(p);

          p.then((options) => {
            questions.push({
              question: question.text,
              answers: options
            })
          })

        })
        Promise.all(promises).then(() => {
          resolve(questions);
        })
      })
    });
}

const fetchAnswers = function (db, questionId) {
  const query = `
  SELECT answers.text FROM answers
  WHERE question_id = $1;
  `
  return db.query(query, [questionId])
    .then((result) => {
      return result.rows;
    });
}
