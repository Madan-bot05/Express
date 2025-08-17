import { DataTypes } from "sequelize";
import sequelize from "../util/database.js";
// import {DataTypes} from '@sequelize/mysql'

const Product=sequelize.define('Product',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },

    name:{
        type:DataTypes.STRING,
        allowNull:false
    },

    price:{
        type:DataTypes.INTEGER,
        allowNull:false
    },

    description:{
        type:DataTypes.STRING,
        allowNull:false
    },
});

export default Product;