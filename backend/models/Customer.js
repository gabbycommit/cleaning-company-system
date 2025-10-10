import { DataTypes, where } from 'sequelize';
import sequelize from "../config/db.js";
import House from './House.js';
import Order from './Order.js';
import Payment from './Payment.js';


const Customer = sequelize.define('Customer', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING(20),
        allowNull: false,
    }
}, {
    tableName: 'customers',
    paranoid: true,
    timestamps: true,
});

Customer.addHook('afterDestroy', async(customer, options) => {
    await House.update(
        { deletedAt: new Date() },
        { 
            where: {customer_id: customer.id,}, 
            transaction: options?.transaction, 
        }
    );

    await Order.update(
        { deletedAt: new Date() },
        { 
            where: {customer_id: customer.id,}, 
            transaction: options?.transaction,
        }
    );

    await Payment.update(
        { deletedAt: new Date() },
        { 
            where: {
                order_id: sequelize.literal(`(
                SELECT id FROM orders WHERE customer_id = ${customer.id}
            )`)
            
        }, 
            transaction: options?.transaction, 
        }
    );
});

export default Customer;