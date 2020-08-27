import express from 'express';
import Router from './router';
import './database/';

class App {
    constructor(){
        this.server = express();
        this.middleware();
        this.routers();
    }

    middleware() {
        this.server.use(express.json());
    }

    routers() {
        this.server.use(Router);
    }

}

export default new App().server;
