export default (sequelize, DataTypes) => {
  const OrderedProduct = sequelize.define(
    'OrderedProduct',
    {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      unitPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Order',
          key: 'id',
        },
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Products',
          key: 'id',
        },
      },
    },
    {
      paranoid: true, // used for soft delete...
      freezeTableName: true, // used to display table name same a defined...
    },
  );

  // <-------😉-------> Association one to one orderProduct-to-order <-------😉------->
  OrderedProduct.associate = (models) => {
    OrderedProduct.belongsTo(models.Order, { foreignKey: 'orderId' });
  };

  // <-------😉-------> Association one to one orderProduct-to-products <-------😉------->
  OrderedProduct.associate = (models) => {
    OrderedProduct.belongsTo(models.Product, { foreignKey: 'productId' });
  };

  return OrderedProduct;
};
