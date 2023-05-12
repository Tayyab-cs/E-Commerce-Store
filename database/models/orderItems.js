export default (sequelize, DataTypes) => {
  const orderItems = sequelize.define(
    "orderItems",
    {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "orderDetails",
          key: "id",
        },
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Products",
          key: "id",
        },
      },
    },
    { freezeTableName: true } // used to display table name same a defined.
  );

  // <--------------------------> Association one to one <------------😉------------>
  orderItems.associate = function (models) {
    orderItems.belongsTo(models.orderDetails, {
      foreignKey: "orderId",
    });
  };

  return orderItems;
};
