// File: Grade.js
const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const Seaservice  = sequelize.define('Seaservice', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ss_company: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ss_rank: {
        type: DataTypes.STRING,
        allowNull: false,
    },ss_vessel: {
        type: DataTypes.STRING,
        allowNull: false,
    },ss_type: {
        type: DataTypes.STRING,
        allowNull: false,
    },ss_DWT: {
        type: DataTypes.STRING,
        allowNull: false,
    },ss_from: {
        type: DataTypes.STRING,
        allowNull: false,
    },ss_to: {
        type: DataTypes.STRING,
        allowNull: false,
    },ss_reason_for_signoff: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'seaservice',
    timestamps: false,
});

module.exports = Seaservice;
