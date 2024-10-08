import './pancli.css';
import React, { useState } from "react";

function InfoCliente() {
    const [cliente, setCliente] = useState([]);
    const [codigo, setCodigo] = useState('');
    const [mensaje, setMensaje] = useState('');

    const fetchCliente = async (codigo) =>{
        try{
            const respuesta = await fetch(`/api/clientes/cliente/${codigo}`,{
                method: 'GET',
                credentials: 'include'
            });
            const data = await respuesta.json();
                if (data.cliente) {
                    setCliente(data.cliente);
                }else{
                    setMensaje(data.message || 'Error al buscar cliente');
                }
        }
            catch(error){
            console.log('Error al obtener cliente', error);
            };
        };
    
        const handleSubmit = (e) => {
            e.preventDefault(); 
            if (codigo) {
                fetchCliente(codigo); 
            }
        };
    
    


        return(
            <div id='divtotalC'>
                <div id='formCP'>
                    <form onSubmit={handleSubmit}>
                    <div className='inputbox'>
                        <label>Ingrese su código:</label>
                        <input
                            type="text"
                            value={codigo}
                            onChange={(e) => setCodigo(e.target.value)}
                            required
                        />
                    </div>
                        <button id='btnC' type='submit'>Buscar</button>
                    </form>
                    {mensaje && <p>{mensaje}</p>}
                </div>

                    <ul className='ulcli2'>
                        <li className='licli'>
                            <span>Nombre</span>
                            <span>Descripción</span>
                            <span>Teléfono</span>
                            <span>Estado</span>
                        </li>
                        <li className='licli'>
                            <span>{cliente.nombre}</span>
                            <span>{cliente.descripcion}</span>
                            <span>{cliente.telefono}</span>
                            <span>{cliente.estado}</span>
                        </li>
                    </ul>
                
            </div>
            
        );
    
}

export default InfoCliente;