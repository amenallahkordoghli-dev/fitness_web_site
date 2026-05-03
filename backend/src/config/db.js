import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('fitness_db', 'root', 'root123', {
  host: 'localhost',
  dialect: 'mysql'
});

export default sequelize;