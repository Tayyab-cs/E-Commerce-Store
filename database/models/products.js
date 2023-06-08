export default (sequelize, DataTypes) => {
  const Products = sequelize.define(
    'Products',
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
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Category',
          key: 'id',
        },
      },
    },
    {
      paranoid: true, // used for soft delete...
      freezeTableName: true, // used to display table name same a defined...
    },
  );

  // <-------😉-------> Association one to one products-to-category <-------😉------->
  Products.associate = (models) => {
    Products.belongsTo(models.Category);
  };

  // <-------😉-------> Association one to Many products-to-images <-------😉------->
  Products.associate = (models) => {
    Products.hasMany(models.Images);
  };

  // <----😉----> Association many to one products-to-order-through-orderedProduct <----😉---->
  Products.associate = (models) => {
    Products.belongsToMany(models.Order, { through: 'OrderedProduct' });
  };

  return Products;
};
