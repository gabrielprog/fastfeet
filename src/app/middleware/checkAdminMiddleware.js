import User from '../model/userModel';

export default async (request, response, next) => {
    if(!request.tokenData){
        return response.status(400).json({error: 'Token not found'});
    }

    const {id} = request.tokenData;
    const checkAdmin = await User.findByPk(id);

    if(!checkAdmin){
        return response.status(400).json({error: 'You not have permission'});
    }

    return next();
}