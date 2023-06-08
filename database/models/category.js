export default (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'Category',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      parentId: {
        type: DataTypes.INTEGER, // self-referencing foreign-key.
      },
    },
    {
      paranoid: true, // used for soft delete...
      freezeTableName: true, // used to display table name same a defined...
    },
  );

  // <------😉-------> Association self-referencing <------😉------->
  Category.hasMany(Category, { as: 'subcategories', foreignKey: 'parentId' });
  Category.belongsTo(Category, { as: 'parent', foreignKey: 'parentId' });

  // <------😉-------> Association one to many subCategories-to-products <------😉------->
  Category.associate = (models) => {
    Category.hasMany(models.Products);
  };

  return Category;
};
