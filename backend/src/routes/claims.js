const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const claimController = require('../controllers/claimController');

// @route   POST api/claims/submit
// @desc    Submit a new claim
// @access  Private
router.post('/submit', auth, claimController.submitClaim);

// @route   GET api/claims
// @desc    Get all claims for logged in user
// @access  Private
router.get('/', auth, claimController.getClaims);

// @route   GET api/claims/all
// @desc    Get all claims (Admin/Validator)
// @access  Private (Needs Role Check in real app)
router.get('/all', auth, claimController.getAllClaims);

module.exports = router;
