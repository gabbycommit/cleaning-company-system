import { DataTypes } from "sequelize";
import sequelize from "../config/db";

const Service = sequelize.define('Service', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    service_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    other_description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    price :{
        type: DataTypes.DECIMAL(10, 2),
        allowNull:false,
    },
    unit: {
        type: DataTypes.ENUM('hour', 'session'),
        allowNull: false,
    }
}, {
    tableName: 'services',
    timestamps: true,
});

export default Service;