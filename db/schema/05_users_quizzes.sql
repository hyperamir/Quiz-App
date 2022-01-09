-- Drop and recreate users_quizzes table

DROP TABLE IF EXISTS users_quizzes CASCADE;
CREATE TABLE users_quizzes (
  quiz_id INTEGER REFERENCES quizzes(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  PRIMARY KEY (question_id, user_id),
  correct INTEGER NOT NULL,
  url VARCHAR(255) NOT NULL
);
