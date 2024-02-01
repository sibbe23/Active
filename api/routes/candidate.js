
// loginRoutes.js
const express = require('express');
const router = express.Router();

const candidateControllers = require("../controllers/candidate")

router.post("/add-candidate", candidateControllers.add_candidate)
router.get("/view-candidate", candidateControllers.getAllCandidates)


module.exports = router;
