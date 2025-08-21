import './App.css';
import ListaClientes from "./paneluser.js";
import { Navbar } from './componentes/navbar.jsx';
import Inicio from './inicio.js';
import InfoCliente from './PanelCliente.js';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import FormularioUsuario from './componentes/registroUsuarios.jsx';
import FormularioInicio from './componentes/iniciosesion.jsx';
import ClientesXml from './historialClientes.js';

function App() {
  return (
    <div className="App">
      <br></br>
      <br></br>
      <br></br>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Inicio/>}/>
          <Route path='/Clientes' element={<ListaClientes/>}/>
          <Route path='/HistorialClientes' element={<ClientesXml/>}/>
          <Route path='/Registrar' element={<FormularioUsuario/>}/>
          <Route path='/PanelCliente' element={<InfoCliente/>}/>
          <Route path='/Ingreso' element={<FormularioInicio/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
