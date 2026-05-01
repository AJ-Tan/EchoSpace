--
-- PostgreSQL database dump
--

\restrict NfzylJn6X7CVD8AjyKFdWUGdJL5bDhfcazhpSM0OQroUcvVspYy2eREmTmc3occ

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

-- Started on 2026-05-01 19:54:46

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 8 (class 2615 OID 50070)
-- Name: members_only; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA members_only;


ALTER SCHEMA members_only OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 238 (class 1259 OID 58304)
-- Name: login_info; Type: TABLE; Schema: members_only; Owner: postgres
--

CREATE TABLE members_only.login_info (
    id integer NOT NULL,
    username text NOT NULL,
    password text NOT NULL,
    first_name text,
    last_name text,
    role text DEFAULT 'user'::text,
    avatar_id text DEFAULT '1'::text
);


ALTER TABLE members_only.login_info OWNER TO postgres;

--
-- TOC entry 237 (class 1259 OID 58303)
-- Name: login_info_id_seq; Type: SEQUENCE; Schema: members_only; Owner: postgres
--

ALTER TABLE members_only.login_info ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME members_only.login_info_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 240 (class 1259 OID 66545)
-- Name: messages; Type: TABLE; Schema: members_only; Owner: postgres
--

CREATE TABLE members_only.messages (
    id integer NOT NULL,
    user_id integer NOT NULL,
    title text,
    message text,
    is_archived boolean DEFAULT false,
    created_at timestamp with time zone,
    last_modified timestamp with time zone
);


ALTER TABLE members_only.messages OWNER TO postgres;

--
-- TOC entry 239 (class 1259 OID 66544)
-- Name: messages_id_seq; Type: SEQUENCE; Schema: members_only; Owner: postgres
--

ALTER TABLE members_only.messages ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME members_only.messages_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 5053 (class 0 OID 58304)
-- Dependencies: 238
-- Data for Name: login_info; Type: TABLE DATA; Schema: members_only; Owner: postgres
--

COPY members_only.login_info (id, username, password, first_name, last_name, role, avatar_id) FROM stdin;
17	user1	$2b$10$EYhcwqFXkFfQ4fVIyS3ov..2YbqCgsnDBcSWUeN0gnVtp6PnRrOci	Sample	User	member	5
16	ajtan22	$2b$10$oBP3xaPyE6O2XgJ5POZL/O.hH7zuZqmm2QE92C2v6LhQTvodgaY0C	AJ	Tan	admin	4
\.


--
-- TOC entry 5055 (class 0 OID 66545)
-- Dependencies: 240
-- Data for Name: messages; Type: TABLE DATA; Schema: members_only; Owner: postgres
--

COPY members_only.messages (id, user_id, title, message, is_archived, created_at, last_modified) FROM stdin;
\.


--
-- TOC entry 5061 (class 0 OID 0)
-- Dependencies: 237
-- Name: login_info_id_seq; Type: SEQUENCE SET; Schema: members_only; Owner: postgres
--

SELECT pg_catalog.setval('members_only.login_info_id_seq', 17, true);


--
-- TOC entry 5062 (class 0 OID 0)
-- Dependencies: 239
-- Name: messages_id_seq; Type: SEQUENCE SET; Schema: members_only; Owner: postgres
--

SELECT pg_catalog.setval('members_only.messages_id_seq', 21, true);


--
-- TOC entry 4899 (class 2606 OID 58313)
-- Name: login_info login_info_pkey; Type: CONSTRAINT; Schema: members_only; Owner: postgres
--

ALTER TABLE ONLY members_only.login_info
    ADD CONSTRAINT login_info_pkey PRIMARY KEY (id);


--
-- TOC entry 4903 (class 2606 OID 66555)
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: members_only; Owner: postgres
--

ALTER TABLE ONLY members_only.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);


--
-- TOC entry 4901 (class 2606 OID 58315)
-- Name: login_info unq_username; Type: CONSTRAINT; Schema: members_only; Owner: postgres
--

ALTER TABLE ONLY members_only.login_info
    ADD CONSTRAINT unq_username UNIQUE (username);


--
-- TOC entry 4904 (class 2606 OID 66561)
-- Name: messages fk_user; Type: FK CONSTRAINT; Schema: members_only; Owner: postgres
--

ALTER TABLE ONLY members_only.messages
    ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES members_only.login_info(id) ON DELETE CASCADE;


-- Completed on 2026-05-01 19:54:46

--
-- PostgreSQL database dump complete
--

\unrestrict NfzylJn6X7CVD8AjyKFdWUGdJL5bDhfcazhpSM0OQroUcvVspYy2eREmTmc3occ

