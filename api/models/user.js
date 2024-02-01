// models/user.js
const { DataTypes } = require('sequelize');
const sequelize = require('../util/database'); // Assuming you have a file for database configuration

const Users = sequelize.define('Users', {
    
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userEmail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userPassword: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userGroup: DataTypes.STRING,
  userVendor: DataTypes.STRING,
  userClient: DataTypes.STRING,
  disableUser: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
},{
    tableName: 'Nemo_Users', // Specify your desired table name here
  });

module.exports = Users;
