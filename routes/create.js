const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render('create.ejs');
  });


  router.post('/', (req, res) => {
    console.log(req.body);
    console.log(req.params);
  //   const quiz = req.body.quiz;
  //   const category = req.body.category;
  //   const question = req.body.question;
  //   const answerA =
  })

  return router
};
