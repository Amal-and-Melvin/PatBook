import React, {useState, useContext } from 'react';
import ErrorNotice from "../ErrorNotice";
import GlobalProvider from '../../context/GlobalState';
import Axios from "axios";

import { Appointments } from './Appointments';

export const CreateAppointment = () => {
    const [error, setError] = useState();
    const { userData } = useContext(GlobalProvider);
    const [appointment, setAppointment] = useState({
        date: '',
        patient: '',
        slot: '',
        doctor: '',
        time: '',
        createdAt: Date.now()

      });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await Axios.post(
                "/patients/appointment",
                appointment,
                { headers: { "x-auth-token": userData.token } }
              );
        } catch (err) {
            console.log(err.response.data.error);
        }
    }

      const onChange = (e) => {
        setAppointment({ ...appointment, [e.target.name]: e.target.value })
      }
    
      const onFocus  = (e) => {
        e.currentTarget.type = "date";
      }
    
      const onBlur = (e) => {
        e.currentTarget.type = "text";
        e.currentTarget.placeholder = "Select Date";
      }
      
    return (
        <div>
            {error && (
            <ErrorNotice message={error} clearError={() => setError(undefined)} />
            )}
            <form onSubmit={onSubmit} name="time" value={appointment.time}>
                <input type="text" value={appointment.date} onChange={onChange} name="date" onFocus = {onFocus} onBlur={onBlur} placeholder="Select Date"/>
                <select onChange={onChange} name="time">
                    <option value="">Select Time</option>
                    <option value="0900">09:00am</option>
                    <option value="0930">09:30am</option>
                    <option value="1000">10:00am</option>
                    <option value="1030">10:30am</option>
                    <option value="1100">11:00am</option>
                    <option value="1130">11:30am</option>
                    <option value="1300">13:00pm</option>
                    <option value="1330">13:30pm</option>
                    <option value="1400">14:00pm</option>
                    <option value="1430">14:30pm</option>
                    <option value="1500">15:00pm</option>
                    <option value="1530">15:30pm</option>
                    <option value="1600">16:00pm</option>
                    <option value="1630">16:30pm</option>
                </select><br />
                <input type="submit" value="Request Appointment" />
            </form>
            <Appointments user={userData.user} />
        </div>
    )
}
