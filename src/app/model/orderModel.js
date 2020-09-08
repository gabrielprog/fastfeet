import  Sequelize, {Model} from 'sequelize';

class Order extends Model {
    static init(sequelize) {
        super.init({
            product: Sequelize.STRING,
            canceled_at: Sequelize.DATE,
            start_date: Sequelize.DATE,
            end_date: Sequelize.DATE
        },
        {
            sequelize
        });
    }
    
    static associate(model){
        this.belongsTo(model.Recipient, { foreignKey: 'id', as: 'Recipient'});
        this.belongsTo(model.Deliveryman, { foreignKey: 'id', as: 'Deliveryman'});
        this.belongsTo(model.Signature, { foreignKey: 'id', as: 'Signature'});
    }
}

export default Order;