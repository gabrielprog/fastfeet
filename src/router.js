import Router from 'express';
import UserController from './app/controller/userController';
import SessionController from './app/controller/sessionController';
import RecipientController from './app/controller/recipientController';
import DeliverymanController from './app/controller/deliverymanController';
import authMiddleware from './app/middleware/authMiddleware';
import checkAdminMiddleware from './app/middleware/checkAdminMiddleware';

const routers = Router();
// ADMIN RESPONSIBILITY
routers.post("/register",UserController.store);
routers.post("/session", SessionController.store);

routers.use(authMiddleware);

// DELIVERYMAN RESPONSIBILITY
routers.get('/admin/deliverymans', checkAdminMiddleware, DeliverymanController.index);
routers.put('/admin/deliverymans', checkAdminMiddleware, DeliverymanController.update);
routers.delete('/admin/deliverymans/:id', checkAdminMiddleware, DeliverymanController.delete);
routers.post('/admin/deliverymans', checkAdminMiddleware, DeliverymanController.store);

// RECIPIENT RESPONSIBILITY
routers.post("/registered/updated", RecipientController.store);


export default routers;
