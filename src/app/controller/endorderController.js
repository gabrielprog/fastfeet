import Order from '../model/orderModel';
import * as yup from 'yup';

class EndorderController {
   async store(request, response){
        const schema = yup.object().shape({
            id: yup.number().required(),
            end_date: yup.date().required()
        });
        
        if(!(await schema.isValid(request.body))) {
            return await response.status(406).json({
                error: "Body not are complete"
            });
        }
        
        const {id} = request.body;
        const {id: deliveryId} = request.params;

        await Order.update(request.body, {
            where: {
                deliveryman_id: deliveryId,
                id
            }
        });
    
        return response.status(200).json({status: true});
   }
}

export default new EndorderController();
