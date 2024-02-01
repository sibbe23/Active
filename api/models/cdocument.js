// File: Grade.js
const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const cDocument = sequelize.define('cDocument', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    document:{
        type:DataTypes.STRING
    },
    document_number:{
        type:DataTypes.STRING
    },
    issue_date:{
        type:DataTypes.DATE
    },
    issue_place:{
        type:DataTypes.STRING
    },
    document_files:{
        type:DataTypes.STRING
    },
    stcw:{
        type:DataTypes.STRING
    }
    // candidate = models.ForeignKey(Candidate,models.CASCADE)
}, {
    tableName: 'cdocuments',
    timestamps: false,
});

module.exports = cDocument;
