-- Drop and recreate quizzes table

DROP TABLE IF EXISTS quizzes CASCADE;

CREATE TABLE quizzes (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT Now(),
  url VARCHAR (255),
  category VARCHAR(255),
  listed BOOLEAN DEFAULT TRUE
);
