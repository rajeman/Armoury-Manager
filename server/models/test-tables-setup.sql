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
DROP TABLE users;
CREATE TABLE IF NOT EXISTS users
 (
 	user_id integer PRIMARY KEY NOT NULL, 
    user_name text UNIQUE,
    name text NOT NULL,  
    user_password text NOT NULL,
    user_rank integer NOT NULL
 );


insert into users (user_id, name, user_name, user_password, user_rank) values (91, 'Armourer Jones','armourer_jones', '$2b$06$IMxF7mAzHCICTkAm4Xn8XOZcw/S0VI7wwXOkpaWv3e288/bli/YCa', 9);