export default (sequelize, DataTypes) => {
  var orderDetails = sequelize.define(
    "orderDetails",
    {
      total: {
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

  // <--------------------------> Association one to one <------------😉------------>
  orderDetails.associate = function (models) {
    orderDetails.belongsTo(models.Customer, {
      foreignKey: "customerId",
    });
  };

  return orderDetails;
};
