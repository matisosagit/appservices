import React, { useState } from 'react';

const FormularioUsuario = () => {
  const [nombre, setNombre] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [correo, setCorreo] = useState('');
  const [mensaje, setMensaje] = useState('');

  const manejarEnvio = async (e) => {
    e.preventDefault();

    const nuevoUsuario = {
      nombre: nombre,
      contraseña: contraseña,
      correo: correo
    };

    try {
      const respuesta = await fetch('/api/crear-usuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoUsuario),
        credentials: 'include' 
    });
    

      const data = await respuesta.json();
      
      if (respuesta.ok) {
        setMensaje(data.message);
        setNombre('');
        setContraseña('');
        setCorreo('');
      } else {
        setMensaje(data.message || 'Error al crear el usuario');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setMensaje('Error en la solicitud');
    }
  };

  return (
    <div>
      <h1>Crear Usuario</h1>
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
          <label>Contraseña:</label>
          <input
            type="password"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Correo:</label>
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </div>
        <button type="submit">Crear Usuario</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default FormularioUsuario;