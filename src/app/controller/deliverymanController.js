import Deliveryman from '../model/deliverymanModel';
import Avatar from '../model/avatarModel';
import User from '../model/userModel';

class DeliverymanController {
    async index(request, response) {
       if(!request.tokenData){
            return response.status(400).json({error: 'Token not found'});
        }

        const {id} = request.tokenData;
        const checkAdmin = await User.findByPk(id);

        if(!checkAdmin){
            return response.status(400).json({error: 'You not have permission'});
        }
        
        const deliveryman = await Deliveryman.findAll({
            include: [{
                model: Avatar,
                as: 'avatar',
                attributes: ['name_file', 'path_file']
            }],
            attributes: ['id', 'name', 'email']
        });
        return response.status(200).json(deliveryman);
    }
}

export default new DeliverymanController();