import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './Pages/Dashboard/index';
import DashboardTarefas from './Pages/Dashboard/dashboardTarefas';
import Login from './Pages/Login';
import Cadastro from "./Pages/Cadastro";
import MeuCadastro from "./Pages/MeuCadastro";
import SobreNos from "./Pages/Sobre";
import RotaProtegida from './Pages/Login/rotaProtegida';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/dashboard" element={
            <RotaProtegida>
              <Dashboard>
                <DashboardTarefas />
              </Dashboard>
            </RotaProtegida>
          }
        />
        <Route path="/MeuCadastro" element={<MeuCadastro />} />
        <Route path="/sobreNos" element={<SobreNos />} />
      </Routes>
    </Router>
  );
}


