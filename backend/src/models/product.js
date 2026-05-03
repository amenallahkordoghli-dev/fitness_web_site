import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Product = sequelize.define('Product', {
  id:{type:DataTypes.INTEGER,
    autoIncrement:true,
      primaryKey:true},
  name: DataTypes.STRING,
  price: DataTypes.FLOAT,
  marque: DataTypes.STRING,
  category:DataTypes.STRING,
  description: DataTypes.TEXT,
  image: DataTypes.STRING,
  stock:{type: DataTypes.INTEGER,
          defaultValue:0},
});
export default Product;