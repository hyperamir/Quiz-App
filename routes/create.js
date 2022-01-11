const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render('create.ejs');
  });

<<<<<<< HEAD
  router.post('/:id', (req, res) => {

    const userId = req.session.id
    console.log(req.body)
    const quiz = req.body.quiz;
=======
  router.post('/', (req, res) => {

    const userId = req.session.user_id;
    console.log(userId);
    console.log(req.body);
    const name = req.body.quiz;
>>>>>>> 9e16a1bfaca62b0852830ea93b4b63977d6707f2
    const category = req.body.category;
    const question = req.body.question;
    const correct = req.body.correct;
    const answerB = req.body.answerb;
    const answerC = req.body.answerc;
    const answerD = req.body.answerd;

    const query = `
      INSERT INTO quizzes (user_id, name, created_at,url, category, listed)
      VALUES ($1, $2, $3, $4, $5, $6);
    `
    const values = [userId, name, 'now()', 'http://localhost:8080/quiz/beq9n', category, 'true']

    const questionQuery = `
      INSERT INTO questions (quiz_id, text)
      VALUES ($1, $2);
    `
    const questionValues = [5, question];

    const answerAQuery = `
      INSERT INTO answers (question_id, text, correct)
      VALUES ($1, $2, $3);
    `
    const answerAValues = [6, correct, 'true'];

    const answerBQuery = `
      INSERT INTO answers (question_id, text, correct)
      VALUES ($1, $2, $3);
    `
<<<<<<< HEAD
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

    db.query(query, values)
      .then(() => {
        res.redirect('/users');
      })
>>>>>>> 9e16a1bfaca62b0852830ea93b4b63977d6707f2
  })

  return router;
};
