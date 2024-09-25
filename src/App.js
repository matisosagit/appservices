import './App.css';
import ListaClientes from "./front/paneluser.js";
import { Navbar } from './front/componentes/navbar.jsx';
import Inicio from './front/inicio.js';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import FormularioUsuario from './front/componentes/registroUsuarios.jsx';

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
          <Route path='/Registrar' element={<FormularioUsuario/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
