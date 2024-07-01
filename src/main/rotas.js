import React, { useContext } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import { AuthContext } from "../main/provedor-autenticacao";
import CadastroUsuario from "../views/cadastro-usuario";
import Home from "../views/home";
import CadastroLancamentos from "../views/lancamentos/cadastro-lancamentos";
import ConsultaLancamentos from "../views/lancamentos/consulta-lancamentos";
import LandingPage from "../views/landing-page";
import Login from "../views/login";

const RotaAutenticada = ({ children, ...rest }) => {
  const { isAutenticado } = useContext(AuthContext);
  return isAutenticado ? children : <Navigate to="/login" />;
};

function Rotas() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro-usuarios" element={<CadastroUsuario />} />

        <Route
          path="/home"
          element={
            <RotaAutenticada>
              <Home />
            </RotaAutenticada>
          }
        />
        <Route
          path="/consulta-lancamentos"
          element={
            <RotaAutenticada>
              <ConsultaLancamentos />
            </RotaAutenticada>
          }
        />
        <Route
          path="/cadastro-lancamentos/:id?"
          element={
            <RotaAutenticada>
              <CadastroLancamentos />
            </RotaAutenticada>
          }
        />
      </Routes>
    </Router>
  );
}

export default Rotas;
