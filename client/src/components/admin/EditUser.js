import React, { useState, useContext, useEffect } from "react";
import GlobalProvider from '../../context/GlobalState';
import Axios from "axios";
import { useHistory } from "react-router-dom";
import ErrorNotice from "../ErrorNotice";

export const EditUser = (props) => {
    const history = useHistory();
    const [error, setError] = useState();
    const [user, setUser] = useState({
        _id: '',
        forename: '',
        surname: '',
        email: '',
        type: '',
        dob: '',
        street: '',
        postcode: '',
        city : '',
        phone: '',
        createdAt: '',
    });
    
    const { userData } = useContext(GlobalProvider);

    useEffect(() => {
        const getUser = async () => {
            const data = await Axios.get("/admins/"+props.match.params.id, {
                headers: { "x-auth-token": userData.token },
            });
            setUser(data.data.user);
        };

        if(userData.user !== undefined){
            getUser();
        }
    },[userData, props.match.params.id]);

    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
      }
      
    function formatDate(date) {
        var res = date.slice(0, 10);
        return res;
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await Axios.put(`/admins/${props.match.params.id}`, user, {
                headers: { "x-auth-token": userData.token },
            });
            history.push(`/${user.type}s`);
        } catch (err) {
            err.response.data.error && setError(err.response.data.error);  
        }
    }


    return (
        <div>
            <h1>Edit User</h1>
            {error && (
                <ErrorNotice message={error} clearError={() => setError(undefined)} />
            )}
            <form onSubmit={onSubmit}>
                <input type="text" value={user.forename} onChange={onChange} name="forename" placeholder="Forename"></input>
                <input type="text" value={user.surname} onChange={onChange} name="surname" placeholder="Surname"></input><br/>
                <label>Date of Birth </label>
                <input type="date" value={formatDate(user.dob)} onChange={onChange} name="dob" placeholder="Date of Birth" /><br/>
                <input type="text" value={user.email} onChange={onChange} name="email" placeholder="Email" />
                <input type="text" value={user.phone} onChange={onChange} name="phone" placeholder="Phone Number" /><br/>
                <input type="text" value={user.street} onChange={onChange} name="street" placeholder="Street" />
                <input type="text" value={user.postcode} onChange={onChange} name="postcode" placeholder="Postcode" /><br/>
                <input type="text" value={user.city} onChange={onChange} name="city" placeholder="City/Town" /><br/>
            
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}
