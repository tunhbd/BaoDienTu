DROP TABLE IF EXISTS categories;
CREATE TABLE categories(
  category_id VARCHAR(32) NOT NULL,
  category_name TEXT(100) NOT NULL,
  parent_category VARCHAR(10),
  category_active INT DEFAULT 1 NOT NULL,
  post_num INT DEFAULT 0 NOT NULL,
  created_date DATE NOT NULL,

  PRIMARY KEY(category_id)
);
DROP TABLE IF EXISTS users;
CREATE TABLE users(
  user_account VARCHAR(50) NOT NULL,
  user_password VARCHAR(100) NOT NULL,
  user_fullname TEXT(100) NOT NULL,
  user_email VARCHAR(50) NOT NULL,
  user_birthday DATE,
  user_avatar VARCHAR(60),
  user_status INT DEFAULT 1 NOT NULL,
  user_role VARCHAR(11) NOT NULL,
  
  PRIMARY KEY(user_account)
);
DROP TABLE IF EXISTS subscribers;
CREATE TABLE subscribers(
  user_account VARCHAR(50) NOT NULL,
  expiration_date DATE NOT NULL,
  
  PRIMARY KEY(user_account),
  CONSTRAINT SUBSCRIBER_REFERENCE_USER FOREIGN KEY(user_account) REFERENCES users(user_account)
);
DROP TABLE IF EXISTS writers;
CREATE TABLE writers(
  user_account VARCHAR(50),
  pseudonym TEXT(100),
  
  PRIMARY KEY(user_account),
  CONSTRAINT WRITER_REFERENCE_USER FOREIGN KEY(user_account) REFERENCES users(user_account)
);
DROP TABLE IF EXISTS assigned_categories;
CREATE TABLE assigned_categories(
  user_account VARCHAR(50) NOT NULL,
  category_id VARCHAR(32) NOT NULL,
  disabled_category INT DEFAULT 0,
  
  PRIMARY KEY(user_account, category_id),
  CONSTRAINT ASSIGN_CATEGORY_REFERENCE_USER FOREIGN KEY(user_account) REFERENCES users(user_account),
  CONSTRAINT ASSIGN_CATEGORY_REFERENCE_CATEGORY FOREIGN KEY(category_id) REFERENCES categories(category_id)
);
DROP TABLE IF EXISTS tags;
CREATE TABLE tags(
  tag_id VARCHAR(32) NOT NULL,
  tag_name TEXT(50) NOT NULL,
  tag_active INT DEFAULT 1,
  post_num INT DEFAULT 0,
  created_date DATE NOT NULL,
  
  PRIMARY KEY(tag_id)
);
DROP TABLE IF EXISTS post;
CREATE TABLE posts(
  post_id VARCHAR(32) NOT NULL,
  post_title TEXT(200) NOT NULL,
  author VARCHAR(50) NOT NULL,
  category VARCHAR(32) NOT NULL,
  youtube_url TEXT(200),
  post_avatar_image VARCHAR(20) NOT NULL,
  created_date DATE NOT NULL,
  published_date DATE,
  post_summary TEXT NOT NULL,
  post_content TEXT NOT NULL,
  
  PRIMARY KEY(post_id),
  CONSTRAINT POST_TO_CATEGORY FOREIGN KEY(category) REFERENCES categories(category_id)
);
DROP TABLE IF EXISTS post_tags;
CREATE TABLE post_tags(
  post_id VARCHAR(32) NOT NULL,
  tag_id VARCHAR(32) NOT NULL,
  
  PRIMARY KEY(post_id, tag_id),
  CONSTRAINT POST_TAG_REFERENCE_POST FOREIGN KEY(post_id) REFERENCES posts(post_id),
  CONSTRAINT POST_TAG_REFERENCE_TAG FOREIGN KEY(tag_id) REFERENCES tags(tag_id)
);