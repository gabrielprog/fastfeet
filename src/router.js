import Router from 'express';
import UserController from './app/controller/userController';

const routers = Router();

routers.post("/register",UserController.store);

export default routers;
