//   / To define routes for the client request

// Import express 
const express = require('express');

// Import productController
const productController = require('../Controllers/productController')

// Import wishlistController
const wishlistController = require('../Controllers/wishlistController')

// Import Cart Controller
const cartController = require('../Controllers/cartController')

// Using express create an object for router class inorder to setup path 
const router = new express.Router();  //router object created from Router() class

// Resolve various client request 

// API call 

//1.  Get all products
router.get('/products/allProducts',productController.getallproducts)

// 2.  View particular product details
router.get('/products/viewProduct/:id',productController.viewproduct)

// 3.  Add product to wishlist
router.post('/products/addtowishlist',wishlistController.addtowishlist) 

// 4.  Get wishlist details
router.get('/products/getwishlist', wishlistController.getwishlist)

// 5. Delete from wishlist products
router.delete('/products/deletewishlist/:id',wishlistController.deletewishlist)

// 6. Add to Cart
router.post('/products/addtocart',cartController.addtocart)

// 7. Get Cart Products
router.get('/products/getcart',cartController.getcart)

// 8.  Delete Cart product
router.delete('/products/deletecart/:id',cartController.delete)

// 9.  Increment cart count
router.get('/products/increment/:id',cartController.incrementCartItem)

// 10.  Decrement cart count
// router.get('/products/decrement/:id',cartController.derementCartItem)
router.get('/products/decrement/:id',cartController.derementCartItem)


// exports router 
module.exports = router