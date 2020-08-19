import React, { useContext } from "react";
import { Link } from "react-router-dom";
import GlobalProvider from './../context/GlobalState';

export const Home = () => {
    const { userData } = useContext(GlobalProvider);
    return (
        <div className="page">
          {userData.user ? (
            <h1>Welcome {userData.user.forename}</h1>
          ) : (
            <>
              <h2>You are not logged in</h2>
              <Link to="/login">Log in</Link>
            </>
          )}
        </div>
    );
}
