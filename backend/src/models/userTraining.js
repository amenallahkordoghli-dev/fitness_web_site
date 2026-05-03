import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const UserTraining = sequelize.define('UserTraining', {
  id:{type:DataTypes.INTEGER,
    autoIncrement:true,
      primaryKey:true},
  duration: DataTypes.INTEGER,
  weight: DataTypes.FLOAT,
  height:DataTypes.INTEGER,
  intensity:DataTypes.FLOAT,
  calories:DataTypes.FLOAT,
  protein:DataTypes.FLOAT,
  carbs:DataTypes.FLOAT,
  fat:DataTypes.FLOAT

});
export default UserTraining;