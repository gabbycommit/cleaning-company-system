import { DataTypes } from "sequelize";
import sequeliz from "../config/db";

const OrderService = sequeliz.define('OrderService', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    service_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    unit_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    note: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    tableName: 'order_services',
    timestamps: true,
});

export default OrderService;