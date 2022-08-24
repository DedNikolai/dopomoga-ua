INSERT INTO user_photo
(id, date_created, date_modified, photo_name, location)
VALUES
(1, '2020-01-29', '2020-01-29', 'photo1', 'https://childdevelopment.com.au/wp-content/uploads/what-is-child-development.jpg'),
(2, '2020-01-29', '2020-01-29', 'photo2', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhsPurdrBuEZegVOC7f70_TMTqb-owyXms4g&usqp=CAU');

INSERT INTO users
(id, date_created, date_modified, email, password, confirmed, first_name, last_name, phone, photo_id)
VALUES
(1, '2020-01-29', '2020-01-29', 'test@gmail.com', '$2a$04$kDaKwBckpCiw/PFvV4qpqOdMl9oypQVKaXvANn.oeKC9xrGiYdfmO', true, 'Test', 'Testovich', '063-123-45-67', 1),
(2, '2020-01-29', '2020-01-29', 'nikolai.blashchuk@gmail.com', '$2a$04$kDaKwBckpCiw/PFvV4qpqOdMl9oypQVKaXvANn.oeKC9xrGiYdfmO', true, 'Nick', 'Blashchuk', '063-621-37-29', 2);

INSERT INTO users_roles
(user_id, role)
VALUES
(1, 'ADMIN'),
(2, 'USER');

INSERT INTO category
(id, date_created, date_modified, category_name)
VALUES
(1, '2020-01-29', '2020-01-29', 'Category1'),
(3, '2020-01-29', '2020-01-29', 'Category3'),
(2, '2020-01-29', '2020-01-29', 'Category2');

INSERT INTO region
(id, date_created, date_modified, region_name)
VALUES
(1, '2020-01-29', '2020-01-29', 'REGION1'),
(3, '2020-01-29', '2020-01-29', 'REGION_#3'),
(2, '2020-01-29', '2020-01-29', 'REGION2');

INSERT INTO needs
(id, date_created, date_modified, title, description, user_id, is_active, region)
VALUES
(1, '2020-01-29 13:10:00', '2020-01-29', 'Need #1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat', 1, true, 1),
(2, '2020-01-29 13:15:00', '2020-01-29', 'Need #2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat', 2, true, 1),
(3, '2020-01-29 13:20:00', '2020-01-29', 'Need #3', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat', 2, true, 2);

INSERT INTO categories_needs
(category_id, need_id)
VALUES
(1, 1),
(2, 1),
(2, 2),
(2, 3);

INSERT INTO proposal
(id, date_created, date_modified, title, description, user_id, is_active, region)
VALUES
(1, '2020-01-29 13:10:00', '2020-01-29', 'Proposal #1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat', 1, true, 1),
(2, '2020-01-29 13:15:00', '2020-01-29', 'Proposal #2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat', 2, true, 1),
(3, '2020-01-29 13:20:00', '2020-01-29', 'Proposal #3', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat', 2, true, 2);

INSERT INTO categories_propositions
(category_id, proposal_id)
VALUES
(1, 1),
(2, 1),
(2, 2),
(2, 3);