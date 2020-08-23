import React from 'react'

export const Appointment = ({ appointment }) => {
    return (
        <div>
            <h1>{appointment.date}</h1>
            <h1>{appointment.time}</h1>
            <h1>{appointment.patient}</h1>
            <h1>{appointment.doctor}</h1>
        </div>
    )
}
