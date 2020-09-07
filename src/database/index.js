import Sequelize from 'sequelize';
import configDatabase from '../config/configDatabase';
import User from '../app/model/userModel';
import Recipient from '../app/model/recipientsModel';
import mongoose from 'mongoose';

const models = [User, Recipient];

class connection {

    constructor() {
        this.exec = this.init();
    }

    init() {
        this.connect = new Sequelize(configDatabase);
        
        models.map(model => model.init(this.connect));
    }

    mongo() {
    	this.connectMongo = mongoose.connect(
    		process.env.MONGO_URL,
    		{ useNewUrlParser: true, useFindAndModify: true}
    		);
    }
}

export default new connection();
