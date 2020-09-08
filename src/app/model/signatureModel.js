import  Sequelize, {Model} from 'sequelize';

class Signature extends Model {
    static init(sequelize) {
        super.init({
            path_file: Sequelize.STRING
        },
        {
            sequelize
        });
    }
    
    static associate(model){
        this.belongsTo(model.Recipient, { foreignKey: 'id', as: 'Recipient'});
    }
}

export default Signature;