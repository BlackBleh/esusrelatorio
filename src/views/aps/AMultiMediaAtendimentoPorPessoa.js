// src/views/aps/AMultiMediaAtendimentoPorPessoa.js
import React, { useState, useEffect } from 'react';
import { CCard, CCardBody, CCardHeader, CRow, CCol, CFormSelect, CFormLabel } from '@coreui/react'; // Importar CFormSelect e CFormLabel

// Importa o componente do gráfico A eMulti geral
import AGraficoEMultiMediaAtendimentoPorPessoa from '../../components/AGraficoEMultiMediaAtendimentoPorPessoa';
// Importa o componente da tabela A eMulti geral
import A_TabelaEMultiMediaAtendimentoPorPessoa from '../../components/A_TabelaEMultiMediaAtendimentoPorPessoa';
// NOVO: Importa o componente do gráfico A por UBS
import AGraficoEMultiMediaAtendimentoPorPessoaPorUbs from '../../components/AGraficoEMultiMediaAtendimentoPorPessoaPorUbs';


import api from '../../service/api';
import A_TabelaEMultiMediaAtendimentoPorPessoaPorUbs from '../../components/A_TabelaEMultiMediaAtendimentoPorPessoaPorUbs';

const AMultiMediaAtendimentoPorPessoa = () => {
  const dataFinalPeriodo = new Date();
  const dataInicialPeriodo = new Date();
  dataInicialPeriodo.setFullYear(dataInicialPeriodo.getFullYear() - 1); // 1 ano atrás

  const alturaDosGraficos = '500px';

  const [ubsList, setUbsList] = useState([]);
  const [selectedUbsId, setSelectedUbsId] = useState(null);

  useEffect(() => {
    const fetchUbs = async () => {
      try {
        const response = await api.get('/api/ubs');
        const sortedUbs = response.data.sort((a, b) => a.nome.localeCompare(b.nome));
        setUbsList([{ id: null, nome: 'Todas as UBSs' }, ...sortedUbs]);
      } catch (error) {
        console.error("Erro ao carregar lista de UBSs:", error);
      }
    };

    fetchUbs();
  }, []);

  const handleUbsChange = (event) => {
    const value = event.target.value === 'null' ? null : Number(event.target.value);
    setSelectedUbsId(value);
  };

  return (
    <CCard className="mb-5">
      <CCardHeader>
        <h2>C.X. eMulti - Média de Atendimento por Pessoa</h2>
      </CCardHeader>
      <CCardBody>
        <p>Este relatório apresenta a média de atendimentos individuais e coletivos realizados pela eMulti por pessoa.</p>

        {/* Gráfico A: Média de Atendimento por Pessoa (Geral) */}
        <CRow className="mb-4">
          <CCol md={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <h5 className="mb-0">A. Média de Atendimento da eMulti por Pessoa - Geral</h5>
              </CCardHeader>
              <CCardBody>
                <div style={{ height: alturaDosGraficos, margin: '20px 0' }}>
                  <AGraficoEMultiMediaAtendimentoPorPessoa
                    dataInicial={dataInicialPeriodo}
                    dataFinal={dataFinalPeriodo}
                    alturaGrafico={alturaDosGraficos}
                  />
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

        {/* Tabela A: Pessoas Atendidas pela eMulti e seus Atendimentos (Geral) */}
        <CRow className="mb-4">
          <CCol md={12}>
            <A_TabelaEMultiMediaAtendimentoPorPessoa
              dataInicial={dataInicialPeriodo}
              dataFinal={dataFinalPeriodo}
            />
          </CCol>
        </CRow>

        {/* Seletor de UBS (para os gráficos e tabelas por UBS) */}
        <CRow className="mb-4 align-items-center">
          <CCol md={2}>
            <CFormLabel htmlFor="selectUbs">Selecione uma UBS:</CFormLabel>
          </CCol>
          <CCol md={4}>
            <CFormSelect
              id="selectUbs"
              aria-label="Selecionar UBS"
              value={selectedUbsId === null ? 'null' : selectedUbsId}
              onChange={handleUbsChange}
            >
              {ubsList.map(ubs => (
                <option key={ubs.id} value={ubs.id}>
                  {ubs.nome}
                </option>
              ))}
            </CFormSelect>
          </CCol>
          <CCol md={6}></CCol>
        </CRow>

        {/* NOVO: Gráfico A - eMulti - Média de Atendimento por Pessoa (Por UBS) */}
        <CRow className="mb-4">
          <CCol md={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <h5 className="mb-0">A. Média de Atendimento da eMulti por Pessoa por UBS</h5>
              </CCardHeader>
              <CCardBody>
                <div style={{ height: alturaDosGraficos, margin: '20px 0' }}>
                  <AGraficoEMultiMediaAtendimentoPorPessoaPorUbs
                    dataInicial={dataInicialPeriodo}
                    dataFinal={dataFinalPeriodo}
                    alturaGrafico={alturaDosGraficos}
                    selectedUbsId={selectedUbsId}
                  />
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

        {/* Você pode adicionar uma Tabela A - eMulti POR UBS aqui, se necessário. */}
        <CRow className="mb-4">
                  <CCol md={12}>
                    <A_TabelaEMultiMediaAtendimentoPorPessoaPorUbs
                      dataInicial={dataInicialPeriodo}
                      dataFinal={dataFinalPeriodo}
                      selectedUbsId={selectedUbsId}
                    />
                  </CCol>
                </CRow>
        
      </CCardBody>
    </CCard>
  );
};

export default AMultiMediaAtendimentoPorPessoa;