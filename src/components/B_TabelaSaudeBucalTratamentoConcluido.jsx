// src/components/B_TabelaSaudeBucalTratamentoConcluido.jsx
import React, { useEffect, useState } from 'react';
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CSpinner,
  CPagination,
  CPaginationItem,
  CCard,
  CCardHeader,
  CCardBody
} from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import api from '../service/api';

const MAX_PAGINATION_ITEMS = 7;

const B_TabelaSaudeBucalTratamentoConcluido = ({ dataInicial, dataFinal }) => {
  const [dadosTabela, setDadosTabela] = useState([]);
  const [carregandoTabela, setCarregandoTabela] = useState(true);
  const [erroTabela, setErroTabela] = useState(null);

  const [paginaAtual, setPaginaAtual] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [totalElementos, setTotalElementos] = useState(0);
  const itensPorPagina = 20;

  const formataDataParaBackend = (data) => {
    if (!(data instanceof Date) || isNaN(data)) {
        return null;
    }
    const year = data.getFullYear();
    const month = String(data.getMonth() + 1).padStart(2, '0');
    const day = String(data.getDate()).padStart(2, '0');
    const hours = String(data.getHours()).padStart(2, '0');
    const minutes = String(data.getMinutes()).padStart(2, '0');
    const seconds = String(data.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    if (!dataInicial || !dataFinal) {
      setErroTabela("Datas inicial e final são necessárias para a tabela.");
      setCarregandoTabela(false);
      return;
    }

    setCarregandoTabela(true);
    setErroTabela(null);

    const dataInicialFormatada = formataDataParaBackend(dataInicial);
    const dataFinalFormatada = dataFinal ? formataDataParaBackend(dataFinal) : null;

    // Endpoint da API para a tabela de tratamento concluído
    api.get(`/api/saude-bucal/tratamento-concluido/tabela`, {
      params: {
        dataInicial: dataInicialFormatada,
        dataFinal: dataFinalFormatada,
        page: paginaAtual,
        size: itensPorPagina
      }
    })
    .then((res) => {
      setDadosTabela(res.data.content);
      setPaginaAtual(res.data.number);
      setTotalPaginas(res.data.totalPages);
      setTotalElementos(res.data.totalElements);
    })
    .catch(err => {
      console.error(`Erro ao carregar lista de tratamento concluído para a tabela:`, err);
      setErroTabela(`Erro ao carregar os dados da tabela de tratamento concluído.`);
    })
    .finally(() => {
      setCarregandoTabela(false);
    });
  }, [dataInicial, dataFinal, paginaAtual]);

  const getPaginationItems = () => {
    const items = [];
    const half = Math.floor(MAX_PAGINATION_ITEMS / 2);
    let startPage = Math.max(0, paginaAtual - half);
    let endPage = Math.min(totalPaginas - 1, paginaAtual + half);

    if (endPage - startPage < MAX_PAGINATION_ITEMS - 1) {
      if (startPage === 0) {
        endPage = Math.min(totalPaginas - 1, MAX_PAGINATION_ITEMS - 1);
      } else if (endPage === totalPaginas - 1) {
        startPage = Math.max(0, totalPaginas - MAX_PAGINATION_ITEMS);
      }
    }

    if (startPage > 0) {
      items.push(0);
      if (startPage > 1) {
        items.push('...');
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(i);
    }

    if (endPage < totalPaginas - 1) {
      if (endPage < totalPaginas - 2) {
        items.push('...');
      }
      items.push(totalPaginas - 1);
    }

    return items;
  };

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <h5 className="mb-0">Pacientes com Tratamento Odontológico Concluído no Período</h5>
      </CCardHeader>
      <CCardBody>
        {carregandoTabela ? (
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '150px' }}>
            <CSpinner color="primary" />
            <span className="ms-2">Carregando a tabela...</span>
          </div>
        ) : erroTabela ? (
          <p className="text-danger">{erroTabela}</p>
        ) : dadosTabela.length > 0 ? (
          <>
            <CTable striped hover responsive className="mb-3">
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Nome</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Endereço</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Bairro</CTableHeaderCell>
                  <CTableHeaderCell scope="col">UBS</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {dadosTabela.map((cidadao) => (
                  <CTableRow key={cidadao.coSeqCidadao}>
                    <CTableDataCell>{cidadao.nome}</CTableDataCell>
                    <CTableDataCell>{cidadao.endereco}</CTableDataCell>
                    <CTableDataCell>{cidadao.bairro}</CTableDataCell>
                    <CTableDataCell>{cidadao.nomeUbs}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>

            {totalPaginas > 1 && (
              <CPagination align="center" aria-label="Page navigation example" className="mb-3">
                <CPaginationItem
                  aria-label="Previous"
                  disabled={paginaAtual === 0}
                  onClick={() => setPaginaAtual(paginaAtual - 1)}
                >
                  <span aria-hidden="true">&laquo;</span>
                </CPaginationItem>

                {getPaginationItems().map((item, index) => (
                  item === '...' ? (
                    <CPaginationItem key={`ellipsis-${index}`} disabled>
                      ...
                    </CPaginationItem>
                  ) : (
                    <CPaginationItem
                      key={item}
                      active={item === paginaAtual}
                      onClick={() => setPaginaAtual(item)}
                    >
                      {item + 1}
                    </CPaginationItem>
                  )
                ))}

                <CPaginationItem
                  aria-label="Next"
                  disabled={paginaAtual === totalPaginas - 1 || totalPaginas === 0}
                  onClick={() => setPaginaAtual(paginaAtual + 1)}
                >
                  <span aria-hidden="true">&raquo;</span>
                </CPaginationItem>
              </CPagination>
            )}

            <p className="text-center">Total de registros: {totalElementos}</p>
          </>
        ) : (
          <p>Não há pacientes com tratamento odontológico concluído no período.</p>
        )}
      </CCardBody>
    </CCard>
  );
};

export default B_TabelaSaudeBucalTratamentoConcluido;