import Router from 'express';
import UserController from './app/controller/userController';
import SessionController from './app/controller/sessionController';
import RecipientController from './app/controller/recipientController';
import DeliverymanController from './app/controller/deliverymanController';
import authMiddleware from './app/middleware/authMiddleware';
import checkAdminMiddleware from './app/middleware/checkAdminMiddleware';

const routers = Router();

routers.post("/register",UserController.store);
routers.post("/session", SessionController.store);


routers.use(authMiddleware);
routers.get('/admin/deliverymans', checkAdminMiddleware, DeliverymanController.index);

routers.post("/registered/updated", RecipientController.store);

export default routers;
