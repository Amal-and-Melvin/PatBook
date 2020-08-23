import React, { useContext } from "react";
import { NavLink } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import GlobalProvider from '../../context/GlobalState';

export const AuthOptions = () => {
    const history = useHistory();
    const { userData, setUserData } = useContext(GlobalProvider);
    
    const logout = () => {
        setUserData({
          token: undefined,
          user: undefined,
        });
        localStorage.setItem("auth-token", "");
        history.push(`/`);
    };

    return (
        <>
        {userData.user ? (
            <>
                <NavLink activeClassName="active" to="/appointments">Appointments</NavLink>
                {userData.user.type === "admin" &&
                    <>
                    <NavLink activeClassName="active" to="/patients">Patients</NavLink>
                    <NavLink activeClassName="active" to="/doctors">Doctors</NavLink>
                    </>
                }
                <button onClick={logout}>Log out</button>
            </>
        ) : (
            <>
                <NavLink activeClassName="active" to="/login">Login</NavLink>
                <NavLink activeClassName="active" to="/register">Register</NavLink>
            </>
         )}
        </>
    )
}
