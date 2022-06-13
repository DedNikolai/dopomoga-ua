INSERT INTO users
(id, date_created, date_modified, email, password, confirmed)
VALUES
(1, '2020-01-29', '2020-01-29', 'test@gmail.com', '$2a$04$kDaKwBckpCiw/PFvV4qpqOdMl9oypQVKaXvANn.oeKC9xrGiYdfmO', true),
(2, '2020-01-29', '2020-01-29', 'nikolai.blashchuk@gmail.com', '$2a$04$kDaKwBckpCiw/PFvV4qpqOdMl9oypQVKaXvANn.oeKC9xrGiYdfmO', true);

INSERT INTO users_roles
(user_id, role)
VALUES
(1, 'ADMIN');

INSERT INTO needs_category
(id, date_created, date_modified, category_name)
VALUES
(1, '2020-01-29', '2020-01-29', 'Category #1'),
(2, '2020-01-29', '2020-01-29', 'Category #2');

INSERT INTO needs
(id, date_created, date_modified, title, description, user_id, is_active, region)
VALUES
(1, '2020-01-29', '2020-01-29', 'Need #1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat', 1, true, 'REGION1'),
(2, '2020-01-29', '2020-01-29', 'Need #2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat', 2, true, 'REGION2'),
(3, '2020-01-29', '2020-01-29', 'Need #3', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat', 2, true, 'REGION3');

INSERT INTO categories_needs
(category_id, need_id)
VALUES
(1, 1),
(2, 1),
(2, 2),
(2, 3);
