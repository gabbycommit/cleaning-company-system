import { DataTypes } from "sequelize";
import sequelize from "../config/db";

const Employee = sequelize.define('Employee', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    gender: {
        type: DataTypes.ENUM('male', 'female', 'other'),
        allowNull:false,
    },
    nationality: {
        type : DataTypes.STRING(20),
        allowNull:false,
    },
    phone: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    ic_passport: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    emergency_contact: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    bank_acc: {
        type: DataTypes.STRING(30),
        allowNull: true,
    },
    bank_name: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    socso: {
        type: DataTypes.STRING(30),
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM('active', 'resigned'),
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('cleaner', 'admin'),
        allowNull: false,
    }
}, {
    tableName: 'customers',
    timestapms: true,
});

export default Employee;