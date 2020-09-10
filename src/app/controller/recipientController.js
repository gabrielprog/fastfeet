import Recipient from '../model/recipientsModel';
import User from '../model/userModel';
import * as yup from 'yup';

class RecipientController {
    async store(request, response, next) {
        const schema = yup.object().shape({
            id: yup.number().required(),
            email: yup.string().email().required(),
            name: yup.string().required()
        });
        
        if(!(await schema.isValid(request.body))) {
            return await response.status(406).json({
                error: "Body not are complete"
            });
        }
        const {id} = request.tokenData;
        const checkId = await User.findByPk(id);

        if(!checkId) {
            return await response.status(401).json({
                error: "Token not permission"
            });
        }


        const schemaBody = yup.object().shape({
            name: yup.string().required(),
            street: yup.string().required(),
            number: yup.string().required(),
            complement: yup.string().required(),
            state: yup.string().required(),
            city: yup.string().required(),
            postal_code: yup.string().required()
        });
        
        if(!(await schemaBody.isValid(request.body))) {
            return await response.status(406).json({
                error: "Body not are complete"
            });
        }
        const {
            name,
            street,
            number,
            complement,
            state,
            city,
            postal_code
        } = await Recipient.create(request.body);

        return response.status(201).json({
            name,
            street,
            number,
            complement,
            state,
            city,
            postal_code
        });
    }
}

export default new RecipientController();