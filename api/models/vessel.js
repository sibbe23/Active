// File: Vessel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Vessel = sequelize.define('Vessel', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    vesselName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'vessels',
    timestamps: false,
});

module.exports = Vessel;
