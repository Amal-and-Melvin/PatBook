const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
    date:{
        type:Date,
        required: [true, 'Select Date']
    },
    time:{
        type:String,
        trim:true,
        required: [true, 'Select Time']
    },
    availableDoctors:[{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdAt:{ 
        type:Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Slot', slotSchema);