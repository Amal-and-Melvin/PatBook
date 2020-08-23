const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    date:{
        type:Date,
        required: [true, 'Select Date']
    },
    patient:{
        type:String,
        required: [true, 'Patient required']
    },
    slot:{
        type:String,
        required: [true, 'Slot required']
    },
    doctor:{
        type:String,
        required: [true, 'Doctor required']
    },
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