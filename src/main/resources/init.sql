INSERT INTO users
(id, date_created, date_modified, email, password, confirmed)
VALUES
(1, '2020-01-29', '2020-01-29', 'test@gmail.com', '$2a$04$kDaKwBckpCiw/PFvV4qpqOdMl9oypQVKaXvANn.oeKC9xrGiYdfmO', true);

INSERT INTO users_roles
(user_id, role)
VALUES
(1, 'ADMIN');