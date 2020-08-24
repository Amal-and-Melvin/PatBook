const express = require('express');
const router = express.Router();
const {getUsers, getAppointments, deleteUser, getUser, updateUser} = require('../controllers/admins');
const {addUser} = require('../controllers/users');

router
    .route('/type/:id')
    .get(getUsers)
    .post(addUser);

router
    .route('/appointments/:id')
    .get(getAppointments)

router
    .route('/:id')
    .put(updateUser)
    .get(getUser)
    .delete(deleteUser);
module.exports = router;
