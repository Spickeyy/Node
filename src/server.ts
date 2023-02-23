import express from 'express';
import morgan from 'morgan';
import config from './config';
import moviesController from './controllers/movies-controller';
import { connectMySql } from './services/my-sql';

const server = express();

// Middlewares
server.use(morgan('tiny'));
server.use(express.static('public'));
server.use(express.json());
server.use('/api/movies', moviesController);

// Server init
connectMySql(() => {
  server.listen(config.server.port, () => {
    console.log(`server is running on: http://${config.server.domain}:${config.server.port}`);
  });
});
