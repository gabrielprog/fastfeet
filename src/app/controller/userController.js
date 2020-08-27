import User from '../model/userModel';
import * as yup from 'yup';


class UserController {
    async store(request, response, next) {
        const schema = yup.object().shape({
            name: yup.string().required(),
            email: yup.string().email().required(),
            password: yup.string().required().min(8)
        });
        
        if(!(await schema.isValid(request.body))) {
            return await response.status(406).json({
                error: "Body not are complete"
            });
        }
        
        const checkEmail =  await User.findOne({
            where: {email: request.body.email}
        });

        if(checkEmail) {
            return await response.status(400).json({
                error: "Email exist in database"
            });
        }

        const {id, name, email} = await User.create(request.body);

        return await response.status(201).json({id, name, email});

    }
}

export default new UserController;
