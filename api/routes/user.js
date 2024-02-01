
// loginRoutes.js
const express = require('express');
const router = express.Router();

const userControllers = require("../controllers/user")

router.post("/create-user", userControllers.create_user)
router.post("/edit-user", userControllers.edit_user)
router.post("/search",userControllers.search)

module.exports = router;
