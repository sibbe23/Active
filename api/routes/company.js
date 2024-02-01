
// loginRoutes.js
const express = require('express');
const router = express.Router();
const userAuthentication=require('../middleware/auth');

const companyControllers = require("../controllers/company")

router.post("/create-company",userAuthentication.authenticate,  companyControllers.add_company)
router.get("/view-company", userAuthentication.authenticate,companyControllers.getAllCompany)
// router.get("/view-companys", userAuthentication.authenticate,companyControllers.paginated_company)
// router.get("/total-pages", userAuthentication.authenticate,companyControllers.total_pages)

router.delete('/delete-company/:id',userAuthentication.authenticate, companyControllers.delete_company);
router.put('/update-company/:id',userAuthentication.authenticate, companyControllers.update_company);
// router.get('/get-company/:id', companyControllers._company);


module.exports = router;
