create table movies (
	id int4 unsigned primary key auto_increment,
    title varchar(256) not null,
    price float8 unsigned not null,
    rating float4 unsigned not null,
    createdAt timestamp default current_timestamp,
    updatedAt timestamp default current_timestamp on update current_timestamp,
);

create table images (
	id int4 unsigned primary key auto_increment,
    src varchar(512) not null,
    -- Neparasius UNIQ suvarzymo movieId savybei, igalinimas rysys 1:M "vienas su daug" - "one to many"
    movieId int4 unsigned not null unique,
    createdAt timestamp default current_timestamp,
    updatedAt timestamp default current_timestamp on update current_timestamp,
    -- Kad sukurti rakta , privaloma pirmiau sukurti lentele su kuria sudaromas rysys
    -- Isorinio rakto movieId tipas privalo buti IDENTISKAS movie(id) tipui
    FOREIGN KEY (movieId) REFERENCES movies(id)
);