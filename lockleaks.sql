--
-- PostgreSQL database dump
--

-- Dumped from database version 14.12 (Ubuntu 14.12-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.12 (Ubuntu 14.12-0ubuntu0.22.04.1)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: ai_face_summaries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ai_face_summaries (
    id integer NOT NULL,
    file character varying(255),
    result integer DEFAULT 0,
    user_id integer,
    downloaded boolean DEFAULT false,
    expired boolean DEFAULT false,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    progress real DEFAULT 0
);


ALTER TABLE public.ai_face_summaries OWNER TO postgres;

--
-- Name: ai_face_summaries_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ai_face_summaries_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.ai_face_summaries_id_seq OWNER TO postgres;

--
-- Name: ai_face_summaries_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ai_face_summaries_id_seq OWNED BY public.ai_face_summaries.id;


--
-- Name: basic_keywords; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.basic_keywords (
    id integer NOT NULL,
    keyword character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.basic_keywords OWNER TO postgres;

--
-- Name: basic-keywords_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."basic-keywords_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."basic-keywords_id_seq" OWNER TO postgres;

--
-- Name: basic-keywords_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."basic-keywords_id_seq" OWNED BY public.basic_keywords.id;


--
-- Name: blogs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.blogs (
    id integer NOT NULL,
    title character varying(255),
    "moderatorInfo" jsonb DEFAULT '{"name": "", "avatar": "", "description": ""}'::jsonb,
    "shortContent" character varying(255),
    content text,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    banner character varying(255),
    tags character varying(255)[]
);


ALTER TABLE public.blogs OWNER TO postgres;

--
-- Name: blog_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.blog_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.blog_id_seq OWNER TO postgres;

--
-- Name: blog_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.blog_id_seq OWNED BY public.blogs.id;


--
-- Name: blog_views; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.blog_views (
    id integer NOT NULL,
    ip character varying(255) NOT NULL,
    user_agent character varying(255),
    blog_id integer NOT NULL,
    visited_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.blog_views OWNER TO postgres;

--
-- Name: blog_views_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.blog_views_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.blog_views_id_seq OWNER TO postgres;

--
-- Name: blog_views_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.blog_views_id_seq OWNED BY public.blog_views.id;


--
-- Name: custom_keywords; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.custom_keywords (
    id integer NOT NULL,
    website character varying(255),
    keywords character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.custom_keywords OWNER TO postgres;

--
-- Name: custom-keywords_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."custom-keywords_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."custom-keywords_id_seq" OWNER TO postgres;

--
-- Name: custom-keywords_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."custom-keywords_id_seq" OWNED BY public.custom_keywords.id;


--
-- Name: customer_reviews; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.customer_reviews (
    id integer NOT NULL,
    name character varying(255),
    title character varying(255),
    avatar character varying(255),
    content text,
    refer_link character varying(255),
    telegram character varying(255),
    discord character varying(255),
    twitter character varying(255),
    instagram character varying(255),
    reddit character varying(255),
    tiktok character varying(255),
    facebook character varying(255),
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.customer_reviews OWNER TO postgres;

--
-- Name: customer_reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.customer_reviews_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.customer_reviews_id_seq OWNER TO postgres;

--
-- Name: customer_reviews_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.customer_reviews_id_seq OWNED BY public.customer_reviews.id;


--
-- Name: dmca_images; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dmca_images (
    id integer NOT NULL,
    name character varying(255),
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.dmca_images OWNER TO postgres;

--
-- Name: dmca_images_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.dmca_images_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.dmca_images_id_seq OWNER TO postgres;

--
-- Name: dmca_images_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.dmca_images_id_seq OWNED BY public.dmca_images.id;


--
-- Name: help_articles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.help_articles (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    content text NOT NULL,
    "categoryId" integer,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    likes character varying[] DEFAULT ARRAY[]::character varying[],
    dislikes character varying[] DEFAULT ARRAY[]::character varying[]
);


ALTER TABLE public.help_articles OWNER TO postgres;

--
-- Name: help_articles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.help_articles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.help_articles_id_seq OWNER TO postgres;

--
-- Name: help_articles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.help_articles_id_seq OWNED BY public.help_articles.id;


--
-- Name: help_categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.help_categories (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description character varying(255) NOT NULL,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.help_categories OWNER TO postgres;

--
-- Name: help_categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.help_categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.help_categories_id_seq OWNER TO postgres;

--
-- Name: help_categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.help_categories_id_seq OWNED BY public.help_categories.id;


--
-- Name: messages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.messages (
    id integer NOT NULL,
    sender_id integer,
    content text,
    attached_images character varying(255)[],
    ticket_id character varying(255),
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.messages OWNER TO postgres;

--
-- Name: messages_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.messages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.messages_id_seq OWNER TO postgres;

--
-- Name: messages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.messages_id_seq OWNED BY public.messages.id;


--
-- Name: news; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.news (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    content text NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.news OWNER TO postgres;

--
-- Name: news_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.news_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.news_id_seq OWNER TO postgres;

--
-- Name: news_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.news_id_seq OWNED BY public.news.id;


--
-- Name: notifications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notifications (
    id integer NOT NULL,
    content text NOT NULL,
    user_id integer NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.notifications OWNER TO postgres;

--
-- Name: notifications_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.notifications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.notifications_id_seq OWNER TO postgres;

--
-- Name: notifications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.notifications_id_seq OWNED BY public.notifications.id;


--
-- Name: payment_links; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payment_links (
    id integer NOT NULL,
    code character varying(255) NOT NULL,
    user_id integer NOT NULL,
    usernames jsonb DEFAULT '[]'::jsonb,
    expire_date timestamp without time zone NOT NULL,
    status character varying(50) DEFAULT 'active'::character varying,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    amount integer,
    period integer DEFAULT 0,
    CONSTRAINT payment_links_status_check CHECK (((status)::text = ANY (ARRAY[('expired'::character varying)::text, ('paid'::character varying)::text, ('active'::character varying)::text])))
);


ALTER TABLE public.payment_links OWNER TO postgres;

--
-- Name: payment_links_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.payment_links_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.payment_links_id_seq OWNER TO postgres;

--
-- Name: payment_links_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.payment_links_id_seq OWNED BY public.payment_links.id;


--
-- Name: ping_models; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ping_models (
    id integer NOT NULL,
    response boolean DEFAULT false NOT NULL,
    goal boolean DEFAULT false NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    model_name character varying[],
    platform character varying[],
    social_media character varying[]
);


ALTER TABLE public.ping_models OWNER TO postgres;

--
-- Name: ping_models_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ping_models_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.ping_models_id_seq OWNER TO postgres;

--
-- Name: ping_models_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ping_models_id_seq OWNED BY public.ping_models.id;


--
-- Name: positions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.positions (
    id integer NOT NULL,
    name character varying(255),
    positions jsonb,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.positions OWNER TO postgres;

--
-- Name: positions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.positions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.positions_id_seq OWNER TO postgres;

--
-- Name: positions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.positions_id_seq OWNED BY public.positions.id;


--
-- Name: proxies_bots; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.proxies_bots (
    id integer NOT NULL,
    vps_source character varying(255),
    ip_address character varying(255),
    username character varying(255),
    password character varying(255),
    vps_expire_date date,
    proxy_source character varying(255),
    proxy_credentials character varying(255),
    proxy_type character varying(255),
    proxy_expire_date date,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.proxies_bots OWNER TO postgres;

--
-- Name: proxies_bots_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.proxies_bots_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.proxies_bots_id_seq OWNER TO postgres;

--
-- Name: proxies_bots_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.proxies_bots_id_seq OWNED BY public.proxies_bots.id;


--
-- Name: refreshTokens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."refreshTokens" (
    id integer NOT NULL,
    token character varying(255),
    expires timestamp with time zone,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "userId" integer
);


ALTER TABLE public."refreshTokens" OWNER TO postgres;

--
-- Name: refreshTokens_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."refreshTokens_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."refreshTokens_id_seq" OWNER TO postgres;

--
-- Name: refreshTokens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."refreshTokens_id_seq" OWNED BY public."refreshTokens".id;


--
-- Name: reports; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reports (
    id integer NOT NULL,
    website character varying(255),
    links character varying[],
    success boolean DEFAULT false,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    method text
);


ALTER TABLE public.reports OWNER TO postgres;

--
-- Name: reports_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reports_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reports_id_seq OWNER TO postgres;

--
-- Name: reports_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reports_id_seq OWNED BY public.reports.id;


--
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
-- Name: rr_photo_summaries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rr_photo_summaries (
    id integer NOT NULL,
    file text NOT NULL,
    result integer DEFAULT 0 NOT NULL,
    user_id integer NOT NULL,
    downloaded boolean DEFAULT false NOT NULL,
    expired boolean DEFAULT false NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    progress real DEFAULT 0
);


ALTER TABLE public.rr_photo_summaries OWNER TO postgres;

--
-- Name: rr_photo_summaries_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rr_photo_summaries_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.rr_photo_summaries_id_seq OWNER TO postgres;

--
-- Name: rr_photo_summaries_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rr_photo_summaries_id_seq OWNED BY public.rr_photo_summaries.id;


--
-- Name: rr_user_summaries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rr_user_summaries (
    id integer NOT NULL,
    file text NOT NULL,
    result integer DEFAULT 0 NOT NULL,
    user_id integer NOT NULL,
    downloaded boolean DEFAULT false NOT NULL,
    expired boolean DEFAULT false NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    progress real DEFAULT 0
);


ALTER TABLE public.rr_user_summaries OWNER TO postgres;

--
-- Name: rr_user_summaries_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rr_user_summaries_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.rr_user_summaries_id_seq OWNER TO postgres;

--
-- Name: rr_user_summaries_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rr_user_summaries_id_seq OWNED BY public.rr_user_summaries.id;


--
-- Name: scrape_summaries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.scrape_summaries (
    id integer NOT NULL,
    scrape_date character varying(255),
    total_google_links integer DEFAULT 0,
    total_google_images integer DEFAULT 0,
    total_google_videos integer DEFAULT 0,
    total_bing_links integer DEFAULT 0,
    total_bing_images integer DEFAULT 0,
    total_bing_videos integer DEFAULT 0,
    good_count integer DEFAULT 0,
    other_count integer DEFAULT 0,
    bad_count integer DEFAULT 0,
    new_count integer DEFAULT 0,
    report_count integer DEFAULT 0,
    no_report_count integer DEFAULT 0,
    matches_count integer DEFAULT 0,
    no_matches_count integer DEFAULT 0,
    status character varying(255) DEFAULT ''::character varying,
    user_id integer,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    downloaded boolean DEFAULT false,
    accepted boolean DEFAULT false,
    only_google boolean DEFAULT false,
    only_bing boolean DEFAULT false,
    progress real DEFAULT 0
);


ALTER TABLE public.scrape_summaries OWNER TO postgres;

--
-- Name: scrape_summaries_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.scrape_summaries_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.scrape_summaries_id_seq OWNER TO postgres;

--
-- Name: scrape_summaries_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.scrape_summaries_id_seq OWNED BY public.scrape_summaries.id;


--
-- Name: social_media_profiles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.social_media_profiles (
    id integer NOT NULL,
    name character varying(255),
    count integer,
    user_id integer,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    accepted boolean DEFAULT false
);


ALTER TABLE public.social_media_profiles OWNER TO postgres;

--
-- Name: social_media_profiles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.social_media_profiles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.social_media_profiles_id_seq OWNER TO postgres;

--
-- Name: social_media_profiles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.social_media_profiles_id_seq OWNED BY public.social_media_profiles.id;


--
-- Name: social_summaries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.social_summaries (
    id integer NOT NULL,
    file character varying(255),
    result integer DEFAULT 0,
    user_id integer,
    downloaded boolean DEFAULT false,
    expired boolean DEFAULT false,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    progress real DEFAULT 0
);


ALTER TABLE public.social_summaries OWNER TO postgres;

--
-- Name: social_summaries_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.social_summaries_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.social_summaries_id_seq OWNER TO postgres;

--
-- Name: social_summaries_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.social_summaries_id_seq OWNED BY public.social_summaries.id;


--
-- Name: social_usernames; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.social_usernames (
    id integer NOT NULL,
    username character varying(255),
    "userId" integer,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.social_usernames OWNER TO postgres;

--
-- Name: social_usernames_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.social_usernames_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.social_usernames_id_seq OWNER TO postgres;

--
-- Name: social_usernames_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.social_usernames_id_seq OWNED BY public.social_usernames.id;


--
-- Name: subscribed_users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.subscribed_users (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.subscribed_users OWNER TO postgres;

--
-- Name: subscribed_users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.subscribed_users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.subscribed_users_id_seq OWNER TO postgres;

--
-- Name: subscribed_users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.subscribed_users_id_seq OWNED BY public.subscribed_users.id;


--
-- Name: subscription_options; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.subscription_options (
    id integer NOT NULL,
    option_name character varying(255) NOT NULL,
    usernames integer NOT NULL,
    scanner integer NOT NULL,
    adult_tubs boolean NOT NULL,
    file_hosted boolean NOT NULL,
    google integer NOT NULL,
    bing integer NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    ai_face integer NOT NULL,
    sm_scanner integer NOT NULL,
    sm_submit integer NOT NULL,
    r2r_of_user_content boolean NOT NULL,
    dmca_badges boolean NOT NULL,
    data_report boolean NOT NULL,
    data_analytics boolean NOT NULL,
    personal_agent integer NOT NULL,
    download_data boolean NOT NULL
);


ALTER TABLE public.subscription_options OWNER TO postgres;

--
-- Name: subscription_options_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.subscription_options_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.subscription_options_id_seq OWNER TO postgres;

--
-- Name: subscription_options_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.subscription_options_id_seq OWNED BY public.subscription_options.id;


--
-- Name: test_bots; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.test_bots (
    id integer NOT NULL,
    scanner text DEFAULT ''::text NOT NULL,
    social text DEFAULT ''::text NOT NULL,
    ai_face text DEFAULT ''::text NOT NULL,
    rr_photo text DEFAULT ''::text NOT NULL,
    rr_user text DEFAULT ''::text NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.test_bots OWNER TO postgres;

--
-- Name: test_bots_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.test_bots_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.test_bots_id_seq OWNER TO postgres;

--
-- Name: test_bots_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.test_bots_id_seq OWNED BY public.test_bots.id;


--
-- Name: tickets; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tickets (
    id integer NOT NULL,
    name character varying(255),
    status character varying(255),
    user_id integer,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    count integer DEFAULT 0
);


ALTER TABLE public.tickets OWNER TO postgres;

--
-- Name: tickets_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tickets_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tickets_id_seq OWNER TO postgres;

--
-- Name: tickets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tickets_id_seq OWNED BY public.tickets.id;


--
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
-- Name: usernames; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usernames (
    id integer NOT NULL,
    username character varying(255),
    link character varying(255),
    "userId" integer,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);


ALTER TABLE public.usernames OWNER TO postgres;

--
-- Name: usernames_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usernames_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.usernames_id_seq OWNER TO postgres;

--
-- Name: usernames_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usernames_id_seq OWNED BY public.usernames.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(255),
    password character varying(255),
    name character varying(255) DEFAULT ''::character varying,
    avatar character varying(255),
    verified boolean,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    social character varying(255),
    subscription jsonb DEFAULT '{"status": "", "plan_id": null, "expire_date": null, "payment_method": null}'::jsonb,
    agency boolean DEFAULT false,
    user_counts integer DEFAULT 0,
    users_info_images character varying[],
    ban boolean DEFAULT false,
    copyright_holder character varying DEFAULT ''::character varying,
    contract jsonb DEFAULT '{"status": ""}'::jsonb,
    ip character varying(255) DEFAULT ''::character varying,
    data_report character varying(255) DEFAULT ''::character varying,
    data_analytics character varying(255) DEFAULT ''::character varying
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: vps_lists; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.vps_lists (
    id integer NOT NULL,
    ip_address character varying(255) NOT NULL,
    subdomain character varying(255) DEFAULT ''::character varying NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.vps_lists OWNER TO postgres;

--
-- Name: vps_list_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.vps_list_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.vps_list_id_seq OWNER TO postgres;

--
-- Name: vps_list_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.vps_list_id_seq OWNED BY public.vps_lists.id;


--
-- Name: ai_face_summaries id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ai_face_summaries ALTER COLUMN id SET DEFAULT nextval('public.ai_face_summaries_id_seq'::regclass);


--
-- Name: basic_keywords id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.basic_keywords ALTER COLUMN id SET DEFAULT nextval('public."basic-keywords_id_seq"'::regclass);


--
-- Name: blog_views id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blog_views ALTER COLUMN id SET DEFAULT nextval('public.blog_views_id_seq'::regclass);


--
-- Name: blogs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blogs ALTER COLUMN id SET DEFAULT nextval('public.blog_id_seq'::regclass);


--
-- Name: custom_keywords id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.custom_keywords ALTER COLUMN id SET DEFAULT nextval('public."custom-keywords_id_seq"'::regclass);


--
-- Name: customer_reviews id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customer_reviews ALTER COLUMN id SET DEFAULT nextval('public.customer_reviews_id_seq'::regclass);


--
-- Name: dmca_images id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dmca_images ALTER COLUMN id SET DEFAULT nextval('public.dmca_images_id_seq'::regclass);


--
-- Name: help_articles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_articles ALTER COLUMN id SET DEFAULT nextval('public.help_articles_id_seq'::regclass);


--
-- Name: help_categories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories ALTER COLUMN id SET DEFAULT nextval('public.help_categories_id_seq'::regclass);


--
-- Name: messages id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages ALTER COLUMN id SET DEFAULT nextval('public.messages_id_seq'::regclass);


--
-- Name: news id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.news ALTER COLUMN id SET DEFAULT nextval('public.news_id_seq'::regclass);


--
-- Name: notifications id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications ALTER COLUMN id SET DEFAULT nextval('public.notifications_id_seq'::regclass);


--
-- Name: payment_links id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payment_links ALTER COLUMN id SET DEFAULT nextval('public.payment_links_id_seq'::regclass);


--
-- Name: ping_models id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ping_models ALTER COLUMN id SET DEFAULT nextval('public.ping_models_id_seq'::regclass);


--
-- Name: positions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.positions ALTER COLUMN id SET DEFAULT nextval('public.positions_id_seq'::regclass);


--
-- Name: proxies_bots id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proxies_bots ALTER COLUMN id SET DEFAULT nextval('public.proxies_bots_id_seq'::regclass);


--
-- Name: refreshTokens id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."refreshTokens" ALTER COLUMN id SET DEFAULT nextval('public."refreshTokens_id_seq"'::regclass);


--
-- Name: reports id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reports ALTER COLUMN id SET DEFAULT nextval('public.reports_id_seq'::regclass);


--
-- Name: rr_photo_summaries id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rr_photo_summaries ALTER COLUMN id SET DEFAULT nextval('public.rr_photo_summaries_id_seq'::regclass);


--
-- Name: rr_user_summaries id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rr_user_summaries ALTER COLUMN id SET DEFAULT nextval('public.rr_user_summaries_id_seq'::regclass);


--
-- Name: scrape_summaries id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scrape_summaries ALTER COLUMN id SET DEFAULT nextval('public.scrape_summaries_id_seq'::regclass);


--
-- Name: social_media_profiles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.social_media_profiles ALTER COLUMN id SET DEFAULT nextval('public.social_media_profiles_id_seq'::regclass);


--
-- Name: social_summaries id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.social_summaries ALTER COLUMN id SET DEFAULT nextval('public.social_summaries_id_seq'::regclass);


--
-- Name: social_usernames id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.social_usernames ALTER COLUMN id SET DEFAULT nextval('public.social_usernames_id_seq'::regclass);


--
-- Name: subscribed_users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscribed_users ALTER COLUMN id SET DEFAULT nextval('public.subscribed_users_id_seq'::regclass);


--
-- Name: subscription_options id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscription_options ALTER COLUMN id SET DEFAULT nextval('public.subscription_options_id_seq'::regclass);


--
-- Name: test_bots id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.test_bots ALTER COLUMN id SET DEFAULT nextval('public.test_bots_id_seq'::regclass);


--
-- Name: tickets id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets ALTER COLUMN id SET DEFAULT nextval('public.tickets_id_seq'::regclass);


--
-- Name: usernames id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usernames ALTER COLUMN id SET DEFAULT nextval('public.usernames_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: vps_lists id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vps_lists ALTER COLUMN id SET DEFAULT nextval('public.vps_list_id_seq'::regclass);


--
-- Data for Name: ai_face_summaries; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ai_face_summaries (id, file, result, user_id, downloaded, expired, "createdAt", "updatedAt", progress) FROM stdin;
\.


--
-- Data for Name: basic_keywords; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.basic_keywords (id, keyword, "createdAt", "updatedAt") FROM stdin;
4	webcam	2024-05-18 13:19:42.426+02	2024-05-18 13:19:42.426+02
6	archive	2024-05-18 13:19:49.074+02	2024-05-18 13:19:49.074+02
7	leaks	2024-05-18 13:19:52.522+02	2024-05-18 13:19:52.522+02
\.


--
-- Data for Name: blog_views; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.blog_views (id, ip, user_agent, blog_id, visited_at, "createdAt", "updatedAt") FROM stdin;
1	95.76.165.195	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36	15	2024-05-23 13:06:05.555+02	2024-05-23 13:06:05.556+02	2024-05-23 13:06:05.556+02
2	92.60.40.217	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36	15	2024-05-24 20:20:17.614+02	2024-05-24 20:20:17.615+02	2024-05-24 20:20:17.615+02
3	193.32.249.168	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36	15	2024-05-27 20:04:27.679+02	2024-05-27 20:04:27.679+02	2024-05-27 20:04:27.679+02
4	202.124.212.157	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 Edg/124.0.0.0	15	2024-05-31 09:59:44.425+02	2024-05-31 09:59:44.425+02	2024-05-31 09:59:44.425+02
5	92.60.40.226	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36	15	2024-06-06 16:57:20.674+02	2024-06-06 16:57:20.675+02	2024-06-06 16:57:20.675+02
6	169.150.196.30	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36	15	2024-06-06 20:54:59.531+02	2024-06-06 20:54:59.532+02	2024-06-06 20:54:59.532+02
7	185.65.134.192	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36	15	2024-06-08 10:44:58.894+02	2024-06-08 10:44:58.894+02	2024-06-08 10:44:58.894+02
8	78.96.82.187	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36	15	2024-06-08 20:55:04.518+02	2024-06-08 20:55:04.519+02	2024-06-08 20:55:04.519+02
9	95.76.16.50	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36	15	2024-06-09 08:58:18.821+02	2024-06-09 08:58:18.821+02	2024-06-09 08:58:18.821+02
10	185.65.134.202	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36	15	2024-06-09 15:58:10.388+02	2024-06-09 15:58:10.389+02	2024-06-09 15:58:10.389+02
11	169.150.196.14	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36	15	2024-06-09 19:33:07.026+02	2024-06-09 19:33:07.027+02	2024-06-09 19:33:07.027+02
12	169.150.196.40	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36	15	2024-06-09 21:20:50.889+02	2024-06-09 21:20:50.889+02	2024-06-09 21:20:50.889+02
13	185.65.134.250	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36	15	2024-06-09 21:57:55.206+02	2024-06-09 21:57:55.206+02	2024-06-09 21:57:55.206+02
14	188.43.253.75	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36	15	2024-06-11 19:26:09.965+02	2024-06-11 19:26:09.965+02	2024-06-11 19:26:09.965+02
15	188.43.253.75	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36	16	2024-06-11 19:37:21.787+02	2024-06-11 19:37:21.787+02	2024-06-11 19:37:21.787+02
16	185.65.134.202	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36	16	2024-06-11 19:52:23.988+02	2024-06-11 19:52:23.988+02	2024-06-11 19:52:23.988+02
17	185.65.134.202	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36	15	2024-06-11 19:53:52.121+02	2024-06-11 19:53:52.121+02	2024-06-11 19:53:52.121+02
18	95.76.165.195	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36	16	2024-06-11 21:53:24.887+02	2024-06-11 21:53:24.888+02	2024-06-11 21:53:24.888+02
19	95.76.165.195	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36	15	2024-06-11 21:53:35.717+02	2024-06-11 21:53:35.717+02	2024-06-11 21:53:35.717+02
20	37.251.222.26	Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/125.0.6422.80 Mobile/15E148 Safari/604.1	16	2024-06-14 10:21:37.044+02	2024-06-14 10:21:37.045+02	2024-06-14 10:21:37.045+02
21	37.251.222.26	Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/125.0.6422.80 Mobile/15E148 Safari/604.1	15	2024-06-14 10:22:26.352+02	2024-06-14 10:22:26.352+02	2024-06-14 10:22:26.352+02
22	169.150.196.27	Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:127.0) Gecko/20100101 Firefox/127.0	16	2024-06-14 13:09:36.317+02	2024-06-14 13:09:36.318+02	2024-06-14 13:09:36.318+02
23	193.32.249.175	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36	18	2024-06-15 14:07:11.296+02	2024-06-15 14:07:11.297+02	2024-06-15 14:07:11.297+02
24	95.76.165.195	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36	16	2024-06-17 22:51:14.784+02	2024-06-17 22:51:14.784+02	2024-06-17 22:51:14.784+02
25	95.76.165.195	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36	18	2024-06-17 22:51:26.404+02	2024-06-17 22:51:26.404+02	2024-06-17 22:51:26.404+02
26	78.96.19.161	Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36	18	2024-06-19 21:57:26.49+02	2024-06-19 21:57:26.49+02	2024-06-19 21:57:26.49+02
27	78.96.19.161	Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36	15	2024-06-19 21:57:40.848+02	2024-06-19 21:57:40.849+02	2024-06-19 21:57:40.849+02
28	169.150.196.27	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36	16	2024-06-20 10:40:46.341+02	2024-06-20 10:40:46.341+02	2024-06-20 10:40:46.341+02
29	169.150.196.27	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36	15	2024-06-20 10:40:54.881+02	2024-06-20 10:40:54.881+02	2024-06-20 10:40:54.881+02
30	92.60.40.208	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0	16	2024-06-20 19:53:05.445+02	2024-06-20 19:53:05.446+02	2024-06-20 19:53:05.446+02
\.


--
-- Data for Name: blogs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.blogs (id, title, "moderatorInfo", "shortContent", content, "createdAt", "updatedAt", banner, tags) FROM stdin;
16	Doxy-PEP: A Highly Effective Approach for Preventing and Treating Sexually Transmitted Infections	{"name": "Alex Johnson", "avatar": "person (11)_11-06-2024-_19-36-35.png", "description": "Writer of Lock Leaks"}	Sexually transmitted infections (STIs/STDs) continue to be a significant public health concern, impacting millions of individuals worldwide.	<h2>Introduction</h2><p><br></p><p>Sexually transmitted infections (STIs/STDs) continue to be a significant public health concern, impacting millions of individuals worldwide. In the United States, the CDC estimates 1 in 5 people with an active STI in any given day. With the rise of antibiotic-resistant strains, finding effective treatments is more critical than ever. In this blog post, we'll explore the potential of Doxy-PEP, an antibiotic that is given as Post-Exposure Prophylaxis (PEP) to prevent and treat specific STIs. Drawing from recent research, we'll delve into its remarkable effectiveness and why it's becoming a cornerstone in the fight against these infections.</p><p><br></p><p><img src="https://static.wixstatic.com/media/c5ae59_0bd0101c39fc482f86aee6ce69480384~mv2.jpg/v1/fill/w_740,h_488,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/c5ae59_0bd0101c39fc482f86aee6ce69480384~mv2.jpg"></p><p><br></p><h4>A Glimpse into Sexually Transmitted Infections</h4><p><br></p><p>STIs/STDs are infections transmitted through sexual contact, affecting people of all ages and gender diverse backgrounds. Common STIs include chlamydia, gonorrhea, syphilis, and trichomoniasis, among others. Often times, these STIs present with no signs or symptoms, making them difficult to diagnose unless regular STI testing and screening is performed. If left untreated, they can lead to severe health complications, including infertility, pelvic inflammatory disease, and an increased risk of HIV transmission.</p><p><br></p><h2>The Remarkable Effectiveness of Doxy-PEP</h2><p><br></p><p>Recent preliminary research conducted at the University of California, San Francisco (UCSF), underscores the potential of Doxy-PEP as a game-changer in STI prevention and treatment. Here's how this medication stands out:</p><p><br></p><p><strong>1. Highly Effective Against Resistant Strains</strong>: The UCSF study found that Doxy-PEP remains highly effective against drug-resistant strains of chlamydia and gonorrhea. This is a promising development in the face of rising antibiotic resistance.</p><p><br></p><p><strong>2. PEP for Prevention</strong>: Doxy-PEP can also be used as post-exposure prophylaxis (PEP) in situations where individuals have had unprotected sexual contact with partners of unknown or confirmed STI status. It serves as a preventive measure to reduce the risk of infection after potential exposure.</p><p><br></p><h2>Effectiveness and Dosage</h2><p><br></p><p>The efficacy of Doxy-PEP hinges on a specific dosing regimen designed for optimal effectiveness. If you've engaged in condomless sex and are concerned about potential STI exposure, here's what you need to know:</p><p><br></p><p><strong>1. Dosing Regimen</strong>: In the event of condomless sex and potential STI exposure, Doxy-PEP should be taken as a single 200mg pill of doxycycline as soon as possible within 24-72 hours after the sexual exposure.</p><p><br></p><p><strong>2. Timing Matters</strong>: The timing of Doxy-PEP administration is critical. By taking the medication promptly within this timeframe, you maximize its effectiveness in preventing the development of STIs.</p><p><br></p><p>This dosing regimen is a powerful tool in STI prevention and underscores the importance of timely action. However, it is crucial to emphasize that Doxy-PEP should always be used under the guidance of a healthcare provider, who can provide personalized advice based on your specific situation and potential exposure. Regular STI testing, safe sexual practices, and open communication with healthcare professionals remain essential components of maintaining sexual health. By understanding and adhering to this regimen, individuals can take proactive steps to protect themselves and their partners from the risks associated with STIs.</p><p><br></p><p><img src="https://static.wixstatic.com/media/c5ae59_1b2647386c1c4562a97a83dfdc7ac767~mv2.jpg/v1/fill/w_740,h_488,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/c5ae59_1b2647386c1c4562a97a83dfdc7ac767~mv2.jpg"></p><p><br></p><h4>Precautions and Considerations</h4><p><br></p><p><strong>1. Consult a Healthcare Provider</strong>: Never self-diagnose or self-medicate for STIs. Seek guidance from a healthcare provider for an accurate diagnosis and a personalized treatment plan.</p><p><br></p><p><strong>2. Allergic Reactions and Medication Interactions</strong>: Inform your healthcare provider of any allergies and medications you are taking to avoid potential interactions or allergic reactions.</p><p><br></p><p><strong>3. Pregnancy and Breastfeeding</strong>: Discuss the use of Doxy-PEP with your healthcare provider if you are pregnant or breastfeeding, as this may affect treatment options.</p><p><br></p><p><strong>4. Safe Sexual Practices</strong>: While Doxy-PEP is effective, it should not replace safe sexual practices, including condom use. Practicing safe sex is essential to reduce the risk of STIs.</p><p><br></p><h2>Conclusion</h2><p><br></p><p>Doxy-PEP emerges as a highly effective tool in the fight against sexually transmitted infections, particularly in the face of antibiotic-resistant strains. Recent preliminary research from UCSF highlights its potential to combat drug-resistant chlamydia and gonorrhea strains, offering hope for improved treatment outcomes.</p><p><br></p><p>However, it is crucial to remember that Doxy-PEP is not a one-size-fits-all solution, and its use should always be guided by a healthcare professional. Regular STI testing, safe sexual practices, and open communication with healthcare providers are fundamental aspects of maintaining sexual health. By understanding the role of Doxy-PEP and its proper use, individuals can take proactive steps to prevent and treat STIs, promoting their own well-being and that of their partners.</p><p><br></p><p>In the realm of sexual health, quick access to care and information is paramount. Thankfully, our healthcare providers at <a href="https://www.getequalhealth.com/" rel="noopener noreferrer" target="_blank"><u>Equal Health</u></a> prioritize your well-being. Equal Health offers a range of services tailored to your sexual health needs, including same-day <a href="https://www.getequalhealth.com/sexual-health" rel="noopener noreferrer" target="_blank"><u>Sexual Health</u></a> appointments and specialized Doxy-PEP services. For patients at risk of STIs/STDs, Equal Health is there to provide timely guidance, testing, and treatment options. With their commitment to promoting sexual health and preventing the spread of infections, Equal Health serves as a valuable resource for those seeking comprehensive and accessible sexual health care. Don't hesitate to reach out to them for your sexual health concerns, knowing that professional help is just a <a href="https://www.getequalhealth.com/sexual-health" rel="noopener noreferrer" target="_blank"><u>click away</u></a>.</p>	2024-06-11 19:36:35.123+02	2024-06-11 20:00:36.664+02	ultra-hd-wazf67lzyh5q7k32_11-06-2024-_20-00-36.png	{medicilne,doxy,tablets,example}
15	21 of the best blog examples in 2024 that'll inspire your blogging journey	{"name": "Milos Wsale", "avatar": "person (13)_11-06-2024-_19-25-18.png", "description": "Moderator of Lock Leaks"}	 WEBSITE ESSENTIALS	<p>A blog is your creative space. It’s where you can share your brand’s story or impart your wisdom using your own words, with your own visual language to match. Fortunately, you don’t need to be a professional writer to create a successful blog either. All you need is a genuine passion for your field, lots to say and a stylish canvas on which to say it. To learn how to <a href="https://www.wix.com/start/blog" rel="noopener noreferrer" target="_blank">create a blog</a> of your own, check out this list of 22 of the best blogs below. Further down, we’ve included tips for <a href="https://www.wix.com/blog/how-to-start-a-blog" rel="noopener noreferrer" target="_blank">how to start a blog</a> that your audience will love.</p><p><br></p><h2>22 best blog examples</h2><p><br></p><ol><li><a href="https://www.wix.com/blog/blog-examples#viewer-h4us" rel="noopener noreferrer" target="_blank">Best photography blog: Zion Adventure Photog</a></li><li><a href="https://www.wix.com/blog/blog-examples#viewer-7q0sc" rel="noopener noreferrer" target="_blank">Best interior design blog: Seasons in Colour</a></li><li><a href="https://www.wix.com/blog/blog-examples#viewer-82tuo" rel="noopener noreferrer" target="_blank">Best restaurant reviews blog: All the Food</a></li><li><a href="https://www.wix.com/blog/blog-examples#viewer-82tuo" rel="noopener noreferrer" target="_blank">Best entrepreneur blog: Bella &amp; Bloom</a></li><li><a href="https://www.wix.com/blog/blog-examples#viewer-ccuc" rel="noopener noreferrer" target="_blank">Best trip-planning blog: Corlu Travels</a></li><li><a href="https://www.wix.com/blog/blog-examples#viewer-34djg" rel="noopener noreferrer" target="_blank">Best lifestyle blog: Olivia + Laura</a></li><li><a href="https://www.wix.com/blog/blog-examples#viewer-2thp1" rel="noopener noreferrer" target="_blank">Best parenting blog: Bonsie</a></li><li><a href="https://www.wix.com/blog/blog-examples#viewer-aqnsh" rel="noopener noreferrer" target="_blank">Best serialized blog: Brain of Brian</a></li><li><a href="https://www.wix.com/blog/blog-examples#viewer-ea02p" rel="noopener noreferrer" target="_blank">Best DIY blog: britdotdesign</a></li><li><a href="https://www.wix.com/blog/blog-examples#viewer-3ee70" rel="noopener noreferrer" target="_blank">Best travel blog: Chasing Buffaloes and Beyond</a></li><li><a href="https://www.wix.com/blog/blog-examples#viewer-6vkjs" rel="noopener noreferrer" target="_blank">Best LGBTQIA+ blog: Equal Health</a></li><li><a href="https://www.wix.com/blog/blog-examples#viewer-698a9" rel="noopener noreferrer" target="_blank">Best personal blog: The Sofia Log</a></li><li><a href="https://www.wix.com/blog/blog-examples#viewer-375q3" rel="noopener noreferrer" target="_blank">Best wedding blog: Hair Comes the Bride</a></li><li><a href="https://www.wix.com/blog/blog-examples#viewer-1skgd" rel="noopener noreferrer" target="_blank">Best author blog: Alan Allinger</a></li><li><a href="https://www.wix.com/blog/blog-examples#viewer-908n0" rel="noopener noreferrer" target="_blank">Best mental health blog: Cornelius Holmes</a></li><li><a href="https://www.wix.com/blog/blog-examples#viewer-d3vi" rel="noopener noreferrer" target="_blank">Best gardening blog: TerraLiving</a></li><li><a href="https://www.wix.com/blog/blog-examples#viewer-dk5gg" rel="noopener noreferrer" target="_blank">Best recipe blog: Mikaela Reuben</a></li><li><a href="https://www.wix.com/blog/blog-examples#viewer-bjcek" rel="noopener noreferrer" target="_blank">Best female empowerment blog: Mom Boss Life</a></li><li><a href="https://www.wix.com/blog/blog-examples#viewer-f5l4i" rel="noopener noreferrer" target="_blank">Best fitness blog: Mrs. Space Cadet</a></li><li><a href="https://www.wix.com/blog/blog-examples#viewer-5t1gr" rel="noopener noreferrer" target="_blank">Best sports blog: Tobias Becs</a></li><li><a href="https://www.wix.com/blog/blog-examples#viewer-a77pk" rel="noopener noreferrer" target="_blank">Best food blog: Not Another Cooking Show</a></li></ol><p><br></p><h3>01. Best photography blog: <a href="https://www.zionadventurephotog.com/" rel="noopener noreferrer" target="_blank">Zion Adventure Photog</a></h3><p><br></p><p>The Zion Adventure Photog blog establishes owner Arika as an expert of both photography and Zion National Park. The blog’s rugged, playful color scheme of brown and gold evokes nature and sunshine. Its homepage features visual testimonials of happy clients enjoying their adventures. Arika embeds her Instagram Feed directly onto her site, spreading the word about her service and drawing people deeper into her brand through social media marketing.</p><p><br></p><p><strong>Key takeaways</strong></p><p><br></p><ul><li><strong>Have a clear purpose for your blog. </strong>Arika successfully showcases her photography <a href="https://www.wix.com/portfolio-website" rel="noopener noreferrer" target="_blank">portfolio</a> and establishes her expertise of the Zion area. This clear purpose helps her to focus her content and to attract the right audience.</li><li><br></li><li><strong>Be an expert in your field. </strong>Arika is an expert in canyoneering and hiking, and her knowledge comes through in her blog posts. She provides detailed guidance on these activities, which is invaluable to her audience.</li></ul><h3><br></h3><h3><br></h3><p><img src="https://static.wixstatic.com/media/5af200_f1942924adff4602b7b625705d278cb0~mv2.png/v1/fill/w_740,h_423,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/5af200_f1942924adff4602b7b625705d278cb0~mv2.png"></p>	2024-05-20 18:20:57.832+02	2024-06-11 20:06:12.006+02	Untitled design_11-06-2024-_20-06-12.png	{example,"garden ",blog,holiday}
18	Welcome to	{"name": "Lorenzo", "avatar": "tA9vFFnu_400x400 (1)_15-06-2024-_14-06-53.png", "description": "Moderator"}	wow	<h1>test</h1><h2>test</h2><p>test</p><p>test</p><p><strong>test</strong></p><p><em>test</em></p><p><u>test</u></p><p><s><u>test</u></s></p><blockquote><u>test</u></blockquote><ol><li><u>test</u></li></ol><ul><li><u>test</u></li></ul><p><u>test</u></p><p class="ql-indent-2"><u>test</u></p><p class="ql-indent-2"><br></p><p class="ql-indent-2"><a href="https://lockleaks.com/" rel="noopener noreferrer" target="_blank"><u>refferlink</u></a></p><p class="ql-indent-2"><br></p><p class="ql-indent-2"><img src="data:image/jpeg;base64,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"></p><iframe class="ql-video" frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/DMgLpNPQO8Y?showinfo=0"></iframe><p class="ql-indent-2"><br></p><p><br></p>	2024-06-15 14:06:53.793+02	2024-06-15 14:06:53.793+02	WELCOME TO LOCK LEAKS_15-06-2024-_14-06-53.png	{nice}
\.


--
-- Data for Name: custom_keywords; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.custom_keywords (id, website, keywords, "createdAt", "updatedAt") FROM stdin;
1	onlyfans.com	onlyfans leak,of leak,onlyfans archive	2024-05-13 21:03:06.752+02	2024-05-18 13:39:23.53+02
2	mfc.me	myfreecams,mfc	2024-05-18 13:39:05.693+02	2024-05-18 13:39:36.672+02
3	myfreecams.com	myfreecams,mfc	2024-05-18 13:39:43.857+02	2024-05-18 13:39:43.857+02
\.


--
-- Data for Name: customer_reviews; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.customer_reviews (id, name, title, avatar, content, refer_link, telegram, discord, twitter, instagram, reddit, tiktok, facebook, "createdAt", "updatedAt") FROM stdin;
6	sss	ss	nrRmsfkZ_400x400_12-06-2024-_20-13-29.png	I've been using the XYZ Smartwatch for a month now, and it has exceeded my expectations. The battery life is impressive, lasting almost a week on a single charge. The health tracking features, including heart rate monitoring and sleep analysis, are accurate and very insightful. The design is sleek and comfortable to wear all day. The only downside is that the app interface could be more user-friendly. Overall, a fantastic smartwatch for the price!									2024-06-12 20:13:30.014+02	2024-06-12 20:13:30.014+02
7	aaaa	aaaa	TtrAXbnA_400x400_12-06-2024-_20-14-17.png	I hired ABC Cleaning Services for a deep clean of my home, and I am extremely satisfied with the results. The team arrived on time, were very professional, and paid attention to every detail. My house has never looked so spotless! They used eco-friendly products, which is a big plus for me. The pricing was reasonable, and the quality of service was top-notch. I highly recommend ABC Cleaning Services to anyone looking for reliable and thorough cleaners.									2024-06-12 20:14:17.454+02	2024-06-12 20:14:17.454+02
8	ddd	ddd	nrRmsfkZ_400x400_12-06-2024-_20-14-33.png	My dining experience at The Gourmet Bistro was absolutely delightful. The ambiance of the restaurant is cozy and inviting, perfect for a relaxed meal. The menu offers a great variety of dishes, and everything we ordered was delicious and beautifully presented. The staff were attentive and friendly, making sure we had everything we needed. The highlight of the evening was the dessert – the chocolate lava cake was divine! I will definitely be coming back and recommending this place to friends.									2024-06-12 20:14:33.414+02	2024-06-12 20:14:33.414+02
9	asdas	sadsa	Screenshot 2024-06-19 204818_20-06-2024-_11-29-42.png	asdas		test							2024-06-20 11:29:42.806+02	2024-06-20 11:29:42.806+02
\.


--
-- Data for Name: dmca_images; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.dmca_images (id, name, "createdAt", "updatedAt") FROM stdin;
70	1_15-06-2024-_15-17-50.png	2024-06-15 15:17:50.535+02	2024-06-15 15:17:50.535+02
71	2_15-06-2024-_15-17-53.png	2024-06-15 15:17:53.081+02	2024-06-15 15:17:53.081+02
72	3_15-06-2024-_15-17-55.png	2024-06-15 15:17:55.552+02	2024-06-15 15:17:55.552+02
73	4_15-06-2024-_15-18-11.png	2024-06-15 15:18:11.474+02	2024-06-15 15:18:11.474+02
74	5_15-06-2024-_15-18-13.png	2024-06-15 15:18:13.262+02	2024-06-15 15:18:13.262+02
75	6_15-06-2024-_15-18-15.png	2024-06-15 15:18:15.196+02	2024-06-15 15:18:15.196+02
76	7_15-06-2024-_15-18-20.png	2024-06-15 15:18:20.742+02	2024-06-15 15:18:20.742+02
77	8_15-06-2024-_15-18-22.png	2024-06-15 15:18:22.711+02	2024-06-15 15:18:22.711+02
78	9_15-06-2024-_15-18-24.png	2024-06-15 15:18:24.977+02	2024-06-15 15:18:24.977+02
79	10_15-06-2024-_15-18-27.png	2024-06-15 15:18:27.616+02	2024-06-15 15:18:27.616+02
80	11_15-06-2024-_15-18-29.png	2024-06-15 15:18:29.824+02	2024-06-15 15:18:29.824+02
81	12_15-06-2024-_15-18-31.png	2024-06-15 15:18:31.823+02	2024-06-15 15:18:31.823+02
82	13_15-06-2024-_15-19-02.png	2024-06-15 15:19:02.645+02	2024-06-15 15:19:02.645+02
83	14_15-06-2024-_15-19-04.png	2024-06-15 15:19:04.296+02	2024-06-15 15:19:04.296+02
84	15_15-06-2024-_15-19-06.png	2024-06-15 15:19:06.318+02	2024-06-15 15:19:06.318+02
85	16_15-06-2024-_15-19-09.png	2024-06-15 15:19:09.843+02	2024-06-15 15:19:09.843+02
86	17_15-06-2024-_15-19-12.png	2024-06-15 15:19:12.01+02	2024-06-15 15:19:12.01+02
87	18_15-06-2024-_15-19-13.png	2024-06-15 15:19:13.989+02	2024-06-15 15:19:13.989+02
88	19_15-06-2024-_15-19-16.png	2024-06-15 15:19:16.819+02	2024-06-15 15:19:16.819+02
89	20_15-06-2024-_15-19-18.png	2024-06-15 15:19:18.779+02	2024-06-15 15:19:18.779+02
90	21_15-06-2024-_15-19-20.png	2024-06-15 15:19:20.58+02	2024-06-15 15:19:20.58+02
\.


--
-- Data for Name: help_articles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.help_articles (id, title, content, "categoryId", "createdAt", "updatedAt", likes, dislikes) FROM stdin;
10	Frequently Asked Questions (FAQs)	<h1><strong>General</strong></h1><h1><br></h1><p><strong>Q: What is Lock Leaks?</strong> </p><p>A: Lock Leaks is a platform dedicated to protecting your online content copyrights through continuous monitoring and removal of pirated content, ensuring your earnings and reputation are safeguarded.</p><p><br></p><p><strong>Q: How does your DMCA protection service work?</strong></p><p>A: Upon detecting pirated content, our agents promptly issue DMCA takedown notices to the relevant internet authorities to remove the illegal copies swiftly. We combine software and manual scans to identify infringing content.</p><p><br></p><h1><strong>Contact &amp; Support</strong></h1><p><br></p><p><strong>Q: How can I contact your support team?</strong> </p><p>A: You can reach our support team via live chat available on our website, email us at support@lockleaks.com, or use our contact form on the "Contact" page. Our team is available seven days a week.</p><p><br></p><p><strong>Q: What information should I include when contacting support?</strong> </p><p>A: Please include your account details, a detailed description of the issue, and any relevant screenshots or error messages. This helps us resolve your issue more efficiently.</p><p><br></p><p><strong>Q: How quickly can I expect a response from support?</strong> </p><p>A: We aim to respond to all inquiries within 24 hours. For urgent issues, we recommend using the live chat for immediate assistance.</p><p><br></p><p><strong>Q: Do you offer support in multiple languages?</strong> </p><p>A: Yes, our support is available in English, Romanian, Italian, and Spanish. The user panel and homepage are fully translated using Google Translate.</p><p><br></p><p><strong>Q: Where can I find the latest updates or announcements?</strong> </p><p>A: Check our website's "Blog" section or follow our social media channels for the latest updates and important announcements.</p><p><br></p><h1><strong>Subscription &amp; Pricing</strong></h1><p><br></p><p><strong>Q: What subscription plans do you offer?</strong> </p><p>A: We offer Starter, Pro, and Star plans. Each plan provides different features and benefits tailored to your content protection needs.</p><p><br></p><p><strong>Q: How can I upgrade or downgrade my subscription?</strong> </p><p><strong>A:</strong> You can upgrade your subscription by clicking the Upgrade button on any feature you access that is not included in your current plan. For downgrades, there is no automated method; you will need to contact our staff for assistance.</p><p><br></p><p><strong>Q: Is there a free trial available?</strong> </p><p><strong>A:</strong> Yes, we offer a free trial for new users to experience our services. The free trial can be tested only once and is limited to the Scanner for Google and Bing search engines, with a maximum of 5 takedown URLs per day. You can sign up for the trial on our website.</p><p><br></p><p><strong>Q: What payment methods do you accept?</strong> </p><p>A: We accept major credit cards, PayPal, and other secure payment methods. Check our "Payments &amp; Billing" page for more details.</p><p><br></p><p><strong>Q: How do I cancel my subscription?</strong> </p><p><strong>A:</strong> You may cancel your subscription at any time without prior notice. To cancel, click the “cancellation link” sent by Paddle.com after your subscription or request a cancellation link directly from LOCK LEAKS by emailing support@lockleaks.com.</p><p><br></p><h1><strong>Technical Issues</strong></h1><p><br></p><p><strong>Q: I'm having trouble logging in. What should I do?</strong> </p><p>A: First, ensure you are using the correct login credentials. If you still can't log in, try resetting your password. If the issue persists, contact our support team for assistance.</p><p><br></p><p><strong>Q: How do I report a technical issue?</strong> </p><p>A: You can report technical issues by using our error reporting form or contacting support via live chat or email. Provide as much detail as possible to help us resolve the issue quickly.</p><p><br></p><p><strong>Q: What should I do if the website is down?</strong> </p><p>A: If our website is down, please check our social media channels for updates. We work diligently to resolve any downtime issues promptly.</p><p><br></p><h1><strong>Content Protection</strong></h1><p><br></p><p><strong>Q: How often do you scan for infringing content?</strong> </p><p>A: We perform continuous monitoring using both automated tools and manual scans to ensure timely detection and removal of pirated content.</p><p><br></p><p><strong>Q: What types of content do you protect?</strong> </p><p>A: We protect text, images, videos, and other multimedia content. Our comprehensive approach ensures your content is safeguarded across various platforms.</p><p><br></p><p><strong>Q: How does the manual scanning process work?</strong> </p><p>A: Our agents use specialized software and keywords to manually search for copyright infringements on multiple platforms, ensuring thorough protection of your content.</p><p><br></p><p><strong>Q: Can I request a specific site to be monitored?</strong> </p><p><strong>A:</strong> Yes, this feature can be utilized through the "Personal Agent" mode. Create a ticket and send it to your personal agent with the specific sites or platforms you want monitored for copyright infringements.</p><p><br></p><h1><strong>Security &amp; Privacy</strong></h1><p><br></p><p><strong>Q: How do you protect my personal information?</strong></p><p>A: We use industry-standard encryption and security protocols to protect your personal information. For more details, refer to our "Privacy Policy" page.</p><p><br></p><p><strong>Q: What measures do you take to ensure content security?</strong> </p><p>A: Our security measures include continuous monitoring, prompt takedown actions, and robust data protection protocols to ensure your content remains secure.</p><p><br></p><p><strong>Q: Where can I read your privacy policy?</strong> </p><p>A: Our privacy policy is available on the "Privacy Policy" page of our website. It details how we collect, use, and protect your information.</p>	28	2024-06-07 19:30:31.376	2024-06-07 19:30:31.376	{}	{}
11	Share Your Feedback and Suggestions	<p><em>At LOCK LEAKS, we highly value your opinion and are constantly striving to improve our services based on your feedback. Whether you have suggestions for new features, improvements to existing ones, or just want to share your thoughts with us, we'd love to hear from you!</em></p><p><br></p><p>Here are a few ways you can share your feedback and suggestions with us:</p><p><br></p><ol><li><strong>Send us an Email:</strong> You can email us at support@lockleaks.com to share your feedback or suggestions. We're committed to reading and responding to every email we receive.</li><li><strong>Chat with Us:</strong> Our live chat support is available on our website, where you can chat directly with a member of our team. Feel free to share your feedback or suggestions during the chat, and we'll be happy to assist you.</li><li><strong>Use our Ticketing System:</strong> If you prefer a more formal approach, you can submit a ticket through our ticketing system. Just select the "Feedback &amp; Suggestions" category, and your message will be routed to the appropriate team member.</li><li><strong>Reach out on Social Media:</strong> You can also connect with us on social media platforms like Facebook and Twitter. Send us a direct message or tag us in your posts with your feedback or suggestions.</li></ol><p><br></p><p>Your feedback is invaluable to us as we continue to enhance our services and provide the best experience possible for our users. Thank you for taking the time to share your thoughts with us!</p>	28	2024-06-07 19:37:16.999	2024-06-07 19:37:16.999	{}	{}
12	Technical Support	<p><em>At LOCK LEAKS, we understand that encountering technical issues can be frustrating, but you're not alone. Our dedicated technical support team is here to assist you every step of the way. Here's how you can get the help you need:</em></p><p><br></p><ol><li><strong>Contacting Support:</strong> Reach out to our technical support team via live chat, email (support@lockleaks.com), or by submitting a support ticket through our website. Our support representatives are available to assist you with any technical issues you may encounter.</li><li><strong>Providing Details:</strong> When contacting support, please provide as much detail as possible about the issue you're experiencing. This may include error messages, screenshots, or a description of the steps leading up to the problem. The more information we have, the better equipped we'll be to help you.</li><li><strong>Troubleshooting Guidance:</strong> In addition to providing direct support, we also offer troubleshooting guidance for common technical issues. Check our FAQ section or knowledge base for helpful articles and tutorials that may resolve your issue.</li></ol><p><br></p><p>Don't let technical issues hold you back. Contact our technical support team today, and we'll work tirelessly to get you back on track.</p>	29	2024-06-07 19:40:01.908	2024-06-07 19:40:01.908	{}	{}
15	Managing Payment Information	<p><em>Automated Subscription Renewal and Changing Payment Method via Paddle.</em></p><p><br></p><p><strong>Automated Subscription Renewal:</strong></p><p>Paddle offers the convenience of automated subscription renewal. When a customer subscribes to a service, Paddle will automatically set the subscription to renew periodically (monthly, annually, etc.) according to the subscription terms.</p><p><br></p><ul><li><strong>Automatic Renewal:</strong> If a customer has an active subscription, Paddle will automatically attempt to charge the associated payment method when the current subscription period expires.</li></ul><p><br></p><ul><li><strong>Notifications:</strong> Customers receive email notifications before the automatic renewal of the subscription and after the renewal has taken place.</li></ul><p><br></p><p><strong>Changing Payment Method:</strong></p><p>Paddle allows customers to update their payment method for active subscriptions. If a customer wishes to change the payment method from PayPal to a credit card or vice versa, this can be done through the subscription management link received via email or by accessing the subscription portal if available on your website.</p><p><br></p><p><strong>Steps to Change Payment Method:</strong></p><ul><li><strong>Accessing the Subscription Management Link:</strong></li><li class="ql-indent-1">Customers receive a subscription management link in the subscription confirmation email or other notifications sent by Paddle.</li><li class="ql-indent-1">By accessing this link, the customer can view subscription details and make changes.</li></ul><p><br></p><ul><li><strong>Updating the Payment Method:</strong></li><li class="ql-indent-1">In the subscription management portal, the customer has the option to add a new payment method.</li><li class="ql-indent-1">The customer can enter the details of the new credit card or choose to pay via PayPal, depending on their preferences.</li></ul><p><br></p><ul><li><strong>Confirming the Change:</strong></li><li class="ql-indent-1">After entering the details of the new payment method, it will become the active payment method for future billing.</li></ul>	30	2024-06-07 20:00:45.787	2024-06-07 20:01:47.958	{}	{}
13	Login or Access Issues	<p><em>Having trouble logging in or accessing certain features of our platform? Don't worry – we're here to help. Here's what you can do to troubleshoot login or access issues:</em></p><p><br></p><ol><li><strong>Check Your Credentials:</strong> Double-check your login credentials to ensure they are entered correctly. Make sure your caps lock key is off and that there are no typos in your username or password.</li><li><strong>Clear Your Browser Cache:</strong> Sometimes, stored data in your browser's cache can interfere with your ability to log in. Try clearing your browser's cache and cookies, then attempt to log in again.</li><li><strong>Reset Your Password:</strong> If you're still unable to log in, you may need to reset your password. Use the "Forgot Password" link on the login page to reset your password and regain access to your account.</li></ol><p><br></p><p>If you've tried these troubleshooting steps and are still experiencing login or access issues, please don't hesitate to reach out to our technical support team for further assistance.</p>	29	2024-06-07 19:44:06.359	2024-06-10 06:05:33.666	{}	{}
18	Subscription Pricing & Limits	<h2><strong>Subscription Pricing:</strong></h2><p><br></p><p>Our Subscription Pricing Structure: Finding the Perfect Fit for You</p><p>At Lock Leaks, we believe in providing flexible subscription plans tailored to your needs. We understand that every individual or business has unique requirements, and our goal is to offer transparent and customizable pricing options. Here’s a breakdown of our subscription plans to help you find the perfect fit:</p><p><br></p><p><strong>Starter Plan:</strong></p><ul><li>Ideal for those just starting out or with basic requirements.</li><li>Price: $150 per month or $405 for 3 months (10% discount, saving $45).</li><li>Features include:</li><li class="ql-indent-1">1 Username</li><li class="ql-indent-1">1 Personal Agent Request per day</li><li class="ql-indent-1">Unlimited Takedowns</li><li class="ql-indent-1">Daily Reports</li><li class="ql-indent-1">DMCA Badges</li><li class="ql-indent-1">Monthly PDF Reports</li><li class="ql-indent-1">Confidential DMCA Takedown</li><li class="ql-indent-1">Analyzer Tool Search</li><li class="ql-indent-1">Re-verify &amp; Re-analyzer Tool</li><li class="ql-indent-1">Google Results, Images &amp; Videos Removal Report</li><li class="ql-indent-1">Bing Results, Images &amp; Videos Removal Report</li></ul><p><br></p><p><strong>Pro Plan:</strong></p><ul><li>Designed for growing businesses with more demanding needs.</li><li>Price: $200 per month or $510 for 3 months (20% discount, saving $90).</li><li>Features include:</li><li class="ql-indent-1">3 Usernames</li><li class="ql-indent-1">3 Personal Agent Requests per day</li><li class="ql-indent-1">Unlimited Takedowns</li><li class="ql-indent-1">Daily Reports</li><li class="ql-indent-1">DMCA Badges</li><li class="ql-indent-1">Monthly PDF Reports</li><li class="ql-indent-1">Confidential DMCA Takedown</li><li class="ql-indent-1">Analyzer Tool Search</li><li class="ql-indent-1">Re-verify &amp; Re-analyzer Tool</li><li class="ql-indent-1">Google Results, Images &amp; Videos Removal Report</li><li class="ql-indent-1">Bing Results, Images &amp; Videos Removal Report</li><li class="ql-indent-1">Adult Tubes Analyzer Tool &amp; Removal Report</li><li class="ql-indent-1">File Host Analyzer Tool &amp; Removal Report</li><li class="ql-indent-1">Forums Analyzer &amp; Removal Report</li></ul><p><br></p><p><strong>Star Plan:</strong></p><ul><li>Our premium plan offering maximum benefits and support.</li><li>Price: $350 per month or $840 for 3 months (15% discount, saving $210).</li><li>Features include:</li><li class="ql-indent-1">5 Usernames</li><li class="ql-indent-1">5 Personal Agent Requests per day</li><li class="ql-indent-1">Unlimited Takedowns</li><li class="ql-indent-1">Daily Reports</li><li class="ql-indent-1">DMCA Badges</li><li class="ql-indent-1">Monthly PDF Reports</li><li class="ql-indent-1">Confidential DMCA Takedown</li><li class="ql-indent-1">Analyzer Tool Search</li><li class="ql-indent-1">Re-verify &amp; Re-analyzer Tool</li><li class="ql-indent-1">Google Results, Images &amp; Videos Removal Report</li><li class="ql-indent-1">Bing Results, Images &amp; Videos Removal Report</li><li class="ql-indent-1">Adult Tubes Analyzer Tool &amp; Removal Report</li><li class="ql-indent-1">File Host Analyzer Tool &amp; Removal Report</li><li class="ql-indent-1">Forums Analyzer &amp; Removal Report</li><li class="ql-indent-1">Social Media Submit &amp; Removal Report (3 requests per day)</li><li class="ql-indent-1">Social Media Analyzer Tools &amp; Removal Report (1 scan per day)</li><li class="ql-indent-1">Face Recognition AI Analyzer &amp; Removal Report (1 scan per day)</li><li class="ql-indent-1">Monthly Report Data Analytics and Insights</li><li class="ql-indent-1">Usernames History Content Recovery &amp; Removal Report (1 scan per month)</li></ul><p><br></p><p><em>These subscription plans offer various features catering to different needs and budgets. Feel free to explore and choose the plan that best fits your requirements.</em></p><p><br></p><p><br></p><h2><strong>Limits:</strong></h2><p>Understanding Your Plan's Limits: Making the Most of Your Subscription</p><p>At Lock Leaks, we aim to empower our users with powerful tools and features while ensuring fair usage and optimization of resources. To maintain the quality of service and accommodate varying needs, each subscription plan comes with certain limits. Here’s what you need to know:</p><p><br></p><ol><li><strong>Usernames Limit:</strong> Each plan allows a specific number of usernames to be registered under your account. This ensures efficient management and allocation of resources based on your subscription tier.</li><li><strong>Personal Agent Requests:</strong> The number of personal agent requests per day is limited based on your plan. These requests enable you to take proactive measures against copyright infringement and protect your content effectively.</li><li><strong>Analyzer Tool Usage:</strong> Access to specialized analyzer tools such as Adult Tubes Analyzer, File Host Analyzer, Forums Analyzer, and Social Media Analyzer may be limited or excluded depending on your plan.</li><li><strong>Removal Reports:</strong> Depending on your plan, you may have restrictions on the number of removal reports you can generate and submit daily or monthly.</li></ol><p><br></p><p><em>It’s important to review and understand these limits to optimize your subscription usage and ensure you’re getting the most value out of your plan. Should you require additional resources or wish to upgrade your plan for more flexibility, our team is here to assist you every step of the way.</em></p><p><br></p><h2><strong>Upgrade:</strong></h2><p>Upgrade Your Subscription: Unlocking More Value, More Features</p><p>Ready to elevate your experience with Lock Leaks? It’s time to consider upgrading your subscription plan! Whether you’re craving more features, increased limits, or enhanced support, upgrading is a seamless process designed to cater to your evolving needs. Here’s how it works:</p><p><br></p><ol><li><strong>Assess Your Needs:</strong> Take a moment to evaluate your current usage and identify areas where additional features or resources could benefit you. Whether it’s more usernames, higher request limits, or access to advanced tools, we have a plan to suit your requirements.</li><li><strong>Explore Upgrade Options:</strong> Once you’ve determined your needs, explore our range of subscription plans to find the one that best aligns with your goals. Whether it’s moving from Starter to Pro or upgrading from Pro to Star, there’s a plan that fits every stage of your journey.</li><li><strong>Seamless Transition:</strong> Upgrading your subscription is quick and easy. Simply log in to your account, navigate to the subscription settings, and select the desired plan upgrade. Our system will handle the rest, ensuring a seamless transition with no disruption to your service.</li><li><strong>Enjoy Enhanced Benefits:</strong> With your upgraded subscription, you’ll unlock a host of additional features, increased limits, and priority support to supercharge your experience with Lock Leaks. From advanced analytics to exclusive tools, the possibilities are endless!</li></ol><p><br></p><p><em>Ready to take your subscription to the next level? Upgrade today and unlock a world of possibilities with Lock Leaks!</em></p>	31	2024-06-07 20:52:46.019	2024-06-07 20:54:08.012	{}	{}
14	Reporting Glitches	<p>Encountering glitches or errors while using our platform? We appreciate your patience and understanding, and we're here to help you resolve these issues. Here's how you can report glitches or errors:</p><p><br></p><ol><li><strong>Use Our Error Reporting Form:</strong> If you encounter a glitch or error, please report it to us using our error reporting form. Provide as much detail as possible about the glitch, including any error messages you received and the steps leading up to the issue.</li><li><strong>Contact Support:</strong> Alternatively, you can contact our technical support team directly to report glitches or errors. Reach out to us via live chat, email (support@lockleaks.com), or by submitting a support ticket through our website.</li><li><strong>Be Specific:</strong> When reporting glitches or errors, be as specific as possible about the issue you're experiencing. The more information you provide, the easier it will be for us to identify and resolve the problem.</li></ol><p><br></p><p>We're committed to providing you with a seamless user experience, and we appreciate your help in identifying and addressing any glitches or errors you encounter. Thank you for your cooperation.</p>	29	2024-06-07 19:44:53.698	2024-06-07 19:44:53.698	{}	{}
16	Billing and Invoices in Paddle	<p><strong>1. Automatic Billing:</strong> Paddle handles automatic billing for subscriptions and one-time purchases. This includes:</p><p><br></p><ul><li><strong>Subscription renewals:</strong> Automatically billing recurring subscriptions at specified intervals (monthly, annually, etc.).</li><li><strong>Invoice sending:</strong> Automatically generating and sending invoices to customers via email after each payment.</li></ul><p><br></p><p><strong>2. Invoice Contents:</strong> Invoices sent to customers include all necessary information for tax compliance and transparency. Paddle invoices include:</p><p><br></p><ul><li>Your company name and address.</li><li>Details about the product or service purchased.</li><li>Transaction date.</li><li>Total amount paid, including applicable taxes (VAT, sales tax, etc.).</li><li>The payment method used.</li><li>An attached PDF as proof of payment.</li></ul><p><br></p><p><strong>3. Managing Invoices:</strong> Customers receive invoices via email immediately after making a payment. Additionally, they can access invoices from the subscription portal if you offer this option on your website. As a service provider, you can access and manage all invoices from the Paddle dashboard.</p>	30	2024-06-07 20:03:50.565	2024-06-07 20:03:50.565	{}	{}
17	Cancellation Policy	<p><em>You may cancel your subscription at any time without prior notice. To cancel:</em></p><p><br></p><ul><li><strong>Via Cancellation Link:</strong> Click the “cancellation link” sent by Paddle.com after your subscription.</li><li><strong>Via Email Request:</strong> Request a cancellation link directly from LOCK LEAKS by emailing support@lockleaks.com.</li></ul><p><br></p><p><strong>Important:</strong> It is your responsibility to remove any LOCK LEAKS-related DMCA Badges from your website before you cancel your social media accounts.</p><p>Upon cancellation, you will maintain access to the service until the end of your current billing period.</p><p><br></p><h1><strong>Refund Policy</strong></h1><p>Payments are generally non-refundable, and no refunds or credits are provided for partial membership periods or unused content, as permitted by applicable law.</p><p><br></p><p><strong>Refund Requests:</strong></p><ul><li>Customers can request a refund by contacting our support team at support@lockleaks.com or directly through Paddle support.</li><li>Refunds will be processed through the Paddle dashboard and returned to the original payment method used.</li></ul><p><strong>Partial Refunds:</strong></p><ul><li>Partial refunds may be granted at our discretion, depending on the specific circumstances of the request.</li></ul><p><br></p><h2><strong>Abuse of Cancellation and Refund Process</strong></h2><p>If Lock Leaks determines that you are abusing the cancellation and refund process, we reserve the right to block access to and/or terminate your account at our sole discretion.</p><p><br></p><h3>Communication and Transparency</h3><ul><li><strong>Policy Accessibility:</strong> Our cancellation and refund policies are easily accessible on our website. Links to these policies are included on our checkout page, in confirmation emails, and within the customer account or subscription management portal.</li></ul><p><br></p><ul><li><strong>Customer Support:</strong> Our support team is trained to handle cancellation and refund requests efficiently. For assistance, please email support@lockleaks.com.</li></ul>	30	2024-06-07 20:06:40.732	2024-06-07 20:07:03.299	{}	{}
19	Using Our Platform	<h1><strong>Getting Started with Our Platform:</strong></h1><p><br></p><h2><strong>Sign-Up Process:</strong></h2><h2><br></h2><p><strong>1. Visit Our Website:</strong></p><ul><li class="ql-indent-1">Go to our website and click on the "Register" button.</li></ul><p><br></p><p><strong>2. Provide Basic Information:</strong></p><ul><li class="ql-indent-1">Fill in your email address and create a password.</li></ul><p><br></p><p><strong>3. Verify Your Email:</strong></p><ul><li class="ql-indent-1">Verify your email address through the confirmation email sent to your inbox.</li></ul><p><br></p><p><strong>4. Purchase a Subscription Plan:</strong></p><ul><li class="ql-indent-1">After verification, purchase a subscription plan to access the platform.</li></ul><p><br></p><p><strong>5. Complete Contract and KYC:</strong></p><ul><li class="ql-indent-1">Once the subscription is purchased, complete the contract and KYC (Know Your Customer) process to access the full features of your chosen plan.</li></ul><p><br></p><h2><strong>Note:</strong></h2><ul><li>For the Free Trial, you do not need to complete the contract and KYC process.</li></ul>	32	2024-06-08 12:43:50.405	2024-06-08 12:44:13.071	{}	{}
9	How to Contact Our Support Team	<p><em>If you have any questions, technical issues, or need assistance regarding our services, our support team is here to help. We offer several ways you can reach out to us to get the assistance you need.</em></p><p><br></p><h4><strong>1. Live Chat</strong></h4><p>The quickest way to get in touch with our team is through the live chat feature available on our website. One of our representatives will be available to assist you in real-time. Simply click on the "Live Chat" button located at the bottom right corner of our page to start the conversation.</p><p><br></p><h4><strong>2. Email</strong></h4><p>If you prefer to send us an email with your questions or details of the issue you're facing, please use our email address: support@lockleaks.com. One of our team members will respond as soon as possible, typically within 24 hours of receiving your message.</p><p><br></p><h4><strong>3. Contact Form</strong></h4><p>You can also use our contact form available on our "Contact" page to send us a specific question or request. Fill out the required fields with your information and details of the issue, and we'll get back to you as soon as possible.</p><p><br></p><h4><strong>4. Frequently Asked Questions (FAQs)</strong></h4><p>If you have common questions or need general information about our services, we encourage you to check out our "Frequently Asked Questions" section. The answer you're looking for might already be there, saving you the time and effort of reaching out to us directly.</p><p><br></p><h4><strong>5. Support Availability</strong></h4><p>Our support team is available seven days a week to provide further assistance via live chat. We're here to help you navigate any issues or concerns you may have, ensuring you have a smooth experience with our services.</p>	28	2024-06-07 19:07:13.091	2024-06-10 06:17:34.104	{}	{}
\.


--
-- Data for Name: help_categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.help_categories (id, name, description, "createdAt", "updatedAt") FROM stdin;
28	Contact & Support	Contact Support,FAQs,Feedback & Suggestions...	2024-06-07 18:59:20.755	2024-06-07 18:59:20.755
29	Technical Issues	Technial Support,Login or Access Issues, Reporting Glitches...	2024-06-07 18:59:30.547	2024-06-07 18:59:30.547
30	Payments & Billing	Manange Payment Information,Billing & Invoices,Subscription Renewal...	2024-06-07 18:59:45.967	2024-06-07 18:59:45.967
32	How It Works	Using our Platform,Features Navigation,Copyright Protection Guide,Dashboard Usage Guide...	2024-06-07 19:00:03.016	2024-06-07 19:00:03.016
33	Services Offered	Content Analysis,Impersonation & Brand Protection, Content Moderation & Compliance Manangement , AI Tools, Model Services,Monthly Reporting & Analytics...	2024-06-07 19:00:09.414	2024-06-07 19:00:09.414
34	Security & Privacy	Data Security Measures , Privacy Policy , Protecting Personal Information , Content Security Measures...	2024-06-07 19:00:28.053	2024-06-07 19:00:28.053
31	Subscriptions & Pricing	Subscription , Pricing , Limits , Upgrade or Change...	2024-06-07 18:59:54.965	2024-06-07 20:42:48.219
\.


--
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.messages (id, sender_id, content, attached_images, ticket_id, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: news; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.news (id, title, content, "createdAt", "updatedAt") FROM stdin;
2	Welcome to Lockleaks	<h3>Modifying an Existing Table to Set a Default Value</h3><p>If you need to modify an existing table to add a default value to an existing varchar column, you can use the GUI to generate the SQL command and then execute it:</p><ol><li>Open the Object Browser: Navigate to the database and table you wish to modify. Right-click on the table and select&nbsp;Properties.</li><li>Modify the Table Properties: In the Properties dialog, switch to the&nbsp;Columns&nbsp;tab. Find the column you want to modify and click on it to highlight it.</li><li>Set the Default Value: Look for an option related to default values or constraints. There isn't a direct GUI option to set a default value for an existing column in pgAdmin. Instead, you'll need to manually edit the table's definition or use the SQL editor:</li></ol>	2024-05-31 17:32:36.954+02	2024-05-31 17:32:36.954+02
\.


--
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.notifications (id, content, user_id, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: payment_links; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payment_links (id, code, user_id, usernames, expire_date, status, "createdAt", "updatedAt", amount, period) FROM stdin;
\.


--
-- Data for Name: ping_models; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ping_models (id, response, goal, "createdAt", "updatedAt", model_name, platform, social_media) FROM stdin;
12	f	f	2024-06-13 21:31:41.341+02	2024-06-14 13:22:53.218+02	{dsadsadsa,""}	{sadsa,""}	{asasa,""}
\.


--
-- Data for Name: positions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.positions (id, name, positions, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: proxies_bots; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.proxies_bots (id, vps_source, ip_address, username, password, vps_expire_date, proxy_source, proxy_credentials, proxy_type, proxy_expire_date, "createdAt", "updatedAt") FROM stdin;
13	ASD	1965.155.5.5	root	jkiowejfijowiejfowef	2024-06-28	RWQ	23.123.42.4:5000:root:qwersdfewfwedwf	http	2024-06-27	2024-06-18 07:37:45.756+02	2024-06-18 07:37:45.756+02
\.


--
-- Data for Name: refreshTokens; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."refreshTokens" (id, token, expires, "createdAt", "updatedAt", "userId") FROM stdin;
1	7487287c-e7bb-410c-ad57-fa122e512082	2024-05-10 21:29:43.745+02	2024-05-09 21:29:43.746+02	2024-05-09 21:29:43.746+02	1
2	7723f006-cdf8-4aa5-8d87-003895d8c879	2024-05-10 21:31:32.388+02	2024-05-09 21:31:32.388+02	2024-05-09 21:31:32.388+02	1
17	16e4512f-3f46-4d11-bcde-0493192cde34	2024-05-10 23:33:44.096+02	2024-05-09 23:33:44.096+02	2024-05-09 23:33:44.096+02	1
23	32ba5d83-9d36-49fe-b69a-d68bd932a59f	2024-05-16 15:46:34.106+02	2024-05-15 15:46:34.107+02	2024-05-15 15:46:34.107+02	1
29	e1acb6c9-09ef-4085-8e3a-718e3137ef00	2024-05-17 07:04:28.454+02	2024-05-16 07:04:28.455+02	2024-05-16 07:04:28.455+02	1
43	a400b747-0391-4a6b-91d0-9f9680964258	2024-05-17 15:20:54.792+02	2024-05-16 15:20:54.793+02	2024-05-16 15:20:54.793+02	1
63	fc3d17db-24a0-49bd-9543-75ac7f23d436	2024-05-18 11:04:30.535+02	2024-05-17 11:04:30.535+02	2024-05-17 11:04:30.535+02	1
64	59890407-3152-44ec-a4c8-6b1fd81d3e7f	2024-05-18 11:07:05.765+02	2024-05-17 11:07:05.765+02	2024-05-17 11:07:05.765+02	1
65	217b19cd-b438-488b-913e-6f8b3b59303c	2024-05-18 11:12:15.097+02	2024-05-17 11:12:15.097+02	2024-05-17 11:12:15.097+02	1
70	13fc01c6-c004-48b7-9143-e3d0ff52d157	2024-05-19 06:12:47.447+02	2024-05-18 06:12:47.448+02	2024-05-18 06:12:47.448+02	1
71	aa2f30c3-84bf-4028-ac16-0b19dee3e0c2	2024-05-19 06:13:18.092+02	2024-05-18 06:13:18.093+02	2024-05-18 06:13:18.093+02	1
73	687b11cf-3247-40c8-966e-941ac418429c	2024-05-19 13:12:31.472+02	2024-05-18 13:12:31.473+02	2024-05-18 13:12:31.473+02	1
77	73598bc2-e491-4e5f-b2c4-86f954920ce9	2024-05-19 15:42:34.241+02	2024-05-18 15:42:34.241+02	2024-05-18 15:42:34.241+02	1
79	f100af96-ca1d-46e8-b4fb-c0776d4610f8	2024-05-19 15:49:53.674+02	2024-05-18 15:49:53.674+02	2024-05-18 15:49:53.674+02	1
80	c76a1f12-a9b3-4445-a5be-ec87a33a29a7	2024-05-19 15:52:50.699+02	2024-05-18 15:52:50.699+02	2024-05-18 15:52:50.699+02	1
81	f5868d77-3bc4-488f-aeed-bf5a1c061ec2	2024-05-19 15:54:55.825+02	2024-05-18 15:54:55.825+02	2024-05-18 15:54:55.825+02	1
82	83102c57-8881-4394-98df-596a6f3b5ea1	2024-05-19 15:55:22.532+02	2024-05-18 15:55:22.532+02	2024-05-18 15:55:22.532+02	1
83	c7584e51-6804-4bb2-90d7-049c02d0e3d0	2024-05-19 15:55:37.642+02	2024-05-18 15:55:37.642+02	2024-05-18 15:55:37.642+02	1
84	825d5e21-50c4-406d-a3f9-e91c74ff3848	2024-05-19 15:55:49.227+02	2024-05-18 15:55:49.228+02	2024-05-18 15:55:49.228+02	1
86	3986178e-b5ae-45c9-b5ed-ec309292d274	2024-05-20 11:08:20.483+02	2024-05-19 11:08:20.485+02	2024-05-19 11:08:20.485+02	1
287	2f4d0ba2-9c56-4651-b7b5-b39bfbe2d6d8	2024-06-16 15:38:38.648+02	2024-06-15 15:38:38.648+02	2024-06-15 15:38:38.648+02	1
292	d7d08d0e-03e3-419f-a6ab-02c3781a83a6	2024-06-16 19:54:19.282+02	2024-06-15 19:54:19.282+02	2024-06-15 19:54:19.282+02	1
90	33789c15-d71f-4d32-876a-cbbc705023c6	2024-05-20 11:11:02.652+02	2024-05-19 11:11:02.652+02	2024-05-19 11:11:02.652+02	1
92	4bb4e1ae-5528-425f-a708-108025889d1f	2024-05-20 11:16:40.067+02	2024-05-19 11:16:40.068+02	2024-05-19 11:16:40.068+02	1
96	5c16fee7-fa69-4f1a-b38e-b861a539413b	2024-05-20 22:03:48.08+02	2024-05-19 22:03:48.08+02	2024-05-19 22:03:48.08+02	1
97	b03139e6-9848-426f-9ab4-e449485d5146	2024-05-21 10:52:48.593+02	2024-05-20 10:52:48.594+02	2024-05-20 10:52:48.594+02	1
98	04102973-a86a-4cfc-a25e-e8c7276670c5	2024-05-21 12:09:39.965+02	2024-05-20 12:09:39.965+02	2024-05-20 12:09:39.965+02	1
100	f9074517-f04d-4a15-a3c8-69cedc76f5dc	2024-05-21 16:07:21.097+02	2024-05-20 16:07:21.098+02	2024-05-20 16:07:21.098+02	1
101	aa05f279-f9ac-4d06-8e70-464105ae4ddd	2024-05-21 16:08:15.857+02	2024-05-20 16:08:15.858+02	2024-05-20 16:08:15.858+02	1
104	71111284-1139-4160-8a6c-b0343f2e09a1	2024-05-21 17:57:31.845+02	2024-05-20 17:57:31.846+02	2024-05-20 17:57:31.846+02	1
105	2dde4846-f19b-4ca5-b7ae-1b4b64bcf16f	2024-05-21 18:10:50.791+02	2024-05-20 18:10:50.791+02	2024-05-20 18:10:50.791+02	1
112	ff0f0feb-5334-4394-8050-cdc908b41454	2024-05-21 20:21:22.222+02	2024-05-20 20:21:22.223+02	2024-05-20 20:21:22.223+02	1
117	8e50e7d6-58cb-4ff3-9aa9-b349cc211c63	2024-05-21 21:28:35.394+02	2024-05-20 21:28:35.394+02	2024-05-20 21:28:35.394+02	1
118	74317de8-4bff-4461-a3ec-df201463817d	2024-05-22 05:45:56.482+02	2024-05-21 05:45:56.482+02	2024-05-21 05:45:56.482+02	1
120	d36daa9f-fe7b-4902-ba4a-9d9ead6ffaf8	2024-05-22 09:07:28.461+02	2024-05-21 09:07:28.461+02	2024-05-21 09:07:28.461+02	1
124	94fcc248-8d68-4287-96c1-d6e94003d1d0	2024-05-22 17:03:48.689+02	2024-05-21 17:03:48.69+02	2024-05-21 17:03:48.69+02	1
125	20b04ae7-0897-4581-a7ea-537939b3f536	2024-05-22 17:13:19.165+02	2024-05-21 17:13:19.165+02	2024-05-21 17:13:19.165+02	1
126	bea7bd52-6a10-40f8-ae0e-ddb23afc58ff	2024-05-22 21:08:19.123+02	2024-05-21 21:08:19.124+02	2024-05-21 21:08:19.124+02	1
127	934814d7-6da0-447f-8135-31b94f9d54f4	2024-05-22 21:38:10.904+02	2024-05-21 21:38:10.905+02	2024-05-21 21:38:10.905+02	1
137	bc3617b1-3799-4aaa-a13a-5a123171e962	2024-05-23 00:48:14.578+02	2024-05-22 00:48:14.578+02	2024-05-22 00:48:14.578+02	1
138	c1693827-8fd4-4f2a-8262-6f15f286fda4	2024-05-23 09:28:22.88+02	2024-05-22 09:28:22.882+02	2024-05-22 09:28:22.882+02	1
140	55caa3e0-96b5-4619-bf42-85b1aec00f0a	2024-05-24 10:44:54.147+02	2024-05-23 10:44:54.148+02	2024-05-23 10:44:54.148+02	1
142	433c6469-deec-4c7d-9ad1-ec5a772e4bf1	2024-05-24 11:18:41.232+02	2024-05-23 11:18:41.232+02	2024-05-23 11:18:41.232+02	1
144	8501c6e1-eca7-4469-add1-1f0a69fe6997	2024-05-24 14:56:00.516+02	2024-05-23 14:56:00.517+02	2024-05-23 14:56:00.517+02	1
145	65e1fb76-e539-4301-982f-278198f2a4c8	2024-05-24 16:41:00.023+02	2024-05-23 16:41:00.024+02	2024-05-23 16:41:00.024+02	1
149	e61eae99-1adf-4a2f-8b32-fa1d3f5855aa	2024-05-24 21:39:20.808+02	2024-05-23 21:39:20.808+02	2024-05-23 21:39:20.808+02	1
150	54e06a59-41f0-48c6-9435-86eedc87441a	2024-05-24 21:39:39.452+02	2024-05-23 21:39:39.453+02	2024-05-23 21:39:39.453+02	1
151	ea823230-6c89-4ca1-8445-2059ec9ce311	2024-05-25 12:03:57.11+02	2024-05-24 12:03:57.111+02	2024-05-24 12:03:57.111+02	1
153	6a17f265-d63f-472f-ae27-f1f8d7d674b8	2024-05-25 12:30:41.477+02	2024-05-24 12:30:41.477+02	2024-05-24 12:30:41.477+02	1
154	af198242-d586-494b-bafe-934a99f5feab	2024-05-25 16:20:44.121+02	2024-05-24 16:20:44.121+02	2024-05-24 16:20:44.121+02	1
159	9b6be84f-5e48-4dac-b188-ddd1afacffc3	2024-05-27 19:53:32.926+02	2024-05-26 19:53:32.926+02	2024-05-26 19:53:32.926+02	1
162	50d9f65f-00b9-4fff-a4ab-c14c40a63f6a	2024-05-28 21:08:25.847+02	2024-05-27 21:08:25.848+02	2024-05-27 21:08:25.848+02	1
165	5241e0f2-a290-464b-b730-5db093b73f67	2024-05-29 17:36:21.07+02	2024-05-28 17:36:21.071+02	2024-05-28 17:36:21.071+02	1
166	2fd9acc0-2009-465c-a53e-4b634c73d3e6	2024-05-29 17:37:36.739+02	2024-05-28 17:37:36.739+02	2024-05-28 17:37:36.739+02	1
169	fb68728f-603d-41a4-95b4-9fb64c666446	2024-05-29 18:10:10.402+02	2024-05-28 18:10:10.402+02	2024-05-28 18:10:10.402+02	1
170	7a801bc8-4420-42d9-bee8-f9288e6c621c	2024-05-29 18:41:32.999+02	2024-05-28 18:41:32.999+02	2024-05-28 18:41:32.999+02	1
174	1096be04-aa35-424a-b3aa-93b8bd0c9923	2024-05-29 21:11:58.302+02	2024-05-28 21:11:58.302+02	2024-05-28 21:11:58.302+02	1
175	872d6586-aaf4-454c-bf7a-c58205e015a0	2024-05-29 22:00:03.051+02	2024-05-28 22:00:03.051+02	2024-05-28 22:00:03.051+02	1
179	76af86bd-2c5e-4d1d-ad0c-e3ac18478d4f	2024-05-30 13:37:52.117+02	2024-05-29 13:37:52.117+02	2024-05-29 13:37:52.117+02	1
181	89880107-49e9-4699-bda8-be3d7b494072	2024-05-30 17:22:39.828+02	2024-05-29 17:22:39.829+02	2024-05-29 17:22:39.829+02	1
186	7fa3505e-a122-4e70-babd-4e541918224e	2024-05-31 04:21:40.449+02	2024-05-30 04:21:40.45+02	2024-05-30 04:21:40.45+02	1
187	21fc089c-57a7-410c-92a1-8cda4f4a5a81	2024-05-31 04:43:20.496+02	2024-05-30 04:43:20.496+02	2024-05-30 04:43:20.496+02	1
197	77dc7702-75c4-4b3b-8c02-2abcd99e56e4	2024-06-04 16:24:36.081+02	2024-06-03 16:24:36.082+02	2024-06-03 16:24:36.082+02	1
3	8267d468-81c5-456c-8186-3d47aee3cceb	2024-05-10 22:42:01.124+02	2024-05-09 22:42:01.124+02	2024-05-09 22:42:01.124+02	\N
4	9bfcb958-e1de-4d57-8587-492f88517826	2024-05-10 22:45:05.914+02	2024-05-09 22:45:05.914+02	2024-05-09 22:45:05.914+02	\N
5	41c679dc-5ead-4cb3-916e-04749b10edd8	2024-05-10 22:45:37.025+02	2024-05-09 22:45:37.025+02	2024-05-09 22:45:37.025+02	\N
6	c1242127-afd7-4f82-9ee9-5da608482858	2024-05-10 22:46:23.554+02	2024-05-09 22:46:23.555+02	2024-05-09 22:46:23.555+02	\N
31	33215b73-6df7-4fa6-9e12-38059130b628	2024-05-17 10:48:43.476+02	2024-05-16 10:48:43.477+02	2024-05-16 10:48:43.477+02	\N
32	f11ff976-5de0-4bec-b3dc-9bfd2106e4f9	2024-05-17 10:50:12.664+02	2024-05-16 10:50:12.664+02	2024-05-16 10:50:12.664+02	\N
35	51cec393-8f3a-479d-bebf-e1161ba34b81	2024-05-17 12:54:15.775+02	2024-05-16 12:54:15.775+02	2024-05-16 12:54:15.775+02	\N
36	ba3b707c-f417-495a-99b3-c28e44bf8c8a	2024-05-17 12:54:47.455+02	2024-05-16 12:54:47.455+02	2024-05-16 12:54:47.455+02	\N
37	f5e339df-d333-4c28-9eea-feb5a3d704f8	2024-05-17 12:56:02.526+02	2024-05-16 12:56:02.527+02	2024-05-16 12:56:02.527+02	\N
38	2d6ddf2c-dda8-4aa4-a2a8-6bc5cc5c5320	2024-05-17 12:57:16.888+02	2024-05-16 12:57:16.888+02	2024-05-16 12:57:16.888+02	\N
39	5bbc39a9-c657-4fc5-a6f8-b6c6382260a5	2024-05-17 12:57:28.177+02	2024-05-16 12:57:28.177+02	2024-05-16 12:57:28.177+02	\N
202	13382581-eaae-4d2b-a38b-0f6fdfec94c3	2024-06-06 09:52:01.188+02	2024-06-05 09:52:01.188+02	2024-06-05 09:52:01.188+02	1
206	4a4f3a5e-6133-409e-b494-6c839b0c3bd7	2024-06-08 20:44:46.754+02	2024-06-07 20:44:46.755+02	2024-06-07 20:44:46.755+02	1
209	bbe9dad8-6d48-452e-8e5c-cd9de7da0ff3	2024-06-09 14:30:51.94+02	2024-06-08 14:30:51.941+02	2024-06-08 14:30:51.941+02	1
218	0516944c-621b-4cbc-a644-00131df8ee1d	2024-06-09 21:27:26.977+02	2024-06-08 21:27:26.977+02	2024-06-08 21:27:26.977+02	1
220	da6fac2e-495f-4d8d-92cf-71487896d71d	2024-06-10 13:29:30.5+02	2024-06-09 13:29:30.5+02	2024-06-09 13:29:30.5+02	1
221	ca5ebdc0-6ce0-43ec-abc0-acdb95d0d72a	2024-06-10 16:32:42.459+02	2024-06-09 16:32:42.46+02	2024-06-09 16:32:42.46+02	1
226	f48789b3-1f6a-4602-bc9c-f98dfbae7e20	2024-06-10 19:48:53.32+02	2024-06-09 19:48:53.32+02	2024-06-09 19:48:53.32+02	1
257	dc5542de-b0b9-4a37-8ee1-2d69aabad109	2024-06-13 18:38:10.278+02	2024-06-12 18:38:10.278+02	2024-06-12 18:38:10.278+02	1
260	a00f6bb9-1a1b-4732-8b30-1a075e73925e	2024-06-13 19:27:53.921+02	2024-06-12 19:27:53.921+02	2024-06-12 19:27:53.921+02	1
267	979ef8ce-2747-4639-a8c0-85045d6f1731	2024-06-13 20:19:05.842+02	2024-06-12 20:19:05.843+02	2024-06-12 20:19:05.843+02	1
268	95453f86-81c8-4f79-8d89-8f473814df6f	2024-06-14 10:18:21.077+02	2024-06-13 10:18:21.078+02	2024-06-13 10:18:21.078+02	1
271	092b2421-0aaa-46cc-86b3-2ca163be4dbf	2024-06-14 18:50:28.672+02	2024-06-13 18:50:28.672+02	2024-06-13 18:50:28.672+02	1
274	95211abe-4592-4dc7-89dc-d96e14383248	2024-06-14 21:04:42.283+02	2024-06-13 21:04:42.283+02	2024-06-13 21:04:42.283+02	1
275	d7090fd5-e97c-463a-b665-e50a78f0a7a8	2024-06-14 21:14:02.613+02	2024-06-13 21:14:02.613+02	2024-06-13 21:14:02.613+02	1
279	1a5b4074-d64a-4f51-90f1-f2a18473a23c	2024-06-15 13:11:56.922+02	2024-06-14 13:11:56.922+02	2024-06-14 13:11:56.922+02	1
280	6190772f-a5d1-4460-a410-2f0d48b3cf2f	2024-06-15 13:15:28.925+02	2024-06-14 13:15:28.926+02	2024-06-14 13:15:28.926+02	1
258	9a729d2b-b7f0-47bb-953c-0a7108dcfa8c	2024-06-13 19:17:30.228+02	2024-06-12 19:17:30.229+02	2024-06-12 19:17:30.229+02	\N
259	20001281-723f-4a0b-9619-f45404b9faab	2024-06-13 19:20:25.691+02	2024-06-12 19:20:25.691+02	2024-06-12 19:20:25.691+02	\N
282	2fc306ad-1bc6-47aa-a6f4-f6dad3dff452	2024-06-16 15:17:31.632+02	2024-06-15 15:17:31.632+02	2024-06-15 15:17:31.632+02	1
7	489f1029-91aa-4aae-945f-6ad805e18106	2024-05-10 22:47:03.948+02	2024-05-09 22:47:03.948+02	2024-05-09 22:47:03.948+02	\N
8	9f8ed9cc-962c-4a98-872f-27197971180c	2024-05-10 22:47:43.686+02	2024-05-09 22:47:43.686+02	2024-05-09 22:47:43.686+02	\N
33	c9ab085c-1c89-4b0b-a4d2-2566da049945	2024-05-17 10:52:10.303+02	2024-05-16 10:52:10.303+02	2024-05-16 10:52:10.303+02	\N
45	244a4a8d-72e3-4ec7-abcf-72922dbb5c34	2024-05-17 16:11:58.432+02	2024-05-16 16:11:58.432+02	2024-05-16 16:11:58.432+02	\N
107	7f443c96-729c-4595-b99e-f49fed866ab5	2024-05-21 18:43:15.345+02	2024-05-20 18:43:15.345+02	2024-05-20 18:43:15.345+02	\N
184	111b7d71-e0e8-4295-86ee-88f4a4f31be3	2024-05-31 01:39:18.392+02	2024-05-30 01:39:18.392+02	2024-05-30 01:39:18.392+02	\N
9	a4928082-156a-4d82-9b35-e986461d5414	2024-05-10 22:48:11.713+02	2024-05-09 22:48:11.713+02	2024-05-09 22:48:11.713+02	\N
10	5a4dc3ef-035f-450c-a35e-6c90e96ce2c0	2024-05-10 22:48:47.072+02	2024-05-09 22:48:47.072+02	2024-05-09 22:48:47.072+02	\N
11	4751400f-49c9-4b96-a2f4-5b7472217a78	2024-05-10 22:52:14.732+02	2024-05-09 22:52:14.733+02	2024-05-09 22:52:14.733+02	\N
12	9e4db9c3-4dfa-4aeb-a9d5-3b17a9f61b84	2024-05-10 23:00:02.744+02	2024-05-09 23:00:02.744+02	2024-05-09 23:00:02.744+02	\N
13	ce6fd17f-f54e-45db-93a4-3d40e449f540	2024-05-10 23:00:38.995+02	2024-05-09 23:00:38.996+02	2024-05-09 23:00:38.996+02	\N
14	e73d3d4d-9af4-4680-913a-dbf07edbe4df	2024-05-10 23:00:59.24+02	2024-05-09 23:00:59.24+02	2024-05-09 23:00:59.24+02	\N
15	4b32031c-f815-4e92-b47c-983ab21a2150	2024-05-10 23:24:16.306+02	2024-05-09 23:24:16.306+02	2024-05-09 23:24:16.306+02	\N
16	c0374a73-43ae-4340-bb73-888e08b2b0dd	2024-05-10 23:30:24.626+02	2024-05-09 23:30:24.626+02	2024-05-09 23:30:24.626+02	\N
18	53cc6d31-3cd6-43db-87dd-0b7f06d53f26	2024-05-11 00:43:11.944+02	2024-05-10 00:43:11.945+02	2024-05-10 00:43:11.945+02	\N
19	2bfc9a46-ba97-4536-8ce3-a8345d91ba54	2024-05-11 02:29:29.123+02	2024-05-10 02:29:29.123+02	2024-05-10 02:29:29.123+02	\N
20	cfb4ea8f-8f5f-45a6-975f-46206030f466	2024-05-14 20:52:15.415+02	2024-05-13 20:52:15.416+02	2024-05-13 20:52:15.416+02	\N
21	9f1cbd73-bcc3-4581-bcf2-a8f3b3d42280	2024-05-15 21:02:07.544+02	2024-05-14 21:02:07.544+02	2024-05-14 21:02:07.544+02	\N
22	55a552c8-2d9e-42c9-b04c-3d521f1c7280	2024-05-15 22:06:01.926+02	2024-05-14 22:06:01.927+02	2024-05-14 22:06:01.927+02	\N
24	c12ae722-37a1-400f-8b69-1d5a4ae92ab0	2024-05-16 16:13:19.325+02	2024-05-15 16:13:19.326+02	2024-05-15 16:13:19.326+02	\N
25	1f1fecac-c195-4abc-ad35-4b9375884b36	2024-05-16 18:23:28.336+02	2024-05-15 18:23:28.337+02	2024-05-15 18:23:28.337+02	\N
26	bbbfc181-477a-47e9-bd5b-145d8a56de60	2024-05-17 04:03:23.848+02	2024-05-16 04:03:23.849+02	2024-05-16 04:03:23.849+02	\N
27	8f8851ab-ecef-4ec6-a5d8-f9d152a87988	2024-05-17 05:52:25.554+02	2024-05-16 05:52:25.555+02	2024-05-16 05:52:25.555+02	\N
28	5d9d9f6a-9546-4713-9298-c60cd838a17c	2024-05-17 07:03:56.875+02	2024-05-16 07:03:56.876+02	2024-05-16 07:03:56.876+02	\N
30	12ce4c9c-a24f-4969-8ff2-3ac57538fd7b	2024-05-17 10:32:16.791+02	2024-05-16 10:32:16.791+02	2024-05-16 10:32:16.791+02	\N
34	402eb7a7-f8e4-4928-8d49-c5ce83ede358	2024-05-17 12:40:36.356+02	2024-05-16 12:40:36.356+02	2024-05-16 12:40:36.356+02	\N
40	f46cd72b-eaa7-4725-a536-aaa8a5969e90	2024-05-17 13:14:59.91+02	2024-05-16 13:14:59.91+02	2024-05-16 13:14:59.91+02	\N
41	ada37e2a-a95d-4347-9cb2-4c0f0f329b7c	2024-05-17 14:17:22.281+02	2024-05-16 14:17:22.282+02	2024-05-16 14:17:22.282+02	\N
42	5335a68e-49c8-4318-bb57-128766d42fb6	2024-05-17 14:32:13.207+02	2024-05-16 14:32:13.207+02	2024-05-16 14:32:13.207+02	\N
44	b22e32b1-ae4e-4382-8c32-9ac0d2ec313b	2024-05-17 16:06:56.263+02	2024-05-16 16:06:56.263+02	2024-05-16 16:06:56.263+02	\N
46	25a0d8a0-7122-4463-9fda-e6e3ea450aec	2024-05-17 16:18:15.903+02	2024-05-16 16:18:15.904+02	2024-05-16 16:18:15.904+02	\N
47	a0c1d63c-a831-4d8b-be77-513ade98cedc	2024-05-17 16:18:35.356+02	2024-05-16 16:18:35.356+02	2024-05-16 16:18:35.356+02	\N
48	5a53fdc8-1928-45a3-ab9b-ec80d6ee35b0	2024-05-17 16:19:37.904+02	2024-05-16 16:19:37.904+02	2024-05-16 16:19:37.904+02	\N
49	9cda5932-e63b-424f-a8a5-b29f6bcfd808	2024-05-17 20:07:56.853+02	2024-05-16 20:07:56.853+02	2024-05-16 20:07:56.853+02	\N
50	f36f61de-1f7f-4bdc-ab4e-003288a6a603	2024-05-17 20:12:43.262+02	2024-05-16 20:12:43.262+02	2024-05-16 20:12:43.262+02	\N
51	cd8ff986-aaf8-4414-a2df-28eda3d72742	2024-05-17 20:50:48.831+02	2024-05-16 20:50:48.831+02	2024-05-16 20:50:48.831+02	\N
52	38580a5c-473a-47d2-b281-64fa4ba343e2	2024-05-17 20:50:51.629+02	2024-05-16 20:50:51.629+02	2024-05-16 20:50:51.629+02	\N
53	f13d0d6b-595b-41ba-b1a7-7cde14341818	2024-05-17 20:50:53.725+02	2024-05-16 20:50:53.725+02	2024-05-16 20:50:53.725+02	\N
54	19bbfd1f-71fd-4eb9-81a4-ea510b5be41c	2024-05-17 21:02:16.104+02	2024-05-16 21:02:16.104+02	2024-05-16 21:02:16.104+02	\N
55	f5ecb4ac-9d54-4fd3-9985-18a2c918dabe	2024-05-17 21:08:14.8+02	2024-05-16 21:08:14.8+02	2024-05-16 21:08:14.8+02	\N
56	dd42d775-7236-4ed9-bf44-0a442c6543a5	2024-05-18 09:14:53.639+02	2024-05-17 09:14:53.64+02	2024-05-17 09:14:53.64+02	\N
59	cae945dc-229e-44a9-8db6-aeb5edb18a36	2024-05-18 09:17:20.99+02	2024-05-17 09:17:20.99+02	2024-05-17 09:17:20.99+02	\N
61	4dde5449-851f-42d4-a513-ab5bd79d681b	2024-05-18 10:18:03.999+02	2024-05-17 10:18:03.999+02	2024-05-17 10:18:03.999+02	\N
62	c9500936-b6ae-40f3-be2f-8f773f6cbde8	2024-05-18 10:57:59.778+02	2024-05-17 10:57:59.78+02	2024-05-17 10:57:59.78+02	\N
66	dd78664a-13fb-46ff-a15f-a5921a9dff2f	2024-05-18 11:47:56.043+02	2024-05-17 11:47:56.044+02	2024-05-17 11:47:56.044+02	\N
67	e608898b-4f07-425a-a476-32247816d572	2024-05-18 11:49:37.834+02	2024-05-17 11:49:37.835+02	2024-05-17 11:49:37.835+02	\N
68	3d41db87-f833-4559-b18d-7d1f9a3782da	2024-05-18 11:50:25.178+02	2024-05-17 11:50:25.179+02	2024-05-17 11:50:25.179+02	\N
69	0aeb0ed5-d5b5-41e7-b238-fe3307808cd6	2024-05-18 11:50:30.048+02	2024-05-17 11:50:30.049+02	2024-05-17 11:50:30.049+02	\N
72	7f37989f-0823-47db-b330-95cd54f95f8e	2024-05-19 13:12:12.221+02	2024-05-18 13:12:12.221+02	2024-05-18 13:12:12.221+02	\N
74	2dd5a532-4d22-4010-af78-1e073f627fbc	2024-05-19 13:14:25.58+02	2024-05-18 13:14:25.58+02	2024-05-18 13:14:25.58+02	\N
75	635479ff-060b-4a9c-9088-cdd8d2a21fec	2024-05-19 15:23:10.875+02	2024-05-18 15:23:10.875+02	2024-05-18 15:23:10.875+02	\N
76	6c788afc-9552-4ee5-b98f-7075bd53ae98	2024-05-19 15:32:29.153+02	2024-05-18 15:32:29.153+02	2024-05-18 15:32:29.153+02	\N
78	e213de0c-f3f4-4c03-b4db-7ada06246136	2024-05-19 15:49:20.452+02	2024-05-18 15:49:20.452+02	2024-05-18 15:49:20.452+02	\N
85	0ccb8bb6-5cf4-4634-bc4e-7c7519f25da4	2024-05-19 15:57:55.26+02	2024-05-18 15:57:55.26+02	2024-05-18 15:57:55.26+02	\N
87	ab4ae8be-22dc-404f-b280-d0935d290503	2024-05-20 11:10:05.013+02	2024-05-19 11:10:05.013+02	2024-05-19 11:10:05.013+02	\N
88	cab69095-78de-49ec-a2f2-8346028f4790	2024-05-20 11:10:26.544+02	2024-05-19 11:10:26.544+02	2024-05-19 11:10:26.544+02	\N
89	8b44f6dc-291d-4d19-840d-e55e4b4a3ac1	2024-05-20 11:10:41.391+02	2024-05-19 11:10:41.391+02	2024-05-19 11:10:41.391+02	\N
91	ccc0031a-f21d-4172-b8e1-0e94a8797116	2024-05-20 11:15:58.793+02	2024-05-19 11:15:58.793+02	2024-05-19 11:15:58.793+02	\N
93	a37292a3-77da-4bb8-80c4-f163bd1139ec	2024-05-20 12:13:21.044+02	2024-05-19 12:13:21.045+02	2024-05-19 12:13:21.045+02	\N
94	fb67cf08-202f-4d17-a289-c1a2ff150de8	2024-05-20 21:21:23.345+02	2024-05-19 21:21:23.345+02	2024-05-19 21:21:23.345+02	\N
95	067911cb-09ae-466e-9ec1-b78f75f199f6	2024-05-20 21:57:47.443+02	2024-05-19 21:57:47.443+02	2024-05-19 21:57:47.443+02	\N
99	8e1af127-0535-4ffb-ae2a-3319b0a8ccc1	2024-05-21 12:10:09.877+02	2024-05-20 12:10:09.877+02	2024-05-20 12:10:09.877+02	\N
106	f63a19a2-f997-417a-a392-45f28f562dfd	2024-05-21 18:26:01.089+02	2024-05-20 18:26:01.089+02	2024-05-20 18:26:01.089+02	\N
108	580c02cf-a73d-4b05-8e48-e35fbfd727fa	2024-05-21 18:43:31.428+02	2024-05-20 18:43:31.429+02	2024-05-20 18:43:31.429+02	\N
109	1d3730ef-a8b5-4f83-8265-1d79fdf1f3bd	2024-05-21 18:50:17.429+02	2024-05-20 18:50:17.429+02	2024-05-20 18:50:17.429+02	\N
110	fce3ebf7-de04-48ee-84ed-6d7c7d692a4d	2024-05-21 18:57:08.178+02	2024-05-20 18:57:08.178+02	2024-05-20 18:57:08.178+02	\N
111	27508bb9-487c-4e33-8d2f-2f3d91f9e225	2024-05-21 20:20:35.414+02	2024-05-20 20:20:35.415+02	2024-05-20 20:20:35.415+02	\N
114	290885b7-2a01-4cc3-ac87-69996cb404fe	2024-05-21 20:28:53.684+02	2024-05-20 20:28:53.684+02	2024-05-20 20:28:53.684+02	\N
119	8c90dc77-c49a-4cb9-b425-94228095f33f	2024-05-22 09:03:58.525+02	2024-05-21 09:03:58.525+02	2024-05-21 09:03:58.525+02	\N
121	4bf89ab0-e07d-4bd7-adb0-34cf90cc811b	2024-05-22 12:36:17.503+02	2024-05-21 12:36:17.503+02	2024-05-21 12:36:17.503+02	\N
122	94274b0b-8e95-4214-8f5b-9c5dd1b0ef0c	2024-05-22 15:45:05.285+02	2024-05-21 15:45:05.285+02	2024-05-21 15:45:05.285+02	\N
128	76be6d0d-ea4c-43e6-98dd-2ac29d7783cd	2024-05-23 00:36:20.047+02	2024-05-22 00:36:20.047+02	2024-05-22 00:36:20.047+02	\N
129	af034165-ec1b-4017-a44d-b3b879e7cce6	2024-05-23 00:37:58.775+02	2024-05-22 00:37:58.775+02	2024-05-22 00:37:58.775+02	\N
130	8195b995-0358-40bb-b03a-aa6299f57ca4	2024-05-23 00:38:15.663+02	2024-05-22 00:38:15.664+02	2024-05-22 00:38:15.664+02	\N
131	ccd0456e-e535-48e1-b379-b468a13c96c1	2024-05-23 00:41:23.923+02	2024-05-22 00:41:23.923+02	2024-05-22 00:41:23.923+02	\N
132	cef7f5e7-deb1-4308-836d-b5c9999364eb	2024-05-23 00:41:36.522+02	2024-05-22 00:41:36.522+02	2024-05-22 00:41:36.522+02	\N
133	c0e08efd-71f4-4199-9c2d-f9561d70d86b	2024-05-23 00:43:02.594+02	2024-05-22 00:43:02.594+02	2024-05-22 00:43:02.594+02	\N
134	a314966c-8102-4e78-b483-134e3931ce24	2024-05-23 00:44:21.417+02	2024-05-22 00:44:21.417+02	2024-05-22 00:44:21.417+02	\N
135	f16d2cc1-5581-452d-a3e7-84c6a60be169	2024-05-23 00:45:32.877+02	2024-05-22 00:45:32.877+02	2024-05-22 00:45:32.877+02	\N
136	abbcca23-4bab-4dbe-8e6a-335deb140a82	2024-05-23 00:47:44.105+02	2024-05-22 00:47:44.105+02	2024-05-22 00:47:44.105+02	\N
143	3452de3d-7e3d-4bc0-98a7-1b6fd334ff70	2024-05-24 11:18:57.223+02	2024-05-23 11:18:57.223+02	2024-05-23 11:18:57.223+02	\N
146	0feb8291-b723-44e8-b93a-5d9f0687f61f	2024-05-24 16:41:12.602+02	2024-05-23 16:41:12.602+02	2024-05-23 16:41:12.602+02	\N
152	b8854b20-4856-472d-8c7c-0dbcf9161318	2024-05-25 12:26:51.225+02	2024-05-24 12:26:51.225+02	2024-05-24 12:26:51.225+02	\N
155	56d10ef5-1ba3-4f9c-b4be-4b34a6912bf0	2024-05-27 16:51:11.489+02	2024-05-26 16:51:11.49+02	2024-05-26 16:51:11.49+02	\N
156	f416d890-4af4-41e5-82ee-7e8b17c31be3	2024-05-27 16:59:39.211+02	2024-05-26 16:59:39.211+02	2024-05-26 16:59:39.211+02	\N
157	12c3f7bc-cfbb-44c5-852f-c709e3af157e	2024-05-27 17:56:58.739+02	2024-05-26 17:56:58.739+02	2024-05-26 17:56:58.739+02	\N
158	d5d77faa-7754-4756-b4ee-057abfb73572	2024-05-27 19:53:23.219+02	2024-05-26 19:53:23.22+02	2024-05-26 19:53:23.22+02	\N
160	43af16a7-2462-4cf2-b247-2c83906c5e44	2024-05-27 20:46:42.301+02	2024-05-26 20:46:42.301+02	2024-05-26 20:46:42.301+02	\N
161	ac191429-98c2-4338-9e1f-0848b37a518f	2024-05-28 20:52:10.491+02	2024-05-27 20:52:10.492+02	2024-05-27 20:52:10.492+02	\N
163	8758d709-3814-42a6-944d-f6eff7fd78bb	2024-05-28 22:05:51.049+02	2024-05-27 22:05:51.05+02	2024-05-27 22:05:51.05+02	\N
167	86923235-227c-41a2-91c7-03a4d1f4a150	2024-05-29 17:44:58.415+02	2024-05-28 17:44:58.416+02	2024-05-28 17:44:58.416+02	\N
168	55f5f151-be66-41c2-8bbb-9f3b800590ec	2024-05-29 18:09:48.212+02	2024-05-28 18:09:48.212+02	2024-05-28 18:09:48.212+02	\N
171	f23e4a86-3a3d-4824-8506-f9417a9a182d	2024-05-29 19:43:12.912+02	2024-05-28 19:43:12.912+02	2024-05-28 19:43:12.912+02	\N
172	02097b81-d3b0-4718-9bc7-abd4fd9ea648	2024-05-29 19:58:06.546+02	2024-05-28 19:58:06.546+02	2024-05-28 19:58:06.546+02	\N
173	0f819f8e-37e5-4d34-82d5-ba050462d9a0	2024-05-29 20:24:59.394+02	2024-05-28 20:24:59.395+02	2024-05-28 20:24:59.395+02	\N
178	07482555-a369-4bef-a427-06830af38450	2024-05-30 12:01:51.067+02	2024-05-29 12:01:51.067+02	2024-05-29 12:01:51.067+02	\N
180	119479ef-2ac0-4ad3-b1bb-fbf6766977f2	2024-05-30 15:16:01.208+02	2024-05-29 15:16:01.209+02	2024-05-29 15:16:01.209+02	\N
183	254454ce-74c5-4b49-9afd-84d1f316f936	2024-05-31 00:56:21.851+02	2024-05-30 00:56:21.851+02	2024-05-30 00:56:21.851+02	\N
188	6e892911-4111-49e3-b609-456f331cfca2	2024-06-01 06:51:20.932+02	2024-05-31 06:51:20.933+02	2024-05-31 06:51:20.933+02	\N
189	7c1b59bf-247a-48e4-96f6-63270348421f	2024-06-01 09:40:00.172+02	2024-05-31 09:40:00.173+02	2024-05-31 09:40:00.173+02	\N
190	f4e609ca-baad-469d-b4ac-d52c82f57ae7	2024-06-01 10:23:26.733+02	2024-05-31 10:23:26.733+02	2024-05-31 10:23:26.733+02	\N
196	0e98516f-2f65-4de0-af1e-1730bb33783b	2024-06-01 17:32:18.822+02	2024-05-31 17:32:18.823+02	2024-05-31 17:32:18.823+02	\N
207	8a278048-4374-45a2-8dd4-be5dd9efe067	2024-06-09 08:01:45.424+02	2024-06-08 08:01:45.424+02	2024-06-08 08:01:45.424+02	\N
208	eaba43c0-3a78-4654-b221-0501e2326ab5	2024-06-09 10:41:43.503+02	2024-06-08 10:41:43.503+02	2024-06-08 10:41:43.503+02	\N
283	8fbbf25e-3aec-409e-a32e-3e67b751c592	2024-06-16 15:19:46.779+02	2024-06-15 15:19:46.779+02	2024-06-15 15:19:46.779+02	\N
182	cc13ef91-441e-4934-9963-314be8151f6f	2024-05-30 22:19:30.063+02	2024-05-29 22:19:30.063+02	2024-05-29 22:19:30.063+02	\N
191	35f18b6f-04c2-409b-a157-85d02965ef16	2024-06-01 10:38:21.933+02	2024-05-31 10:38:21.933+02	2024-05-31 10:38:21.933+02	\N
195	8a9fb5b2-9425-4897-8d24-4848f3dd75d4	2024-06-01 11:35:04.604+02	2024-05-31 11:35:04.605+02	2024-05-31 11:35:04.605+02	\N
201	7caa5a53-cf5d-469d-b6bf-ef69ce7069de	2024-06-06 09:34:50.91+02	2024-06-05 09:34:50.911+02	2024-06-05 09:34:50.911+02	\N
210	7c618e09-22a0-4262-a0dc-843d1baf15cf	2024-06-09 14:45:33.027+02	2024-06-08 14:45:33.027+02	2024-06-08 14:45:33.027+02	\N
214	dd20d3a8-65b9-498a-b9c4-c7b5ab821778	2024-06-09 19:54:31.231+02	2024-06-08 19:54:31.231+02	2024-06-08 19:54:31.231+02	\N
281	17737af6-86bf-4229-a27e-1e98f02ef4ba	2024-06-16 15:11:28.606+02	2024-06-15 15:11:28.606+02	2024-06-15 15:11:28.606+02	\N
284	0dc2a9ad-7ec1-495a-a592-e161fa47792e	2024-06-16 15:19:59.709+02	2024-06-15 15:19:59.709+02	2024-06-15 15:19:59.709+02	\N
192	8075c206-d2ce-4551-a04f-1dfc41dddff1	2024-06-01 10:45:35.919+02	2024-05-31 10:45:35.919+02	2024-05-31 10:45:35.919+02	\N
193	c43859a6-23c4-48d3-add9-156df70a8f30	2024-06-01 10:45:53.086+02	2024-05-31 10:45:53.087+02	2024-05-31 10:45:53.087+02	\N
194	926358be-f0b8-4e3f-bbdf-4112acb70b0d	2024-06-01 10:45:53.172+02	2024-05-31 10:45:53.172+02	2024-05-31 10:45:53.172+02	\N
198	58081fa3-91af-4913-b758-be6f36e8c7f5	2024-06-04 17:15:43.859+02	2024-06-03 17:15:43.86+02	2024-06-03 17:15:43.86+02	\N
199	94598871-04e1-46b4-a522-21554b3ef7b5	2024-06-04 17:17:12.766+02	2024-06-03 17:17:12.767+02	2024-06-03 17:17:12.767+02	\N
200	1bb068c7-3401-4b83-8cf6-b29c5c65dcf4	2024-06-04 17:17:12.898+02	2024-06-03 17:17:12.898+02	2024-06-03 17:17:12.898+02	\N
203	f765efa4-bf16-4149-ac27-a638ca7a44e5	2024-06-08 08:25:01.549+02	2024-06-07 08:25:01.55+02	2024-06-07 08:25:01.55+02	\N
204	da286e98-7c02-450d-b725-1004d339918c	2024-06-08 08:26:05.568+02	2024-06-07 08:26:05.568+02	2024-06-07 08:26:05.568+02	\N
205	bbccaacb-00a3-4787-80aa-04182aa143e4	2024-06-08 08:26:05.789+02	2024-06-07 08:26:05.789+02	2024-06-07 08:26:05.789+02	\N
256	85f4df87-02ea-402b-8e05-48c5140ae492	2024-06-13 18:37:13.068+02	2024-06-12 18:37:13.068+02	2024-06-12 18:37:13.068+02	\N
276	248f36b6-7e57-4aa5-b0d8-2e18cf996868	2024-06-14 22:39:05.125+02	2024-06-13 22:39:05.125+02	2024-06-13 22:39:05.125+02	\N
211	37b567b5-c0ff-4b20-b217-1a62e70c6e21	2024-06-09 16:56:52.429+02	2024-06-08 16:56:52.43+02	2024-06-08 16:56:52.43+02	\N
212	fdf3842f-0e07-4f3c-8207-68250d9cebbb	2024-06-09 16:57:53.012+02	2024-06-08 16:57:53.012+02	2024-06-08 16:57:53.012+02	\N
213	ae1a01a8-3819-4cb4-8405-233d43db0e39	2024-06-09 16:57:53.114+02	2024-06-08 16:57:53.114+02	2024-06-08 16:57:53.114+02	\N
215	6b10d3b2-ef8f-43f7-b84c-40897aa7bc47	2024-06-09 21:25:04.534+02	2024-06-08 21:25:04.535+02	2024-06-08 21:25:04.535+02	\N
216	952b6bbf-8dec-44ca-90ab-ba7d58e9d6ab	2024-06-09 21:26:09.344+02	2024-06-08 21:26:09.344+02	2024-06-08 21:26:09.344+02	\N
217	29fa73bf-f7c6-4aba-8f44-e40ce5522d53	2024-06-09 21:26:09.749+02	2024-06-08 21:26:09.749+02	2024-06-08 21:26:09.749+02	\N
219	1bd9de81-73aa-4d66-a95b-ce3c4152de58	2024-06-10 13:28:58.268+02	2024-06-09 13:28:58.269+02	2024-06-09 13:28:58.269+02	\N
222	4bd5128a-df0c-42fd-b105-1ae217474666	2024-06-10 19:47:29.75+02	2024-06-09 19:47:29.751+02	2024-06-09 19:47:29.751+02	\N
223	cb101ca1-c717-4504-ae65-16de5ac18877	2024-06-10 19:47:42.669+02	2024-06-09 19:47:42.669+02	2024-06-09 19:47:42.669+02	\N
224	f4884a4d-b5f5-4450-9c5f-0108a7aecaf5	2024-06-10 19:47:42.798+02	2024-06-09 19:47:42.798+02	2024-06-09 19:47:42.798+02	\N
225	fe00b4ff-7428-4be7-a941-5fb279e3234b	2024-06-10 19:48:09.565+02	2024-06-09 19:48:09.565+02	2024-06-09 19:48:09.565+02	\N
227	436aa744-07e7-42fc-9dab-3236c974c575	2024-06-12 19:26:19.06+02	2024-06-11 19:26:19.06+02	2024-06-11 19:26:19.06+02	\N
228	5a302eea-16d7-41a3-ba1d-485c935d2eef	2024-06-12 19:26:39.796+02	2024-06-11 19:26:39.796+02	2024-06-11 19:26:39.796+02	\N
229	606ea13c-4dd5-4b9c-b5ae-d8725ced2d54	2024-06-12 19:27:21.216+02	2024-06-11 19:27:21.217+02	2024-06-11 19:27:21.217+02	\N
230	d8f34a32-9016-4ef4-abac-c60c903619cf	2024-06-12 19:27:21.32+02	2024-06-11 19:27:21.321+02	2024-06-11 19:27:21.321+02	\N
231	3de866f2-55b9-40ef-97eb-aa9e1d4cb970	2024-06-12 19:27:23.668+02	2024-06-11 19:27:23.668+02	2024-06-11 19:27:23.668+02	\N
232	e6017c47-0af6-41bd-bab0-d958ecd28f66	2024-06-12 19:27:23.755+02	2024-06-11 19:27:23.755+02	2024-06-11 19:27:23.755+02	\N
233	35ee3048-9d30-4a0c-8cfb-16148a739107	2024-06-12 19:27:25.044+02	2024-06-11 19:27:25.044+02	2024-06-11 19:27:25.044+02	\N
234	6bcfff82-5dce-4f62-9cc9-4618ec3d97c3	2024-06-12 19:27:25.127+02	2024-06-11 19:27:25.127+02	2024-06-11 19:27:25.127+02	\N
235	88137797-d85e-4704-8558-8f1cd51fc724	2024-06-12 19:28:22.322+02	2024-06-11 19:28:22.322+02	2024-06-11 19:28:22.322+02	\N
236	0adef1ca-99dd-4d64-843f-df125f40846d	2024-06-12 19:28:41.154+02	2024-06-11 19:28:41.154+02	2024-06-11 19:28:41.154+02	\N
237	29fd58de-71c0-43c6-a719-6dcbe0fb555f	2024-06-12 19:28:41.252+02	2024-06-11 19:28:41.252+02	2024-06-11 19:28:41.252+02	\N
238	9f4ee980-4527-4893-bd4f-9c5b850d556e	2024-06-12 19:28:43.37+02	2024-06-11 19:28:43.37+02	2024-06-11 19:28:43.37+02	\N
239	38737885-df4a-4292-bf58-22015d72a610	2024-06-12 19:28:43.462+02	2024-06-11 19:28:43.462+02	2024-06-11 19:28:43.462+02	\N
240	aef5e677-5665-4e5f-994e-91fab7bd7f6e	2024-06-12 19:28:45.074+02	2024-06-11 19:28:45.074+02	2024-06-11 19:28:45.074+02	\N
241	4ba3019b-4684-452f-a0bf-050300d6904a	2024-06-12 19:28:45.41+02	2024-06-11 19:28:45.41+02	2024-06-11 19:28:45.41+02	\N
242	6adec121-7568-4f7e-9dac-f1bdd1c4e9a5	2024-06-12 19:29:56.354+02	2024-06-11 19:29:56.354+02	2024-06-11 19:29:56.354+02	\N
243	9924dac8-ea03-4e4e-8d8f-f2db78223bdf	2024-06-12 19:30:04.079+02	2024-06-11 19:30:04.079+02	2024-06-11 19:30:04.079+02	\N
176	ec5dfb0c-b88d-4f83-a548-0f807bc3483b	2024-05-30 11:57:50.318+02	2024-05-29 11:57:50.318+02	2024-05-29 11:57:50.318+02	\N
177	2b6f20af-0285-46e5-ba08-9ce51cc80863	2024-05-30 12:00:32.464+02	2024-05-29 12:00:32.464+02	2024-05-29 12:00:32.464+02	\N
249	b450ae6c-8ecf-4d06-8841-f5a8a9c4ba32	2024-06-13 18:30:35.162+02	2024-06-12 18:30:35.163+02	2024-06-12 18:30:35.163+02	\N
250	a7b4186d-3ca2-4d4e-ae09-3833ca3a3cbb	2024-06-13 18:30:57.857+02	2024-06-12 18:30:57.858+02	2024-06-12 18:30:57.858+02	\N
251	aed86a51-a71c-4d6f-9456-7c39d1e3034b	2024-06-13 18:30:58.402+02	2024-06-12 18:30:58.402+02	2024-06-12 18:30:58.402+02	\N
252	52c80af9-e425-49b5-abe9-fe2107406116	2024-06-13 18:33:54.586+02	2024-06-12 18:33:54.586+02	2024-06-12 18:33:54.586+02	\N
253	457a59da-5ee7-464b-9de7-3f061e22bd36	2024-06-13 18:34:06.909+02	2024-06-12 18:34:06.909+02	2024-06-12 18:34:06.909+02	\N
254	038a9442-71ae-416d-90bb-08f702e517a4	2024-06-13 18:34:07.326+02	2024-06-12 18:34:07.326+02	2024-06-12 18:34:07.326+02	\N
244	e2f51565-5c55-4477-ad72-7b2a3ef00025	2024-06-12 19:32:20.831+02	2024-06-11 19:32:20.831+02	2024-06-11 19:32:20.831+02	\N
245	fe66e922-444a-440a-b97c-85f11adda2c5	2024-06-12 19:33:49.504+02	2024-06-11 19:33:49.505+02	2024-06-11 19:33:49.505+02	\N
246	00329d03-a2ee-4fec-811f-b953259854c3	2024-06-12 19:33:49.602+02	2024-06-11 19:33:49.602+02	2024-06-11 19:33:49.602+02	\N
247	6e571c33-34f3-4cb5-96fb-33f5eadaded6	2024-06-12 19:33:52.279+02	2024-06-11 19:33:52.279+02	2024-06-11 19:33:52.279+02	\N
248	0da23eca-8884-4f82-a468-6ffcd7cefa1f	2024-06-12 19:33:52.369+02	2024-06-11 19:33:52.369+02	2024-06-11 19:33:52.369+02	\N
263	90070dc2-b033-4e28-85ab-d01f7320dd66	2024-06-13 19:32:19.06+02	2024-06-12 19:32:19.06+02	2024-06-12 19:32:19.06+02	\N
264	7afd800a-672e-40eb-a245-dd082d14689f	2024-06-13 19:32:30.212+02	2024-06-12 19:32:30.212+02	2024-06-12 19:32:30.212+02	\N
57	476f2dff-66fc-40dd-8812-471ca7802ec7	2024-05-18 09:15:46.392+02	2024-05-17 09:15:46.392+02	2024-05-17 09:15:46.392+02	\N
58	c678f12f-43f2-4985-9bac-04a401b4a672	2024-05-18 09:16:07.553+02	2024-05-17 09:16:07.553+02	2024-05-17 09:16:07.553+02	\N
60	f95acb2e-df09-4483-bf92-4a81b0902bc4	2024-05-18 10:14:22.88+02	2024-05-17 10:14:22.881+02	2024-05-17 10:14:22.881+02	\N
102	d0fb518c-25e5-4aa6-b8ae-bf450a12f4c8	2024-05-21 17:36:46.632+02	2024-05-20 17:36:46.633+02	2024-05-20 17:36:46.633+02	\N
103	3c65226c-dbc6-4602-9526-0fb8150a1e11	2024-05-21 17:41:39.237+02	2024-05-20 17:41:39.237+02	2024-05-20 17:41:39.237+02	\N
113	26946791-a76c-4a73-8765-f2320b6abae3	2024-05-21 20:22:44.343+02	2024-05-20 20:22:44.343+02	2024-05-20 20:22:44.343+02	\N
115	4837117c-bccd-483c-80c3-2e961d396293	2024-05-21 20:29:06.067+02	2024-05-20 20:29:06.067+02	2024-05-20 20:29:06.067+02	\N
116	8454873d-e7a3-4368-b352-aebfd0e9bd96	2024-05-21 20:31:49.439+02	2024-05-20 20:31:49.439+02	2024-05-20 20:31:49.439+02	\N
123	3a5c3beb-6982-4025-ab09-f732b231873a	2024-05-22 15:45:14.225+02	2024-05-21 15:45:14.225+02	2024-05-21 15:45:14.225+02	\N
139	fa5eb104-4b44-41e4-8751-b0adc23e2383	2024-05-24 08:54:53.073+02	2024-05-23 08:54:53.074+02	2024-05-23 08:54:53.074+02	\N
141	e82fb979-caaa-4451-af87-dd5599e4882d	2024-05-24 10:59:23.055+02	2024-05-23 10:59:23.056+02	2024-05-23 10:59:23.056+02	\N
147	0fc6a700-581b-4e0f-a7a5-b1f819ad35de	2024-05-24 16:41:40.585+02	2024-05-23 16:41:40.585+02	2024-05-23 16:41:40.585+02	\N
148	7539a6c1-8eca-4366-b3af-cc0e55dc1845	2024-05-24 21:38:29.675+02	2024-05-23 21:38:29.676+02	2024-05-23 21:38:29.676+02	\N
164	7de478ff-f770-4e57-ad04-847e1acef101	2024-05-29 06:54:26.586+02	2024-05-28 06:54:26.587+02	2024-05-28 06:54:26.587+02	\N
185	454c9ff3-120c-47cc-88d1-ba66ae7986ef	2024-05-31 03:43:14.28+02	2024-05-30 03:43:14.281+02	2024-05-30 03:43:14.281+02	\N
255	fa0fe520-eae5-4352-838a-7a3989e28617	2024-06-13 18:36:25.442+02	2024-06-12 18:36:25.442+02	2024-06-12 18:36:25.442+02	\N
261	3a792bcd-62f7-41f4-b3bd-5f65611e0f5c	2024-06-13 19:28:22.436+02	2024-06-12 19:28:22.437+02	2024-06-12 19:28:22.437+02	\N
262	6e5090c1-dd5e-4525-8894-f9e827dab877	2024-06-13 19:29:43.815+02	2024-06-12 19:29:43.815+02	2024-06-12 19:29:43.815+02	\N
265	54e67d8a-8dd6-43d3-850a-184dbf2f1cde	2024-06-13 19:59:08.67+02	2024-06-12 19:59:08.67+02	2024-06-12 19:59:08.67+02	\N
266	ca9ee5be-1e90-4886-b699-90747b9c44e6	2024-06-13 20:03:56.332+02	2024-06-12 20:03:56.332+02	2024-06-12 20:03:56.332+02	\N
269	68007cf8-1262-43a3-a8f2-ecb146bb24a8	2024-06-14 18:49:33.192+02	2024-06-13 18:49:33.193+02	2024-06-13 18:49:33.193+02	\N
270	5273ae1a-71d1-4039-840d-a582b10d5527	2024-06-14 18:49:43.136+02	2024-06-13 18:49:43.137+02	2024-06-13 18:49:43.137+02	\N
272	eff1731e-516d-4fdb-974f-d5944b61c3c6	2024-06-14 21:00:05.001+02	2024-06-13 21:00:05.001+02	2024-06-13 21:00:05.001+02	\N
273	65ff7b79-6ac9-4f76-adb4-29cff0b84b1c	2024-06-14 21:01:44.411+02	2024-06-13 21:01:44.411+02	2024-06-13 21:01:44.411+02	\N
277	d567f1bf-311c-432d-8394-36871dabd5a8	2024-06-15 13:10:42.647+02	2024-06-14 13:10:42.648+02	2024-06-14 13:10:42.648+02	\N
278	aad40c3b-1382-4c7c-b270-7d9ecaa1766f	2024-06-15 13:10:51.557+02	2024-06-14 13:10:51.557+02	2024-06-14 13:10:51.557+02	\N
295	1ade364e-35c9-41fd-b6af-9a17fe4b82c2	2024-06-17 11:07:10+02	2024-06-16 11:07:10+02	2024-06-16 11:07:10+02	1
296	cc8e9212-f2c4-4456-a50f-c1446bd4184c	2024-06-17 11:19:36.827+02	2024-06-16 11:19:36.828+02	2024-06-16 11:19:36.828+02	1
305	9ddcb115-6aa1-485f-acce-f3a2233c4300	2024-06-18 20:49:03.886+02	2024-06-17 20:49:03.886+02	2024-06-17 20:49:03.886+02	1
306	fc688982-b05a-4169-962e-6bfdc6ac9dff	2024-06-18 21:00:59.636+02	2024-06-17 21:00:59.637+02	2024-06-17 21:00:59.637+02	1
322	1fecee4c-9cc8-483d-88c2-8ea4f6d95aea	2024-06-19 10:30:35.623+02	2024-06-18 10:30:35.623+02	2024-06-18 10:30:35.623+02	1
328	04255eea-492b-47c2-85ab-91b4be1461bb	2024-06-20 12:34:24.558+02	2024-06-19 12:34:24.56+02	2024-06-19 12:34:24.56+02	1
334	9cdb7eb5-f550-45ae-aa2b-343eb34b43e9	2024-06-20 18:37:27.913+02	2024-06-19 18:37:27.913+02	2024-06-19 18:37:27.913+02	1
293	d9d1ccf4-376b-4880-a19d-dffaa7dc2c74	2024-06-17 11:05:11.703+02	2024-06-16 11:05:11.703+02	2024-06-16 11:05:11.703+02	\N
294	940fd085-a8ef-47af-96bf-7b415e3fd352	2024-06-17 11:05:21.683+02	2024-06-16 11:05:21.683+02	2024-06-16 11:05:21.683+02	\N
291	a78f471c-dddd-4991-b463-0d7f3e058bbd	2024-06-16 19:52:36.837+02	2024-06-15 19:52:36.837+02	2024-06-15 19:52:36.837+02	\N
290	2d54a13c-fa39-4f28-b612-b504859afebd	2024-06-16 19:52:14.886+02	2024-06-15 19:52:14.886+02	2024-06-15 19:52:14.886+02	\N
285	02c4ef24-dd98-42e6-b415-86a0a226e458	2024-06-16 15:33:15.302+02	2024-06-15 15:33:15.302+02	2024-06-15 15:33:15.302+02	\N
286	354f7204-afac-47ef-8d35-5555fcbdc98d	2024-06-16 15:33:29.713+02	2024-06-15 15:33:29.713+02	2024-06-15 15:33:29.713+02	\N
299	9286f3a3-cee5-490c-91bf-e3520dd5fd08	2024-06-17 11:28:24.79+02	2024-06-16 11:28:24.791+02	2024-06-16 11:28:24.791+02	\N
300	e84693d2-5289-4fdc-8c44-649529e76156	2024-06-17 11:28:40.396+02	2024-06-16 11:28:40.396+02	2024-06-16 11:28:40.396+02	\N
297	a4227690-c9c7-4b3c-a0d3-65ab61897ae1	2024-06-17 11:20:59.019+02	2024-06-16 11:20:59.019+02	2024-06-16 11:20:59.019+02	\N
298	6fe3a665-02be-4ad0-83dd-f7edcffb62cb	2024-06-17 11:21:22.247+02	2024-06-16 11:21:22.247+02	2024-06-16 11:21:22.247+02	\N
310	713a56f5-cd68-4da3-8bee-a8f8b4370899	2024-06-18 22:05:04.652+02	2024-06-17 22:05:04.652+02	2024-06-17 22:05:04.652+02	\N
311	f7c80b01-18da-4ce5-8052-5b6404bdc1d3	2024-06-18 22:05:11.409+02	2024-06-17 22:05:11.409+02	2024-06-17 22:05:11.409+02	\N
303	fca7eebf-b21b-49ba-891e-287badd234be	2024-06-18 20:47:41.774+02	2024-06-17 20:47:41.775+02	2024-06-17 20:47:41.775+02	\N
304	d22dcf73-3787-476c-ad25-e6301252acd2	2024-06-18 20:47:54.621+02	2024-06-17 20:47:54.621+02	2024-06-17 20:47:54.621+02	\N
307	b2c5d4e9-6177-4d73-8612-f66f94927974	2024-06-18 21:02:15.689+02	2024-06-17 21:02:15.689+02	2024-06-17 21:02:15.689+02	\N
308	b99853d4-6594-44f6-81f7-5d379e5ba9db	2024-06-18 21:02:25.212+02	2024-06-17 21:02:25.212+02	2024-06-17 21:02:25.212+02	\N
316	09cd8310-2508-455d-9c31-480dcde040c1	2024-06-18 22:44:20.531+02	2024-06-17 22:44:20.531+02	2024-06-17 22:44:20.531+02	\N
317	bf0a9080-297d-4516-a09f-4806ac8c5223	2024-06-18 22:44:29.304+02	2024-06-17 22:44:29.304+02	2024-06-17 22:44:29.304+02	\N
318	7048528d-dd7b-41ba-8e73-ad5dca01850d	2024-06-18 22:45:13.246+02	2024-06-17 22:45:13.247+02	2024-06-17 22:45:13.247+02	\N
319	09d8f545-78f9-4099-b2de-5e00eb71bd86	2024-06-18 22:45:21.328+02	2024-06-17 22:45:21.328+02	2024-06-17 22:45:21.328+02	\N
314	79ea9ef2-1936-4d22-bf01-5c98062b8f3d	2024-06-18 22:41:20.286+02	2024-06-17 22:41:20.286+02	2024-06-17 22:41:20.286+02	\N
315	0bf2c120-5204-4f47-94b1-4d7776dda173	2024-06-18 22:41:38.193+02	2024-06-17 22:41:38.193+02	2024-06-17 22:41:38.193+02	\N
312	87eb1063-8bb1-4a3e-8ab8-b8ccea690b64	2024-06-18 22:05:49.267+02	2024-06-17 22:05:49.267+02	2024-06-17 22:05:49.267+02	\N
313	03012b36-19ea-4756-adfe-6cd3a0122ec1	2024-06-18 22:06:00.491+02	2024-06-17 22:06:00.491+02	2024-06-17 22:06:00.491+02	\N
320	90f953ea-e71c-4bdd-ab66-1d62b00956d3	2024-06-19 10:21:59.785+02	2024-06-18 10:21:59.785+02	2024-06-18 10:21:59.785+02	\N
321	dc72e54b-e5ec-452f-b6d5-5243b35a492c	2024-06-19 10:22:45.439+02	2024-06-18 10:22:45.439+02	2024-06-18 10:22:45.439+02	\N
288	c4e9a56d-9c29-489c-81e0-8bca14b7e5bb	2024-06-16 16:47:36.266+02	2024-06-15 16:47:36.266+02	2024-06-15 16:47:36.266+02	\N
289	ece6757d-2f11-44c3-bd74-b3948bbffc7e	2024-06-16 16:48:06.456+02	2024-06-15 16:48:06.456+02	2024-06-15 16:48:06.456+02	\N
309	48c97747-b10e-43d4-9b33-99c3c50f6c19	2024-06-18 21:16:44.982+02	2024-06-17 21:16:44.983+02	2024-06-17 21:16:44.983+02	\N
324	c45c8410-00c4-4645-8cc8-4e65cfc6a60a	2024-06-19 18:23:20.03+02	2024-06-18 18:23:20.031+02	2024-06-18 18:23:20.031+02	\N
325	f52aa001-c0f8-4fdd-b5b8-45ea597bc4e5	2024-06-19 18:23:27.444+02	2024-06-18 18:23:27.444+02	2024-06-18 18:23:27.444+02	\N
301	e85ded93-cac2-49f2-b825-b125905565e1	2024-06-18 19:44:11.712+02	2024-06-17 19:44:11.713+02	2024-06-17 19:44:11.713+02	\N
302	a86363c5-727c-4c4b-b5a2-b4a0b4c6afe9	2024-06-18 19:44:36.858+02	2024-06-17 19:44:36.858+02	2024-06-17 19:44:36.858+02	\N
323	b351a018-b490-40d6-ae0a-8ee7cda377e0	2024-06-19 10:45:28.214+02	2024-06-18 10:45:28.214+02	2024-06-18 10:45:28.214+02	\N
326	95b38450-0647-4a46-9771-5b3710779c5b	2024-06-19 18:24:07.785+02	2024-06-18 18:24:07.786+02	2024-06-18 18:24:07.786+02	\N
327	1098c736-8d0a-41c1-ba5c-3cfa313f5181	2024-06-19 18:24:15.692+02	2024-06-18 18:24:15.692+02	2024-06-18 18:24:15.692+02	\N
329	6595072f-85b3-49e0-a97b-ec22a5d54d8c	2024-06-20 12:36:43.308+02	2024-06-19 12:36:43.308+02	2024-06-19 12:36:43.308+02	\N
330	f2e9f049-898d-4568-8a31-a6bdf630fc58	2024-06-20 12:36:50.339+02	2024-06-19 12:36:50.34+02	2024-06-19 12:36:50.34+02	\N
340	57eb0228-0751-4524-bf9d-246371bdbf3a	2024-06-20 18:56:29.798+02	2024-06-19 18:56:29.798+02	2024-06-19 18:56:29.798+02	\N
331	61f47309-66fe-4f5b-aa9d-fd476fb63b53	2024-06-20 18:12:37.583+02	2024-06-19 18:12:37.584+02	2024-06-19 18:12:37.584+02	\N
332	57ccee25-4ff2-45f3-8874-130f30463866	2024-06-20 18:13:01.789+02	2024-06-19 18:13:01.789+02	2024-06-19 18:13:01.789+02	\N
350	6391ff5d-e34c-402d-96ac-d149f75def33	2024-06-21 11:34:48.118+02	2024-06-20 11:34:48.118+02	2024-06-20 11:34:48.118+02	\N
335	5340d979-64bc-47c6-a401-e577d1bf7225	2024-06-20 18:39:48.486+02	2024-06-19 18:39:48.486+02	2024-06-19 18:39:48.486+02	\N
336	dd8be345-173a-49d9-ae42-e5e981bceaf9	2024-06-20 18:45:28.815+02	2024-06-19 18:45:28.816+02	2024-06-19 18:45:28.816+02	\N
333	79ceb0a4-c595-463f-9683-bc0a65033aa4	2024-06-20 18:25:59.85+02	2024-06-19 18:25:59.85+02	2024-06-19 18:25:59.85+02	\N
337	7bc158f3-3467-4605-9286-55980c75d3e3	2024-06-20 18:47:39.994+02	2024-06-19 18:47:39.994+02	2024-06-19 18:47:39.994+02	\N
338	97c5c519-5bc1-4f9f-9238-9f8bc5bcdf9a	2024-06-20 18:47:58.796+02	2024-06-19 18:47:58.796+02	2024-06-19 18:47:58.796+02	\N
339	9bb69f4c-731e-4d89-991e-0ddb6d180b69	2024-06-20 18:48:39.083+02	2024-06-19 18:48:39.084+02	2024-06-19 18:48:39.084+02	\N
341	c2cca3d4-f448-4441-af75-4c1117d5ad57	2024-06-21 10:44:09.223+02	2024-06-20 10:44:09.224+02	2024-06-20 10:44:09.224+02	\N
342	cb89f3cb-2218-4d06-af11-6ef46dceca21	2024-06-21 10:44:43.405+02	2024-06-20 10:44:43.406+02	2024-06-20 10:44:43.406+02	\N
343	dc326a8b-6958-4177-84b7-1ae6225b5370	2024-06-21 10:45:33.645+02	2024-06-20 10:45:33.646+02	2024-06-20 10:45:33.646+02	\N
344	8e18139f-370c-4e48-9add-5cbf3c9f0e8e	2024-06-21 10:47:44.277+02	2024-06-20 10:47:44.277+02	2024-06-20 10:47:44.277+02	\N
345	7c104809-e18c-4c0b-a92b-11c9ca4d974b	2024-06-21 10:53:45.523+02	2024-06-20 10:53:45.523+02	2024-06-20 10:53:45.523+02	\N
347	9263f836-3b7f-4e0f-b7d3-0d91f45a94f2	2024-06-21 11:00:28.64+02	2024-06-20 11:00:28.64+02	2024-06-20 11:00:28.64+02	\N
351	fab363aa-c313-40e8-a3d0-1eab57784afb	2024-06-21 11:46:38.575+02	2024-06-20 11:46:38.575+02	2024-06-20 11:46:38.575+02	\N
352	44681ce3-8706-49dc-a796-4604de66ac26	2024-06-21 11:46:54.973+02	2024-06-20 11:46:54.973+02	2024-06-20 11:46:54.973+02	\N
348	335615af-60cf-44ff-b714-1d020440e43d	2024-06-21 11:03:51.985+02	2024-06-20 11:03:51.985+02	2024-06-20 11:03:51.985+02	\N
349	e61fb725-4608-48f5-a422-9ea6d6856773	2024-06-21 11:04:36.458+02	2024-06-20 11:04:36.458+02	2024-06-20 11:04:36.458+02	\N
353	75c6da5f-5fd6-41d4-97b4-eb1cf8b2aa83	2024-06-21 14:22:23.435+02	2024-06-20 14:22:23.435+02	2024-06-20 14:22:23.435+02	\N
354	51783e5e-7768-4e14-a4e6-a334f45ca59d	2024-06-21 14:25:25.162+02	2024-06-20 14:25:25.162+02	2024-06-20 14:25:25.162+02	\N
346	33f68e0a-04b6-4f68-8434-8782142b29fc	2024-06-21 10:57:20.702+02	2024-06-20 10:57:20.703+02	2024-06-20 10:57:20.703+02	\N
355	d2cb5ce1-08ee-45db-87d9-3b607bb63078	2024-06-21 16:47:51.65+02	2024-06-20 16:47:51.652+02	2024-06-20 16:47:51.652+02	\N
356	e2d69e9e-14fb-49a3-8e03-656a01171248	2024-06-21 17:16:56.278+02	2024-06-20 17:16:56.279+02	2024-06-20 17:16:56.279+02	\N
357	4256b2a9-80ba-4b91-9095-4dfe175f17ec	2024-06-21 17:17:18.817+02	2024-06-20 17:17:18.817+02	2024-06-20 17:17:18.817+02	\N
358	33be95d8-30d2-4552-bbdb-ecd5c043b5e0	2024-06-21 23:02:22.485+02	2024-06-20 23:02:22.486+02	2024-06-20 23:02:22.486+02	\N
359	577a1ab8-6623-49d0-8ef8-1c956c6638fe	2024-06-22 09:24:44.926+02	2024-06-21 09:24:44.927+02	2024-06-21 09:24:44.927+02	\N
360	c97e5aa6-5a1d-422c-9f43-bcae448f8918	2024-06-22 09:27:11.387+02	2024-06-21 09:27:11.387+02	2024-06-21 09:27:11.387+02	\N
\.


--
-- Data for Name: reports; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reports (id, website, links, success, "createdAt", "updatedAt", method) FROM stdin;
1	aSDasdASDASD	{dsadasdfasdfasdf,asdgdf}	f	2024-06-16 03:01:58.872+02	2024-06-16 16:14:35.11+02	sdfaery\nrgu
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id, name, "createdAt", "updatedAt") FROM stdin;
1	user	2024-05-09 21:28:20.307+02	2024-05-09 21:28:20.307+02
2	moderator	2024-05-09 21:28:20.308+02	2024-05-09 21:28:20.308+02
3	admin	2024-05-09 21:28:20.308+02	2024-05-09 21:28:20.308+02
\.


--
-- Data for Name: rr_photo_summaries; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rr_photo_summaries (id, file, result, user_id, downloaded, expired, "createdAt", "updatedAt", progress) FROM stdin;
\.


--
-- Data for Name: rr_user_summaries; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rr_user_summaries (id, file, result, user_id, downloaded, expired, "createdAt", "updatedAt", progress) FROM stdin;
\.


--
-- Data for Name: scrape_summaries; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.scrape_summaries (id, scrape_date, total_google_links, total_google_images, total_google_videos, total_bing_links, total_bing_images, total_bing_videos, good_count, other_count, bad_count, new_count, report_count, no_report_count, matches_count, no_matches_count, status, user_id, "createdAt", "updatedAt", downloaded, accepted, only_google, only_bing, progress) FROM stdin;
\.


--
-- Data for Name: social_media_profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.social_media_profiles (id, name, count, user_id, "createdAt", "updatedAt", accepted) FROM stdin;
\.


--
-- Data for Name: social_summaries; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.social_summaries (id, file, result, user_id, downloaded, expired, "createdAt", "updatedAt", progress) FROM stdin;
\.


--
-- Data for Name: social_usernames; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.social_usernames (id, username, "userId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: subscribed_users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.subscribed_users (id, email, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: subscription_options; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.subscription_options (id, option_name, usernames, scanner, adult_tubs, file_hosted, google, bing, "createdAt", "updatedAt", ai_face, sm_scanner, sm_submit, r2r_of_user_content, dmca_badges, data_report, data_analytics, personal_agent, download_data) FROM stdin;
1	trial	1	1	f	f	1	1	2024-05-30 02:45:34.244851+02	2024-05-30 02:45:34.244851+02	0	0	0	f	t	f	f	0	f
2	starter	1	1	f	f	1	1	2024-05-30 02:45:41.320051+02	2024-05-30 02:45:41.320051+02	0	0	0	f	t	t	f	1	t
4	star	5	5	t	t	5	5	2024-05-30 02:51:26.72816+02	2024-05-30 02:51:26.72816+02	5	5	5	t	t	t	t	5	t
3	pro	3	3	t	t	3	3	2024-05-30 02:51:28.686098+02	2024-05-30 02:51:28.686098+02	0	3	3	f	t	t	f	3	t
\.


--
-- Data for Name: test_bots; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.test_bots (id, scanner, social, ai_face, rr_photo, rr_user, "createdAt", "updatedAt") FROM stdin;
4	scanner_21.06.2024..22.39.04_test					2024-06-21 22:39:04.778+02	2024-06-21 22:39:13.52+02
\.


--
-- Data for Name: tickets; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tickets (id, name, status, user_id, "createdAt", "updatedAt", count) FROM stdin;
\.


--
-- Data for Name: user_roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_roles ("createdAt", "updatedAt", "roleId", "userId") FROM stdin;
2024-05-09 21:29:43.719+02	2024-05-09 21:29:43.719+02	3	1
\.


--
-- Data for Name: usernames; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usernames (id, username, link, "userId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, password, name, avatar, verified, "createdAt", "updatedAt", social, subscription, agency, user_counts, users_info_images, ban, copyright_holder, contract, ip, data_report, data_analytics) FROM stdin;
1	admin@lockleaks.com	$2a$08$rMMx/v9r1S/TR7Zzv.hRduifTJDKPhr1bd14lphL8x3aIfxyY9Hmu	Admin		t	2024-05-09 21:29:43.719+02	2024-05-09 21:29:43.719+02		{"plan_id": 4, "expire_date": "2030-05-09 21:29:43.719+0", "payment_method": "paypal"}	f	0	\N	f		{"status": "", "pdf_path": ""}			
\.


--
-- Data for Name: vps_lists; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.vps_lists (id, ip_address, subdomain, "createdAt", "updatedAt") FROM stdin;
3	190.2.153.10		2024-05-24 16:37:10.054+02	2024-05-24 16:40:51.961+02
8	5.42.92.212		2024-05-24 16:47:31.691+02	2024-05-24 18:59:37.621+02
\.


--
-- Name: ai_face_summaries_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ai_face_summaries_id_seq', 15, true);


--
-- Name: basic-keywords_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."basic-keywords_id_seq"', 10, true);


--
-- Name: blog_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.blog_id_seq', 18, true);


--
-- Name: blog_views_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.blog_views_id_seq', 30, true);


--
-- Name: custom-keywords_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."custom-keywords_id_seq"', 3, true);


--
-- Name: customer_reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.customer_reviews_id_seq', 9, true);


--
-- Name: dmca_images_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.dmca_images_id_seq', 90, true);


--
-- Name: help_articles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.help_articles_id_seq', 19, true);


--
-- Name: help_categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.help_categories_id_seq', 34, true);


--
-- Name: messages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.messages_id_seq', 93, true);


--
-- Name: news_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.news_id_seq', 2, true);


--
-- Name: notifications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.notifications_id_seq', 71, true);


--
-- Name: payment_links_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.payment_links_id_seq', 26, true);


--
-- Name: ping_models_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ping_models_id_seq', 12, true);


--
-- Name: positions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.positions_id_seq', 1, true);


--
-- Name: proxies_bots_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.proxies_bots_id_seq', 13, true);


--
-- Name: refreshTokens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."refreshTokens_id_seq"', 360, true);


--
-- Name: reports_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reports_id_seq', 1, true);


--
-- Name: rr_photo_summaries_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rr_photo_summaries_id_seq', 4, true);


--
-- Name: rr_user_summaries_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rr_user_summaries_id_seq', 3, true);


--
-- Name: scrape_summaries_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.scrape_summaries_id_seq', 97, true);


--
-- Name: social_media_profiles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.social_media_profiles_id_seq', 30, true);


--
-- Name: social_summaries_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.social_summaries_id_seq', 15, true);


--
-- Name: social_usernames_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.social_usernames_id_seq', 55, true);


--
-- Name: subscribed_users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.subscribed_users_id_seq', 3, true);


--
-- Name: subscription_options_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.subscription_options_id_seq', 9, true);


--
-- Name: test_bots_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.test_bots_id_seq', 4, true);


--
-- Name: tickets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tickets_id_seq', 41, true);


--
-- Name: usernames_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usernames_id_seq', 175, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 61, true);


--
-- Name: vps_list_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.vps_list_id_seq', 8, true);


--
-- Name: ai_face_summaries ai_face_summaries_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ai_face_summaries
    ADD CONSTRAINT ai_face_summaries_pkey PRIMARY KEY (id);


--
-- Name: basic_keywords basic-keywords_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.basic_keywords
    ADD CONSTRAINT "basic-keywords_pkey" PRIMARY KEY (id);


--
-- Name: blogs blog_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blogs
    ADD CONSTRAINT blog_pkey PRIMARY KEY (id);


--
-- Name: blog_views blog_views_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blog_views
    ADD CONSTRAINT blog_views_pkey PRIMARY KEY (id);


--
-- Name: custom_keywords custom-keywords_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.custom_keywords
    ADD CONSTRAINT "custom-keywords_pkey" PRIMARY KEY (id);


--
-- Name: customer_reviews customer_reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customer_reviews
    ADD CONSTRAINT customer_reviews_pkey PRIMARY KEY (id);


--
-- Name: dmca_images dmca_images_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dmca_images
    ADD CONSTRAINT dmca_images_pkey PRIMARY KEY (id);


--
-- Name: help_articles help_articles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_articles
    ADD CONSTRAINT help_articles_pkey PRIMARY KEY (id);


--
-- Name: help_categories help_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories
    ADD CONSTRAINT help_categories_pkey PRIMARY KEY (id);


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);


--
-- Name: news news_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.news
    ADD CONSTRAINT news_pkey PRIMARY KEY (id);


--
-- Name: notifications notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (id);


--
-- Name: payment_links payment_links_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payment_links
    ADD CONSTRAINT payment_links_pkey PRIMARY KEY (id);


--
-- Name: ping_models ping_models_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ping_models
    ADD CONSTRAINT ping_models_pkey PRIMARY KEY (id);


--
-- Name: positions positions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.positions
    ADD CONSTRAINT positions_pkey PRIMARY KEY (id);


--
-- Name: proxies_bots proxies_bots_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proxies_bots
    ADD CONSTRAINT proxies_bots_pkey PRIMARY KEY (id);


--
-- Name: refreshTokens refreshTokens_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."refreshTokens"
    ADD CONSTRAINT "refreshTokens_pkey" PRIMARY KEY (id);


--
-- Name: reports reports_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reports
    ADD CONSTRAINT reports_pkey PRIMARY KEY (id);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: rr_photo_summaries rr_photo_summaries_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rr_photo_summaries
    ADD CONSTRAINT rr_photo_summaries_pkey PRIMARY KEY (id);


--
-- Name: rr_user_summaries rr_user_summaries_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rr_user_summaries
    ADD CONSTRAINT rr_user_summaries_pkey PRIMARY KEY (id);


--
-- Name: scrape_summaries scrape_summaries_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scrape_summaries
    ADD CONSTRAINT scrape_summaries_pkey PRIMARY KEY (id);


--
-- Name: social_media_profiles social_media_profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.social_media_profiles
    ADD CONSTRAINT social_media_profiles_pkey PRIMARY KEY (id);


--
-- Name: social_summaries social_summaries_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.social_summaries
    ADD CONSTRAINT social_summaries_pkey PRIMARY KEY (id);


--
-- Name: social_usernames social_usernames_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.social_usernames
    ADD CONSTRAINT social_usernames_pkey PRIMARY KEY (id);


--
-- Name: subscribed_users subscribed_users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscribed_users
    ADD CONSTRAINT subscribed_users_pkey PRIMARY KEY (id);


--
-- Name: subscription_options subscription_options_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscription_options
    ADD CONSTRAINT subscription_options_pkey PRIMARY KEY (id);


--
-- Name: test_bots test_bots_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.test_bots
    ADD CONSTRAINT test_bots_pkey PRIMARY KEY (id);


--
-- Name: tickets tickets_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_pkey PRIMARY KEY (id);


--
-- Name: user_roles user_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_pkey PRIMARY KEY ("roleId", "userId");


--
-- Name: usernames usernames_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usernames
    ADD CONSTRAINT usernames_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: vps_lists vps_list_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vps_lists
    ADD CONSTRAINT vps_list_pkey PRIMARY KEY (id);


--
-- Name: refreshTokens refreshTokens_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."refreshTokens"
    ADD CONSTRAINT "refreshTokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: user_roles user_roles_roleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT "user_roles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES public.roles(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_roles user_roles_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT "user_roles_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

