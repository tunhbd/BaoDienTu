DROP TABLE IF EXISTS writers, subscribers, sign_in_history, assigned_categories, post_tags, tags, posts, categories, users;

CREATE TABLE categories
(
  category_id VARCHAR(32) NOT NULL,
  category_name TEXT NOT NULL,
  category_alias TEXT,
  parent_category VARCHAR(32),
  category_active TINYINT DEFAULT 1 NOT NULL,
  post_num INT DEFAULT 0 NOT NULL,
  created_date DATETIME DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY(category_id),

);

CREATE TABLE users
(
  user_account VARCHAR(50) NOT NULL,
  user_password VARCHAR(100) NOT NULL,
  user_fullname TINYTEXT NOT NULL,
  user_email VARCHAR(50) NOT NULL,
  user_birthday DATE,
  user_avatar VARCHAR(60),
  user_status TINYINT DEFAULT 1 NOT NULL,
  user_role VARCHAR(11) NOT NULL,
  -- user_token VARCHAR(32),
  PRIMARY KEY(user_account)
);

CREATE TABLE sign_in_history
(
  user_account VARCHAR(50) NOT NULL,
  user_token VARCHAR(32) NOT NULL,
  user_token_experiation DATETIME NOT NULL,

  PRIMARY KEY(user_account, user_token),
  CONSTRAINT SIGN_IN_HISTORY_REFERENCE_USER FOREIGN KEY(user_account) REFERENCES users(user_account)
);

CREATE TABLE subscribers
(
  user_account VARCHAR(50) NOT NULL,
  expiration_date DATETIME NOT NULL,

  PRIMARY KEY(user_account),
  CONSTRAINT SUBSCRIBER_REFERENCE_USER FOREIGN KEY(user_account) REFERENCES users(user_account)
);

CREATE TABLE writers
(
  user_account VARCHAR(50),
  pseudonym TEXT,

  PRIMARY KEY(user_account),
  CONSTRAINT WRITER_REFERENCE_USER FOREIGN KEY(user_account) REFERENCES users(user_account)
);

CREATE TABLE assigned_categories
(
  user_account VARCHAR(50) NOT NULL,
  category_id VARCHAR(32) NOT NULL,
  disabled_category tinyint DEFAULT 0,

  PRIMARY KEY(user_account, category_id),
  CONSTRAINT ASSIGN_CATEGORY_REFERENCE_USER FOREIGN KEY(user_account) REFERENCES users(user_account),
  CONSTRAINT ASSIGN_CATEGORY_REFERENCE_CATEGORY FOREIGN KEY(category_id) REFERENCES categories(category_id)
);

CREATE TABLE tags
(
  tag_id VARCHAR(32) NOT NULL,
  tag_name TEXT NOT NULL,
  tag_alias TEXT,
  tag_active TINYINT DEFAULT 1,
  post_num INT DEFAULT 0,
  created_date DATETIME DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY(tag_id)
);

CREATE TABLE posts
(
  post_id VARCHAR(32) NOT NULL,
  post_title TEXT
  CHARACTER
  SET utf8
  COLLATE utf8_general_ci NOT NULL,
  post_alias TEXT,
  author VARCHAR
  (50) NOT NULL,
  category VARCHAR
  (32) NOT NULL,
  youtube_url TEXT,
  post_avatar_image VARCHAR
  (40) NOT NULL,
  created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  checked TINYINT DEFAULT 0,
  reason_reject TEXT DEFAULT NULL,
  published_date DATETIME,
  post_summary TEXT NOT NULL,
  post_content LONGTEXT NOT NULL,
  

  PRIMARY KEY
  (post_id),
  FULLTEXT
  (post_title),
  CONSTRAINT POST_TO_CATEGORY FOREIGN KEY
  (category) REFERENCES categories
  (category_id)
);

  CREATE TABLE post_tags
  (
    post_id VARCHAR(32) NOT NULL,
    tag_id VARCHAR(32) NOT NULL,

    PRIMARY KEY(post_id, tag_id),
    CONSTRAINT POST_TAG_REFERENCE_POST FOREIGN KEY(post_id) REFERENCES posts(post_id),
    CONSTRAINT POST_TAG_REFERENCE_TAG FOREIGN KEY(tag_id) REFERENCES tags(tag_id)
  );

  CREATE TABLE comments
  (
    comment_id VARCHAR(32) NOT NULL,
    post_id VARCHAR(32) NOT NULL,
    user_account VARCHAR(50) NOT NULL,
    comment_date DATE NOT NULL,
    comment_content TEXT NOT NULL,

    PRIMARY KEY(comment_id),
    CONSTRAINT COMMENT_REFERENCE_POST FOREIGN KEY(post_id) REFERENCES posts(post_id),
    CONSTRAINT COMMENT_REFERENCE_USER FOREIGN KEY(user_account) REFERENCES users(user_account)
  );

  insert into categories
    (category_id, category_name, category_alias, parent_category)
  values
    ('CATEGORY05062019212730', 'Xã hội', 'xa-hoi', null),
    ('d60302f4367f8232f9469871492c2b7d', 'Kinh tế', 'kinh-te', null),
    ('cf49aaf8d4ab1a2dd3df11ac35968847', 'Nông nghiệp', 'nong-nghiep', 'd60302f4367f8232f9469871492c2b7d'),
    ('d9ac62b003a1839dd953b282ea120916', 'Công nghiệp', 'cong-nghiep', 'd60302f4367f8232f9469871492c2b7d'),
    ('356cad2332f59fcf31b6ca6e7cb221da', 'Thế giới', 'the-gioi', null),
    ('a1c3d04dfd6b7ca10b12de7a7a108ffb', 'Công nghệ', 'cong-nghe', null),
    ('83de934910c68328803a543fb559eb9e', 'Giải trí', 'giai-tri', null),
    ('2b986ded59305dacfa5e8f215f1cb0cf', 'Văn hóa', 'van-hoa', null);
