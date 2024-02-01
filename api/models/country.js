// models/countryCode.js
const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const nemo_country = sequelize.define('nemo_country', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    code: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    country_code: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone_code: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},{timestamps:false,    tableName: 'nemo_country',
});

module.exports = nemo_country;
