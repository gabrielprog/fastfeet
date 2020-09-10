import Router from 'express';
import multer from "multer";
import UserController from './app/controller/userController';
import SessionController from './app/controller/sessionController';
import RecipientController from './app/controller/recipientController';
import DeliverymanController from './app/controller/deliverymanController';
import DeliverieController from './app/controller/deliverieController';
import AvatarController from './app/controller/avatarController';
import OrderController from './app/controller/orderController';
import authMiddleware from './app/middleware/authMiddleware';
import checkAdminMiddleware from './app/middleware/checkAdminMiddleware';
import configMulter from './config/configMulter';

const routers = Router();
const avatarUpload = multer(configMulter.avatar);
// ADMIN RESPONSIBILITY
routers.post("/register",UserController.store);
routers.post("/session", SessionController.store);

// DELIVERYMAN GET ORDER RESPONSIBILITY
routers.get('/deliveryman/:id/deliveries', DeliverieController.index);

routers.use(authMiddleware);

// DELIVERYMAN RESPONSIBILITY
routers.get('/admin/deliverymans', checkAdminMiddleware, DeliverymanController.index);
routers.get('/admin/order', checkAdminMiddleware, OrderController.index);
routers.put('/admin/order', checkAdminMiddleware, OrderController.update);
routers.put('/admin/deliverymans', checkAdminMiddleware, DeliverymanController.update);
routers.delete('/admin/deliverymans/:id', checkAdminMiddleware, DeliverymanController.delete);
routers.delete('/admin/order/:id', checkAdminMiddleware, OrderController.delete);
routers.post('/admin/deliverymans', checkAdminMiddleware, DeliverymanController.store);
routers.post('/admin/deliverymans/upload', checkAdminMiddleware, avatarUpload.single('file'), AvatarController.store);
routers.post('/admin/order', checkAdminMiddleware, OrderController.store);

// RECIPIENT RESPONSIBILITY
routers.post("/registered/updated", RecipientController.store);


export default routers;
