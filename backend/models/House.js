import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const House = sequelize.define('House', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    house_type: {
        type: DataTypes.ENUM(
            'condo',
            'semi_d',
            'terrace',
            'townhouse',
            'shop-lot',
            'bangalow',
            'other'
        ),
        allowNull: false,
    },
    state: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    street: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    unit_no: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    poscode: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: 'houses',
    timestamps: true,
});

export default House;