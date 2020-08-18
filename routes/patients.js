const express = require('express');
const router = express.Router();
const {createAppointment, getAppointments} = require('../controllers/appointments');

router
    .route('/appointment')
    .post(createAppointment)
    .get(getAppointments);
module.exports = router;
