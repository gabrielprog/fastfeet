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

    async update(request, response) {
        const schema = yup.object().shape({
            id: yup.number().required(),
            name: yup.string()
        });
        
        if(!(await schema.isValid(request.body))) {
            return await response.status(406).json({
                error: "Body not are complete"
            });
        }
        const {id, name} = request.body;
        const fetchUser = await Deliveryman.findByPk(id);

        if(!fetchUser){
            return response.status(400).json({error: 'Deliveryman not found'});
        }

        fetchUser.name = name;

        await fetchUser.save();

        const {name: updateName} = fetchUser;

        return response.status(200).json({
            id,
            name: updateName
        });
    }

    async delete(request, response) {
        const {id} = request.params;

        const fetchUser = await Deliveryman.findByPk(id);

        fetchUser.destroy();

        return response.status(200).json({status: true});
    }
}

export default new DeliverymanController();