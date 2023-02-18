create sequence hibernate_sequence start 10 increment 1;
create sequence category_id_seq start 10 increment 1;
create sequence chat_id_seq start 10 increment 1;
create sequence confirmation_token_id_seq start 10 increment 1;
create sequence message_id_seq start 10 increment 1;
create sequence need_id_seq start 10 increment 1;
create sequence password_reset_token_id_seq start 10 increment 1;
create sequence proposal_id_seq start 10 increment 1;
create sequence region_id_seq start 10 increment 1;
create sequence user_id_seq start 10 increment 1;
create sequence user_photo_id_seq start 10 increment 1;

create table if not exists categories_needs (
    need_id int8 not null,
    category_id int8 not null,
    primary key (need_id, category_id)
);

create table if not exists categories_propositions (
    proposal_id int8 not null,
    category_id int8 not null,
    primary key (proposal_id, category_id)
);

create table if not exists category (
    id int8 not null,
    date_created timestamp,
    date_modified timestamp,
    category_name varchar(255),
    primary key (id)
);

create table if not exists chats (
    id int8 not null,
    date_created timestamp,
    date_modified timestamp,
    primary key (id)
);

create table if not exists chats_users (
  chat_id int8 not null,
  user_id int8 not null,
  primary key (chat_id, user_id)
);

create table if not exists confirmation_token (
    token_id int8 not null,
    confirmation_token varchar(255),
    created_date timestamp,
    user_id int8 not null,
    primary key (token_id)
);

create table if not exists message (
    id int8 not null,
    date_created timestamp,
    date_modified timestamp,
    text varchar(255),
    chat int8,
    owner int8,
    is_read boolean default false,
    recipient int8,
    primary key (id)
);

create table if not exists needs (
    id int8 not null,
    date_created timestamp,
    date_modified timestamp,
    description varchar(255),
    is_active boolean,
    title varchar(255),
    region int8,
    user_id int8,
    primary key (id)
);

create table if not exists password_reset_token (
    id int8 not null,
    expiry_date timestamp,
    token varchar(255),
    user_id int8 not null,
    primary key (id)
);

create table if not exists proposal (
    id int8 not null,
    date_created timestamp,
    date_modified timestamp,
    description varchar(255),
    is_active boolean,
    title varchar(255),
    region int8,
    user_id int8,
    primary key (id)
);

create table if not exists region (
    id int8 not null,
    date_created timestamp,
    date_modified timestamp,
    region_name varchar(255),
    primary key (id)
);

create table if not exists user_photo (
    id int8 not null,
    date_created timestamp,
    date_modified timestamp,
    location varchar(255),
    photo_name varchar(255),
    primary key (id)
);

create table if not exists users (
    id int8 not null,
    date_created timestamp,
    date_modified timestamp,
    confirmed boolean default false,
    email varchar(255),
    first_name varchar(255),
    last_name varchar(255),
    password varchar(255),
    phone varchar(255),
    photo_id int8,
    primary key (id)
);

create table if not exists users_roles (
    user_id int8 not null,
    role varchar(255)
);

alter table if exists categories_needs
    add constraint FKsuckakoeo9qywqpn0ixuqwh2f
    foreign key (category_id) references category;

alter table if exists categories_needs
    add constraint FKdlm7jbak9nbdvg0il2e0p5shh
    foreign key (need_id) references needs;

alter table if exists categories_propositions
    add constraint FK5arp8ifgoafb7nhftjkko1xjq
    foreign key (category_id) references category;

alter table if exists categories_propositions
    add constraint FKq1yhloki35tq3n3admrjthgoy
    foreign key (proposal_id) references proposal;

alter table if exists chats_users
    add constraint FKel3edus31mycq8mm6gis7ei9
    foreign key (user_id) references users;

alter table if exists chats_users
    add constraint FKq1qn1fsgj8yr4ftcsrtxn7t6k
    foreign key (chat_id) references chats;

alter table if exists confirmation_token
    add constraint FKah4p1rycwibwm6s9bsyeckq51
    foreign key (user_id) references users;

alter table if exists message
    add constraint FKeeh3jda0302u9mrntv63kdhlb
    foreign key (chat) references chats;

alter table if exists message
    add constraint FKdakuwgnm39b2kl5tr32a4062n
    foreign key (owner) references users;

alter table if exists needs
    add constraint FK1sltfj5v775qrcr962791r1uw
    foreign key (region) references region;

alter table if exists needs
    add constraint FKga3vwiae2o71k3vwjk4frqe9d
    foreign key (user_id) references users;

alter table if exists password_reset_token
    add constraint FK83nsrttkwkb6ym0anu051mtxn
    foreign key (user_id) references users;

alter table if exists proposal
    add constraint FK990svlh9peserd0nfw4uecy8k
    foreign key (region) references region;

alter table if exists proposal
    add constraint FKemv61ye7eke2swbwg3to7fmg3
    foreign key (user_id) references users;

alter table if exists users
    add constraint FK3p8n09rjwoamwsaabes357f98
    foreign key (photo_id) references user_photo;

alter table if exists users_roles
    add constraint FK2o0jvgh89lemvvo17cbqvdxaa
    foreign key (user_id) references users;