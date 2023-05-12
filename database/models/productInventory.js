export default (sequelize, DataTypes) => {
  const productInventory = sequelize.define(
    "productInventory",
    {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
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

  // <--------------------------> Association one to one inventory-to-products <------------😉------------>
  productInventory.associate = function (models) {
    productInventory.belongsTo(models.Products, {
      as: "product",
      foreignKey: "productId",
    });
  };

  return productInventory;
};
