const express = require('express');
const router = express.Router();
const {checkLogin, loginUser, addUser } = require('../controllers/users');

router
    .route('/register')
    .post(addUser);

router
    .route('/login')
    .post(loginUser);

router
    .route('/checklogin')
    .post(checkLogin);
module.exports = router;
