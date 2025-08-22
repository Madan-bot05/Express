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
    unique: true, 
    validate: {
      isEmail: true
    }
  },
  mobile: {
    type: DataTypes.STRING,
    allowNull: true 
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'USER' 
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'users', 
  timestamps: false // We're handling the createdAt field manually, so we'll disable Sequelize's automatic timestamps
});

export default User