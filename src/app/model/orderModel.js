import  Sequelize, {Model} from 'sequelize';

class Order extends Model {
    static init(sequelize) {
        super.init({
            recipient_id: Sequelize.INTEGER,
            deliveryman_id: Sequelize.INTEGER,
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
        this.belongsTo(model.Recipient, { foreignKey: 'id', as: 'recipient'});
        this.belongsTo(model.Deliveryman, { foreignKey: 'id', as: 'deliveryman'});
        this.belongsTo(model.Signature, { foreignKey: 'id', as: 'signature'});
    }
}

export default Order;