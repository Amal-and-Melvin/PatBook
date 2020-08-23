import React, {useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import GlobalProvider from '../../context/GlobalState';
import Axios from "axios";
import ErrorNotice from "../ErrorNotice";


export const CreateUser = ({type, admin}) => {
    const {setUserData} = useContext(GlobalProvider);
    const history = useHistory();
    const [error, setError] = useState();
    const [user, setUser] = useState({
        forename: '',
        surname: '',
        email: '',
        type: type,
        password: '',
        passwordCheck: '',
        dob: '',
        street: '',
        postcode: '',
        city : '',
        phone: '',
        createdAt: Date.now(),
    });

    const onSubmit = async (e) => {
        e.preventDefault();
        try{
            await Axios.post("/register", user);

            if (!admin){
                const email  = user.email;
                const password = user.password;
                const loginRes = await Axios.post("/login", {email,password});
                setUserData({
                    token: loginRes.data.token,
                    user: loginRes.data.user,
                });
                localStorage.setItem("auth-token", loginRes.data.token);
                history.push("/");
            }else {
                history.go(0);
            }
            
        } catch (err) {
                console.log(err);
                err.response.data.error && setError(err.response.data.error);
            
        } 
    }

    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const onFocus  = (e) => {
        e.currentTarget.type = "date";
    }

    const onBlur = (e) => {
        e.currentTarget.type = "text";
        e.currentTarget.placeholder = "Date of Birth";
    }

    return (
        <>
            <h1>Register {type}</h1>
            {error && (
                <ErrorNotice message={error} clearError={() => setError(undefined)} />
            )}
            <form onSubmit={onSubmit}>
                <input type="text" value={user.forename} onChange={onChange} name="forename" placeholder="Forename"/>
                <input type="text" value={user.surname} onChange={onChange} name="surname" placeholder="Surname"/><br/>
                <input type="text" value={user.email} onChange={onChange} name="email" placeholder="Email"/>
                <input type="text" value={user.phone} onChange={onChange} name="phone" placeholder="Phone Number" /><br/>
                <input type="password" value={user.password} onChange={onChange} name="password" placeholder="Password"/>
                <input type="password" value={user.passwordCheck} onChange={onChange} name="passwordCheck" placeholder="Re-enter password"/><br/>
                <input type="text" value={user.dob} onChange={onChange} name="dob" onFocus = {onFocus} onBlur={onBlur} placeholder="Date of Birth"/>
                <input type="text" value={user.street} onChange={onChange} name="street" placeholder="Street" /><br/>
                <input type="text" value={user.postcode} onChange={onChange} name="postcode" placeholder="Postcode" />
                <input type="text" value={user.city} onChange={onChange} name="city" placeholder="City/Town" /><br/>
    
                <input type="submit" value="Register" />
            </form>
        </>
    )
}
