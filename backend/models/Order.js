import { DataType, DataTypes } from "sequelize";
import sequelize from "../config/db";

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    service_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    service_name: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    other_service_description: {
        type: DataTypes.TEXT,
        allowNull:true,
    },
    scheduled_time: {
        type: DataTypes.DATE,
        allowNull:false,
    },
    subscrition_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    subcription_range: {
        type: DataTypes.ENUM('30days', '90days', '180days', '365days'),
        allowNull: false,
    },
    unit: {
        type: DataTypes.ENUM('hour', 'session'),
        allowNull: false,
    },
    unit_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    total_price: {
        type: DataTypes.DECIMAL(20, 2),
        allowNull: false,
    },
    start_img_Url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    end_img_Url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    note: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    status:{
        type: DataTypes.ENUM('pending', 'assigned', 'in_progress', 'completed', 'cancelled', 'payment_confirmed'),
        defaultValue: 'pending',
    },
    customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    employee_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: 'orders',
    timestamps: true,
});

export default Order;