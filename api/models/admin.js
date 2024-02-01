const Sequelize = require('sequelize')
const sequelize = require("../util/database")

const User = sequelize.define("user", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    user_id:{
        type:Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    }
});

module.exports = User