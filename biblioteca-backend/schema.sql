CREATE DATABASE biblioteca;


CREATE TABLE livros(

id SERIAL PRIMARY KEY,

codigo VARCHAR(50) UNIQUE NOT NULL,

titulo VARCHAR(150) NOT NULL,

autor VARCHAR(100) NOT NULL,

categoria VARCHAR(100) NOT NULL,

quantidade INTEGER CHECK(quantidade >=0)

);



CREATE TABLE usuarios(

id SERIAL PRIMARY KEY,

nome VARCHAR(100) NOT NULL,

telefone VARCHAR(30) NOT NULL,

email VARCHAR(150) UNIQUE NOT NULL,

data_cadastro DATE DEFAULT CURRENT_DATE

);



CREATE TABLE emprestimos(

id SERIAL PRIMARY KEY,

usuario_id INTEGER REFERENCES usuarios(id),

livro_id INTEGER REFERENCES livros(id),

data_emprestimo DATE DEFAULT CURRENT_DATE,

data_prevista_devolucao DATE NOT NULL,

data_devolucao DATE,

status VARCHAR(20) DEFAULT 'ativo'

);