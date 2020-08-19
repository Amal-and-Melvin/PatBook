import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch, BrowserRouter } from "react-router-dom";
import Axios from "axios";
import './App.css';

import { Nav } from './components/Nav';
import { Home } from './components/Home';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import {CreateAppointment} from './components/appointment/CreateAppointment'
import GlobalProvider from './context/GlobalState';


export default function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await Axios.post(
        "/patients/checklogin",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenRes.data) {
        const userRes = await Axios.get("/patients/checklogin/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <GlobalProvider.Provider value={{userData, setUserData}}>
      <BrowserRouter>
        <Nav/>
        <div className="container">
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <Route path="/appointments" component={CreateAppointment}/>
        </Switch>
        </div>
      </BrowserRouter>
    </GlobalProvider.Provider>
  );
}