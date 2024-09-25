import React, { useState } from 'react';
import './formCliente.css';

function FormCliente ({agregarCliente, ocultarForm}) {
  
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [mensaje, setMensaje] = useState('');
  const manejarEnvio = async (e) => {
    e.preventDefault();

    const nuevoCliente = {
      nombre: nombre,
      descripcion: descripcion,
      telefono: telefono
    };

    try {
      const respuesta = await fetch('/api/clientes/crear-cliente', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoCliente),
        credentials: 'include' 
    });
    

      const data = await respuesta.json();
      
      if (respuesta.ok) {
        agregarCliente(data.cliente);
        setMensaje(data.message);
        setNombre('');
        setDescripcion('');
        setTelefono('');
        ocultarForm();
      } else {
        setMensaje(data.message || 'Error al crear cliente');
        ocultarForm();
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setMensaje('Error en la solicitud');

    }
  };

  return (
    <div id='formC'>
      <h1>Nuevo Cliente</h1>
      <form onSubmit={manejarEnvio}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Descripción:</label>
          <input
            type="text"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Celular:</label>
          <input
            type="text"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
          />
        </div>
        <button type="submit">Crear Cliente</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default FormCliente;