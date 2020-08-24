import React, { useContext, useState, useEffect } from "react";
import Axios from "axios";
import GlobalProvider from '../../context/GlobalState';
import { Appointment } from './Appointment';

export const Appointments = (user) => {
    const { userData } = useContext(GlobalProvider);
    const [appointments, setAppointments] = useState();

    useEffect(() => {
      const getAppointments = async () => {
        let allAppointments = [];
        if(user.user !== undefined){
          allAppointments = await Axios.get("/admins/appointments/"+user.user, {
            headers: { "x-auth-token": userData.token },
          });
        }else{
          allAppointments = await Axios.get("/patients/appointment", {
            headers: { "x-auth-token": userData.token },
          });
        }
        setAppointments(allAppointments.data.appointments);
      };

      if(userData.user !== undefined){
        getAppointments();
      }
    },[userData, user.user]);
    
    return (
      <div className="page">
        <table>
          <thead>    
            <tr>
              <th>Time</th>
              <th>Data</th>
              {userData.user.type === "patient" ?(
                <th>Doctor</th>
                ): (
                  (userData.user.type === "admin" ?(
                    <>
                    <th>Patient</th>
                    <th>Doctor</th>
                    </>
                  )
                  :<th>Patient</th> )
                  
                )}
            </tr>
          </thead>
          <tbody>
            {appointments && (
              appointments.map(appointment => (
                <Appointment key={appointment._id} appointment={appointment}/>
              ))
            )}
          </tbody>
        </table>
      </div>
    );
  }
