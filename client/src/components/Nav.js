import React from 'react'
import { NavLink } from 'react-router-dom';
import { AuthOptions } from './auth/AuthOptions';

export const Nav = () => {
    return (
        <nav>
            <NavLink activeClassName="active" exact to="/" >Home</NavLink>
            <AuthOptions />
        </nav>
    )
}
