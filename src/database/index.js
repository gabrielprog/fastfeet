import sequelize from 'sequelize';
import configDatabase from '../config/configDatabase';
import User from '../app/model/userModel';

const models = [User];

class connection {

    constructor() {
        this.exec = this.init();

        models.map(model => model.init(this.exec));
    }

    init() {
        this.connect = new sequelize(configDatabase);
    }
}

export default new connection();
