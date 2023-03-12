create table bjccicbf65x3zea6wbni.locations (
	id int4 unsigned primary key auto_increment,
    country varchar(256) not null
    createdAt timestamp default current_timestamp,
    updatedAt timestamp default current_timestamp on update current_timestamp
);

create table bjccicbf65x3zea6wbni.movies (
	id int4 unsigned primary key auto_increment,
    title varchar(256) not null,
    locationId int4 unsigned not null,
    price float8 unsigned not null,
    rating float4 unsigned not null,
    createdAt timestamp default current_timestamp,
    updatedAt timestamp default current_timestamp on update current_timestamp,
    FOREIGN KEY (locationId) REFERENCES locations(id)
);

create table bjccicbf65x3zea6wbni.images (
	id int4 unsigned primary key auto_increment,
    src varchar(512) not null,
    movieId int4 unsigned not null unique,
    createdAt timestamp default current_timestamp,
    updatedAt timestamp default current_timestamp on update current_timestamp,
    FOREIGN KEY (movieId) REFERENCES movies(id)
);