// File: Experience.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Experience = sequelize.define('Experience', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    experience: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'experiences',
    timestamps: false,
});

module.exports = Experience;
