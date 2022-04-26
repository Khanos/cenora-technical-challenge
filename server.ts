import express, { Request, Response } from 'express';
import ejs from 'ejs';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv-safe';
import indexRoutes from './src/routes';
class Server {
  public app: express.Application;
  private port: number
  private host: string
  private apiVersion: string
  constructor() {
    dotenv.config({
      allowEmptyValues: true
    });
    this.port = Number(process.env.PORT) || 3000;
    this.host = process.env.HOST || 'localhost';
    this.apiVersion = process.env.API_VERSION || 'v1';
    this.app = express();
    this.config();
    this.routes();
  }
  config() {
    this.app.set('port', this.port);
    this.app.set('host', this.host);
    this.app.set('views', path.join(__dirname, './src/views'));
    this.app.engine('html', ejs.renderFile);
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(express.static(path.join(__dirname, './public')));
  }
  routes() {
    this.app.use(`/api/${this.apiVersion}/`, indexRoutes);
    this.app.use('/', (req: Request, res: Response) => {
      res.render('index.html');
      return;
    });
    this.app.use('*', (req: Request, res: Response) => {
      res.redirect('/');
    })
  }
  start() {
    this.app.listen(this.port, this.host, () => {
      console.log(`
░█▀▀░█░█░█▀█░█▀▄░█▀▀░█▀▀░█▀▀░░░█▀▀░█▀▀░█▀▄░█░█░█▀▀░█▀▄
░█▀▀░▄▀▄░█▀▀░█▀▄░█▀▀░▀▀█░▀▀█░░░▀▀█░█▀▀░█▀▄░▀▄▀░█▀▀░█▀▄
░▀▀▀░▀░▀░▀░░░▀░▀░▀▀▀░▀▀▀░▀▀▀░░░▀▀▀░▀▀▀░▀░▀░░▀░░▀▀▀░▀░▀
      `)
      console.log(`Listening on http://${this.host}:${this.port}`);
    });
  }
}

const server = new Server();
server.start();