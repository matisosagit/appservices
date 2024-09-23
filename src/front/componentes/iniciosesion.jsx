import React, { useState } from 'react';

const FormularioInicio = () => {
    const [nombre, setNombre] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [mensaje, setMensaje] = useState('');

    const manejarEnvio = async (e) => {
        e.preventDefault();

        const verificarUsuario = {
            nombre: nombre,
            contraseña: contraseña
        };

        try{
            const respuesta = await fetch('/api/usuarios/iniciar-sesion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(verificarUsuario)
            });

            const data = await respuesta.json();

            if (respuesta.ok){
                setMensaje(data.message);
                setNombre('');
                setContraseña('');
            }else{
                setMensaje(data.message || 'Error al iniciar sesión');
            }
        }catch(error){
            console.error('Algo salió mal', error);
            setMensaje('Algo salió mal');
        }
    };

    return(
        <div>
            <h1>Iniciar sesión</h1>
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
                        type='password'
                        value={contraseña}
                        onChange={(e) => setContraseña(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Iniciar sesión</button>

            </form>
            {mensaje && <p>{mensaje}</p>}
        </div>
    );
};

export default FormularioInicio;