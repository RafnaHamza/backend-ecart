// Import cart Schema

const carts = require('../model/cartSchema')

// add to cart
exports.addtocart = async(req,res)=>{
    // get product details from request
    // destructuring
     const {id,title,price,image,quantity} = req.body

     try{
        // logic
        const product = await carts.findOne({id})
        if(product){
            // if product is alredy in cart then increment the quantity
            product.quantity += 1
            // Update grand total
            product.grandTotal = product.price*product.quantity
            // save the changes into DB
            product.save()
            // send response back to the client
            res.status(200).json("Cart Item Updated")
        }
        else{
            // else- product is not in the cart, then add the product to cart
            const newProduct = new carts(
                {id,title,price,image,quantity,grandTotal:price}
            )
            // save new product
            await newProduct.save()
            // Response send back to the client
            res.status(200).json("Product Added to Your Cart")
        }
     }
     catch(error){
        res.status(404).json(error)
     }

    // check if product is already in cart then update the quantity and price

    // else add to cart


}

// Get cart items
exports.getcart = async(rq,res)=>{
    // get cart items from cart collection
    try{
        // logic
        const allcartItems = await carts.find()
        // response send back to the client
        res.status(200).json(allcartItems)
    }
    catch(error){
        res.status(404).json(error)
    }
}

// Delete Cart Items
exports.delete=async(req,res) => {
    // remove cart items
    // get product id from parameter
    const {id} = req.params
    try{
        // logic
        const removecartitems = await carts.deleteOne({id})
        if(removecartitems.deleteCount!=0){
            // get all crart items after removing particular cart items
            const allcartItems = await carts.find()
            res.status(200).json(allcartItems)
        }
    }
    catch(error){
        res.status(401).json(error)
    } 
}

// Increment cart item count
exports.incrementCartItem = async(req,res) => {
    // get product id from request
    const {id} = req.params
    try{
        // logic
        // check the product is present in the cart
        const product = await carts.findOne({id})
        if(product){
            // Update the quantity and grand total
            product.quantity+=1
            product.grandTotal=product.quantity * product.price
            // save changes to the DB
            await product.save()
            // updated details send back to the client
            const allcartItems = await carts.find()
            // response send back to the client
            res.status(200).json(allcartItems)
        }
        else{
            res.status(404).json("Product Not Found")
        }
    }
    catch(error){
        res.status(404).json(error)
    }
}

// Decrement cart item count
exports.derementCartItem = async(req,res) => {
    // get product id from request
    const {id} = req.params
    try{
        // logic
        // check the product is present in the cart
        const product = await carts.findOne({id})
        if(product){
            // Update the quantity and grand total
            product.quantity-=1
            if(product.quantity==0){

            const removecartitems = await carts.deleteOne({id})
            const allcartItems = await carts.find()
            res.status(200).json(allcartItems)

            }

            else{
                product.grandTotal=product.quantity * product.price
                // save changes to the DB
                await product.save()
                // updated details send back to the client
                const allcartItems = await carts.find()
                // response send back to the client
                res.status(200).json(allcartItems)
            }  
        }
            
        }
        catch(error){
            res.status(404).json(error)
        }
    }
    