import Deliveryproblems from '../model/deliveryproblemModel';

class DeliveryproblemsForId {

    async index(request, response){
        const {id} = request.params;

        const fetchProblemsForId = await Deliveryproblems.findOne({
            where: {
                id
            }
        });

        return response.status(200).json(fetchProblemsForId);
    }
}

export default new DeliveryproblemsForId();