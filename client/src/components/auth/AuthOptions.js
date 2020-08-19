import React, { useContext } from "react";
import { NavLink } from 'react-router-dom';
import GlobalProvider from '../../context/GlobalState';
export const AuthOptions = () => {
    const { userData, setUserData } = useContext(GlobalProvider);

    const logout = () => {
        setUserData({
          token: undefined,
          user: undefined,
        });
        localStorage.setItem("auth-token", "");
      };

    return (
        <>
        {userData.user ? (
            <button onClick={logout}>Log out</button>
        ) : (
            <>
                <NavLink activeClassName="active" to="/login">Login</NavLink>
                <NavLink activeClassName="active" to="/register">Register</NavLink>
            </>
         )}
        </>
    )
}
