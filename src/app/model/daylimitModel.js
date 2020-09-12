import  Sequelize, {Model} from 'sequelize';

class Daylimit extends Model {
    static init(sequelize) {
        super.init({
            deliveryman_id: Sequelize.INTEGER,
            count_used: Sequelize.INTEGER,
            date: Sequelize.DATE
        },
        {
            sequelize
        });
    }
    
    static associate(model){
        this.belongsTo(model.Deliveryman, { foreignKey: 'id', as: 'deliveryman'});
    }
}

export default Daylimit;