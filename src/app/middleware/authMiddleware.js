import jwt from 'jsonwebtoken';
import auth from '../../config/auth';

export default async (request, response, next) => {
    const header = request.headers.authorization;
    
    if(!header) {
        return request.status(401).json({error: "Token not found"});
    }

    const [,token] = header.split(" ");

    jwt.verify(token, auth.auth_password, (err, decode) => {
        if(err){
            return request.status(401).json({error: "Token invalid"});
        }

        request.tokenData = {
            id: decode.id,
            name: decode.name,
            email: decode.email
        }
    });

    return next();
}