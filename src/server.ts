import * as dotenv from 'dotenv'
import express from 'express';
import morgan from 'morgan';

// setup
dotenv.config()




const {SERVER_PORT, SERVER_DOMAIN} = process.env;

if (SERVER_PORT === undefined || SERVER_DOMAIN === undefined) {
  throw new Error("Please define constants in '.env' file");
}

const server = express();


// Middlewares
server.use(morgan('tiny'));
server.use(express.static('public'));
server.use(express.json());


// API Router
const movies = [
  { id: 1, title: 'Movie 1' },
  { id: 2, title: 'Movie 2' },
  { id: 3, title: 'Movie 3' },
  { id: 4, title: 'Movie 4' },
];
const apiRouter = express.Router();
server.use('/api', apiRouter);


apiRouter.get('/movies', (req, res) => {
  res.status(200).json(movies);
});

apiRouter.post('/movies', (req, res) => {
  const { body } = req;
  const newMovie = { id: 5, title: body.title };
  movies.push(newMovie);
  res.status(201).json(newMovie);
});

// Server init
server.listen(SERVER_PORT, () => {
  console.log(`server is running on: http://${SERVER_DOMAIN}:${SERVER_PORT}`)
});
