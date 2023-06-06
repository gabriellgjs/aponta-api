import dotenv from 'dotenv';
import express from 'express';
import Routes  from './routes';

dotenv.config();

const port = parseInt(process.env.PORT || '3000');

const server = express();

server.use(express.json());

server.use("/", new Routes().routes);

server.listen(
  {
    port,
    host: '0.0.0.0',
  },
  () => {
    console.log('HTTP Server running on port ' + port);
  },
);

//TODO ESLINT
