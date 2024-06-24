import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/card";
import FormGroup from "../components/form-group";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const entrar = () => {
    console.log("Email: ", email);
    console.log("Senha: ", senha);
  };

  const prepareCadastrar = () => {
    navigate("/cadastro-usuario");
  };

  return (
    <div className="row">
      <div className="col-md-6" style={{ position: "relative", left: "300px" }}>
        <div className="bs-docs-section">
          <Card title="Login">
            <div className="row">
              <div className="col-lg-12">
                <div className="bs-component">
                  <fieldset>
                    <FormGroup label="Email: *" htmlFor="exampleInputEmail1">
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Digite o e-mail"
                      ></input>
                    </FormGroup>

                    <FormGroup label="Senha: *" htmlFor="exampleInputPassword1">
                      <input
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Digite a senha"
                      ></input>
                    </FormGroup>
                    <button className="btn btn-success" onClick={entrar}>
                      Entrar
                    </button>
                    <button
                      onClick={prepareCadastrar}
                      className="btn btn-danger"
                    >
                      Cadastrar
                    </button>
                  </fieldset>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
