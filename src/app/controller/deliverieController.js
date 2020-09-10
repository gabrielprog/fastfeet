import Order from '../model/orderModel';

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

        return response.status(200).json(orderForSend);
    }
}

export default new DeliverieController();
