import React from "react";
import { Route, HashRouter, Routes } from 'react-router-dom';
import Login from '../views/login';
import CadastroUsuario from '../views/cadastro-usuario';

function Rotas() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro-usuario" element={<CadastroUsuario />} />
            </Routes>
        </HashRouter>
    );
}

export default Rotas;
