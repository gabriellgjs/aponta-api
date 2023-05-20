import express from 'express';
import dotenv from 'dotenv';
import RolesRoutes from './Roles/Routes/RolesRoutes';
import { Routes } from './routes';

dotenv.config();

const port = parseInt(process.env.PORT || '3000');

const server = express();

server.use(express.json());

server.use(Routes);

server.listen({
    port,
    host: '0.0.0.0'
  },
  () => {
    console.log('HTTP Server running! on port ' + port);
  })