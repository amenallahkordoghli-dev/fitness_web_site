import Product from "./../models/product.js"

//creer product
const createProduct=async(req,res)=>{
    try{
        const {name,price,marque,category,description,stock,expDate,prodDate}=req.body;
        let image=null;
        if (!name || !price || !category) {
        return res.status(400).json({ message: "champs obligatoires manquants" });
        }
        if(req.file){
            image=req.file.path;
        }
        let ProdDate=null;
        let ExpDate=null;
        if(expDate){
            ExpDate=expDate;
        }
        if(prodDate){
            ProdDate=prodDate
        }
        const product=await Product.create({
            name,
            price,
            marque,
            category,
            description,
            stock,
            image,
            prodDate:ProdDate,
            expDate:ExpDate,
    });
        res.status(201).json(product);
    }catch(error){
        res.status(500).json({message:error.message});
    }
}
//supprimer un produit
const deleteProduct=async(req,res)=>{
    try{
        const product=await Product.findByPk(req.params.id);
        if(!product){
            return res.status(404).json({message:"produit not existe" });
        }
        await product.destroy();
        res.json({message:"Produit supprimé avec succès"});
    }catch(error){
        res.status(500).json({message:error.message});
    }
}
//get tout les produits
const getProducts=async(req,res)=>{
    try{
    const product=await Product.findAll();
    res.json(product);
    }catch(error){
        res.status(500).json({message:error.message});
    }
}
const getProductByCategory=async(req,res)=>{
    try{
        const {category}=req.params;
        const products =await Product.findAll({
          where:{ category: category.toLowerCase()}
        });
        res.json(products);
    }catch(error){
        res.status(500).json({error:error.message});
    }
}
const updateStock =async(req,res)=>{
    try{
        const {id}=req.params;
        const {quantity}=req.body;
        const product=await Product.findByPk(id);
        if(!product){
            return res.status(404).json({message:"produit non trouvé"});
        }
        const qty = parseInt(quantity);

        if (isNaN(qty)) {
                return res.status(400).json({ message: "quantité invalide" });
        }

        product.stock += qty;

        if (product.stock < 0) {
            return res.status(400).json({ message: "stock insuffisant" });
            }
        await product.save();
        res.json({
            message:"Stock mis à jour",
            stock:product.stock
        });

    }catch(error){
        res.status(500).json({error:error.message});
    }
}
export {createProduct,deleteProduct,getProducts,getProductByCategory,updateStock};