// File: Document.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Document = sequelize.define('Document', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    documentType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    hideExpiryDate: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
}, {
    tableName: 'documents',
    timestamps: false,
});

module.exports = Document;
