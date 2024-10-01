import React from "react";
import './inicio.css';
import { Link } from "react-router-dom";
import { DesktopTower } from "phosphor-react";
import { SpeakerHigh} from "phosphor-react";
import { DeviceMobile} from "phosphor-react";
import { Wrench} from "phosphor-react";
import { Printer} from "phosphor-react";


const Inicio = () =>{
    return(
        <div id="pageinicio">
            <h1 className="t1">Tu Service Online</h1>
                <div className="divsegundo">
                    <h2 className="t2">Gestiona tu negocio desde la web</h2>
                    <p>-Rápido registro de clientes <br></br><br></br>
                    -Gestión eficiente de reparaciones<br></br><br></br>
                    -Panel de control intuitivo<br></br><br></br>
                    -Boletas/comprobantes automáticos
                </p>
                <li className="elementos">
                    <DesktopTower size={32} className="iconophosphor"/>
                    <SpeakerHigh size={32} className="iconophosphor"/>
                    <DeviceMobile size={32} className="iconophosphor"/>
                    <Printer size={32} className="iconophosphor"/>
                    <Wrench size={32} className="iconophosphor"/>
                </li>
                <Link to="/Clientes" id="btnto" className="nosub">¡Empieza Ya!</Link>
            </div>
        </div>
    );
};

export default Inicio;