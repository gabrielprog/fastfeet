import  Sequelize, {Model} from 'sequelize';

class Deliveryman extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            email: Sequelize.STRING
        },
        {
            sequelize
        });
    }

    static associate(model){
        this.belongsTo(model.Avatar, { foreignKey: 'id', as: 'avatar'});
    }
}

export default Deliveryman;