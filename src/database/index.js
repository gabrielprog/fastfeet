import Sequelize from 'sequelize';
import configDatabase from '../config/configDatabase';
import User from '../app/model/userModel';
import Recipient from '../app/model/recipientsModel';

const models = [User, Recipient];

class connection {

    constructor() {
        this.exec = this.init();
    }

    init() {
        this.connect = new Sequelize(configDatabase);
        
        models.map(model => model.init(this.connect));
    }
}

export default new connection();
