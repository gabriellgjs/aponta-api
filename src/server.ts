import fastify from 'fastify';
import cors from '@fastify/cors'
import dotenv from 'dotenv';

dotenv.config();

const port = parseInt(process.env.PORT || '3000');

const server = fastify();

server.register(cors);

server.get("/", (request, response) => {
    return response.send("Hello World in fastify");
});

server.listen({
    port,
    host: '0.0.0.0'
  }).then(() => {
    console.log('HTTP Server running! on port ' + port);
  })