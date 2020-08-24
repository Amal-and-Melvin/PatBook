import React, { useContext } from 'react';
import GlobalProvider from '../../context/GlobalState';

export const Appointment = ({ appointment }) => {
    const { userData } = useContext(GlobalProvider);
    function formatDate(date) {
        var res = date.slice(0, 10);
        return res;
    }

    return (
        <tr>
            <td className="tdMain">{appointment.time}</td>
            <td>{formatDate(appointment.date)}</td>
            {userData.user.type === "patient" ?(
                <td>Dr {appointment.doctor[0].forename} {appointment.doctor[0].surname}</td>
            ): (
                <td>{appointment.patient[0].forename} {appointment.patient[0].surname}</td>
            )}
        </tr>
    )
}
