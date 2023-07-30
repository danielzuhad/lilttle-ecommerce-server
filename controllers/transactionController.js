const { randomOrderNumber } = require("../helpers/utils");
const {
  Transaction,
  Transaction_Detail,
  Product,
  sequelize,
} = require("../models");

class TransactionController {
  async getAll(req, res, next) {
    try {
      const data = await Transaction_Detail.findAll({});
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  async getById(req, res, next) {
    const { id } = req.params;

    try {
      const transactionId = await Transaction_Detail.findOne({
        where: {
          id,
        },
      });

      if (!transactionId) {
        return res.status(404).json({ error: "Id not Found" });
      }

      res.status(200).json(transactionId);
    } catch (err) {
      next(err);
    }
  }

  async checkout(req, res, next) {
    const { total_price, paid_amount, products } = req.body;
    const no_order = randomOrderNumber();
    const t = await sequelize.transaction();

    try {
      const createCheckout = await Transaction.create(
        {
          total_price,
          paid_amount,
          no_order,
        },
        { transaction: t }
      );

      const transactionDetails = [];

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

        const transactionDetail = await Transaction_Detail.create(
          {
            id_product: id,
            no_order: createCheckout.no_order,
            quantity,
            stock_product: updatedStock,
          },
          { transaction: t }
        );

        transactionDetails.push(transactionDetail);
      }

      await t.commit();

      res.status(201).json({ createCheckout, transactionDetails });
    } catch (err) {
      await t.rollback();
      next(err);
    }
  }
}

module.exports = new TransactionController();
