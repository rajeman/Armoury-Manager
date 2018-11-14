CREATE DATABASE armoury_manager_test;
\connect armoury_manager_test
DROP TABLE events;
CREATE TABLE IF NOT EXISTS events
 (
 	user_id integer NOT NULL,
    rank_id integer NOT NULL, 
    gun_id integer NOT NULL, 
    event_timestamp bigint PRIMARY KEY NOT NULL,
    action integer NOT NULL,
    insert_timestamp bigint NOT NULL
 );

CREATE TABLE IF NOT EXISTS users
 (
 	user_id integer PRIMARY KEY NOT NULL, 
    user_name text NOT NULL,  
    user_password text NOT NULL,
    user_rank integer NOT NULL
 );

insert into users (user_id, user_name, user_password, user_rank) values (20, 'Armourer Jones', '$2b$07$OFUgtEE03stsi6ujQLqaQOJPj7uX45uTVkb0GfMsZ8Qv8rAQwfjvK', 9);