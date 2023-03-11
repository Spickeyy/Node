import express from 'express';
import morgan from 'morgan';
import config from 'config';
import movies from 'movies';
import auth from 'auth';
import './services/my-sql';

const server = express();

// Middlewares
server.use(morgan('tiny'));
server.use(express.static('public'));
server.use(express.json());
server.use('/api/movies', movies);
server.use('/api/auth', auth);

// Server init
server.listen(config.server.port, () => {
    console.log(`server is running on: http://${config.server.domain}:${config.server.port}`);
  });
