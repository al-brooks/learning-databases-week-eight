-- complete:  Create Posts Table

-- code-block: |
-- CREATE TABLE blog_posts (
-- 	    post_id SERIAL PRIMARY KEY,
--   	title VARCHAR(200),
--   	body TEXT,
--   	date_created timestamp DEFAULT current_timestamp,
--   	date_updated timestamp DEFAULT current_timestamp,
--   	is_published BOOLEAN DEFAULT FALSE
-- )

-- complete:  Select all posts:
-- SELECT* 
-- FROM blog_posts

-- complete:  Create Users Table

-- code-block: |
-- CREATE TABLE blog_users (
-- 	    user_id SERIAL PRIMARY KEY,
--   	first_name VARCHAR(20),
--   	last_name VARCHAR(30),
--   	user_name TEXT UNIQUE,
--   	user_email TEXT UNIQUE
-- )

 -- complete:  Adding in Foreign Key to blog_posts

-- code-block: |
-- ALTER TABLE blog_posts
-- ADD COLUMN user_id INTEGER REFERENCES blog_users (user_id)

-- complete:  Insert test users via SQL

-- code-block: |
-- INSERT INTO blog_users(
--   	first_name,
--   	last_name,
--   	user_name,
--   	user_email
--   )
--   VALUES
--   ('james', 'testerone', 'tester-one', 'test1@gmail.com'),
--   ('milly', 'testertwo', 'tester-two', 'test2@gmail.com')


-- note:  sample join statement
-- code-block: |
-- SELECT
-- users.user_id,
-- users.first_name,
-- users.last_name,
-- posts.title,
-- posts.body,
-- posts.date_created
-- FROM blog_users as users
-- INNER JOIN blog_posts as posts ON users.user_id = posts.user_id



