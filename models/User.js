const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    forename:{
        type:String,
        trim:true,
        required: [true, 'Insert forename']
    },
    surname:{
        type:String,
        trim:true,
        required: [true, 'Insert surname']
    },
    email:{
        type:String,
        trim:true,
        unique: [true, 'Email must be unique'],
        required: [true, 'Insert email']
    },
    type:{
        type:String,
        trim:true,
        required: [true, 'Insert type']
    },
    password:{
        type:String,
        trim:true,
        minlength: [6, 'Password must be atleast 6 characters'],
        required: [true, 'Insert password']
    },
    dob:{
        type:Date,
        required: [true, 'Select date of birth']
    },
    street:{
        type:String,
        required: [true, 'Insert street']
    },
    postcode:{
        type:String,
        required: [true, 'Insert postcode']
    },
    city:{
        type:String,
        required: [true, 'Insert city']
    },
    phone:{
        type:String,
        trim:true,
        required: [true, 'Insert number']
    },
    medicalHistory:{
        type:String,
    },
    appointments:{
        type:String,
    },
    createdAt:{ 
        type:Date,
        default: Date.now
    }
    
});

module.exports = mongoose.model('User', UserSchema);