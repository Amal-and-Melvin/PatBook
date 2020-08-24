const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    date:{
        type:Date,
        required: [true, 'Select Date']
    },
    patient:[{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    slot:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Slot' }],
    doctor:[{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    time:{
        type:String,
        required: [true, 'Time required']
    },
    createdAt:{ 
        type:Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Appointment', appointmentSchema);