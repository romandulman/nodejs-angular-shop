const Product = require('../models/product');
const Cart = require('../models/cart');
const CartItem = require('../models/cart_item');
const Order = require('../models/order');

exports.getAllProducts = (req, res) => {
    Product.find().populate("cat_id")
        .then(products => {
            res.status(200).send({products: products});
        })
};

exports.getProductsByCatId = (req, res) => {
    Product.find({'cat_id': req.params.id}).populate("cat_id")
        .then(products => {
            res.status(200).send({products: products});
        })
};

exports.getUserCartItems = (req, res) => {
    Cart.findOne({'user_id': req.user._id})//).populate("user_id");
        .then(checkExistingCart => {
            if (checkExistingCart !== null) {
                CartItem.find({'cart_id': checkExistingCart._id}).populate("product_id")
                    .then(items => {
                        return res.status(200).send({cart_items: items});
                    })
            } else {
                res.status(200).send({cart_items: {}});
            }

        })
};

exports.addToCart = async (req, res) => {
    let checkExistingCart = await Cart.findOne({'user_id': req.user._id});//).populate("user_id");
    if (checkExistingCart === null) {
        const cart = new Cart({
            user_id: req.user._id
        });
        cart.save(async (err, newCart) => {
            if (err) return console.error(err);
            checkExistingCart = await newCart
            console.log(checkExistingCart._id)
        })
    }
    const productExists = await Product.findOne({'_id': req.body.product_id});
    if (productExists !== null) {
        const cartItem = new CartItem({
            product_id: productExists._id,
            cart_id: checkExistingCart._id,
            quantity: req.body.quantity,
            total_price: req.body.quantity * productExists.price,
        });
        cartItem.save((err, newCartItem) => {
            if (err) return console.error(err);
            res.status(201).send({added_item: newCartItem})
        })
    }
};

exports.removeFromCart = (req, res) => {
    CartItem.deleteOne({'_id': req.params.id},
        err => {
            return console.error(err)
        }
    );
    res.status(200).send('Item ' + req.params.id + ' Removed')
};


exports.checkOutOrder = async (req, res, next) => {
    const checkExistingCart = await Cart.findOne({'user_id': req.user._id});
    const getCartItems = await CartItem.find({'cart_id': checkExistingCart._id});
   const totalPrice = await getCartItems.reduce((a, b) => ({
       total_price: a.price + b.price
   }));
    const newOrder = new Order({
        user_id:req.user._id,
        cart_id: checkExistingCart._id,
        total_price: totalPrice,
        city: req.user.city,
        street: req.user.street,
        order_send_date: req.body.order_send_date,
        last_cc_digits: req.body.last_cc_digits
    });
    newOrder.save((err, newOrder) => {
        if (err) return console.error(err);
        res.status(201).send({new_order: newOrder})
    })
};

