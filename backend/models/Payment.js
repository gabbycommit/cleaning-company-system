import { DataTypes } from "sequelize";
import sequelize from "../config/db";

const Payment = sequelize.define('Payment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    payment_method: {
        type: DataTypes.ENUM('caah', 'online_banking', 'e-wallet'),
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('pending', 'confirmed'),
        defaultValue: ('pending'),
        allowNull:false,
    },
}, {
    tableName: 'payments',
    timestamps: true,
});

export default Payment;