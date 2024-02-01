const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const Rank = sequelize.define('Rank', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    rank: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rankOrder: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'Rank',
    timestamps: false,
});

module.exports = Rank;
