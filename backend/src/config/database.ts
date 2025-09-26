
import { Sequelize } from 'sequelize';
import path from 'path';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.resolve(__dirname, '..', '..', 'database.sqlite'),
  logging: false, // Set to true to see SQL queries in console
});

export default sequelize;
