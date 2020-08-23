const express = require('express');
const router = express.Router();
const {getUsers, deleteUser, getUser, updateUser} = require('../controllers/admins');
const {addUser} = require('../controllers/users');

router
    .route('/type/:id')
    .get(getUsers)
    .post(addUser);

router
    .route('/:id')
    .put(updateUser)
    .get(getUser)
    .delete(deleteUser);
module.exports = router;
