export default (sequelize, DataTypes) => {
  var Customer = sequelize.define(
    "Customer",
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
        validate: {
          len: [6, 15], // check password length is between 6 and 15 characters
        },
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      postalNode: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { freezeTableName: true } // used to display table name same a defined.
  );
  return Customer;
};
