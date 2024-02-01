// File: Vsl.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Vsl = sequelize.define('Vsl', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    vesselName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    vesselType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    company: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    imoNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    vesselFlag: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'vsls',
    timestamps: false,
});

module.exports = Vsl;
