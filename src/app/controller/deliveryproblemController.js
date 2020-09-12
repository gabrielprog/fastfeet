import Deliveryproblem from '../model/deliveryproblemModel';
import Order from '../model/orderModel';
import Deliveryman from '../model/deliverymanModel';
import Recipient from '../model/recipientsModel';
import Mail from '../../lib/Mail';
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

    async delete(request, response){
        const {id} = request.params;
        const fetchOrder = await Deliveryproblem.findByPk(
            id,
            {
                include: [{
                    model: Order,
                    as: 'order',
                    include: [{
                        model: Deliveryman,
                        as: 'deliveryman'
                    },
                    {
                        model: Recipient,
                        as: 'recipient'
                    }
                ]
                }]
            });
            
        fetchOrder.order.canceled_at = new Date();

        await Mail.sendMail({
            to: `${fetchOrder.order.deliveryman.name} <${fetchOrder.order.deliveryman.email}>`,
            subject: 'Encomenda cancelada',
            template: 'cancel',
            context: {
                name: fetchOrder.order.deliveryman.name,
                nameRecipient: fetchOrder.order.recipient.name,
                street: fetchOrder.order.recipient.street,
                number: fetchOrder.order.recipient.number,
                cep: fetchOrder.order.recipient.postal_code,
                product: fetchOrder.order.product,
             }
        });

        fetchOrder.order.save();

        return response.status(200).json({status: true});
    }
}

export default new DeliveryproblemController();