CREATE DATABASE IF NOT EXISTS tool_todosmanager_electron; 

USE tool_todosmanager_electron;

CREATE TABLE IF NOT EXISTS todos (
	id int NOT NULL AUTO_INCREMENT,
    beschreibung text,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS mitarbeiter (
	id int(11) NOT NULL AUTO_INCREMENT,
	vorname varchar(255) DEFAULT NULL,
	nachname varchar(255) DEFAULT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS todos_mitarbeiter (
	id int(11) NOT NULL AUTO_INCREMENT,
	todos_id int(11) NOT NULL,
    mitarbeiter_id int(11) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT FK_todos FOREIGN KEY (todos_id) REFERENCES todos(id),
    CONSTRAINT FK_mitarbeiter FOREIGN KEY (mitarbeiter_id) REFERENCES mitarbeiter(id)
)