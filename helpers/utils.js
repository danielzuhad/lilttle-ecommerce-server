exports.randomOrderNumber = () => {
  const orderNumber = "T-" + Math.floor(Math.random() * 1000);
  return orderNumber;
};
