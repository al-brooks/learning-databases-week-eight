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

-- createing a couple more test users:
INSERT INTO blog_users(
  	first_name,
  	last_name,
  	user_name,
  	user_email
  )
VALUES
('eddy', 'testerthree', 'tester-three', 'test3@gmail.com'),
('veronica', 'testerfour', 'tester-four', 'test4@gmail.com')
  
-- create test posts (based on test users)
INSERT INTO blog_posts(title, body, is_published, user_id)
VALUES
('Hiking', 'Beautiful views', true, 1),
('Got a new puppy!', 'Welcome to the family :)', true, 2),
('New workout', 'I"ll get it down eventually', true, 2),
('New city, who this?', 'Call me senora LA', true, 1)

-- creating new posts
INSERT INTO blog_posts(title, body, is_published, user_id)
VALUES
('Rome Trip', 'Such a great time!', true, 3),
('Puppy training!', 'He knows how to sit now! haha', true, 2),
('Bike route advice', 'Anyone know a good bike path in the city?', true, 4),
('Flat tires are the worst!', '....of course!', true, 4)

-- creating test comments
-- post_id to link to post, the user_id is of the user who created the comment
INSERT INTO blog_comments(title, body, is_published, post_id, user_id)
VALUES
('Awesome trip', 'Where is this? I need to check it out!', true, 1, 3),
('So cute!', 'Love this!', true, 2, 1),
('Some advice', 'Get them on a potty schedule!!', true, 2, 4),
('Okay cool', 'At least you"re challenging yourself!', true, 3, 2),
('Path 400', 'It"s not the longest trail but Path 400 is really cool', true, 11, 3)

-- displaying the number of comments per post
SELECT
posts.post_id,
COUNT(comments.post_id) AS "Number Of Comments"
FROM blog_posts AS posts
INNER JOIN blog_comments AS comments
ON posts.post_id = comments.post_id
GROUP BY posts.post_id