import React, { useEffect, useState } from "react";
import FormularioUsuario from "./componentes/registroUsuarios.jsx";
import FormularioInicio from "./componentes/iniciosesion.jsx";
import FormCliente from "./componentes/crearCliente.jsx";

function ListaClientes() {
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

  useEffect(() => {
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
  }, []);
  
  

  const verCliente = () => {
    setMostrarFormulario(true);
  };

  if (!nombre) {
    return (
      <div>
        <FormularioInicio />
        <FormularioUsuario />
      </div>
    );
  } else {
    return (
      <div>
        <p>Hola, {nombre}</p>
        <h1>LISTA DE CLIENTES</h1>
        <button onClick={verCliente}>Añadir Cliente</button>
        {mostrarFormulario && <FormCliente />}
        
        <ul>
          {clientes.map(cliente => (
            <li key={cliente.id}>
              {cliente.nombre}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ListaClientes;

