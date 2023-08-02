const { randomOrderNumber } = require("../helpers/utils");
const {
  Transaction,
  Transaction_Detail,
  Product,
  sequelize,
} = require("../models");

class TransactionController {
  async getLastCheckout(req, res, next) {
    try {
      const lastCheckout = await Transaction_Detail.findOne({
        order: [["createdAt", "DESC"]],
      });

      if (!lastCheckout) {
        return res
          .status(404)
          .json({ error: "No previous checkout data found" });
      }

      const allItemsInLastCheckout = await Transaction_Detail.findAll({
        where: { no_order: lastCheckout.no_order },
      });

      res.status(200).json(allItemsInLastCheckout);
    } catch (err) {
      next(err);
    }
  }

  async checkout(req, res, next) {
    const { total_price, paid_amount, products } = req.body;
    const no_order = randomOrderNumber();

    const t = await sequelize.transaction();

    try {
      for (const product of products) {
        const { id, quantity } = product;

        const foundProduct = await Product.findByPk(id, { transaction: t });

        if (!foundProduct) {
          await t.rollback();
          return res
            .status(404)
            .json({ error: `Product with id ${id} not found` });
        }

        const updatedStock = foundProduct.stock - quantity;

        if (updatedStock < 0) {
          await t.rollback();
          return res
            .status(400)
            .json({ error: `Insufficient stock for product with id ${id}` });
        }

        foundProduct.stock = updatedStock;
        await foundProduct.save({ transaction: t });

        if (total_price > paid_amount) {
          await t.rollback();
          return res
            .status(400)
            .json({ error: "Uang Anda Kurang akwoakwokaow" });
        }

        await Transaction_Detail.create(
          {
            no_order,
            total_price,
            paid_amount,
            id_product: product.id,
            quantity: product.quantity,
          },
          { transaction: t }
        );
      }

      await t.commit();

      res.status(201).json({ message: "Checkout successful" });
    } catch (err) {
      await t.rollback(); // Rollback the transaction in case of an error
      next(err);
    }
  }
}

module.exports = new TransactionController();
