import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LancamentoService from "../../app/service/lancamento-service";
import LocalStorageService from "../../app/service/localstorage-service";
import Card from "../../components/card";
import FormGroup from "../../components/form-group";
import SelectMenu from "../../components/select-menu";
import * as messages from "../../components/toastr";

const CadastroLancamentos = () => {
  const [id, setId] = useState(null);
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [mes, setMes] = useState("");
  const [ano, setAno] = useState("");
  const [tipo, setTipo] = useState("");
  const [status, setStatus] = useState("");
  const [usuario, setUsuario] = useState(null);
  const [atualizando, setAtualizando] = useState(false);

  const navigate = useNavigate();
  const { id: paramId } = useParams();
  const service = useMemo(() => new LancamentoService(), []);

  useEffect(() => {
    if (paramId) {
      service
        .obterPorId(paramId)
        .then((response) => {
          const lancamento = response.data;
          setId(lancamento.id);
          setDescricao(lancamento.descricao);
          setValor(lancamento.valor);
          setMes(lancamento.mes);
          setAno(lancamento.ano);
          setTipo(lancamento.tipo);
          setStatus(lancamento.status);
          setUsuario(lancamento.usuario);
          setAtualizando(true);
        })
        .catch((erros) => {
          messages.mensagemErro(erros.response.data);
        });
    }
  }, [paramId, service]);

  const submit = () => {
    const usuarioLogado = LocalStorageService.obterItem("_usuario_logado");

    const lancamento = {
      descricao,
      valor,
      mes,
      ano,
      tipo,
      usuario: usuarioLogado.id,
    };

    try {
      service.validar(lancamento);
    } catch (erro) {
      const mensagens = erro.mensagens;
      mensagens.forEach((msg) => messages.mensagemErro(msg));
      return false;
    }

    service
      .salvar(lancamento)
      .then(() => {
        navigate("/consulta-lancamentos");
        messages.mensagemSucesso("Lançamento cadastrado com sucesso!");
      })
      .catch((error) => {
        messages.mensagemErro(error.response.data);
      });
  };

  const atualizar = () => {
    const lancamento = {
      id,
      descricao,
      valor,
      mes,
      ano,
      tipo,
      status,
      usuario,
    };

    service
      .atualizar(lancamento)
      .then(() => {
        navigate("/consulta-lancamentos");
        messages.mensagemSucesso("Lançamento atualizado com sucesso!");
      })
      .catch((error) => {
        messages.mensagemErro(error.response.data);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "descricao":
        setDescricao(value);
        break;
      case "valor":
        setValor(value);
        break;
      case "mes":
        setMes(value);
        break;
      case "ano":
        setAno(value);
        break;
      case "tipo":
        setTipo(value);
        break;
      default:
        break;
    }
  };

  const tipos = service.obterListaTipos();
  const meses = service.obterListaMeses();

  return (
    <Card
      title={
        atualizando ? "Atualização de Lançamento" : "Cadastro de Lançamento"
      }
    >
      <div className="row">
        <div className="col-md-12">
          <FormGroup id="inputDescricao" label="Descrição: *">
            <input
              id="inputDescricao"
              type="text"
              className="form-control"
              name="descricao"
              value={descricao}
              onChange={handleChange}
            />
          </FormGroup>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <FormGroup id="inputAno" label="Ano: *">
            <input
              id="inputAno"
              type="text"
              name="ano"
              value={ano}
              onChange={handleChange}
              className="form-control"
            />
          </FormGroup>
        </div>
        <div className="col-md-6">
          <FormGroup id="inputMes" label="Mês: *">
            <SelectMenu
              id="inputMes"
              value={mes}
              onChange={handleChange}
              lista={meses}
              name="mes"
              className="form-control"
            />
          </FormGroup>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <FormGroup id="inputValor" label="Valor: *">
            <input
              id="inputValor"
              type="text"
              name="valor"
              value={valor}
              onChange={handleChange}
              className="form-control"
            />
          </FormGroup>
        </div>
        <div className="col-md-4">
          <FormGroup id="inputTipo" label="Tipo: *">
            <SelectMenu
              id="inputTipo"
              lista={tipos}
              name="tipo"
              value={tipo}
              onChange={handleChange}
              className="form-control"
            />
          </FormGroup>
        </div>
        <div className="col-md-4">
          <FormGroup id="inputStatus" label="Status: ">
            <input
              type="text"
              className="form-control"
              name="status"
              value={status}
              disabled
            />
          </FormGroup>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          {atualizando ? (
            <button onClick={atualizar} className="btn btn-success">
              <i className="pi pi-refresh"></i> Atualizar
            </button>
          ) : (
            <button onClick={submit} className="btn btn-success">
              <i className="pi pi-save"></i> Salvar
            </button>
          )}
          <button
            onClick={() => navigate("/consulta-lancamentos")}
            className="btn btn-danger"
          >
            <i className="pi pi-times"></i>Cancelar
          </button>
        </div>
      </div>
    </Card>
  );
};

export default CadastroLancamentos;
