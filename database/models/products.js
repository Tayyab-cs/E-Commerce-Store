export default (sequelize, DataTypes) => {
  var Products = sequelize.define(
    "Products",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      subCategoryId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Category",
          key: "id",
        },
      },
    },
    { freezeTableName: true } // used to display table name same a defined.
  );

  // <--------------------------> Association one to one products-to-category <------------😉------------>
  Products.associate = function (models) {
    Products.belongsTo(models.Category, { foreignKey: subCategoryId });
  };

  // <--------------------------> Association one to many products-to-inventory <------------😉------------>
  Products.associate = function (models) {
    Products.hasMany(models.productInventory, {
      as: "inventory",
    });
  };

  // <--------------------------> Association one to one <------------😉------------>
  Products.associate = function (models) {
    Products.belongsTo(models.orderItems);
  };

  return Products;
};
