const express = require('express');
const shopRouter = express.Router();
const adminController = require("../controllers/admin.controller");
const adminVerify = require('../middlewares/admin');
const shopController = require("../controllers/shop.controller");

shopRouter.post("/cart", shopController.addToCart);
shopRouter.put("/cart", shopController.removeFromCart);
shopRouter.post("/order", shopController.makeOrder);

shopRouter.post("/admin/add", adminVerify ,adminController.createProduct);
shopRouter.put("/admin/update/:id", adminVerify ,adminController.updateProduct);

module.exports = shopRouter;