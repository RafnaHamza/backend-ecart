// Logic to resolve 
// 

// Import products collection
const products = require('../model/productSchema')

// get all products
exports.getallproducts = async (req,res)=>{
    //logic
    try{
        // get all products from products collection in mongodb
        const allProducts = await products.find()
        res.status(200).json(allProducts) // response send back to the client
    }
    catch(err){
        res.status(401).json(err) // error sending back to the client
    }
}


// view particular product details
exports.viewproduct=async(req,res)=>{
    //logic
    // get particular product id
    const id = req.params.id //1
    // get details of particular product
    try{
        const product = await products.findOne({id})
        if(product){
            res.status(200).json(product)  //response(product) send back to the client
        }
        else{
            res.status(401).json(err) //error message sending back to the client
        }
    }
    catch(err){
        res.status(401).json(err) //error sending back to the client
    }
}

