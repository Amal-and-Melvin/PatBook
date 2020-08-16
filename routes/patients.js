const express = require('express');
const router = express.Router();
const {getUsers, loginUser, addUser} = require('../controllers/users');

router
    .route('/register')
    .post(addUser);

router
    .route('/login')
    .post(loginUser);


module.exports = router;
