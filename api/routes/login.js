
// loginRoutes.js
const express = require('express');
const router = express.Router();

const signupControllers = require("../controllers/login")

router.post("/login", signupControllers.login)


module.exports = router;
