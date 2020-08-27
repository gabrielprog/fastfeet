import  Sequelize, {Model} from 'sequelize';
import cryptography from 'bcrypt';

class User extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            password: Sequelize.STRING
        },
        {
            sequelize
        });

        this.addHook("beforeSave", async (password) => {
            if(password.password){
                password.password = await cryptography.hash(password.password, 8);
            }
        });
    }
}

export default User;