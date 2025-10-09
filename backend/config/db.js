import { Sequelize} from 'Sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
  }
);

//测试数据连接
sequelize.authenticate()
  .then(() => console.log("Connected to MySQL Database via Sequelize"))
  .catch(err => console.log("Database connection failed:", err));

export default sequelize;