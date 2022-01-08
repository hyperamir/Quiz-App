-- Drop and recreate answers table

DROP TABLE IF EXISTS answers CASCADE;
CREATE TABLE answers (
  id SERIAL PRIMARY KEY NOT NULL,
  question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE,
  text VARCHAR(255) NOT NULL,
  correct BOOLEAN NOT NULL
);
