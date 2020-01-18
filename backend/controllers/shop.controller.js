const Product = require('../models/product');
const Cart = require('../models/cart');
const CartItem = require('../models/cart_item');
const Order = require('../models/order');

exports.getAllProducts = (req, res) =>{
  Product.find().populate("cat_id")
 .then(products=>{
     res.status(200).send({products:products});
 }
 )

};


exports.getUserCartItems = (req,res)=>{
Cart.findOne({'user_id':req.user._id})//).populate("user_id");
    .then(checkExistingCart =>{
 if(checkExistingCart !== null ){
 // res.send({cart:checkExistingCart});
CartItem.find({'cart_id': checkExistingCart._id }).populate("product_id")
    .then(items=>{
     res.send({cart:items});
    })
 }
})
};

exports.addToCart = async (req, res) => {
 let checkExistingCart = await Cart.findOne({'user_id':req.user._id});//).populate("user_id");
 if(checkExistingCart === null ){
  const cart = new Cart({
   user_id:req.user._id
  });
  cart.save((err, newCart)=>{
   if (err) return console.error(err);
   checkExistingCart = newCart
  })
 }
 const productExists = await Product.findOne({'_id':req.body.product_id});
 if(productExists !== null ) {
  const cartItem = new CartItem({
   product_id: productExists._id,
   cart_id: checkExistingCart._id,
   quantity: req.body.quantity,
   total_price: req.body.quantity * productExists.price,
  });
  cartItem.save((err, newCartItem) => {
   if (err) return console.error(err);
   res.status(201).send('added' + newCartItem)
  })
 }
};

exports.removeFromCart = (req, res) => {
 CartItem.deleteOne({'_id':req.body.item_id},
  err=>{ return console.error(err)}
 );
 res.status(200).send('removed')
};



exports.makeOrder = (req, res, next) => {

};

