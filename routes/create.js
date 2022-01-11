const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render('create.ejs');
  });

  router.post('/', (req, res) => {

    const userId = req.session.user_id;
    console.log(userId);
    console.log(req.body);
    const name = req.body.quiz;
    const category = req.body.category;
    const question = req.body.question;
    const correct = req.body.correct;
    const answerB = req.body.answerb;
    const answerC = req.body.answerc;
    const answerD = req.body.answerd;

    // const query = `
    //   INSERT INTO quizzes (user_id, name, created_at,url, category, listed)
    //   VALUES ($1, $2, $3, $4, $5, $6);
    // `
    const query = `
<<<<<<< HEAD
    WITH ins1 AS (
      INSERT INTO quizzes(user_id, name, url, category, listed)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id AS quiz_id
      )
   , ins2 AS (
      INSERT INTO questions (quiz_id, text)
      VALUES ((SELECT quiz_id FROM ins1), $6)
      RETURNING id AS question_id
      )
=======
      INSERT INTO quizzes (user_id, name, created_at,url, category, listed)
      VALUES ($1, $2, $3, $4, $5, $6);
    `
    const values = [userId, name, 'now()', 'http://localhost:8080/quiz/beq9n', category, 'true']

    const quizId = `SELECT id FROM quizzes ORDER BY created_at DESC LIMIT 1;`
    // const quiz_id = db.query(quizId)
    // .then((result)=>{
    //   return result.rows[0];
    // })
    // ;

    //console.log(quiz_id)
    const questionQuery = `
      INSERT INTO questions (SELECT id FROM quizzes ORDER BY created_at DESC LIMIT 1;, text)
      VALUES ($1);
    `
    const questionValues = [ question];

    const answerAQuery = `
      INSERT INTO answers (question_id, text, correct)
      VALUES ($1, $2, $3);
    `
    const answerAValues = [6, correct, 'true'];

    const answerBQuery = `
>>>>>>> fcb4a976754c7ce63349cf5abb4b51f87cc86315
      INSERT INTO answers (question_id, text, correct)
      VALUES ( (select question_id from ins2), $7, $8),
      ( (select question_id from ins2), $9, $10),
      ( (select question_id from ins2), $11, $12),
      ( (select question_id from ins2), $13, $14);
    `
<<<<<<< HEAD
      // update url to be dynamic
    const values = [userId, name, 'http://localhost:8080/quiz/beq9n', category, 'true', question, correct, 'true', answerB, 'false',  answerC, 'false', answerD, 'false'];
=======
    const answerBValues = [6, answerB, 'false'];
    const answerCQuery = `
      INSERT INTO answers (question_id, text, correct)
      VALUES ($1, $2, $3);
    `
    const answerCValues = [6, answerC, 'false'];
    const answerDQuery = `
      INSERT INTO answers (question_id, text, correct)
      VALUES ($1, $2, $3);
    `
    const answerDValues = [6, answerD, 'false'];




    db.query(questionQuery, questionValues);
    db.query(answerAQuery, answerAValues);
    db.query(answerBQuery, answerBValues);
    db.query(answerCQuery, answerCValues);
    db.query(answerDQuery, answerDValues);
>>>>>>> fcb4a976754c7ce63349cf5abb4b51f87cc86315

    db.query(query, values)
      .then(() => {
        res.redirect('/users');
      })
  })

  return router;
};
