const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render('create.ejs');
  });

<<<<<<< HEAD

  router.post('/', (req, res) => {
    console.log(req.body);
    console.log(req.params);
  //   const quiz = req.body.quiz;
  //   const category = req.body.category;
  //   const question = req.body.question;
  //   const answerA =
=======
  router.post('/:id', (req, res) => {

    const userId = req.session.id
    console.log(req.body)
    const quiz = req.body.quiz;
    const category = req.body.category;
    const question = req.body.question;
    const correct = req.body.correct;
    const answerB = req.body.answerb;
    const answerC = req.body.answerc;
    const answerD = req.body.answerd;

    const query = `
      INSERT INTO quizzes (user_id, name, created_at,url, category, listed)
      VALUES ()
    `
>>>>>>> 043d024f17247496860aaefc6057357be885fd9e
  })

  return router
};
