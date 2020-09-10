import Order from '../model/orderModel';
import {Op} from 'sequelize';

class DeliverieController {
    async index(request, response){
        const {id} = request.params;

        const orderForSend = await Order.findAll({
            where: {
                deliveryman_id: id,
                canceled_at: null,
                end_date: null
            }
        });

        const orderSent = await Order.findAll({
            where: {
                deliveryman_id: id,
                canceled_at: null,
                end_date: {
                    [Op.not]: null
                }
            }
        });

        
        const orderCanceled = await Order.findAll({
            where: {
                deliveryman_id: id,
                canceled_at: {
                    [Op.not]: null
                }
            }
        });

        return response.status(200).json({
            orderForSend: orderForSend,
            orderSent: orderSent,
            orderCanceled: orderCanceled
        });
    }
}

export default new DeliverieController();
