// File: PortAgent.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const PortAgent = sequelize.define('PortAgent', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    portAgentName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    contactPerson: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
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
    country: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'port_agents',
    timestamps: false,
});

module.exports = PortAgent;
