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
  lastName:{
    type:DataTypes.STRING,
    allowNull:true
  },
  userEmail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userPassword: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userPhone:{
    type:DataTypes.STRING,
    allowNull:false
  },
  disableUser:DataTypes.BOOLEAN,
  userGroup: DataTypes.STRING,
  userVendor: DataTypes.STRING,
  userClient: DataTypes.STRING,
  createdDate:{
    type: DataTypes.STRING
  },
  readOnly:DataTypes.BOOLEAN,
    Write:DataTypes.BOOLEAN,
  
    imports :DataTypes.BOOLEAN,
    exports:DataTypes.BOOLEAN,
    userManagement :DataTypes.BOOLEAN,
    reports:DataTypes.BOOLEAN,
  
},{
    tableName: 'Users',
    timestamps:false // Specify your desired table name here
  });

module.exports = Users;
