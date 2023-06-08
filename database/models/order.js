export default (sequelize, DataTypes) => {
  const Order = sequelize.define(
    'Order',
    {
      totalAmount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      customerId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Customer',
          key: 'id',
        },
      },
    },
    {
      paranoid: true, // used for soft delete...
      freezeTableName: true, // used to display table name same a defined...
    },
  );

  // <-------😉-------> Association one to one order-to-customer <-------😉------->
  Order.associate = (models) => {
    Order.belongsTo(models.Customer, {
      foreignKey: 'customerId',
    });
  };

  // <-----😉----> Association many to one order-to-product-through-orderedProduct <-----😉----->
  Order.associate = (models) => {
    Order.belongsToMany(models.Products, { through: 'OrderedProduct' });
  };

  return Order;
};
