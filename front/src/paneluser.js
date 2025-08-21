import React, { useEffect, useState } from "react";
import FormCliente from "./componentes/crearCliente.jsx";
import EditarCliente from "./componentes/editarCliente.jsx";
import './paneluser.css';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter
} from "./componentes/table.jsx";

import jsPDF from 'jspdf';
import Dataimage from './img.js';
import { useNavigate, Link } from "react-router-dom";


  

function  ListaClientes() {
  const [clientes, setClientes] = useState([]);
  const [nombre, setNombre] = useState(null);
  const [telefono, setTelefono] = useState('');
  const [clienteSelec, setClienteSelec] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarFormularioCliente, setMostrarFormularioCliente] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [filtro, setFiltro] = useState("");
  const navigate = useNavigate();

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


  const borrar = async (clienteId) =>{
    try{
      await fetch(`/api/clientes/eliminar/${clienteId}`,{
        method: 'PUT',
        credentials: 'include'
      })
      setClientes(prevClientes => prevClientes.filter(cliente => cliente.id !== clienteId));
    }catch(e){
      console.error(e);
    }
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
              + `Teléfono cliente: ${telefonoC} \n`
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

  const clientesFiltrados = clientes.filter((cliente) => {
    const palabras = filtro.toUpperCase().split(" ");
    const nombreCliente = cliente.nombre.toUpperCase();

    return palabras.every((palabra) => nombreCliente.includes(palabra));
  });


  const fetchClientes = () => {
    fetch('/api/clientes/lista',{
      method: 'GET',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data.listaClientes)) {
          setClientes(data.listaClientes);
        } else {
          console.error('La respuesta no es un array:', data);
          setClientes([]);
        }
      })
      .catch(error => {
        console.log('Error al buscar clientes:', error);
        setClientes([]);
      });
  };

  useEffect(() => {
    fetchClientes();
    fetchNombre();
    fetchTelefono();
  }, []);
  
  

  const verCliente = () => {
    setMostrarFormulario(true);
  };

  const ocultarForm = () => {
    setMostrarFormulario(false);
  };

  const agregarCliente = (nuevoCliente) => {
    setClientes(prevClientes => [...prevClientes, nuevoCliente]); 
  };



  const verFormCliente = () => {
    setMostrarFormularioCliente(true);
  };

  const ocultarFormCliente = () => {
    setMostrarFormularioCliente(false);
  };

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
        <button className="btn2" onClick={verCliente}>Añadir Cliente</button>
        <input
        className="inputbuscador"
        type="text"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        placeholder="Buscar por nombre"
        />
        <Link to="/HistorialClientes">Ver historial completo aqui.</Link>
        {mostrarFormulario && <FormCliente agregarCliente={agregarCliente} ocultarForm={ocultarForm} fetchClientes={fetchClientes} />}
        
        
        <ul className="ulcli">
          <p>Lista de clientes.</p>
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
                <button className="btn3" onClick={() => {setClienteSelec(cliente); verFormCliente();}}>Editar</button>
                <button className="btn3" onClick={() => borrar(cliente.id, setClientes)}>Eliminar</button>
              </span>
              
            </li>
          ))}

        </ul> 
        {clienteSelec && mostrarFormularioCliente &&
                <EditarCliente 
                  ocultarFormCliente={ocultarFormCliente} 
                  fetchClientes={fetchClientes}
                  id={clienteSelec.id} 
                  nombree={clienteSelec.nombre} 
                  descripcionn={clienteSelec.descripcion} 
                  cel={clienteSelec.telefono}
                />
            }
      </div>
    );
  
}

export default ListaClientes;

