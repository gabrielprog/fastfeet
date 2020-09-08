import Deliveryman from '../model/deliverymanModel';
import Avatar from '../model/avatarModel';
import * as yup from 'yup';

class DeliverymanController {
    async index(request, response) {
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

    async store(request, response) {
        const schema = yup.object().shape({
            email: yup.string().email().required(),
            name: yup.string().required()
        });
        
        if(!(await schema.isValid(request.body))) {
            return await response.status(406).json({
                error: "Body not are complete"
            });
        }

       const deliveryman = await Deliveryman.create(request.body);
       
       return response.status(201).json(deliveryman);
    }
}

export default new DeliverymanController();