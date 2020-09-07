import  Sequelize, {Model} from 'sequelize';

class Avatar extends Model {
    static init(sequelize) {
        super.init({
            name_file: Sequelize.STRING,
            path_file: Sequelize.STRING
        },
        {
            sequelize
        });
    }
}

export default Avatar;