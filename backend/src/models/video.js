import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Video = sequelize.define('Video', {
  num:{type:DataTypes.INTEGER,
    autoIncrement:true,
        primaryKey:true},
  title: DataTypes.STRING,
  url: DataTypes.STRING,
  description: DataTypes.TEXT,
  duration: DataTypes.INTEGER,
  category:DataTypes.STRING
  
});

export default Video;