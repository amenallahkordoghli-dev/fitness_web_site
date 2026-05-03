import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Training = sequelize.define('Training', {
  id:{type:DataTypes.INTEGER,
    autoIncrement:true,
      primaryKey:true},
  name:{type: DataTypes.STRING,},
  met: DataTypes.FLOAT

});
export default Training;