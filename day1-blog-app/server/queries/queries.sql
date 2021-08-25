

-- complete:  Select all posts:
-- SELECT* 
-- FROM blog_posts

-- complete:  Add a post:
-- insert into blog_posts just have user_id be the default value of 1
-- INSERT INTO blog_posts(title, body, is_published, user_id)
-- VALUES ('Go to mall', 'Buy face wash', true, 2)

-- New Database Queries

-- create blog_users table
CREATE TABLE blog_users (
	user_id SERIAL PRIMARY KEY,
  	first_name VARCHAR(20),
  	last_name VARCHAR(30),
  	user_name TEXT UNIQUE,
  	user_email TEXT UNIQUE,
  	user_password VARCHAR(300)
)

-- create blog_posts table
CREATE TABLE blog_posts (
	post_id SERIAL PRIMARY KEY,
  	title VARCHAR(200),
  	body TEXT,
  	date_created timestamp DEFAULT current_timestamp,
  	date_updated timestamp DEFAULT current_timestamp,
  	is_published BOOLEAN DEFAULT FALSE,
    user_id INTEGER REFERENCES blog_users (user_id) ON DELETE CASCADE
)

-- create blog_comments table
CREATE TABLE blog_comments (
	comment_id SERIAL PRIMARY KEY,
  	title VARCHAR(200),
  	body TEXT,
  	date_created timestamp DEFAULT current_timestamp,
  	date_updated timestamp DEFAULT current_timestamp,
  	is_published BOOLEAN DEFAULT FALSE,
    post_id INTEGER REFERENCES blog_posts (post_id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES blog_users (user_id) ON DELETE CASCADE
)

-- create test users (no passwords for now)
INSERT INTO blog_users(
  	first_name,
  	last_name,
  	user_name,
  	user_email
  )
VALUES
('james', 'testerone', 'tester-one', 'test1@gmail.com'),
('milly', 'testertwo', 'tester-two', 'test2@gmail.com')
  
-- create test posts (based on test users)
INSERT INTO blog_posts(title, body, is_published, user_id)
VALUES
('Hiking', 'Beautiful views', true, 1),
('Got a new puppy!', 'Welcome to the family :)', true, 2),
('New workout', 'I"ll get it down eventually', true, 2),
('New city, who this?', 'Call me senora LA', true, 1)