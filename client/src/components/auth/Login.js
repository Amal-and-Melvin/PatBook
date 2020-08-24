import React, {useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import Axios from "axios";
import GlobalProvider from '../../context/GlobalState';
import ErrorNotice from "../ErrorNotice";
import { ReactComponent as LoginImg } from './2.svg';

export const Login = () => {
  const {setUserData} = useContext(GlobalProvider);
  const history = useHistory();
  const [error, setError] = useState();
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    try{
      const email  = user.email;
      const password = user.password;
      const loginRes = await Axios.post("/login", {email,password});
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/");
    } catch (err) {
      err.response.data.error && setError(err.response.data.error);
    } 
  }

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  return (
    <div className="login">
      <LoginImg className="loginImg"/>
        
        <form onSubmit={onSubmit}>
          {error && (
            <ErrorNotice message={error} clearError={() => setError(undefined)} />
          )}
          <h1>Login</h1>
          <input type="text" value={user.email} onChange={onChange} name="email" placeholder="Email"></input><br/>
          <input type="password" value={user.password} onChange={onChange} name="password" placeholder="Password"></input><br/>
          <input type="submit" value="Login" />
        </form>
    </div>
  )
}
