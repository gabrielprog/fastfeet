import Sequelize from 'sequelize';
import configDatabase from '../config/configDatabase';
import User from '../app/model/userModel';
import Recipient from '../app/model/recipientsModel';
import Deliveryman from '../app/model/deliverymanModel';
import Avatar from '../app/model/avatarModel';
import Signature from '../app/model/signatureModel';
import Order from '../app/model/orderModel';
import Deliveryproblems from '../app/model/deliveryproblemModel';
import mongoose from 'mongoose';

const models = [User, Recipient, Deliveryman, Avatar, Signature, Order, Deliveryman];

class connection {

    constructor() {
        this.init();
        this.mongo();
    }

    init() {
        this.connect = new Sequelize(configDatabase);
        
        models
        .map(model => model.init(this.connect));
        models
        .map(model => model.associate && model.associate(this.connect.models));
    }

    mongo() {
    	this.connectMongo = mongoose.connect(
    		process.env.MONGO_URL,
    		{ useNewUrlParser: true, useFindAndModify: true}
    		);
    }
}

export default new connection();
