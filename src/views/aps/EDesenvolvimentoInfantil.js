// src/views/aps/EDesenvolvimentoInfantil.js
import React, { useState, useEffect } from 'react';
import { CCard, CCardBody, CCardHeader, CRow, CCol, CFormSelect, CFormLabel } from '@coreui/react';

// Importa os componentes de gráfico e tabela
import EGraficoDesenvolvimentoInfantilVacinacaoCompleta from '../../components/EGraficoDesenvolvimentoInfantilVacinacaoCompleta'; // Gráfico E geral
import E_TabelaDesenvolvimentoInfantilVacinacaoCompleta from '../../components/E_TabelaDesenvolvimentoInfantilVacinacaoCompleta'; // Tabela E geral
import EGraficoDesenvolvimentoInfantilVacinacaoCompletaPorUbs from '../../components/EGraficoDesenvolvimentoInfantilVacinacaoCompletaPorUbs'; // Gráfico E por UBS
// NOVO: Importa o componente da tabela E por UBS
import E_TabelaDesenvolvimentoInfantilVacinacaoCompletaPorUbs from '../../components/E_TabelaDesenvolvimentoInfantilVacinacaoCompletaPorUbs';

import api from '../../service/api';

const EDesenvolvimentoInfantil = () => {
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
        <h2>C.X. Desenvolvimento Infantil - Vacinação Completa</h2>
      </CCardHeader>
      <CCardBody>
        <p>Este relatório apresenta estatísticas e uma lista de crianças até os 2 anos de vida que não tiveram a vacinação completa.</p>

        {/* Gráfico E: Vacinação Completa (Geral) */}
        <CRow className="mb-4">
          <CCol md={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <h5 className="mb-0">E. Estatísticas de Vacinação Completa (0-2 anos) - Geral</h5>
              </CCardHeader>
              <CCardBody>
                <div style={{ height: alturaDosGraficos, margin: '20px 0' }}>
                  <EGraficoDesenvolvimentoInfantilVacinacaoCompleta
                    dataInicial={dataInicialPeriodo}
                    dataFinal={dataFinalPeriodo}
                    alturaGrafico={alturaDosGraficos}
                  />
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

        {/* Tabela E: Crianças Sem Vacinação Completa (Geral) */}
        <CRow className="mb-4">
          <CCol md={12}>
            <E_TabelaDesenvolvimentoInfantilVacinacaoCompleta
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

        {/* Gráfico E - Desenvolvimento Infantil - Vacinação Completa (Por UBS) */}
        <CRow className="mb-4">
          <CCol md={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <h5 className="mb-0">E. Estatísticas de Vacinação Completa (0-2 anos) - Por UBS</h5>
              </CCardHeader>
              <CCardBody>
                <div style={{ height: alturaDosGraficos, margin: '20px 0' }}>
                  <EGraficoDesenvolvimentoInfantilVacinacaoCompletaPorUbs
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

        {/* NOVO: Tabela E - Desenvolvimento Infantil - Vacinação Completa POR UBS */}
        <CRow className="mb-4">
          <CCol md={12}>
            <E_TabelaDesenvolvimentoInfantilVacinacaoCompletaPorUbs
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

export default EDesenvolvimentoInfantil;