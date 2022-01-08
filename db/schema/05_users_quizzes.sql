-- Drop and recreate users_quizzes table

DROP TABLE IF EXISTS users_quizzes CASCADE;
CREATE TABLE users_quizzes (
  question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  PRIMARY KEY (question_id, user_id),
  correct INTEGER NOT NULL,
  url VARCHAR(255) NOT NULL
);
