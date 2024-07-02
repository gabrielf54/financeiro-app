import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import LancamentoService from "../../app/service/lancamento-service";
import LocalStorageService from "../../app/service/localstorage-service";
import Card from "../../components/card";
import FormGroup from "../../components/form-group";
import SelectMenu from "../../components/select-menu";
import * as messages from "../../components/toastr";
import TabelaLancamentos from "./tabela-lancamentos";

const ConsultaLancamentos = () => {
  const [filtro, setFiltro] = useState({
    ano: "",
    mes: "",
    tipo: "",
    descricao: "",
  });
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [lancamentoDeletar, setLancamentoDeletar] = useState({});
  const [lancamentos, setLancamentos] = useState([]);
  const navigate = useNavigate();
  const service = new LancamentoService();

  const buscar = useCallback(async () => {
    if (!filtro.ano) {
      messages.mensagemErro("O preenchimento do campo Ano é obrigatório.");
      return;
    }

    const usuarioLogado = LocalStorageService.obterItem("_usuario_logado");

    const lancamentoFiltro = {
      ...filtro,
      usuario: usuarioLogado.id,
    };

    try {
      const resposta = await service.consultar(lancamentoFiltro);
      const lista = resposta.data;

      if (lista.length < 1) {
        messages.mensagemAlert("Nenhum resultado encontrado.");
      }
      setLancamentos(lista);
    } catch (error) {
      console.error(error);
    }
  }, [filtro, service]);

  useEffect(() => {
    buscar();
  }, [buscar]);

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

  const deletar = async () => {
    try {
      await service.deletar(lancamentoDeletar.id);
      const novaLista = lancamentos.filter(
        (lanc) => lanc.id !== lancamentoDeletar.id
      );
      setLancamentos(novaLista);
      setShowConfirmDialog(false);
      messages.mensagemSucesso("Lançamento deletado com sucesso!");
    } catch (error) {
      messages.mensagemErro("Ocorreu um erro ao tentar deletar o Lançamento");
    }
  };

  const preparaFormularioCadastro = () => {
    navigate("/cadastro-lancamentos");
  };

  const alterarStatus = async (lancamento, status) => {
    try {
      await service.alterarStatus(lancamento.id, status);
      const novaLista = lancamentos.map((lanc) =>
        lanc.id === lancamento.id ? { ...lanc, status } : lanc
      );
      setLancamentos(novaLista);
      messages.mensagemSucesso("Status atualizado com sucesso!");
    } catch (error) {
      messages.mensagemErro("Erro ao atualizar status do lançamento");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFiltro((prevState) => ({ ...prevState, [name]: value }));
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
                name="ano"
                value={filtro.ano}
                onChange={handleChange}
                placeholder="Digite o Ano"
              />
            </FormGroup>

            <FormGroup htmlFor="inputMes" label="Mês: ">
              <SelectMenu
                id="inputMes"
                name="mes"
                value={filtro.mes}
                onChange={handleChange}
                className="form-control"
                lista={meses}
              />
            </FormGroup>

            <FormGroup htmlFor="inputDesc" label="Descrição: ">
              <input
                type="text"
                className="form-control"
                id="inputDesc"
                name="descricao"
                value={filtro.descricao}
                onChange={handleChange}
                placeholder="Digite a descrição"
              />
            </FormGroup>

            <FormGroup htmlFor="inputTipo" label="Tipo Lançamento: ">
              <SelectMenu
                id="inputTipo"
                name="tipo"
                value={filtro.tipo}
                onChange={handleChange}
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
