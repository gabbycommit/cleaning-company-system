import sequelize from "./config/db.js";
import "./models/associations.js";
import "./models/User.js";
import dotenv from "dotenv";

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Tables create or updated succefully");
    process.exit(0);
  })
  .catch((err) => {
    console.log("Error creating table.", err);
    process.exit(1);
  });
