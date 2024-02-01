// File: Grade.js
const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const Discussion_plus = sequelize.define('Discussion_plus', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    proposed:{
        type:DataTypes.BOOLEAN
    },
    approved:{
        type:DataTypes.BOOLEAN
    },
    joined:{
        type:DataTypes.BOOLEAN
    },
    rejected:{
        type:DataTypes.BOOLEAN
    },
    set_reminder:{
        type:DataTypes.STRING
    },
    special_comments:{
        type:DataTypes.STRING
    },
    ref_check:{
        type:DataTypes.STRING
    }

}, {
    tableName: 'discussionplus',
    timestamps: false,
});

module.exports = Discussion_plus;
