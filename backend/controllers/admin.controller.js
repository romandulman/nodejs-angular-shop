const Product = require('../models/product');
const Category = require('../models/category');
const multer = require('multer');

/*Multer config*/
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname) //Date.now() + '-' +
    }
});
var upload = multer({storage: storage}).single('imageFile');

exports.createProduct = (req, res) => {
    upload(req, res, async err => {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
    });

    const product = new Product({
        product_name: req.body.product_name,
        cat_id: req.body.cat_id,
        price: req.body.price,
        image_url: ''//`uploads/${req.file.originalname}`,
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
