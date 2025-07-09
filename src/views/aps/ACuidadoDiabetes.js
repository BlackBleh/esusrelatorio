// src/views/aps/ACuidadoDiabetes.js
import React, { useState, useEffect } from 'react';
import { CCard, CCardBody, CCardHeader, CRow, CCol, CFormSelect, CFormLabel } from '@coreui/react';

// Importa os componentes de gráfico e tabela
import AGraficoCuidadoDiabetesConsultaMedEnf from '../../components/AGraficoCuidadoDiabetesConsultaMedEnf'; // Gráfico A geral
import A_TabelaCuidadoDiabetesConsultaMedEnf from '../../components/A_TabelaCuidadoDiabetesConsultaMedEnf'; // Tabela A geral
import AGraficoCuidadoDiabetesConsultaMedEnfPorUbs from '../../components/AGraficoCuidadoDiabetesConsultaMedEnfPorUbs'; // Gráfico A por UBS
// NOVO: Importa o componente da tabela A por UBS
import A_TabelaCuidadoDiabetesConsultaMedEnfPorUbs from '../../components/A_TabelaCuidadoDiabetesConsultaMedEnfPorUbs';

import api from '../../service/api';

const ACuidadoDiabetes = () => {
  const dataFinalPeriodo = new Date();
  const dataInicialPeriodo = new Date();
  dataInicialPeriodo.setMonth(dataInicialPeriodo.getMonth() - 6); // 6 meses atrás

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
        <h2>C.X. Cuidado da Pessoa com Diabetes - Consulta Médico/Enfermeiro</h2>
      </CCardHeader>
      <CCardBody>
        <p>Este relatório apresenta estatísticas e uma lista de pacientes com Diabetes que não tiveram consulta com médico ou enfermeiro nos últimos 6 meses.</p>

        {/* Gráfico A: Consultas Médico/Enfermeiro (Geral) */}
        <CRow className="mb-4">
          <CCol md={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <h5 className="mb-0">A. Estatísticas de Consultas de Diabéticos (Médico/Enfermeiro) - Geral</h5>
              </CCardHeader>
              <CCardBody>
                <div style={{ height: alturaDosGraficos, margin: '20px 0' }}>
                  <AGraficoCuidadoDiabetesConsultaMedEnf
                    dataInicial={dataInicialPeriodo}
                    dataFinal={dataFinalPeriodo}
                    alturaGrafico={alturaDosGraficos}
                  />
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

        {/* Tabela A: Diabéticos Sem Consulta Médico/Enfermeiro (Geral) */}
        <CRow className="mb-4">
          <CCol md={12}>
            <A_TabelaCuidadoDiabetesConsultaMedEnf
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

        {/* NOVO: Gráfico A - Diabetes - Consultas Médico/Enfermeiro (Por UBS) */}
        <CRow className="mb-4">
          <CCol md={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <h5 className="mb-0">A. Estatísticas de Consultas de Diabéticos (Médico/Enfermeiro) - Por UBS</h5>
              </CCardHeader>
              <CCardBody>
                <div style={{ height: alturaDosGraficos, margin: '20px 0' }}>
                  <AGraficoCuidadoDiabetesConsultaMedEnfPorUbs
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

        {/* NOVO: Tabela A - Diabetes - Consultas Médico/Enfermeiro POR UBS */}
        <CRow className="mb-4">
          <CCol md={12}>
            <A_TabelaCuidadoDiabetesConsultaMedEnfPorUbs
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

export default ACuidadoDiabetes;