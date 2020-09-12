import Sequelize from 'sequelize';
import configDatabase from '../config/configDatabase';
import User from '../app/model/userModel';
import Recipient from '../app/model/recipientsModel';
import Deliveryman from '../app/model/deliverymanModel';
import Avatar from '../app/model/avatarModel';
import Signature from '../app/model/signatureModel';
import Order from '../app/model/orderModel';
import Deliveryproblems from '../app/model/deliveryproblemModel';
import Daylimit from '../app/model/daylimitModel';

const models = [User, Recipient, Deliveryman, Avatar, Signature, Order, Deliveryproblems, Daylimit];

class connection {

    constructor() {
        this.init();
    }

    init() {
        this.connect = new Sequelize(configDatabase);
        
        models
        .map(model => model.init(this.connect));
        models
        .map(model => model.associate && model.associate(this.connect.models));
    }
}

export default new connection();
