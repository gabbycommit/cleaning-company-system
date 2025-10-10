import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Payment from "./Payment.js";
import OrderService from "./junctions/OrderService";

const Order = sequelize.define(
  "Order",
  {
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
      allowNull: true,
    },
    scheduled_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    subscription_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    subscription_range: {
      type: DataTypes.ENUM("30days", "90days", "180days", "365days"),
      allowNull: false,
    },
    unit: {
      type: DataTypes.ENUM("hour", "session"),
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
    status: {
      type: DataTypes.ENUM(
        "pending",
        "assigned",
        "in_progress",
        "completed",
        "cancelled",
        "payment_confirmed"
      ),
      defaultValue: "pending",
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    house_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "orders",
    paranoid: true,
    timestamps: true,
  }
);

Order.addHook("afterDestroy", async (order, options) => {
  await Promise.all([
    Payment.update(
      { deletedAt: new Date() },
      {
        where: { order_id: order.id },
        transaction: options?.transaction,
      }
    ),
    OrderService.update(
      { deletedAt: new Date() },
      {
        where: { order_id: order.id },
        transaction: options?.transaction,
      }
    ),
  ]);
});

export default Order;
