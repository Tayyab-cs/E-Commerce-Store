export default (sequelize, DataTypes) => {
  var Order = sequelize.define(
    "Order",
    {
      totalAmount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      customerId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Customer",
          key: "id",
        },
      },
    },
    { freezeTableName: true } // used to display table name same a defined.
  );

  // <------------😉------------> Association one to one order-to-customer <------------😉------------>
  Order.associate = function (models) {
    Order.belongsTo(models.Customer, {
      foreignKey: "customerId",
    });
  };

  // <------------😉------------> Association many to one order-to-product-through-orderedProduct <------------😉------------>
  Order.associate = function (models) {
    Order.belongsToMany(models.Products, { through: "OrderedProduct" });
  };

  return Order;
};
