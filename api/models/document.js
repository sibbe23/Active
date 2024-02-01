// File: Document.js
const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');

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
        allowNull: true,
    },
}, {
    tableName: 'documents',
    timestamps: false,
});

module.exports = Document;
