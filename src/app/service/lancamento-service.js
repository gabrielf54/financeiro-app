import ApiService from "../api-service";
import ErroValidacao from "../exception/erro-validacao";

const MESES = [
  { label: "Selecione...", value: "" },
  { label: "Janeiro", value: 1 },
  { label: "Fevereiro", value: 2 },
  { label: "Março", value: 3 },
  { label: "Abril", value: 4 },
  { label: "Maio", value: 5 },
  { label: "Junho", value: 6 },
  { label: "Julho", value: 7 },
  { label: "Agosto", value: 8 },
  { label: "Setembro", value: 9 },
  { label: "Outubro", value: 10 },
  { label: "Novembro", value: 11 },
  { label: "Dezembro", value: 12 },
];

const TIPOS = [
  { label: "Selecione...", value: "" },
  { label: "Despesa", value: "DESPESA" },
  { label: "Receita", value: "RECEITA" },
];

export default class LancamentoService extends ApiService {
  constructor() {
    super("/api/lancamentos");
  }

  obterListaMeses() {
    return MESES;
  }

  obterListaTipos() {
    return TIPOS;
  }

  obterPorId(id) {
    return this.get(`/${id}`);
  }

  alterarStatus(id, status) {
    return this.put(`/${id}/atualiza-status`, { status });
  }

  validar(lancamento) {
    const erros = [];

    if (!lancamento.ano) {
      erros.push("Informe o Ano.");
    } else if (
      lancamento.ano < 2000 ||
      lancamento.ano > new Date().getFullYear()
    ) {
      erros.push("Ano inválido.");
    }

    if (!lancamento.mes) {
      erros.push("Informe o Mês.");
    } else if (lancamento.mes < 1 || lancamento.mes > 12) {
      erros.push("Mês inválido.");
    }

    if (!lancamento.descricao || lancamento.descricao.trim().length < 3) {
      erros.push("Descrição deve ter pelo menos 3 caracteres.");
    }

    if (!lancamento.valor || lancamento.valor <= 0) {
      erros.push("Valor deve ser maior que zero.");
    }

    if (!lancamento.tipo) {
      erros.push("Informe o Tipo.");
    } else if (!["DESPESA", "RECEITA"].includes(lancamento.tipo)) {
      erros.push("Tipo inválido.");
    }

    if (erros.length > 0) {
      throw new ErroValidacao(erros);
    }
  }

  salvar(lancamento) {
    this.validar(lancamento);
    return this.post("/", lancamento);
  }

  atualizar(lancamento) {
    this.validar(lancamento);
    return this.put(`/${lancamento.id}`, lancamento);
  }

  consultar(lancamentoFiltro) {
    const params = new URLSearchParams();

    // Lista das chaves permitidas no filtro
    const filterKeys = ["ano", "mes", "tipo", "status", "usuario", "descricao"];

    // Adiciona as chaves presentes no filtro aos parâmetros da consulta
    filterKeys.forEach((key) => {
      if (lancamentoFiltro[key]) {
        params.append(key, lancamentoFiltro[key]);
      }
    });

    return this.get(`?${params.toString()}`);
  }

  deletar(id) {
    return this.delete(`/${id}`);
  }
}
