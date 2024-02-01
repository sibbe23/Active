const express = require("express")
require('dotenv').config()
const PORT = process.env.PORT || 3000;
const app = express()
const cors = require("cors")
const bodyParser=require('body-parser');
app.use(bodyParser.json({extended:false}));
const sequelize=require("./util/database")
const loginRoutes =require('./routes/login')
const companyRoutes=require("./routes/company")
const candidateRoutes = require("./routes/candidate")
const userRoutes = require("./routes/user")
app.use(cors({origin:"*"}))
app.use("/admin",loginRoutes)
app.use("/company",companyRoutes);
app.use("/candidate",candidateRoutes)
app.use("/user",userRoutes)
sequelize.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error syncing Sequelize:', error);
    });