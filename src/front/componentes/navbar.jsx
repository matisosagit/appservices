import React from "react";
import './navbar.css';
import { Link } from "react-router-dom";
import {Users} from "phosphor-react";
import logo from '../img/logosinfondo.png';


export  const Navbar = () => {
    return <div className="navbar">
        <Link to="/"   className="nosub"><img className="logo" src={logo} alt="Logo" /></Link>
        <div className="linkss">
            
            <Link to="/Clientes" className="nosub"><Users size={32} /></Link>
            
        </div>
    </div>
}