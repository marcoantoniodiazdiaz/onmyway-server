import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
    database: 'onmyway',
    host: 'localhost',
    password: 'root',
    username: 'root',
    dialect: 'mysql',
    logging: false,
});

export default sequelize;