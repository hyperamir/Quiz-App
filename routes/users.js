/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    console.log(req.session.user_id)
    db.query(`SELECT * FROM quizzes WHERE listed = true;`)
      .then(data => {
        console.log(data.rows)
        res.json(data.rows);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

  });

  router.get('/login/:id', (req, res) => {
    // cookie-session middleware
    const userId = req.params.id;
    req.session.user_id = userId;

    res.redirect('/users');
  });

  return router;
};
