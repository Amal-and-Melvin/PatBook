import React, { useContext } from "react";
import { Link } from "react-router-dom";
import GlobalProvider from './../context/GlobalState';
import { ReactComponent as MainImg } from '../3.svg';

export const Home = () => {
    const { userData } = useContext(GlobalProvider);
    return (
        <div className="home">
          
          {userData.user? (
            <h2>Welcome {userData.user.forename}</h2>
          ) : (
            <>
                <MainImg className="homeImg"/>
              <div className="title">
                <h1>PatBook</h1>
                <Link to="/login" className="btn">Log in</Link>
              </div>
            </>
          )}
        </div>
    );
}
