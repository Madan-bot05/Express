import { Sequelize } from 'sequelize';


// Create a new Sequelize instance.
const sequelize = new Sequelize('express', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql', 
    logging: false
});

export default sequelize;
