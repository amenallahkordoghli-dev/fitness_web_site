import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";


const Source=sequelize.define('Source',{
    id:{type:DataTypes.INTEGER,
       autoIncrement:true,
       primaryKey:true},
    title:DataTypes.STRING,
    category:DataTypes.STRING,
    description:DataTypes.STRING,
    link:DataTypes.STRING

});
export default Source;