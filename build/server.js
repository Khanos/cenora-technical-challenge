"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ejs_1 = __importDefault(require("ejs"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const dotenv_safe_1 = __importDefault(require("dotenv-safe"));
const routes_1 = __importDefault(require("./src/routes"));
class Server {
    constructor() {
        dotenv_safe_1.default.config({
            allowEmptyValues: true
        });
        this.port = Number(process.env.PORT) || 3000;
        this.host = process.env.HOST || 'localhost';
        this.apiVersion = process.env.API_VERSION || 'v1';
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', this.port);
        this.app.set('host', this.host);
        this.app.set('views', path_1.default.join(__dirname, './src/views'));
        this.app.engine('html', ejs_1.default.renderFile);
        this.app.use((0, cors_1.default)());
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.use(express_1.default.static(path_1.default.join(__dirname, './public')));
    }
    routes() {
        this.app.use(`/api/${this.apiVersion}/`, routes_1.default);
        this.app.use('/', (req, res) => {
            res.render('index.html');
            return;
        });
        this.app.use('*', (req, res) => {
            res.redirect('/');
        });
    }
    start() {
        this.app.listen(this.port, this.host, () => {
            console.log(`
░█▀▀░█░█░█▀█░█▀▄░█▀▀░█▀▀░█▀▀░░░█▀▀░█▀▀░█▀▄░█░█░█▀▀░█▀▄
░█▀▀░▄▀▄░█▀▀░█▀▄░█▀▀░▀▀█░▀▀█░░░▀▀█░█▀▀░█▀▄░▀▄▀░█▀▀░█▀▄
░▀▀▀░▀░▀░▀░░░▀░▀░▀▀▀░▀▀▀░▀▀▀░░░▀▀▀░▀▀▀░▀░▀░░▀░░▀▀▀░▀░▀
      `);
            console.log(`Listening on http://${this.host}:${this.port}`);
        });
    }
}
const server = new Server();
server.start();
