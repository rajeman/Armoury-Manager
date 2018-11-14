CREATE DATABASE armoury_manager;
\connect armoury_manager
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
    user_name text,
    name text NOT NULL,  
    user_password text NOT NULL,
    user_rank integer NOT NULL
 );
