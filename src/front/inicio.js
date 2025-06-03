import React from "react";
import './inicio.css';
import { Link } from "react-router-dom";
import CardsGrid from './componentes/cartas.jsx';
import Logoservice from './service online (1).svg';


const Inicio = () =>{
    return(
        <>
        <div id="pageinicio">
            <img src={Logoservice} />
            <Link to="/Clientes" id="btnto" className="nosub">¡Empieza Ya!</Link> 

        
        </div>
        <div className="divsegundo">
                <h2 className="t2">Gestiona tu negocio desde la web</h2>
                <CardsGrid/>
        </div>
        </>
    );
};

export default Inicio;