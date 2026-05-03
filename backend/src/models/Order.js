import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";


const Order=sequelize.define('Order',{
    id:{type:DataTypes.INTEGER,
       autoIncrement:true,
       primaryKey:true},
    totalPrice:{
        type:DataTypes.FLOAT,
        allowNull:false
    },
    status:{
        type:DataTypes.STRING,
        defaultValue:'pending'
    },
    PaymentMethod:{
        type:DataTypes.STRING,
        defaultValue:"cash"
    },
    address:{
        type:DataTypes.STRING,
        allowNull:false
    }


});
export default Order;