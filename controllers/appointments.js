const User = require('../models/User');
const Appointment = require('../models/Appointment');
const Slot = require('../models/Slot');


//@desc get all appointments
exports.getAppointments = async(req, res, next) =>{
    try {
        if(req.user){
            const currentUser = await User.findOne({_id: req.user});
            var appointments = [];
            if (currentUser.type == 'patient'){
                appointments = await Appointment.find({patient: req.user});
            }else if(currentUser.type == 'doctor'){
                appointments = await Appointment.find({doctor: req.user});
            }
            console.log(appointments) 
            return res.status(200).json({appointments})    
        }
    }catch(err) {
        return res.status(500).json({
            success: false,
            error: err
        })
    }
}




//@desc create appointments
exports.createAppointment = async(req, res, next) =>{
    
    function formatDate(date) {
        var res = date.slice(0, 10);
        return res;
      }

    const getDoctor = (doctors) => {
        const r = Math.floor(Math.random() * doctors.length);
        const selectedDoctor = doctors[r]._id;
        doctors.splice(r, 1);
        return selectedDoctor;
    }

    try{
        const appointment = req.body;

        if (!appointment.date || !appointment.time)
            return res.status(404).json({success:false, error: 'Not all fields have been entered.'});
        //patients can only make appointments for themselves
        if(req.user){
            const currentUser = await User.findOne({_id: req.user});
            if (currentUser.type == 'patient'){
                appointment.patient = currentUser._id
            }
        }
        appointment.date = formatDate(appointment.date);

        const currentSlot = await Slot.findOne({time: appointment.time, date: appointment.date});
        var selectedDoctor = [];
        var newSlot =[];

        if (!currentSlot){
            console.log("NOOOOo");
            //if the slot does not exist then make one
            const doctors = await User.find({type: "doctor" }).distinct( "_id" );
            selectedDoctor = getDoctor(doctors);
            //console.log(selectedDoctor)
            const slot = {
                "date": appointment.date,
                "time": appointment.time,
                "availableDoctors": doctors
            };
            newSlot = await Slot.create(slot);
            //console.log(newSlot) 
        }else {
            console.log("YEYEY");
            const availableDoctors = currentSlot.availableDoctors;
            if (availableDoctors.length !== 0){
                selectedDoctor = getDoctor(availableDoctors);
                //console.log(selectedDoctor) 
                newSlot = await Slot.findOneAndUpdate({"_id": currentSlot._id}, {$set:{"availableDoctors": availableDoctors}}, { new: true,useFindAndModify: false});
            }else{
                return res.status(400).json({
                    success:false,
                    error: 'No doctors available for this time slot. Please choose another slot.'
                })
            }
            
        }
        appointment.slot = newSlot._id;
        appointment.doctor = selectedDoctor._id;
        newAppointment = await Appointment.create(appointment);
        console.log(newAppointment);
    }catch(err){
        return res.status(500).json({
            success: false,
            error: err
        })
    }
}
