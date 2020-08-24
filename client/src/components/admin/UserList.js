import React, { useState, useContext, useEffect } from "react";
import GlobalProvider from '../../context/GlobalState';
import Axios from "axios";
import { CreateUser } from '../auth/CreateUser';
import { Link } from "react-router-dom";

export const UserList = ({type}) => {
    const [users, setUsers] = useState();
    const { userData } = useContext(GlobalProvider);
    
    useEffect(() => {
        const getUsers = async () => {
            const getUsers = await Axios.get("/admins/type/"+type, {
                headers: { "x-auth-token": userData.token },
            });
            setUsers(getUsers.data.users);
        };

        if(userData.user !== undefined){
            getUsers();
        }
    },[userData, type]);
    
    const deleteItem = async (id) =>{
        await Axios.delete("/admins/"+id, {
            headers: { "x-auth-token": userData.token },
        });
    }

    function formatDate(date) {
        var res = date.slice(0, 10);
        return res;
    }
    
    return (
        <> 
           
            <CreateUser type={type} admin={true}/>
            <table>
                <thead>
                    <tr>
                    <th>Forename</th>
                    <th>Surname</th>
                    <th>Email</th>
                    <th>DOB</th>
                    <th>Address</th>
                    <th>Number</th>
                    <th>Created At</th>
                    <th>Delete</th>
                    <th>Edit</th>
                    <th>Create Appointment</th>
                    </tr>
                </thead>
                <tbody>
                {users !== undefined &&
                    users.map(user => (
                        <tr key={user._id}>
                            <td>{user.forename}</td>
                            <td>{user.surname}</td>
                            <td>{user.email}</td>
                            <td>{formatDate(user.dob)}</td>
                            <td>{user.street +", "+user.postcode+", "+user.city }</td>
                            <td>{user.phone}</td>
                            <td>{user.createdAt}</td>
                            <td><button onClick={() => deleteItem(user._id) } className="delete-btn">Delete</button></td>
                            <td><Link to={"/user/"+user._id}>Edit</Link></td>
                            <td><Link to={"/appointment/"+user._id}>Appointment</Link></td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </>
    )
}
