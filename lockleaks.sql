--
-- PostgreSQL database dump
--

-- Dumped from database version 12.18 (Ubuntu 12.18-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 16.2

-- Started on 2024-05-02 12:58:59

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 6 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 206 (class 1259 OID 19994)
-- Name: refreshTokens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."refreshTokens" (
    id integer NOT NULL,
    token character varying(255),
    "expiryDate" timestamp with time zone,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "userId" integer
);


ALTER TABLE public."refreshTokens" OWNER TO postgres;

--
-- TOC entry 205 (class 1259 OID 19992)
-- Name: refreshTokens_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."refreshTokens_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."refreshTokens_id_seq" OWNER TO postgres;

--
-- TOC entry 2997 (class 0 OID 0)
-- Dependencies: 205
-- Name: refreshTokens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."refreshTokens_id_seq" OWNED BY public."refreshTokens".id;


--
-- TOC entry 204 (class 1259 OID 19987)
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    name character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- TOC entry 207 (class 1259 OID 20005)
-- Name: user_roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_roles (
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "roleId" integer NOT NULL,
    "userId" integer NOT NULL
);


ALTER TABLE public.user_roles OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 19981)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(255),
    password character varying(255),
    name character varying(255),
    avatar character varying(255),
    verified boolean,
    subscription boolean,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 19979)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 2998 (class 0 OID 0)
-- Dependencies: 202
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 2847 (class 2604 OID 19997)
-- Name: refreshTokens id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."refreshTokens" ALTER COLUMN id SET DEFAULT nextval('public."refreshTokens_id_seq"'::regclass);


--
-- TOC entry 2846 (class 2604 OID 19984)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 2989 (class 0 OID 19994)
-- Dependencies: 206
-- Data for Name: refreshTokens; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."refreshTokens" (id, token, "expiryDate", "createdAt", "updatedAt", "userId") FROM stdin;
1	110ce56d-d14c-4332-b2ad-16665ef4c21a	2024-05-03 17:44:17.629+00	2024-05-02 17:44:17.63+00	2024-05-02 17:44:17.63+00	1
2	f004b779-56e6-4f0b-99fd-58ec934e20f1	2024-05-03 17:45:25.935+00	2024-05-02 17:45:25.936+00	2024-05-02 17:45:25.936+00	1
3	073d87f2-26c2-4961-b13b-8a3079815145	2024-05-03 17:48:52.984+00	2024-05-02 17:48:52.984+00	2024-05-02 17:48:52.984+00	1
4	ba618d80-3873-46cb-93a0-31dc50525477	2024-05-03 17:51:37.196+00	2024-05-02 17:51:37.196+00	2024-05-02 17:51:37.196+00	1
5	2c915324-2374-48c7-9c23-e86d24dced66	2024-05-03 17:52:14.159+00	2024-05-02 17:52:14.159+00	2024-05-02 17:52:14.159+00	1
6	fee0b111-e9f7-4625-b54d-fca6e41f984f	2024-05-03 17:53:32.02+00	2024-05-02 17:53:32.02+00	2024-05-02 17:53:32.02+00	1
7	4716ab62-a5a9-4bfe-90c3-d1e6b790a6f9	2024-05-03 17:57:13.314+00	2024-05-02 17:57:13.315+00	2024-05-02 17:57:13.315+00	1
8	0fe3858b-bfec-4a82-97c2-5c6b3010925a	2024-05-03 18:03:49.184+00	2024-05-02 18:03:49.185+00	2024-05-02 18:03:49.185+00	1
9	8dc4c653-7795-4b24-827d-57b890800e8d	2024-05-03 18:07:57.513+00	2024-05-02 18:07:57.514+00	2024-05-02 18:07:57.514+00	1
10	318b104b-50da-4f19-bef4-211c8e25efdf	2024-05-03 18:08:29.379+00	2024-05-02 18:08:29.379+00	2024-05-02 18:08:29.379+00	2
11	4b121c4f-d67a-43fa-891a-a6ae9cb1c509	2024-05-03 18:09:30.38+00	2024-05-02 18:09:30.38+00	2024-05-02 18:09:30.38+00	2
12	a84ecb97-975e-4b52-a25e-ae0ea62752c2	2024-05-03 18:09:54.626+00	2024-05-02 18:09:54.626+00	2024-05-02 18:09:54.626+00	3
13	72da2776-ac7c-492d-b1e6-28b8d929755c	2024-05-03 18:11:25.588+00	2024-05-02 18:11:25.588+00	2024-05-02 18:11:25.588+00	4
14	9cba89d4-6d92-4df5-be39-cd80075f2b1c	2024-05-03 18:12:16.875+00	2024-05-02 18:12:16.876+00	2024-05-02 18:12:16.876+00	4
\.


