CREATE TABLE accounts (
  id serial PRIMARY KEY,
  names VARCHAR ( 255 ) NOT NULL,
  last_names VARCHAR ( 255 ) NOT NULL,
  password VARCHAR ( 255 ) NOT NULL,
  email VARCHAR ( 255 ) UNIQUE NOT NULL,
  created_on TIMESTAMP NOT NULL,
  modified_on TIMESTAMP NOT NULL,
  last_login TIMESTAMP
);

CREATE TABLE users (
  id serial PRIMARY KEY,
  names VARCHAR ( 255 ) NOT NULL,
  last_names VARCHAR ( 255 ) NOT NULL,
  email VARCHAR ( 255 ) NULL,
  weight INT NOT NULL,
  height INT NOT NULL,
  affiliation VARCHAR ( 255 ) NOT NULL,
  birth VARCHAR( 255 ) NOT NULL,
  sex VARCHAR ( 255 ) NOT NULL,
  account_id BIGINT REFERENCES accounts (id),
  created_on TIMESTAMP NOT NULL,
  modified_on TIMESTAMP NOT NULL
);

CREATE TABLE evaluations (
       id serial PRIMARY KEY,
       names VARCHAR ( 255 ) NOT NULL,
       last_names VARCHAR ( 255 ) NOT NULL,
       email VARCHAR ( 255 ) NULL,
       weight INT NOT NULL,
       height INT NOT NULL,
       affiliation VARCHAR ( 255 ) NOT NULL,
       birth VARCHAR( 255 ) NOT NULL,
       sex VARCHAR ( 255 ) NOT NULL,
       jump_time DECIMAL NOT NULL,
       jump_height DECIMAL NOT NULL,
       user_id BIGINT REFERENCES users (id),
       account_id BIGINT REFERENCES accounts (id),
       created_on TIMESTAMP NOT NULL,
       modified_on TIMESTAMP NOT NULL
);