// This file sets up and exports the Sequelize database connection instance.

// Import the Sequelize class from the main 'sequelize' package.
import { Sequelize } from 'sequelize';
// Note: You do not need to import @sequelize/mysql directly here.
// Sequelize will use it as the dialect driver automatically.
// You also don't need to import mysql from "mysql2" unless you are
// using it separately from Sequelize.

// Create a new Sequelize instance.
const sequelize = new Sequelize('express1', 'root', 'Madan983', {
    host: 'localhost',
    dialect: 'mysql', // Specify the database dialect.
    logging: false
});

// Export the configured Sequelize instance.
export default sequelize;
