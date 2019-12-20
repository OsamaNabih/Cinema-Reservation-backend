create database Cinema;

create table Users
(
	userId int unsigned not null auto_increment,
	username varchar(320) UNIQUE not null,
  email varchar(320) UNIQUE not null,
	firstName varchar(50) not null,
	lastName varchar(50) not null,
  password varchar(200) not null,
	userType int unsigned not null, /* 1 -> Admin, 2 -> Customer*/
	birthDate date,
	Primary key(userId)
);

create table Screens
(
  screenNumber int unsigned not null UNIQUE,
  screenRows int unsigned not null,
  screenColumns int unsigned not null,
  Primary key(screenNumber)
);

create table Movies
(
  movieId int unsigned not null auto_increment,
  genre varchar(100) not null,
  name varchar(100) not null,
  screenNumber int unsigned not null,
  runtime int unsigned not null,
  Primary key(movieId),
  Foreign key(screenNumber) references Screens(screenNumber)
);

create table Screenings
(
  screeningId int unsigned not null auto_increment,
  screeningDate date not null,
  screeningTime time not null,
  movieId int unsigned not null,
  screenNumber int unsigned not null,
  Primary Key(screeningId),
  Foreign key(movieId) references Movies(movieId),
  Foreign key(screenNumber) references Screens(screenNumber)
);

create table Seats
(
  screeningId int unsigned not null,
  rowNum int unsigned not null,
  colNum int unsigned not null,
  reserved boolean default 1,
  ticketNumber bigint unsigned,
  userId int unsigned not null,
  Primary key(screeningId, rowNum, colNum),
  Foreign key(screeningId) references Screenings(screeningId),
  Foreign key(userId) references Users(userId)
);

/*--------------------------Insertions---------------------------------*/
Insert into Users(email,userName,firstName,lastName,userType,birthDate)
values ("walidashraf423@gmail.com","WalidAshraf","waleed","ashraf",1,STR_TO_DATE('09-04-2020 00:00:00','%m-%d-%Y %H:%i:%s'));

Insert into Users(email,username,firstName,lastName,userType,birthDate)
values ("OmarWagih@gmail.com","OmarWagih","Omar","Wagih",2,STR_TO_DATE('09-04-2020 00:00:00','%m-%d-%Y %H:%i:%s'));

/*
-- Insert int unsignedo Users(email,firstName,lastName,userType,birthDate)
-- values ("OsamaNabih@gmail.com","Osama","Nabih",3,STR_TO_DATE('09-04-2020 00:00:00','%m-%d-%Y %H:%i:%s'));
*/

Insert into Screens(screenNumber, screenRows, screenColumns)
values(1, 20, 30);

Insert into Screens(screenNumber, screenRows, screenColumns)
values(2, 100, 70);

Insert into Screens(screenNumber, screenRows, screenColumns)
values(3, 30, 70);

Insert into Movies(movieId, genre, name, screenNumber, runtime)
values(1, "Thriller", "The Shining", 1, 146);

Insert into Movies(movieId, genre, name, screenNumber, runtime)
values(2, "Action", "The Expendables", 2, 113);

Insert into Movies(movieId, genre, name, screenNumber, runtime)
values(3, "Comedy", "The Mask", 3, 101);

Insert Into Screenings(screeningId, screenNumber, screeningDate, screeningTime, movieId)
values(1, 1, STR_TO_DATE('09-04-2020 00:00:00','%m-%d-%Y %H:%i:%s'), '09:30:00', 1);

Insert Into Screenings(screeningId, screenNumber, screeningDate, screeningTime, movieId)
values(2, 1, STR_TO_DATE('09-04-2020 00:00:00','%m-%d-%Y %H:%i:%s'), '11:45:00', 1);

Insert Into Screenings(screeningId, screenNumber, screeningDate, screeningTime, movieId)
values(3, 1, STR_TO_DATE('09-04-2020 00:00:00','%m-%d-%Y %H:%i:%s'), '14:00:00', 1);

Insert Into Screenings(screeningId, screenNumber, screeningDate, screeningTime, movieId)
values(4, 1, STR_TO_DATE('09-05-2020 00:00:00','%m-%d-%Y %H:%i:%s'), '09:30:00', 1);

Insert Into Screenings(screeningId, screenNumber, screeningDate, screeningTime, movieId)
values(5, 2, STR_TO_DATE('09-04-2020 00:00:00','%m-%d-%Y %H:%i:%s'), '09:30:00', 2);


Insert into Seats(screeningId, rowNum, colNum, ticketNumber, userId)
values(1, 10, 15, 1000, 1);


Insert into Seats(screeningId, rowNum, colNum, ticketNumber, userId)
values(1, 10, 16, 1001, 1);