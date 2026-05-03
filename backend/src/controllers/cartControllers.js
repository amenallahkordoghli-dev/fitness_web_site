import Cart from '../models/Cart.js';
import CartItem from '../models/CartItem.js';
import Product from '../models/product.js';
import Order from '../models/Order.js';
import OrderItem from '../models/OrderItem.js';
import sequelize from '../config/db.js';
import User from '../models/user.js';

export const addToCart=async(req,res)=>{
    try{
    const userId=req.user.id;
    const {productId,quantity}=req.body;
    //verifier s'il le produit existe dans stock
    const product=await Product.findByPk(productId);
    const qty = parseInt(quantity);

    if (isNaN(qty) || qty <= 0) {
    return res.status(400).json({ message: "quantité invalide" });
        }

    if (!product || product.stock < qty) {
        return res.status(400).json({ message: "Produit indisponible" });
    }   
    
    //trouver cart ou crée
    let cart=await Cart.findOne({where:{UserId:userId}});
    if(!cart){
        cart=await Cart.create({UserId:userId})
    }
    //verifier si cartItem existe deja
    let item=await CartItem.findOne({
        where:{CartId:cart.id,ProductId:productId}
    });
    if(item){
        if (item.quantity + qty > product.stock) {
        return res.status(400).json({ message: "stock insuffisant" });
        }
        item.quantity += qty;
        await item.save();
        //n'existe pas on creer
    }else{
        
        await CartItem.create({
            CartId:cart.id,
            ProductId:productId,
            quantity,
            price: product.price
        });
    }
    res.json({message:"produit ajouter avec succée"});
    }catch(error){
        res.json({message:error.message});
    }
} 

export const getCart=async (req,res)=>{
    try{
    const cart=await Cart.findOne({where:{UserId:req.user.id},include:{
        model:CartItem,
        include:Product
    }});
    if (!cart) {
    return res.json({ CartItems: [] });
    }
    res.json(cart);
    }catch(error){
        res.json({message:error.message});
    }
}
export const checkout = async (req, res) => {
    const t = await sequelize.transaction();

    try {
        const { address } = req.body;

        const cart = await Cart.findOne({
            where: { UserId: req.user.id },
            include: {
                model: CartItem,
                include: Product
            },
            transaction: t
        });

        if (!cart || cart.CartItems.length === 0) {
            await t.rollback();
            return res.status(400).json({ message: "Panier vide" });
        }

        let total = 0;

        for (const item of cart.CartItems) {
            if (item.Product.stock < item.quantity) {
                await t.rollback();
                return res.status(400).json({
                    message: `Stock insuffisant pour ${item.Product.name}`
                });
            }
            total += item.quantity * item.Product.price;
        }

        const order = await Order.create({
            UserId: req.user.id,
            totalPrice: total,
            address,
            PaymentMethod: "cash"
        }, { transaction: t });

        for (const item of cart.CartItems) {
            await OrderItem.create({
                OrderId: order.id,
                ProductId: item.Product.id,
                quantity: item.quantity,
                price: item.Product.price
            }, { transaction: t });

            // 🔥 IMPORTANT : réduire stock
            item.Product.stock -= item.quantity;
            await item.Product.save({ transaction: t });
        }

        await CartItem.destroy({
            where: { CartId: cart.id },
            transaction: t
        });

        await t.commit();

        res.json({ message: "commande envoyée" });

    } catch (error) {
        await t.rollback();
        res.status(500).json({ message: error.message });
    }
};
export const getInvoice=async (req,res)=>{
    try{
        const order=await Order.findByPk(req.params.id,{
            include:[
                {
                    model:OrderItem,
                    include:[Product]
                },
                {
                    model:User,
                    attributes:["firstName","email"]
                }
            ]
        });
        if(!order){
            return res.status(404).json({message:"commande non trouvée"});

        }
        if(order.UserId !== req.user.id){
            return res.status(403).json({message:"accés refusé"});
        }
        res.json({
        id: order.id,
        client: order.User.firstName,
        email: order.User.email,
        produits: order.OrderItems,
        total: order.totalPrice,
        date: order.createdAt
});
    }catch(error){
        res.status(500).json({message:error.message});
    }
}