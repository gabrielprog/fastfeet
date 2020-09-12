import Order from '../model/orderModel';
import Signature from '../model/signatureModel';

class EndorderController {
   async store(request, response){
        const {deliverymanId, orderId} = request.params;
        const fetchOrder = await Order.findOne({
            where: {
                deliveryman_id: deliverymanId,
                id: orderId
            }
        });
        fetchOrder.end_date = new Date();
        fetchOrder.save();
        
        const {filename: path_file, originalname: name_file} = request.file;
        await Signature.create({
            recipient_id: fetchOrder.recipient_id,
            path_file,
            name_file
        });

    
        return response.status(200).json({status: true});
   }
}

export default new EndorderController();
