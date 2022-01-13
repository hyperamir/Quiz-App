/* eslint-disable camelcase */
const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/questions", (req, res) => {
    res.render('create.ejs');
  });

  router.post('/questions', (req, res) => {

    const userId = req.session.user_id;
    console.log(userId);
    //console.log(req.body);
    const name = req.body.quiz;
    const category = req.body.category;
    const questions = [req.body.question1, req.body.question2, req.body.question3, req.body.question4, req.body.question5];
    const correct = [req.body.correct1, req.body.correct2, req.body.correct3, req.body.correct4, req.body.correct5];
    console.log('correct: ', correct);

    const answers = [
      [req.body.correct1, req.body.answerb1, req.body.answerc1, req.body.answerd1],
      [req.body.correct2, req.body.answerb2, req.body.answerc2, req.body.answerd2],
      [req.body.correct3, req.body.answerb3, req.body.answerc3, req.body.answerd3],
      [req.body.correct4, req.body.answerb4, req.body.answerc4, req.body.answerd4],
      [req.body.correct5, req.body.answerb5, req.body.answerc5, req.body.answerd5],
    ];


    saveQuiz(db, userId, name, category, true)
      .then(quizId => {
        questions.forEach((question, index) => {
          saveQuestion(db, quizId, questions[index])
            .then(questionId => {
              answers[index].forEach(answer => {
                console.log(answer,'index:', correct[index]);
                saveAnswer(db, questionId, answer, correct[index]);
              });
            });
        });
      });
    res.redirect('/quiz');
  });

  return router;
};


const saveQuiz = function(db, user_id, name, category, listed) {
  const query = `
      INSERT INTO quizzes(user_id, name, category, listed)
      VALUES ($1, $2, $3, $4)
      RETURNING id AS quiz_id
      `;

  return db.query(query, [user_id, name, category, listed])
    .then((result) => {
      return result.rows[0].quiz_id;
    });
};

const saveQuestion = function(db, quizId, question) {
  const query = `
  INSERT INTO questions (quiz_id, text)
  VALUES ($1, $2)
  RETURNING id AS question_id
  `;

  return db.query(query, [quizId, question])
    .then((result) => {
      return result.rows[0].question_id;
    });
};

const saveAnswer = function(db, questionId, answer, correct) {
  const query = `
  INSERT INTO answers(question_id, text, correct)
  VALUES ($1, $2, $3)
  `;
  console.log('check:', correct === answer);
  const check = correct === answer;

  return db.query(query, [questionId, answer, check]);
};

