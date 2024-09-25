import React from "react";
import './inicio.css';
import { Link } from "react-router-dom";


const Inicio = () =>{
    return(
        <div id="pageinicio">
            <h1>Tu Service Online</h1>
            <p>Gestiona tu negocio desde la web</p>
            <Link to="/Clientes" id="btnto" className="nosub">¡Empieza Ya!</Link>
        </div>
    );
};

export default Inicio;