import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LancamentoService from "../../app/service/lancamento-service";
import LocalStorageService from "../../app/service/localstorage-service";
import Card from "../../components/card";
import FormGroup from "../../components/form-group";
import SelectMenu from "../../components/select-menu";
import * as messages from "../../components/toastr";
import TabelaLancamentos from "./tabela-lancamentos";

const ConsultaLancamentos = () => {
  const [ano, setAno] = useState("");
  const [mes, setMes] = useState("");
  const [tipo, setTipo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [lancamentoDeletar, setLancamentoDeletar] = useState({});
  const [lancamentos, setLancamentos] = useState([]);

  const navigate = useNavigate();
  const service = new LancamentoService();

  const buscar = () => {
    if (!ano) {
      messages.mensagemErro("O preenchimento do campo Ano é obrigatório.");
      return false;
    }

    const usuarioLogado = LocalStorageService.obterItem("_usuario_logado");

    const lancamentoFiltro = {
      ano,
      mes,
      tipo,
      descricao,
      usuario: usuarioLogado.id,
    };

    service
      .consultar(lancamentoFiltro)
      .then((resposta) => {
        const lista = resposta.data;

        if (lista.length < 1) {
          messages.mensagemAlert("Nenhum resultado encontrado.");
        }
        setLancamentos(lista);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editar = (id) => {
    navigate(`/cadastro-lancamentos/${id}`);
  };

  const abrirConfirmacao = (lancamento) => {
    setShowConfirmDialog(true);
    setLancamentoDeletar(lancamento);
  };

  const cancelarDelecao = () => {
    setShowConfirmDialog(false);
    setLancamentoDeletar({});
  };

  const deletar = () => {
    service
      .deletar(lancamentoDeletar.id)
      .then((response) => {
        const index = lancamentos.indexOf(lancamentoDeletar);
        lancamentos.splice(index, 1);
        setLancamentos([...lancamentos]);
        setShowConfirmDialog(false);
        messages.mensagemSucesso("Lançamento deletado com sucesso!");
      })
      .catch((error) => {
        messages.mensagemErro("Ocorreu um erro ao tentar deletar o Lançamento");
      });
  };

  const preparaFormularioCadastro = () => {
    navigate("/cadastro-lancamentos");
  };

  const alterarStatus = (lancamento, status) => {
    service.alterarStatus(lancamento.id, status).then((response) => {
      const index = lancamentos.indexOf(lancamento);
      if (index !== -1) {
        lancamento["status"] = status;
        lancamentos[index] = lancamento;
        setLancamentos([...lancamentos]);
      }
      messages.mensagemSucesso("Status atualizado com sucesso!");
    });
  };

  const meses = service.obterListaMeses();
  const tipos = service.obterListaTipos();

  const confirmDialogFooter = (
    <div>
      <Button label="Confirmar" icon="pi pi-check" onClick={deletar} />
      <Button
        label="Cancelar"
        icon="pi pi-times"
        onClick={cancelarDelecao}
        className="p-button-secondary"
      />
    </div>
  );

  return (
    <Card title="Consulta Lançamentos">
      <div className="row">
        <div className="col-md-6">
          <div className="bs-component">
            <FormGroup htmlFor="inputAno" label="Ano: *">
              <input
                type="text"
                className="form-control"
                id="inputAno"
                value={ano}
                onChange={(e) => setAno(e.target.value)}
                placeholder="Digite o Ano"
              />
            </FormGroup>

            <FormGroup htmlFor="inputMes" label="Mês: ">
              <SelectMenu
                id="inputMes"
                value={mes}
                onChange={(e) => setMes(e.target.value)}
                className="form-control"
                lista={meses}
              />
            </FormGroup>

            <FormGroup htmlFor="inputDesc" label="Descrição: ">
              <input
                type="text"
                className="form-control"
                id="inputDesc"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Digite a descrição"
              />
            </FormGroup>

            <FormGroup htmlFor="inputTipo" label="Tipo Lançamento: ">
              <SelectMenu
                id="inputTipo"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                className="form-control"
                lista={tipos}
              />
            </FormGroup>

            <button onClick={buscar} type="button" className="btn btn-success">
              <i className="pi pi-search"></i> Buscar
            </button>
            <button
              onClick={preparaFormularioCadastro}
              type="button"
              className="btn btn-danger"
            >
              <i className="pi pi-plus"></i> Cadastrar
            </button>
          </div>
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-md-12">
          <div className="bs-component">
            <TabelaLancamentos
              lancamentos={lancamentos}
              deleteAction={abrirConfirmacao}
              editAction={editar}
              alterarStatus={alterarStatus}
            />
          </div>
        </div>
      </div>
      <div>
        <Dialog
          header="Confirmação"
          visible={showConfirmDialog}
          style={{ width: "50vw" }}
          footer={confirmDialogFooter}
          modal={true}
          onHide={() => setShowConfirmDialog(false)}
        >
          Confirma a exclusão deste Lançamento?
        </Dialog>
      </div>
    </Card>
  );
};

export default ConsultaLancamentos;
