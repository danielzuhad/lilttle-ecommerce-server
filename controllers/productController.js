const { Product } = require("../models");

class ProductController {
  async getProduct(req, res) {
    try {
      const products = await Product.findAll();

      res.status(201).json(products);
    } catch (error) {
      console.error("Error in getProduct controller:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async addProduct(req, res) {
    try {
      const { name, price, stock, img_product } = req.body;
      const createdProduct = await Product.create({
        name,
        price,
        stock,
        img_product,
      });
      res.status(201).json(createdProduct);
    } catch (error) {
      console.error("Failed to add product:", error);
      res.status(500).json({ error: "Failed to add product" });
    }
  }
}

module.exports = new ProductController();
