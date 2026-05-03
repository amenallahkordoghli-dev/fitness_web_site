import User from "./user.js";
import Video from "./video.js";
import Product from "./product.js";
import Cart from "./Cart.js";
import CartItem from "./CartItem.js";

User.hasOne(Cart);
Cart.belongsTo(User);

Cart.hasMany(CartItem);
CartItem.belongsTo(Cart);

Product.hasMany(CartItem);
CartItem.belongsTo(Product);

User.hasMany(Video);
Video.belongsTo(User);

