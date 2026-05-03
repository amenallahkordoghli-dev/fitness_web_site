import {DataTypes} from 'sequelize';
import sequelize from '../config/db.js';

const User=sequelize.define('User',{
    id:{type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    firstName:DataTypes.STRING,
    lastName:DataTypes.STRING,
    email:DataTypes.STRING,
    password:DataTypes.STRING,
    profilePhoto:DataTypes.STRING,
    role:{
        type:DataTypes.STRING,
        defaultValue:'client'
    },
    phone:DataTypes.STRING,
    bio:DataTypes.STRING


})

export default User;