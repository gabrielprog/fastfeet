import Order from '../model/orderModel';
import Daylimit from '../model/daylimitModel';
import * as yup from 'yup';
import {format, parseISO, startOfHour, isBefore, isToday} from 'date-fns';

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

        const daylimit = async () => {
            const fetchAllDate = await Daylimit.findAll({
                where: {
                    deliveryman_id: deliveryId
                }
            });

            if(fetchAllDate.length === 0) {
                await Daylimit.create({
                    deliveryman_id: deliveryId,
                    date: new Date()
                });
                return true;
            }

            for(var i in fetchAllDate) {
                if(isToday(fetchAllDate[i].date) && fetchAllDate[i].count_used >= 5){
                    return false;
                }
            }
        
            fetchAllDate[i].count_used = Number(fetchAllDate[i].count_used) + 1;
            fetchAllDate[i].save(); 
            return true;
        };
        
        if(!(await daylimit())){
            return response.status(200).status(400).json({error: 'Seu limite de retirada já foi esgotado'})
        }

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
