import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
    database: 'onmyway',
    host: 'localhost',
    password: 'pataPON3',
    username: 'root',
    dialect: 'mysql',
    logging: false,
});

export default sequelize;