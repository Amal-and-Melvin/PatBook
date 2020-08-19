const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//@desc add user
exports.addUser = async(req, res, next) =>{
    function checkFields(obj) {
        for (var key in obj) {
          if (obj[key] === "")
            return true;
        }
        return false;
    }

    try {
        const user = req.body;
        //validate
        if (checkFields(user))
            return res.status(400).json({success:false, error: "Not all fields have been entered." });

        if (user.password !== user.passwordCheck)
            return res.status(400).json({success:false,error: 'Passwords do not match'})
        
        if (user.password.length < 6)
            return res.status(400).json({success:false, error: 'Passwords must be atleast 6 characters'})
        

        const existingUser = await User.findOne({ email: user.email });
        if (existingUser)
            return res.status(400).json({success:false, error: "An account with this email already exists." });

        //hash password
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, salt);

        //prevent anyone whos not an admin from making any type of user
        if(req.user){
            const currentUser = await User.findOne({_id: req.user});
            if (currentUser.type !== 'admin')
                user.type = 'patient'
        }else{
            user.type = 'patient'
        } 

        //create user
        await User.create(req.body);
        return res.status(201).json({
            success:true,
            data: user
        })    
    } catch (err) {
        return res.status(400).json({
            success:false,
            error: err
        })     
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
            token:token,
            user: checkUser
            
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

exports.getUser = async (req, res, next) =>{
 
    try {
        const user = await User.findById(req.user);
        
        return res.status(200).json({  
            id: user._id,
            type: user.type,
            forename: user.forename,
            surname:user.surname,
            email: user.email  
        })
    } catch (err) {
        return res.status(500).json({
            success:false,
            error: 'Server Error'
        });
    }
}