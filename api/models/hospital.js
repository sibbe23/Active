// File: Hospital.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Hospital = sequelize.define('Hospital', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    hospitalName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    doctorName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    doctorAddress: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    doctorCity: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    doctorState: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    doctorPhone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    doctorEmail: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    doctorUpload: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'hospitals',
    timestamps: false,
});

module.exports = Hospital;
