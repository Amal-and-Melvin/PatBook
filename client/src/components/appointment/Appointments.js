import React, { useContext, useState, useEffect } from "react";
import Axios from "axios";
import GlobalProvider from '../../context/GlobalState';
import { Appointment } from './Appointment';

export const Appointments = (user) => {
    const { userData } = useContext(GlobalProvider);
    const [appointments, setAppointments] = useState();

    useEffect(() => {
      const getAppointments = async () => {
        const AllAppointments = await Axios.get("/patients/appointment", {
            headers: { "x-auth-token": userData.token },
        });
        setAppointments(AllAppointments.data.appointments);
        console.log(AllAppointments.data.appointments);
      };
      if(userData.user !== undefined){
        getAppointments();
      }
    },[userData]);
    
    return (
      <div className="page">
        {appointments ? (
           appointments.map(appointment => (
            <Appointment key={appointment._id} appointment={appointment}/>
        ))
        ) : (
          <>
     
          </>
        )}
      </div>
    );
  }
