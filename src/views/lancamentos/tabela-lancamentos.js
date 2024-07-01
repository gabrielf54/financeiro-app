import React from "react";

const CurrencyFormatter = (value) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

export default (props) => {
  const rows = props.lancamentos.map((lancamento) => {
    return (
      <tr key={lancamento.id}>
        <td>{lancamento.descricao}</td>
        <td>{CurrencyFormatter(lancamento.valor)}</td>
        <td>{lancamento.tipo}</td>
        <td>{lancamento.mes}</td>
        <td>{lancamento.status}</td>
        <td>
          <button
            className="btn btn-success"
            title="Efetivar"
            disabled={lancamento.status !== "PENDENTE"}
            onClick={(e) => props.alterarStatus(lancamento, "EFETIVADO")}
            type="button"
          >
            <i className="pi pi-check"></i>
          </button>
          <button
            className="btn btn-warning"
            title="Cancelar"
            disabled={lancamento.status !== "PENDENTE"}
            onClick={(e) => props.alterarStatus(lancamento, "CANCELADO")}
            type="button"
          >
            <i className="pi pi-times"></i>
          </button>
          <button
            type="button"
            title="Editar"
            className="btn btn-primary"
            onClick={(e) => props.editAction(lancamento.id)}
          >
            <i className="pi pi-pencil"></i>
          </button>
          <button
            type="button"
            title="Excluir"
            className="btn btn-danger"
            onClick={(e) => props.deleteAction(lancamento)}
          >
            <i className="pi pi-trash"></i>
          </button>
        </td>
      </tr>
    );
  });

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">Descrição</th>
          <th scope="col">Valor</th>
          <th scope="col">Tipo</th>
          <th scope="col">Mês</th>
          <th scope="col">Situação</th>
          <th scope="col">Ações</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};
