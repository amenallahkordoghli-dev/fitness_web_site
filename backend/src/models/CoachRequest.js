import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";


const CoachRequest=sequelize.define('CoachRequest',{
    id:{type:DataTypes.INTEGER,
       autoIncrement:true,
       primaryKey:true},
    message:{
        type:DataTypes.TEXT
    },
    status:{
        type:DataTypes.STRING,
        defaultValue:"pending"
    }
  
});
export default CoachRequest;