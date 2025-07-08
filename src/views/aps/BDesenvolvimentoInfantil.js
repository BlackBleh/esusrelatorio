// src/views/aps/BDesenvolvimentoInfantil.js
import React, { useState, useEffect } from 'react';
import { CCard, CCardBody, CCardHeader, CRow, CCol, CFormSelect, CFormLabel } from '@coreui/react';

// Importa os componentes de gráfico e tabela
import BGraficoDesenvolvimentoInfantilConsulta2Anos from '../../components/BGraficoDesenvolvimentoInfantilConsulta2Anos'; // Gráfico B geral
import B_TabelaDesenvolvimentoInfantilConsulta2Anos from '../../components/B_TabelaDesenvolvimentoInfantilConsulta2Anos'; // Tabela B geral
import BGraficoDesenvolvimentoInfantilConsulta2AnosPorUbs from '../../components/BGraficoDesenvolvimentoInfantilConsulta2AnosPorUbs'; // Gráfico B por UBS
// NOVO: Importa o componente da tabela B por UBS
import B_TabelaDesenvolvimentoInfantilConsulta2AnosPorUbs from '../../components/B_TabelaDesenvolvimentoInfantilConsulta2AnosPorUbs';

import api from '../../service/api';

const BDesenvolvimentoInfantil = () => {
  const dataFinalPeriodo = new Date(); // Data atual
  const dataInicialPeriodo = new Date();
  dataInicialPeriodo.setFullYear(dataInicialPeriodo.getFullYear() - 1); // 1 ano atrás (ou ajuste para 2 anos se a coorte for maior)

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
        <h2>C.X. Desenvolvimento Infantil - Consultas até 2 Anos</h2>
      </CCardHeader>
      <CCardBody>
        <p>Este relatório apresenta estatísticas sobre o número de consultas realizadas por crianças até os 2 anos de vida.</p>

        {/* Gráfico B: Consultas 2 Anos (Geral) */}
        <CRow className="mb-4">
          <CCol md={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <h5 className="mb-0">B. Estatísticas de Consultas (9+ em 0-2 anos) - Geral</h5>
              </CCardHeader>
              <CCardBody>
                <div style={{ height: alturaDosGraficos, margin: '20px 0' }}>
                  <BGraficoDesenvolvimentoInfantilConsulta2Anos
                    dataInicial={dataInicialPeriodo}
                    dataFinal={dataFinalPeriodo}
                    alturaGrafico={alturaDosGraficos}
                  />
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

        {/* Tabela B: Crianças Sem 9+ Consultas (Geral) */}
        <CRow className="mb-4">
          <CCol md={12}>
            <B_TabelaDesenvolvimentoInfantilConsulta2Anos
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

        {/* Gráfico B - Desenvolvimento Infantil - Consultas 2 Anos (Por UBS) */}
        <CRow className="mb-4">
          <CCol md={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <h5 className="mb-0">B. Estatísticas de Consultas (9+ em 0-2 anos) - Por UBS</h5>
              </CCardHeader>
              <CCardBody>
                <div style={{ height: alturaDosGraficos, margin: '20px 0' }}>
                  <BGraficoDesenvolvimentoInfantilConsulta2AnosPorUbs
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

        {/* NOVO: Tabela B - Desenvolvimento Infantil - Consultas 2 Anos POR UBS */}
        <CRow className="mb-4">
          <CCol md={12}>
            <B_TabelaDesenvolvimentoInfantilConsulta2AnosPorUbs
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

export default BDesenvolvimentoInfantil;