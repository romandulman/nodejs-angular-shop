const express = require('express');
const shopRouter = express.Router();
const adminController = require("../controllers/admin.controller");
const adminVerify = require('../middlewares/admin');
const shopController = require("../controllers/shop.controller");

shopRouter.get("/products", shopController.getAllProducts);
shopRouter.get("/products/:id", shopController.getProductsById);

shopRouter.get("/cart", shopController.getUserCartItems);
shopRouter.post("/cart", shopController.addToCart);
shopRouter.delete("/cart", shopController.removeFromCart);

shopRouter.post("/order", shopController.makeOrder);

shopRouter.post("/admin/product", adminVerify ,adminController.createProduct);
shopRouter.put("/admin/product/:id", adminVerify ,adminController.updateProduct);
shopRouter.post("/admin/category/add", adminVerify ,adminController.createCategory);

module.exports = shopRouter;