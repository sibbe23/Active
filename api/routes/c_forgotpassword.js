const express = require('express');
const resetpasswordController = require('../controllers/c_forgotpassword');
const router = express.Router();

router.get('/resetpassword/:id', resetpasswordController.resetpassword);
router.post('/updatepassword/:id', resetpasswordController.updatepassword);
router.post('/forgotpassword', resetpasswordController.forgotpassword);

module.exports = router;
