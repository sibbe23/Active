const Sequelize=require('sequelize');

const sequelize=require('../util/database');


const cForgotpassword=sequelize.define('cForgotpassword',{

    id:{
        type:Sequelize.UUID,
        allowNull:false,
        primaryKey:true,
    },
    isactive:Sequelize.BOOLEAN
});

module.exports=cForgotpassword;