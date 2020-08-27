import {DataType, Model} from 'sequelize';

class User extends Model {
    static init(sequelize) {
        super.init({
            name: DataType.STRING,
            email: DataType.STRING,
            password: DataType.STRING
        },
        {
            sequelize
        });
    }
}

export default User.init;