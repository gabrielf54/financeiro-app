import React, { useState } from "react";
import Card from "../components/card";
import FormGroup from "../components/form-group";
import { useNavigate } from "react-router-dom";


const CadastroUsuario = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaRepeticao, setSenhaRepeticao] = useState("");
  
  const navigate = useNavigate();

  const cadastrar = () => {
    console.log({ nome, email, senha, senhaRepeticao });
  };

  const cancelar = () => {
    navigate('/login')
  }

  return (
    <Card title="Cadastro de usuário">
      <div className="row">
        <div className="col-lg-12">
          <div className="bs-component">
            <FormGroup label="Nome: *" htmlFor="inputNome">
              <input
                className="form-control"
                type="text"
                id="inputNome"
                name="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </FormGroup>

            <FormGroup label="E-mail: *" htmlFor="inputEmail">
              <input
                className="form-control"
                type="email"
                id="inputEmail"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>

            <FormGroup label="Senha: *" htmlFor="inputSenha">
              <input
                className="form-control"
                type="password"
                id="inputSenha"
                name="senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </FormGroup>

            <FormGroup label="Repita sua senha: *" htmlFor="inputRepitaSenha">
              <input
                className="form-control"
                type="password"
                id="inputRepitaSenha"
                name="senhaRepeticao"
                value={senhaRepeticao}
                onChange={(e) => setSenhaRepeticao(e.target.value)}
              />
            </FormGroup>

            <button
              type="button"
              onClick={cadastrar}
              className="btn btn-success"
            >
              Salvar
            </button>
            <button onClick={cancelar} type="button" className="btn btn-danger">
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CadastroUsuario;
