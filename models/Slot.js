const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
    time:{
        type:String,
        trim:true,
        required: [true, 'Select Time']
    },
    doctorsAvailable:{
        type:String,
        trim:true,
        required: [true, 'Available doctors']
    },
    createdAt:{ 
        type:Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Slot', slotSchema);