import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/card";
import FormGroup from "../components/form-group";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagemErro, setMensagemErro] = useState(null);

  const navigate = useNavigate();

  const entrar = () => {
    axios
      .post("http://localhost:8080/usuarios/autenticar", {
        email: email,
        senha: senha,
      })
      .then((response) => {
        localStorage.setItem('usuario_logado', JSON.stringify(response.data))
        navigate('/home');
      })
      .catch((error) => {
        const errorMessage = error.response.data;
        setMensagemErro(errorMessage);
        console.log(errorMessage);
      });
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
              {mensagemErro && (
                <span className="text-danger">{mensagemErro}</span>
              )}
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
                      />
                    </FormGroup>

                    <FormGroup label="Senha: *" htmlFor="exampleInputPassword1">
                      <input
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Digite a senha"
                      />
                    </FormGroup>
                    <button className="btn btn-success" onClick={entrar}>
                      Entrar
                    </button>
                    <button
                      onClick={prepareCadastrar}
                      className="btn btn-danger"
                      style={{ marginLeft: "10px" }}
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
