import Router from 'express';
import UserController from './app/controller/userController';
import SessionController from './app/controller/sessionController';
import RecipientController from './app/controller/recipientController';

const routers = Router();

routers.post("/register",UserController.store);
routers.post("/session", SessionController.store);
routers.get("/registered/updated", RecipientController.store);

export default routers;
