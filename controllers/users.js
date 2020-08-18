const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//@desc add users
exports.addUser = async(req, res, next) =>{
    try {
        const user = req.body;
        var messages = [];
        //validate
        if (user.password !== user.passwordCheck){
            return res.status(400).json({
                success:false,
                error: 'Passwords do not match'
            })
        }
        if (user.password.length < 6){
            return res.status(400).json({
                success:false,
                error: 'Passwords must be atleast 6 characters'
            })
        }
        
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, salt);

        //prevent anyone whos not an admin from making any type of user
        if(req.user){
            const currentUser = await User.findOne({_id: req.user});
            if (currentUser.type !== 'admin')
                user.type = 'patient'
        }else 
            user.type = 'patient'


        //creat user
        await User.create(req.body);
        return res.status(201).json({
            success:true,
            data: user
        })    
    } catch (err) {
        var messages = [];
        if (err.name === "ValidationError"){
            //all errors in an array
            messages = Object.values(err.errors).map(val => val.message);
        }

        if (err.code === 11000) {
            //add to array
            messages.push('Email must be unique')
        }

        if (messages.length == 0){
            return res.status(500).json({
                success:false,
                error: err
            })
        }else {
            return res.status(400).json({
                success:false,
                error: messages
            })
            
        }         
    }

}


//@desc add users
exports.loginUser = async(req, res, next) =>{
    try {
        const user = req.body;
        //validate
        
        if (!user.email || !user.password)
            return res.status(404).json({success:false, error: 'Not all fields have been entered.'});
        
        const checkUser = await User.findOne({email: user.email});
        if (!checkUser)
            return res.status(400).json({success:false, error: 'Email or password incorrect.'});
        
        const isMatch = await bcrypt.compare(user.password, checkUser.password)
        if (!isMatch) return res.status(400).json({success:false, error: 'Email or password incorrect.'});
        
        const token = jwt.sign({id: checkUser._id}, process.env.JWT_SECRET);
        return res.status(201).json({
            success:true,
            data: {
                token:token,
                user: checkUser
            }
        })  
    } catch (err) {
        return res.status(500).json({
            success:false,
            error: err
        })
    }

}



exports.checkLogin = async(req, res, next) =>{
    try {
      const token = req.header("x-auth-token");
      if (!token) return res.json(false);
  
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      if (!verified) return res.json(false);
  
      const user = await User.findById(verified.id);
      if (!user) return res.json(false);
  
      return res.json(true);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
}