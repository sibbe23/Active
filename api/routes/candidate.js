
// loginRoutes.js
const express = require('express');
const router = express.Router();
const userAuthentication = require("../middleware/auth")

const candidateControllers = require("../controllers/candidate")

router.post("/add-candidate",userAuthentication.authenticate, candidateControllers.add_candidate)
router.get("/view-candidate",userAuthentication.authenticate, candidateControllers.getAllCandidates)
router.get("/get-candidate/:id",userAuthentication.authenticate, candidateControllers.get_candidate)
router.put("/update-candidate/:id",userAuthentication.authenticate, candidateControllers.edit_candidate)
router.delete("/delete-candidate/:id",userAuthentication.authenticate, candidateControllers.delete_candidate)


router.post('/kin-details/:id',userAuthentication.authenticate, candidateControllers.add_kindetails);
router.get('/get-nkd-details/:id',userAuthentication.authenticate, candidateControllers.get_NKDDetails);
router.put('/update-nkd/:id',userAuthentication.authenticate, candidateControllers.update_NKDDetails);

router.post('/hospital-details/:id',userAuthentication.authenticate, candidateControllers.add_hospitaldetails);
router.get('/get-hospital-details/:id',userAuthentication.authenticate, candidateControllers.get_HospitalDetails);
router.put('/update-c-hospital/:id',userAuthentication.authenticate, candidateControllers.update_HospitalDetails);


router.post('/travel-details/:id',userAuthentication.authenticate, candidateControllers.add_traveldetails);
router.get('/get-travel-details/:id',userAuthentication.authenticate, candidateControllers.get_TravelDetails);
router.put('/update-travel/:id',userAuthentication.authenticate, candidateControllers.update_TravelDetails);

router.post('/bank-details/:id',userAuthentication.authenticate, candidateControllers.add_bankdetails);
router.get('/get-bank-details/:id',userAuthentication.authenticate, candidateControllers.get_BankDetails);
router.put('/update-bank-details/:id',userAuthentication.authenticate, candidateControllers.update_BankDetails);


router.post('/document-details/:id',userAuthentication.authenticate, candidateControllers.add_documentdetails);
router.get('/get-document-details/:id',userAuthentication.authenticate, candidateControllers.get_documentdetails);
router.put('/update-documents/:id',userAuthentication.authenticate, candidateControllers.update_documentdetails);

router.post('/contract-details/:id',userAuthentication.authenticate, candidateControllers.add_contractdetails);
router.get('/get-contract-details/:id',userAuthentication.authenticate, candidateControllers.get_contractdetails);
router.put('/update-contract-details/:id',userAuthentication.authenticate, candidateControllers.update_contractdetails);

router.post('/discussion-plus-detail/:id',userAuthentication.authenticate, candidateControllers.add_discussionplusdetails);

router.get('/get-discussionplus-details/:id',userAuthentication.authenticate, candidateControllers.get_documentdetails);

router.post("/login", candidateControllers.login)


router.get("/get-c-candidate/:id", candidateControllers.get_candidate)
router.put("/update-c-candidate/:id", candidateControllers.edit_candidate)


router.delete('/delete-nkd/:id', userAuthentication.authenticate, candidateControllers.delete_NKD);
router.delete('/delete-hospital/:id', userAuthentication.authenticate, candidateControllers.delete_Hospital);
router.delete('/delete-travel/:id', userAuthentication.authenticate, candidateControllers.delete_Travel);
router.delete('/delete-bank/:id', userAuthentication.authenticate, candidateControllers.delete_Bank);
router.delete('/delete-document/:id', userAuthentication.authenticate, candidateControllers.delete_Document);
router.delete('/delete-contract/:id', userAuthentication.authenticate, candidateControllers.delete_contract);
router.delete('/delete-discussionplus/:id', userAuthentication.authenticate, candidateControllers.delete_discussionplus);


module.exports = router;
