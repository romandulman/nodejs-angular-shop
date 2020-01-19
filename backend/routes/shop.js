const express = require('express');
const shopRouter = express.Router();
const adminController = require("../controllers/admin.controller");
const adminVerify = require('../middlewares/admin');
const shopController = require("../controllers/shop.controller");

shopRouter.get("/products", shopController.getAllProducts);
shopRouter.get("/products/:id", shopController.getProductsById);

shopRouter.get("/cart", shopController.getUserCartItems);
shopRouter.post("/cart", shopController.addToCart);
shopRouter.delete("/cart/:id", shopController.removeFromCart);

shopRouter.post("/cart/checkout", shopController.checkOutOrder);

shopRouter.post("/admin/product", adminVerify ,adminController.createProduct);
shopRouter.put("/admin/product/:id", adminVerify ,adminController.updateProduct);
shopRouter.post("/admin/category", adminVerify ,adminController.createCategory);

module.exports = shopRouter;