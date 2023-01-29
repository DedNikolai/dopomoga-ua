INSERT INTO chats
  (id, date_created, date_modified)
VALUES
  (1, '2020-01-29', '2020-01-29'),
  (2, '2020-01-29', '2020-01-29');

INSERT INTO chats_users
  (chat_id, user_id)
VALUES
  (1, 1),
  (1, 2);

INSERT INTO message
  (id, date_created, date_modified, text, chat, owner, is_read)
VALUES
  (1, '2020-01-29', '2020-01-29', 'Hello, how ara you', 1, 1, true),
  (2, '2020-01-30', '2020-01-29', 'Hy, I am fine and you', 1, 2, false );


