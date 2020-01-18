const Product = require('../models/product');
const Category = require('../models/category');

exports.createProduct = (req, res, next) => {
    const product = new Product({
        product_name: req.body.product_name,
        cat_id: req.body.cat_id,
        price:req.body.price,
        image_url: req.body.image_url,
    });
    product.save((err, newProduct)=>{
        if (err) return console.error(err);
        res.send(newProduct);
    })
};

exports.createCategory = (req, res, next) => {
const category = new Category({title: req.body.title,});
    category.save((err, newCategory)=>{
        if (err) return console.error(err);
        res.send(newCategory);
    })

};

exports.updateProduct = (req, res, next) => {

};
