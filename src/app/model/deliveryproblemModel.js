import  Sequelize, {Model} from 'sequelize';

class Deliveryproblems extends Model {
    static init(sequelize) {
        super.init({
            description: Sequelize.STRING,
            delivery_id: Sequelize.INTEGER,
        },
        {
            sequelize
        });
    }
    
    static associate(model){
        this.belongsTo(model.Order, { foreignKey: 'id', as: 'rrder'});
    }
}

export default Deliveryproblems;