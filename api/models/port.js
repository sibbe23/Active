// File: Port.js
const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const Port = sequelize.define('Port', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    portName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'ports',
    timestamps: false,
});

module.exports = Port;
