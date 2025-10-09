import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Subscription = sequelize.define('Subscription', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    repeat_type: {
        type: DataTypes.ENUM('7days', '14days', '30days', 'custom'),
        allowNull: false,
    },
    custom_repeat_day: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('active', 'paused', 'cancelled'),
        allowNull: false,
    }
}, {
    tableName: 'subscriptions',
    timestamps: true,
});

export default Subscription;