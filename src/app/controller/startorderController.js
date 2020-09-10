import Order from '../model/orderModel';
import * as yup from 'yup';
import {format, parseISO, startOfHour, isBefore} from 'date-fns';

class StartorderController {
   async store(request, response){
        const schema = yup.object().shape({
            id: yup.number().required(),
            start_date: yup.date().required()
        });
        
        if(!(await schema.isValid(request.body))) {
            return await response.status(406).json({
                error: "Body not are complete"
            });
        }
        
        const {id, start_date} = request.body;
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
        const {id: deliveryId} = request.params;

        await Order.update(request.body, {
            where: {
                deliveryman_id: deliveryId,
                id
            }
        });
    
        return response.status(200).json({status: true});
   }
}

export default new StartorderController();
