alter table users add mobile varchar(64);

SET SQL_SAFE_UPDATES = 0;

UPDATE users
SET mobile = '+yyy xxx xxxxx'
WHERE mobile is null;

alter table users modify mobile varchar(64) not null;

insert into users (email, password, name, surname, mobile) values
('user10@gmail.com', 'user10!', 'User', 'User', '+yyy xxx xxxxx');

SET @user10_user_id = LAST_INSERT_ID();

alter table movies
add userId int4 unsigned,
add foreign key (userId) references users(id);

UPDATE movies
SET userId = @user10_user_id
WHERE userId is null;

ALTER TABLE movies DROP FOREIGN KEY movies_ibfk_1;
DROP INDEX locationId ON movies;
ALTER TABLE movies ADD FOREIGN KEY (locationId) references locations(id);