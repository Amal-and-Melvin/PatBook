import React, { useContext } from "react";
import { Link } from "react-router-dom";
import GlobalProvider from './../context/GlobalState';

export const Home = () => {
    const { userData } = useContext(GlobalProvider);
    return (
        <div className="page">
          <h1>PatBook</h1><hr></hr>
          {userData.user ? (
            <h2>Welcome {userData.user.forename}</h2>
          ) : (
            <>
              <h2>You are not logged in</h2>
              <Link to="/login" className="btn">Log in</Link>
            </>
          )}
        </div>
    );
}
