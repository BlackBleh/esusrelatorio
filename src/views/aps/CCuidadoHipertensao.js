// src/views/aps/CCuidadoHipertensao.js

import React, { useEffect, useState } from 'react';
import { CCard, CCardBody, CCardHeader, CRow, CCol, CFormSelect, CFormLabel } from '@coreui/react';

// Importa o componente do gráfico C geral
import CGraficoHipertensos from '../../components/CGraficoHipertensos';
// Importa o componente da tabela C geral
import C_TabelaHipertensosSemVisitaAcsTacs from '../../components/C_TabelaHipertensosSemVisitaAcsTacs';
// Importa o componente do gráfico C POR UBS
import CGraficoHipertensosPorUbs from '../../components/CGraficoHipertensosPorUbs';
// NOVO: Importa o componente da tabela C POR UBS
import C_TabelaHipertensosSemVisitaAcsTacsPorUbs from '../../components/C_TabelaHipertensosSemVisitaAcsTacsPorUbs'; // <- NOVA IMPORTAÇÃO

import api from '../../service/api';

const CCuidadoHipertensao = () => {
  const dataFinalGrafico = new Date();
  const dataInicialGrafico = new Date();
  dataInicialGrafico.setMonth(dataInicialGrafico.getMonth() - 6);

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
        <h2>C. Cuidado da Pessoa com Hipertensão Arterial - Visitas Domiciliares ACS/TACS</h2>
      </CCardHeader>
      <CCardBody>
        <p>Este relatório apresenta dados relacionados às visitas domiciliares realizadas por Agentes Comunitários de Saúde (ACS) e Técnicos em Saúde Comunitária (TACS) para pessoas com hipertensão arterial, com foco em visitas qualificadas no período.</p>

        {/* Gráfico C: Hipertensos com Visitas ACS/TACS (Geral) */}
        <CRow className="mb-4">
          <CCol md={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <h5 className="mb-0">Estatísticas de Visitas Domiciliares por ACS/TACS (Hipertensos) - Geral</h5>
              </CCardHeader>
              <CCardBody>
                <div style={{ height: alturaDosGraficos, margin: '20px 0' }}>
                  <CGraficoHipertensos
                    dataInicial={dataInicialGrafico}
                    dataFinal={dataFinalGrafico}
                    alturaGrafico={alturaDosGraficos}
                    // selectedUbsId={selectedUbsId} // Mantido comentado para não filtrar por UBS
                  />
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

        {/* Tabela C: Hipertensos que NÃO Fizeram Visitas Domiciliares Qualificadas por ACS/TACS (Geral) */}
        <CRow className="mb-4">
          <CCol md={12}>
            <C_TabelaHipertensosSemVisitaAcsTacs
              dataInicial={dataInicialGrafico}
              dataFinal={dataFinalGrafico}
              // selectedUbsId={selectedUbsId} // Não passa selectedUbsId para a tabela geral
            />
          </CCol>
        </CRow>

        {/* Caixa de seleção de UBS */}
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

        {/* Gráfico C: Hipertensos com Visitas ACS/TACS POR UBS */}
        <CRow className="mb-4">
          <CCol md={12}>
            <CGraficoHipertensosPorUbs
              dataInicial={dataInicialGrafico}
              dataFinal={dataFinalGrafico}
              alturaGrafico={alturaDosGraficos}
              selectedUbsId={selectedUbsId}
            />
          </CCol>
        </CRow>

        {/* NOVO: Tabela C: Hipertensos que NÃO Fizeram Visitas Domiciliares Qualificadas por ACS/TACS POR UBS */}
        <CRow className="mb-4"> {/* Adicionado mb-4 para espaçamento */}
          <CCol md={12}>
            <C_TabelaHipertensosSemVisitaAcsTacsPorUbs
              dataInicial={dataInicialGrafico}
              dataFinal={dataFinalGrafico}
              selectedUbsId={selectedUbsId}
            />
          </CCol>
        </CRow>

      </CCardBody>
    </CCard>
  );
};

export default CCuidadoHipertensao;