const Product = require('../models/product');
const Category = require('../models/category');

exports.createProduct = (req, res) => {
    const product = new Product({
        product_name: req.body.product_name,
        cat_id: req.body.cat_id,
        price: req.body.price,
        image_url: req.body.image_url,
    });
    product.save((err, newProduct) => {
        if (err) return console.error(err);
        res.status(201).send(newProduct);
    })
};

exports.createCategory = (req, res) => {
    const category = new Category({title: req.body.title,});
    category.save((err, newCategory) => {
        if (err) return console.error(err);
        res.status(201).send(newCategory);
    })

};

exports.updateProduct = async (req, res) => {
    const product = await Product.findOne({'_id': req.params.id});
    product.product_name = req.body.product_name;
    product.cat_id = req.body.cat_id;
    product.price = req.body.price;
    product.image_url = req.body.image_url;

    await product.save();
    res.status(201).send("Product " + req.params.id + " Updated");


};
