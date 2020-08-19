const express = require('express');
const router = express.Router();
const {createAppointment, getAppointments} = require('../controllers/appointments');
const {checkLogin, getUser } = require('../controllers/users');
router
    .route('/appointment')
    .post(createAppointment)
    .get(getAppointments);


router
    .route('/checklogin')
    .post(checkLogin)
    .get(getUser);
module.exports = router;
