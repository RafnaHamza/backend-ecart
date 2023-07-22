// Import wishlistSchema

const wishlists = require('../model/wishlistSchema')

// logic wishlist
// Add product to wishlist
exports.addtowishlist=async(req,res)=>{
    // /Get specific product details from the request

    // js destructuring
    const {id,title,price,image} = req.body

    // Logic for wishlist
    try{
        // check wether the product already exist in wishlist or not
        const item = await wishlists.findOne({id})
        if(item){
            res.status(401).json("Item already exist in wishlist")
        }
        else{
            //product is added to wishlist
            const newProduct = await wishlists({id,title,price,image})
            // to store in db
            await newProduct.save()
            res.status(200).json("Item Added to Wishlist")
        }
    }
    catch(error){
        res.status(404).json(error) 
    }
}

// get wishlist products from db
exports.getwishlist = async(req,res)=>{
    try{
        // Logic
        // get all product from wishlist collection
        const allwishlist = await wishlists.find()
        res.status(200).json(allwishlist)  //response send back to client
    }
    catch(error){
        res.status(404).json(error)
    }
}

// delete wishlist products from db
exports.deletewishlist = async(req,res)=>{

    // get particular product id
    const {id} = req.params

    try{
        // logic
        // delete wishlist product
        const removewishlist = await wishlists.deleteOne({id})
        if(removewishlist){
            // get all wishlist products after removing particular product
            const remainingwishlist = await wishlists.find()
            res.status(200).json(remainingwishlist)  //response send back to client
        }
    }
    catch(error){
        res.status(404).json(error)   //error response

    }
}
