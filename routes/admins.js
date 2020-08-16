const express = require('express');
const router = express.Router();
const {getUsers, deleteUser, updateUser} = require('../controllers/admins');
const {addUser} = require('../controllers/users');

router
    .route('/type/:id')
    .get(getUsers)
    .post(addUser);

router
    .route('/:id')
    .put(updateUser)
    .delete(deleteUser);
module.exports = router;
