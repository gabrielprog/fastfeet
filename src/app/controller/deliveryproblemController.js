import Deliveryproblem from '../model/deliveryproblemModel';
import * as yup from 'yup';

class DeliveryproblemController {

    async index(request, response){
        const deliveryproblems = await Deliveryproblem.findAll();

        response.status(200).json(deliveryproblems);
    }

    async store(request, response){
        const schema = yup.object().shape({
            description: yup.string().required()
        });
        
        if(!(await schema.isValid(request.body))) {
            return await response.status(406).json({
                error: "Body not are complete"
            });
        }

        const {id} = request.params;
        const {description} = request.body;

        const putProblem = await Deliveryproblem.create({
            delivery_id: id,
            description
        });

        return response.status(201).json(putProblem);
    }
}

export default new DeliveryproblemController();