--
-- TOC entry 2987 (class 0 OID 19987)
-- Dependencies: 204
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id, name, "createdAt", "updatedAt") FROM stdin;
1	user	2024-05-02 17:43:51.344+00	2024-05-02 17:43:51.344+00
2	moderator	2024-05-02 17:43:51.345+00	2024-05-02 17:43:51.345+00
3	admin	2024-05-02 17:43:51.345+00	2024-05-02 17:43:51.345+00
\.


--
-- TOC entry 2990 (class 0 OID 20005)
-- Dependencies: 207
-- Data for Name: user_roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_roles ("createdAt", "updatedAt", "roleId", "userId") FROM stdin;
2024-05-02 17:44:18.32+00	2024-05-02 17:44:18.32+00	3	1
2024-05-02 18:08:30.141+00	2024-05-02 18:08:30.141+00	1	2
2024-05-02 18:09:55.393+00	2024-05-02 18:09:55.393+00	1	3
2024-05-02 18:11:26.323+00	2024-05-02 18:11:26.323+00	1	4
\.


--
-- TOC entry 2986 (class 0 OID 19981)
-- Dependencies: 203
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, password, name, avatar, verified, subscription, "createdAt", "updatedAt") FROM stdin;
1	admin@copyrightfixer.com	$2a$08$U0JVVKurMQRMZs1Wfsx2ye2o6Byy9D7Kd.auPYY23pVM5GE0mIBgO	\N		t	t	2024-05-02 17:44:17.617+00	2024-05-02 17:44:17.617+00
2	test@gmail.com	$2a$08$m54y7w9ElxPxXxicS54hNu0.kgdTdkXo9UDY7qnS1JX7qZ35osV8S	\N		t	f	2024-05-02 18:08:29.373+00	2024-05-02 18:08:29.373+00
3	test1@gmail.com	$2a$08$2raD81F2yZtazBkq6uxnDuV0rYSLGfolAxs5eSsS/Wb1m9UlnFWGS	\N		f	f	2024-05-02 18:09:54.621+00	2024-05-02 18:09:54.621+00
4	test2@gmail.com	$2a$08$BsVmFocU/HYOuPJyV6OWtOr0/xqcae9InwbVXe7CeDdJuEiIXHxO.	\N		t	t	2024-05-02 18:11:25.582+00	2024-05-02 18:11:25.582+00
\.


--
-- TOC entry 2999 (class 0 OID 0)
-- Dependencies: 205
-- Name: refreshTokens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."refreshTokens_id_seq"', 14, true);


--
-- TOC entry 3000 (class 0 OID 0)
-- Dependencies: 202
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 4, true);


--
-- TOC entry 2853 (class 2606 OID 19999)
-- Name: refreshTokens refreshTokens_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."refreshTokens"
    ADD CONSTRAINT "refreshTokens_pkey" PRIMARY KEY (id);


--
-- TOC entry 2851 (class 2606 OID 19991)
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- TOC entry 2855 (class 2606 OID 20009)
-- Name: user_roles user_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_pkey PRIMARY KEY ("roleId", "userId");


--
-- TOC entry 2849 (class 2606 OID 19986)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 2856 (class 2606 OID 20000)
-- Name: refreshTokens refreshTokens_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."refreshTokens"
    ADD CONSTRAINT "refreshTokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 2857 (class 2606 OID 20010)
-- Name: user_roles user_roles_roleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT "user_roles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES public.roles(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2858 (class 2606 OID 20015)
-- Name: user_roles user_roles_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT "user_roles_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2996 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2024-05-02 12:59:05

--
-- PostgreSQL database dump complete
--

