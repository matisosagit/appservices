import React, { useEffect, useState } from "react";
import FormularioUsuario from "./componentes/registroUsuarios.jsx";
import FormularioInicio from "./componentes/iniciosesion.jsx";
import FormCliente from "./componentes/crearCliente.jsx";
import './paneluser.css';



function  ListaClientes() {
  const [clientes, setClientes] = useState([]);
  const [nombre, setNombre] = useState('');
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    fetch('/api/usuarios/nombre',{
      method: 'GET',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        if (data.nombre) {
          setNombre(data.nombre);
        }
      })
      .catch(error => {
        console.log('Error al obtener el nombre del usuario:', error);
      });
  }, []);


  const borrar = async (clienteId) =>{
    try{
      await fetch(`/api/clientes/eliminar/${clienteId}`,{
        method: 'DELETE',
        credentials: 'include'
      })
      setClientes(prevClientes => prevClientes.filter(cliente => cliente.id !== clienteId));
    }catch(e){
      console.error(e);
    }
  };

  const fetchClientes = () => {
    fetch('/api/clientes/lista',{
      method: 'GET',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setClientes(data);
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

  if (!nombre) {
    return (
      <div id="iddiv1">
        <FormularioInicio />
        <FormularioUsuario />
      </div>
    );
  } else {
    return (
      <div className="paneladmin">
        <h1>Hola, {nombre}</h1>
        <p className="tituloadmin">LISTA DE CLIENTES</p>
        <button className="btn2" onClick={verCliente}>Añadir Cliente</button>
        {mostrarFormulario && <FormCliente agregarCliente={agregarCliente} ocultarForm={ocultarForm} />}
        
        <ul>
          {clientes.map(cliente => (
            <li key={cliente.nombre} className="listacliente">
              <span>{cliente.nombre}</span>
              <span className="descripcioncliente">{cliente.descripcion}</span>
              <span>{cliente.telefono}</span>
              <button className="btn3" onClick={() => borrar(cliente.id, setClientes)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ListaClientes;

