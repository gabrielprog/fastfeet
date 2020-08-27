import sequelize from 'sequelize';
import configDatabase from '../config/configDatabase';
import User from '../app/model/userModel';

const models = [User];

class connection {

    constructor() {
        this.conn = this.init();

        models.map(model => model.init(this.conn));
    }

    init() {
        this.connect = new sequelize(configDatabase);

    }
}

export default new connection();
