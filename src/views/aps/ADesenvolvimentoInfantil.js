// src/views/aps/ADesenvolvimentoInfantil.js
import React, { useState, useEffect } from 'react';
import { CCard, CCardBody, CCardHeader, CRow, CCol, CFormSelect, CFormLabel } from '@coreui/react';

// Importa os componentes de gráfico e tabela
import AGraficoDesenvolvimentoInfantilPrimeiraConsulta from '../../components/AGraficoDesenvolvimentoInfantilPrimeiraConsulta'; // Gráfico A geral
import A_TabelaDesenvolvimentoInfantilPrimeiraConsulta from '../../components/A_TabelaDesenvolvimentoInfantilPrimeiraConsulta'; // Tabela A geral
import AGraficoDesenvolvimentoInfantilPrimeiraConsultaPorUbs from '../../components/AGraficoDesenvolvimentoInfantilPrimeiraConsultaPorUbs'; // Gráfico A por UBS
// NOVO: Importa o componente da tabela A por UBS
import A_TabelaDesenvolvimentoInfantilPrimeiraConsultaPorUbs from '../../components/A_TabelaDesenvolvimentoInfantilPrimeiraConsultaPorUbs';

import api from '../../service/api';

const ADesenvolvimentoInfantil = () => {
  const dataFinalPeriodo = new Date(); // Data atual
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
        <h2>C.X. Desenvolvimento Infantil - 1ª Consulta Médico/Enfermeiro</h2>
      </CCardHeader>
      <CCardBody>
        <p>Este relatório apresenta estatísticas sobre a realização da primeira consulta de crianças com médico ou enfermeiro nos primeiros 30 dias de vida.</p>

        {/* Gráfico A: 1ª Consulta Médico/Enfermeiro (Geral) */}
        <CRow className="mb-4">
          <CCol md={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <h5 className="mb-0">A. Estatísticas de 1ª Consulta Médico/Enfermeiro (0-30 dias de vida) - Geral</h5>
              </CCardHeader>
              <CCardBody>
                <div style={{ height: alturaDosGraficos, margin: '20px 0' }}>
                  <AGraficoDesenvolvimentoInfantilPrimeiraConsulta
                    dataInicial={dataInicialPeriodo}
                    dataFinal={dataFinalPeriodo}
                    alturaGrafico={alturaDosGraficos}
                  />
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

        {/* Tabela A: Crianças Sem 1ª Consulta Médico/Enfermeiro (Geral) */}
        <CRow className="mb-4">
          <CCol md={12}>
            <A_TabelaDesenvolvimentoInfantilPrimeiraConsulta
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

        {/* Gráfico A - Desenvolvimento Infantil - 1ª Consulta Médico/Enfermeiro (Por UBS) */}
        <CRow className="mb-4">
          <CCol md={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <h5 className="mb-0">A. Estatísticas de 1ª Consulta Médico/Enfermeiro (0-30 dias de vida) - Por UBS</h5>
              </CCardHeader>
              <CCardBody>
                <div style={{ height: alturaDosGraficos, margin: '20px 0' }}>
                  <AGraficoDesenvolvimentoInfantilPrimeiraConsultaPorUbs
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

        {/* NOVO: Tabela A - Desenvolvimento Infantil - Consulta 30 Dias POR UBS */}
        <CRow className="mb-4">
          <CCol md={12}>
            <A_TabelaDesenvolvimentoInfantilPrimeiraConsultaPorUbs
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

export default ADesenvolvimentoInfantil;