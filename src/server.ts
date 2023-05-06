import express, { Request, Response} from 'express';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();
const server = express();

server.use(express.static(path.join(__dirname, '../public')));

server.use(express.urlencoded({extended: true}));

server.get("/", (request, response) => {
    return response.send("Hello World!");
  });

server.use((req : Request, res : Response)=>res.status(404).json({error: 'Not found page!'}));

server.listen(process.env.PORT, () => {
    console.log("Server is running in port " + process.env.PORT);
});