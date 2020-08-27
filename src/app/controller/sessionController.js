import jwt from 'jsonwebtoken';
import auth from '../../config/auth';
import User from '../model/userModel';
import cryptography from 'bcrypt';
import * as yup from 'yup';

class SessionController {
    async store(request, response) {
        const schema = yup.object().shape({
            email: yup.string().email().required(),
            password: yup.string().required()
        });
        
        if(!(await schema.isValid(request.body))) {
            return await response.status(406).json({
                error: "Body not are complete"
            });
        }
        const {email, password} = request.body;
        const fetchUser = await User.findOne({where: {email}});
        const {id,name} = fetchUser;
        if(!fetchUser) {
            return response.status(400).json({
                error: "Email not found"
            });
        }
        
        const checkPassword = () => {
            return cryptography.compare(password, fetchUser.password);
        }

        if(!fetchUser && !(await checkPassword())){
            return response.status(400).json({
                error: "Email/Password not exist"
            });
        }

        return response.status(200).json({
            user: {
                id,
                name,
                email
            },
            token: jwt.sign({
                id,
                name,
                email
            }, auth.auth_password, {
                expiresIn: auth.auth_expiresIn
            })
        });
    }
}

export default new SessionController();
