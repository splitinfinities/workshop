-- psql -f ./sql/schema.sql
--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.2
-- Dumped by pg_dump version 9.5.2
DROP DATABASE IF EXISTS rspace;
CREATE DATABASE rspace;

\c rspace;


--
-- Name: likes; Type: TABLE;
--

CREATE TABLE likes (
    id SERIAL PRIMARY KEY,
    story integer,
    owner integer,
    created timestamp without time zone DEFAULT now(),
    modified timestamp without time zone DEFAULT now(),
    deleted timestamp without time zone
);


--
-- Name: sessions; Type: TABLE;
--

CREATE TABLE sessions (
    user_id character varying NOT NULL,
    token character varying NOT NULL,
    expires timestamp without time zone
);


--
-- Name: stories; Type: TABLE;
--

CREATE TABLE stories (
    id SERIAL PRIMARY KEY,
    content character varying,
    owner integer,
    created timestamp without time zone DEFAULT now(),
    modified timestamp without time zone DEFAULT now(),
    deleted timestamp without time zone
);


--
-- Name: users; Type: TABLE;
--

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name character varying,
    last_name character varying,
    username character varying,
    email character varying,
    salt character varying,
    password character varying,
    created timestamp without time zone DEFAULT now(),
    modified timestamp without time zone DEFAULT now(),
    deleted timestamp without time zone
);


--
-- Name: sessions_token_key; Type: CONSTRAINT;
--

ALTER TABLE ONLY sessions
    ADD CONSTRAINT sessions_token_key UNIQUE (token);

--
-- Name: users_email_key; Type: CONSTRAINT;
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_email_key UNIQUE (email);

--
-- Name: users_salt_key; Type: CONSTRAINT;
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_salt_key UNIQUE (salt);

--
-- PostgreSQL database dump complete
--
