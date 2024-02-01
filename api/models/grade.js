// File: Grade.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Grade = sequelize.define('Grade', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    gradeExp: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'grades',
    timestamps: false,
});

module.exports = Grade;
