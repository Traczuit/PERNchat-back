CREATE DATABASE pernchat;

\c pernchat;

CREATE TABLE IF NOT EXISTS public.users (
	user_id SERIAL NOT NULL PRIMARY KEY,
	username varchar(200) NOT NULL,
	email varchar(200) NOT NULL,
	usr_password varchar(200) NOT NULL,
	UNIQUE (email)
);

CREATE TABLE IF NOT EXISTS public.chat (
	c_id SERIAL NOT NULL,
	user_one INT NOT NULL,
	user_two INT NOT NULL,
	CONSTRAINT chat_pkey PRIMARY KEY (c_id),
	CONSTRAINT chat_user_one_fkey FOREIGN KEY (user_one) REFERENCES public.users(user_id),
	CONSTRAINT chat_user_two_fkey FOREIGN KEY (user_two) REFERENCES public.users(user_id)
);

CREATE TABLE IF NOT EXISTS public.messages (
	m_id SERIAL NOT NULL,
	author INT NOT NULL,
	posted_time timestamp NULL,
	seen INT NULL,
	msg_content varchar(10000) NOT NULL,
	chat_id INT NOT NULL,
	CONSTRAINT messages_pkey PRIMARY KEY (m_id),
	CONSTRAINT messages_author_fkey FOREIGN KEY (author) REFERENCES public.users(user_id),
	CONSTRAINT messages_chat_fkey FOREIGN KEY (chat_id) REFERENCES public.chat(c_id)
);

CREATE TABLE IF NOT EXISTS public.contacts (
	id SERIAL NOT NULL,
	user_id INT NOT NULL,
	friend_id INT NOT NULL,
	CONSTRAINT contacts_pkey PRIMARY KEY (id),
	CONSTRAINT contacts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id),
	CONSTRAINT contacts_friend_id_fkey FOREIGN KEY (friend_id) REFERENCES public.users(user_id)
);