export default (sequelize, DataTypes) => {
  var Images = sequelize.define(
    "Images",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      productId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Products",
          key: "id",
        },
      },
    },
    { freezeTableName: true } // used to display table name same a defined.
  );

  // <--------------------------> Association one to one images-to-products <------------😉------------>
  Images.associate = function (models) {
    Images.belongsTo(models.Products, { foreignKey: productId });
  };

  return Images;
};
