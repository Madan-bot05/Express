// Step 1: Import necessary modules
import { DataTypes } from "sequelize";
import sequelize from "../util/database.js";

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Ensures email is unique
    validate: {
      isEmail: true
    }
  },
  mobile: {
    type: DataTypes.STRING,
    allowNull: true // Assuming mobile is optional
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'USER' // A default role is a good practice
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'users', // Matches the table name in your Java code
  timestamps: false // We're handling the createdAt field manually, so we'll disable Sequelize's automatic timestamps
});

// Step 3: Export the model
export default User