import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch, BrowserRouter } from "react-router-dom";
import Axios from "axios";
import './App.css';

import { Nav } from './components/Nav';
import { Home } from './components/Home';
import { Login } from './components/auth/Login';
import { CreateUser } from './components/auth/CreateUser';

import {CreateAppointment} from './components/appointment/CreateAppointment'

import { UserList } from './components/admin/UserList';
import { EditUser } from './components/admin/EditUser';
import Scanner from './components/admin/Scanner';

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
  }, [userData.token]);

  return (
    <GlobalProvider.Provider value={{userData, setUserData}}>
      <BrowserRouter>
        <Nav/>
        <div className="container">
        <Switch>
          <Route exact path="/" component={Home}/>
          {userData.user ? (
            <>
            <Route path="/appointments" component={CreateAppointment}/>
            <Route path='/patients'render={(props) => (<UserList {...props} type={"patient"} />)}/>
            <Route path='/doctors'render={(props) => (<UserList {...props} type={"doctor"} />)}/>
            <Route path="/scanner" component={Scanner} />
            <Route path="/user/:id" component={EditUser} />
            <Route path="/appointment/:id" component={CreateAppointment} />
            </>
          ):(
            <>
            <Route path='/register' render={(props) => (<CreateUser {...props} type={"patient"} admin={false} />)}/>
            <Route path="/login" component={Login}/>
            </>
          )}
        </Switch>
        </div>
      </BrowserRouter>
    </GlobalProvider.Provider>
  );
}