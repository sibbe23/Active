
// loginRoutes.js
const express = require('express');
const router = express.Router();

const companyControllers = require("../controllers/company")

router.post("/create-company", companyControllers.add_company)
router.get("/view-company", companyControllers.getAllCompany)


module.exports = router;
