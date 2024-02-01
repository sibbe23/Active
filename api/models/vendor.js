// File: Vendor.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Vendor = sequelize.define('Vendor', {
    
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },vendorName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    vendorAddress: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'vendors',
    timestamps: false,
});

module.exports = Vendor;
