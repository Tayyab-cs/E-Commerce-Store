export default (sequelize, DataTypes) => {
  const Customer = sequelize.define(
    'Customer',
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true, // check if email format is valid
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        // validate: {
        //   len: [4, 10], // check password length is between 4 and 10 characters
        // },
      },
      phone: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      paranoid: true, // used for soft delete...
      freezeTableName: true, // used to display table name same a defined...
    },
  );

  // <-------😉-------> Association one to one customer-to-Address <-------😉------->
  Customer.associate = (models) => {
    Customer.hasOne(models.Address, { foreignKey: 'customerId' });
  };

  // <-------😉-------> Association one to many customer-to-order <-------😉------->
  Customer.associate = (models) => {
    Customer.hasMany(models.Order);
  };

  return Customer;
};
