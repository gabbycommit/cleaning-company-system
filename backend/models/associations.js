import Customer from "./Customer.js";
import Employee from "./Employee.js";
import House from "./House.js";
import Order from "./Order.js";
import OrderService from "./junctions/OrderService.js";
import Payment from "./Payment.js";
import Service from "./Service.js";
import Subscription from "./Subscription.js";

//1 customer to N house
Customer.hasMany(House, { foreignKey: "customer_id", onDelete: "CASCADE" });
House.belongsTo(Customer, { foreignKey: "customer_id" });

//1 customer to N order
Customer.hasMany(Order, { foreignKey: "customer_id", onDelete: "CASCADE" });
Order.belongsTo(Customer, { foreignKey: "customer_id" });

//1 House to N order
House.hasMany(Order, { foreignKey: "house_id", onDelete: "CASCADE" });
Order.belongsTo(House, { foreignKey: "house_id" });

//N service to N order
Service.belongsToMany(Order, {
  through: OrderService,
  foreignKey: "service_id",
  otherKey: "order_id",
});

Order.belongsToMany(Service, {
  through: OrderService,
  foreignKey: "order_id",
  otherKey: "service_id",
});

//N employee to N order
Employee.belongsToMany(Order, {
  through: "EmployeeOrders",
  foreignKey: "employee_id",
  otherKey: "order_id",
});

Order.belongsToMany(Employee, {
  through: "EmployeeOrders",
  foreignKey: "order_id",
  otherKey: "employee_id",
});

//1 order to 1 payment
Order.hasOne(Payment, { foreignKey: "order_id", onDelete: "CASCADE" });
Payment.belongsTo(Order, { foreignKey: "order_id" });

// 1 subscription to N order
Subscription.hasMany(Order, {
  foreignKey: "subscription_id",
  onDelete: "CASCADE",
});
Order.belongsTo(Subscription, { foreignKey: "subscription_id" });

export {
  Customer,
  Employee,
  House,
  Order,
  OrderService,
  Payment,
  Service,
  Subscription,
};
