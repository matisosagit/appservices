import React, { useState } from 'react';
import './editCliente.css';
import {X} from "phosphor-react";

function EditarCliente ({ocultarFormCliente, fetchClientes,id, nombree, descripcionn, cel}) {
  
  const [nombre, setNombre] = useState(`${nombree}`);
  const [descripcion, setDescripcion] = useState(`${descripcionn}`);
  const [telefono, setTelefono] = useState(`${cel}`);
  const [mensaje, setMensaje] = useState('');
  const [estado, setEstado] = useState('Pendiente');
  const manejarEnvio = async (e) => {
    e.preventDefault();

    const clienteEditado = {
      nombre: nombre,
      descripcion: descripcion,
      telefono: telefono,
      estado: estado
    };

    try {
      const respuesta = await fetch(`/api/clientes/editar/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(clienteEditado),
        credentials: 'include' 
    });
    

      const data = await respuesta.json();
      
      if (respuesta.ok) {
        setMensaje(data.message);
        setNombre('');
        setDescripcion('');
        setTelefono('');
        setEstado('');
        ocultarFormCliente();
        fetchClientes();
      } else {
        setMensaje(data.message || 'Error al editar el cliente');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setMensaje('Error en la solicitud');

    }
  };

  return (
    <div id='formC2'>
      <h1>Nuevo Cliente <X onClick={()=> ocultarFormCliente() } size={20} /></h1>
      <form onSubmit={manejarEnvio}>
        <div className='inputbox'>
          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className='inputbox'>
          <label>Descripción:</label>
          <input
            type="text"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </div>
        <div className='inputbox'>
          <label>Celular:</label>
          <input
            type="text"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
          />
        </div>
        <div >
          <label>Estado:</label>
          <div>
            <label>
              <input
                type="radio"
                value="Pendiente"
                checked={estado === 'Pendiente'}
                onChange={(e) => setEstado(e.target.value)}
              />
              Pendiente
            </label>
            <label>
              <input
                type="radio"
                value="En Proceso"
                checked={estado === 'En Proceso'}
                onChange={(e) => setEstado(e.target.value)}
              />
              En Proceso
            </label>
            <label>
              <input
                type="radio"
                value="Finalizado"
                checked={estado === 'Finalizado'}
                onChange={(e) => setEstado(e.target.value)}
              />
              Finalizado
            </label>
          </div>
        </div>
        <button id='btnN2' type="submit">Guardar Cambios</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default EditarCliente;