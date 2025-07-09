// src/views/aps/FCuidadoDiabetes.js
import React, { useState, useEffect } from 'react';
import { CCard, CCardBody, CCardHeader, CRow, CCol, CFormSelect, CFormLabel } from '@coreui/react'; // Importar CFormSelect e CFormLabel

// Importa os componentes de gráfico e tabela
import FGraficoCuidadoDiabetesPes from '../../components/FGraficoCuidadoDiabetesPes'; // Gráfico F geral
import F_TabelaCuidadoDiabetesPes from '../../components/F_TabelaCuidadoDiabetesPes'; // Tabela F geral
// NOVO: Importa o componente do gráfico F por UBS
import FGraficoCuidadoDiabetesPesPorUbs from '../../components/FGraficoCuidadoDiabetesPesPorUbs';

import api from '../../service/api';
import F_TabelaCuidadoDiabetesPesPorUbs from '../../components/F_TabelaCuidadoDiabetesPesPorUbs';

const FCuidadoDiabetes = () => {
  const dataFinalPeriodo = new Date();
  const dataInicialPeriodo = new Date();
  dataInicialPeriodo.setMonth(dataInicialPeriodo.getMonth() - 15); // 15 meses atrás

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
        <h2>C.X. Cuidado da Pessoa com Diabetes - Exame do Pé Diabético</h2>
      </CCardHeader>
      <CCardBody>
        <p>Este relatório apresenta estatísticas e uma lista de pacientes com Diabetes que não tiveram o exame do pé diabético.</p>

        {/* Gráfico F: Exame do Pé Diabético (Geral) */}
        <CRow className="mb-4">
          <CCol md={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <h5 className="mb-0">F. Estatísticas de Exame do Pé Diabético (últimos 15 meses) - Geral</h5>
              </CCardHeader>
              <CCardBody>
                <div style={{ height: alturaDosGraficos, margin: '20px 0' }}>
                  <FGraficoCuidadoDiabetesPes
                    dataInicial={dataInicialPeriodo}
                    dataFinal={dataFinalPeriodo}
                    alturaGrafico={alturaDosGraficos}
                  />
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

        {/* Tabela F: Diabéticos Sem Exame do Pé Diabético (Geral) */}
        <CRow className="mb-4">
          <CCol md={12}>
            <F_TabelaCuidadoDiabetesPes
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

        {/* NOVO: Gráfico F - Diabetes - Exame do Pé Diabético (Por UBS) */}
        <CRow className="mb-4">
          <CCol md={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <h5 className="mb-0">F. Estatísticas de Exame do Pé Diabético (últimos 15 meses) - Por UBS</h5>
              </CCardHeader>
              <CCardBody>
                <div style={{ height: alturaDosGraficos, margin: '20px 0' }}>
                  <FGraficoCuidadoDiabetesPesPorUbs
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

        {/* Você pode adicionar uma Tabela F - Diabetes POR UBS aqui, se necessário. */}
        <CRow className="mb-4">
                  <CCol md={12}>
                    <F_TabelaCuidadoDiabetesPesPorUbs
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

export default FCuidadoDiabetes;