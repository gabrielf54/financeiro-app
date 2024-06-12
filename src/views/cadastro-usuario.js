import React from "react";
import Card from "../components/card";
import FormGroup from "../components/form-group";

class CadastroUsuario extends React.Component {
  state = {
    nome: "",
    email: "",
    senha: "",
    senhaRepeticao: "",
  };

  cadastrar = () => {
    console.log(this.state)
  }

  render() {
    return (
      <div className="container">
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
                    onChange={(e) => this.setState({ nome: e.target.value })}
                  ></input>
                </FormGroup>

                <FormGroup label="E-mail: *" htmlFor="inputEmail">
                  <input
                    className="form-control"
                    type="email"
                    id="inputEmail"
                    name="email"
                    onChange={(e) => this.setState({ email: e.target.value })}
                  ></input>
                </FormGroup>

                <FormGroup label="Senha: *" htmlFor="inputSenha">
                  <input
                    className="form-control"
                    type="password"
                    id="inputSenha"
                    name="senha"
                    onChange={(e) => this.setState({ senha: e.target.value })}
                  ></input>
                </FormGroup>

                <FormGroup label="Repita sua senha: *" htmlFor="inputRepitaSenha">
                  <input
                    className="form-control"
                    type="password"
                    id="inputRepitaSenha"
                    name="senha"
                    onChange={(e) => this.setState({ senhaRepeticao: e.target.value })}
                  ></input>
                </FormGroup>
                <button type="button" onClick={this.cadastrar} className="btn btn-success">Salvar</button>
                <button type="button" className="btn btn-danger">Cancelar</button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

export default CadastroUsuario;
