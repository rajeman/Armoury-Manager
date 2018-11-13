CREATE DATABASE armoury_manager;
\connect armoury_manager
CREATE TABLE IF NOT EXISTS events
 (
 	user_id integer NOT NULL,
    rank_id integer NOT NULL, 
    gun_id integer NOT NULL, 
    event_timestamp bigint NOT NULL,
    action integer NOT NULL,
    insert_timestamp bigint NOT NULL
 );
