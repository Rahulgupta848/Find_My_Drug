const express = require('express');
const { signUp ,signIn, fetchUser} = require('../controller/authController');
const { auth } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/signup',signUp);
router.post('/signin',signIn);
router.get('/fetchuser',auth,fetchUser);

module.exports = router;
