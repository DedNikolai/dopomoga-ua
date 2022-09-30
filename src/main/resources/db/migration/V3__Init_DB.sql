create sequence chat_id_seq start 10 increment 1;
create sequence message_id_seq start 10 increment 1;

create table chats (
  id int8 not null,
  date_created timestamp,
  date_modified timestamp,
  primary key (id)
);

create table chats_users (
  chat_id int8 not null,
  user_id int8 not null,
  primary key (chat_id, user_id)
)

create table message (
  id int8 not null,
  date_created timestamp,
  date_modified timestamp,
  text varchar(255),
  chat int8,
  user int8,
  primary key (id)
)

