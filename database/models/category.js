export default (sequelize, DataTypes) => {
  var Category = sequelize.define(
    "Category",
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
    { freezeTableName: true }
  );

  // <--------------------------> Association self-referencing <------------😉------------>
  Category.hasMany(Category, { as: "subcategories", foreignKey: "parentId" });
  Category.belongsTo(Category, { as: "parent", foreignKey: "parentId" });

  // <--------------------------> Association one to many subCategories-to-products <------------😉------------>
  Category.associate = function (models) {
    Category.hasMany(models.Products);
  };

  return Category;
};