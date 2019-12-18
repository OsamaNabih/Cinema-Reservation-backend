create database Cinema;

create table Users
(
	userId int unsigned not null auto_increment,
	email varchar(320) UNIQUE not null,
	firstName varchar(50) not null,
	lastName varchar(50) not null,
	userType int unsigned not null, /* 1 -> Admin, 2 -> Customer*/
	birthDate date,
	Primary key(userId)
);

create table Movies
(
  movieId int unsigned not null auto_increment,
  genre varchar(100) not null,
  movieName varchar(100) not null,
  screenNumber int unsigned not null,
  movieLength int unsigned not null,
  startDate date,
  endDate date,
  showTimes varchar(100),
  Primary key(movieId),
  Foreign key(screenNumber) references Screens(screenNumber) On Delete cascade on Update cascade
);

create table Screens
(
  screenNumber int unsigned not null UNIQUE,
  screenRows int unsigned not null,
  screenColumns int unsigned not null,
  Primary key(screenNumber)
);

create table Screenings
(
  screeningId int unsigned not null,
  screenNumber int unsigned not null,
  screeningDate date not null,
  screeningTime time not null,
  movieId int unsigned not null,
  screenNumber int unsigned not null,
  Primary Key(screeningId),
  Foreign key(movieId) references Movies(movieId) On Delete cascade on Update cascade,
  Foreign key(screeningId) references Screenings(screeningId) On Delete cascade on Update cascade
);

create table Seats
(
  screeningId int unsigned not null,
  rowNum int unsigned not null,
  colNum int unsigned not null,
  reserved boolean default 1,
  ticketNumber varchar(200),
  Primary key(screeningId, rowNum, colNum),
  Foreign key(screeningId) references Screenings(screeningId) On Delete cascade on Update cascade,
);

/*--------------------------Insertions---------------------------------*/
Insert into Users(email,firstName,lastName,userType,birthDate)
values ("walidashraf423@gmail.com","waleed","ashraf",1,STR_TO_DATE('09-04-2020 00:00:00','%m-%d-%Y %H:%i:%s'));

Insert into Users(email,firstName,lastName,userType,birthDate)
values ("OmarWagih@gmail.com","Omar","Wagih",2,STR_TO_DATE('09-04-2020 00:00:00','%m-%d-%Y %H:%i:%s'));

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

Insert into Movies(movieId, genre, movieName, screenNumber, startDate, endDate, showTimes)
values(1, "Thriller", "The Shining", 1, STR_TO_DATE('09-04-2020 00:00:00','%m-%d-%Y %H:%i:%s'),
      STR_TO_DATE('09-07-2020 00:00:00','%m-%d-%Y %H:%i:%s'), '9:30|13:30|16:30');

Insert into Movies(movieId, genre, movieName, screenNumber, startDate, endDate, showTimes)
values(2, "Action", "The Expendables", 2, STR_TO_DATE('09-10-2020 00:00:00','%m-%d-%Y %H:%i:%s'),
      STR_TO_DATE('09-13-2020 00:00:00','%m-%d-%Y %H:%i:%s'), '9:30|13:30|16:30');

Insert into Movies(movieId, genre, movieName, screenNumber, startDate, endDate, showTimes)
values(3, "Comedy", "The Mask", 3, STR_TO_DATE('08-04-2020 00:00:00','%m-%d-%Y %H:%i:%s'),
      STR_TO_DATE('09-07-2020 00:00:00','%m-%d-%Y %H:%i:%s'), '9:30|13:30|16:30');


Insert into Seats(movieId, screenNumber, rowNum, colNum, ticketNumber)
values(1, 1, 10, 15, 'ticketNum1');


Insert into Seats(movieId, screenNumber, rowNum, colNum, ticketNumber)
values(1, 1, 10, 16, 'ticketNum2')