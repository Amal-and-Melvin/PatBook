const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//@desc get all patients
exports.getUsers = async(req, res, next) =>{
    try{
        const users = await User.find({type: req.params.id });

        return res.status(200).json({users})
    }catch{
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}

exports.getUser = async(req, res, next) =>{
    try{
        const user = await User.findById(req.params.id);
        return res.status(200).json({user})
    }catch{
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}

//@desc delete user
exports.deleteUser = async (req, res, next) =>{
    try {
        const user = await User.findById(req.params.id);
        if(!user){
            return res.status(404).json({
                success:false,
                error: 'No user found'
            });
        }

        await user.remove();

        return res.status(200).json({
            success:true,
            data: {}
        })
    } catch (err) {
        return res.status(500).json({
            success:false,
            error: 'Server Error'
        });
    }
}


exports.updateUser = async (req, res, next) =>{
 
    try {
        const user = await User.findByIdAndUpdate(req.params.id, {$set: req.body});
        
        return res.status(200).json({
            success:true,
            data: user
        })
    } catch (err) {
        return res.status(500).json({
            success:false,
            error: 'Server Error'
        });
    }
}


