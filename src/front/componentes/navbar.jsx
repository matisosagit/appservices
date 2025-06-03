import React from "react";
import './navbar.css';
import { useState } from "react";
import { Link } from "react-router-dom";
import {Users} from "phosphor-react";
import svg from '../service4.svg';
import {List} from "phosphor-react";
import {X} from "phosphor-react";
import {IdentificationBadge} from "phosphor-react";



export  const Navbar = () => {
    const[barraVisible, setBarraVisible] = useState(false);
    const[boton, setBoton] = useState(true);

    const abrirBarra = () => {
        setBarraVisible(true);
    };
    
    const cerrarBarra = () => {
        setBarraVisible(false);
    };

    const ocultarboton = () =>{
        setBoton(false);
    };

    const mostrarboton = () => {
        setBoton(true);
    };


    return <div className={`navbar ${barraVisible ? "visible" : ""}`}>
        <Link to="/"   className="nosub"><img className="logo" src={svg} alt="Logo" /></Link>
        <button className={`btnabrir ${boton ? "visible" : ""}`} onClick={() => {abrirBarra(); ocultarboton()}}><List size={32} color="#f1efef" /></button>
        <div className={`linkss ${barraVisible ? "visible" : ""}`}>
            <button className={`btncerrar ${barraVisible ? "visible" : ""}`} onClick={() => {cerrarBarra(); mostrarboton()}}><X size={32} color="#f1efef" /></button>
            <Link to="/" onClick={() => {cerrarBarra(); mostrarboton()}}  className={`nosub2 ${barraVisible ? "visible" : "" }`}>Inicio</Link>
            <Link to="/Clientes" onClick={() => {cerrarBarra(); mostrarboton()}} className={`nosub ${barraVisible ? "visible" : "" }`}><Users size={32} /></Link>
            <Link to="/PanelCliente" onClick={() => {cerrarBarra(); mostrarboton()}} className={`nosub ${barraVisible ? "visible" : "" }`}><IdentificationBadge size={32} /></Link>
        </div>
    </div>
}