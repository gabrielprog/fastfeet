import Deliveryproblem from '../model/deliveryproblemModel';
import * as yup from 'yup';

class DeliveryproblemController {

    async index(request, response){
        const deliveryproblems = await Deliveryproblem.findAll();

        response.status(200).json(deliveryproblems);
    }

    async store(request, response){
        
        const schema = yup.object().shape({
            delivery_id: yup.number().required(),
            description: yup.string().required()
        });
        
        if(!(await schema.isValid(request.body))) {
            return await response.status(406).json({
                error: "Body not are complete"
            });
        }

    }
}

export default new DeliveryproblemController();