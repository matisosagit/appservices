import React, { useEffect, useState } from "react";
import './paneluser.css';


import jsPDF from 'jspdf';
import Dataimage from './img.js';
import { useNavigate, Link } from "react-router-dom";


function  ClientesXml() {
    const [clientesXml, setClientesXml] = useState([]);
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [cargando, setCargando] = useState(true);
    const [filtro, setFiltro] = useState("");
    const navigate = useNavigate();


    const fetchClientesXML = () => {
        fetch('/api/clientes/lista-completa',{
        method: 'GET',
        credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            if (Array.isArray(data.listaCompleta)) {
            setClientesXml(data.listaCompleta);
            } else {
            console.error('La respuesta no es un array:', data);
            setClientesXml([]);
            }
        })
        .catch(error => {
            console.log('Error al buscar clientes:', error);
            setClientesXml([]);
        });
    };
    

    const clientesFiltrados = clientesXml.filter((cliente) => {
        const palabras = filtro.toUpperCase().split(" ");
        const nombreCliente = cliente.nombre.toUpperCase();
    
        return palabras.every((palabra) => nombreCliente.includes(palabra));
    });

    const fetchNombre = async () => {
        try{
        const res = await fetch('/api/usuarios/nombre',{
        method: 'GET',
        credentials: 'include'
        });
            if (res.ok) {
            const data = await res.json();
            setNombre(data.nombre || "");
            }else{
            setNombre("");
            }
        }
        catch(error) {
            console.log('Error al obtener el nombre del usuario:', error);
            setNombre("");
        } finally {
            setCargando(false);
        }
    };

    const fetchTelefono = () => {
        fetch('/api/usuarios/telefono',{
            method: 'GET',
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
        if (data.telefono) {
            setTelefono(data.telefono);
        }
        })
        .catch(error => {
        console.log('Error al obtener el telefono del usuario:', error);
        });
    };



    const boleta = async (nombre, nombrecliente, descripcion, telefonoC, codigoCli, fec) =>{
        fetchTelefono();
        let telusuario = telefono;
        let data = 'COMPROBANTE \n'
                +`\n`
                + `Emisor: ${nombre} , tel: ${telusuario}\n`
                +`\n`
                + `Nombre del cliente: ${nombrecliente} \n`
                +`\n`
                + `Descripción: ${descripcion} \n`
                +`\n`
                + `Teléfono cliente: ${telefonoC}`
                +`\n`
                + `Fecha de ingreso: ${fec}`
                +`\n`
                +`\n`
                +`\n`
                + `Código: ${codigoCli}`;

        const doc = new jsPDF();


        doc.addImage(Dataimage, 'PNG',80, 10, 45, 45);
        doc.setFontSize(22);
        doc.text(data, 50, 70);
        doc.save('boleta.pdf');

    };


    useEffect(() => {
        fetchClientesXML();
        fetchNombre();
    }, []);
    
    

    useEffect(() => {
        if (!cargando && !nombre) {
        navigate("/Ingreso");
        }
    }, [cargando, nombre, navigate]);
    if (!nombre) {
        return null;
    }
        return (
        <div className="paneladmin">
            <h1>Hola, {nombre}</h1>
            <Link to="/Clientes">Volver</Link>
            <input
            className="inputbuscador"
            type="text"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            placeholder="Buscar por nombre"
            />
            <ul className="ulcli">
            <p>Lista completa de clientes.</p>
                <li className="listacliente">
                <span>Nombre</span>
                <span>Descripción</span>
                <span>Teléfono</span>
                <span>Estado</span>
                </li>
            {clientesFiltrados.map(cliente => (
                <li  key={cliente.id} className="listacliente">
                <span>{cliente.nombre}</span>
                <span className="descripcioncliente">{cliente.descripcion}</span>
                <span>{cliente.telefono}</span>
                <span>{cliente.estado}</span>
                <span className="listabotones">
                    <button className="btnboleta" onClick={() => boleta(nombre, cliente.nombre, cliente.descripcion, cliente.telefono, cliente.codigo, cliente.fecha)}>Boleta</button>
                </span>
                </li>
            ))}

            </ul> 
        </div>
        );
}

export default ClientesXml;

