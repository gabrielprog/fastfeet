import Router from 'express';
import UserController from './app/controller/userController';
import SessionController from './app/controller/sessionController';

const routers = Router();

routers.post("/register",UserController.store);
routers.post("/session", SessionController.store);

export default routers;
