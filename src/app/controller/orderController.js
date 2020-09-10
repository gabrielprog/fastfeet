import {format, parseISO, startOfHour, isBefore} from 'date-fns';
import * as yup from 'yup';
import Order from '../model/orderModel';
import Recipient from '../model/recipientsModel';
import Deliveryman from '../model/deliverymanModel';
import Mail from '../../lib/Mail';

class OrderController {
    async index(request, response){
        const orderList = await Order.findAll();

        return response.status(200).json(orderList);
    }

    async store(request, response){
       
        const schema = yup.object().shape({
            recipient_id: yup.number().required(),
            deliveryman_id: yup.number().required(),
            product: yup.string().required(),
            start_date: yup.date()
        });
        
        if(!(await schema.isValid(request.body))) {
            return await response.status(406).json({
                error: "Body not are complete"
            });
        }

        const {start_date, recipient_id, product, deliveryman_id} = request.body;
        const dateCast = format(startOfHour(parseISO(start_date)), 'HH:mm');
        const hoursAllowed = [
            '08:00',
            '09:00',
            '10:00',
            '11:00',
            '12:00',
            '13:00',
            '14:00',
            '15:00',
            '16:00',
            '17:00',
            '18:00'
        ];

        const checkHoursAllowed = () => {
            for(let x in hoursAllowed){
                if(hoursAllowed[x] === dateCast){
                    return {
                        allowed: true
                    }
                }
            }
        };
        
        if(!checkHoursAllowed()){
            return response.status(400).json({error: 'Hour not allowed'});
        }

        if(isBefore(parseISO(start_date), new Date())){
            return response.status(400).json({error: 'Hour day is passed'});
        }

        const deliverymanOrder = await Order.create(request.body);
        const deliverymanFetch = await Deliveryman.findOne({
            where: {
                id: deliveryman_id
            }
        });
        const recipientFetch = await Recipient.findOne({
            where:{
                id: recipient_id
            }
        });
        await Mail.sendMail({
            to: `${deliverymanFetch.name} <${deliverymanFetch.email}>`,
            subject: 'Nova encomenda',
            template: 'order',
            context: {
                name: deliverymanFetch.name,
                nameRecipient: recipientFetch.name,
                street: recipientFetch.street,
                number: recipientFetch.number,
                cep: recipientFetch.postal_code,
                product: product,
            }
        });
        return response.status(200).json(deliverymanOrder);
    }

    async update(request, response){
        const schema = yup.object().shape({
            id: yup.number().required(),
            recipient_id: yup.number(),
            deliveryman_id: yup.number(),
            product: yup.string(),
            start_date: yup.date()
        });
        
        if(!(await schema.isValid(request.body))) {
            return await response.status(406).json({
                error: "Body not are complete"
            });
        }
        const {id} = request.body;
        const orderUpdate = await Order.update(request.body, {
            where: {
                id
            }
        });
        

        return response.status(200).json({status: true});
    }

    async delete(request, response) {
        const {id} = request.params;

        const fetchUser = await Order.findByPk(id);

        fetchUser.destroy();

        return response.status(200).json({status: true});
    }
}

export default new OrderController();
