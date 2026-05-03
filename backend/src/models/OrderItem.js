import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";


const OrderItem=sequelize.define('OrderItem',{
    id:{type:DataTypes.INTEGER,
       autoIncrement:true,
       primaryKey:true},
    quantity:DataTypes.INTEGER,
    price:DataTypes.FLOAT


});
export default OrderItem;