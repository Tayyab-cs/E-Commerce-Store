export default (sequelize, DataTypes) => {
  var Address = sequelize.define(
    "Address",
    {
      houseNo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      streetNo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      area: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      postalCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      customerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Customer",
          key: "id",
        },
      },
    },
    {
      paranoid: true, // used for soft delete...
      freezeTableName: true, // used to display table name same a defined...
    }
  );

  // <------------😉------------> Association one to one Address-to-Customer <------------😉------------>
  Address.associate = function (models) {
    Address.belongsTo(models.Customer, { foreignKey: "customerId" });
  };

  return Address;
};
