const express = require('express');
const router = express.Router();
const {getUsers, deleteUser, getUser, updateUser, getAppointments, ScanUser} = require('../controllers/admins');
const {addUser} = require('../controllers/users');

router
    .route('/type/:id')
    .get(getUsers)
    .post(addUser);

router
    .route('/appointments/:id')
    .get(getAppointments);

router
    .route('/scan/:id')
    .get(ScanUser)

router
    .route('/:id')
    .put(updateUser)
    .get(getUser)
    .delete(deleteUser);
module.exports = router;
