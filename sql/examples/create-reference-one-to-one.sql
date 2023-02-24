create table locations (
	id int4 unsigned primary key auto_increment,
    country varchar(256) not null
    createdAt timestamp default current_timestamp,
    updatedAt timestamp default current_timestamp on update current_timestamp
);

create table movies (
	id int4 unsigned primary key auto_increment,
    title varchar(256) not null,
    -- Parasius UNIQ suvarzyma movieId savybei, igalinimas rysys 1:1 "vienas su vienu" - "one to one"
    locationId int4 unsigned not null unique,
    price float8 unsigned not null,
    rating float4 unsigned not null,
    createdAt timestamp default current_timestamp,
    updatedAt timestamp default current_timestamp on update current_timestamp,
    -- Kad sukurti rakta , privaloma pirmiau sukurti lentele su kuria sudaromas rysys
    -- Isorinio rakto movieId tipas privalo buti IDENTISKAS locations(id) tipui
    FOREIGN KEY (locationId) REFERENCES locations(id)
);