const express = require('express');

//controller functions

const { logIn, signUp , getAllUsers} = require('../controllers/userController');

const router = express.Router();

router.post('/login', logIn);
router.post('/signup', signUp);
router.get('/', getAllUsers);

module.exports = router;