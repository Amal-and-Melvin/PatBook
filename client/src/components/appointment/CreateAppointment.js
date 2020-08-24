import React, {useState, useContext } from 'react';
import ErrorNotice from "../ErrorNotice";
import { useHistory } from "react-router-dom";
import GlobalProvider from '../../context/GlobalState';
import Axios from "axios";

import { Appointments } from './Appointments';

export const CreateAppointment = (props) => {
  const history = useHistory();
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

  const onSubmit = async (e) => {
    e.preventDefault();
    try{
      if (props.match.params.id){
        appointment.patient = props.match.params.id;
      }
      await Axios.post(
        "/patients/appointment",
        appointment,
        { headers: { "x-auth-token": userData.token } }
      );
      history.push("0");
    } catch (err) {
      console.log(err);
      err.response.data.error && setError(err.response.data.error);  
    } 
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
                  <option value="09:00am">09:00am</option>
                  <option value="09:30am">09:30am</option>
                  <option value="10:00am">10:00am</option>
                  <option value="10:30am">10:30am</option>
                  <option value="11:00am">11:00am</option>
                  <option value="11:30am">11:30am</option>
                  <option value="13:00pm">13:00pm</option>
                  <option value="13:30pm">13:30pm</option>
                  <option value="14:00pm">14:00pm</option>
                  <option value="14:30pm">14:30pm</option>
                  <option value="15:00pm">15:00pm</option>
                  <option value="15:30pm">15:30pm</option>
                  <option value="16:00pm">16:00pm</option>
                  <option value="16:30pm">16:30pm</option>
              </select><br />
              <input type="submit" value="Request Appointment" />
          </form>
          <Appointments user={props.match.params.id} />
      </div>
  )
}
