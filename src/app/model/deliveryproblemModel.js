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
        this.belongsTo(model.Deliveryman, { foreignKey: 'id', as: 'deliveryman'});
    }
}

export default Deliveryproblems;