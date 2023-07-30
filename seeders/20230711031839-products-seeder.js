"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Products", [
      {
        name: "sari roti rasa coklat",
        price: 5500,
        stock: 99,
        img_product:
          "https://assets.klikindomaret.com/products/20035999/20035999_1.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "sari roti rasa keju",
        price: 5500,
        stock: 199,
        img_product:
          "https://assets.klikindomaret.com/products/20025041/20025041_1.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "sosis kanzler keju",
        price: 9500,
        stock: 90,
        img_product:
          "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//102/MTA-18423687/kanzler_kanzler_singles_keju_sosis_kanzler_single_cheese_65gr_full02_lw8wqcsl.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "fanta orange",
        price: 13500,
        stock: 50,
        img_product:
          "https://images.tokopedia.net/img/cache/700/hDjmkQ/2022/12/6/8164bcd1-ec45-42f1-841c-7ce8043bd162.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "sprite green",
        price: 11500,
        stock: 77,
        img_product:
          "https://assets.klikindomaret.com/products/20065779/20065779_1.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "sprite oldgreen",
        price: 11500,
        stock: 45,
        img_product:
          "https://i.actva.cz/i/1/1/049/50049/600x600/63WwfC_600x600_20146e7277c81e74.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "coca cola",
        price: 7500,
        stock: 55,
        img_product:
          "https://images.tokopedia.net/img/cache/700/hDjmkQ/2021/5/11/5f03447a-8822-4919-a788-ee888b993bee.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
