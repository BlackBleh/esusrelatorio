// src/views/aps/ECuidadoDiabetes.js
import React, { useState, useEffect } from 'react';
import { CCard, CCardBody, CCardHeader, CRow, CCol, CFormSelect, CFormLabel } from '@coreui/react'; // Importar CFormSelect e CFormLabel

// Importa os componentes de gráfico e tabela
import EGraficoCuidadoDiabetesHemoglobina from '../../components/EGraficoCuidadoDiabetesHemoglobina'; // Gráfico E geral
import E_TabelaCuidadoDiabetesHemoglobina from '../../components/E_TabelaCuidadoDiabetesHemoglobina'; // Tabela E geral
// NOVO: Importa o componente do gráfico E por UBS
import EGraficoCuidadoDiabetesHemoglobinaPorUbs from '../../components/EGraficoCuidadoDiabetesHemoglobinaPorUbs';

import api from '../../service/api';
import E_TabelaCuidadoDiabetesHemoglobinaPorUbs from '../../components/E_TabelaCuidadoDiabetesHemoglobinaPorUbs';

const ECuidadoDiabetes = () => {
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
        <h2>C.X. Cuidado da Pessoa com Diabetes - Hemoglobina Glicada</h2>
      </CCardHeader>
      <CCardBody>
        <p>Este relatório apresenta estatísticas e uma lista de pacientes com Diabetes que não tiveram registros de Hemoglobina Glicada.</p>

        {/* Gráfico E: Hemoglobina Glicada (Geral) */}
        <CRow className="mb-4">
          <CCol md={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <h5 className="mb-0">E. Estatísticas de Hemoglobina Glicada de Diabéticos (últimos 12 meses) - Geral</h5>
              </CCardHeader>
              <CCardBody>
                <div style={{ height: alturaDosGraficos, margin: '20px 0' }}>
                  <EGraficoCuidadoDiabetesHemoglobina
                    dataInicial={dataInicialPeriodo}
                    dataFinal={dataFinalPeriodo}
                    alturaGrafico={alturaDosGraficos}
                  />
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

        {/* Tabela E: Diabéticos Sem Registro de Hemoglobina Glicada (Geral) */}
        <CRow className="mb-4">
          <CCol md={12}>
            <E_TabelaCuidadoDiabetesHemoglobina
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

        {/* NOVO: Gráfico E - Diabetes - Hemoglobina Glicada (Por UBS) */}
        <CRow className="mb-4">
          <CCol md={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <h5 className="mb-0">E. Estatísticas de Hemoglobina Glicada de Diabéticos por UBS (últimos 12 meses) - Por UBS</h5>
              </CCardHeader>
              <CCardBody>
                <div style={{ height: alturaDosGraficos, margin: '20px 0' }}>
                  <EGraficoCuidadoDiabetesHemoglobinaPorUbs
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
        E_TabelaCuidadoDiabetesHemoglobinaPorUbs

        {/* Você pode adicionar uma Tabela E - Diabetes POR UBS aqui, se necessário. */}
        <CRow className="mb-4">
                  <CCol md={12}>
                    <E_TabelaCuidadoDiabetesHemoglobinaPorUbs
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

export default ECuidadoDiabetes;